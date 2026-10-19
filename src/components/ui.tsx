import Link from "next/link";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { pricing } from "@/content/pricing";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container ${className}`}>{children}</div>;
}

export function Button({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">
          <span />
          {eyebrow}
        </span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
}) {
  return (
    <section className="page-intro">
      <Container>
        <span className="eyebrow">
          <span />
          {eyebrow}
        </span>
        <h1>{title}</h1>
        <p>{description}</p>
      </Container>
    </section>
  );
}

export function PricingCards() {
  return (
    <div className="pricing-grid">
      {pricing.map((plan) => (
        <article
          key={plan.name}
          className={`pricing-card ${plan.featured ? "featured" : ""}`}
        >
          <div className="plan-top">
            <span className="plan-name">{plan.name}</span>
            {plan.featured && <span className="badge">Pro firemní web</span>}
          </div>
          <p>{plan.description}</p>
          <div className="price">
            <span>od</span> {new Intl.NumberFormat("cs-CZ").format(plan.price)}{" "}
            <small>Kč</small>
          </div>
          <span className="plan-audience">{plan.audience}</span>
          <ul>
            {plan.features.map((feature) => (
              <li key={feature}>
                <Check size={16} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <Button
            href={`/kontakt?balicek=${plan.name}`}
            secondary={!plan.featured}
          >
            Probrat variantu {plan.name}
          </Button>
        </article>
      ))}
    </div>
  );
}

export function FAQAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <details key={item.question}>
          <summary>
            <span className="faq-number">{String(i + 1).padStart(2, "0")}</span>
            <span>{item.question}</span>
            <span className="faq-plus" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CTA() {
  return (
    <section className="cta-section">
      <Container>
        <div className="cta-panel">
          <div>
            <span className="eyebrow">
              <span />
              DALŠÍ KROK JE NA VÁS
            </span>
            <h2>
              Máte projekt na mysli?
              <br />
              <span>Pojďme ho společně posunout dál.</span>
            </h2>
            <p>Stačí nápad. Společně najdeme cestu k webu, který dává smysl.</p>
          </div>
          <Button href="/kontakt">Napsat zprávu</Button>
          <span className="cta-orbit" aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
