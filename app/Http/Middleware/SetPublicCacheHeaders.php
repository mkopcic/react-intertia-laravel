<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetPublicCacheHeaders
{
    /**
     * Paths safe to hand to a shared cache: no session, no CSRF token, no
     * per-visitor content. Their cookies are stripped below before the
     * response is marked public.
     */
    private const SHARED_CACHE_PATHS = ['/sitemap.xml', '/robots.txt'];

    /**
     * Public HTML documents. These carry a session cookie and a CSRF token,
     * so they may be cached by the visitor's own browser only.
     */
    private const DOCUMENT_PATHS = ['/'];

    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (! $request->isMethod('GET')) {
            return $response;
        }

        $path = $request->getPathInfo();

        /**
         * The shared cache in front of this app does not vary on X-Inertia:
         * the live response comes back with "Vary: Accept-Encoding" only,
         * because nginx drops everything else. Anything cached publicly is
         * therefore served to every visitor and to every Inertia XHR alike,
         * which is why a response carrying Set-Cookie must never be public —
         * it would hand one visitor's session and CSRF token to the next.
         */
        if (in_array($path, self::SHARED_CACHE_PATHS, true)) {
            $this->stripCookies($response);

            $response->headers->set('Cache-Control', 'public, max-age=3600, s-maxage=86400');

            return $response;
        }

        if (in_array($path, self::DOCUMENT_PATHS, true)) {
            $response->headers->set('Cache-Control', 'private, max-age=0, must-revalidate');
        }

        return $response;
    }

    /**
     * Drop every cookie from the response so it can be cached publicly.
     */
    private function stripCookies(Response $response): void
    {
        foreach ($response->headers->getCookies() as $cookie) {
            $response->headers->removeCookie($cookie->getName(), $cookie->getPath(), $cookie->getDomain());
        }

        $response->headers->remove('Set-Cookie');
    }
}
