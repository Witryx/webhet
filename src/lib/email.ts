import { Resend } from "resend";
import {
  emailConfigSchema,
  projectTypes,
  type ContactInput,
} from "./validation";

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
}

export function emailContent(input: ContactInput) {
  const fields = [
    ["Jméno", input.name],
    ["E-mail", input.email],
    ["Telefon", input.phone || "Neuvedeno"],
    [
      "Typ projektu",
      projectTypes.find((type) => type.value === input.projectType)!.label,
    ],
    ["Rozpočet", input.budget || "Neuvedeno"],
    ["Termín", input.timeline || "Neuvedeno"],
    ["Zpráva", input.message],
    ["Seznámení se zpracováním údajů", "Potvrzeno při odeslání"],
  ];
  return {
    text: fields.map(([key, value]) => `${key}: ${value}`).join("\n\n"),
    html: `<h1>Nová poptávka z WebHet</h1>${fields.map(([key, value]) => `<h2>${key}</h2><p style="white-space:pre-wrap">${escapeHtml(value)}</p>`).join("")}`,
  };
}

export function getEmailConfig() {
  return emailConfigSchema.safeParse({
    key: process.env.RESEND_API_KEY,
    to: process.env.CONTACT_TO_EMAIL,
    from: process.env.CONTACT_FROM_EMAIL,
  });
}

export async function sendContactEmail(input: ContactInput) {
  const config = getEmailConfig();
  if (!config.success) throw new Error("Email configuration missing");
  const resend = new Resend(config.data.key);
  const result = await resend.emails.send({
    from: config.data.from,
    to: config.data.to,
    replyTo: input.email,
    subject: `WebHet: nová poptávka — ${projectTypes.find((type) => type.value === input.projectType)!.label}`,
    ...emailContent(input),
  });
  if (result.error || !result.data?.id)
    throw new Error("Email provider rejected request");
}
