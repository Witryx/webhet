import {
  ArrowDown,
  Check,
  PenTool,
  ShieldCheck,
  HeartHandshake,
  Building2,
  Hammer,
  Utensils,
  BriefcaseBusiness,
  Blocks,
  Code2,
} from "lucide-react";
import {
  Container,
  Button,
  SectionHeading,
  PricingCards,
  FAQAccordion,
  CTA,
  TextLink,
} from "@/components/ui";
import { HeroArt } from "@/components/hero-art";
import {
  ServiceGrid,
  Process,
  WhyWebHet,
  SelectedProjects,
} from "@/components/sections";
import { faqs } from "@/content/faq";
import { priceNote } from "@/content/pricing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Weby, které mají smysl.",
  "Tvorba webových stránek, e-shopů a aplikací na míru. Promyšlený webdesign, osobní přístup a péče i po spuštění. Seznamte se s WebHet.",
  "/",
);

export default function Home() {
  const industries = [
    { title: "Reality", Icon: Building2 },
    { title: "Řemesla", Icon: Hammer },
    { title: "Gastronomie", Icon: Utensils },
    { title: "Služby", Icon: BriefcaseBusiness },
    { title: "Menší firmy", Icon: Blocks },
    { title: "Webové aplikace", Icon: Code2 },
  ];
  return (
    <>
      <section className="hero">
        <Container>
          <div className="hero-layout">
            <div className="hero-copy">
              <span className="eyebrow">
                <span />
                WEB DESIGN & DEVELOPMENT
              </span>
              <h1>
                Weby, které
                <br />
                mají <span className="blue">smysl.</span>
              </h1>
              <p>
                Tvořím moderní webové stránky, e-shopy a aplikace, které dobře
                vypadají, rychle fungují a pomáhají vašemu podnikání růst.
              </p>
              <div className="hero-actions">
                <Button href="/kontakt">Chci nezávaznou nabídku</Button>
                <Button href="/projekty" secondary>
                  Ukázky práce
                </Button>
              </div>
              <div className="hero-note">
                <i />
                Váš nápad. Osobní přístup. Smysluplný výsledek.
              </div>
            </div>
            <HeroArt />
          </div>
          <div className="hero-benefits">
            <span>
              <PenTool size={16} aria-hidden="true" />
              Moderní design na míru
            </span>
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              Rychlost a bezpečnost
            </span>
            <span>
              <HeartHandshake size={16} aria-hidden="true" />
              Péče i po spuštění
            </span>
            <a
              href="#sluzby"
              aria-label="Pokračovat na služby"
              className="hero-scroll"
            >
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="industry-strip">
            <span>PRO VAŠE PODNIKÁNÍ</span>
            <div className="industries">
              {industries.map(({ title, Icon }) => (
                <span key={title}>
                  <Icon strokeWidth={1.4} aria-hidden="true" />
                  {title}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="section" id="sluzby">
        <Container>
          <SectionHeading
            eyebrow="CO PRO VÁS MOHU UDĚLAT"
            title={
              <>
                Dobré nápady si zaslouží
                <br />
                dobré digitální řešení.
              </>
            }
          >
            <TextLink href="/sluzby">Prohlédnout všechny služby</TextLink>
          </SectionHeading>
          <ServiceGrid />
          <p className="service-footnote">
            <Check size={13} aria-hidden="true" /> Každý projekt začíná
            pochopením vašeho podnikání.
          </p>
        </Container>
      </section>
      <SelectedProjects />
      <Process />
      <WhyWebHet />
      <section className="section pricing-section">
        <Container>
          <SectionHeading
            eyebrow="INVESTICE DO VAŠEHO WEBU"
            title={
              <>
                Jasný základ.
                <br />
                Žádné hádání ceny.
              </>
            }
            description="Vyberte si výchozí bod. Konkrétní řešení a rozsah přizpůsobím vašemu projektu."
          >
            <TextLink href="/cenik">Podrobný ceník</TextLink>
          </SectionHeading>
          <PricingCards />
          <p className="price-note">{priceNote}</p>
          <div className="custom-pricing">
            <div>
              <h3>E-shop, aplikace nebo dlouhodobá péče?</h3>
              <p>
                Pro specifické funkce a správu webu připravím individuální
                nabídku.
              </p>
            </div>
            <TextLink href="/kontakt">Probrat váš projekt</TextLink>
          </div>
        </Container>
      </section>
      <section className="section faq-section">
        <Container>
          <div className="faq-layout">
            <div>
              <span className="eyebrow">
                <span />
                NEŽ SE DO TOHO PUSTÍME
              </span>
              <h2>
                Možná vás
                <br />
                ještě zajímá.
              </h2>
              <p>
                Několik odpovědí pro snazší začátek. Zbytek můžeme probrat
                osobně.
              </p>
              <TextLink href="/kontakt">Mám další otázku</TextLink>
            </div>
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
