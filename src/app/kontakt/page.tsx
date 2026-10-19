import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, PageIntro } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Kontakt — nezávazná poptávka",
  "Máte projekt na mysli? Napište mi o svém webu, e-shopu nebo aplikaci. Společně ujasníme cíle, rozsah a další postup.",
  "/kontakt",
);
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sluzba?: string; balicek?: string }>;
}) {
  const query = await searchParams;
  const types: Record<string, string> = {
    "webove-stranky": "web",
    "e-shopy": "eshop",
    "webove-aplikace": "app",
    "sprava-webu": "care",
  };
  const selectedPackage = ["Start", "Profi", "Business"].includes(
    query.balicek || "",
  )
    ? query.balicek
    : "";
  return (
    <>
      <Breadcrumbs items={[{ label: "Kontakt", href: "/kontakt" }]} />
      <PageIntro
        eyebrow="POJĎME SE SPOJIT"
        title={
          <>
            Váš další krok
            <br />
            <span>začíná zprávou.</span>
          </>
        }
        description="Máte jasné zadání, nebo zatím jen nápad? Napište mi. Společně zjistíme, co váš projekt potřebuje a jak mu mohu pomoci."
      />
      <section className="page-section">
        <Container>
          <div className="contact-layout">
            <aside className="contact-aside">
              <h2>
                Nejdřív si porozumíme.
                <br />
                Pak začneme tvořit.
              </h2>
              <p>
                Nemusíte mít hotové zadání. Stačí popsat, co děláte a kam se
                chcete posunout.
              </p>
              {site.email && (
                <a href={`mailto:${site.email}`} className="text-link">
                  {site.email} ↗
                </a>
              )}
              <ol className="contact-expectations">
                <li>
                  <span>01</span>Pročtu si vaši zprávu a ozvu se na uvedený
                  e-mail.
                </li>
                <li>
                  <span>02</span>Doplníme si detaily, cíle a očekávání.
                </li>
                <li>
                  <span>03</span>Navrhnu další postup a konkrétní nabídku.
                </li>
              </ol>
            </aside>
            <ContactForm
              defaultType={
                types[query.sluzba || ""] || (selectedPackage ? "web" : "")
              }
              defaultPackage={selectedPackage}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
