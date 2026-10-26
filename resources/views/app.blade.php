<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        {{--
            With SSR the Inertia head already carries the page <title>, so the
            SEOMeta one is dropped to avoid serving two. Without an SSR title
            (SSR down, or a page without <Head title>) the SEOMeta one stays.
        --}}
        @php
            $seoMeta = SEOMeta::generate();

            if (str_contains(app(\Inertia\Ssr\SsrState::class)->dispatch()?->head ?? '', '<title')) {
                $seoMeta = preg_replace('#<title[^>]*>.*?</title>#s', '', $seoMeta, 1);
            }
        @endphp
        {!! $seoMeta !!}
        {!! OpenGraph::generate() !!}
        {!! Twitter::generate() !!}

        @if(!empty($page['props']['schemaJson'] ?? null))
        <script type="application/ld+json">{!! $page['props']['schemaJson'] !!}</script>
        @endif

        @if($analyticsId = config('seo.analytics_id'))
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ $analyticsId }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '{{ $analyticsId }}');
        </script>
        @endif

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head />
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
