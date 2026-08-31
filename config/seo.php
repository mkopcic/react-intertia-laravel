<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Google Analytics
    |--------------------------------------------------------------------------
    |
    | Read through config so the root view keeps working once the config
    | cache is warmed. env() returns null from a cached config, which would
    | silently drop the analytics snippet from every page.
    |
    */

    'analytics_id' => env('VITE_GA_MEASUREMENT_ID'),

    /*
    |--------------------------------------------------------------------------
    | Social Profiles
    |--------------------------------------------------------------------------
    |
    | Published as the "sameAs" list of the Person schema on the portfolio.
    |
    */

    'social' => [
        'github' => env('SOCIAL_GITHUB'),
        'linkedin' => env('SOCIAL_LINKEDIN'),
        'facebook' => env('SOCIAL_FACEBOOK'),
    ],

];
