# Provoz WebHet

## Co je již doplněné

- Petr Hetzendorf, IČO 29704685; identita a sídlo Touchořiny 8, 411 45 Lovečkovice ověřeny 19. 10. 2026 v [ARES](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/29704685).
- Veřejný kontakt: petahecik@gmail.com, +420 608 170 407.
- Neplátce DPH potvrzen vlastníkem; ceny Start 9 990 Kč, Profi 19 990 Kč, Business 39 990 Kč. Ceny jsou orientační, DPH se nepřipočítává.
- O mně bez fotografie. Další biografické údaje lze doplnit později; žádné zkušenosti či kvalifikace nejsou vymyšlené.
- Čtyři vlastníkem dodané projekty: MIDARI, Egyptsko Česká Reality, Petr Pavlát reality, FixPlace. Skutečné náhledy z 19. 10. 2026 jsou uložené lokálně. Role, původní zadání a výsledky jsou prázdné, dokud je vlastník nedoplní; veřejná stránka je nepředstírá.
- Ochrana osobních údajů má identifikaci správce, účely, právní základy, dobu uchování, aktuálně zapnuté poskytovatele, informace o předávání a práva. Cookie stránka odpovídá aplikaci bez analytiky a reklamy.

## Co vyžaduje skutečné účty a nasazení

1. Ve Vercelu připojit vlastní doménu a nastavit `NEXT_PUBLIC_SITE_URL` na její HTTPS adresu.
   Soubor `vercel.json` volí pro serverové funkce Frankfurt (`fra1`). Neznamená to, že veškeré zpracování všech dodavatelů zůstává pouze v EU.
2. V Resend ověřit odesílací doménu pomocí přesných DNS záznamů z účtu a ve Vercelu uložit `RESEND_API_KEY` a `CONTACT_FROM_EMAIL`. Příjemce `CONTACT_TO_EMAIL` je volitelný override; výchozí je veřejný e-mail vlastníka. Adresa `CONTACT_FROM_EMAIL` musí patřit ověřené doméně, nikoli osobnímu Gmailu.
3. Pro formulář na Vercelu přidat `UPSTASH_REDIS_REST_URL` a `UPSTASH_REDIS_REST_TOKEN`. Při chybě ochrany nebo e-mailové konfigurace API vrací chybu a netvrdí, že byla zpráva doručena. Návštěvník má stále funkční mailto a telefon.
4. V účtech ověřit regiony, retenční nastavení a odpovídající smluvní podmínky pro data. Dokumentace neposuzuje ani nepředstírá uzavření smluv za vlastníka. U osobní schránky Gmail ověřit, zda zvolená služba a její podmínky odpovídají zamýšlenému podnikatelskému použití; při potřebě použít podnikatelskou schránku s vhodnými podmínkami.
5. Zkontrolovat veřejnou ochranu údajů po nasazení: Vercel se zobrazí v prostředí Vercelu; Resend a Upstash při doplnění jejich konfigurace. Zapnutí nové služby vyžaduje odpovídající aktualizaci informací.
6. Provést vlastní test odeslání a skutečného přijetí zprávy. Zkontrolovat Spam a Reply-To. Klíče neukládat do Git ani je neposílat do veřejného chatu.
7. Po schválení nasazení nastavit `SITE_INDEXABLE=true` a znovu nasadit. Do té doby je zákaz indexace úmyslný.

## Uchování a výmaz poptávek

Zvolená provozní politika: poptávky bez smlouvy se uchovávají nejvýše 12 měsíců od poslední věcné komunikace. Toto není automatické mazání e-mailové schránky; provádí ho provozovatel.

Jednou měsíčně zkontrolovat staré neuzavřené poptávky, odstranit zprávy z pracovní schránky včetně koše a případných exportů a využít dostupný výmaz v historii e-mailového poskytovatele. U smluvních zákazníků zachovat pouze nezbytné podklady podle povinností a oprávněných nároků. U záloh a technických logů ověřit cyklus výmazu podle tarifu a smlouvy poskytovatele. Nové integrace nebo sdílené schránky nesmějí tento postup obejít.

Na žádost o osobní údaje reagovat bez zbytečného odkladu, zpravidla do jednoho měsíce; případné prodloužení včas vysvětlit. Totožnost ověřovat přiměřeně, nesbírat kopie dokladů bez důvodu. Údaje z poptávek nejsou určeny pro hromadný marketing.

## Údržba náhledů portfolia

Při změně vzhledu klientských webů lze znovu spustit `node scripts/capture-portfolio.mjs` nebo pro jeden web například `node scripts/capture-portfolio.mjs midari`. Skript otevírá pouze čtyři uvedené veřejné URL, pořizuje 1440 × 1000 JPEG a podle viditelných ovládacích prvků zavírá promo okna a odmítá volitelné cookies. Náhled vždy vizuálně zkontrolovat. Nevkládat obsah neveřejného účtu.

Veřejné popisy odkazují jen na pozorovatelné funkce. Rozsah vlastní práce, technologie a obchodní výsledky doplnit jen na základě skutečných podkladů. Publikaci může vlastník kdykoli vypnout pomocí `permissionToPublish: false`.

## Zdroje právních informací

- [ÚOOÚ — základní příručka](https://uoou.gov.cz/verejnost/zakladni-prirucka-k-ochrane-udaju)
- [ÚOOÚ — práva subjektu údajů](https://uoou.gov.cz/poradna/poradna-gdpr/prava-subjektu-udaju)
- [Vercel — ochrana soukromí](https://vercel.com/legal/privacy-notice), [DPA](https://vercel.com/legal/dpa)
- [Resend — DPA a mezinárodní předávání](https://resend.com/legal/dpa)
- [Google — zásady ochrany soukromí](https://policies.google.com/privacy?hl=cs)
- [Upstash — ochrana soukromí](https://upstash.com/trust/privacy)

Zdroje ověřeny 19. 10. 2026. Účet, konkrétní tarif a následné zásahy mohou změnit skutečný rozsah zpracování.
