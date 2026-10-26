# SEO: www redirect, site name, schema i dupli title — 26.10.2026.

Opseg: `marijankopcic.from.hr` (portfolio) i `blog.marijankopcic.from.hr` (blog,
dijeli isti document root). Stack: Laravel 13 + Inertia v3 (SSR) + React 19.

Nalazi su provjereni na **živom sajtu** (`curl`, 26.10.2026.), ne pretpostavljeni
iz koda. Polazni pregled: naslovnica, blog index, post
`/avoid-n-plus-one-queries-with-eager-loading`, tag `/tags/laravel`,
`robots.txt` i `sitemap.xml` na oba hosta.

**Status:** napravljeno i provjereno na produkciji 26.10.2026. Opcionalni nginx korak (dolje) traži roota.

---

## Stanje prije zahvata (što je bilo u redu)

- Svaka stranica ima svoj title i description te ispravan canonical.
- OG i Twitter tagovi su potpuni, OG slike vraćaju 200, a postovi imaju `og:type=article` s `article:*` tagovima.
- Svaka stranica ima jedan `h1`, sve slike imaju `alt` i postavljeno je `lang="en"`.
- http se 301 preusmjerava na https, a `robots.txt` i oba sitemapa rade.
- JSON-LD je valjan: naslovnica ima `WebSite` i `ProfilePage` s `Person`, blog ima `Blog`, a post `BlogPosting`. Sve je vezano na `https://marijankopcic.from.hr/#person`.

## Nalazi i plan

### 1. `www.marijankopcic.from.hr` vraća 200 umjesto 301

```
$ curl -sI https://www.marijankopcic.from.hr/   → 200 (canonical → bez www)
```

- **Uzrok:** nginx vhost (`/etc/nginx/conf.d/vhosts/marijankopcic.from.hr*.conf`) ima `server_name marijankopcic.from.hr www.marijankopcic.from.hr` i ne radi redirect. Vhost je u vlasništvu roota, a korisnik `marijan` nema sudo.
- **Rješenje:** redirect u **root** `.htaccess` (`public_html/.htaccess`). nginx sve dinamičke zahtjeve (`location /`, `@backend`) prosljeđuje Apacheu, pa pravilo vrijedi za sve stranice.
- **Napomena:** pravilo u `public/.htaccess` ne radi jer root `.htaccess` već prepiše zahtjev u `public/`, pa je redirect vodio na `https://marijankopcic.from.hr/public/`. Zato pravilo mora stajati ispred tog prepisivanja.
- **Ograničenje:** statičke datoteke (css/js/jpg…) nginx servira izravno, pa na www hostu i dalje vraćaju 200. To SEO-u ne smeta jer stranice imaju canonical. Potpuno rješenje na nginx razini opisano je dolje i traži roota.

### 2. `og:site_name` nije isti

- Portfolio: `Marijan Kopčić` (postavljeno u `WelcomeController`).
- Blog: `Marijan Kopčić Workshop` (`config/seotools.php` → `APP_NAME`).
- **Rješenje:** blog postavlja svoj `og:site_name` = `Marijan Kopčić Blog`, isti kao `name` u njegovoj `WebSite` schemi (točka 3). Google ime stranice uzima iz `WebSite.name`, `og:site_name` i titlea, pa ti signali moraju biti dosljedni.

### 3. Blog subdomena nema svoju `WebSite` schemu

- Google site name određuje po (sub)domeni i čita ga iz `WebSite` sheme na početnoj stranici tog hosta. Blog je imao samo `isPartOf` koji pokazuje na `WebSite` glavne domene.
- **Rješenje:** novi `WebSite` čvor `https://blog.marijankopcic.from.hr/#website` (`name` "Marijan Kopčić Blog", `publisher` → `#person`, `isPartOf` → portfolio `#website`). Na blog indexu je pun čvor, a `Blog`, `BlogPosting` i tag stranice pokazuju na njega.

### 4. Nema `BreadcrumbList`

- **Rješenje:**
  - post: `Blog › <naslov posta>`
  - tag: `Blog › <tag>`
- URL-ovi postova su `/slug`, ne `/tags/x/slug`, pa tag ne ulazi u breadcrumb posta. Breadcrumb mora odgovarati stvarnoj hijerarhiji.

### 5. Tag stranice nemaju JSON-LD

- `schemaJson` je bio `null`.
- **Rješenje:** `CollectionPage` (name, description, url, `isPartOf` → blog `#website`) i breadcrumb iz točke 4.

### 6. `Person` nema `image`

- **Rješenje:** portret iz `docs/75250824_…_n.jpg` (ista fotografija kao u `og-image.jpg`) kopira se u `public/images/marijan-kopcic.jpg` i dodaje kao `image` u `Person` na portfoliju i blogu.

### 7. Dva `<title>` taga u HTML-u

```
<title>Marijan Kopčić | …</title>                      ← SEOMeta::generate()
<title data-inertia="">Marijan Kopčić | …</title>      ← Inertia SSR head
```

- U browseru Inertia sama uklanja `<title>` bez `data-inertia` (`@inertiajs/core` head manager), pa je duplikat samo u HTML-u koji server šalje, a to je upravo ono što crawleri vide.
- **Rješenje:** `app.blade.php` izbacuje title iz SEOMeta ispisa **samo kad SSR head već sadrži `<title>`**. Ako SSR ne radi ili stranica nema `<Head title>`, SEOMeta title ostaje, pa stranica nikad ne ostaje bez titlea.

### Izvan opsega

- `/index.php` vraća 200. Canonical to pokriva, pa nije mijenjano.
- Facebook u `sameAs`: ostaje dok god je `SOCIAL_FACEBOOK` postavljen u `.env`. Link u UI-ju zakomentiran je ranije istog dana.
- **Sitelinks** se ne mogu postići schemom jer ih Google generira sam. Portfolio je jedna stranica sa sidrima, pa ih na glavnoj domeni realno ne treba očekivati. Sitelinks search box Google je ugasio krajem 2024.
- **`Organization` schema** nije dodana. Za osobni portfolio ispravna je `Person`, a `Organization` ima smisla samo uz stvarnu firmu ili obrt.

## Promijenjene datoteke

| Datoteka | Izmjena |
|---|---|
| `.htaccess` | 301 s `www.marijankopcic.from.hr` na `https://marijankopcic.from.hr/$1`, prije prepisivanja u `public/` (točka 1) |
| `app/Http/Controllers/BlogController.php` | `SITE_NAME` konstanta, `og:site_name`, `blogWebsiteSchema()`, `breadcrumbSchema()`, `CollectionPage` na tagu, `image` u `ownerSchema()` (točke 2–6) |
| `app/Http/Controllers/WelcomeController.php` | `image` u `Person` (točka 6) |
| `resources/views/app.blade.php` | SEOMeta `<title>` se izbacuje kad SSR head ima svoj (točka 7) |
| `public/images/marijan-kopcic.jpg` | novi: portret 727×807 za `Person.image` (točka 6) |

Frontend nije mijenjan, pa nije bio potreban `vite build`. Pint: pass.

## Provjera

Sve na živom sajtu (`curl`), 26.10.2026.:

```
https://www.marijankopcic.from.hr/                 → 301 https://marijankopcic.from.hr/
https://www.marijankopcic.from.hr/robots.txt       → 301 https://marijankopcic.from.hr/robots.txt
https://www.marijankopcic.from.hr/sitemap.xml?a=1  → 301 (path i query sačuvani)
http://www.marijankopcic.from.hr/x                 → 301 https://marijankopcic.from.hr/x
portfolio, blog, tag, post, /login, /sitemap.xml, /robots.txt → 200
```

| Stranica | `<title>` tagova | `og:site_name` | JSON-LD |
|---|---|---|---|
| portfolio `/` | 1 | Marijan Kopčić | `WebSite`, `ProfilePage` → `Person` s `image` |
| blog `/` | 1 | Marijan Kopčić Blog | `WebSite` (blog `#website`, `isPartOf` portfolio), `Blog` |
| post | 1 | Marijan Kopčić Blog | `BlogPosting` (`isPartOf` blog `#website`), `BreadcrumbList` 1: Blog → 2: post |
| tag | 1 | Marijan Kopčić Blog | `CollectionPage`, `BreadcrumbList` 1: Blog → 2: tag |

- Svi JSON-LD blokovi su valjan JSON. Preporuka: provjeriti ih još i u [Rich Results Test](https://search.google.com/test/rich-results).
- Tijekom provjere uhvaćen je i ispravljen bug: breadcrumb je imao `position: 1` na obje stavke jer arrow funkcija hvata `$position` po vrijednosti. Sada se pozicija računa iz indeksa.
- `/login` nije u opsegu (u `robots.txt` je `Disallow`) i i dalje ima `og:site_name` "Marijan Kopčić Workshop" iz `APP_NAME`.

**Testovi:** `SeoTest` (ProfilePage) i `ContactTest` padaju, ali padaju i bez ovog zahvata:

- `SeoTest` traži string `"mainEntity":{"@type":"Person","name":…`, a `@id` stoji između tipa i imena;
- `ContactTest` vraća 419 i vezan je uz necommitane izmjene kontakt forme.

## Nakon zahvata

- [ ] Search Console: provjeriti da blog postoji kao zasebna property (`blog.marijankopcic.from.hr`) i predati `https://blog.marijankopcic.from.hr/sitemap.xml`
- [ ] Rich Results Test za post i tag (breadcrumbs)
- [ ] Za nekoliko tjedana provjeriti prikazuje li Google ime stranice ("Marijan Kopčić" / "Marijan Kopčić Blog") umjesto URL-a

## nginx (opcionalno, traži roota)

`.htaccess` pokriva sve stranice. Statičke datoteke na www hostu nginx i dalje servira izravno (200). Za potpun redirect na nginx razini, na vrh `server {}` bloka u **oba** vhosta (`/etc/nginx/conf.d/vhosts/marijankopcic.from.hr.conf` i `.ssl.conf`) dodati:

```nginx
if ($host = www.marijankopcic.from.hr) {
    return 301 https://marijankopcic.from.hr$request_uri;
}
```

Zatim `nginx -t` i `systemctl reload nginx`.

**Upozorenje (CWP):** CWP može regenerirati vhostove i pregaziti ručnu izmjenu, kao što je opisano u `docs/server-vhost-security.md`. Prije izmjene napraviti backup izvan web roota. Nakon promjene vhosta `.htaccess` pravilo može ostati bez problema.
