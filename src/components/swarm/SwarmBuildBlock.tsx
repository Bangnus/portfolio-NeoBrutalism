"use client";

import React, { useEffect, useRef, useState } from "react";
import { BlockBuildState, useSwarm } from "./SwarmContext";
import { SelectionBoxOverlay } from "./SelectionBoxOverlay";

interface SwarmBuildBlockProps {
  id: string;
  label: string;
  accentColor?: string;
  className?: string;
  delayMs?: number;
  autoBuildOnMount?: boolean;
  children: React.ReactNode;
}

export function SwarmBuildBlock({
  id,
  label,
  accentColor = "#FDE047",
  className = "",
  delayMs = 0,
  autoBuildOnMount = false,
  children,
}: SwarmBuildBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    registerBlock,
    unregisterBlock,
    triggerBlockBuild,
    inspectMode,
    buildGeneration,
  } = useSwarm();

  const [buildState, setBuildState] = useState<BlockBuildState>("unbuilt");
  const [progress, setProgress] = useState<number>(0);
  const [dims, setDims] = useState<{ w: number; h: number }>({ w: 420, h: 220 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      setDims({
        w: Math.max(120, Math.round(rect.width)),
        h: Math.max(64, Math.round(rect.height)),
      });
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    registerBlock(id, label, el, accentColor, (nextP, nextState) => {
      setProgress(nextP);
      setBuildState(nextState);
    });
    return () => unregisterBlock(id);
  }, [id, label, accentColor, registerBlock, unregisterBlock]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (autoBuildOnMount) {
      timeoutId = setTimeout(() => triggerBlockBuild(id), 80 + delayMs);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = setTimeout(() => triggerBlockBuild(id), delayMs);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -4% 0px" }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [id, delayMs, autoBuildOnMount, triggerBlockBuild, buildGeneration]);

  const currentW = Math.round(
    dims.w * (buildState === "built" ? 1 : Math.max(0.12, progress))
  );
  const currentH = Math.round(
    dims.h * (buildState === "built" ? 1 : Math.max(0.12, progress))
  );
  const showSelectionBox = buildState === "building" || inspectMode;

  // Complete blank-canvas invisibility when "unbuilt" -> revealed from 0 to 100% as cursors build it!
  const isUnbuilt = buildState === "unbuilt";
  const clipRight =
    buildState === "built" ? 0 : Math.max(0, 100 - progress * 100);
  const clipBottom =
    buildState === "built" ? 0 : Math.max(0, 100 - Math.min(1, progress * 1.15) * 100);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => isUnbuilt && triggerBlockBuild(id)}
      className={`relative group/block ${className}`}
      data-block-id={id}
    >
      {showSelectionBox && (
        <SelectionBoxOverlay
          label={label}
          accentColor={accentColor}
          buildState={buildState}
          progress={progress}
          inspectMode={inspectMode}
          dims={dims}
          currentW={currentW}
          currentH={currentH}
        />
      )}

      {inspectMode && buildState === "built" && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            triggerBlockBuild(id, true);
          }}
          className="absolute top-3 right-3 z-30 px-2.5 py-1 bg-[#FDE047] hover:bg-[#FF5E5B] text-zinc-950 hover:text-white border-2 border-zinc-950 shadow-[2px_2px_0px_#09090b] font-mono text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
          data-interactive="true"
        >
          ↻ Rebuild Frame
        </button>
      )}

      <div
        className="w-full h-full will-change-transform"
        style={{
          opacity: isUnbuilt ? 0 : 1,
          pointerEvents: isUnbuilt ? "none" : "auto",
          clipPath:
            buildState === "building"
              ? `inset(-12px ${clipRight.toFixed(1)}% ${clipBottom.toFixed(1)}% -12px)`
              : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
