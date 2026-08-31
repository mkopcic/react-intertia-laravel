<?php

declare(strict_types=1);

namespace App\Http\Controllers;

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
        $websiteSchema = Schema::webSite()
            ->name(config('app.name'))
            ->url(config('app.url'));

        $personSchema = Schema::person()
            ->name('Marijan Kopčić')
            ->jobTitle('Lead Full-Stack Developer & DevOps Engineer')
            ->url(config('app.url'))
            ->knowsAbout(['Laravel', 'PHP', 'React', 'TypeScript', 'DevOps', 'Docker', 'AI/MCP'])
            ->description(
                'Full-stack developer and DevOps engineer with 15+ years of experience '
                .'building production-grade web applications, SaaS platforms, and cloud infrastructure.'
            )
            ->sameAs(array_values(array_filter(config('seo.social'))));

        $seoTitle = 'Marijan Kopčić | Lead Laravel & DevOps Engineer';
        $seoDescription = '15+ years building SaaS platforms, AI integrations, and cloud infrastructure. '
            .'Available for remote Laravel & DevOps projects.';
        $seoUrl = config('app.url');

        SEOMeta::setTitle($seoTitle, false)
            ->setDescription($seoDescription)
            ->setCanonical($seoUrl);

        OpenGraph::setTitle($seoTitle)
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

        $personArray = $personSchema->toArray();
        unset($personArray['@context']);

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'documents' => $this->documents(),
            'honeypot' => $this->honeypot->toArray(),
            'seo' => [
                'title' => $seoTitle,
                'description' => $seoDescription,
                'url' => $seoUrl,
            ],
            'schemaJson' => json_encode([
                '@context' => 'https://schema.org',
                '@graph' => [$websiteArray, $personArray],
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        ]);
    }

    public function document(string $document): BinaryFileResponse
    {
        abort_unless(array_key_exists($document, self::DOCUMENTS), 404);

        return response()->file(base_path('docs/'.$document));
    }

    /**
     * The downloadable documents offered on the portfolio page.
     *
     * @return array<int, array{name: string, type: string, url: string}>
     */
    protected function documents(): array
    {
        return collect(self::DOCUMENTS)
            ->map(fn (array $document, string $file): array => [
                'name' => $document['name'],
                'type' => $document['type'],
                'url' => rtrim((string) config('app.url'), '/').'/docs/'.$file,
            ])
            ->values()
            ->all();
    }
}
