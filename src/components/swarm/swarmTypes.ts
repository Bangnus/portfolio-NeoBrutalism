import React from "react";
import { AgentConfig } from "@/data/portfolio";

export type BlockBuildState = "unbuilt" | "building" | "built";

export interface BlockRegistration {
  id: string;
  label: string;
  category?: string;
  accentColor?: string;
  element: HTMLElement | null;
  state: BlockBuildState;
  progress: number;
  assignedAgents: string[];
  dimensions: { width: number; height: number; x: number; y: number };
  onProgress?: (
    progress: number,
    state: BlockBuildState,
    agents: AgentConfig[]
  ) => void;
}

export interface LiveAgentState {
  config: AgentConfig;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  state: "orbit" | "building" | "summoned";
  targetBlockId: string | null;
  targetElement: HTMLElement | null;
  actionText: string;
  cornerIndex: number;
}

export interface SwarmContextValue {
  agentCount: number;
  setAgentCount: (count: number) => void;
  inspectMode: boolean;
  setInspectMode: React.Dispatch<React.SetStateAction<boolean>>;
  threeEnabled: boolean;
  setThreeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  buildGeneration: number;
  builtCount: number;
  totalBlocks: number;
  activeBuildingCount: number;
  registerBlock: (
    id: string,
    label: string,
    element: HTMLElement,
    accentColor?: string,
    onProgress?: (
      progress: number,
      state: BlockBuildState,
      agents: AgentConfig[]
    ) => void
  ) => void;
  unregisterBlock: (id: string) => void;
  triggerBlockBuild: (id: string, force?: boolean) => void;
  rebuildAll: () => void;
  instantBuildAll: () => void;
  summonSwarmAt: (x: number, y: number) => void;
  blocksRef: React.MutableRefObject<Map<string, BlockRegistration>>;
  agentsRef: React.MutableRefObject<LiveAgentState[]>;
  mouseRef: React.MutableRefObject<{
    x: number;
    y: number;
    worldX: number;
    worldY: number;
    active: boolean;
  }>;
  summonTargetRef: React.MutableRefObject<{
    x: number;
    y: number;
    until: number;
  } | null>;
}
