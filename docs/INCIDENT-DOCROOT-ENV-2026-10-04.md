# Incident: CWP regeneracija vhosta, javno izložen projekt i .env (04.10.2026)

## Tijek
| Vrijeme | Događaj |
|---|---|
| 11:16:30–11:17:48 | CWP je regenerirao sve fitapp vhostove (crypto, spo, trener, fitapp.cloud) u nginxu i Apacheu. Za `fitapp.cloud` Apache `DocumentRoot` je vraćen na default `/home/fitapp/public_html` (prije: `/home/fitapp/public_html/fitapp-saas/public`) |
| od 11:17 | `https://fitapp.cloud/` prikazuje "Index of /", Laravel rute vraćaju Apache 404, a cijeli projekt je javno dostupan pod `/fitapp-saas/` |
| 11:19–11:57 | Botovi preuzimaju `/fitapp-saas/.env` (+ još dvije `.env*` datoteke) i pokreću `/fitapp-saas/send-brain-export.php` i `send-multitenancy-docs.php`. Svaki poziv šalje 2 maila na info@fitapp.cloud, info@mellon.hr i mkopcic@gmail.com |
| 11:59 | `chmod 000` na obje send skripte (403) |
| 12:00 | `chmod 640 .env` (Apache ga ne može poslužiti, a PHP-FPM, korisnik fitapp, ga čita) |
| 12:04 | `DocumentRoot` i `<Directory>` vraćeni na `fitapp-saas/public` u `/usr/local/apache/conf.d/vhosts/fitapp.cloud.conf` i `.ssl.conf`, `apachectl -t` OK, `systemctl reload httpd` |

## Backupi
- Stanje nakon CWP regeneracije: `docs_new/deployment/vhost-backup/apache.fitapp.cloud{,.ssl}.conf.cwp-regen-<timestamp>`
- Ispravna konfiguracija (19.08.): `docs_new/deployment/vhost-backup/fitapp.cloud{,.ssl}.conf`. Od trenutnog stanja razlikovala se samo u ta 2 retka.

## Dokaz (poslije)
```
/ /cijene /login /kontakt /mogucnosti /fiskalizacija-za-teretane → 200, pravi <title>
/fitapp-saas/.env → 404, /fitapp-saas/brain-context.json → 404
```

## IP adrese koje su preuzele .env (ipinfo.io)
| IP | Država | Provider |
|---|---|---|
| 103.4.251.150 | US | AS9009 M247 Europe SRL |
| 57.129.16.41 | DE | AS16276 OVH SAS |
| 51.89.167.1 | GB | AS16276 OVH SAS |
| 103.245.231.135 | NL | AS212477 RoyaleHosting BV |
| 104.164.173.33 | US | AS18779 EGIHosting |
| 158.69.55.148 | CA | AS16276 OVH SAS |
| 154.28.229.245 | US | AS46261 QuickPacket, LLC |

Sve su hosting/VPN adrese, dakle automatski skeneri. Preuzete datoteke: `.env` (3040 B), `.env.backup-before-nova-production-merge-20260115-112435` (2227 B), `.env.example` (1330 B).

**Ban (04.10.2026):** svih 7 adresa trajno u CSF-u (`csf -d`, komentar "fitapp incident 2026-10-04"), provjereno u `/etc/csf/csf.deny` (7 unosa). Prije bana provjereno: nisu vlasnikove (vlasnik: 46.188.194.145 / 2001:4860:7:1409::ff, nije na deny listi), nisu u `csf.allow`/`csf.ignore`, nema prijave u aplikaciju ni SSH s tih adresa.

## Zahvaćeni kredencijali (preuzeti .env, stanje 03.10.)
Procurjele tajne (trenutno stanje: vidi "Status zahvaćenih tajni" niže): `DB_PASSWORD` (+ `DB_USERNAME`), `DB_PROVISIONING_PASSWORD`, `DB_ZG1_PASSWORD`, `DB_ZG2_PASSWORD`, `MAIL_PASSWORD`, `FISKAL_CERT_PASS` (+ `FISKAL_CERT_PATH`), `REVERB_APP_SECRET` / `REVERB_APP_KEY` / `REVERB_APP_ID`, `SUDREG_CLIENT_SECRET` (+ `SUDREG_CLIENT_ID`), `NOCAPTCHA_SECRET`, `SEO_PAGESPEED_API_KEY`.
Promijenjeno: `APP_KEY` (vidi niže). `.env.backup-20260115` sadrži iste DB, FISKAL i REVERB tajne; `MAIL_*` u njemu su stari. Javni po prirodi (nisu tajna): `NOCAPTCHA_SITEKEY`, `GOOGLE_ANALYTICS_MEASUREMENT_ID`, `VITE_REVERB_APP_KEY`.

## Rotacija APP_KEY (04.10.2026 16:56)
- Backup: `/home/fitapp/env-backups/.env.prije-app-key-rotacije-20261004-165600` (600, izvan web direktorija)
- Novi `APP_KEY`, a stari je u `APP_PREVIOUS_KEYS`, da se podaci šifrirani starim ključem i dalje mogu čitati. Stari ključ treba maknuti kad se svi šifrirani podaci ponovno šifriraju novim.
- `php artisan queue:restart`
- `chmod 640` i na `.env.backup-before-nova-production-merge-20260115-112435`
- Provjera: `/`, `/login`, `/cijene`, `hfzredemo.fitapp.cloud/login` vraćaju pravi `<title>`; novi encrypt/decrypt OK. Posljedica: sve sesije su odjavljene.
- Usputni nalaz (nije posljedica rotacije): `pos_terminal_kanali.auth_podaci` (10 redaka, cast `encrypted:array`) u bazi je **običan JSON** (`api_key`, `api_secret`), ista vrijednost u svih 10 redaka. Nije čitljiv ni starim ključem, dakle kroz model nije radio ni prije.

## Rotacija MAIL_PASSWORD (04.10.2026 17:34)
- Nova lozinka za info@fitapp.cloud (postavio vlasnik) upisana u `.env`. Backup: `/home/fitapp/env-backups/.env.prije-mail-lozinke-<timestamp>`
- Provjera: SMTP prijava (`getSymfonyTransport()->start()`) s novom lozinkom → OK; `php artisan queue:restart`

## Sve što je preuzeto iz projekta (11:17–12:04, HTTP 200)
Osim `.env*`: **FINA certifikat** `certs/86058362621.F3.3.p12` (5194 B) i `certs/86058362621.F3.3.pem` (7105 B, nešifrirani privatni ključ), `certs/fina-cert-info.md`, `certs/fina-demo-ca-2020.pem(.bak)` (preuzela 57.129.16.41 u 11:24:47); `brain-context.json`, `summary.md`, `app-analysis.json`, `composer.json/.lock`, `CLAUDE.md`, `README.md`, `webserver-vhost.md`, `laravel-reverb.service`, `install-supervisor*.sh`, `create-fina-support-package.sh`, `nohup.out`, `import-log.txt`, `.mcp.json`, `.vscode/mcp.json`, `.claude/settings.local.json`, `boost.json`, `mobile-app/.env-android` i dijelovi `mobile-app/android-sdk/`. U `.env-android`, `.mcp.json`, `.vscode/mcp.json`, `.claude/settings.local.json` i `boost.json` nema lozinki ni tokena (provjereno).

## Rotacija MySQL lozinki (04.10.2026 17:40)
- Root pristup: `/root/.my.cnf` (MariaDB 10.5.29), korišten preko `sudo mysql`.
- `ALTER USER 'fitapp_spo'@'localhost'` i `ALTER USER 'fitapp'@'localhost'` (provisioning), nove nasumične lozinke od 28 znakova.
- `fitapp_spo` koriste **dvije aplikacije**, pa je nova lozinka upisana u oba `.env`:
  - `fitapp-saas/.env`: `DB_PASSWORD`, `DB_ZG1_PASSWORD`, `DB_ZG2_PASSWORD`, `DB_PROVISIONING_PASSWORD` (fitapp)
  - `spo.fitapp.cloud/spo-laravel/.env`: `DB_PASSWORD`, `DB_ZG1_PASSWORD`, `DB_ZG2_PASSWORD`
- Backupi: `/home/fitapp/env-backups/.env.{fitapp-saas,spo-laravel}.prije-db-lozinki-20261004-174004`
- `DB_ZG1/ZG2_PASSWORD` su prije imali drugu vrijednost od `DB_PASSWORD`, iako se spajaju istim korisnikom `fitapp_spo` (koji ima jednu lozinku). Sada su usklađeni.
- Provjera spajanjem (`select 1`): fitapp-saas `mysql`, `landlord`, `fitapp_zagreb1`, `fitapp_zagreb2`, `mysql_provisioning`, `xxl`, `xxl1`, `xxl2` → OK; spo-laravel `mysql`, `fitapp_zagreb1`, `fitapp_zagreb2`, `xxl`, `xxl1`, `xxl2` → OK. `spo.fitapp.cloud`, `fitapp.cloud`, `hfzredemo.fitapp.cloud/login` → 200, pravi `<title>`. `queue:restart`.
- Stara lozinka `fitapp_spo` ostaje u git povijesti (`034a716`, `0c6a791`, `docs_new/deployment/mysql-user-fix-loging.md`). Više ne vrijedi.
- Stara ZG lozinka upisana je kao default u `config/database.php` obje aplikacije. Ne vrijedi ni za jednog MySQL korisnika (nema korisnika `admin`).

## Rotacija REVERB_APP_SECRET (04.10.2026)
- Novi secret (`openssl rand -hex 24`) u oba `.env` (aplikacije dijele isti Reverb). Backupi: `/home/fitapp/env-backups/.env.{fitapp-saas,spo-laravel}.prije-reverb-<timestamp>`
- `systemctl restart laravel-reverb` → active; `queue:restart`
- Provjera: broadcast s novim secretom iz obje aplikacije → OK; negativni test sa starim secretom → `Pusher error: Authentication signature invalid`.
- `REVERB_APP_KEY` i `REVERB_APP_ID` nisu mijenjani: ključ je javan (ugrađen u frontend JS kao `VITE_REVERB_APP_KEY`), a za potpis se koristi secret.

## trener.fitapp.cloud/.env (nalaz 04.10.2026)
- `DocumentRoot /home/fitapp/trener.fitapp.cloud` (korijen Laravel projekta) → `/.env` javno dostupan **od najmanje 01.06.2026**, desetci preuzimanja.
- Sadrži samo stvaran `APP_KEY`; `MAIL_PASSWORD`, `REDIS_PASSWORD`, `MAIL_USERNAME` su `null`. Nema DB lozinke.
- `chmod 640` → `/.env` 403. Stranica `trener.fitapp.cloud/` je i prije vraćala 403.

## Zaštita datoteka
`chmod 640` na `certs/*`, `brain-context.json`, `summary.md`, `app-analysis.json`, `.env`, `.env.backup-*` (fitapp-saas), `spo-laravel/.env` i `trener.fitapp.cloud/.env`. Apache statiku poslužuje kao drugi korisnik pa dobije 403, a PHP-FPM (korisnik `fitapp`) ih čita (provjereno: `openssl_pkcs12_read` certifikata → OK). `send-brain-export.php` i `send-multitenancy-docs.php` → `chmod 000`, nisu obrisani.

## Status zahvaćenih tajni
| Tajna | Status |
|---|---|
| `APP_KEY` | ✅ promijenjen (stari u `APP_PREVIOUS_KEYS`) |
| `MAIL_PASSWORD` | ✅ promijenjen (lozinku dao vlasnik) |
| `DB_PASSWORD`, `DB_ZG1/ZG2_PASSWORD` (`fitapp_spo`) | ✅ promijenjeno, obje aplikacije |
| `DB_PROVISIONING_PASSWORD` (`fitapp`) | ✅ promijenjeno |
| `REVERB_APP_SECRET` | ✅ promijenjen, obje aplikacije |
| FINA certifikat + `FISKAL_CERT_PASS` | ⚠️ preuzet i certifikat i nešifrirani privatni ključ. Certifikat je **DEMO** (issuer `Fina Demo CA 2020`, `MD SOLUTIONS ... HR86058362621`, `FISKAL_ENV=demo`). Promjena lozinke ne pomaže. **Vlasnik:** opozvati certifikat i izdati novi u FINA demo okruženju |
| `SUDREG_CLIENT_SECRET` | ⏳ **vlasnik:** regenerirati na portalu API-ja sudskog registra, pa javiti novi secret za upis u `.env` |
| `NOCAPTCHA_SECRET` | ⏳ **vlasnik:** Google reCAPTCHA admin konzola (novi par ključeva) |
| `SEO_PAGESPEED_API_KEY` | ⏳ **vlasnik:** Google Cloud konzola, projekt `fitapp-sep` (novi ključ, stari obrisati) |

## Otvoreno
1. **CWP može ponovno regenerirati vhost** i vratiti default `DocumentRoot`. Treba trajno postaviti docroot u CWP-u. Do tada su najosjetljivije datoteke zaštićene s `chmod` (vidi gore), ali ostatak projekta bi opet bio javan.
2. Tri tajne iz tablice iznad (SUDREG, reCAPTCHA, PageSpeed) i FINA demo certifikat: rotacija u vanjskim konzolama.

## Naknadni audit svih vhostova (04.10.2026)

### Opseg i metoda
- Pročitane su aktivne CWP konfiguracije za 29 web hostova, uključujući HTTP/HTTPS sloj Nginxa i Apache virtual hostove; provjereni su `nginx -T`, `apachectl -S` i mapirani DocumentRootovi.
- Na svakom hostu provjereni su uobičajeni URL-ovi za `.env`, `.env.example`, `.git/HEAD`, SQLite, phpinfo i logove. Dodatno su pregledani backupi, arhive, certifikati i dijagnostičke datoteke pronađene na disku.
- Javne HTTPS putanje testirane su s ograničenim HTTP Range zahtjevima preko SNI-a na javni IP. Nisu preuzeti cijeli backupi/arhive niti su ispisani sadržaji tajni. Testovi su pokrenuti sa samog servera, a ne s neovisne vanjske mrežne sonde.

### Potvrđeno izloženo
| Vhost | Nalaz | Dokaz i procjena |
|---|---|---|
| `toniva-tours.hr` | UpdraftPlus backup, uključujući `...-db.gz`, `...-uploads.zip`, `...-themes.zip`, `...-plugins.zip`, `...-others.zip` i `...-mu-plugins.zip` | Svih šest URL-ova vraća `206`; DB arhiva na disku ima 745.732 B. Tretirati kao kritičnu izloženost baze i odmah obavijestiti vlasnika da ukloni backup iz web-roota/ograniči pristup te provjeri rotaciju mogućih podataka za prijavu. U trenutno dostupnim logovima nije pronađen uspješan zahtjev s IP-a različitog od IP-a ovog servera; to nije dokaz da ranijih preuzimanja nije bilo. |
| `lightverse.cloud` | `public/dl-088bbdee88409855df088f2144210720/lightverse-app-20260831-213211-bez-env.tar.gz` | Vraća `206`; lokalna arhiva ima 117.547.163 B. Naziv kaže da je bez `.env`, ali sadržaj arhive nije preuziman ni pregledan. Vlasnik treba potvrditi je li javna objava namjerna i premjestiti iz web-dostupne putanje ako nije. |
| `lektorski-kutak.hr` | `vendor/` directory listing i `docs/larna-main-files.zip` | Listing `vendor/` potvrđen markerom `Index of`; ZIP vraća `206` i ima 9.673.831 B. `.env`, `.git/HEAD` i `database/database.sqlite` nisu vratili sadržaj u testu. Vlasniku preporučiti isključiti izlistavanje i ukloniti/zaštititi arhivu. |
| `fitapp.cloud` | Nginx statički root nije usklađen s Apache docrootom | Aktivni `/etc/nginx/conf.d/vhosts/fitapp.cloud.conf` i `.ssl.conf` koriste `root /home/fitapp/public_html`, dok Apache koristi `/home/fitapp/public_html/fitapp-saas/public`. Zbog statičkog Nginx locationa javno se mogu dohvatiti datoteke iz projekta preko prefiksa `/fitapp-saas/`: četiri PDF-a (`FitApp_Claude_agent_PUNI.pdf`, `FitApp_upute_agent_chat.pdf`, `FitApp_upute_agent_SEO.pdf`, FINA tehnička specifikacija) i dva Android SDK `annotations.zip`; potvrđen je `206` i prepoznat tip svake datoteke. `.env`, backup `.env` i FINA privatni certifikat preko provjerenih putanja vraćaju `403`. Potrebno je uskladiti Nginx root u HTTP i HTTPS vhostu s `.../fitapp-saas/public` i trajno postaviti promjenu u CWP-u, pa ponoviti provjere. |
| `tenant.fitapp.cloud` | `xml/fina-echo-verbose.log` | Vraća `206`; datoteka je 3.480 B / 96 redaka. Skeniranjem nisu pronađeni uobičajeni markeri tajni (APP/DB lozinke, Authorization/Bearer, token/secret, privatni ključ, FINA cert lozinka, OIB/JIR/ZKI). I dalje je dijagnostički log javno čitljiv; premjestiti ga iz `public` ili blokirati URL. |

### Ostali nalazi i granice provjere
- `hrcak.mellon.hr`, `lektorski-kutak.hr`, `lightverse.cloud`, `mail-app.mellon.hr` i `trener.fitapp.cloud` imaju Laravelov korijen projekta kao Apache DocumentRoot, umjesto `public`. Kod `lektorski-kutak.hr` to već omogućuje izlistavanje `vendor/`; za ostale preporučuje se promjena DocumentRoota i provjera nakon CWP regeneracije, umjesto oslanjanja samo na deny pravila i dozvole.
- Provjereni `.env`, `.env.example`, `.git/HEAD`, SQLite, phpinfo, `trgovina.lusar.hr` WooCommerce logovi te `toniva-tours.hr/wp-content/debug.log` nisu vratili osjetljivi sadržaj. To ne znači da je svaka datoteka i svaki mogući URL na svim vhostovima pojedinačno pregledan.
- `apachectl -S` upozorava da DocumentRootovi za `cms.mellon.hr` i `crypto.fitapp.cloud` ne postoje.
- Na `toniva-tours.hr`, `lightverse.cloud` i `lektorski-kutak.hr` u dostupnim trenutnim/arhiviranim Apache logovima za navedene artefakte nisu nađeni uspješni zahtjevi s vanjskog IP-a. Logovi mogu biti nepotpuni ili rotirani; javna dostupnost sama po sebi znači da se prethodno preuzimanje ne može isključiti.

### Prioritet
1. Odmah obavijestiti vlasnika `toniva-tours.hr` o javnoj DB arhivi.
2. Uskladiti oba apex Nginx vhosta za `fitapp.cloud` s `fitapp-saas/public`; zatim izvana testirati da `/fitapp-saas/` i poznati PDF/ZIP URL-ovi više nisu dostupni.
3. Obavijestiti vlasnike `lightverse.cloud` i `lektorski-kutak.hr`; isključiti listing i zaštititi arhive.
4. Ukloniti javni FINA verbose log te ispraviti Laravel DocumentRootove i CWP postavke da ih regeneracija ne vrati.
