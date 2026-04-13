<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;
use Spatie\Honeypot\Honeypot;
use Spatie\SchemaOrg\Schema;

class WelcomeController extends Controller
{
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
                'Full-stack developer and DevOps engineer with 8+ years of experience '
                .'building production-grade web applications, SaaS platforms, and cloud infrastructure.'
            )
            ->sameAs(array_filter([
                env('SOCIAL_GITHUB', ''),
                env('SOCIAL_LINKEDIN', ''),
            ]));

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'honeypot' => $this->honeypot->toArray(),
            'seo' => [
                'title' => 'Marijan Kopčić | Lead Laravel & DevOps Engineer',
                'description' => '8+ years building SaaS platforms, AI integrations, and cloud infrastructure. '
                    .'Available for remote Laravel & DevOps projects.',
                'url' => config('app.url'),
            ],
            'schemaJson' => json_encode([
                '@context' => 'https://schema.org',
                '@graph' => [
                    $websiteSchema->toArray(),
                    $personSchema->toArray(),
                ],
            ]),
        ]);
    }
}
