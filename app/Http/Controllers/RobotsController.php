<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RobotsController extends Controller
{
    /**
     * Paths kept out of every index, on both hosts.
     *
     * @var array<int, string>
     */
    private const DISALLOWED = [
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
        '/dashboard',
    ];

    /**
     * Serve robots.txt for whichever host asked for it.
     *
     * The portfolio and the blog share one document root, so a static
     * public/robots.txt is handed to both domains and can only ever name one
     * sitemap. Serving it from a route lets each host advertise its own.
     */
    public function index(Request $request): Response
    {
        $lines = ['User-agent: *'];

        foreach (self::DISALLOWED as $path) {
            $lines[] = 'Disallow: '.$path;
        }

        $lines[] = '';
        $lines[] = 'Sitemap: '.$this->sitemapUrl($request);

        return response(implode("\n", $lines)."\n", 200, [
            'Content-Type' => 'text/plain; charset=UTF-8',
        ]);
    }

    /**
     * Point each host at the sitemap that actually lists its URLs.
     */
    private function sitemapUrl(Request $request): string
    {
        if ($request->getHost() === config('blog.domain')) {
            return 'https://'.config('blog.domain').'/sitemap.xml';
        }

        return rtrim((string) config('app.url'), '/').'/sitemap.xml';
    }
}
