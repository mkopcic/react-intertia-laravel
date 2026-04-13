# My Workshop

Laravel 13 + React 19 + Inertia.js SPA aplikacija.

**Live:** https://marijankopcic.from.hr

## Stack

| Sloj | Tech |
|---|---|
| Backend | Laravel 13, PHP 8.4 |
| Frontend | React 19, TypeScript, Inertia.js v3 |
| Stilovi | Tailwind CSS v4, shadcn/ui |
| Auth | Laravel Fortify (2FA podrška) |
| Routing | Laravel Wayfinder (type-safe routes) |
| Baza | SQLite (dev) |
| Permisije | spatie/laravel-permission |
| Activity log | spatie/laravel-activitylog |
| Backup | spatie/laravel-backup |
| Log Viewer | opcodesio/log-viewer (`/log-viewer`) |
| Debug | barryvdh/laravel-debugbar |
| SEO | artesaos/seotools (meta, OG, Twitter) |
| Schema.org | spatie/schema-org (JSON-LD) |
| Sitemap | spatie/laravel-sitemap |
| Analytics | Google Analytics 4 (`G-TJEYNEHL3P`) |

## Struktura projekta

```
app/
  Actions/         # Business logika (Fortify, Teams)
  Http/            # Controllers, Middleware, Requests
  Models/          # User, Team, TeamInvitation, Membership
  Policies/        # Autorizacijska pravila
resources/
  js/
    pages/         # Inertia stranice (React)
      auth/        # Login, Register, 2FA...
      settings/    # Profile, Security, Teams
      users/       # CRUD korisnici
    components/    # Dijeljene UI komponente
    routes/        # Wayfinder type-safe route funkcije
database/
  migrations/      # 8 migracija (users, teams, permissions, activity_log...)
  factories/       # Model factories za testiranje
  seeders/
public/
  build/           # Vite build output
```

## Modeli

| Model | Opis |
|---|---|
| `User` | Korisnik, 2FA, team membership |
| `Team` | Tim, owner, članovi, pozivnice |
| `TeamInvitation` | Pozivnica za tim |
| `Membership` | Pivot: user ↔ team s rolom |

## Rute (24 ukupno)

| Prefix | Opis |
|---|---|
| `GET /` | Welcome stranica |
| `POST /login`, `/logout`, `/register` | Autentikacija |
| `GET|POST /settings/profile` | Profil korisnika |
| `GET|PUT /settings/security` | Lozinka, 2FA |
| `GET|POST /settings/teams` | CRUD timovi |
| `GET|POST /{team}/users` | CRUD korisnici unutar tima |

## Instalacija

```bash
git clone git@github.com:mkopcic/react-intertia-laravel.git .
cp .env.example .env
touch database/database.sqlite
composer install --ignore-platform-reqs
php artisan key:generate
npm install && npm run build
php artisan migrate
```

## Korisne naredbe

```bash
# Wayfinder - regeneriraj route tipove nakon promjene ruta
php artisan wayfinder:generate

# Code style
vendor/bin/pint --dirty

# Testovi
php artisan test --compact

# Migracije fresh + seed
php artisan migrate:fresh --seed
```

## Korisni linkovi

| | URL |
|---|---|
| Aplikacija | https://marijankopcic.from.hr |
| Log Viewer | https://marijankopcic.from.hr/log-viewer |
| Sitemap | https://marijankopcic.from.hr/sitemap.xml |
| Google Search Console | https://search.google.com/search-console |
| Google Analytics | https://analytics.google.com |

## SEO & Analytics

| Komponenta | Status | Detalji |
|---|---|---|
| Meta tagovi (server-side) | ✅ | `artesaos/seotools` → `app.blade.php` |
| OpenGraph + Twitter Cards | ✅ | Generirani server-side |
| Google verificiacija | ✅ | DNS TXT + meta tag |
| XML Sitemap | ✅ | `/sitemap.xml`, dodan u Search Console |
| Schema.org JSON-LD | ✅ | Person + WebSite na hostu |
| Google Analytics 4 | ✅ | `G-TJEYNEHL3P`, Enhanced Measurement |
| robots.txt | ✅ | Sitemap naveden |
| Custom error stranice | ✅ | 403, 404, 429, 500, 503 — dark tema |

## Testovi

```bash
php artisan test --compact
# ili
./vendor/bin/pest
```

## Server (produkcija)

- **Server:** Rocky Linux 9, CWP Pro
- **Web:** Nginx + Apache (port 8181) + PHP-FPM 8.3
- **PHP pool:** `/opt/alt/php-fpm83/usr/etc/php-fpm.d/users/marijan.conf`
- **Branch:** `marijankopcic.from.hr`

> Nakon server restarta pokrenuti: `sudo kill -USR2 $(pgrep -f "php-fpm83.*master")`
