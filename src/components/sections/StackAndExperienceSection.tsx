"use client";

import React from "react";
import { Cpu, Briefcase, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SwarmBuildBlock } from "../swarm/SwarmBuildBlock";

export function StackAndExperienceSection() {
  const { techCategories, experiences } = PORTFOLIO_DATA;
  const headerColors = ["#FDE047", "#C084FC", "#4ADE80"];

  return (
    <>
      <section id="stack" className="scroll-mt-24">
        <SwarmBuildBlock
          id="stack-header-frame"
          label="SECTION_03 // TECH_STACK"
          accentColor="#C084FC"
        >
          <div className="rounded-2xl bg-[#C084FC] brutal-card p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-zinc-950 shadow-[2px_2px_0px_#09090b] font-mono text-xs font-black uppercase mb-3">
              <Cpu className="w-4 h-4" />
              <span>03 // MULTI-LAYER ENGINEERING STACK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              Tech Stack & Spatial Capabilities
            </h2>
          </div>
        </SwarmBuildBlock>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-8">
          {techCategories.map((cat, idx) => {
            const topColor = headerColors[idx % headerColors.length];
            return (
              <SwarmBuildBlock
                key={cat.id}
                id={`tech-layer-${cat.id}`}
                label={cat.tag}
                accentColor={topColor}
                delayMs={idx * 110}
              >
                <div className="h-full rounded-2xl bg-white brutal-card p-6 flex flex-col justify-between">
                  <div>
                    <div
                      className="inline-block font-mono text-xs font-black uppercase px-2.5 py-1 border-2 border-zinc-950 shadow-[2px_2px_0px_#09090b] mb-3"
                      style={{ backgroundColor: topColor }}
                    >
                      {cat.tag}
                    </div>
                    <h3 className="text-xl font-black text-zinc-950 mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-zinc-700 font-medium leading-relaxed mb-6">
                      {cat.description}
                    </p>

                    <div className="space-y-3.5">
                      {cat.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="p-3.5 rounded-xl bg-[#FFFDF7] border-2 border-zinc-950 shadow-[3px_3px_0px_#09090b]"
                        >
                          <div className="flex items-center justify-between font-mono text-xs font-black mb-1">
                            <span className="text-zinc-950">{skill.name}</span>
                            <span className="px-1.5 py-0.5 bg-zinc-950 text-[#FDE047]">
                              {skill.level}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono font-semibold text-zinc-600 mb-2.5">
                            {skill.detail}
                          </div>
                          <div className="w-full h-2.5 bg-white border-2 border-zinc-950 overflow-hidden">
                            <div
                              className="h-full"
                              style={{
                                width: skill.level,
                                backgroundColor: topColor,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SwarmBuildBlock>
            );
          })}
        </div>
      </section>

      <section id="experience" className="scroll-mt-24">
        <SwarmBuildBlock
          id="experience-header-frame"
          label="SECTION_04 // JOURNEY"
          accentColor="#4ADE80"
        >
          <div className="rounded-2xl bg-[#4ADE80] brutal-card p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-zinc-950 shadow-[2px_2px_0px_#09090b] font-mono text-xs font-black uppercase mb-3">
              <Briefcase className="w-4 h-4" />
              <span>04 // PRODUCTION TRACK RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              Experience & Engineering Journey
            </h2>
          </div>
        </SwarmBuildBlock>

        <div className="space-y-6 mt-8">
          {experiences.map((exp, idx) => {
            const badgeColors = ["#FDE047", "#38BDF8", "#FF5E5B"];
            const badgeBg = badgeColors[idx % badgeColors.length];
            return (
              <SwarmBuildBlock
                key={exp.id}
                id={`experience-node-${exp.id}`}
                label={`EXPERIENCE // ${exp.period}`}
                accentColor={badgeBg}
                delayMs={idx * 110}
              >
                <div className="rounded-2xl bg-white brutal-card p-6 sm:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b-[2.5px] border-zinc-950">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-zinc-950">
                        {exp.role}{" "}
                        <span className="underline decoration-[3px] decoration-[#FF5E5B]">
                          @ {exp.company}
                        </span>
                      </h3>
                      <p className="font-mono text-xs font-bold text-zinc-600 mt-1">
                        {exp.location}
                      </p>
                    </div>
                    <span
                      className="font-mono text-xs font-black px-3.5 py-1.5 border-2 border-zinc-950 shadow-[3px_3px_0px_#09090b] self-start md:self-auto"
                      style={{ backgroundColor: badgeBg }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-medium text-zinc-800 mb-4">
                    {exp.summary}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm font-medium text-zinc-800"
                      >
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-zinc-950" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 bg-[#FDE047] border-2 border-zinc-950 font-mono text-xs font-black text-zinc-950 shadow-[2px_2px_0px_#09090b]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SwarmBuildBlock>
            );
          })}
        </div>
      </section>
    </>
  );
}
