import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, PageIntro } from "@/components/ui";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata(
    "Ochrana osobních údajů",
    "Informace o údajích z kontaktního formuláře, účelu zpracování a technickém zajištění webu. Návrh k doplnění před spuštěním.",
    "/ochrana-osobnich-udaju",
  ),
  robots: { index: false, follow: true },
};
export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Ochrana osobních údajů", href: "/ochrana-osobnich-udaju" },
        ]}
      />
      <PageIntro
        eyebrow="OSOBNÍ ÚDAJE"
        title="Soukromí má své místo."
        description="Přehled údajů používaných při vyřizování poptávky a technickém provozu webu."
      />
      <section className="page-section">
        <Container>
          <div className="prose">
            <div className="notice">
              <strong>DOPLNIT PŘED SPUŠTĚNÍM</strong>
              <p>
                Toto je pracovní návrh, nikoli dokončená právní informace. Před
                ostrým provozem je nutné doplnit správce, kontakt, dobu
                uchování, skutečné dodavatele a potvrdit právní základ. Formulář
                připojte k produkčnímu odesílání až po tomto doplnění.
              </p>
            </div>
            <h2>1. Kdo bude správcem údajů</h2>
            <p>
              {site.business.name ||
                "DOPLNIT PŘED SPUŠTĚNÍM: jméno nebo obchodní firma správce."}
            </p>
            <p>
              IČO: {site.business.registrationId || "DOPLNIT PŘED SPUŠTĚNÍM"}
              <br />
              Sídlo: {site.business.address || "DOPLNIT PŘED SPUŠTĚNÍM"}
              <br />
              Kontakt: {site.email || "DOPLNIT PŘED SPUŠTĚNÍM"}
            </p>
            <h2>2. Jaké údaje formulář používá</h2>
            <p>
              Jméno, e-mail, případně telefon, typ projektu, orientační
              rozpočet, požadovaný termín a obsah zprávy. Povinné údaje slouží k
              odpovědi na poptávku; doplňující údaje pomáhají upřesnit zadání.
              Do zprávy prosím nevkládejte citlivé údaje.
            </p>
            <h2>3. Účel a právní základ</h2>
            <p>
              Poptávkové údaje slouží k vyřízení vašeho dotazu a případné
              přípravě nabídky či smlouvy. U žádosti o nabídku připadá v úvahu
              provedení opatření před uzavřením smlouvy na vaši žádost.
              Potvrzení u formuláře zaznamenává seznámení s touto informací a
              není souhlasem s marketingem. Přesný právní základ a související
              informační povinnost potvrdí správce před spuštěním.
            </p>
            <h2>4. Technické zajištění a příjemci</h2>
            <p>
              Implementace používá Resend pro předání poptávky e-mailem, pokud
              jej provozovatel nakonfiguruje. Zamýšleným hostingem je Vercel.
              Volitelný Upstash Redis slouží ke sdílenému omezení počtu
              požadavků; ukládá hash síťového identifikátoru a čítač s krátkou
              expirací, nikoli obsah zprávy.
            </p>
            <p>
              DOPLNIT PŘED SPUŠTĚNÍM: potvrzení skutečně zapojených
              zpracovatelů, smluv, regionů zpracování a případných záruk pro
              předávání mimo EHP. Web nemá zapojenou analytiku ani reklamní
              sledování.
            </p>
            <h2>5. Uchování a zabezpečení</h2>
            <p>
              {site.business.retention ||
                "DOPLNIT PŘED SPUŠTĚNÍM: konkrétní dobu uchování poptávkových zpráv, pravidla výmazu a případné zákonné povinnosti."}{" "}
              Aplikace neukládá poptávky do vlastní databáze ani nevypisuje
              jejich obsah do logů. Poptávka se při zapnutém odesílání zpracuje
              v e-mailové službě a doručí do schránky provozovatele. Přístup a
              výmaz je nutné řešit také u těchto služeb.
            </p>
            <h2>6. Vaše práva</h2>
            <p>
              V rozsahu platných pravidel můžete požádat o přístup, opravu,
              výmaz či omezení zpracování a případně o přenositelnost údajů nebo
              vznést námitku. Žádosti se budou podávat na výše uvedeném kontaktu
              správce. Máte také právo obrátit se na Úřad pro ochranu osobních
              údajů. Poučení je nutné před spuštěním ověřit podle skutečného
              způsobu zpracování.
            </p>
            <h2>7. Technická ochrana formuláře</h2>
            <p>
              Formulář používá skryté antispamové pole a omezení počtu
              požadavků. Pro tento účel není vytvářen sledovací profil
              návštěvníka. Provozní logy hostingu mohou obsahovat síťové
              informace; jejich skutečný rozsah a dobu uchování musí
              provozovatel ověřit.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
