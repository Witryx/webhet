import type { MetadataRoute } from "next";
import { site, isIndexable } from "@/config/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isIndexable()
        ? { allow: "/", disallow: "/api/" }
        : { disallow: "/" }),
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
