import { BlockRegistration, LiveAgentState } from "./swarmTypes";

export function updateAgentsPhysicsFrame(
  now: number,
  lastTime: number,
  startTime: number,
  agents: LiveAgentState[],
  blocksMap: Map<string, BlockRegistration>,
  mouse: { x: number; y: number },
  summon: { x: number; y: number; until: number } | null,
  cursorNodes: (HTMLDivElement | null)[],
  laserLines: (SVGLineElement | null)[]
) {
  const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) * 0.001));
  const t = (now - startTime) * 0.001;
  const isSummonActive = summon && now < summon.until;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  for (let i = 0; i < agents.length; i++) {
    const agent = agents[i];
    let tx = mouse.x;
    let ty = mouse.y;
    let laserEndX: number | null = null;
    let laserEndY: number | null = null;

    if (agent.state === "building" && agent.targetBlockId) {
      const block = blocksMap.get(agent.targetBlockId);
      if (block && block.element) {
        const rect = block.element.getBoundingClientRect();
        const p = block.progress;
        const curW = Math.max(36, rect.width * p);
        const curH = Math.max(28, rect.height * Math.min(1, p * 1.15));

        if (agent.cornerIndex === 0) {
          // Primary frame builder dragging bottom-right corner of the card
          tx = rect.left + curW;
          ty = rect.top + curH;
          laserEndX = rect.left;
          laserEndY = rect.top;
        } else if (agent.targetElement) {
          // Other cursors dart directly onto the individual sub-elements (text, image, buttons) being typed/assembled!
          const subRect = agent.targetElement.getBoundingClientRect();
          const sweep = 0.2 + 0.65 * ((Math.sin(t * 7 + i * 2) + 1) * 0.5);
          tx = subRect.left + subRect.width * sweep;
          ty = subRect.top + subRect.height * 0.55;
          laserEndX = subRect.left;
          laserEndY = subRect.top;
        } else {
          tx = rect.left + curW * 0.5;
          ty = rect.top + curH;
          laserEndX = rect.left + curW;
          laserEndY = rect.top;
        }
      } else {
        agent.state = "orbit";
        agent.targetBlockId = null;
        agent.targetElement = null;
      }
    } else if (isSummonActive && summon) {
      const angle = (i / agents.length) * Math.PI * 2 + t * 2.2;
      const radius = 32 + (i % 3) * 16;
      tx = summon.x + Math.cos(angle) * radius;
      ty = summon.y + Math.sin(angle) * radius;
      laserEndX = summon.x;
      laserEndY = summon.y;
    } else {
      if (agent.state === "summoned") {
        agent.state = "orbit";
      }
      const phase = (i / agents.length) * Math.PI * 2;
      const speed = 0.85 + (i % 3) * 0.15;
      const rX = 52 + (i % 4) * 20;
      const rY = 44 + (i % 3) * 18;
      tx =
        mouse.x +
        Math.cos(t * speed + phase) * rX +
        Math.sin(t * 0.45 + i) * 12;
      ty =
        mouse.y +
        Math.sin(t * speed * 1.15 + phase) * rY +
        Math.cos(t * 0.5 + i) * 12;
    }

    // Soft Boids separation so cursors never overlap
    for (let j = 0; j < agents.length; j++) {
      if (i === j) continue;
      const other = agents[j];
      const dx = agent.x - other.x;
      const dy = agent.y - other.y;
      const distSq = dx * dx + dy * dy;
      if (distSq > 0.1 && distSq < 900) {
        const dist = Math.sqrt(distSq);
        const push = ((30 - dist) / 30) * 18;
        tx += (dx / dist) * push;
        ty += (dy / dist) * push;
      }
    }

    tx = Math.max(16, Math.min(vw - 28, tx));
    ty = Math.max(16, Math.min(vh - 28, ty));
    agent.targetX = tx;
    agent.targetY = ty;

    // Frame-rate independent critically-damped spring interpolation
    const omega = agent.state === "building" ? 20.0 : 10.5;
    const exp = Math.exp(-omega * dt);

    const deltaX = agent.x - tx;
    const deltaY = agent.y - ty;

    const tempX = (agent.vx + omega * deltaX) * dt;
    const tempY = (agent.vy + omega * deltaY) * dt;

    agent.vx = (agent.vx - omega * tempX) * exp;
    agent.vy = (agent.vy - omega * tempY) * exp;

    agent.x = tx + (deltaX + tempX) * exp;
    agent.y = ty + (deltaY + tempY) * exp;

    const tilt = Math.max(-22, Math.min(22, agent.vx * 0.032));
    const node = cursorNodes[i];
    if (node) {
      node.style.transform = `translate3d(${agent.x.toFixed(2)}px, ${agent.y.toFixed(
        2
      )}px, 0) rotate(${tilt.toFixed(2)}deg)`;
    }

    const laserNode = laserLines[i];
    if (laserNode) {
      if (laserEndX !== null && laserEndY !== null) {
        laserNode.setAttribute("x1", agent.x.toFixed(1));
        laserNode.setAttribute("y1", agent.y.toFixed(1));
        laserNode.setAttribute("x2", laserEndX.toFixed(1));
        laserNode.setAttribute("y2", laserEndY.toFixed(1));
        laserNode.style.opacity = "0.75";
      } else {
        laserNode.style.opacity = "0";
      }
    }
  }
}
