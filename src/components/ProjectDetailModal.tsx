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
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[#FFFDF7] brutal-card p-6 sm:p-8 text-zinc-950"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b-[3px] border-zinc-950">
          <div className="flex items-center gap-2.5 font-mono text-xs font-black">
            <span className="px-2.5 py-1 bg-[#FDE047] border-2 border-zinc-950 shadow-[2px_2px_0px_#09090b] uppercase">
              SPEC // {project.id}
            </span>
            <span className="px-2.5 py-1 bg-zinc-950 text-white">
              {project.year}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="brutal-btn p-1.5 rounded-lg bg-[#FF5E5B] text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-6">
          <div className="font-mono text-xs font-black uppercase tracking-widest text-zinc-600 mb-1">
            {project.category}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 mb-1">
            {project.title}
          </h3>
          <p className="text-base text-zinc-700 font-bold">
            {project.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="p-3.5 rounded-xl bg-[#FDE047] border-[2.5px] border-zinc-950 shadow-[3px_3px_0px_#09090b] flex flex-col gap-1"
            >
              <span className="font-mono text-[11px] font-bold text-zinc-800 uppercase">
                {m.label}
              </span>
              <span className="font-mono text-lg font-black text-zinc-950">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h4 className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-wider text-zinc-950 mb-2.5">
            <Layers className="w-4 h-4" />
            <span>System Overview</span>
          </h4>
          <p className="text-sm sm:text-base font-medium text-zinc-800 leading-relaxed bg-white p-4 rounded-xl border-[2.5px] border-zinc-950 shadow-[3px_3px_0px_#09090b]">
            {project.longDescription}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-wider text-zinc-950 mb-2.5">
            <Cpu className="w-4 h-4" />
            <span>Core Architecture</span>
          </h4>
          <ul className="space-y-2.5">
            {project.architectureNotes.map((note, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm font-medium text-zinc-900 bg-white px-3.5 py-2.5 rounded-xl border-2 border-zinc-950 shadow-[2px_2px_0px_#09090b]"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-zinc-950" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h4 className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-wider text-zinc-950 mb-2.5">
            <Activity className="w-4 h-4" />
            <span>Production Stack</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg font-mono text-xs font-black bg-[#38BDF8] border-2 border-zinc-950 text-zinc-950 shadow-[2px_2px_0px_#09090b]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-[3px] border-zinc-950">
          <div className="flex items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4ADE80] font-mono text-xs font-black text-zinc-950 uppercase"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white font-mono text-xs font-black text-zinc-950 uppercase"
            >
              <Code2 className="w-4 h-4" />
              <span>GitHub Source</span>
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="brutal-btn px-4 py-2 rounded-xl bg-[#FDE047] font-mono text-xs font-black text-zinc-950 cursor-pointer"
          >
            ESC to Close
          </button>
        </div>
      </div>
    </div>
  );
}
