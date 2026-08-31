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
            /**
             * The same path answers both the full HTML document and Inertia's
             * JSON XHR. Without varying on X-Inertia a shared cache hands the
             * cached HTML back to an Inertia visit, which then renders the whole
             * page inside its raw-response dialog. The document is cached by
             * shared caches only (max-age=0), never by the browser, because
             * nginx drops the Vary header this would otherwise rely on.
             */
            $response->headers->set('Vary', 'X-Inertia', false);

            $response->headers->set(
                'Cache-Control',
                $request->hasHeader('X-Inertia')
                    ? 'private, no-store'
                    : 'public, max-age=0, s-maxage=86400',
            );
        }

        return $response;
    }
}
