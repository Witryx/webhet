import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/config/site";
import { Container } from "./ui";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  const all = [{ label: "Úvod", href: "/" }, ...items];
  return (
    <Container>
      <nav className="breadcrumbs" aria-label="Drobečková navigace">
        <ol>
          {all.map((item, i) => (
            <li key={item.href}>
              {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
              {i === all.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: all.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.label,
              item: new URL(item.href, site.url).href,
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </Container>
  );
}
