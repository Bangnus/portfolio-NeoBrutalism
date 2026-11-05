"use client";

import React from "react";
import { Cpu, Briefcase, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SwarmBuildBlock } from "../swarm/SwarmBuildBlock";

export function StackAndExperienceSection() {
  const { techCategories, experiences } = PORTFOLIO_DATA;

  return (
    <>
      <section id="stack" className="scroll-mt-24">
        <SwarmBuildBlock
          id="stack-header-frame"
          label="SECTION_03 // TECH_STACK"
          accentColor="#FDE047"
        >
          <div className="rounded-xl bg-white brutal-card p-6 sm:p-7">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FDE047] border border-zinc-900 shadow-[2px_2px_0px_#18181b] font-mono text-xs font-bold uppercase mb-2.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>03 // ENGINEERING CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              Tech Stack & Architectural Layers
            </h2>
          </div>
        </SwarmBuildBlock>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-7">
          {techCategories.map((cat, idx) => (
            <SwarmBuildBlock
              key={cat.id}
              id={`tech-layer-${cat.id}`}
              label={cat.tag}
              accentColor="#FDE047"
              delayMs={idx * 100}
            >
              <div className="h-full rounded-xl bg-white brutal-card p-6 flex flex-col justify-between">
                <div>
                  <div className="inline-block font-mono text-[11px] font-bold uppercase px-2 py-0.5 bg-[#FAF8F5] border border-zinc-900 shadow-[1.5px_1.5px_0px_#18181b] mb-3">
                    {cat.tag}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 mb-1.5">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-5">
                    {cat.description}
                  </p>

                  <div className="space-y-3">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3 rounded-lg bg-[#FAF8F5] border border-zinc-900"
                      >
                        <div className="flex items-center justify-between font-mono text-xs font-bold mb-1">
                          <span className="text-zinc-900">{skill.name}</span>
                          <span className="px-1.5 py-0.2 bg-[#FDE047] border border-zinc-900 text-zinc-950 text-[10px]">
                            {skill.level}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-zinc-500 mb-2">
                          {skill.detail}
                        </div>
                        <div className="w-full h-1.5 bg-zinc-200 border border-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-zinc-950"
                            style={{ width: skill.level }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwarmBuildBlock>
          ))}
        </div>
      </section>

      <section id="experience" className="scroll-mt-24">
        <SwarmBuildBlock
          id="experience-header-frame"
          label="SECTION_04 // TIMELINE"
          accentColor="#FDE047"
        >
          <div className="rounded-xl bg-white brutal-card p-6 sm:p-7">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FDE047] border border-zinc-900 shadow-[2px_2px_0px_#18181b] font-mono text-xs font-bold uppercase mb-2.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>04 // CAREER JOURNEY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              Work Experience & Achievements
            </h2>
          </div>
        </SwarmBuildBlock>

        <div className="space-y-5 mt-7">
          {experiences.map((exp, idx) => (
            <SwarmBuildBlock
              key={exp.id}
              id={`experience-node-${exp.id}`}
              label={`EXPERIENCE // ${exp.period}`}
              accentColor="#FDE047"
              delayMs={idx * 100}
            >
              <div className="rounded-xl bg-white brutal-card p-6 sm:p-7">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pb-3.5 mb-3.5 border-b-2 border-zinc-900">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-950">
                      {exp.role}{" "}
                      <span className="text-zinc-600 font-semibold">
                        @ {exp.company}
                      </span>
                    </h3>
                    <p className="font-mono text-xs text-zinc-500 mt-0.5">
                      {exp.location}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#FDE047] border border-zinc-900 shadow-[2px_2px_0px_#18181b] self-start md:self-auto text-zinc-900">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-zinc-700 leading-relaxed mb-4">
                  {exp.summary}
                </p>

                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-zinc-700 leading-normal"
                    >
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-zinc-900" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-[#FAF8F5] border border-zinc-800 font-mono text-[11px] font-bold text-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </SwarmBuildBlock>
          ))}
        </div>
      </section>
    </>
  );
}
