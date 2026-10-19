import { z } from "zod";

const publicConfig = z
  .object({
    url: z.url(),
    email: z.union([z.email(), z.literal("")]),
  })
  .parse({
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  });

export const site = {
  name: "WebHet",
  wordmark: "webhet.",
  description:
    "Tvořím moderní webové stránky, e-shopy a aplikace. Osobní spolupráce, promyšlený design a technologie, které dávají smysl.",
  ...publicConfig,
  // Owner-supplied details. Empty values are deliberately not invented.
  founder: { name: "", bio: "", location: "", photo: "", experience: "" },
  business: {
    name: "",
    registrationId: "",
    address: "",
    vatStatus: "",
    retention: "",
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
