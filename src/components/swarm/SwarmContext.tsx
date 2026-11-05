"use client";

import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import { SWARM_AGENTS, AgentConfig } from "@/data/portfolio";
import { BlockBuildState, BlockRegistration, LiveAgentState, SwarmContextValue } from "./swarmTypes";
import { runBlockBuildStep, clearSubItemsCacheForBlock } from "./swarmBuildRunner";

export * from "./swarmTypes";

const SwarmContext = createContext<SwarmContextValue | null>(null);

export function SwarmProvider({ children }: { children: React.ReactNode }) {
  const [agentCount, setAgentCountState] = useState<number>(5);
  const [inspectMode, setInspectMode] = useState<boolean>(false);
  const [threeEnabled, setThreeEnabled] = useState<boolean>(false);
  const [buildGeneration, setBuildGeneration] = useState<number>(1);
  const [builtCount, setBuiltCount] = useState<number>(0);
  const [totalBlocks, setTotalBlocks] = useState<number>(0);
  const [activeBuildingCount, setActiveBuildingCount] = useState<number>(0);

  const blocksRef = useRef<Map<string, BlockRegistration>>(new Map());
  const agentsRef = useRef<LiveAgentState[]>([]);
  const mouseRef = useRef({ x: 600, y: 400, worldX: 0, worldY: 0, active: false });
  const summonTargetRef = useRef<{ x: number; y: number; until: number } | null>(null);
  const timersRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const current = agentsRef.current;
    const next: LiveAgentState[] = [];
    const startX = typeof window !== "undefined" ? window.innerWidth * 0.5 : 600;
    const startY = typeof window !== "undefined" ? window.innerHeight * 0.35 : 350;

    for (let i = 0; i < agentCount; i++) {
      const cfg = SWARM_AGENTS[i % SWARM_AGENTS.length];
      if (current[i]) {
        next.push(current[i]);
      } else {
        const angle = (i / agentCount) * Math.PI * 2;
        next.push({
          config: cfg,
          x: startX + Math.cos(angle) * 100,
          y: startY + Math.sin(angle) * 100,
          targetX: startX + Math.cos(angle) * 80,
          targetY: startY + Math.sin(angle) * 80,
          vx: 0,
          vy: 0,
          state: "orbit",
          targetBlockId: null,
          targetElement: null,
          actionText: "",
          cornerIndex: i % 5,
        });
      }
    }
    agentsRef.current = next;
  }, [agentCount]);

  const syncCounts = useCallback(() => {
    let built = 0;
    let building = 0;
    blocksRef.current.forEach((b) => {
      if (b.state === "built") built++;
      if (b.state === "building") building++;
    });
    setBuiltCount(built);
    setTotalBlocks(blocksRef.current.size);
    setActiveBuildingCount(building);
  }, []);

  const setAgentCount = useCallback((count: number) => {
    setAgentCountState(Math.max(1, Math.min(8, count)));
  }, []);

  const registerBlock = useCallback(
    (
      id: string,
      label: string,
      element: HTMLElement,
      accentColor = "#FDE047",
      onProgress?: (progress: number, state: BlockBuildState, agents: AgentConfig[]) => void
    ) => {
      const rect = element.getBoundingClientRect();
      const existing = blocksRef.current.get(id);
      blocksRef.current.set(id, {
        id,
        label,
        accentColor,
        element,
        state: existing ? existing.state : "unbuilt",
        progress: existing ? existing.progress : 0,
        assignedAgents: existing ? existing.assignedAgents : [],
        dimensions: {
          width: Math.round(rect.width || 320),
          height: Math.round(rect.height || 180),
          x: Math.round(rect.left),
          y: Math.round(rect.top),
        },
        onProgress,
      });
      syncCounts();
    },
    [syncCounts]
  );

  const unregisterBlock = useCallback(
    (id: string) => {
      blocksRef.current.delete(id);
      const timer = timersRef.current.get(id);
      if (timer) {
        cancelAnimationFrame(timer);
        timersRef.current.delete(id);
      }
      syncCounts();
    },
    [syncCounts]
  );

  const triggerBlockBuild = useCallback(
    (id: string, force = false) => {
      runBlockBuildStep(id, force, blocksRef.current, agentsRef.current, timersRef.current, syncCounts);
    },
    [syncCounts]
  );

  const rebuildAll = useCallback(() => {
    timersRef.current.forEach((raf) => cancelAnimationFrame(raf));
    timersRef.current.clear();
    agentsRef.current.forEach((a) => {
      a.state = "orbit";
      a.targetBlockId = null;
    });

    const visibleIds: string[] = [];
    blocksRef.current.forEach((block, id) => {
      block.state = "unbuilt";
      block.progress = 0;
      block.assignedAgents = [];
      clearSubItemsCacheForBlock(id);
      block.onProgress?.(0, "unbuilt", []);
      if (block.element) {
        const rect = block.element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) visibleIds.push(id);
      }
    });

    setBuildGeneration((g) => g + 1);
    syncCounts();
    visibleIds.forEach((id, idx) => setTimeout(() => triggerBlockBuild(id, true), 90 + idx * 140));
  }, [syncCounts, triggerBlockBuild]);

  const instantBuildAll = useCallback(() => {
    timersRef.current.forEach((raf) => cancelAnimationFrame(raf));
    timersRef.current.clear();
    agentsRef.current.forEach((a) => {
      a.state = "orbit";
      a.targetBlockId = null;
    });
    blocksRef.current.forEach((block) => {
      block.state = "built";
      block.progress = 1;
      block.assignedAgents = [];
      block.onProgress?.(1, "built", []);
    });
    syncCounts();
  }, [syncCounts]);

  const summonSwarmAt = useCallback((x: number, y: number) => {
    summonTargetRef.current = { x, y, until: performance.now() + 1400 };
    agentsRef.current.forEach((agent) => {
      if (agent.state !== "building") agent.state = "summoned";
    });
  }, []);

  return (
    <SwarmContext.Provider
      value={{
        agentCount, setAgentCount, inspectMode, setInspectMode, threeEnabled, setThreeEnabled,
        buildGeneration, builtCount, totalBlocks, activeBuildingCount, registerBlock,
        unregisterBlock, triggerBlockBuild, rebuildAll, instantBuildAll, summonSwarmAt,
        blocksRef, agentsRef, mouseRef, summonTargetRef,
      }}
    >
      {children}
    </SwarmContext.Provider>
  );
}

export function useSwarm() {
  const ctx = useContext(SwarmContext);
  if (!ctx) throw new Error("useSwarm must be used within a SwarmProvider");
  return ctx;
}
