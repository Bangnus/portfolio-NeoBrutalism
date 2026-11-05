"use client";

import React from "react";
import { BlockBuildState } from "./swarmTypes";

interface SelectionBoxOverlayProps {
  label: string;
  accentColor: string;
  buildState: BlockBuildState;
  progress: number;
  inspectMode: boolean;
  dims: { w: number; h: number };
  currentW: number;
  currentH: number;
}

export function SelectionBoxOverlay({
  label,
  accentColor,
  buildState,
  progress,
  inspectMode,
  currentW,
  currentH,
}: SelectionBoxOverlayProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
      aria-hidden="true"
    >
      {(buildState === "building" || inspectMode) && (
        <div
          className="absolute top-0 left-0 transition-none"
          style={{
            width:
              inspectMode && buildState === "built"
                ? "100%"
                : `${Math.max(12, progress * 100)}%`,
            height:
              inspectMode && buildState === "built"
                ? "100%"
                : `${Math.max(12, Math.min(1, progress * 1.15) * 100)}%`,
            border: "3px solid #09090b",
            backgroundColor:
              buildState === "building"
                ? `${accentColor}22`
                : "rgba(253, 224, 71, 0.08)",
            boxShadow:
              buildState === "building" ? "5px 5px 0px 0px #09090b" : "none",
          }}
        >
          {/* 4 Bold Neo-Brutalist Corner Resize Squares */}
          <span
            className="absolute -top-2 -left-2 w-3.5 h-3.5 border-2 border-zinc-950"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="absolute -top-2 -right-2 w-3.5 h-3.5 border-2 border-zinc-950"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="absolute -bottom-2 -left-2 w-3.5 h-3.5 border-2 border-zinc-950"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="absolute -bottom-2 -right-2 w-3.5 h-3.5 border-2 border-zinc-950"
            style={{ backgroundColor: accentColor }}
          />

          {/* Top-Left Neo-Brutalist Label Badge */}
          <div
            className="absolute -top-7 left-0 flex items-center gap-1.5 px-2.5 py-0.5 border-2 border-zinc-950 text-[10px] font-mono font-black tracking-wider uppercase whitespace-nowrap text-zinc-950 shadow-[2px_2px_0px_#09090b]"
            style={{ backgroundColor: accentColor }}
          >
            <span>{label}</span>
            {buildState === "building" && (
              <span>· {Math.round(progress * 100)}%</span>
            )}
          </div>

          {/* Bottom-Right Pixel Dimensions Tag (px × px) */}
          <div className="absolute -bottom-7 right-0 px-2.5 py-0.5 bg-[#FDE047] border-2 border-zinc-950 font-mono text-[10px] font-black text-zinc-950 tracking-tight whitespace-nowrap shadow-[2px_2px_0px_#09090b]">
            {currentW} × {currentH} px
          </div>
        </div>
      )}
    </div>
  );
}
