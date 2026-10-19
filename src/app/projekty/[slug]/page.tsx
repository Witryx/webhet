import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { publishedProjects } from "@/content/projects";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, PageIntro, CTA } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return publishedProjects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = publishedProjects.find((item) => item.slug === slug);
  return project
    ? pageMetadata(project.title, project.summary, `/projekty/${slug}`)
    : {};
}
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = publishedProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Projekty", href: "/projekty" },
          { label: project.title, href: `/projekty/${slug}` },
        ]}
      />
      <PageIntro
        eyebrow={project.category.toLocaleUpperCase("cs-CZ")}
        title={project.title}
        description={project.summary}
      />
      <section className="page-section">
        <Container>
          <Image
            {...project.cover}
            alt={project.cover.alt}
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="project-cover"
          />
          <div className="project-details">
            <div>
              {project.challenge && (
                <>
                  <h2>Zadání a výzva</h2>
                  <p>{project.challenge}</p>
                </>
              )}
              {project.goals.length > 0 && (
                <>
                  <h2>Cíle projektu</h2>
                  <ul className="check-list">
                    {project.goals.map((goal) => (
                      <li key={goal}>
                        <Check size={17} aria-hidden="true" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <div>
                <h2>O webu</h2>
                <p>{project.solution}</p>
                <ul className="check-list">
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <Check size={17} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {project.results.length > 0 && (
                <div className="subsection">
                  <h2>Výsledek</h2>
                  <ul className="check-list">
                    {project.results.map((result) => (
                      <li key={result}>
                        <Check size={17} aria-hidden="true" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <aside>
              {project.role && (
                <>
                  <h2>Moje role</h2>
                  <p>{project.role}</p>
                </>
              )}
              {project.client && (
                <>
                  <h2>Klient</h2>
                  <p>{project.client}</p>
                </>
              )}
              {project.industry && (
                <>
                  <h2>Obor</h2>
                  <p>{project.industry}</p>
                </>
              )}
              {project.tech.length > 0 && (
                <>
                  <h2>Technologie</h2>
                  <p>{project.tech.join(" · ")}</p>
                </>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary"
                >
                  Navštívit web ↗
                </a>
              )}
            </aside>
          </div>
          <div className="project-gallery">
            {project.gallery.map((picture) => (
              <Image
                key={picture.src}
                {...picture}
                alt={picture.alt}
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            ))}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
