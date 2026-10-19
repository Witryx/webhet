export interface Service {
  slug: string;
  title: string;
  short: string;
  intro: string;
  icon: "web" | "shop" | "app" | "care";
  label: string;
  deliverables: string[];
  ideal: string;
  approach: string;
  faq: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "webove-stranky",
    title: "Webové stránky",
    icon: "web",
    label: "Váš prostor na internetu",
    short:
      "Od první návštěvy k dobrému dojmu. Přehledné a rychlé weby, které vystihnou vaše podnikání.",
    intro:
      "Web má návštěvníkovi rychle říct, co děláte, proč si vybrat právě vás a jak vás kontaktovat. Navrhnu pro vás přehlednou prezentaci s vlastní vizuální identitou a jasnou cestou k poptávce.",
    deliverables: [
      "Struktura obsahu podle potřeb návštěvníků",
      "Originální responzivní design",
      "Vývoj a přístupné ovládání",
      "Technické SEO a metadata",
      "Kontaktní formulář a pomoc se spuštěním",
    ],
    ideal:
      "Pro živnostníky, lokální služby a firmy, které potřebují srozumitelně představit nabídku. Od jedné vstupní stránky po rozsáhlejší firemní web.",
    approach:
      "Nejprve společně ujasníme cíle a obsah. Na návrhu ověříme strukturu a vizuální směr, poté web vyvinu a otestuji na telefonu i počítači.",
    faq: [
      {
        question: "Potřebuji mít připravené texty?",
        answer:
          "Pomůže, když máte alespoň základní podklady a představu o nabídce. Přípravu textů a fotografií domluvíme zvlášť podle vašich možností.",
      },
      {
        question: "Lze přidat správu obsahu?",
        answer:
          "Ano, vhodný redakční systém vybereme podle obsahu, který budete potřebovat měnit. Jeho rozsah a cena budou součástí nabídky.",
      },
    ],
  },
  {
    slug: "e-shopy",
    title: "E-shopy",
    icon: "shop",
    label: "Pohodlný nákup od začátku do konce",
    short:
      "Promyšlený nákupní zážitek. E-shopy s přehledným katalogem a napojením na vaše nástroje.",
    intro:
      "Dobrý e-shop usnadňuje výběr produktu i dokončení objednávky. Společně zvolíme platformu a funkce, které odpovídají vašemu sortimentu, provozu a rozpočtu.",
    deliverables: [
      "Návrh katalogu a produktových stránek",
      "Responzivní nákupní proces",
      "Nastavení dopravy a plateb podle dohody",
      "Napojení na sklad či další služby dle zadání",
      "Testování objednávky a předání obsluhy",
    ],
    ideal:
      "Pro prodejce, kteří začínají online nebo potřebují zlepšit stávající obchod. Vhodné řešení závisí na počtu produktů, variantách a požadovaných integracích.",
    approach:
      "Zmapujeme objednávku od výběru produktu po expedici. Potom vybereme platformu, připravíme vzhled a ověříme reálné nákupní scénáře v testovacím prostředí.",
    faq: [
      {
        question: "Kolik bude e-shop stát?",
        answer:
          "Cena je individuální. Záleží na platformě, sortimentu, migraci dat a integracích. Licence, platební brány a další služby naceníme odděleně.",
      },
      {
        question: "Převedete data ze stávajícího obchodu?",
        answer:
          "Možnosti migrace nejprve ověřím podle exportů a dostupného přístupu. Rozsah i způsob převodu si potvrdíme před zahájením.",
      },
    ],
  },
  {
    slug: "webove-aplikace",
    title: "Webové aplikace",
    icon: "app",
    label: "Méně rutiny. Více možností.",
    short:
      "Portály, interní systémy a aplikace na míru. Digitální nástroje, které zjednoduší vaši práci.",
    intro:
      "Když běžný web nestačí, pomůže aplikace navržená kolem vašeho způsobu práce. Od klientského portálu po interní nástroj pro práci s daty a každodenní agendou.",
    deliverables: [
      "Analýza pracovních postupů a specifikace",
      "Návrh rozhraní a uživatelských rolí",
      "Vývoj funkcí a integrací",
      "Testy důležitých uživatelských scénářů",
      "Dokumentace, předání a plán dalšího rozvoje",
    ],
    ideal:
      "Pro firmy, které opakovaně přepisují data, řeší agendu v několika nástrojích nebo chtějí nabídnout klientům vlastní online prostředí.",
    approach:
      "Začneme nejdůležitějším problémem a vymezíme první použitelnou verzi. Vývoj rozdělím do milníků, abyste průběžně viděli výsledek a mohli dávat zpětnou vazbu.",
    faq: [
      {
        question: "Umíte aplikaci propojit s jinou službou?",
        answer:
          "Pokud služba nabízí vhodné API nebo export dat, obvykle ano. Technické možnosti, oprávnění a náklady ověřím před naceněním.",
      },
      {
        question: "Jak se řeší další rozvoj?",
        answer:
          "Po předání se můžeme domluvit na samostatných úpravách nebo průběžné spolupráci. Podmínky podpory vždy stanovíme konkrétně.",
      },
    ],
  },
  {
    slug: "sprava-webu",
    title: "Správa a údržba",
    icon: "care",
    label: "Spuštěním to nekončí",
    short:
      "Aktualizace, dohled a další rozvoj. Aby váš web držel krok s vaším podnikáním.",
    intro:
      "Web se vyvíjí společně s vaším podnikáním. Pomohu s úpravami obsahu, aktualizacemi a technickou péčí v rozsahu, který si předem společně stanovíme.",
    deliverables: [
      "Úvodní kontrola stavu a přístupů",
      "Plán aktualizací podle použité technologie",
      "Dohodnuté zálohování a kontrola obnovy",
      "Monitoring podle sjednaného rozsahu",
      "Drobné úpravy a doporučení dalšího rozvoje",
    ],
    ideal:
      "Pro majitele webů, kteří chtějí mít technickou péči u jednoho člověka. Převzetí existujícího webu předchází kontrola technického stavu.",
    approach:
      "Prověřím technologii a odpovědnosti za hosting, doménu a zálohy. V nabídce pak stanovíme konkrétní úkony, kapacitu a reakční dobu.",
    faq: [
      {
        question: "Je hosting součástí správy?",
        answer:
          "Ne automaticky. Odpovědnost za hosting, doménu a poplatky třetím stranám si výslovně určíme v nabídce.",
      },
      {
        question: "Převezmete i web od jiného dodavatele?",
        answer:
          "Možné to je po technické kontrole a ověření potřebných přístupů. Podle výsledku navrhnu vhodný postup a rozsah péče.",
      },
    ],
  },
];
