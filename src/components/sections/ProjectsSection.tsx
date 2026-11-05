"use client";

import React from "react";
import { ArrowUpRight, Code2, ExternalLink, Briefcase } from "lucide-react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolio";
import { SwarmBuildBlock } from "../swarm/SwarmBuildBlock";

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="scroll-mt-24">
      <SwarmBuildBlock
        id="projects-header-frame"
        label="SECTION_02 // WORKS"
        accentColor="#FDE047"
      >
        <div className="rounded-xl bg-white brutal-card p-6 sm:p-7 flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FDE047] border border-zinc-900 shadow-[2px_2px_0px_#18181b] font-mono text-xs font-bold uppercase mb-2.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>02 // SELECTED PRODUCTION PLATFORMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              Production Works & Freelance Services
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-bold">
            <span className="px-3 py-1.5 rounded-md bg-[#FDE047] border border-zinc-900 shadow-[1.5px_1.5px_0px_#18181b] text-zinc-950 uppercase flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>2 Verified Platforms</span>
            </span>
          </div>
        </div>
      </SwarmBuildBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
        {projects.map((project, idx) => (
          <SwarmBuildBlock
            key={project.id}
            id={`project-card-${project.id}`}
            label={`PROJECT // ${project.id.toUpperCase()}`}
            accentColor="#FDE047"
            delayMs={idx * 120}
          >
            <article
              onClick={() => onSelectProject(project)}
              data-interactive="true"
              className="group h-full rounded-xl bg-white brutal-card brutal-card-hover p-6 sm:p-7 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-xs mb-3.5">
                  <span className="px-2.5 py-0.5 rounded bg-zinc-100 border border-zinc-800 text-zinc-900 font-bold uppercase text-[11px]">
                    {project.category}
                  </span>
                  <span className="px-2 py-0.5 bg-[#FDE047] border border-zinc-900 font-bold text-zinc-900 shadow-[1.5px_1.5px_0px_#18181b] text-[11px]">
                    {project.year}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-lg bg-[#FAF8F5] border border-zinc-900">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="px-1">
                      <div className="font-mono text-[10px] font-medium text-zinc-500 uppercase truncate">
                        {m.label}
                      </div>
                      <div className="font-mono text-xs sm:text-sm font-bold text-zinc-950 truncate mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-zinc-950 mb-1 group-hover:text-amber-600 transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-zinc-500 mb-3">
                  {project.subtitle}
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed mb-5">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-zinc-50 border border-zinc-800 font-mono text-[11px] font-semibold text-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-3.5 border-t-2 border-zinc-900 flex items-center justify-between font-mono text-xs">
                  <span className="inline-flex items-center gap-1 font-bold text-zinc-950 uppercase group-hover:underline">
                    <span>Inspect Spec</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>

                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.repoUrl?.includes("works") && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutal-btn inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white font-mono text-xs font-bold text-zinc-900"
                        title="View Works Inside"
                      >
                        <span>Works</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutal-btn inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-[#FDE047] font-mono text-xs font-bold text-zinc-900"
                      title="Visit Platform"
                    >
                      <span>{project.id === "proj-tumweb" ? "Visit Site" : "Fastwork"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </SwarmBuildBlock>
        ))}
      </div>
    </section>
  );
}
