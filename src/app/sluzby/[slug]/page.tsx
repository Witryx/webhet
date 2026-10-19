import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { services } from "@/content/services";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  Container,
  PageIntro,
  FAQAccordion,
  CTA,
  TextLink,
} from "@/components/ui";
import { Process } from "@/components/sections";
import { publishedProjects } from "@/content/projects";
import { ProjectGrid } from "@/components/project-grid";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return service
    ? pageMetadata(service.title, service.short, `/sluzby/${slug}`)
    : {};
}
export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const related = publishedProjects.filter(
    (project) =>
      service.icon !== "care" &&
      project.category ===
        (service.icon === "web"
          ? "Webové stránky"
          : service.icon === "shop"
            ? "E-shopy"
            : "Aplikace"),
  );
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Služby", href: "/sluzby" },
          { label: service.title, href: `/sluzby/${slug}` },
        ]}
      />
      <PageIntro
        eyebrow={service.label.toLocaleUpperCase("cs-CZ")}
        title={service.title}
        description={service.intro}
      />
      <section className="page-section">
        <Container>
          <div className="content-split">
            <div>
              <h2>Pro koho je řešení vhodné?</h2>
              <p>{service.ideal}</p>
              <div className="subsection">
                <h2>Jak na to půjdeme</h2>
                <p>{service.approach}</p>
                <TextLink href={`/kontakt?sluzba=${service.slug}`}>
                  Poptat {service.title.toLocaleLowerCase("cs-CZ")}
                </TextLink>
              </div>
            </div>
            <div className="content-card">
              <h2>Co společně připravíme</h2>
              <ul className="check-list">
                {service.deliverables.map((item) => (
                  <li key={item}>
                    <Check size={17} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="service-scope-note">
                Konkrétní výstupy, termíny a případné služby třetích stran budou
                vždy součástí nabídky.
              </p>
              <TextLink href="/cenik">Orientační ceny a rozsah</TextLink>
            </div>
          </div>
        </Container>
      </section>
      <Process />
      <section className="section">
        <Container>
          <div className="faq-layout">
            <div>
              <span className="eyebrow">
                <span />
                PRAKTICKÉ ODPOVĚDI
              </span>
              <h2>
                Co vás může
                <br />
                zajímat.
              </h2>
            </div>
            <FAQAccordion items={service.faq} />
          </div>
          {related.length > 0 && (
            <div className="subsection">
              <h2>Související projekty</h2>
              <ProjectGrid projects={related} />
            </div>
          )}
        </Container>
      </section>
      <CTA />
    </>
  );
}
