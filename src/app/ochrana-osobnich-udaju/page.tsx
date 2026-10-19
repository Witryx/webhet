import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, PageIntro } from "@/components/ui";
import { site } from "@/config/site";
import { getPrivacyProviders, privacy } from "@/content/privacy";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Ochrana osobních údajů",
  "Jak Petr Hetzendorf (WebHet) zpracovává údaje při vyřizování poptávek a provozu webu. Účely, doba uchování, poskytovatelé služeb a vaše práva.",
  "/ochrana-osobnich-udaju",
);

export default function PrivacyPage() {
  const providers = getPrivacyProviders();
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Ochrana osobních údajů", href: "/ochrana-osobnich-udaju" },
        ]}
      />
      <PageIntro
        eyebrow="OSOBNÍ ÚDAJE"
        title="Soukromí má své místo."
        description="Co se děje s údaji, které mi svěříte při poptávce, e-mailové komunikaci nebo návštěvě webu."
      />
      <section className="page-section">
        <Container>
          <div className="prose">
            <p className="legal-updated">Aktualizováno {privacy.updated}</p>
            <h2>1. Kdo za zpracování odpovídá</h2>
            <p>
              Správcem osobních údajů je <strong>{site.business.name}</strong>,
              IČO {site.business.registrationId}, se sídlem{" "}
              {site.business.address}, vystupující pod značkou WebHet.
            </p>
            <p>
              E-mail: <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              Telefon: <a href={site.phone.href}>{site.phone.display}</a>. Na
              tyto kontakty se můžete obrátit také s žádostí týkající se vašich
              osobních údajů.
            </p>
            <h2>2. Jaké údaje používám a proč</h2>
            <p>
              Při poptávce zpracovávám jméno, e-mail, případně telefon, typ
              projektu, orientační rozpočet, požadovaný termín a obsah zprávy.
              Používám je k odpovědi a přípravě nabídky. Povinná pole jsou
              označená; ostatní nemusíte vyplňovat. Bez kontaktu na vás však
              nemohu odpovědět.
            </p>
            <p>
              U jednání o zakázce na vaši žádost je právním základem provedení
              opatření před uzavřením smlouvy podle čl. 6 odst. 1 písm. b) GDPR.
              Běžné dotazy vyřizuji na základě oprávněného zájmu na komunikaci
              podle čl. 6 odst. 1 písm. f) GDPR. Údaje nepoužívám k rozesílání
              newsletterů ani reklamních nabídek.
            </p>
            <p>
              Potvrzení u formuláře znamená seznámení s těmito informacemi,
              nikoli souhlas s marketingem. Do zprávy prosím nevkládejte citlivé
              údaje ani údaje, které k vyřízení poptávky nejsou potřeba.
            </p>
            <h2>3. Provoz a ochrana webu</h2>
            <p>
              Hosting může zpracovávat síťovou adresu, čas požadavku a technické
              údaje prohlížeče pro doručení stránek, diagnostiku a zabezpečení.
              Právním základem je oprávněný zájem na funkčním a bezpečném webu
              podle čl. 6 odst. 1 písm. f) GDPR.
            </p>
            <p>
              Formulář chráním antispamovým polem a omezením počtu požadavků.
              Čítač používá hash síťového identifikátoru; jde o pseudonymizaci,
              ne záruku anonymizace. Nevytvářím uživatelské profily a údaje
              nepoužívám k automatizovanému rozhodování s právními či obdobně
              významnými účinky.
            </p>
            <h2>4. Jak dlouho údaje uchovávám</h2>
            <p>{site.business.retention}</p>
            <p>
              Čítač ochrany formuláře se automaticky odstraňuje nejpozději 15
              minut po posledním pokusu v daném časovém okně. Aplikace nevytváří
              databázi poptávek a obsah zpráv nevypisuje do logů. Zprávy se
              uchovávají ve schránce a podle použité služby také v historii
              doručování. Případné technické zálohy a provozní záznamy
              poskytovatelů mají vlastní retenční cykly.
            </p>
            <h2>5. Kdo může údaje zpracovávat</h2>
            <p>
              K údajům má přístup provozovatel a v nezbytném rozsahu
              poskytovatelé služeb použitých pro daný způsob kontaktu a aktuální
              provoz:
            </p>
            <ul>
              {providers.map((provider) => (
                <li key={provider.name}>
                  <strong>{provider.name}</strong> — {provider.purpose}{" "}
                  <a
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Informace poskytovatele
                  </a>
                  .
                </li>
              ))}
            </ul>
            <p>
              Údaje mohou obdržet také oprávněné orgány veřejné moci, pokud je
              to nutné ke splnění zákonné povinnosti.
            </p>
            <h2>6. Zpracování mimo EHP</h2>
            <p>
              Někteří poskytovatelé mohou údaje zpracovávat i mimo Evropský
              hospodářský prostor, zejména v USA. Informace o místech zpracování
              a mechanismech ochrany najdete v odkazovaných podmínkách.
              Předávání musí mít odpovídající právní záruky podle GDPR,
              například rozhodnutí o odpovídající ochraně nebo standardní
              smluvní doložky. Na kontaktním e-mailu můžete požádat o bližší
              informace o poskytovatelích zapojených do vyřízení vaší zprávy a
              příslušných zárukách.
            </p>
            <h2>7. Jaká máte práva</h2>
            <p>
              Za podmínek GDPR můžete požadovat přístup ke svým údajům, jejich
              opravu, výmaz nebo omezení zpracování. U údajů zpracovávaných
              automatizovaně na základě smlouvy máte za příslušných podmínek
              také právo na přenositelnost. Proti zpracování na základě
              oprávněného zájmu můžete vznést námitku.
            </p>
            <p>
              Žádost pošlete na{" "}
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(privacy.rightsContactSubject)}`}
              >
                {site.email}
              </a>
              . Odpovím bez zbytečného odkladu, zpravidla do jednoho měsíce. Při
              oprávněných pochybnostech mohu přiměřeně ověřit vaši totožnost. U
              složitých nebo četných žádostí lze lhůtu v mezích GDPR prodloužit;
              o důvodu a prodloužení vás informuji.
            </p>
            <p>
              Máte právo podat stížnost u{" "}
              <a
                href="https://uoou.gov.cz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Úřadu pro ochranu osobních údajů
              </a>
              , Pplk. Sochora 27, 170 00 Praha 7.
            </p>
            <h2>8. Cookies</h2>
            <p>
              Aplikace nemá zapojenou reklamní ani analytickou službu.
              Podrobnosti najdete na stránce{" "}
              <Link href="/cookies">Cookies</Link>. Při změně funkcí nebo
              zapojených služeb tyto informace aktualizuji.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
