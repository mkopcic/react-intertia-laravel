<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetPublicCacheHeaders
{
    private const PUBLIC_PATHS = ['/', '/sitemap.xml', '/robots.txt'];

    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($request->isMethod('GET') && in_array($request->getPathInfo(), self::PUBLIC_PATHS, true)) {
            $response->headers->set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
        }

        return $response;
    }
}
