export type ProjectCategory = "Webové stránky" | "E-shopy" | "Aplikace";
export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}
export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  cover: ProjectImage;
  role: string;
  client?: string;
  industry?: string;
  challenge: string;
  goals: string[];
  solution: string;
  features: string[];
  tech: string[];
  results: string[];
  gallery: ProjectImage[];
  liveUrl?: string;
  permissionToPublish: boolean;
}
// Only add real work with approval and evidence for every stated result.
export const projects: Project[] = [];
export const publishedProjects = projects.filter(
  (project) => project.permissionToPublish,
);
