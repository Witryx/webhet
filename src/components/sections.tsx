import Link from "next/link";
import {
  ArrowUpRight,
  Globe2,
  ShoppingBag,
  PanelsTopLeft,
  Wrench,
  MoveUpRight,
  Sparkles,
  MessageSquare,
  Gauge,
  HeartHandshake,
} from "lucide-react";
import { services } from "@/content/services";
import { processSteps } from "@/content/process";
import { publishedProjects } from "@/content/projects";
import { Container, SectionHeading, TextLink } from "./ui";
import { ProjectGrid } from "./project-grid";

const icons = {
  web: Globe2,
  shop: ShoppingBag,
  app: PanelsTopLeft,
  care: Wrench,
};

export function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((service, i) => {
        const Icon = icons[service.icon];
        return (
          <Link
            href={`/sluzby/${service.slug}`}
            key={service.slug}
            className="service-card"
          >
            <div className="service-card-top">
              <span className="service-icon">
                <Icon size={24} strokeWidth={1.6} />
              </span>
              <span className="card-index">0{i + 1}</span>
            </div>
            <h3>{service.title}</h3>
            <p>{service.short}</p>
            <span className="card-link">
              Více o službě
              <ArrowUpRight size={17} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function Process() {
  return (
    <section className="section process-section">
      <Container>
        <SectionHeading
          eyebrow="JAK SPOLUPRÁCE PROBÍHÁ"
          title={
            <>
              Od prvního nápadu
              <br />
              po poslední detail.
            </>
          }
          description="Srozumitelný postup. Přímá komunikace. V každém kroku víte, na čem jsme."
        />
        <div className="process-grid">
          {processSteps.map((step, i) => (
            <article className="process-step" key={step.title}>
              <div className="step-line">
                <span>0{i + 1}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function WhyWebHet() {
  const reasons = [
    {
      icon: MessageSquare,
      title: "Spolupráce napřímo",
      text: "Od prvního hovoru po spuštění komunikujete přímo se mnou. Bez zbytečných mezičlánků.",
    },
    {
      icon: Sparkles,
      title: "Design s důvodem",
      text: "Každý prvek má své místo. Vzhled vychází z vašeho obsahu, cílů a potřeb návštěvníků.",
    },
    {
      icon: Gauge,
      title: "Rychlost a přístupnost",
      text: "Lehký kód, responzivní zobrazení a přístupné ovládání jsou součástí vývoje.",
    },
    {
      icon: HeartHandshake,
      title: "Péče i po spuštění",
      text: "Předáním webu můžeme pokračovat. Další úpravy a správu domluvíme podle vašich potřeb.",
    },
  ];
  return (
    <section className="section why-section">
      <Container>
        <div className="why-layout">
          <div>
            <span className="eyebrow">
              <span />
              PROČ WEBHET
            </span>
            <h2>
              Váš projekt.
              <br />
              <span className="muted-heading">
                Moje osobní
                <br />
                zodpovědnost.
              </span>
            </h2>
            <p>
              Věřím v promyšlené weby a férovou spolupráci. Dobrý výsledek
              začíná tím, že si rozumíme.
            </p>
            <TextLink href="/o-mne">Více o mém přístupu</TextLink>
          </div>
          <div className="reasons-grid">
            {reasons.map((reason) => (
              <article key={reason.title}>
                <reason.icon size={23} strokeWidth={1.5} aria-hidden="true" />
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PortfolioEmpty() {
  return (
    <div className="portfolio-empty">
      <div className="empty-art" aria-hidden="true">
        <span />
        <span />
        <span />
        <MoveUpRight size={30} />
      </div>
      <div>
        <span className="eyebrow">PROSTOR PRO NOVÉ PŘÍBĚHY</span>
        <h3>
          Dobrá práce si zaslouží
          <br />
          vlastní příběh.
        </h3>
        <p>
          První případové studie připravuji.
          <br />
          Chcete být mezi dalšími projekty?
        </p>
        <TextLink href="/kontakt">Pojďme vytvořit něco dobrého</TextLink>
      </div>
      <span className="empty-corner" aria-hidden="true">
        ↗
      </span>
    </div>
  );
}

export function SelectedProjects() {
  return (
    <section className="section projects-section">
      <Container>
        <SectionHeading
          eyebrow="PROJEKTY"
          title={
            <>
              Za každým webem
              <br />
              je konkrétní záměr.
            </>
          }
        >
          <TextLink href="/projekty">Prohlédnout projekty</TextLink>
        </SectionHeading>
        {publishedProjects.length ? (
          <ProjectGrid projects={publishedProjects.slice(0, 4)} />
        ) : (
          <PortfolioEmpty />
        )}
      </Container>
    </section>
  );
}
