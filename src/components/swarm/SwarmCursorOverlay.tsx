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
      {/* Construction Vector Lines when building blocks */}
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: agentCount }).map((_, idx) => {
          const color = activeAgents[idx]?.config.color || "#FF5E5B";
          return (
            <line
              key={`laser-${idx}`}
              ref={(el) => {
                laserLinesRef.current[idx] = el;
              }}
              stroke="#09090b"
              strokeWidth="1.75"
              strokeDasharray="5 4"
              style={{ opacity: 0, transition: "opacity 150ms ease" }}
            />
          );
        })}
      </svg>

      {/* Neo-Brutalist Click Summon Ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-zinc-950 bg-[#FDE047]/40 animate-ping"
          style={{
            left: r.x,
            top: r.y,
            width: 56,
            height: 56,
            animationDuration: "800ms",
          }}
        />
      ))}

      {/* Clean Pointer-Only Swarm Cursors (No text labels blocking content) */}
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
            className="absolute top-0 left-0 will-change-transform select-none"
            style={{ transform: "translate3d(-200px, -200px, 0)" }}
          >
            <svg
              width="24"
              height="26"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: "drop-shadow(3px 3px 0px #09090b)",
              }}
            >
              <path
                d="M2.5 2.1L20.4 10.6C21.5 11.1 21.4 12.7 20.2 13.1L12.1 15.6L8.4 23.3C7.9 24.4 6.3 24.1 6.1 22.9L1.2 3.6C1.0 2.5 1.7 1.7 2.5 2.1Z"
                fill={cfg.color}
                stroke="#09090b"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
