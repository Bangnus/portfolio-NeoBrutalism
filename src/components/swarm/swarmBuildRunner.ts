import { BlockRegistration, LiveAgentState } from "./swarmTypes";
import {
  prepareBlockSubItems,
  updateSubItemsAtProgress,
  restoreAllSubItems,
  SubItemState,
} from "./subItemBuilder";

const blockSubItemsCache = new Map<string, SubItemState[]>();

export function clearSubItemsCacheForBlock(id: string) {
  const cached = blockSubItemsCache.get(id);
  if (cached) {
    for (const item of cached) {
      item.el.style.opacity = "0";
      item.el.style.transform = "scale(0.92) translateY(8px)";
      item.el.style.outline = "";
    }
  }
}

export function runBlockBuildStep(
  id: string,
  force: boolean,
  blocksMap: Map<string, BlockRegistration>,
  agents: LiveAgentState[],
  timersMap: Map<string, number>,
  syncCounts: () => void
) {
  const block = blocksMap.get(id);
  if (!block || !block.element) return;
  if (!force && (block.state === "building" || block.state === "built")) return;

  const existingTimer = timersMap.get(id);
  if (existingTimer) {
    cancelAnimationFrame(existingTimer);
    timersMap.delete(id);
  }

  const rect = block.element.getBoundingClientRect();
  block.dimensions = {
    width: Math.round(rect.width || 320),
    height: Math.round(rect.height || 180),
    x: Math.round(rect.left),
    y: Math.round(rect.top),
  };

  // Prepare sub-elements inside this block for from-scratch construction
  const subItems = prepareBlockSubItems(block.element);
  blockSubItemsCache.set(id, subItems);

  const available = agents.filter(
    (a) => a.state !== "building" || a.targetBlockId === id
  );
  const pool = available.length >= 2 ? available : agents;
  const hash = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const assigned: LiveAgentState[] = [];
  const numToAssign = Math.min(pool.length, 5);

  for (let i = 0; i < numToAssign; i++) {
    const picked = pool[(hash + i) % pool.length];
    if (picked && !assigned.includes(picked)) {
      assigned.push(picked);
    }
  }

  const assignedConfigs = assigned.map((a) => a.config);
  block.state = "building";
  block.progress = 0;
  block.assignedAgents = assigned.map((a) => a.config.id);

  assigned.forEach((agent, idx) => {
    agent.state = "building";
    agent.targetBlockId = id;
    agent.targetElement = subItems[idx % subItems.length]?.el || block.element;
    agent.cornerIndex = idx % 5;
  });

  syncCounts();

  const startTime = performance.now();
  // Slightly longer duration when there are many sub-elements so you see cursors typing/assembling each piece
  const duration = Math.min(1850, Math.max(900, 620 + subItems.length * 95));

  const step = (now: number) => {
    const currentBlock = blocksMap.get(id);
    if (!currentBlock) return;

    const elapsed = now - startTime;
    const rawProgress = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - rawProgress, 2.4);

    currentBlock.progress = eased;

    // Update sub-elements (reveal, outline, typewriter scramble) and get currently active sub-elements
    const activeSubEls = updateSubItemsAtProgress(
      subItems,
      eased,
      currentBlock.accentColor || "#FDE047"
    );

    // Direct each assigned cursor to a currently building sub-element!
    if (activeSubEls.length > 0) {
      assigned.forEach((ag, idx) => {
        if (ag.targetBlockId === id) {
          ag.targetElement = activeSubEls[idx % activeSubEls.length];
        }
      });
    }

    currentBlock.onProgress?.(
      eased,
      rawProgress < 1 ? "building" : "built",
      assignedConfigs
    );

    if (rawProgress < 1) {
      timersMap.set(id, requestAnimationFrame(step));
    } else {
      restoreAllSubItems(subItems);
      currentBlock.state = "built";
      currentBlock.progress = 1;
      currentBlock.assignedAgents = [];
      timersMap.delete(id);

      agents.forEach((a) => {
        if (a.targetBlockId === id) {
          a.state = "orbit";
          a.targetBlockId = null;
          a.targetElement = null;
        }
      });

      currentBlock.onProgress?.(1, "built", assignedConfigs);
      syncCounts();
    }
  };

  timersMap.set(id, requestAnimationFrame(step));
}
