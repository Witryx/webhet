import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, PageIntro, CTA } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Cookies a technologie webu",
  "WebHet nemá zapojenou reklamní ani analytickou službu. Přečtěte si, jaké technologie aplikace používá a jak pracuje kontaktní formulář.",
  "/cookies",
);
export default function CookiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Cookies", href: "/cookies" }]} />
      <PageIntro
        eyebrow="COOKIES A TECHNOLOGIE"
        title={
          <>
            Méně sledování.
            <br />
            <span>Více soukromí.</span>
          </>
        }
        description="Aktuální implementace nepoužívá analytické ani reklamní cookies a nenačítá sledovací skripty třetích stran."
      />
      <section className="page-section">
        <Container>
          <div className="prose">
            <h2>Co aplikace ukládá ve vašem prohlížeči</h2>
            <p>
              Aplikace sama nezapisuje cookies, localStorage ani sessionStorage
              pro sledování návštěvníků. Stav mobilního menu a rozepsaný
              formulář zůstávají jen v paměti otevřené stránky. Po obnovení
              stránky se neuchovávají.
            </p>
            <h2>Písma a obsah</h2>
            <p>
              Písma jsou při sestavení stažena pomocí next/font a následně
              poskytována z webu. Při prohlížení se proto nenačítají přímo ze
              serverů Google Fonts. Na stránkách nejsou vložená videa, mapy ani
              sociální widgety.
            </p>
            <h2>Odeslání formuláře</h2>
            <p>
              Formulář předává údaje serveru až po odeslání. Antispamová ochrana
              pracuje na serveru a nevytváří sledovací cookie. Podrobnosti
              najdete na stránce{" "}
              <Link href="/ochrana-osobnich-udaju">ochrany osobních údajů</Link>
              .
            </p>
            <h2>Proč zde není cookie lišta</h2>
            <p>
              Nejsou zapnuté volitelné analytické ani reklamní technologie. Před
              jejich případným zavedením je nutné aktualizovat tento přehled a
              podle skutečného použití zajistit souhlas a blokování skriptů do
              jeho udělení.
            </p>
            <div className="notice">
              <strong>KONTROLA PŘED SPUŠTĚNÍM</strong>
              <p>
                Po nasazení ověřte také chování hostingu a případných
                doplňkových služeb. Toto prohlášení popisuje aplikaci v tomto
                repozitáři; nové integrace mohou vyžadovat jeho změnu.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
