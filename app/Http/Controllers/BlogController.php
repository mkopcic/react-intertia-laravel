<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\SchemaOrg\Schema;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class BlogController extends Controller
{
    /**
     * Files under the project's docs/ directory that the blog links to.
     *
     * @var array<string, array{name: string, type: string}>
     */
    private const DOCUMENTS = [
        'laravel-najbolje-prakse.pdf' => ['name' => 'Laravel – najbolje prakse', 'type' => 'PDF'],
        'laravel-najbolje-prakse.md' => ['name' => 'Laravel – najbolje prakse', 'type' => 'Markdown'],
    ];

    public function index(): Response
    {
        $title = 'Blog | Marijan Kopčić';
        $description = 'Notes on Laravel, PHP, React, DevOps and cloud infrastructure '
            .'from 15+ years of building production systems.';

        $posts = $this->paginatedPosts();
        $canonical = $this->canonicalFor($posts, $this->blogUrl());

        $this->applySeo($title, $description, $canonical, '/og-image.jpg');
        $this->applyPaginationLinks($posts);

        $blogSchema = Schema::blog()
            ->name($title)
            ->description($description)
            ->url($this->blogUrl());

        return Inertia::render('blog/index', [
            'posts' => $posts,
            'tags' => $this->tagList(),
            'documents' => $this->documents(),
            'seo' => ['title' => $title, 'description' => $description, 'url' => $canonical],
            'schemaJson' => $this->schemaJson([$blogSchema->toArray()]),
        ]);
    }

    public function document(string $document): BinaryFileResponse
    {
        abort_unless(array_key_exists($document, self::DOCUMENTS), 404);

        return response()->file(base_path('docs/'.$document));
    }

    /**
     * The downloadable documents offered on the blog.
     *
     * @return array<int, array{name: string, url: string, type: string}>
     */
    protected function documents(): array
    {
        return collect(self::DOCUMENTS)
            ->map(fn (array $document, string $file): array => [
                'name' => $document['name'],
                'type' => $document['type'],
                'url' => $this->blogUrl('/docs/'.$file),
            ])
            ->values()
            ->all();
    }

    public function show(Post $post): Response
    {
        $post->load(['author:id,name', 'tags:id,name,slug']);

        $url = $this->blogUrl('/'.$post->slug);
        $title = $post->meta_title ?: $post->title.' | Marijan Kopčić';
        $description = $post->meta_description ?: (string) $post->excerpt;
        $image = $post->coverUrl() ?? $this->blogUrl('/og-image.jpg');

        $this->applySeo($title, $description, $url, $image, 'article', $post);

        $postSchema = Schema::blogPosting()
            ->headline($post->title)
            ->description($description)
            ->url($url)
            ->image($image)
            ->datePublished($post->created_at)
            ->dateModified($post->updated_at)
            ->author(Schema::person()->name($post->author->name))
            ->keywords($post->tags->pluck('name')->implode(', '));

        return Inertia::render('blog/show', [
            'post' => [
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'bodyHtml' => $post->body_html,
                'coverUrl' => $post->coverUrl(),
                'author' => $post->author->name,
                'publishedAt' => $post->created_at?->toIso8601String(),
                'updatedAt' => $post->updated_at?->toIso8601String(),
                'readingMinutes' => $this->readingMinutes($post),
                'tags' => $post->tags->map(fn (Tag $tag): array => [
                    'name' => $tag->name,
                    'slug' => $tag->slug,
                ]),
            ],
            'related' => $this->relatedPosts($post),
            'seo' => ['title' => $title, 'description' => $description, 'url' => $url],
            'schemaJson' => $this->schemaJson([$postSchema->toArray()]),
        ]);
    }

    public function tag(Tag $tag): Response
    {
        $url = $this->blogUrl('/tags/'.$tag->slug);
        $title = $tag->name.' | Blog | Marijan Kopčić';
        $description = 'Posts tagged '.$tag->name.' — Laravel, DevOps and cloud engineering notes.';

        $posts = $this->paginatedPosts($tag);
        $canonical = $this->canonicalFor($posts, $url);

        $this->applySeo($title, $description, $canonical, '/og-image.jpg');
        $this->applyPaginationLinks($posts);

        return Inertia::render('blog/tag', [
            'tag' => ['name' => $tag->name, 'slug' => $tag->slug],
            'posts' => $posts,
            'tags' => $this->tagList(),
            'seo' => ['title' => $title, 'description' => $description, 'url' => $canonical],
            'schemaJson' => null,
        ]);
    }

    /**
     * Render the blog's own sitemap. The portfolio keeps a separate one.
     */
    public function sitemap(): HttpResponse
    {
        $sitemap = Sitemap::create()
            ->add(
                Url::create($this->blogUrl())
                    ->setLastModificationDate(now())
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                    ->setPriority(0.9)
            );

        Tag::query()->orderBy('name')->get()->each(function (Tag $tag) use ($sitemap): void {
            $sitemap->add(
                Url::create($this->blogUrl('/tags/'.$tag->slug))
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority(0.5)
            );
        });

        Post::query()->latest()->get()->each(function (Post $post) use ($sitemap): void {
            $sitemap->add(
                Url::create($this->blogUrl('/'.$post->slug))
                    ->setLastModificationDate($post->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setPriority(0.8)
            );
        });

        return response($sitemap->render(), 200, [
            'Content-Type' => 'application/xml',
        ]);
    }

    /**
     * Get a page of posts, optionally narrowed to a single tag.
     *
     * @return LengthAwarePaginator<int, Post>
     */
    protected function paginatedPosts(?Tag $tag = null): LengthAwarePaginator
    {
        return Post::query()
            ->with(['author:id,name', 'tags:id,name,slug'])
            ->when($tag, fn ($query) => $query->tagged($tag))
            ->latest()
            ->paginate(config('blog.per_page'))
            ->withQueryString()
            ->through(fn (Post $post): array => [
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'coverUrl' => $post->coverUrl(),
                'author' => $post->author->name,
                'publishedAt' => $post->created_at?->toIso8601String(),
                'readingMinutes' => $this->readingMinutes($post),
                'tags' => $post->tags->map(fn (Tag $t): array => [
                    'name' => $t->name,
                    'slug' => $t->slug,
                ]),
            ]);
    }

    /**
     * Get up to three other posts sharing a tag with the given post,
     * falling back to the most recent posts when it has no tags.
     *
     * @return array<int, array{title: string, slug: string, excerpt: ?string, coverUrl: ?string}>
     */
    protected function relatedPosts(Post $post): array
    {
        $tagIds = $post->tags->pluck('id');

        return Post::query()
            ->whereKeyNot($post->getKey())
            ->when($tagIds->isNotEmpty(), fn ($query) => $query->whereHas(
                'tags',
                fn ($tags) => $tags->whereIn('tags.id', $tagIds)
            ))
            ->latest()
            ->limit(3)
            ->get()
            ->map(fn (Post $related): array => [
                'title' => $related->title,
                'slug' => $related->slug,
                'excerpt' => $related->excerpt,
                'coverUrl' => $related->coverUrl(),
            ])
            ->all();
    }

    /**
     * Get every tag that currently carries at least one post.
     *
     * @return array<int, array{name: string, slug: string, count: int}>
     */
    protected function tagList(): array
    {
        return Tag::query()
            ->has('posts')
            ->withCount('posts')
            ->orderByDesc('posts_count')
            ->get()
            ->map(fn (Tag $tag): array => [
                'name' => $tag->name,
                'slug' => $tag->slug,
                'count' => $tag->posts_count,
            ])
            ->all();
    }

    /**
     * Estimate reading time at 200 words per minute, minimum one minute.
     */
    protected function readingMinutes(Post $post): int
    {
        return max(1, (int) ceil(str_word_count(strip_tags((string) $post->body_html)) / 200));
    }

    /**
     * Build the canonical URL for a paginated listing.
     *
     * Without the page number every page of the listing claims to be page
     * one, so Google folds them into a single duplicate and drops the deeper
     * pages out of the index.
     *
     * @param  LengthAwarePaginator<int, Post>  $posts
     */
    protected function canonicalFor(LengthAwarePaginator $posts, string $base): string
    {
        return $posts->currentPage() > 1
            ? $base.'?page='.$posts->currentPage()
            : $base;
    }

    /**
     * Announce the neighbouring pages of a paginated listing.
     *
     * @param  LengthAwarePaginator<int, Post>  $posts
     */
    protected function applyPaginationLinks(LengthAwarePaginator $posts): void
    {
        if ($previous = $posts->previousPageUrl()) {
            SEOMeta::setPrev($previous);
        }

        if ($next = $posts->nextPageUrl()) {
            SEOMeta::setNext($next);
        }
    }

    /**
     * Build an absolute URL on the blog host.
     */
    protected function blogUrl(string $path = ''): string
    {
        return 'https://'.config('blog.domain').$path;
    }

    /**
     * Apply the meta, Open Graph and Twitter tags rendered by the root view.
     *
     * Only a single post is an article. The index and the tag archives are
     * listings, and announcing them as articles makes scrapers look for a
     * published time and an author that a listing does not have.
     */
    protected function applySeo(
        string $title,
        string $description,
        string $url,
        string $image,
        string $type = 'website',
        ?Post $post = null,
    ): void {
        $image = str_starts_with($image, 'http') ? $image : $this->blogUrl($image);

        SEOMeta::setTitle($title, false)
            ->setDescription($description)
            ->setCanonical($url);

        OpenGraph::setTitle($title)
            ->setDescription($description)
            ->setUrl($url)
            ->addProperty('type', $type)
            ->addImage($image);

        if ($post instanceof Post) {
            SEOMeta::addMeta('author', $post->author->name);

            OpenGraph::setArticle([
                'published_time' => $post->created_at?->toIso8601String(),
                'modified_time' => $post->updated_at?->toIso8601String(),
                'author' => $post->author->name,
                'tag' => $post->tags->pluck('name')->all(),
            ]);
        }

        TwitterCard::setTitle($title)
            ->setDescription($description)
            ->setType('summary_large_image')
            ->addValue('image', $image);
    }

    /**
     * Wrap the given schema.org nodes into the JSON-LD graph that
     * resources/views/app.blade.php prints for the page.
     *
     * @param  array<int, array<string, mixed>>  $nodes
     */
    protected function schemaJson(array $nodes): string
    {
        $graph = array_map(function (array $node): array {
            unset($node['@context']);

            return $node;
        }, $nodes);

        return json_encode([
            '@context' => 'https://schema.org',
            '@graph' => $graph,
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }
}
