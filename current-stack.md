# Current Stack - React Inertia Laravel

**Status dokumenta:** ✅ Aktualno (12. April 2026)  
**Svrha:** Kompletna dokumentacija trenutnog tech stack-a projekta za potrebe migracije na Android TV aplikaciju

---

## 📋 Pregled Projekta

**Tip:** Laravel 13 + React 19 + Inertia.js SPA  
**Pattern:** Monolith sa server-side routing i client-side rendering  
**Auth:** Laravel Fortify (2FA, Teams, Email verification)  
**Jezik:** Hrvatski (hr) - app locale  

---

## 🔧 Backend Stack

### Core Framework
- **Laravel Framework:** `^13.0` (najnovija verzija)
- **PHP:** `^8.3` (sa strict types)
- **Database:** PostgreSQL 17
  - Connection: `pgsql`
  - Port: `5432`
  - Database: `react_inertia_laravel`

### Authentication & Authorization
- **Laravel Fortify:** `^1.34`
  - Two-Factor Authentication (2FA)
  - Email Verification
  - Password Reset
  - Profile Management
- **Spatie Permission:** `*` (najnovija)
  - Role-Based Access Control (RBAC)
  - Permission management
  - Team-based permissions

### Laravel Paketi
| Paket | Verzija | Svrha |
|-------|---------|-------|
| `inertiajs/inertia-laravel` | `^3.0` | Server-side Inertia adapter |
| `laravel/wayfinder` | `^0.1.15` | Type-safe routing za TypeScript |
| `spatie/laravel-activitylog` | `*` | Logging korisničkih aktivnosti |
| `spatie/laravel-backup` | `*` | Backup baze i fajlova |
| `opcodesio/log-viewer` | `*` | Web UI za pregled logova (`/log-viewer`) |
| `barryvdh/laravel-debugbar` | `*` | Debug toolbar za development |
| `laravel-lang/common` | `^6.8` | Hrvatski jezik paketi |
| `laravel/tinker` | `^3.0` | REPL za Laravel |

### Development Alati
- **Laravel Boost:** `^2.4` - MCP server sa alatima za development
- **Laravel Pail:** `^1.2.5` - Real-time log viewer
- **Laravel Pint:** `^1.27` - PHP code formatter (PSR-12)
- **Laravel Sail:** `^1.53` - Docker development okruženje (neaktivno)
- **Pest:** `^4.4` - Testing framework
- **Mockery:** `^1.6` - Mocking library

### Sesije & Queue
- **Session Driver:** `database` (PostgreSQL)
- **Queue Connection:** `database` 
- **Cache Store:** `database`

---

## ⚛️ Frontend Stack

### Core Libraries
- **React:** `^19.2.0` (najnovija stabilna verzija)
- **React DOM:** `^19.2.0`
- **TypeScript:** `^5.7.2` (strict mode enabled)
- **Inertia.js React:** `^3.0.0`
- **Inertia Vite Plugin:** `^3.0.0`

### Build Tools
- **Vite:** `^8.0.0`
  - Plugin: `laravel-vite-plugin` `^3.0.0`
  - Plugin: `@vitejs/plugin-react` `^5.2.0`
  - Plugin: `@inertiajs/vite` `^3.0.0`
- **Babel:** `babel-plugin-react-compiler` `^1.0.0` (React Compiler enabled!)

### UI Framework & Components
- **Tailwind CSS:** `^4.0.0`
  - Plugin: `@tailwindcss/vite` `^4.1.11`
  - Utilities: `tailwind-merge` `^3.0.1`, `clsx` `^2.1.1`
  - Animations: `tw-animate-css` `^1.4.0`
- **Class Variance Authority:** `^0.7.1` (CVA za variants)
- **shadcn/ui:** Custom instaliran (baziran na Radix UI)
  - Radix UI primitives (sve komponente)
  - Lucide React ikone `^0.475.0`

### Radix UI Komponente
```
@radix-ui/react-avatar          ^1.1.3
@radix-ui/react-checkbox        ^1.1.4
@radix-ui/react-collapsible     ^1.1.3
@radix-ui/react-dialog          ^1.1.6
@radix-ui/react-dropdown-menu   ^2.1.6
@radix-ui/react-label           ^2.1.2
@radix-ui/react-navigation-menu ^1.2.5
@radix-ui/react-select          ^2.1.6
@radix-ui/react-separator       ^1.1.2
@radix-ui/react-slot            ^1.2.3
@radix-ui/react-toggle          ^1.1.2
@radix-ui/react-toggle-group    ^1.1.2
@radix-ui/react-tooltip         ^1.1.8
```

### Dodatne Libraries
- **Headless UI:** `^2.2.0` - HeadlessUI komponente za React
- **SweetAlert2:** `^11.26.24` - Beautiful modals i alerts
- **Input OTP:** `^1.4.2` - OTP/Verification code input

### Type-Safe Routing
- **Laravel Wayfinder:**
  - Backend: `laravel/wayfinder` `^0.1.15`
  - Frontend: `@laravel/vite-plugin-wayfinder` `^0.1.7`
  - Config: `formVariants: true` (za forme)
  - Generira TypeScript funkcije iz Laravel routes

---

## 🛠️ Development Tooling

### Code Quality
| Tool | Verzija | Svrha |
|------|---------|-------|
| **ESLint** | `^9.17.0` | JavaScript/TypeScript linter |
| **Prettier** | `^3.4.2` | Code formatter |
| **TypeScript ESLint** | `^8.23.0` | TypeScript-specific linting |
| **Laravel Pint** | `^1.27` | PHP code formatter (PSR-12) |

### ESLint Plugins
```
@eslint/js                        ^9.19.0
@stylistic/eslint-plugin          ^5.10.0
eslint-config-prettier            ^10.0.1
eslint-import-resolver-typescript ^4.4.4
eslint-plugin-import              ^2.32.0
eslint-plugin-react               ^7.37.3
eslint-plugin-react-hooks         ^7.0.0
```

### Prettier Plugins
- `prettier-plugin-tailwindcss` `^0.6.11` - Sortira Tailwind klase

### Scripts (package.json)
```json
"scripts": {
  "dev": "vite",                          // Vite dev server
  "build": "vite build",                  // Production build
  "build:ssr": "vite build && vite build --ssr", // SSR build
  "format": "prettier --write resources/",
  "format:check": "prettier --check resources/",
  "lint": "eslint . --fix",
  "lint:check": "eslint .",
  "types:check": "tsc --noEmit"
}
```

### Composer Scripts
```json
"dev": "concurrently -c \"#93c5fd,#c4b5fd,#fdba74\" 
       \"php artisan serve\" 
       \"php artisan queue:listen --tries=1\" 
       \"npm run dev\" 
       --names='server,queue,vite'",
"test": "php artisan test",
"lint": "pint --parallel",
"lint:check": "pint --parallel --test"
```

---

## 📁 Struktura Frontend Koda

### Glavna Struktura (`resources/js/`)
```
resources/js/
├── actions/            # Server actions (Wayfinder)
├── app.tsx            # Inertia app bootstrap
├── components/        # React komponente
│   ├── ui/           # shadcn/ui komponente (28 komada)
│   └── *.tsx         # Custom app komponente
├── hooks/            # Custom React hooks
├── layouts/          # Layout komponente
│   ├── app/         # Authenticated app layouts
│   ├── auth/        # Auth page layouts
│   ├── settings/    # Settings page layouts
│   ├── app-layout.tsx
│   └── auth-layout.tsx
├── lib/              # Utility functions
├── pages/            # Inertia stranice
│   ├── auth/        # Auth stranice (login, register, 2FA)
│   ├── settings/    # Settings stranice
│   ├── teams/       # Team management
│   ├── dashboard.tsx
│   └── welcome.tsx
├── routes/           # Wayfinder generisani routes
├── types/            # TypeScript definicije
└── wayfinder/        # Wayfinder config
```

### shadcn/ui Komponente (28 instaliranih)
```
alert.tsx          dropdown-menu.tsx   separator.tsx
avatar.tsx         icon.tsx            sheet.tsx
badge.tsx          input-otp.tsx       sidebar.tsx
breadcrumb.tsx     input.tsx           skeleton.tsx
button.tsx         label.tsx           spinner.tsx
card.tsx           navigation-menu.tsx toggle-group.tsx
checkbox.tsx       placeholder-pattern.tsx toggle.tsx
collapsible.tsx    select.tsx          tooltip.tsx
dialog.tsx
```

### Custom App Komponente (26 komada)
```
alert-error.tsx              nav-main.tsx
app-content.tsx              nav-user.tsx
app-header.tsx               password-input.tsx
app-logo-icon.tsx            remove-member-modal.tsx
app-logo.tsx                 team-switcher.tsx
app-shell.tsx                text-link.tsx
app-sidebar-header.tsx       two-factor-recovery-codes.tsx
app-sidebar.tsx              two-factor-setup-modal.tsx
appearance-tabs.tsx          user-info.tsx
breadcrumbs.tsx              user-menu-content.tsx
cancel-invitation-modal.tsx  
create-team-modal.tsx
delete-team-modal.tsx
delete-user.tsx
heading.tsx
input-error.tsx
invite-member-modal.tsx
nav-footer.tsx
```

### Layout Pattern
- **Conditional Layout Rendering** (vidi `app.tsx`):
  - `welcome` stranica: Bez layout-a
  - `auth/*`: `AuthLayout`
  - `settings/*`, `teams/*`: `AppLayout` + `SettingsLayout` (nested)

---

## 🎨 Styling & Design System

### Tailwind CSS v4
- **Vite Plugin:** `@tailwindcss/vite` (direktna integracija)
- **Utilities:**
  - `tailwind-merge` - Merge konfliktnih klasa
  - `clsx` - Conditional class names
  - `tw-animate-css` - Tailwind animacije
- **Class Variance Authority (CVA):** Za component variants

### Design Tokens
- **Ikone:** Lucide React (475+ ikona)
- **Boje:** Custom palette (definisano u Tailwind config)
- **Tipografija:** System fonts
- **Spacing:** Tailwind default (4px grid)

---

## 🔐 Authentication Flow

### Features
1. **Login/Register** - Laravel Fortify
2. **Email Verification** - Required
3. **Two-Factor Authentication (2FA)**
   - QR kod setup
   - Recovery kodovi (8 kodova)
   - Modal za setup (`two-factor-setup-modal.tsx`)
4. **Password Reset** - Email link
5. **Profile Management** - User info, password update

### Team Management
- **Team Creation** - Modal (`create-team-modal.tsx`)
- **Team Switching** - Dropdown (`team-switcher.tsx`)
- **Member Invitations** - Email invites
- **Roles:** Definisano u `TeamRole` enum
- **Policies:** `TeamPolicy` za authorization

---

## 🌍 Internationalization (i18n)

### Backend
- **Locale:** `hr` (Hrvatski)
- **Fallback:** `hr`
- **Faker Locale:** `hr_HR`
- **Paket:** `laravel-lang/common` `^6.8`

### Frontend
- Translation fajlovi u `lang/hr.json` i `lang/hr/`
- JSON prijevodi za frontend
- PHP prijevodi za backend/validation

---

## 🗄️ Database Schema (Highlights)

### Core Tables
- `users` - Korisnici (2FA, email verification)
- `teams` - Teams (sa slugs)
- `memberships` - User-Team veze
- `team_invitations` - Pending invites
- `sessions` - Database sessions
- `cache` - Database cache
- `jobs` - Queue jobs
- `activity_log` - Spatie activity log

### Eloquent Models
```
app/Models/
├── User.php            # Traits: HasTeams, PasswordValidationRules
├── Team.php            # Trait: GeneratesUniqueTeamSlugs
├── Membership.php      # Pivot model
└── TeamInvitation.php  # Team invite model
```

---

## 🚀 Development Environment

### Local Setup
- **OS:** Windows 11
- **Server:** Laragon (Apache + Nginx)
- **PHP:** 8.3+
- **Database:** PostgreSQL 17
- **Node:** Compatible sa Vite 8
- **URL:** `https://react-intertia-laravel.test`

### Development Server
```bash
# Start all services (Laravel + Queue + Vite)
composer run dev

# Samo Vite
npm run dev

# Samo Laravel
php artisan serve

# Queue worker
php artisan queue:listen --tries=1
```

### Build
```bash
# Production build
npm run build

# SSR build
npm run build:ssr

# Laravel assets
php artisan vendor:publish --tag=laravel-assets --force
```

---

## 🧪 Testing

### Framework
- **Pest 4:** `^4.4` - Modern testing framework
- **PHPUnit:** `^12` (dependency)
- **Mockery:** `^1.6` - Mocking

### Test Structure
```
tests/
├── Feature/  # Feature testi (HTTP, Database)
├── Unit/     # Unit testi
├── Pest.php  # Pest konfiguracija
└── TestCase.php
```

### Running Tests
```bash
composer test          # Lint + Test
php artisan test       # Samo testi
php artisan test --filter=TestName
php artisan test --compact
```

---

## 📦 Build Artifacts

### Production Build
```
public/build/
├── assets/           # JS, CSS bundles
└── manifest.json     # Vite manifest
```

### TypeScript Config
- **Target:** ESNext
- **Module:** ESNext
- **Module Resolution:** bundler
- **Strict Mode:** ✅ Enabled
- **Allow JS:** ✅ Enabled

---

## 🔌 Integrations & Tools

### Laravel Boost (MCP Server)
- **Config:** `boost.json`
  - Agents: `["copilot"]`
  - MCP: `true`
  - Nightwatch MCP: `false`
  - Sail: `false`
- **Tools:**
  - `database-query` - Read-only DB queries
  - `database-schema` - Table structure inspection
  - `get-absolute-url` - URL resolution
  - `browser-logs` - Browser error logs
  - `search-docs` - Version-specific docs search

### Wayfinder (Type-Safe Routes)
- **Generisanje:** `php artisan wayfinder:generate`
- **Output:** `resources/js/routes/` i `resources/js/actions/`
- **Config:**
  - `formVariants: true` - Form action variants
  - Auto-import iz `@/actions/` i `@/routes/`

### Log Viewer
- **URL:** `/log-viewer`
- **Package:** `opcodesio/log-viewer`
- **Dostupni logovi:** Laravel log fajlovi

### Debug Bar
- **Package:** `barryvdh/laravel-debugbar`
- **Enabled:** `APP_DEBUG=true` (local only)

---

## 📝 Coding Conventions

### Backend (PHP)
- ✅ PHP 8.4 sintaksa (strict types)
- ✅ Laravel 13 best practices
- ✅ PSR-12 code style (Laravel Pint)
- ✅ Action klase za business logiku
- ✅ Form Request validacija
- ✅ Policies za authorization
- ✅ Spatie Permission za role checks

### Frontend (React/TypeScript)
- ✅ TypeScript strict mode - **nema `any`**
- ✅ React 19 features (Compiler enabled)
- ✅ Inertia useForm() za sve forme
- ✅ **UVIJEK** koristiti Wayfinder type-safe routes (ne hardcode stringove)
- ✅ **UVIJEK** koristiti Inertia `<Link>` (ne `<a>`)
- ✅ shadcn/ui komponente za UI
- ✅ CVA za component variants
- ✅ Tailwind utilities (no custom CSS)

### File Naming
- **Backend:** PascalCase (klase), snake_case (tabele, migracije)
- **Frontend:** kebab-case (fajlovi), PascalCase (komponente)
- **Routes:** kebab-case URLs

---

## ⚠️ Known Issues & Notes

### Performance
- ✅ React Compiler enabled (babel-plugin-react-compiler)
- ✅ Vite 8 - najbrži bundler
- ✅ Optimized imports (tree-shaking)

### Browser Support
- Modern browsers only (ESNext target)
- No IE11 support

### SSR
- SSR build dostupan: `npm run build:ssr`
- Inertia SSR plugin: `@inertiajs/vite`
- Ne radi default u dev mode (opciono)

### Wayfinder
- ⚠️ **MORA** se regenerirati nakon svake promjene ruta:
  ```bash
  php artisan wayfinder:generate
  ```

---

## 🎯 Za Android TV Migraciju - Ključne Stvari

### ✅ Što je Odlično za Mobile/TV
1. **React 19 komponente** - Lako se mogu adaptirati za React Native
2. **TypeScript strict** - Type safety prenosi se na mobile
3. **shadcn/ui pattern** - Može se replikovati sa React Native primitives
4. **Wayfinder routing** - Potrebno replikovati za mobile API calls
5. **Inertia pattern** - Backend ostaje isti, samo frontend se mijenja

### ⚠️ Što Treba Refaktorisati
1. **Inertia.js** - Ne radi na mobile (treba REST API umjesto)
2. **Tailwind CSS** - Ne postoji za React Native (NativeWind ili StyleSheet)
3. **Radix UI** - Ne postoji za React Native (treba React Native paper/elements)
4. **DOM events** - Različiti na TV (D-pad, remote fokus)
5. **Navigation** - React Navigation umjesto Inertia router

### 💡 Preporuke
1. **Zadržati:** Laravel backend (kao API)
2. **Zamijeniti:** Inertia → REST/GraphQL API
3. **Zamijeniti:** React DOM → React Native/Expo
4. **Dodati:** TV-specific navigation (fokus management)
5. **Dodati:** Offline-first sa SQLite/AsyncStorage

---

## 📚 Referencias & Dokumentacija

- Laravel 13: https://laravel.com/docs/13.x
- Inertia.js v3: https://inertiajs.com
- React 19: https://react.dev
- Wayfinder: https://github.com/laravel/wayfinder
- Tailwind CSS v4: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com
- Radix UI: https://radix-ui.com
- Spatie Permission: https://spatie.be/docs/laravel-permission
- Laravel Boost: https://boost.laravel.com

---

**Zadnja izmjena:** 12. April 2026  
**Autor:** Generated by GitHub Copilot  
**Verzija:** 1.0
