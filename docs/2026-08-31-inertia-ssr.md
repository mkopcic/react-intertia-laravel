# Inertia SSR — što je napravljeno, gdje i zašto

**Datum:** 31.08.2026.
**Server:** `server.mellon-dev.eu` (Rocky Linux 9.8), user `marijan`
**Projekt:** `/home/marijan/public_html`
**Hostovi:** `marijankopcic.from.hr` (portfolio), `blog.marijankopcic.from.hr` (blog, dijeli isti document root)

Ovaj dokument pokriva **samo Inertia SSR**. SEO nalazi su u
`docs/2026-08-31-seo-audit-refactor.md`.

---

## 1. Zašto uopće SSR

Inertia + React renderira stranicu **u browseru**. Server pošalje samo:

```html
<div id="app" data-page="{...cijeli JSON...}"></div>
```

Sav tekst živi u tom `data-page` JSON-u i pretvara se u HTML tek kad se izvrši
JavaScript. Posljedica, izmjereno prije zahvata:

```
$ curl -A Googlebot https://marijankopcic.from.hr/
7932 B   <h1>: 0   <h2>: 0   <p>: 0
```

Google *može* izvršiti JS, ali to je drugi val indeksiranja — odgođen i s
budžetom. Bing, Yandex i **svi** social scraperi (LinkedIn, Facebook, Slack, X)
ne izvršavaju JS uopće.

SSR znači: Node proces unaprijed izrenderira React u HTML, Laravel taj HTML
ubaci u odgovor, crawler dobije gotov tekst.

---

## 2. Zatečeno stanje — zašto SSR nije radio

`config/inertia.php` je tvrdio da je SSR upaljen:

```php
'ssr' => [
    'enabled' => true,                                 // upaljeno
    'url' => 'http://127.0.0.1:13714',
    // 'bundle' => base_path('bootstrap/ssr/ssr.mjs'), // zakomentirano
],
```

Ali:

- `resources/js/ssr.tsx` — **nije postojao**
- `bootstrap/ssr/` — **nije postojao**, bundle nikad nije buildan
- na portu 13714 **ništa nije slušalo**

Inertia u tom slučaju tiho padne natrag na client-side render. Nema greške,
nema upozorenja. `enabled => true` je bila lažna sigurnost.

---

## 3. Izmjene u kodu

### 3.1 `resources/js/ssr.tsx` — NOVO

Server-side pandan `app.tsx`-a. Ključno: **ne piše se `createServer` ručno**.
Plugin `@inertiajs/vite` (v3) prepozna `createInertiaApp` poziv i tijekom
`vite build --ssr` ga sam prepiše u:

```js
import createServer from '@inertiajs/react/server'
import { renderToString } from 'react-dom/server'
const render = await createInertiaApp({...})
const renderPage = (page) => render(page, renderToString)
if (import.meta.env.PROD) { createServer(renderPage, 13714) }
export default renderPage
```

(provjereno u `node_modules/@inertiajs/vite/dist/index.js`, funkcije
`findInertiaAppExport` i `wrapWithServerBootstrap`)

Datoteka je namjerno identična `app.tsx`-u osim dvije stvari koje na serveru
nemaju smisla:

- `initializeTheme()` — dira `window` i `localStorage`
- `progress` bar

`layout` switch **mora** ostati identičan, inače nastaje hydration mismatch.

Plugin traži entrypoint po fiksnom popisu imena; `resources/js/ssr.tsx` je
jedno od njih, pa nikakva dodatna konfiguracija u `vite.config.ts` nije
potrebna.

### 3.2 `config/inertia.php` — odkomentiran bundle

```php
'ssr' => [
    'enabled' => true,
    'url' => 'http://127.0.0.1:13714',
    'bundle' => base_path('bootstrap/ssr/ssr.js'),
],
```

Ime je `ssr.js`, ne `ssr.mjs` kako je pisalo u zakomentiranom retku — to je
provjereno probnim buildom prije nego je putanja upisana.

### 3.3 Duplirani meta tagovi — posljedica paljenja SSR-a

Ovo je problem koji je **nastao tek kad je SSR proradio**.

Dok SSR nije radio, React `<Head>` tagovi ubacivali su se tek u browseru, pa
ih crawler nikad nije vidio. Čim je SSR proradio, oba izvora — seotools iz
`app.blade.php` i React `<Head>` — završila su u istom HTML-u:

```html
<meta property="og:type" content="website">                 <!-- server -->
<meta property="og:type" content="article" data-inertia>    <!-- React -->
<link rel="canonical" href="..." >
<link rel="canonical" href="..." data-inertia>
```

Svaki SEO tag dvaput, a na blogu i **proturječno**.

Riješeno tako da je server jedini izvor SEO meta tagova:

| Datoteka | Izmjena |
|---|---|
| `resources/js/layouts/blog-layout.tsx` | iz `<Head>` maknuti `description`, `og:*`, `twitter:*`, `canonical`; ostaje `title` i font linkovi |
| `resources/js/pages/welcome.tsx` | isto |
| `resources/js/pages/blog/show.tsx` | maknut `image` prop koji je time postao mrtav |

`title` ostaje jer se pri client-side navigaciji mora osvježiti tab.

---

## 4. Sve izvršene komande, redom

### 4.1 Istraživanje i probni buildovi

```bash
# probni SSR build u scratchpad — samo da se vidi kako se zove izlazna datoteka
npx vite build --ssr --outDir /tmp/.../ssr-probe --emptyOutDir
# rezultat: ssr.js (39,3 kB)

# probni dev build unutar projekta, da bi Node mogao razrijesiti node_modules
npx vite build --ssr --mode development --outDir bootstrap/ssr-probe --emptyOutDir
node ./probe-tmp.mjs /home/marijan/public_html/bootstrap/ssr-probe
```

**Ovdje se dogodio incident — vidi poglavlje 7.**

```bash
# ciscenje probe artefakata
rm -f probe-tmp.mjs
rm -rf bootstrap/ssr-probe
```

### 4.2 Pravi build

```bash
npm run build:ssr     # = vite build && vite build --ssr
```

Izvršeno **dvaput**: prvi put nakon SSR entrypointa, drugi put nakon micanja
dupliranih meta tagova (jer su to frontend izmjene koje moraju u bundle).

Izlaz: `bootstrap/ssr/ssr.js` (39 309 B) + `bootstrap/ssr/assets/*`.
Client build je usput zamijenio hasheve u `public/build/` — provjereno je da
živi sajt servira nove i da ništa ne puca na starim referencama.

### 4.3 Pokretanje i gašenje tijekom rada

```bash
php artisan inertia:start-ssr    # pokretanje
php artisan inertia:stop-ssr     # gasenje (nuzno prije novog bundlea)
php artisan inertia:check-ssr    # provjera; exit 0 = radi, exit 1 = ne radi
```

Exit kodovi su provjereni eksplicitno, jer o njima ovisi cron keepalive.

### 4.4 Lokalna provjera bez diranja produkcije

```bash
php artisan serve --port=8399 --host=127.0.0.1
curl -D - http://127.0.0.1:8399/robots.txt -H "Host: blog.marijankopcic.from.hr"
# ... provjere ...
kill <pid>
```

---

## 5. Držanje procesa gore

### 5.1 Prvi pokušaj: systemd user servis — NAPRAVLJEN PA UKLONJEN

Napravljena datoteka `~/.config/systemd/user/inertia-ssr.service` i aktivirana:

```bash
systemctl --user daemon-reload
systemctl --user enable --now inertia-ssr
```

Radila je (`active (running)`, PID 987957), ali je imala rupu: `Linger=no` na
useru `marijan`, pa user servisi umiru s odjavom i ne dižu se nakon reboota.
To bi tražilo `loginctl enable-linger marijan` kao root.

Uklonjeno na zahtjev, u korist crona:

```bash
systemctl --user disable --now inertia-ssr
rm ~/.config/systemd/user/inertia-ssr.service
systemctl --user daemon-reload
```

Ta datoteka nije postojala prije ovog zahvata — uklonjeno je samo ono što je
u istoj sesiji i napravljeno.

### 5.2 Rješenje: cron

Instalirano u crontab usera `marijan` (`crontab -l`), **ne** root:

```cron
# Inertia SSR — drzi SSR server gore.
# Bez njega crawler dobiva prazan <body>: Inertia tiho padne na client-side
# render (vidi docs/2026-08-31-seo-audit-refactor.md).
# NAPOMENA: znak postotka je u crontabu specijalan i lomi komandu — ne koristiti.

@reboot cd /home/marijan/public_html && /usr/bin/setsid /usr/bin/php artisan inertia:start-ssr >> storage/logs/inertia-ssr.log 2>&1

# Svake minute: digni ako je pao, restartaj ako je bundle promijenjen
# (nakon "npm run build:ssr"), jer SSR server drzi stari kod u memoriji.
* * * * * cd /home/marijan/public_html && { H=$(/usr/bin/md5sum bootstrap/ssr/ssr.js | /usr/bin/cut -d' ' -f1); M=$(/usr/bin/cat storage/app/ssr-bundle.md5 2>/dev/null); if [ "$H" != "$M" ] || ! /usr/bin/php artisan inertia:check-ssr >/dev/null 2>&1; then /usr/bin/php artisan inertia:stop-ssr >/dev/null 2>&1; echo "$H" > storage/app/ssr-bundle.md5; /usr/bin/setsid /usr/bin/php artisan inertia:start-ssr >> storage/logs/inertia-ssr.log 2>&1; fi; }
```

**Što koja linija radi**

`@reboot` — nakon podizanja servera odmah pokreće SSR. `setsid` ga odvaja u
vlastitu sesiju, da ne umre kad cron job završi.

Minutni job radi tri stvari:

1. `H` = md5 trenutnog bundlea, `M` = md5 zapisan pri zadnjem pokretanju
2. ako se **razlikuju** (netko je pokrenuo `npm run build:ssr`) **ili** ako
   `check-ssr` javi da server ne radi → gasi stari, zapisuje novi md5, pokreće novi
3. inače ne radi ništa

Time je pokriveno i padanje procesa i deploy: nakon builda nitko ne mora
ništa ručno restartati, cron to primijeti u roku od minute.

**Zašto md5, a ne mtime:** `npm run build:ssr` prepisuje datoteku i kad je
sadržaj identičan, pa bi mtime izazvao nepotreban restart svaki put.

**Zašto `cd` na početku obje linije:** cron pokreće poslove iz `$HOME`
(`/home/marijan`), ne iz projekta. Bez `cd` je `artisan` nedostupan i job
padne s `Could not open input file: artisan`. Prva verzija `@reboot` linije
imala je upravo tu grešku — uhvaćena je i ispravljena prije reboot testa.

**Gdje što piše**

| Putanja | Što |
|---|---|
| `storage/logs/inertia-ssr.log` | stdout/stderr SSR servera |
| `storage/app/ssr-bundle.md5` | md5 bundlea koji trenutno radi (marker) |
| `/var/spool/mail/marijan` | cron šalje ovamo greške ako job pukne |

### 5.3 Greška koju sam napravio i ispravio: znak postotka

Prva instalacija crona koristila je `printf '%s' "$H"`. **U crontabu je `%`
specijalan** — cron ga pretvara u novi red, a sve iza prvog `%` proslijedi
komandi kao stdin. Komanda se prelomila:

```
/bin/sh: -c: line 1: unexpected EOF while looking for matching `''
```

(nađeno u `/var/spool/mail/marijan`)

Posljedica: marker je ostao prazan, SSR se nije dizao. Ispravljeno tako da u
cijelom crontabu nema nijednog `%` — `printf` je zamijenjen s `echo`.

---

## 6. Provjera da radi

Stanje u 19:20:02, 31.08.2026:

```
php artisan inertia:check-ssr   -> Inertia SSR server is running.
ss -ltn | grep 13714            -> LISTEN 0 511 *:13714
```

| URL | Prije | Poslije |
|---|---|---|
| `marijankopcic.from.hr/` | 7 932 B, `h1` 0 | **65 118 B, `h1` 1** |
| `blog.marijankopcic.from.hr/` | 7 798 B, `h1` 0 | **15 248 B, `h1` 1** |
| `blog.../fat-models-skinny-controllers` | — | 22 358 B, `h1` 1, `h2` 10, `p` 30 |
| `blog.../tags/laravel` | — | 12 974 B, `h1` 1 |

Test da cron stvarno drži proces: SSR je namjerno ugašen, cron ga je digao
nakon ~30 s, i proces je preživio 20 s nakon starta (dokaz da ga `setsid`
odvaja od cron joba, inače bi umro odmah).

### Komande za samostalnu provjeru

```bash
# radi li SSR proces
php artisan inertia:check-ssr
ss -ltn | grep 13714

# dobiva li crawler sadrzaj (1 = radi, 0 = ne radi)
curl -sA Googlebot "https://marijankopcic.from.hr/?v=$RANDOM" | grep -c '<h1'
curl -sA Googlebot "https://blog.marijankopcic.from.hr/?v=$RANDOM" | grep -c '<h1'

# nema dupliciranih meta tagova (svaki mora vratiti 1)
curl -sA Googlebot "https://blog.marijankopcic.from.hr/?v=$RANDOM" | grep -c 'rel="canonical"'
curl -sA Googlebot "https://blog.marijankopcic.from.hr/?v=$RANDOM" | grep -c 'og:type'

# cron
crontab -l
tail -20 storage/logs/inertia-ssr.log
cat storage/app/ssr-bundle.md5
```

---

## 7. Incident koji moram prijaviti

Tijekom provjere gradi li se bundle, probe skripta `probe-tmp.mjs` pokrenuta je
s dev buildom. Očekivanje je bilo da u `--mode development` neće pokrenuti
server, jer je bootstrap uvjetovan s `import.meta.env.PROD`. **Nije točno** —
`vite build` postavlja `NODE_ENV=production` bez obzira na `--mode`, pa je
probe digao SSR server na portu 13714.

Posljedica: produkcija je nekoliko minuta renderirala kroz taj probe bundle,
bez namjere i bez odobrenja. Ugašeno je, port provjeren prazan, artefakti
(`probe-tmp.mjs`, `bootstrap/ssr-probe/`) obrisani.

Usput: `pkill -f "probe-tmp.mjs"` je pogodio i vlastiti shell jer se uzorak
poklapao s njegovom komandnom linijom (exit 144). Zato je nakon toga
napravljena zasebna provjera da je čišćenje stvarno dovršeno.

---

## 8. Operativne napomene

**Deploy** — ništa se ne mora ručno restartati:

```bash
npm run build:ssr
```

Cron u roku minute primijeti novi md5, ugasi stari SSR i digne novi.
Ako se ne želi čekati:

```bash
php artisan inertia:stop-ssr    # cron ce ga u roku minute dici s novim bundleom
```

**Reboot** — pokriven `@reboot` linijom, plus minutni keepalive kao mreža.

**Ako SSR padne i ne diže se** — sajt i dalje radi, samo se vraća na
client-side render i crawler opet dobiva prazan `<body>`. Provjeriti:

```bash
tail -30 storage/logs/inertia-ssr.log
tail -30 /var/spool/mail/marijan
```

**Port** 13714 je lokalni (`127.0.0.1`), nije izložen prema van.

**Rollback cijelog SSR-a**, ako ikad zatreba:

```bash
crontab -r                                  # makni cron
php artisan inertia:stop-ssr                # ugasi proces
# u config/inertia.php: 'enabled' => false
```

Sajt nastavlja raditi, samo bez SSR-a — točno kao prije 31.08.2026.
