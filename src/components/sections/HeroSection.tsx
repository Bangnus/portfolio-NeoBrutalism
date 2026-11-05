"use client";

import React from "react";
import {
  ArrowUpRight,
  Sparkles,
  RotateCcw,
  Scan,
  Code2,
  Globe,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SwarmBuildBlock } from "../swarm/SwarmBuildBlock";
import { useSwarm } from "../swarm/SwarmContext";

export function HeroSection() {
  const { profile } = PORTFOLIO_DATA;
  const { inspectMode, setInspectMode, rebuildAll } = useSwarm();

  return (
    <section id="hero" className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        <SwarmBuildBlock
          id="hero-main-frame"
          label="HERO_PRIMARY_FRAME"
          accentColor="#FDE047"
          autoBuildOnMount={true}
          delayMs={260}
          className="lg:col-span-8"
        >
          <div className="h-full rounded-2xl bg-white brutal-card p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 bg-[#4ADE80] border-2 border-zinc-950 shadow-[3px_3px_0px_#09090b] font-mono text-xs font-black text-zinc-950 uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{profile.availability}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-950 leading-[1.05] mb-5">
                {profile.name}
                <span className="block mt-2">
                  <span className="inline-block bg-[#FDE047] px-3 py-1 border-[3px] border-zinc-950 shadow-[5px_5px_0px_#09090b]">
                    Creative Full-Stack
                  </span>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-800 font-medium max-w-2xl leading-relaxed mb-8">
                {profile.tagline} Engineered with{" "}
                <span className="font-mono font-black underline decoration-[3px] decoration-[#FF5E5B]">
                  Next.js
                </span>
                ,{" "}
                <span className="font-mono font-black underline decoration-[3px] decoration-[#10B981]">
                  TypeScript
                </span>
                , and{" "}
                <span className="font-mono font-black underline decoration-[3px] decoration-[#3B82F6]">
                  Neo-Brutalist Systems
                </span>
                .
              </p>
            </div>

            <div
              className="flex flex-wrap items-center gap-3 pt-5 border-t-[3px] border-zinc-950"
              data-interactive="true"
            >
              <a
                href="#projects"
                className="brutal-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF5E5B] text-white font-mono text-xs font-black tracking-wider uppercase"
              >
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={rebuildAll}
                className="brutal-btn inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#FDE047] text-zinc-950 font-mono text-xs font-black uppercase cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rebuild Page</span>
              </button>

              <button
                type="button"
                onClick={() => setInspectMode((v) => !v)}
                className={`brutal-btn inline-flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-xs font-black uppercase cursor-pointer ${
                  inspectMode
                    ? "bg-zinc-950 text-[#FDE047]"
                    : "bg-white text-zinc-950"
                }`}
              >
                <Scan className="w-3.5 h-3.5" />
                <span>{inspectMode ? "Hide px Bounds" : "Inspect px"}</span>
              </button>
            </div>
          </div>
        </SwarmBuildBlock>

        <SwarmBuildBlock
          id="hero-telemetry-panel"
          label="PORTRAIT_CARD"
          accentColor="#FF5E5B"
          autoBuildOnMount={true}
          delayMs={440}
          className="lg:col-span-4"
        >
          <div className="h-full rounded-2xl bg-[#38BDF8] brutal-card p-5 flex flex-col justify-between gap-4">
            <div className="relative rounded-xl overflow-hidden border-[3px] border-zinc-950 shadow-[4px_4px_0px_#09090b] aspect-[4/4.4] bg-zinc-900">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#FDE047] border-2 border-zinc-950 shadow-[2px_2px_0px_#09090b] font-mono text-[11px] font-black text-zinc-950">
                {profile.handle}
              </div>
            </div>

            <div className="bg-white border-[2.5px] border-zinc-950 rounded-xl p-3.5 shadow-[3px_3px_0px_#09090b]">
              <div className="font-black text-base text-zinc-950">
                {profile.name}
              </div>
              <div className="font-mono text-xs font-bold text-zinc-700 truncate mb-3">
                {profile.email}
              </div>
              <div className="flex items-center gap-2" data-interactive="true">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-btn flex-1 py-1.5 px-3 rounded-lg bg-[#FDE047] font-mono text-xs font-black text-zinc-950 flex items-center justify-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-btn flex-1 py-1.5 px-3 rounded-lg bg-[#FF5E5B] font-mono text-xs font-black text-white flex items-center justify-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </SwarmBuildBlock>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
        {profile.stats.map((st, idx) => {
          const bgColors = ["#FDE047", "#4ADE80", "#C084FC", "#FF9F1C"];
          const bg = bgColors[idx % bgColors.length];
          return (
            <SwarmBuildBlock
              key={st.label}
              id={`hero-stat-${idx}`}
              label={`STAT_0${idx + 1}`}
              accentColor={bg}
              autoBuildOnMount={true}
              delayMs={580 + idx * 100}
            >
              <div
                className="rounded-xl brutal-card p-5 flex flex-col justify-between text-zinc-950"
                style={{ backgroundColor: bg }}
              >
                <span className="font-mono text-xs font-black uppercase tracking-wider">
                  {st.label}
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-black mt-2">
                  {st.value}
                </span>
              </div>
            </SwarmBuildBlock>
          );
        })}
      </div>
    </section>
  );
}
