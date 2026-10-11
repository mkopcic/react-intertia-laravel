<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Post;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;
use Spatie\Honeypot\Honeypot;
use Spatie\SchemaOrg\Schema;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class WelcomeController extends Controller
{
    /**
     * Files under the project's docs/ directory offered for download.
     *
     * @var array<string, array{name: string, type: string}>
     */
    private const DOCUMENTS = [
        'CV_Marijan_Kopcic_2026.pdf' => ['name' => 'CV — Marijan Kopčić (HR)', 'type' => 'PDF'],
        'CV_Marijan_Kopcic_2026_EN.pdf' => ['name' => 'CV — Marijan Kopčić (EN)', 'type' => 'PDF'],
    ];

    public function __construct(private readonly Honeypot $honeypot) {}

    public function index(): Response
    {
        $siteName = 'Marijan Kopčić';
        $seoTitle = 'Marijan Kopčić | Lead Laravel & Backend Engineer, DevOps';
        $seoDescription = 'Lead Laravel & backend engineer with 15+ years in production: application architecture, '
            .'data, deployment, security and infrastructure. Available for remote work.';
        $seoUrl = config('app.url');
        $personId = rtrim((string) $seoUrl, '/').'/#person';
        $websiteId = rtrim((string) $seoUrl, '/').'/#website';

        $websiteSchema = Schema::webSite()
            ->setProperty('@id', $websiteId)
            ->name($siteName)
            ->url($seoUrl)
            ->publisher(['@id' => $personId]);

        $personSchema = Schema::person()
            ->setProperty('@id', $personId)
            ->name('Marijan Kopčić')
            ->jobTitle('Lead Laravel & Backend Engineer')
            ->url($seoUrl)
            ->knowsAbout([
                'Laravel', 'PHP', 'Backend Architecture', 'PostgreSQL', 'MySQL', 'Redis', 'Queues',
                'Production Engineering', 'Linux', 'Nginx', 'DevOps', 'CI/CD', 'Docker', 'Security',
                'Legacy Modernization', 'Multi-tenancy', 'AI/MCP',
            ])
            ->description(
                'Lead Laravel & backend engineer with 15+ years of experience designing, shipping and operating '
                .'production systems, from application architecture and data to deployment, security and infrastructure.'
            )
            ->sameAs(array_values(array_filter(config('seo.social'))));

        $profilePageSchema = Schema::profilePage()
            ->name($seoTitle)
            ->url($seoUrl)
            ->isPartOf(['@id' => $websiteId])
            ->mainEntity($personSchema);

        SEOMeta::setTitle($seoTitle, false)
            ->setDescription($seoDescription)
            ->setCanonical($seoUrl);

        OpenGraph::setTitle($seoTitle)
            ->setSiteName($siteName)
            ->setDescription($seoDescription)
            ->setUrl($seoUrl)
            ->addProperty('type', 'website')
            ->addImage($seoUrl.'/og-image.jpg');

        TwitterCard::setTitle($seoTitle)
            ->setDescription($seoDescription)
            ->setType('summary_large_image')
            ->addValue('image', $seoUrl.'/og-image.jpg');

        $websiteArray = $websiteSchema->toArray();
        unset($websiteArray['@context']);

        $profilePageArray = $profilePageSchema->toArray();
        unset($profilePageArray['@context']);

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'honeypot' => $this->honeypot->toArray(),
            'latestPosts' => $this->latestPosts(),
            'seo' => [
                'title' => $seoTitle,
                'description' => $seoDescription,
                'url' => $seoUrl,
            ],
            'schemaJson' => json_encode([
                '@context' => 'https://schema.org',
                '@graph' => [$websiteArray, $profilePageArray],
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        ]);
    }

    /**
     * The newest blog posts, linked from the portfolio to the blog host.
     *
     * @return array<int, array{title: string, excerpt: ?string, url: string, publishedAt: ?string}>
     */
    protected function latestPosts(): array
    {
        return Post::query()
            ->latest()
            ->limit(3)
            ->get(['title', 'slug', 'excerpt', 'created_at'])
            ->map(fn (Post $post): array => [
                'title' => $post->title,
                'excerpt' => $post->excerpt,
                'url' => 'https://'.config('blog.domain').'/'.$post->slug,
                'publishedAt' => $post->created_at?->toIso8601String(),
            ])
            ->all();
    }

    public function document(string $document): BinaryFileResponse
    {
        abort_unless(array_key_exists($document, self::DOCUMENTS), 404);

        return response()->file(base_path('docs/'.$document));
    }
}
