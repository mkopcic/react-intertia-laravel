<?php

/**
 * @see https://github.com/artesaos/seotools
 */

return [
    'inertia' => env('SEO_TOOLS_INERTIA', false),
    'meta' => [
        /*
         * The default configurations to be used by the meta generator.
         */
        'defaults' => [
            'title' => env('SEO_DEFAULT_TITLE', config('app.name')),
            'titleBefore' => false,
            'description' => env('SEO_DEFAULT_DESCRIPTION', false),
            'separator' => ' - ',
            'keywords' => [],
            'canonical' => 'full',
            'robots' => 'all',
        ],
        /*
         * Webmaster tags are always added.
         */
        'webmaster_tags' => [
            'google' => env('GOOGLE_SITE_VERIFICATION', null),
            'bing' => env('BING_SITE_VERIFICATION', null),
            'alexa' => null,
            'pinterest' => null,
            'yandex' => null,
            'norton' => null,
        ],

        'add_notranslate_class' => false,
    ],
    'opengraph' => [
        'defaults' => [
            'title' => env('SEO_DEFAULT_TITLE', config('app.name')),
            'description' => env('SEO_DEFAULT_DESCRIPTION', false),
            'url' => null,
            'type' => 'website',
            'site_name' => env('APP_NAME', 'Laravel'),
            'images' => [],
        ],
    ],
    'twitter' => [
        /*
         * The default values to be used by the twitter cards generator.
         */
        'defaults' => [
            // 'card'        => 'summary',
            // 'site'        => '@LuizVinicius73',
        ],
    ],
    'json-ld' => [
        /*
         * The default configurations to be used by the json-ld generator.
         */
        'defaults' => [
            'title' => env('SEO_DEFAULT_TITLE', config('app.name')),
            'description' => env('SEO_DEFAULT_DESCRIPTION', false),
            'url' => null,
            'type' => 'WebPage',
            'images' => [],
        ],
    ],
];
