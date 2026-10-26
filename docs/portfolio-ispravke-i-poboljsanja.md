# Portfolio — ispravke i poboljšanja

Opseg: samo portfolio `marijankopcic.from.hr` (welcome stranica i njene sekcije). Ostali projekti nisu uključeni.

Izvori: ChatGPT plan redizajna, Cowork pregled sadržaja/HTML-a, provjera u kodu (2026-10-26).

**Redoslijed:** prvo sadržajne ispravke (faza 1). Brze su i vrijede više od redizajna. Vizualni dio dolazi tek nakon njih.

**Stanje (26.10.2026.):**
- Faza 1 je gotova i na produkciji, osim točke 7, koja čeka da preimenuješ repo na GitHubu.
- SEO zahvat istog dana (www redirect, site name, schema, breadcrumbs, dupli title) dokumentiran je u [fixes/2026-10-26-seo-schema-www.md](fixes/2026-10-26-seo-schema-www.md).
- Faze 2 i 3 nisu započete.
- Blog, stranica posta: cover slika smanjena je na `max-w-xl` (576 px) umjesto pune širine (`resources/js/pages/blog/show.tsx`). Covere su OG kartice 1200×630 s jednom ključnom riječi u golemom fontu ("Enums", "N+1"). Preko cijele širine bile su veće od `h1` i gurale tekst ispod prvog ekrana.
- Blog, grid postova (index i tag): na `lg` 3 stupca umjesto 2 (`resources/js/components/blog/post-grid.tsx`). Covere su zato oko trećinu manje, a slika se ne reže.

---

## Faza 1 — sadržajne ispravke (prioritet)

### 1. Dupli title
- **Problem:** `Marijan Kopčić | Lead Laravel & Backend Engineer, DevOps - Marijan Kopčić Workshop`. Inertia title template dodaje `APP_NAME` na naslov koji već sadrži ime.
- **Gdje:** [resources/js/app.tsx:11](../resources/js/app.tsx#L11), [resources/js/ssr.tsx:19](../resources/js/ssr.tsx#L19), `APP_NAME` u `.env`
- **Rješenje:** template ne dodaje sufiks ako title već sadrži ime (ili welcome stranica zaobilazi template). Provjeriti i SSR i client-side title te OG title.
- **Napravljeno:** template više ne dodaje sufiks (`title || appName`). Isti problem bio je i na blogu (`Blog | Marijan Kopčić - Marijan Kopčić Workshop`) i riješen je istom izmjenom. Posljedica: tabovi u adminu (Dashboard, Teams…) više nemaju sufiks " - Marijan Kopčić Workshop".
- [x] Riješeno

### 2. "Log in" javno u navigaciji
- **Problem:** na javnom portfoliju stoji Log in link, i to stiliziran kao primarna zelena tipka, pa vizualno konkurira CTA-ovima.
- **Gdje:** [resources/js/pages/welcome.tsx:151](../resources/js/pages/welcome.tsx#L151), [resources/js/pages/welcome.tsx:236](../resources/js/pages/welcome.tsx#L236) (mobilni meni)
- **Rješenje:** ukloniti iz javne navigacije. Login ostaje dostupan direktno na `/login`. Dashboard link za prijavljenog korisnika može ostati.
- **Napravljeno:** uklonjen Log in iz desktop i mobilne navigacije, zajedno sa zakomentiranim Register blokovima. Posts i Dashboard i dalje se prikazuju prijavljenom korisniku.
- [x] Riješeno

### 3. WDR opis ne odgovara projektu
- **Problem:** piše "mobility and fleet management… vehicle tracking, maintenance scheduling, advanced analytics", a WDR je platforma za leasing bicikala. "Vehicle tracking", "maintenance scheduling" i "advanced analytics" nisu potvrđeni. Isti problem je u `alt` tekstu slike ("Fleet Management SaaS").
- **Gdje:** [resources/js/components/welcome/featured-projects.tsx:31](../resources/js/components/welcome/featured-projects.tsx#L31), `alt` na liniji 20
- **Stvarna funkcionalnost:** platforma za leasing bicikala koja pokriva fleet management, arhivu dokumenata i digitalno potpisivanje.
- **Rješenje:**
  - opis: "Bike leasing platform covering the full leasing lifecycle: fleet management, document archive, and digital contract signing. Built with Laravel, Livewire, and multi-tenant architecture."
  - `alt`: "WDR Cloud Platform - Bike Leasing SaaS"
  - kategorija "01 / SaaS Platform", badgeovi i link na willdienstrad.app ostaju kako jesu.
- [x] Riješeno

### 4. "View Case Study" vodi na live stranicu
- **Problem:** sva tri linka vode na live sajtove (willdienstrad.app, fitapp.cloud, housespilot.com), a ne na studiju slučaja.
- **Gdje:** [resources/js/components/welcome/featured-projects.tsx](../resources/js/components/welcome/featured-projects.tsx) (linije 52, 86, 136)
- **Rješenje:** labelu promijeniti u "Visit Live Site" (s ikonom vanjskog linka). Kasnije, ako nastanu stvarne studije slučaja (npr. kao blog postovi), dodati zaseban link "Read Case Study".
- **Napravljeno:** sve tri labele su sad "Visit Live Site" s ikonom `ArrowUpRight`.
- [x] Riješeno

### 5. Miješana poruka: Lead vs. senior, uloga vs. projekt
- **Problem:** hero kaže "Available for Lead Roles", a primarni CTA je "Start a Project". Kontakt sekcija kaže "senior Laravel developer", ostatak stranice "Lead".
- **Gdje:** [hero-section.tsx:22](../resources/js/components/welcome/hero-section.tsx#L22), [hero-section.tsx:43](../resources/js/components/welcome/hero-section.tsx#L43), [contact-section.tsx:48](../resources/js/components/welcome/contact-section.tsx#L48)
- **Ciljana publika:** oboje, i lead uloge i projekti.
- **Rješenje:** poruka treba pokriti obje publike, a titula mora biti svugdje ista (Lead):
  - badge: "Open to Lead Roles & Projects"
  - primarni CTA: "Get in Touch" (pokriva i zapošljavanje i projekt); "View Projects" ostaje sekundarni
  - kontakt: "Looking for a lead Laravel / backend engineer for your team or your next project?"
- [x] Riješeno

### 6. "MVC Purity" u About sekciji
- **Problem:** prazna fraza bez konkretnog značenja.
- **Gdje:** [resources/js/components/welcome/about-section.tsx:19](../resources/js/components/welcome/about-section.tsx#L19)
- **Rješenje:** zamijeniti konkretnim principom, npr. "maintainable architecture, security, and scalability" ili nečim što stvarno opisuje tvoj pristup.
- **Napravljeno:** "maintainable architecture, security, and scalability".
- [x] Riješeno

### 7. Typo u imenu repozitorija
- **Problem:** `react-intertia-laravel` umjesto `react-inertia-laravel`.
- **Gdje:** [resources/js/components/welcome/open-source-section.tsx:32-33](../resources/js/components/welcome/open-source-section.tsx#L32-L33)
- **Rješenje:** preimenovati repo na GitHubu (GitHub automatski preusmjerava stari URL), pa ažurirati naziv i URL u kodu.
- **Status:** čeka da preimenuješ repo na GitHubu. Novi URL `github.com/mkopcic/react-inertia-laravel` trenutno vraća 404, pa izmjena u kodu sada ne bi radila.
- [ ] Riješeno

### 8. Facebook link
- **Problem:** uz GitHub i LinkedIn neuobičajen je za profil koji cilja lead uloge.
- **Gdje:** [resources/js/components/social-links.tsx:15](../resources/js/components/social-links.tsx#L15), `SOCIAL_FACEBOOK` u [config/seo.php:32](../config/seo.php#L32) (JSON-LD `sameAs`)
- **Odluka:** Facebook link je zakomentiran u `social-links.tsx` (portfolio i blog). U JSON-LD `sameAs` ostaje dok god je `SOCIAL_FACEBOOK` postavljen u `.env`.
- [x] Odlučeno

---

## Faza 2 — vizualna poboljšanja (nakon faze 1)

ChatGPT plan je dobar kao smjer (dark, editorial, jedna akcentna boja, bez WebGL-a, bez rewritea), ali je generički. Ovdje je prilagođen onome što stranica već ima.

### 9. Hero: zadržati poruku, ne mijenjati
- Postojeći tekst "I design, ship, and operate production Laravel systems…" već nosi istu poruku kao predloženi "I build it. I ship it. I run it." Ne treba novi naslov.
- Moguće je samo zategnuti tipografiju i ritam.
- [ ] Pregledano

### 10. End-to-end ownership: doraditi postojeće, ne raditi novi dijagram
- **Problem:** kartica sa 6 slojeva (Application → Monitoring) je `hidden lg:flex`, pa se na mobitelu ne prikazuje, a to je ključni dokaz pozicioniranja.
- **Gdje:** [resources/js/components/welcome/hero-section.tsx](../resources/js/components/welcome/hero-section.tsx) (`OWNERSHIP_CHAIN`)
- **Rješenje:**
  - prikazati je i na mobitelu (npr. kompaktna horizontalna/vertikalna verzija ispod CTA-ova);
  - po želji hover/fokus na sloju prikazuje kratko objašnjenje ili poveznicu na projekt gdje je to primijenjeno;
  - za interakciju koristiti stvarne tipke/linkove (keyboard focus, `aria` imena).
- Ovo zamjenjuje ChatGPT-ov prijedlog zasebnog SVG dijagrama arhitekture.
- [ ] Riješeno

### 11. Core Competencies: razbiti 6 jednakih kartica
- **Problem:** 6 identičnih kartica s listama tagova. Ovdje ChatGPT-ova kritika stoji.
- **Gdje:** [resources/js/components/welcome/tech-stack-bento.tsx](../resources/js/components/welcome/tech-stack-bento.tsx)
- **Rješenje:** hijerarhija umjesto jednake mreže, npr. 2 istaknute kompetencije (Backend Architecture, Production Engineering) kao veći blokovi, ostale kompaktnije. Manje tagova, više jedne rečenice o tome što konkretno radiš.
- [ ] Riješeno

### 12. Projekti kao studije slučaja
- Layout s velikim screenshotovima i izmjeničnim stranama već postoji. Treba dopuniti sadržaj, ne raditi novi layout.
- Za svaki projekt: problem koji rješava → tvoj doprinos → tehnički izazov → stack.
- Bez polja "rezultat" i bez metrika jer nema podataka koji se smiju javno navesti. Ništa se ne izmišlja.
- Jasno odvojiti osobni doprinos od rada tima/klijenta.
- Provjeriti točnost `alt` tekstova (vidi točku 3).
- [ ] Riješeno

### 13. Animacije i pristupačnost
- Samo CSS (hover, focus, kratki ulazni prijelazi). GSAP/ScrollTrigger tek ako CSS stvarno ne bude dovoljan. Three.js/WebGL izvan opsega.
- Poštovati `prefers-reduced-motion` (`animate-pulse` u hero badgeu, `hover:scale-105` na slikama i tipkama).
- Vidljiv keyboard focus na svim linkovima i tipkama.
- Ne skrivati sadržaj dok se JS ne učita (SSR već postoji, ne narušiti ga).
- [ ] Riješeno

---

## Faza 3 — provjera nakon izmjena

- [x] Title, description i OG tagovi točni (view-source, ne samo DevTools); provjereno 26.10.2026.
- [x] JSON-LD i dalje valjan (veza blog ↔ portfolio); provjereno 26.10.2026.
- [ ] OG slika (`public/og-image.jpg`) još piše "Lead Full-Stack Developer" i "10+ years", a stranica "Lead Laravel & Backend Engineer" i "15+ years"
- [ ] Svi linkovi rade (projekti, GitHub, CV downloadi, blog)
- [ ] Mobilni layout i mobilni meni
- [ ] Konzola bez grešaka, SSR render bez hydration upozorenja
- [ ] Lighthouse / Core Web Vitals prije i poslije

---

## Odluke (2026-10-26)

1. **WDR:** platforma za leasing bicikala (fleet management, arhiva dokumenata, digitalno potpisivanje). Naziv i link ostaju. (točka 3)
2. **Publika:** oboje, lead uloge i projekti. (točka 5)
3. **Facebook:** link je zakomentiran u UI-ju, a u JSON-LD `sameAs` ostaje dok god je postavljen `SOCIAL_FACEBOOK`. (točka 8)
4. **Rezultati/metrike projekata:** nema ih, pa se ne navode. (točka 12)
