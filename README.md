# React Inertia Laravel

Laravel 13 + React + Inertia.js + Spatie stack pokrenuta na Laragonu (Windows).

## Stack

| Sloj | Tech |
|---|---|
| Backend | Laravel 13, PHP 8.4 |
| Frontend | React 19, TypeScript, Inertia.js |
| Stilovi | Tailwind CSS, shadcn/ui |
| Auth | Laravel Fortify |
| Routing | Laravel Wayfinder (type-safe routes) |
| Baza | PostgreSQL |
| Permisije | spatie/laravel-permission |
| Activity log | spatie/laravel-activitylog |
| Backup | spatie/laravel-backup |
| Log Viewer | opcodesio/log-viewer |
| Debug | barryvdh/laravel-debugbar |

## Pokretanje lokalnog okruženja

```bash
# Laragon mora biti pokrenut (Apache + PostgreSQL)
# Vite dev server
npm run dev

# ili build za produkciju
npm run build
```

## Baza podataka

- **Connection:** PostgreSQL (`pgsql`)
- **Host:** 127.0.0.1:5432
- **Database:** `react_inertia_laravel`
- **Username:** postgres

```bash
# Fresh migracije + seederi
php artisan migrate:fresh --seed
```

## Role

Dvije role su seedirane:
- `administrator`
- `user`

## Korisni linkovi (lokalno)

| | URL |
|---|---|
| Aplikacija | https://react-intertia-laravel.test |
| Log Viewer | https://react-intertia-laravel.test/log-viewer |
| Debugbar | Automatski prikazan u dev modu |

## Wayfinder (type-safe routes)

```bash
# Regeneriraj route tipove nakon promjene ruta
php artisan wayfinder:generate
```

## Pint (code style)

```bash
php artisan pint
```

## Lokalizacija

Aplikacija koristi **hrvatski** (`hr`) kao zadani jezik.

- `lang/hr/` — PHP prijevodi (auth, validation, passwords, pagination)
- `lang/hr.json` — JSON prijevodi (Fortify, inline poruke)
- Paket: `laravel-lang/common`

```bash
# Dodaj novi jezik
php artisan lang:add {locale}

# Ažuriraj prijevode
php artisan lang:update
```

## Error stranice

Publišane u `resources/views/errors/`:
`401`, `402`, `403`, `404`, `419`, `429`, `500`, `503`

## Testovi

```bash
php artisan test
# ili
./vendor/bin/pest
```
