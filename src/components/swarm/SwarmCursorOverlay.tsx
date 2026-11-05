"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSwarm } from "./SwarmContext";
import { updateAgentsPhysicsFrame } from "./swarmCursorPhysics";

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export function SwarmCursorOverlay() {
  const {
    agentCount,
    agentsRef,
    blocksRef,
    mouseRef,
    summonTargetRef,
    summonSwarmAt,
  } = useSwarm();

  const cursorNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const laserLinesRef = useRef<(SVGLineElement | null)[]>([]);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        "button, a, input, textarea, select, [data-interactive='true']"
      );
      if (!isInteractive) {
        summonSwarmAt(e.clientX, e.clientY);
        const rippleId = Date.now() + Math.random();
        setRipples((prev) => [
          ...prev.slice(-3),
          { id: rippleId, x: e.clientX, y: e.clientY },
        ]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== rippleId));
        }, 850);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleCanvasClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleCanvasClick);
    };
  }, [mouseRef, summonSwarmAt]);

  useEffect(() => {
    let rafId: number;
    const startTime = performance.now();
    let lastTime = startTime;

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      updateAgentsPhysicsFrame(
        now,
        lastTime,
        startTime,
        agentsRef.current,
        blocksRef.current,
        mouseRef.current,
        summonTargetRef.current,
        cursorNodesRef.current,
        laserLinesRef.current
      );
      lastTime = now;
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [agentCount, agentsRef, blocksRef, mouseRef, summonTargetRef]);

  const activeAgents = agentsRef.current.slice(0, agentCount);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Figma Alignment Guide Vectors */}
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: agentCount }).map((_, idx) => (
          <line
            key={`laser-${idx}`}
            ref={(el) => {
              laserLinesRef.current[idx] = el;
            }}
            stroke="#0D99FF"
            strokeWidth="1.25"
            strokeDasharray="3 3"
            style={{ opacity: 0, transition: "opacity 120ms ease" }}
          />
        ))}
      </svg>

      {/* Figma Click Ripple */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0D99FF] bg-[#0D99FF]/20 animate-ping"
          style={{
            left: r.x,
            top: r.y,
            width: 48,
            height: 48,
            animationDuration: "750ms",
          }}
        />
      ))}

      {/* Authentic Figma Multiplayer Cursors */}
      {Array.from({ length: agentCount }).map((_, idx) => {
        const agent = activeAgents[idx];
        const cfg = agent?.config;
        if (!cfg) return null;

        return (
          <div
            key={cfg.id}
            ref={(el) => {
              cursorNodesRef.current[idx] = el;
            }}
            className="absolute top-0 left-0 will-change-transform select-none flex items-start"
            style={{ transform: "translate3d(-200px, -200px, 0)" }}
          >
            {/* Figma Sharp Arrow */}
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-sm shrink-0"
            >
              <path
                d="M1.5 1.2L15.6 8.5C16.4 8.9 16.3 10.1 15.5 10.4L9.4 12.3L6.4 18.5C6.0 19.3 4.8 19.1 4.6 18.2L1.0 2.2C0.8 1.4 1.3 0.8 1.5 1.2Z"
                fill={cfg.color}
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            {/* Figma Multiplayer Name Pill */}
            <div
              className="ml-1 px-1.5 py-0.5 rounded-sm text-[10px] font-sans font-semibold text-white shadow-sm whitespace-nowrap leading-none mt-2"
              style={{ backgroundColor: cfg.color }}
            >
              {cfg.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
