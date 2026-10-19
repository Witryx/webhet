import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, PageIntro, CTA } from "@/components/ui";
import { PortfolioEmpty } from "@/components/sections";
import { ProjectGrid } from "@/components/project-grid";
import { publishedProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Projekty a případové studie",
  "Prostor pro skutečné projekty WebHet. Případové studie představí zadání, zvolené řešení a ověřitelné výsledky se souhlasem klientů.",
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
        description="Každý projekt začíná jinou otázkou. Tady postupně najdete skutečná zadání, moje řešení a pohled na to, co jsme společně vytvořili."
      />
      <section className="page-section">
        <Container>
          {publishedProjects.length ? (
            <ProjectGrid projects={publishedProjects} filterable />
          ) : (
            <PortfolioEmpty />
          )}
          <div className="subsection">
            <h2>Co v případových studiích najdete</h2>
            <div className="process-grid">
              <article>
                <span className="eyebrow">01 / ZADÁNÍ</span>
                <h3>Skutečný kontext</h3>
                <p>
                  Co klient potřeboval vyřešit a jaké cíle jsme si stanovili.
                </p>
              </article>
              <article>
                <span className="eyebrow">02 / ŘEŠENÍ</span>
                <h3>Promyšlená rozhodnutí</h3>
                <p>Proč jsme vybrali danou strukturu, design a technologie.</p>
              </article>
              <article>
                <span className="eyebrow">03 / PROVEDENÍ</span>
                <h3>Konkrétní výstup</h3>
                <p>Ukázky rozhraní, důležité funkce a rozsah mé práce.</p>
              </article>
              <article>
                <span className="eyebrow">04 / VÝSLEDEK</span>
                <h3>Ověřitelné informace</h3>
                <p>Jen schválené podklady a doložitelné výsledky.</p>
              </article>
            </div>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
