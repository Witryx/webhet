export type ProjectCategory = "Webové stránky" | "E-shopy" | "Aplikace";
export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}
export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  cover: ProjectImage;
  role: string;
  client?: string;
  industry?: string;
  challenge: string;
  goals: string[];
  solution: string;
  features: string[];
  tech: string[];
  results: string[];
  gallery: ProjectImage[];
  liveUrl?: string;
  permissionToPublish: boolean;
}
// Portfolio links supplied and approved by Petr Hetzendorf on 2026-10-19.
// Descriptions reflect public pages, not an invented client brief or metrics.
// Role, technical details and outcomes can be added when supplied by the owner.
export const projects: Project[] = [
  {
    slug: "midari",
    title: "MIDARI",
    category: "E-shopy",
    summary:
      "E-shop s japonskou matchou. Produktové varianty, průvodce výběrem a přípravou v jednom vizuálně uceleném prostoru.",
    cover: {
      src: "/images/projects/midari.jpg",
      alt: "Úvodní stránka e-shopu MIDARI s prezentací japonské matchy",
      width: 1440,
      height: 1000,
    },
    role: "",
    client: "MIDARI",
    industry: "Matcha a e-commerce",
    challenge: "",
    goals: [],
    solution:
      "Produktová prezentace rozlišuje matchu podle způsobu použití. Vedle katalogu nabízí srovnání variant, návody na přípravu a odpovědi na praktické otázky. Návštěvník tak může přejít od seznámení s produktem k výběru a nákupu.",
    features: [
      "Katalog a detail produktových variant",
      "Průvodce výběrem matchy",
      "Návody na přípravu a produktové FAQ",
      "Nákupní košík a objednávkový proces",
    ],
    tech: ["Shopify"],
    results: [],
    gallery: [],
    liveUrl: "https://midari.cz/",
    permissionToPublish: true,
  },
  {
    slug: "egyptskoceska-reality",
    title: "Egyptsko Česká Reality",
    category: "Webové stránky",
    summary:
      "Realitní prezentace zaměřená na nemovitosti v Egyptě. Nabídky, informace o spolupráci a přímý kontakt na jednom místě.",
    cover: {
      src: "/images/projects/egyptskoceska-reality.jpg",
      alt: "Úvodní stránka Egyptsko Česká Reality s nabídkou nemovitostí v Egyptě",
      width: 1440,
      height: 1000,
    },
    role: "",
    client: "Egyptsko Česká Reality",
    industry: "Reality",
    challenge: "",
    goals: [],
    solution:
      "Web propojuje nabídku nemovitostí s vysvětlením jednotlivých kroků spolupráce. Návštěvník má k dispozici přehled nabídek, jejich detaily a možnost kontaktovat realitní kancelář e-mailem, telefonem nebo přes WhatsApp.",
    features: [
      "Přehled nemovitostí a detail nabídky",
      "Filtrování podle cenového rozpětí",
      "Česká, anglická a německá jazyková volba",
      "Kontaktní odkazy včetně WhatsApp",
    ],
    tech: [],
    results: [],
    gallery: [],
    liveUrl: "https://www.egyptskoceskareality.cz/",
    permissionToPublish: true,
  },
  {
    slug: "petr-pavlat-reality",
    title: "Petr Pavlát reality",
    category: "Webové stránky",
    summary:
      "Osobní web realitního makléře. Prezentace služeb, nemovitostí v Česku i Egyptě a kontaktní cesta pro nové zájemce.",
    cover: {
      src: "/images/projects/petr-pavlat-reality.jpg",
      alt: "Úvodní stránka webu realitního makléře Petra Pavláta",
      width: 1440,
      height: 1000,
    },
    role: "",
    client: "Petr Pavlát reality",
    industry: "Reality",
    challenge: "",
    goals: [],
    solution:
      "Prezentace stojí na osobní komunikaci makléře a vysvětlení nabízených služeb. Samostatný prostor dostávají aktuální nemovitosti, nabídka v Egyptě, informační články a žádost o odhad nemovitosti.",
    features: [
      "Přehled realitních služeb",
      "Nabídka nemovitostí s podrobnými informacemi",
      "Samostatná prezentace nemovitostí v Egyptě",
      "Články, FAQ a formulář pro odhad",
    ],
    tech: [],
    results: [],
    gallery: [],
    liveUrl: "https://www.petrpavlat-reality.cz/",
    permissionToPublish: true,
  },
  {
    slug: "fixplace",
    title: "FixPlace",
    category: "Webové stránky",
    summary:
      "Web lokálního servisu elektroniky. Přehled oprav podle typu zařízení a formulář, který pomáhá popsat závadu už při prvním kontaktu.",
    cover: {
      src: "/images/projects/fixplace.jpg",
      alt: "Úvodní stránka servisu elektroniky FixPlace s přehledem oprav",
      width: 1440,
      height: 1000,
    },
    role: "",
    client: "FixPlace",
    industry: "Servis elektroniky",
    challenge: "",
    goals: [],
    solution:
      "Web rozděluje nabídku servisu podle jednotlivých zařízení, vysvětluje postup opravy a dává prostor praktickým informacím před předáním zařízení. Poptávkový formulář umožňuje uvést typ zařízení a popis problému.",
    features: [
      "Katalog servisních služeb podle zařízení",
      "Vysvětlení postupu diagnostiky a opravy",
      "Poptávkový formulář s výběrem zařízení",
      "Telefonický kontakt a informace o předání",
    ],
    tech: [],
    results: [],
    gallery: [],
    liveUrl: "https://www.fixplace.cz/",
    permissionToPublish: true,
  },
];
export const publishedProjects = projects.filter(
  (project) => project.permissionToPublish,
);
