# WebHet

Český web osobního studia pro webdesign a vývoj. Next.js App Router, React, TypeScript ve strict režimu, Tailwind CSS, Lucide, Zod a serverové odesílání přes Resend. Připraveno pro Vercel; žádná databáze ani externí účet nejsou potřeba pro zobrazení webu.

## Spuštění

Vyžaduje Node.js 22+ a npm. Ve Windows PowerShell s omezenou execution policy použijte `npm.cmd` místo `npm`.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Otevřete http://127.0.0.1:3000. Na Windows lze soubor zkopírovat pomocí `Copy-Item .env.example .env.local`. Pro ověření produkční verze použijte `npm run build` a `npm run start`. Dev a produkční server nespouštějte současně nad stejnou složkou `.next`.

## Struktura a úpravy obsahu

| Co upravit                                                                                           | Soubor                                                                                     |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Název, doména, kontaktní e-mail, zakladatel, identifikace firmy, DPH, doba uchování, sociální odkazy | `src/config/site.ts`                                                                       |
| Navigace                                                                                             | `src/config/site.ts`                                                                       |
| Služby, výstupy, cílové skupiny a specifické FAQ                                                     | `src/content/services.ts`                                                                  |
| Balíčky, ceny a porovnání                                                                            | `src/content/pricing.ts`                                                                   |
| Obecné FAQ                                                                                           | `src/content/faq.ts`                                                                       |
| Proces spolupráce                                                                                    | `src/content/process.ts`                                                                   |
| Portfolio                                                                                            | `src/content/projects.ts`                                                                  |
| Homepage                                                                                             | `src/app/page.tsx`                                                                         |
| SEO stránek                                                                                          | `metadata` / `generateMetadata` v jednotlivých `page.tsx`, pomocná funkce `src/lib/seo.ts` |
| Barvy, rozvržení, animace, responzivita                                                              | `src/app/globals.css`                                                                      |
| Logo a favicon                                                                                       | `public/logo.svg`, `public/icon.svg`                                                       |
| Sdílecí obrázek                                                                                      | `src/app/opengraph-image.tsx`                                                              |
| Právní texty                                                                                         | `src/app/ochrana-osobnich-udaju/page.tsx`, `src/app/cookies/page.tsx`                      |

Server Components jsou výchozí. Klientský kód je omezený na menu, formulář a případné filtrování projektů. Typované zdroje lze později nahradit CMS bez přestavby rozhraní.

### Přidání skutečného projektu

Do `projects` v `src/content/projects.ts` přidejte objekt typu `Project`. Vyplňte unikátní slug, kategorii, shrnutí, roli, zadání, cíle, řešení, funkce a technologie. U obrázků uveďte lokální cestu, popisný alt a skutečné rozměry. Soubory uložte do `public/images/`. Nepoužívejte neodsouhlasené materiály nebo nepodložené výsledky.

Nastavte `permissionToPublish: true` teprve po získání souhlasu. Schválený projekt se automaticky objeví v portfoliu, detailní routě, sitemapě a relevantní službě. Pole `results` může zůstat prázdné; nemusíte vymýšlet metriky. Filtry se zobrazí až od čtyř publikovaných projektů ve více kategoriích. Vzdálené obrázky vyžadují explicitní `images.remotePatterns` v Next konfiguraci; výchozí řešení používá lokální soubory.

## Konfigurace prostředí

| Proměnná                    | Význam                                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Finální absolutní URL pro canonical a sitemapu. Lokálně `http://localhost:3000`. Neznamená ověřené vlastnictví domény. |
| `SITE_INDEXABLE`            | Výchozí `false`. Přepněte na `true` až pro schválenou produkci. Vercel preview i localhost zůstávají noindex.          |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Nepovinný veřejný e-mail v zápatí, kontaktu a mailto odkazu.                                                           |
| `RESEND_API_KEY`            | Soukromý serverový klíč Resend.                                                                                        |
| `CONTACT_TO_EMAIL`          | Skutečná schránka příjemce poptávek.                                                                                   |
| `CONTACT_FROM_EMAIL`        | Adresa odesílatele na ověřené doméně Resend, samotná adresa bez zobrazovaného jména.                                   |
| `UPSTASH_REDIS_REST_URL`    | URL služby Redis REST pro sdílený rate limiting. Na Vercelu povinná pro funkční formulář.                              |
| `UPSTASH_REDIS_REST_TOKEN`  | Soukromý REST token Redis. Na Vercelu povinný pro funkční formulář.                                                    |

Proměnné `NEXT_PUBLIC_*` jsou veřejné a sestavují se do klientského kódu. Nikdy do nich nevkládejte klíče. Po změně veřejné konfigurace či indexace web znovu sestavte. `.env.local` a ostatní skutečné `.env` soubory Git ignoruje.

### Resend a doručování

1. V účtu Resend přidejte vlastní doménu odesílatele a do DNS vložte přesné SPF/DKIM záznamy, které Resend zobrazí. Neukládejte odhadnuté DNS hodnoty z návodu. Případnou DMARC politiku nastavte podle svého e-mailového provozu.
2. Vyčkejte na ověření domény. Vytvořte klíč s potřebným oprávněním a doplňte tři serverové proměnné výše.
3. Na Vercelu zprovozněte také sdílený Redis limiter. Před připojením formuláře doplňte právní informace a proces práce s poptávkami.
4. Po nasazení odešlete vlastní testovací poptávku se souhlasem majitele schránky. Ověřte záznam v Resend, doručení včetně spamu a fungování Reply-To. Přijetí poskytovatelem neznamená potvrzené doručení do schránky.

Bez konfigurace API vrací 503 a formulář zobrazuje skutečnou chybu. V developmentu je uvedeno, které proměnné chybí. Selhání poskytovatele vrací 502; hodnoty se při chybě zachovávají. Úspěch je oznámen až po přijetí požadavku službou Resend. Aplikace neposílá automatickou odpověď návštěvníkovi a neukládá poptávky do databáze.

### Ochrana formuláře

Zod validuje vstup v prohlížeči i na serveru. Endpoint kontroluje původ požadavku, typ obsahu a limit těla 24 kB, používá honeypot a dovolí nejvýše 5 pokusů za 15 minut na identifikátor. E-mailová šablona escapuje HTML; uživatelský e-mail slouží jen jako Reply-To. Zprávy ani klíče se nevypisují do logů.

Lokálně a na jednom self-host procesu se používá omezená paměťová mapa. Na Vercelu je nutný Upstash Redis REST, jinak formulář z bezpečnostních důvodů vrátí 503. Redis drží hash síťového identifikátoru a krátce platný čítač, ne údaje z formuláře. Selhání Redis vede k 503, nikoli k nechráněnému odesílání. Při self-hostingu za proxy přizpůsobte získávání IP pouze důvěryhodné infrastruktuře; výchozí self-host režim má společný lokální limit. Veřejné nasazení doplňte podle provozu o Vercel WAF/Firewall pravidla. API nevyžaduje cookies a neřeší přihlášení.

## Kontroly

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm run format:check
```

Playwright spouští produkční server automaticky nebo znovu použije běžící server na 127.0.0.1:3000. Před testem je nutný aktuální build. Testy používají Chromium, všechny skutečné veřejné routy a axe s pravidly WCAG A/AA včetně dostupných kontrol 2.2. Ověřují metadata, sitemapu, 404, přepínání menu, FAQ, klávesnici, reduced motion a šířky 320, 375, 768, 1024, 1440 a 1920 px. Úspěch/chyba v prohlížeči mají mockované API; serverová cesta má samostatné unit testy s mockovaným poskytovatelem. Žádný test neposílá skutečný e-mail.

Lighthouse lze spustit nad produkčním serverem:

```sh
npx lighthouse http://127.0.0.1:3000 --chrome-flags="--headless --no-sandbox" --output=json --output-path=.qa/lighthouse-home.json
```

### Výsledky implementačního ověření

Ověřeno 19. 10. 2026 na lokálním produkčním buildu:

- `lint`, `typecheck`, `build`, kontrola Prettier a 40 unit testů procházejí.
- Šest Playwright testů prochází. Všechny veřejné routy mají jedinečný titul, správný jazyk, canonical a H1; ověřeny jsou OG obrázek, favicon, sitemap, robots a neexistující detaily.
- Axe na všech 12 veřejných routách na desktopu a homepage/kontaktu/ceníku na mobilu: bez zjištěných porušení testovaných pravidel WCAG A/AA. Klávesnice ověřena na skip odkazu, menu, FAQ a formuláři; reduced motion funguje.
- Responzivní kontrola homepage, portfolia, ceníku a kontaktu při 320, 375, 768, 1024, 1440 a 1920 px: bez horizontálního přetečení. Vizuálně ověřeny desktopové a mobilní screenshoty homepage a kontaktu.
- Lighthouse v mobilním simulovaném profilu: homepage Performance **89**, Accessibility **100**, Best Practices **100**, SEO **66**; kontakt **90 / 100 / 100 / 66**. SEO je záměrně snížené kvůli výchozímu `noindex` a zákazu v robots.txt. Indexaci zapněte teprve po schválení produkce.
- Laboratorní LCP homepage **3,4 s**, kontakt **3,3 s**, CLS **0** na obou stránkách. Homepage těsně nesplňuje cíl Performance 90 a laboratorní LCP přesahuje 2,5 s. Největší položkou kritické cesty jsou požadovaná písma; hlavní nadpis se již nevynořuje z opacity 0, přednostně se přednačítá titulkové písmo a `font-display: optional` omezuje pozdní výměnu fontu při pomalém připojení. Další měření proveďte na skutečném hostingu.

Lokální reporty a screenshoty jsou v ignorované složce `.qa/`; znovu je vytvoříte Lighthouse příkazy výše a `node scripts/visual-qa.mjs`. Reálné CWV na p75 vyžadují produkční provoz; laboratorní skóre není zárukou výsledků skutečných návštěvníků. Automatický axe audit nenahrazuje ruční audit. Skutečná čtečka obrazovky, vzdálený Vercel preview a doručení e-mailu nebyly v tomto prostředí ověřeny. Úspěšné odeslání je v testech simulované; vyžaduje vlastní produkční kontrolu po doplnění konfigurace.

Produkční závislosti: `npm audit --omit=dev` bez zranitelností v době implementace. Vývojový Next ESLint řetězec má upstream advisory pro `braces <=3.0.3` (GHSA-vfj7-8cjw-p6xm); aktuální registry zatím neposkytuje opravený `braces`. Nepouštět lint nad nedůvěryhodnými glob vzory. Nesnižovat Next/ESLint na nesouvisející starou verzi jen kvůli automatickému návrhu `npm audit fix --force`. Aktualizovat při dostupnosti opravy.

## Nasazení na Vercel

1. Nahrajte repozitář do svého Git poskytovatele a importujte jej do Vercelu jako Next.js projekt. Root je tato složka, build příkaz `npm run build`; výstup ponechte automatický. Použijte Node.js 22+.
2. Nastavte proměnné prostředí zvlášť pro Preview a Production. Preview ponechte `SITE_INDEXABLE=false`; pro e-mail použijte testovací příjemce, pokud nechcete přijímat skutečné poptávky.
3. Získejte preview deployment a ověřte všechny routy, mobilní menu, formulář, chybové stavy a canonical URL. Pokud používáte chráněný preview, automatické testy musí mít příslušný přístup.
4. Až máte potvrzené vlastnictví domény, přidejte ji ve Vercelu a u registrátora nastavte přesné DNS hodnoty uvedené Vercel rozhraním. Počkejte na ověření a TLS. Žádná hodnota DNS v tomto repozitáři nepředpokládá vlastnictví `webhet.eu`.
5. Nastavte `NEXT_PUBLIC_SITE_URL` na skutečnou produkční URL, doplňte obsah a právní údaje, ověřte Resend a Redis, poté zapněte `SITE_INDEXABLE=true` a redeploy.
6. Proveďte vlastní end-to-end test doručení, kontrolu sitemap.xml/robots.txt, OG náhledu, chybové stránky a nové produkční Lighthouse měření.

V této implementační relaci není vytvořen vzdálený Vercel projekt, přidána doména ani připojen produkční Resend účet. Lokální build neprokazuje funkční DNS či doručování.

## Nutné údaje před spuštěním

- Ověřit vlastnictví domény a použitelnost značky WebHet.
- Doplnit jméno zakladatele, schválený profil a případně fotografii.
- Doplnit správce údajů, IČO, sídlo, veřejný e-mail a pravdivý status DPH v konfiguraci.
- Schválit ceny, rozsahy, náklady třetích stran a podmínky následné péče.
- Dokončit právní informace: účel, právní základ, doby uchování, skuteční zpracovatelé, regiony a případné předávání údajů. Zajistit postup výmazu u e-mailového poskytovatele i ve schránce.
- Nakonfigurovat a ověřit Resend, schránku a Redis rate limiting. Ověřit limity poskytovatelů podle zvoleného tarifu.
- Dodat skutečné reference a svolení, pokud se mají publikovat. Prázdné portfolio je podporovaný stav.
- Ručně ověřit čtečku obrazovky, finální češtinu a skutečný produkční provoz.

Obchodní podmínky nejsou vymyšlené ani publikované. Analytika, Supabase, přihlášení, platby a vlastní CMS nejsou ve v1 zapnuté. Proto web nemá nefunkční cookie lištu ani předstíraný administrátorský panel. Před pozdějším přidáním měření doplňte příslušný souhlas a aktualizujte právní informace.

## Licence a podklady

Logo, favicon, geometrický hero koncept a Open Graph kompozice jsou původní lokální SVG/CSS/JSX prvky tohoto projektu. Hero je výslovně označen jako vizuální koncept a není klientskou referencí. Nejsou použité cizí fotografie, klientská loga ani vymyšlené reference. Inter a Space Grotesk jsou distribuovány pod SIL Open Font License prostřednictvím next/font; Lucide pod ISC. Závislosti si zachovávají vlastní licence.

Technické zdroje: [Next.js instalace](https://nextjs.org/docs/app/getting-started/installation), [Resend a Next.js](https://resend.com/nextjs), [Upstash REST API](https://upstash.com/docs/redis/features/restapi). DNS a účty nastavujte podle aktuálních pokynů příslušných poskytovatelů. Pro dopracování právních informací: [ÚOOÚ — základní příručka](https://uoou.gov.cz/verejnost/zakladni-prirucka-k-ochrane-udaju) a [práva subjektu údajů](https://uoou.gov.cz/poradna/poradna-gdpr/prava-subjektu-udaju).
