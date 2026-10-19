import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, PageIntro, CTA, TextLink } from "@/components/ui";
import { ServiceGrid, Process } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Služby — webdesign a vývoj",
  "Webové stránky, e-shopy, aplikace a správa webu. Najděte digitální řešení pro své podnikání a seznamte se s postupem spolupráce.",
  "/sluzby",
);
export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Služby", href: "/sluzby" }]} />
      <PageIntro
        eyebrow="SLUŽBY"
        title={
          <>
            Od prezentace
            <br />k <span>novým možnostem.</span>
          </>
        }
        description="Potřebujete představit své služby, prodávat online nebo zjednodušit práci? Navrhnu řešení, které vychází z vašich cílů a dává smysl i technicky."
      />
      <section className="page-section">
        <Container>
          <ServiceGrid />
          <div className="custom-pricing">
            <div>
              <h3>Nejste si jistí, kde začít?</h3>
              <p>
                Popište, co potřebujete vyřešit. Vhodné řešení vybereme
                společně.
              </p>
            </div>
            <TextLink href="/kontakt">Probrat možnosti</TextLink>
          </div>
        </Container>
      </section>
      <Process />
      <section className="section">
        <Container>
          <div className="content-split">
            <div>
              <h2>
                Co je součástí
                <br />
                dobré spolupráce?
              </h2>
              <p>
                Ještě před zahájením budete znát rozsah, cenu a harmonogram. V
                průběhu práce uvidíte výsledek a dostanete prostor pro zpětnou
                vazbu.
              </p>
            </div>
            <div className="content-card">
              <h2>
                Řešení podle potřeb,
                <br />
                ne podle šablony.
              </h2>
              <p>
                Technologii volím podle funkcí, obsahu a budoucí správy.
                Licence, hosting a další externí náklady vymezím samostatně v
                nabídce.
              </p>
              <TextLink href="/cenik">Podívat se na orientační ceny</TextLink>
            </div>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
