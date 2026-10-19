import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, PageIntro, CTA } from "@/components/ui";
import { PortfolioEmpty } from "@/components/sections";
import { ProjectGrid } from "@/components/project-grid";
import { publishedProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Projekty a případové studie",
  "Portfolio WebHet: MIDARI, Egyptsko Česká Reality, Petr Pavlát reality a FixPlace. Prohlédněte si skutečné weby, jejich náhledy a funkce.",
  "/projekty",
);
export default function ProjectsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Projekty", href: "/projekty" }]} />
      <PageIntro
        eyebrow="PROJEKTY"
        title={
          <>
            Práce, která má
            <br />
            <span>svůj příběh.</span>
          </>
        }
        description="E-shop, realitní prezentace i web lokálního servisu. Prohlédněte si výběr projektů, jejich rozhraní a funkce přímo na živých webech."
      />
      <section className="page-section">
        <Container>
          {publishedProjects.length ? (
            <ProjectGrid projects={publishedProjects} filterable />
          ) : (
            <PortfolioEmpty />
          )}
          <div className="subsection">
            <h2>Každý projekt má jinou úlohu</h2>
            <div className="process-grid">
              <article>
                <span className="eyebrow">01 / E-COMMERCE</span>
                <h3>Představit a prodávat</h3>
                <p>
                  Produkty, srovnání variant a cesta od výběru k objednávce.
                </p>
              </article>
              <article>
                <span className="eyebrow">02 / REALITY</span>
                <h3>Ukázat nabídku</h3>
                <p>
                  Nemovitosti, jejich detaily a srozumitelný postup spolupráce.
                </p>
              </article>
              <article>
                <span className="eyebrow">03 / OSOBNÍ ZNAČKA</span>
                <h3>Přiblížit člověka</h3>
                <p>
                  Osobní prezentace, nabídka služeb a prostor pro první kontakt.
                </p>
              </article>
              <article>
                <span className="eyebrow">04 / LOKÁLNÍ SLUŽBY</span>
                <h3>Usnadnit poptávku</h3>
                <p>
                  Přehled služeb a formulář, který se ptá na podstatné údaje.
                </p>
              </article>
            </div>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
