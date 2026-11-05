"use client";

import React, { useState } from "react";
import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolio";
import { SwarmBuildBlock } from "../swarm/SwarmBuildBlock";

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const { projects } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = [
    "ALL",
    ...Array.from(new Set(projects.map((p) => p.category.split(" / ")[0]))),
  ];

  const filteredProjects =
    activeCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category.startsWith(activeCategory));

  const cardBgs = ["#FFFFFF", "#FEF9C3", "#E0F2FE", "#FCE7F3"];

  return (
    <section id="projects" className="scroll-mt-24">
      <SwarmBuildBlock
        id="projects-header-frame"
        label="SECTION_02 // WORKS"
        accentColor="#38BDF8"
      >
        <div className="rounded-2xl bg-[#38BDF8] brutal-card p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-zinc-950 shadow-[2px_2px_0px_#09090b] font-mono text-xs font-black uppercase mb-3">
              <Code2 className="w-4 h-4" />
              <span>02 // SELECTED PRODUCTION WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              Featured Projects & Interactive Engines
            </h2>
          </div>

          <div
            className="flex flex-wrap items-center gap-2"
            data-interactive="true"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`brutal-btn px-3.5 py-1.5 rounded-lg font-mono text-xs font-black uppercase cursor-pointer ${
                  activeCategory === cat
                    ? "bg-zinc-950 text-[#FDE047]"
                    : "bg-white text-zinc-950"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </SwarmBuildBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-8">
        {filteredProjects.map((project, idx) => {
          const cardBg = cardBgs[idx % cardBgs.length];
          return (
            <SwarmBuildBlock
              key={project.id}
              id={`project-card-${project.id}`}
              label={`PROJECT // ${project.id.toUpperCase()}`}
              accentColor={project.accentColor}
              delayMs={idx * 110}
            >
              <article
                onClick={() => onSelectProject(project)}
                data-interactive="true"
                style={{ backgroundColor: cardBg }}
                className="group h-full rounded-2xl brutal-card brutal-card-hover p-6 sm:p-7 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-xs mb-4">
                    <span className="px-3 py-1 rounded-md bg-zinc-950 text-white font-black uppercase">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 bg-[#FDE047] border-2 border-zinc-950 font-black text-zinc-950 shadow-[2px_2px_0px_#09090b]">
                      {project.year}
                    </span>
                  </div>

                  {/* Neo-Brutalist Metrics Banner */}
                  <div className="grid grid-cols-3 gap-2.5 mb-5 p-3 rounded-xl bg-white border-[2.5px] border-zinc-950 shadow-[3px_3px_0px_#09090b]">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="px-1">
                        <div className="font-mono text-[10px] font-bold text-zinc-600 uppercase truncate">
                          {m.label}
                        </div>
                        <div className="font-mono text-xs sm:text-sm font-black text-zinc-950 truncate">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-black text-zinc-950 mb-1">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs font-bold text-zinc-700 mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-zinc-800 font-medium leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-white border-2 border-zinc-950 font-mono text-xs font-bold text-zinc-950 shadow-[2px_2px_0px_#09090b]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t-[2.5px] border-zinc-950 flex items-center justify-between font-mono text-xs">
                    <span className="inline-flex items-center gap-1.5 font-black text-zinc-950 uppercase group-hover:underline">
                      <span>Inspect Spec Sheet</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>

                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutal-btn p-2 rounded-lg bg-white text-zinc-950"
                        title="GitHub Repository"
                      >
                        <Code2 className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutal-btn p-2 rounded-lg bg-[#4ADE80] text-zinc-950"
                        title="Live Deployment"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </SwarmBuildBlock>
          );
        })}
      </div>
    </section>
  );
}
