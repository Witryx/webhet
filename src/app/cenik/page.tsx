import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  Container,
  PageIntro,
  PricingCards,
  CTA,
  TextLink,
  FAQAccordion,
} from "@/components/ui";
import { comparison, pricing, priceNote } from "@/content/pricing";
import { faqs } from "@/content/faq";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Ceník tvorby webových stránek",
  "Orientační ceny webových stránek od 9 990 Kč. Porovnejte varianty Start, Profi a Business, rozsah služeb a možnosti individuální nabídky.",
  "/cenik",
);
export default function PricingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Ceník", href: "/cenik" }]} />
      <PageIntro
        eyebrow="CENÍK"
        title={
          <>
            Web je investice.
            <br />
            <span>Mějte v ní jasno.</span>
          </>
        }
        description="Tři výchozí varianty pro různé potřeby. Před zahájením dostanete konkrétní nabídku se specifikací, termíny a jasně vymezenou cenou."
      />
      <section className="page-section">
        <Container>
          <PricingCards />
          <p className="price-note">{priceNote}</p>
          <div className="comparison-wrapper">
            <h2>Co jednotlivé varianty zahrnují</h2>
            <table className="comparison">
              <caption className="sr-only">
                Porovnání rozsahu balíčků Start, Profi a Business
              </caption>
              <thead>
                <tr>
                  <th scope="col">Součást řešení</th>
                  {pricing.map((plan) => (
                    <th key={plan.name} scope="col">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="subsection content-split">
            <div className="content-card">
              <h2>E-shopy a webové aplikace</h2>
              <p>
                Individuální nabídka podle funkcí, množství dat, integrací a
                nároků na provoz. Začneme vymezením první užitečné verze.
              </p>
              <TextLink href="/kontakt">Popsat své zadání</TextLink>
            </div>
            <div className="content-card">
              <h2>Správa a údržba</h2>
              <p>
                Individuální nabídka. Rozsah aktualizací, monitoring, zálohy,
                zahrnutou kapacitu i reakční dobu si stanovíme před zahájením
                péče.
              </p>
              <TextLink href="/sluzby/sprava-webu">Více o správě webu</TextLink>
            </div>
          </div>
          <div className="subsection prose">
            <h2>Co je dobré vědět předem</h2>
            <p>
              Uvedené částky nejsou závaznou cenovou nabídkou. Konečná cena
              závisí na rozsahu a zadání. Hosting, doména, placené licence,
              tvorba textů, fotografie a externí služby nejsou automaticky
              zahrnuté.
            </p>
            <p>
              Počet kol úprav, obsah školení, odpovědnosti při předání a
              navazující podporu určíme v konkrétní nabídce. Pravidelná péče se
              sjednává zvlášť.
            </p>
            <p>
              {site.business.vatStatus ||
                "DOPLNIT PŘED SPUŠTĚNÍM: plátcovství DPH a způsob uvádění konečných cen."}
            </p>
          </div>
        </Container>
      </section>
      <section className="section faq-section">
        <Container>
          <div className="faq-layout">
            <div>
              <span className="eyebrow">
                <span />
                JEŠTĚ PÁR ODPOVĚDÍ
              </span>
              <h2>
                Cena je začátek
                <br />
                rozhovoru.
              </h2>
            </div>
            <FAQAccordion items={faqs.slice(0, 4)} />
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
