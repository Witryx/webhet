import { NextResponse } from "next/server";
import { contactSchema, fieldErrors } from "@/lib/validation";
import { getEmailConfig, sendContactEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
const json = (
  body: unknown,
  status: number,
  headers?: Record<string, string>,
) =>
  NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return json({ message: "Odeslání z jiné stránky není povoleno." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return json({ message: "Požadavek musí být ve formátu JSON." }, 415);
  if (Number(request.headers.get("content-length")) > 24000)
    return json({ message: "Zpráva je příliš dlouhá." }, 413);
  let data: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ message: "Chybí obsah požadavku." }, 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) {
        await reader.cancel();
        return json({ message: "Zpráva je příliš dlouhá." }, 413);
      }
      chunks.push(value);
    }
    data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return json({ message: "Požadavek se nepodařilo přečíst." }, 400);
  }
  if (
    typeof data === "object" &&
    data !== null &&
    "website" in data &&
    data.website
  )
    return json(
      { message: "Formulář se nepodařilo ověřit. Zkuste jej prosím znovu." },
      400,
    );
  try {
    // Vercel overwrites x-forwarded-for; self-hosts must overwrite it at their trusted proxy.
    const ip = process.env.VERCEL
      ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown"
      : "local";
    const result = await rateLimit(ip);
    if (!result.allowed)
      return json(
        {
          message:
            "Odeslali jste více zpráv v krátké době. Zkuste to prosím později.",
        },
        429,
        { "Retry-After": String(result.retryAfter) },
      );
  } catch {
    return json(
      {
        message:
          "Odesílání je dočasně nedostupné. Zkuste to prosím později nebo použijte kontaktní e-mail, je-li uveden.",
      },
      503,
    );
  }
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success)
    return json(
      {
        message: "Zkontrolujte prosím označená pole.",
        errors: fieldErrors(parsed.error),
      },
      422,
    );
  if (!getEmailConfig().success)
    return json(
      {
        message:
          process.env.NODE_ENV !== "production"
            ? "Odesílání není nastavené. Doplňte RESEND_API_KEY, CONTACT_TO_EMAIL a CONTACT_FROM_EMAIL v .env.local."
            : "Formulář zatím nemá nastavené odesílání. Zpráva nebyla odeslána. Použijte prosím kontaktní e-mail, je-li uveden.",
      },
      503,
    );
  try {
    await sendContactEmail(parsed.data);
  } catch {
    return json(
      {
        message:
          "Zprávu se nepodařilo odeslat. Vaše údaje zůstaly ve formuláři. Zkuste to později nebo použijte kontaktní e-mail, je-li uveden.",
      },
      502,
    );
  }
  return json(
    {
      message:
        "Děkuji za zprávu. Vaše poptávka byla úspěšně předána k doručení. Ozvu se vám na uvedený e-mail.",
    },
    200,
  );
}
