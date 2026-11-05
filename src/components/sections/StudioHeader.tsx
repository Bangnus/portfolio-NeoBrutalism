"use client";

import React from "react";
import { RotateCcw } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { useSwarm } from "../swarm/SwarmContext";
import { SwarmBuildBlock } from "../swarm/SwarmBuildBlock";

export function StudioHeader() {
  const { profile } = PORTFOLIO_DATA;
  const { rebuildAll } = useSwarm();

  return (
    <header
      className="sticky top-0 z-30"
      data-interactive="true"
    >
      <SwarmBuildBlock
        id="navbar-top-frame"
        label="NAVBAR // STUDIO_HEADER"
        accentColor="#4ADE80"
        autoBuildOnMount={true}
        delayMs={0}
      >
        <div className="border-b-[3px] border-zinc-950 bg-[#FFFDF7]/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3" data-subitem="true">
              <div className="w-10 h-10 rounded-lg overflow-hidden border-[2.5px] border-zinc-950 shadow-[3px_3px_0px_#09090b] bg-[#FDE047]">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
                <span className="font-black text-zinc-950 tracking-tight uppercase">
                  {profile.name}
                </span>
                <span className="px-2 py-0.5 bg-[#4ADE80] border-2 border-zinc-950 font-black text-[10px] text-zinc-950 shadow-[2px_2px_0px_#09090b]">
                  {profile.handle}
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2 font-mono text-xs font-bold text-zinc-950">
              <a
                href="#hero"
                className="px-3 py-1.5 rounded-lg hover:bg-[#FDE047] border-2 border-transparent hover:border-zinc-950 transition-all"
              >
                01.HOME
              </a>
              <a
                href="#projects"
                className="px-3 py-1.5 rounded-lg hover:bg-[#38BDF8] border-2 border-transparent hover:border-zinc-950 transition-all"
              >
                02.WORKS
              </a>
              <a
                href="#stack"
                className="px-3 py-1.5 rounded-lg hover:bg-[#C084FC] border-2 border-transparent hover:border-zinc-950 transition-all"
              >
                03.STACK
              </a>
              <a
                href="#experience"
                className="px-3 py-1.5 rounded-lg hover:bg-[#4ADE80] border-2 border-transparent hover:border-zinc-950 transition-all"
              >
                04.JOURNEY
              </a>
              <a
                href="#contact"
                className="px-3 py-1.5 rounded-lg hover:bg-[#FF5E5B] hover:text-white border-2 border-transparent hover:border-zinc-950 transition-all"
              >
                05.CONTACT
              </a>
            </nav>

            <button
              type="button"
              onClick={rebuildAll}
              className="brutal-btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FDE047] text-zinc-950 font-mono text-xs font-black uppercase cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Replay Build</span>
            </button>
          </div>
        </div>
      </SwarmBuildBlock>
    </header>
  );
}
