<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(string $current_team, Request $request): Response
    {
        $search = $request->string('search')->toString();

        $posts = Post::query()
            ->with(['author:id,name', 'tags:id,name,slug'])
            ->when($search !== '', fn ($query) => $query->where('title', 'like', "%{$search}%"))
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Post $post): array => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'author' => $post->author->name,
                'tags' => $post->tags->pluck('name'),
                'created_at' => $post->created_at?->format('d.m.Y.'),
            ]);

        return Inertia::render('posts/index', [
            'posts' => $posts,
            'filters' => ['search' => $search],
            'blogUrl' => 'https://'.config('blog.domain'),
        ]);
    }

    public function create(string $current_team): Response
    {
        return Inertia::render('posts/create', [
            'availableTags' => $this->availableTags(),
        ]);
    }

    public function store(string $current_team, StorePostRequest $request): RedirectResponse
    {
        $post = Post::create([
            ...$this->attributesFrom($request),
            'user_id' => $request->user()->id,
            'cover_path' => $request->file('cover')?->store('posts/covers', 'public'),
        ]);

        $post->tags()->sync($this->tagIds($request->input('tags', [])));

        return redirect()
            ->route('posts.index', ['current_team' => $current_team])
            ->with('success', 'Post je objavljen.');
    }

    public function edit(string $current_team, Post $post): Response
    {
        $post->load('tags:id,name,slug');

        return Inertia::render('posts/edit', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'body' => $post->body,
                'coverUrl' => $post->coverUrl(),
                'metaTitle' => $post->meta_title,
                'metaDescription' => $post->meta_description,
                'tags' => $post->tags->pluck('name'),
            ],
            'availableTags' => $this->availableTags(),
            'publicUrl' => 'https://'.config('blog.domain').'/'.$post->slug,
        ]);
    }

    public function update(string $current_team, UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $attributes = $this->attributesFrom($request, $post);

        if ($request->hasFile('cover')) {
            $this->deleteCover($post);
            $attributes['cover_path'] = $request->file('cover')->store('posts/covers', 'public');
        } elseif ($request->boolean('remove_cover')) {
            $this->deleteCover($post);
            $attributes['cover_path'] = null;
        }

        $post->update($attributes);
        $post->tags()->sync($this->tagIds($request->input('tags', [])));

        return redirect()
            ->route('posts.index', ['current_team' => $current_team])
            ->with('success', 'Post je ažuriran.');
    }

    public function destroy(string $current_team, Post $post): RedirectResponse
    {
        $this->deleteCover($post);
        $post->delete();

        return redirect()
            ->route('posts.index', ['current_team' => $current_team])
            ->with('success', 'Post je obrisan.');
    }

    /**
     * Build the writable attributes, deriving a unique slug when none is given.
     *
     * @return array<string, mixed>
     */
    protected function attributesFrom(StorePostRequest|UpdatePostRequest $request, ?Post $post = null): array
    {
        return [
            'title' => $request->validated('title'),
            'slug' => $this->uniqueSlug(
                $request->validated('slug') ?: $request->validated('title'),
                $post,
            ),
            'excerpt' => $request->validated('excerpt'),
            'body' => $request->validated('body'),
            'meta_title' => $request->validated('meta_title'),
            'meta_description' => $request->validated('meta_description'),
        ];
    }

    /**
     * Slugify the given source and suffix it until it is free.
     */
    protected function uniqueSlug(string $source, ?Post $post = null): string
    {
        $base = Str::slug($source);
        $slug = $base;
        $suffix = 2;

        while (Post::where('slug', $slug)->when($post, fn ($query) => $query->whereKeyNot($post->getKey()))->exists()) {
            $slug = $base.'-'.$suffix++;
        }

        return $slug;
    }

    /**
     * Resolve tag names to ids, creating any tag that does not exist yet.
     *
     * @param  array<int, string>  $names
     * @return array<int, int>
     */
    protected function tagIds(array $names): array
    {
        return collect($names)
            ->map(fn (string $name): string => trim($name))
            ->filter()
            ->unique()
            ->map(fn (string $name): int => Tag::findOrCreateByName($name)->id)
            ->all();
    }

    /**
     * Remove the post's cover file from disk, if it has one.
     */
    protected function deleteCover(Post $post): void
    {
        if ($post->cover_path) {
            Storage::disk('public')->delete($post->cover_path);
        }
    }

    /**
     * Get every existing tag name for the admin form's autocomplete.
     *
     * @return array<int, string>
     */
    protected function availableTags(): array
    {
        return Tag::query()->orderBy('name')->pluck('name')->all();
    }
}
