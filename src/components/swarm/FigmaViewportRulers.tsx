"use client";

import React, { useEffect, useState } from "react";
import { useSwarm } from "./SwarmContext";

export function FigmaViewportRulers() {
  const { activeBuildingCount, inspectMode, mouseRef, agentsRef } = useSwarm();
  const [vw, setVw] = useState(1280);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    const handleResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isVisible = activeBuildingCount > 0 || inspectMode;

  // Active guide position from primary building agent or mouse
  const primaryAgent = agentsRef.current.find((a) => a.state === "building") || agentsRef.current[0];
  const guideX = primaryAgent ? Math.round(primaryAgent.x) : Math.round(mouseRef.current.x);
  const guideY = primaryAgent ? Math.round(primaryAgent.y) : Math.round(mouseRef.current.y);

  // Generate tick marks across screen width and height
  const hTicks: number[] = [];
  for (let x = 0; x < vw; x += 50) hTicks.push(x);

  const vTicks: number[] = [];
  for (let y = 0; y < vh; y += 50) vTicks.push(y);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-40 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Top Edge Horizontal Ruler Bar */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#F5F5F5] border-b border-zinc-400 text-[8px] font-mono text-zinc-600 shadow-xs overflow-hidden select-none">
        {hTicks.map((x) => (
          <div key={x} className="absolute bottom-0 flex flex-col items-center" style={{ left: `${x}px` }}>
            {x % 100 === 0 && <span className="leading-none text-[7px] mb-0.5">{x}</span>}
            <span className={`w-[1px] bg-zinc-500 ${x % 100 === 0 ? "h-2 bg-zinc-800" : "h-1"}`} />
          </div>
        ))}
        {/* Active Blue Position Marker on Top Ruler */}
        <div
          className="absolute top-0 bottom-0 w-[1.5px] bg-[#0D99FF] transition-all duration-75"
          style={{ left: `${guideX}px` }}
        />
      </div>

      {/* 2. Left Edge Vertical Ruler Bar */}
      <div className="absolute top-0 left-0 bottom-0 w-4 bg-[#F5F5F5] border-r border-zinc-400 text-[8px] font-mono text-zinc-600 shadow-xs overflow-hidden select-none">
        {vTicks.map((y) => (
          <div key={y} className="absolute right-0 flex items-center" style={{ top: `${y}px` }}>
            {y % 100 === 0 && <span className="leading-none text-[7px] mr-0.5">{y}</span>}
            <span className={`h-[1px] bg-zinc-500 ${y % 100 === 0 ? "w-2 bg-zinc-800" : "w-1"}`} />
          </div>
        ))}
        {/* Active Blue Position Marker on Left Ruler */}
        <div
          className="absolute left-0 right-0 h-[1.5px] bg-[#0D99FF] transition-all duration-75"
          style={{ top: `${guideY}px` }}
        />
      </div>

      {/* Top-Left Corner Origin Square */}
      <div className="absolute top-0 left-0 w-4 h-4 bg-[#E5E5E5] border-r border-b border-zinc-400 z-10 flex items-center justify-center font-mono text-[7px] text-zinc-600">
        px
      </div>

      {/* 3. Screen-wide Snapping Blue Guide Lines */}
      {isVisible && (
        <>
          <div
            className="absolute top-4 bottom-0 w-[1px] bg-[#0D99FF]/40 border-r border-dashed border-[#0D99FF] transition-all duration-75"
            style={{ left: `${guideX}px` }}
          />
          <div
            className="absolute left-4 right-0 h-[1px] bg-[#0D99FF]/40 border-b border-dashed border-[#0D99FF] transition-all duration-75"
            style={{ top: `${guideY}px` }}
          />
        </>
      )}
    </div>
  );
}

