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
    <header className="sticky top-0 z-30" data-interactive="true">
      <SwarmBuildBlock
        id="navbar-top-frame"
        label="NAVBAR // STUDIO_HEADER"
        accentColor="#FDE047"
        autoBuildOnMount={true}
        delayMs={0}
      >
        <div className="border-b-2 border-zinc-900 bg-[#FBF9F4]/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3" data-subitem="true">
              <div className="w-9 h-9 rounded-lg overflow-hidden border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] bg-[#FDE047]">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
                <span className="font-bold text-zinc-900 tracking-tight">
                  {profile.name}
                </span>
                <span className="px-2 py-0.5 bg-[#FDE047] border border-zinc-900 font-bold text-[10px] text-zinc-900 shadow-[1.5px_1.5px_0px_#18181b]">
                  {profile.handle}
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-700">
              <a
                href="#hero"
                className="px-3 py-1.5 rounded-md hover:text-zinc-950 hover:bg-zinc-200/70 transition-colors"
              >
                01. About
              </a>
              <a
                href="#projects"
                className="px-3 py-1.5 rounded-md hover:text-zinc-950 hover:bg-zinc-200/70 transition-colors"
              >
                02. Works
              </a>
              <a
                href="#stack"
                className="px-3 py-1.5 rounded-md hover:text-zinc-950 hover:bg-zinc-200/70 transition-colors"
              >
                03. Stack
              </a>
              <a
                href="#experience"
                className="px-3 py-1.5 rounded-md hover:text-zinc-950 hover:bg-zinc-200/70 transition-colors"
              >
                04. Timeline
              </a>
              <a
                href="#contact"
                className="px-3 py-1.5 rounded-md hover:text-zinc-950 hover:bg-zinc-200/70 transition-colors"
              >
                05. Contact
              </a>
            </nav>

            <button
              type="button"
              onClick={rebuildAll}
              className="brutal-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FDE047] text-zinc-900 font-mono text-xs font-bold uppercase cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Build</span>
            </button>
          </div>
        </div>
      </SwarmBuildBlock>
    </header>
  );
}
