import { z } from "zod";

const publicConfig = z
  .object({
    url: z.url(),
    email: z.union([z.email(), z.literal("")]),
  })
  .parse({
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "petahecik@gmail.com",
  });

export const site = {
  name: "WebHet",
  wordmark: "webhet.",
  description:
    "Tvořím moderní webové stránky, e-shopy a aplikace. Osobní spolupráce, promyšlený design a technologie, které dávají smysl.",
  ...publicConfig,
  phone: { display: "+420 608 170 407", href: "tel:+420608170407" },
  // No portrait: the About page uses the original WebHet monogram.
  founder: {
    name: "Petr Hetzendorf",
    bio: "",
    location: "",
    photo: "",
    experience: "",
  },
  business: {
    name: "Petr Hetzendorf",
    registrationId: "29704685",
    // Registered business address verified in the official ARES on 2026-10-19.
    address: "Touchořiny 8, 411 45 Lovečkovice",
    vatStatus: "Nejsem plátce DPH. DPH se k uvedeným cenám nepřipočítává.",
    retention:
      "Poptávky bez navazující smlouvy uchovávám nejdéle 12 měsíců od poslední věcné komunikace. Poté je odstraním z pracovní schránky a z dostupné historie odesílání. Pokud navážeme spolupráci, relevantní údaje dále zpracovávám pro plnění smlouvy, zákonné povinnosti a případné právní nároky po nezbytnou dobu.",
  },
  social: [] as { label: string; url: string }[],
};

export const navigation = [
  { label: "Služby", href: "/sluzby" },
  { label: "Projekty", href: "/projekty" },
  { label: "O mně", href: "/o-mne" },
  { label: "Ceník", href: "/cenik" },
  { label: "Kontakt", href: "/kontakt" },
];

export const isIndexable = () =>
  process.env.SITE_INDEXABLE === "true" &&
  process.env.VERCEL_ENV !== "preview" &&
  !new URL(site.url).hostname.match(/^(localhost|127\.0\.0\.1)$/);
