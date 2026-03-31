# Copilot Instructions

## Projekt

Laravel 13 + React 19 + Inertia.js + TypeScript SPA. Auth via Laravel Fortify. Stilovi: Tailwind CSS + shadcn/ui komponente.

## Konvencije

### Backend (PHP/Laravel)
- PHP 8.4, strict types
- Laravel 13 konvencije (actions, form requests, policies)
- Spatie permission: uvijek koristiti `$user->hasRole()` / `$user->can()` za provjeru permisija
- Modeli u `app/Models/`, Actions u `app/Actions/`
- Migracije: snake_case nazivi tablica, timestamps uvijek uključeni
- Logiku stavljaj u Action klase, ne u controllere direktno

### Frontend (React/TypeScript)
- TypeScript strict mode — nema `any`
- Komponente u `resources/js/components/`, stranice u `resources/js/pages/`
- Layouts: `app-layout.tsx` za autentificirane stranice, `auth-layout.tsx` za auth stranice
- Svaka Page komponenta ima `.layout` property za breadcrumbs
- Routing: UVIJEK koristiti Wayfinder type-safe route funkcije iz `resources/js/routes/` umjesto hardcodiranih stringova
- Koristiti shadcn/ui komponente (`Button`, `Input`, `Card`, `Dialog`, itd.) za UI
- Inertia `useForm()` za sve forme
- State management: Inertia props, ne Redux/Zustand

### Baza
- PostgreSQL 17
- Wayfinder regeneriraj nakon svake promjene ruta: `php artisan wayfinder:generate`

## Instalirani paketi

- `spatie/laravel-permission` — role i permisije
- `spatie/laravel-activitylog` — logiranje aktivnosti
- `spatie/laravel-backup` — backup baze i fajlova
- `opcodesio/log-viewer` — pregled logova na `/log-viewer`
- `barryvdh/laravel-debugbar` — debug toolbar

## Tipične greške koje treba izbjegavati

- Ne editirati fajlove iz starter kita bez jasnog zahtjeva
- Ne koristiti `route()` helper — koristiti Wayfinder funkcije
- Ne koristiti `<a>` tagove direktno — koristiti Inertia `<Link>`
- Spatie permission `can()` radi samo ako je `PermissionRegistrar` registriran — uvijek seed role prije testiranja
- PostgreSQL ne podržava `->boolean()` kao MySQL — koristiti `->boolean()` koji mapira na `bool` tip
