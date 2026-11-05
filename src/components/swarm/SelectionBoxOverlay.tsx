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
  buildState,
  progress,
  inspectMode,
  currentW,
  currentH,
}: SelectionBoxOverlayProps) {
  const isBuilding = buildState === "building";
  const showBox = isBuilding || inspectMode;
  if (!showBox) return null;

  // Snappy frame expansion in first 35% of progress, followed by slow typing
  const expansionP = Math.min(1, progress / 0.38);
  const boxW = inspectMode && buildState === "built" ? 100 : Math.max(12, expansionP * 100);
  const boxH = inspectMode && buildState === "built" ? 100 : Math.max(12, expansionP * 100);

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-visible" aria-hidden="true">
      {/* 1. Figma Gray Wireframe Placeholder during early resize */}
      {isBuilding && progress < 0.35 && (
        <div
          className="absolute top-0 left-0 bg-[#E5E5E5] border border-dashed border-[#A3A3A3] rounded-md transition-none flex items-center justify-center"
          style={{ width: `${boxW}%`, height: `${boxH}%` }}
        >
          <span className="text-[10px] font-mono font-medium text-[#737373]">
            {Math.round(boxW)}%
          </span>
        </div>
      )}

      {/* 2. Signature Figma Blue Selection Box with 8 Resize Handles */}
      <div
        className="absolute top-0 left-0 transition-none"
        style={{
          width: `${boxW}%`,
          height: `${boxH}%`,
          border: "1.5px solid #0D99FF",
          backgroundColor: isBuilding ? "rgba(13, 153, 255, 0.04)" : "transparent",
        }}
      >
        <span className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#0D99FF] shadow-xs" />
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-[#0D99FF] shadow-xs" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#0D99FF] shadow-xs" />
        <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white border border-[#0D99FF] shadow-xs" />
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white border border-[#0D99FF] shadow-xs" />
        <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#0D99FF] shadow-xs" />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-[#0D99FF] shadow-xs" />
        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#0D99FF] shadow-xs" />

        {/* Figma Frame Name Tag */}
        <div className="absolute -top-5 left-0 flex items-center gap-1 text-[11px] font-sans font-medium text-[#0D99FF] whitespace-nowrap">
          <span className="font-mono text-[9px] opacity-70">#</span>
          <span>{label}</span>
        </div>

        {/* Figma Dimension Tooltip (W: ... H: ...) */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-sm bg-[#0D99FF] font-mono text-[10px] font-medium text-white shadow-sm whitespace-nowrap">
          W: {currentW} &nbsp; H: {currentH}
        </div>
      </div>

      {/* 3. Figma Pink Smart Guides Spacing Indicators */}
      {isBuilding && progress > 0.32 && progress < 0.88 && (
        <>
          <div className="absolute -top-4 right-0 flex items-center gap-1 font-mono text-[9px] font-semibold text-[#F43F5E]">
            <span className="h-[1px] w-6 bg-[#F43F5E]" />
            <span>24px</span>
            <span className="h-[1px] w-6 bg-[#F43F5E]" />
          </div>
          <div className="absolute top-1/2 -right-7 -translate-y-1/2 flex flex-col items-center gap-0.5 font-mono text-[9px] font-semibold text-[#F43F5E]">
            <span className="w-[1px] h-4 bg-[#F43F5E]" />
            <span>16</span>
            <span className="w-[1px] h-4 bg-[#F43F5E]" />
          </div>
        </>
      )}
    </div>
  );
}
