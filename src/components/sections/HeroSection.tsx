"use client";

import React from "react";
import { ArrowUpRight, Sparkles, RotateCcw, Scan, Code2, Globe } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SwarmBuildBlock } from "../swarm/SwarmBuildBlock";
import { useSwarm } from "../swarm/SwarmContext";

export function HeroSection() {
  const { profile } = PORTFOLIO_DATA;
  const { inspectMode, setInspectMode, rebuildAll } = useSwarm();

  return (
    <section id="hero" className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <SwarmBuildBlock
          id="hero-main-frame"
          label="HERO_PRIMARY_FRAME"
          accentColor="#FDE047"
          autoBuildOnMount={true}
          delayMs={300}
          className="lg:col-span-8"
        >
          <div className="h-full rounded-xl bg-white brutal-card p-6 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FDE047] border border-zinc-900 shadow-[2px_2px_0px_#18181b] font-mono text-xs font-bold text-zinc-900 uppercase mb-5">
                <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                <span>{profile.availability}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-[1.12] mb-4">
                Hi, I&apos;m {profile.name}
                <span className="block text-zinc-700 text-2xl sm:text-3xl font-bold mt-1.5">
                  Creative Full-Stack Developer
                </span>
              </h1>

              <p className="text-base text-zinc-600 leading-relaxed max-w-2xl mb-7">
                {profile.tagline} Built using clean Next.js architecture,
                TypeScript, and tactile Neo-Brutalist components constructed live
                by the swarm cursor.
              </p>
            </div>

            <div
              className="flex flex-wrap items-center gap-3 pt-5 border-t-2 border-zinc-900"
              data-interactive="true"
            >
              <a
                href="#projects"
                className="brutal-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 text-white font-mono text-xs font-bold uppercase"
              >
                <span>View Works</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={rebuildAll}
                className="brutal-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FDE047] text-zinc-950 font-mono text-xs font-bold uppercase cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rebuild Canvas</span>
              </button>

              <button
                type="button"
                onClick={() => setInspectMode((v) => !v)}
                className={`brutal-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs font-bold uppercase cursor-pointer ${
                  inspectMode
                    ? "bg-zinc-950 text-[#FDE047]"
                    : "bg-white text-zinc-900"
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
          accentColor="#FDE047"
          autoBuildOnMount={true}
          delayMs={750}
          className="lg:col-span-4"
        >
          <div className="h-full rounded-xl bg-white brutal-card p-5 flex flex-col justify-between gap-4">
            <div className="relative rounded-lg overflow-hidden border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] aspect-[4/4.3] bg-zinc-100">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#FDE047] border border-zinc-900 shadow-[1.5px_1.5px_0px_#18181b] font-mono text-[10px] font-bold text-zinc-900">
                {profile.handle}
              </div>
            </div>

            <div className="bg-[#FAF8F5] border-2 border-zinc-900 rounded-lg p-3.5 shadow-[2px_2px_0px_#18181b]">
              <div className="font-bold text-base text-zinc-900">
                {profile.name}
              </div>
              <div className="font-mono text-xs text-zinc-600 truncate mb-3">
                {profile.email}
              </div>
              <div className="flex items-center gap-2" data-interactive="true">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-btn flex-1 py-1.5 px-2.5 rounded-md bg-white font-mono text-xs font-bold text-zinc-900 flex items-center justify-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-btn flex-1 py-1.5 px-2.5 rounded-md bg-[#FDE047] font-mono text-xs font-bold text-zinc-900 flex items-center justify-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </SwarmBuildBlock>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {profile.stats.map((st, idx) => (
          <SwarmBuildBlock
            key={st.label}
            id={`hero-stat-${idx}`}
            label={`STAT_0${idx + 1}`}
            accentColor="#FDE047"
            autoBuildOnMount={true}
            delayMs={1200 + idx * 280}
          >
            <div className="rounded-xl bg-white brutal-card p-4 sm:p-5 flex flex-col justify-between">
              <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-wider">
                {st.label}
              </span>
              <span className="font-mono text-2xl font-extrabold text-zinc-950 mt-1.5">
                {st.value}
              </span>
            </div>
          </SwarmBuildBlock>
        ))}
      </div>
    </section>
  );
}
