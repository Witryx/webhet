import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site, isIndexable } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "optional",
  preload: false,
});
const space = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "WebHet — Weby, které mají smysl.",
    template: "%s | WebHet",
  },
  description: site.description,
  robots: { index: isIndexable(), follow: isIndexable() },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className={`${inter.variable} ${space.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Přeskočit na obsah
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              legalName: site.business.name,
              founder: { "@type": "Person", name: site.founder.name },
              telephone: site.phone.display,
              address: site.business.address,
              url: site.url,
              description: site.description,
              ...(site.email ? { email: site.email } : {}),
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
