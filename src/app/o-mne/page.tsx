import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, PageIntro, CTA } from "@/components/ui";
import { WhyWebHet } from "@/components/sections";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "O mně a mém přístupu",
  "WebHet je osobní studio pro webdesign a vývoj. Přímá komunikace, promyšlené řešení a jasná očekávání od prvního rozhovoru po předání webu.",
  "/o-mne",
);
export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "O mně", href: "/o-mne" }]} />
      <PageIntro
        eyebrow="O WEBHET"
        title={
          <>
            Za každým dobrým webem
            <br />
            je <span>dobrá spolupráce.</span>
          </>
        }
        description="WebHet je moje osobní studio pro webdesign a vývoj. Propojuji vizuální návrh s technickým řešením, abyste měli jednoho partnera od prvního nápadu po spuštění."
      />
      <section className="page-section">
        <Container>
          <div className="content-split">
            {site.founder.photo ? (
              <Image
                src={site.founder.photo}
                alt={site.founder.name || "Autor studia WebHet"}
                width={600}
                height={600}
                className="project-cover"
              />
            ) : (
              <div
                className="about-monogram"
                aria-label="Grafický monogram WebHet"
              >
                <span>
                  w<span>.</span>
                </span>
                <p>OSOBNÍ STUDIO. PROMYŠLENÉ WEBY.</p>
              </div>
            )}
            <div className="about-copy">
              <span className="eyebrow">
                <span />
                JEDEN ČLOVĚK. SOUVISLÝ POHLED.
              </span>
              <h2>{site.founder.name || "Od návrhu až po kód."}</h2>
              <p>
                {site.founder.bio ||
                  "Dobrý web pro mě začíná pochopením toho, co potřebujete. Proto se ptám na vaše zákazníky, nabídku a způsob práce dřív, než začnu řešit barvy nebo technologie."}
              </p>
              <p>
                Mým cílem je srozumitelná spolupráce: konkrétní zadání, průběžná
                zpětná vazba a výstup, který budete umět používat. Když některá
                funkce vašemu cíli nepomůže, řeknu vám to.
              </p>
              {site.founder.location && <p>{site.founder.location}</p>}
              {site.founder.experience && <p>{site.founder.experience}</p>}
              {!site.founder.name && (
                <p className="owner-placeholder">
                  DOPLNIT PŘED SPUŠTĚNÍM: jméno zakladatele a schválený osobní
                  profil.
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>
      <WhyWebHet />
      <CTA />
    </>
  );
}
