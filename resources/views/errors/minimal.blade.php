<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>@yield('title') — Marijan Kopčić</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
            html, body { height: 100%; }
            body {
                background-color: #060e20;
                color: #dee5ff;
                font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
                -webkit-font-smoothing: antialiased;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
            }
            header {
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 50;
                background: rgba(6, 14, 32, 0.7);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                box-shadow: 0 40px 40px rgba(222, 229, 255, 0.04);
            }
            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                max-width: 80rem;
                margin: 0 auto;
                padding: 1rem 2rem;
            }
            .brand {
                font-size: 1.25rem;
                font-weight: 800;
                letter-spacing: -0.05em;
                color: #dee5ff;
                text-decoration: none;
                transition: color 0.2s;
            }
            .brand:hover { color: #06b77f; }
            main {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 6rem 2rem 4rem;
                text-align: center;
            }
            .error-code {
                font-size: clamp(6rem, 20vw, 12rem);
                font-weight: 800;
                line-height: 1;
                background: linear-gradient(135deg, #06b77f 0%, #3b82f6 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                letter-spacing: -0.04em;
                margin-bottom: 1.5rem;
                opacity: 0.9;
            }
            .error-title {
                font-size: clamp(1.5rem, 4vw, 2.25rem);
                font-weight: 700;
                color: #dee5ff;
                margin-bottom: 1rem;
                letter-spacing: -0.02em;
            }
            .error-message {
                font-size: 1.125rem;
                color: #91aaeb;
                max-width: 420px;
                margin: 0 auto 2.5rem;
                line-height: 1.6;
            }
            .btn-home {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: #06b77f;
                color: #060e20;
                font-weight: 700;
                font-size: 0.95rem;
                padding: 0.75rem 1.75rem;
                border-radius: 0.5rem;
                text-decoration: none;
                transition: background 0.2s, transform 0.15s;
                letter-spacing: -0.01em;
            }
            .btn-home:hover {
                background: #05a370;
                transform: translateY(-1px);
            }
            .divider {
                width: 3rem;
                height: 2px;
                background: linear-gradient(90deg, #06b77f, transparent);
                margin: 1.5rem auto;
                border-radius: 1px;
            }
        </style>
    </head>
    <body>
        <header>
            <nav>
                <a href="{{ config('app.url') }}" class="brand">The Architect</a>
            </nav>
        </header>
        <main>
            <div>
                <div class="error-code">@yield('code')</div>
                <div class="divider"></div>
                <h1 class="error-title">@yield('title')</h1>
                <p class="error-message">@yield('message')</p>
                <a href="{{ config('app.url') }}" class="btn-home">
                    ← Vrati se na početnu
                </a>
            </div>
        </main>
    </body>
</html>
