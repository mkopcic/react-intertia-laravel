# Server vhost security audit and remediation plan

**Server:** CWP Pro, Apache + Nginx  
**Audit date:** 04.10.2026  
**Status:** Partial remediation executed 04.10.2026. See the completed changes and open blockers below.

Changes were limited to the listed vhosts, moving identified artifacts outside web roots, and scoped DB credentials needed to restore Hrcak and mail-app. No PHP-FPM pool configuration or application code was changed.

## Production guardrails

- Treat this server as production. Work one vhost at a time and verify the affected site before proceeding to another.
- Before changing a generated CWP vhost, identify and change its CWP source of truth. Do not rely on a direct edit that CWP may overwrite.
- Save a permission-restricted backup of each configuration before editing. Do not put backups under any web root.
- Run configuration tests before reload. Reload only the service whose configuration changed; do not restart services unnecessarily.
- Keep a tested rollback ready. If a health check fails, restore the last known-good configuration and validate it before moving on.
- Do not alter DNS, firewall/CSF, databases, credentials, or third-party sites as part of this plan unless separately authorized.
- Public file checks so far used HTTPS/SNI against the server's public IP from the server itself. Perform final acceptance checks from an independent external network.

## Initial findings before remediation

| Priority | Host | Finding |
|---|---|---|
| P0 | `fitapp.cloud` | Apache DocumentRoot is `/home/fitapp/public_html/fitapp-saas/public`, but both apex Nginx HTTP and HTTPS vhosts use `root /home/fitapp/public_html`. Public Range requests confirmed four project PDFs and two Android SDK ZIP files accessible under `/fitapp-saas/`. The checked `.env`, its backup, and FINA private certificate URLs returned `403`. |
| P0 | `toniva-tours.hr` | Six UpdraftPlus backup parts, including the database archive, are publicly accessible: `db.gz`, `uploads.zip`, `themes.zip`, `plugins.zip`, `others.zip`, and `mu-plugins.zip`. Each tested URL returned `206`. The database archive is 745,732 bytes on disk. |
| P1 | `lightverse.cloud` | A 117,547,163-byte source archive under `public/dl-088bbdee88409855df088f2144210720/` is publicly accessible and returns `206`. Its filename says `bez-env`; archive contents were not downloaded or inspected. |
| P1 | `lektorski-kutak.hr` | `/vendor/` returns a directory listing and `/docs/larna-main-files.zip` is publicly accessible (9,673,831 bytes, `206`). Tested `.env`, `.git/HEAD`, and SQLite URLs did not return their contents. |
| P1 | `tenant.fitapp.cloud` | `/xml/fina-echo-verbose.log` is publicly accessible (`206`, 3,480 bytes). A pattern scan found no common credential/private-key markers, but the diagnostic log should not be web-accessible. |
| P1 | Five Laravel hosts | `hrcak.mellon.hr`, `lektorski-kutak.hr`, `lightverse.cloud`, `mail-app.mellon.hr`, and `trener.fitapp.cloud` use the Laravel project root rather than its `public` directory as Apache DocumentRoot. `lektorski-kutak.hr` already exposes a `vendor/` listing. |
| P2 | `cms.mellon.hr`, `crypto.fitapp.cloud` | `apachectl -S` reports that the configured DocumentRoot paths do not exist. Investigate intended deployment paths; do not create replacement directories without confirming ownership and intended site state. |
| P2 | Multiple hosts | The common checks for `.env`, `.env.example`, `.git/HEAD`, SQLite, phpinfo, and selected logs did not return matching sensitive contents on the other tested vhosts. This was a targeted scan, not a review of every file or URL. |

Available Apache logs for the three third-party archive findings showed no successful requests from an IP other than the server during the queried period. This is not proof that no earlier downloads occurred; retain logs and account for rotation/retention limits.

## Read-only preflight before remediation (04.10.2026)

- Apex Nginx HTTP and HTTPS configs both still point their static-file `root` at `/home/fitapp/public_html`; the wildcard HTTP/HTTPS configs point at `/home/fitapp/public_html/fitapp-saas/public` and are not part of the proposed change.
- Baseline checks returned `200` for `/`, `/login`, `/cijene`, `/favicon.ico`, and the current landing CSS/JS. The known project PDF and ZIP URLs still returned `206`.
- `nginx -t` succeeds. It emits existing HTTP/2 deprecation and protocol redefinition warnings in multiple vhosts. `apachectl -t` reports `Syntax OK`, with warnings for the missing `cms.mellon.hr` and `crypto.fitapp.cloud` DocumentRoots.
- The saved CWP snapshot records `nginx_template-type=default` and `nginx_template-name=force-https-http2`, but does not record a per-domain root. The installed CWP editor code is ionCube-protected; a persistent per-domain root setting has not yet been verified. Do not claim the fix is CWP-persistent until that setting is confirmed.
- No production configuration was written and no service was reloaded during this preflight.

## Completed changes (04.10.2026)

- `fitapp.cloud`: corrected the static root in both apex Nginx vhosts to `/home/fitapp/public_html/fitapp-saas/public`; `nginx -t` passed and Nginx was reloaded. Homepage, login, pricing, CSS, and JS returned `200`; the previously exposed project PDFs/ZIPs, `.env`, and FINA certificate returned `403` over HTTP/HTTPS. Wildcard vhosts were not changed.
- `toniva-tours.hr`: moved all six UpdraftPlus backup parts out of `public_html/wp-content/updraft/` to `/home/toniva/private-backups/security-incident-20261004/`, directory mode `700`, files mode `600`. No matching public backup files remain; sampled URLs return `403`.
- `lektorski-kutak.hr`: moved `docs/larna-main-files.zip` to `/home/lektor/private-security/incident-20261004/` (mode `600`); no PDFs were present in that web root. Corrected Apache and Nginx roots to `public`, explicitly disabled directory indexes, tested and reloaded both services. Homepage/login return `200`, `/vendor/` returns `403`, and the ZIP URL returns `404`.
- `lightverse.cloud`: moved the 117,547,163-byte source archive to `/home/lightver/private-security/incident-20261004/` (mode `600`). Corrected Apache/Nginx roots to `public`, disabled indexes, tested and reloaded both services. Homepage/login return `200`; the archive URL returns `404`.
- `tenant.fitapp.cloud`: moved `fina-echo-verbose.log` to `/home/fitapp/private-diagnostics/security-incident-20261004/` (mode `600`); its public URL returns `404`.
- `trener.fitapp.cloud`: corrected Apache/Nginx roots to `public`, disabled indexes, tested and reloaded both services. Homepage returns `200`; `.env`, `.env.example`, `.git/HEAD`, and SQLite URLs do not return file contents.
- `cms.mellon.hr`: corrected Apache/Nginx roots from the nonexistent `coming2live-master/` path to the existing `/home/mellonwe/cms.mellon.hr/public`, disabled indexes, tested and reloaded both services. Homepage returns `200`, login redirects with `302`, and `.env`, `.git`, `composer.json`, `artisan`, and storage-log URLs do not return project contents.
- `hrcak.mellon.hr`: after PHP 8.4.24 became available, pointed both Apache and Nginx at `public` and Apache at the existing `mellonwe` PHP 8.4 socket. The database existed but the `.env` account `mellonwe_hrcak` had no MySQL grant for host `127.0.0.1`; created that account with a new random credential, scoped its grant to `mellonwe_hrcak` only, updated only `DB_PASSWORD`, and set `.env` mode `640`. A root-only pre-change `.env` backup is under `/root/server-vhost-security-20261004-212956/hrcak-db-credential-220327/`. `migrate:status` succeeded with all 10 migrations already `Ran` (no migrations executed). Homepage/login return `200`; project secrets and files are not served.
- `mail-app.mellon.hr`: resolved the `500` caused by the missing `mellonwe_mail` MySQL account/grant. Created a new credential for host `127.0.0.1`, scoped the grant to `mellonwe_mail` only, updated only `DB_PASSWORD`, set `.env` mode `640`, and rebuilt Laravel's config cache. A root-only pre-change `.env` backup is under `/root/server-vhost-security-20261004-212956/mail-app-db-credential-220924/`. `migrate:status` succeeded with all migrations already `Ran` (no migrations executed). Homepage/login return `200`; sensitive project paths remain blocked.
- PHP 8.5.9 CLI and FPM are installed; the PHP-FPM 8.5 master and `mellonwe` socket were present during verification. No application pool was switched to PHP 8.5.
- `crypto.fitapp.cloud`: removed the four retired active Apache/Nginx HTTP/HTTPS vhost files after verified backups under `/root/server-vhost-security-20261004-212956/crypto.fitapp.cloud/`. Nginx and Apache tests passed; the stale crypto DocumentRoot warnings disappeared. This removes active vhost files; a CWP panel record, if present, was not changed.
- Root-only backups of changed vhosts are stored under `/root/server-vhost-security-20261004-212956/`.

## Open blockers

- CWP persistence for the corrected roots remains unresolved. Read-only inspection found `root_cwp.domains.path` entries for addon/subdomains, but the primary `fitapp.cloud` account is in `root_cwp.user`, which has no document-root column or separate `domains` row. The selected Nginx template is the global default `force-https-http2` and uses `%docroot%`; changing that shared template would affect other domains using it. No global template or CWP setting has been changed. A supported primary-domain-specific override must be identified before making this persistent.

## Remediation checklist

### 1. Fix the FitApp apex Nginx root first

- [x] Back up both generated apex Nginx vhost files outside all web roots; preserve permissions.
- [x] Set the apex static root to `/home/fitapp/public_html/fitapp-saas/public` in the active HTTP and HTTPS vhost files. Leave the wildcard tenant vhosts unchanged.
- [x] Run `nginx -t` and reload Nginx; confirm the homepage, login, pricing, CSS, and JS work.
- [x] Verify the previously exposed project PDFs/ZIPs, `.env`, and FINA certificate URLs are blocked from this server.
- [ ] Confirm the persistent CWP source of truth and verify it does not regenerate the unsafe root.
- [ ] Repeat the URL checks from an independent external network.

### 2. Remove Toniva's public backup exposure

- [x] Move all six listed UpdraftPlus backup parts out of the public `wp-content/updraft/` path into owner-only storage outside every web root.
- [ ] Check the UpdraftPlus destination/settings so future backups are not written to a publicly readable location. Do not change unrelated WordPress settings or files.
- [ ] Preserve and review the relevant current and rotated access logs for successful external requests to the exact backup URLs. Do not treat missing log entries as proof of no access.
- [x] Verify no matching backup files remain in the public directory and sampled backup URLs return `403`.
- [ ] Verify all six public URLs individually and confirm the live site and backup/restore workflow remain healthy.
- [ ] Have the site owner assess whether the database contained personal data, password hashes, or credentials requiring notification or rotation. Do not rotate credentials or contact affected parties without the owner's direction.

### 3. Address the other owners' public artifacts

- [ ] Notify the owners of `lightverse.cloud` and `lektorski-kutak.hr` with the verified URLs and evidence; coordinate ownership and retention of the private copies.
- [x] Move the Lightverse source archive outside the web root and verify its old URL is no longer retrievable.
- [x] Disable Lektor directory indexing, move the docs ZIP outside the web root, and verify `/vendor/` returns `403` and the ZIP URL returns `404`.
- [ ] Review available access logs with each owner. Do not download or inspect full backups/source archives without a specific need and approval.

### 4. Remove the public FINA diagnostic log

- [x] Move `public/xml/fina-echo-verbose.log` to protected storage outside the web root.
- [ ] Prevent future verbose diagnostics from being written under `public`; retain only the minimum diagnostic detail needed.
- [x] Verify the public URL returns `404` and normal application routes still work.
- [ ] Confirm the FINA integration's next real transaction/logging cycle succeeds without recreating a public log.

### 5. Correct Laravel DocumentRoots safely

- [x] Confirm actual application paths and `public/index.php` for Hrcak, Lektor, Lightverse, mail-app, and Trainer.
- [x] Set their active Apache and Nginx document roots to the verified Laravel `public` directory, one site at a time, with backups.
- [x] Run `nginx -t` and `apachectl -t`; reload after successful checks.
- [x] Verify homepage/login availability and sensitive project paths for the five hosts. Hrcak and mail-app now return `200`; no PHP-FPM pool configuration was changed.
- [ ] Confirm the CWP source-of-truth settings and recheck after CWP regeneration.

### 6. Resolve stale vhost paths and complete the audit

- [x] Confirm CMS's existing application path and point active vhosts to `public`; archive and remove Crypto's four retired active vhost files.
- [ ] Check CWP records for CMS/Crypto so a later regeneration does not restore stale or retired vhosts.
- [ ] Independently recheck TLS expiry and hostname coverage for all vhosts. The earlier scan flagged `crypto.fitapp.cloud`, `hidromodel.hr`, `katarios.hr`, and `obiteljske-uspomene.com.hr` as possibly expired; reconfirm before renewing any certificate.
- [ ] Repeat the sensitive-path and known-artifact checks over HTTP/HTTPS for all named hosts and the `*.fitapp.cloud` route after remediation.
- [ ] Review access logs for each confirmed exposure and document coverage gaps, successful external requests, and owner follow-up.
- [x] Record completed changes, backup paths, validation results, and remaining exceptions in this document.
- [ ] Add the persistent CWP setting and independent external test results when verified.

## Change log

- 04.10.2026: Initial audit, production remediation, verification results, and remaining follow-ups recorded.
