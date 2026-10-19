import { describe, it, expect } from "vitest";
import { services } from "../../src/content/services";
import { pricing, comparison } from "../../src/content/pricing";
import { projects, publishedProjects } from "../../src/content/projects";
import { navigation } from "../../src/config/site";
import sitemap from "../../src/app/sitemap";

describe("editable content integrity", () => {
  it("has four unique service routes with individual content", () => {
    expect(services).toHaveLength(4);
    expect(new Set(services.map((s) => s.slug)).size).toBe(4);
    expect(new Set(services.map((s) => s.intro)).size).toBe(4);
    for (const service of services) {
      expect(service.deliverables.length).toBeGreaterThan(3);
      expect(service.faq.length).toBeGreaterThan(0);
    }
  });
  it("keeps indicative prices and comparisons consistent", () => {
    expect(pricing.map((p) => p.price)).toEqual([12990, 24990, 49990]);
    expect(pricing.filter((p) => p.featured)).toHaveLength(1);
    for (const row of comparison)
      expect(row.values).toHaveLength(pricing.length);
  });
  it("only publishes approved work and never fabricates it", () => {
    expect(publishedProjects.every((p) => p.permissionToPublish)).toBe(true);
    expect(projects).toEqual([]);
  });
  it("includes every navigation and service route in sitemap", () => {
    const paths = sitemap().map((page) => new URL(page.url).pathname);
    for (const item of navigation) expect(paths).toContain(item.href);
    for (const service of services)
      expect(paths).toContain(`/sluzby/${service.slug}`);
    expect(paths).not.toContain("/obchodni-podminky");
  });
});
