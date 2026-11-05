"use client";

import React, { useEffect } from "react";
import {
  X,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { ProjectItem } from "@/data/portfolio";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
      data-interactive="true"
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl bg-white brutal-card p-6 sm:p-7 text-zinc-950"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-3.5 mb-5 border-b-2 border-zinc-900">
          <div className="flex items-center gap-2 font-mono text-xs font-bold">
            <span className="px-2.5 py-0.5 bg-[#FDE047] border border-zinc-900 shadow-[1.5px_1.5px_0px_#18181b] uppercase">
              SPEC // {project.id}
            </span>
            <span className="px-2 py-0.5 bg-zinc-900 text-white">
              {project.year}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="brutal-btn p-1.5 rounded-md bg-[#FAF8F5] text-zinc-900 hover:bg-[#FDE047] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-5">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
            {project.category}
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-950 mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-600 font-medium">
            {project.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="p-3 rounded-lg bg-[#FAF8F5] border border-zinc-900 shadow-[2px_2px_0px_#18181b] flex flex-col gap-0.5"
            >
              <span className="font-mono text-[10px] font-semibold text-zinc-500 uppercase">
                {m.label}
              </span>
              <span className="font-mono text-base font-bold text-zinc-950">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <h4 className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 mb-2">
            <Layers className="w-3.5 h-3.5 text-zinc-900" />
            <span>System Overview</span>
          </h4>
          <p className="text-sm font-normal text-zinc-700 leading-relaxed bg-[#FAF8F5] p-3.5 rounded-lg border border-zinc-900">
            {project.longDescription}
          </p>
        </div>

        <div className="mb-5">
          <h4 className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 mb-2">
            <Cpu className="w-3.5 h-3.5 text-zinc-900" />
            <span>Architecture Notes</span>
          </h4>
          <ul className="space-y-2">
            {project.architectureNotes.map((note, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-zinc-700 bg-[#FAF8F5] p-2.5 rounded-lg border border-zinc-800"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-zinc-900" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 mb-2">
            <Activity className="w-3.5 h-3.5 text-zinc-900" />
            <span>Production Stack</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 rounded-md font-mono text-xs font-bold bg-[#FAF8F5] border border-zinc-900 text-zinc-800"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t-2 border-zinc-900">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#FDE047] font-mono text-xs font-bold text-zinc-900 uppercase"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit Live</span>
            </a>
            {project.repoUrl?.includes("works") && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white font-mono text-xs font-bold text-zinc-900 uppercase"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Client Works</span>
              </a>
            )}
            {project.repoUrl?.includes("github.com") && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white font-mono text-xs font-bold text-zinc-900 uppercase"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="brutal-btn px-3 py-1.5 rounded-md bg-[#FAF8F5] font-mono text-xs font-bold text-zinc-700 hover:text-zinc-950 cursor-pointer"
          >
            ESC to Close
          </button>
        </div>
      </div>
    </div>
  );
}
