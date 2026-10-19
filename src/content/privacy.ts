export const privacy = {
  updated: "19. 10. 2026",
  inquiryRetentionMonths: 12,
  rightsContactSubject: "Osobní údaje — žádost",
};
export interface PrivacyProvider {
  name: string;
  purpose: string;
  url: string;
}

/** Server-side: reflect services enabled in the current deployment. */
export function getPrivacyProviders(): PrivacyProvider[] {
  const providers: PrivacyProvider[] = [
    {
      name: "Google — služba Gmail",
      purpose:
        "Příjem a uchování e-mailové komunikace ve schránce provozovatele. Při přímém odeslání e-mailu může údaje zpracovávat také poskytovatel vaší e-mailové služby.",
      url: "https://policies.google.com/privacy?hl=cs",
    },
  ];
  if (process.env.VERCEL)
    providers.push({
      name: "Vercel Inc.",
      purpose:
        "Hosting webu, zpracování serverových požadavků a provozní či bezpečnostní záznamy podle nastavení hostingu.",
      url: "https://vercel.com/legal/privacy-policy",
    });
  if (process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL)
    providers.push({
      name: "Plus Five Five, Inc. — Resend",
      purpose:
        "Předání zprávy z kontaktního formuláře do schránky provozovatele. Údaje zahrnují obsah poptávky a adresu pro odpověď.",
      url: "https://resend.com/legal/dpa",
    });
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  )
    providers.push({
      name: "Upstash",
      purpose:
        "Ochrana formuláře proti zahlcení. Ukládá pouze čítač požadavků a hash síťového identifikátoru s krátkou expirací, nikoli obsah poptávky.",
      url: "https://upstash.com/trust/privacy.pdf",
    });
  return providers;
}
