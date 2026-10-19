import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation, site } from "@/config/site";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-main">
          <div className="footer-brand">
            <Link
              href="/"
              className="logo"
              aria-label="WebHet — úvodní stránka"
            >
              webhet<span>.</span>
            </Link>
            <p>
              Promyšlený design.
              <br />
              Poctivý vývoj. Váš další krok.
            </p>
            <span className="footer-descriptor">Web design & development</span>
          </div>
          <div>
            <h2>Prozkoumejte</h2>
            <nav aria-label="Navigace v zápatí">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h2>Pojďme se spojit</h2>
            <p>Máte nápad na nový web?</p>
            {site.email ? (
              <a href={`mailto:${site.email}`} className="text-link">
                {site.email}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : (
              <Link href="/kontakt" className="text-link">
                Napsat zprávu
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            )}
            {site.social.map((social) => (
              <a key={social.url} href={social.url} rel="noopener noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>
        {site.business.name && (
          <p className="business-details">
            {site.business.name}
            {site.business.registrationId &&
              ` · IČO: ${site.business.registrationId}`}
            {site.business.address && ` · ${site.business.address}`}
          </p>
        )}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} WebHet. Všechna práva vyhrazena.
          </span>
          <div>
            <Link href="/ochrana-osobnich-udaju">Ochrana osobních údajů</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
          <span className="built-with">
            S důrazem na detail <span>↗</span>
          </span>
        </div>
      </Container>
    </footer>
  );
}
