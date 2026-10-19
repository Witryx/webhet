import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { publishedProjects } from "@/content/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/sluzby",
    "/projekty",
    "/o-mne",
    "/cenik",
    "/kontakt",
    "/ochrana-osobnich-udaju",
    "/cookies",
    ...services.map((service) => `/sluzby/${service.slug}`),
    ...publishedProjects.map((project) => `/projekty/${project.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
