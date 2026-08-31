<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Blog Domain
    |--------------------------------------------------------------------------
    |
    | The host the public blog is served from. It shares this application's
    | document root, so every blog route is constrained to this domain to
    | keep it from colliding with the portfolio routes on the apex host.
    |
    | This must never resolve to null: an unconstrained blog "/" route would
    | shadow the portfolio welcome page.
    |
    */

    'domain' => env('BLOG_DOMAIN', 'blog.'.parse_url((string) env('APP_URL', 'http://localhost'), PHP_URL_HOST)),

    /*
    |--------------------------------------------------------------------------
    | Posts Per Page
    |--------------------------------------------------------------------------
    */

    'per_page' => 9,

];
