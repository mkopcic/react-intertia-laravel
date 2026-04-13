# SEO Paketi za Laravel

*Zadnje ažurirano: April 2026*

---

## Što je implementirano

| Komponenta | Paket / Rješenje | Status |
|---|---|---|
| XML Sitemap | `spatie/laravel-sitemap` | ✅ instalirano + ruta |
| Schema.org JSON-LD | `spatie/schema-org` | ✅ instalirano + implementirano |
| SEO Meta / OpenGraph / Twitter | `artesaos/seotools` | ✅ instalirano + implementirano |
| Spam zaštita forme | `spatie/laravel-honeypot` | ✅ instalirano + implementirano |
| Robots.txt | `spatie/robots-txt` | ✅ (dependency sitemapa) |
| Google Analytics 4 | GTM snippet u Reactu | 🔧 env varijabla spremna |

---

## Implementirane rute

| URL | Controller | Opis |
|---|---|---|
| `GET /` | `WelcomeController@index` | Landing page + SEO props |
| `GET /sitemap.xml` | `SitemapController@index` | XML sitemap za Google Search Console |
| `POST /contact` | `ContactController@store` | Kontakt forma (honeypot zaštita) |

---

## Sitemap

### spatie/laravel-sitemap ✅
- **Repo:** https://github.com/spatie/laravel-sitemap
- **Config:** `config/sitemap.php`
- **Ruta:** `GET /sitemap.xml`
- **Controller:** `app/Http/Controllers/SitemapController.php`
- **Google Search Console:** Dodaj `https://tvoja-domena.com/sitemap.xml`
- **Install:** `composer require spatie/laravel-sitemap --ignore-platform-reqs`

#### Dodavanje novih URL-ova u sitemap
```php
// app/Http/Controllers/SitemapController.php
$sitemap = Sitemap::create()
    ->add(Url::create('/')->setPriority(1.0)->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY))
    ->add(Url::create('/about')->setPriority(0.8))
    ->add(Url::create('/projects')->setPriority(0.7));
```

---

## SEO Meta Tags, OpenGraph, Twitter Cards

### artesaos/seotools ✅
- **Repo:** https://github.com/artesaos/seotools
- **Config:** `config/seotools.php`
- **Implementirano:** Inertia props iz `WelcomeController` → `welcome.tsx` `<Head>`
- **Install:** `composer require artesaos/seotools`

#### Implementacija (WelcomeController → welcome.tsx)
Server-side u `WelcomeController::index()` generiraju se `seo` props koji se renderaju u `<Head>` Inertia komponente:
```tsx
// resources/js/pages/welcome.tsx
<Head title={seo.title}>
    <meta name="description" content={seo.description} />
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.description} />
    <meta property="og:url" content={seo.url} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="canonical" href={seo.url} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
</Head>
```

---

## Schema.org Structured Data

### spatie/schema-org ✅
- **Repo:** https://github.com/spatie/schema-org
- **Implementirano:** `Person` + `WebSite` JSON-LD u `WelcomeController`
- **Install:** `composer require spatie/schema-org --ignore-platform-reqs`

#### Implementirani tipovi
```php
// app/Http/Controllers/WelcomeController.php
Schema::webSite()->name(...)->url(...)
Schema::person()->name('Marijan Kopčić')->jobTitle(...)->knowsAbout([...])->sameAs([...])
```

---

## Spam zaštita (Honeypot)

### spatie/laravel-honeypot ✅
- **Repo:** https://github.com/spatie/laravel-honeypot
- **Config:** `config/honeypot.php`
- **Spam responder:** `app/Support/InertiaSpamResponder.php` (redirect back s flash error)
- **Middleware:** `ProtectAgainstSpam` na `POST /contact`
- **Frontend:** Honeypot hidden fields u `contact-section.tsx` putem `useForm()`
- **Install:** `composer require spatie/laravel-honeypot --ignore-platform-reqs`

---

## Google Analytics 4

- **Rješenje:** `VITE_GA_MEASUREMENT_ID` env varijabla
- **Implementacija:** GTM snippet direktno u React (`import.meta.env.VITE_GA_MEASUREMENT_ID`)
- **Status:** 🔧 env varijabla pripremljena, snippet nije dodan (nema GA4 ID-a)

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## .env varijable

```env
# SEO
SEO_DEFAULT_TITLE="${APP_NAME}"
SEO_DEFAULT_DESCRIPTION=
GOOGLE_SITE_VERIFICATION=        # Google Search Console meta verification
BING_SITE_VERIFICATION=          # Bing Webmaster Tools

# Google Analytics 4
VITE_GA_MEASUREMENT_ID=          # npr. G-XXXXXXXXXX

# Social links (Schema.org sameAs)
SOCIAL_GITHUB=
SOCIAL_LINKEDIN=
```

---

## Google Search Console setup

1. Idi na https://search.google.com/search-console
2. Dodaj property → upiši domenu
3. Verifikacija: kopiraj `google-site-verification` meta tag → `.env` → `GOOGLE_SITE_VERIFICATION=`
4. Sitemap → Dodaj sitemap: `https://tvoja-domena.com/sitemap.xml`

---

## Napomena za SPA (Inertia.js + React)

Bez SSR-a, meta tagovi renderaju se client-side i nisu vidljivi svim crawlerima. **Googlebot izvršava JavaScript** pa vidi sve tagove. Ostali crawleri (Facebook, Twitter, LinkedIn) ne izvršavaju JS — za potpunu OG kontrolu potreban je SSR ili prerendering servis.

