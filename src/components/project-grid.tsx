"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectCategory } from "@/content/projects";

export function ProjectGrid({
  projects,
  filterable = false,
}: {
  projects: Project[];
  filterable?: boolean;
}) {
  const [category, setCategory] = useState<ProjectCategory | "Vše">("Vše");
  const categories = [...new Set(projects.map((project) => project.category))];
  const showFilters =
    filterable && projects.length >= 4 && categories.length > 1;
  const visible =
    !showFilters || category === "Vše"
      ? projects
      : projects.filter((project) => project.category === category);
  return (
    <>
      {showFilters && (
        <div
          className="project-filters"
          role="group"
          aria-label="Filtrovat projekty"
        >
          {(["Vše", ...categories] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <div className="project-grid">
        {visible.map((project) => (
          <Link
            key={project.slug}
            href={`/projekty/${project.slug}`}
            className="project-card"
          >
            <Image
              {...project.cover}
              sizes="(max-width: 700px) 100vw, 50vw"
              alt={project.cover.alt}
            />
            <div>
              <span className="eyebrow">{project.category}</span>
              <h3>
                {project.title}
                <ArrowUpRight size={22} />
              </h3>
              <p>{project.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
