import { z } from "zod";

export const projectTypes = [
  { value: "web", label: "Webové stránky" },
  { value: "eshop", label: "E-shop" },
  { value: "app", label: "Webová aplikace" },
  { value: "care", label: "Správa a údržba" },
  { value: "other", label: "Jiný projekt" },
] as const;
export const budgets = [
  "do 15 000 Kč",
  "15–30 000 Kč",
  "30–60 000 Kč",
  "60 000 Kč a více",
  "Zatím nevím",
] as const;
export const timelines = [
  "Co nejdříve",
  "Za 1–3 měsíce",
  "Později",
  "Zatím nevím",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Zadejte prosím alespoň 2 znaky.")
    .max(100, "Jméno může mít nejvýše 100 znaků."),
  email: z
    .email("Zadejte platnou e-mailovou adresu.")
    .max(254, "E-mail je příliš dlouhý."),
  phone: z
    .string()
    .trim()
    .max(30, "Telefon je příliš dlouhý.")
    .refine(
      (value) =>
        value === "" ||
        (/^\+?[\d\s().-]+$/.test(value) &&
          (value.match(/\d/g)?.length ?? 0) >= 6),
      "Zadejte platné telefonní číslo.",
    )
    .default(""),
  projectType: z.enum(["web", "eshop", "app", "care", "other"], {
    error: "Vyberte prosím typ projektu.",
  }),
  budget: z.union([z.enum(budgets), z.literal("")]).default(""),
  timeline: z.union([z.enum(timelines), z.literal("")]).default(""),
  message: z
    .string()
    .trim()
    .min(20, "Napište prosím alespoň 20 znaků o svém projektu.")
    .max(5000, "Zpráva může mít nejvýše 5 000 znaků."),
  consent: z.literal(true, {
    error: "Potvrďte prosím seznámení se zpracováním osobních údajů.",
  }),
  website: z.string().max(200).optional().default(""),
});
export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;
export function fieldErrors(error: z.ZodError): ContactErrors {
  const errors: ContactErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput;
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export const emailConfigSchema = z.object({
  key: z.string().min(1),
  to: z.email(),
  from: z.email(),
});
