const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$*+=-";

export interface SubItemState {
  el: HTMLElement;
  originalBg: string;
  textNodes: { node: Text; originalText: string }[];
  status: "hidden" | "building" | "done";
  agentIndex: number;
  startAt: number;
  endAt: number;
}

function collectTextNodes(root: HTMLElement): { node: Text; originalText: string }[] {
  const result: { node: Text; originalText: string }[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    const txt = current.nodeValue || "";
    if (txt.trim().length > 0) {
      result.push({ node: current as Text, originalText: txt });
    }
    current = walker.nextNode();
  }
  return result;
}

export function prepareBlockSubItems(container: HTMLElement): SubItemState[] {
  // Collect granular children inside the block so each sub-piece builds one by one
  const candidates = Array.from(
    container.querySelectorAll<HTMLElement>(
      "h1, h2, h3, h4, p, a, button, img, input, select, textarea, li, [data-subitem='true'], span.font-mono"
    )
  ).filter((el) => {
    // Avoid nesting duplicate animations on parent & child simultaneously
    return !el.querySelector("h1, h2, h3, p, a, button, img, input, select, textarea");
  });

  const targets = candidates.length > 0 ? candidates : [container];
  const total = targets.length;

  return targets.map((el, idx) => {
    const textNodes = collectTextNodes(el);
    const startAt = (idx / total) * 0.72;
    const endAt = Math.min(1, startAt + Math.max(0.26, 1.1 / Math.max(2, total)));

    // Completely hide initially (blank canvas)
    el.style.opacity = "0";
    el.style.transform = "scale(0.92) translateY(8px)";
    el.style.transition = "none";

    return {
      el,
      originalBg: el.style.backgroundColor || "",
      textNodes,
      status: "hidden",
      agentIndex: idx % 5,
      startAt,
      endAt,
    };
  });
}

export function updateSubItemsAtProgress(
  items: SubItemState[],
  progress: number,
  accentColor: string
): HTMLElement[] {
  const activeElements: HTMLElement[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (progress < item.startAt) {
      if (item.status !== "hidden") {
        item.status = "hidden";
        item.el.style.opacity = "0";
        item.el.style.transform = "scale(0.92) translateY(8px)";
        item.el.style.outline = "";
        item.el.style.outlineOffset = "";
      }
      continue;
    }

    if (progress >= item.endAt) {
      if (item.status !== "done") {
        item.status = "done";
        item.el.style.opacity = "1";
        item.el.style.transform = "scale(1) translateY(0px)";
        item.el.style.outline = "";
        item.el.style.outlineOffset = "";
        for (const tn of item.textNodes) {
          tn.node.nodeValue = tn.originalText;
        }
      }
      continue;
    }

    // Currently being constructed by a cursor!
    item.status = "building";
    activeElements.push(item.el);

    const localP = Math.min(
      1,
      Math.max(0, (progress - item.startAt) / (item.endAt - item.startAt))
    );

    item.el.style.opacity = (0.35 + localP * 0.65).toFixed(2);
    item.el.style.transform = `scale(${(0.94 + localP * 0.06).toFixed(
      3
    )}) translateY(${((1 - localP) * 6).toFixed(1)}px)`;
    item.el.style.outline = `2px dashed #09090b`;
    item.el.style.outlineOffset = "2px";

    // Live typewriter + scramble effect on text nodes
    for (const tn of item.textNodes) {
      const orig = tn.originalText;
      const len = orig.length;
      const revealCount = Math.floor(len * localP);
      let out = orig.slice(0, revealCount);
      const scrambleCount = Math.min(len - revealCount, 3);
      for (let s = 0; s < scrambleCount; s++) {
        const ch = orig[revealCount + s];
        if (ch === " " || ch === "\n") {
          out += ch;
        } else {
          out +=
            SCRAMBLE_CHARS[
              Math.floor((localP * 47 + i * 13 + s * 7) % SCRAMBLE_CHARS.length)
            ];
        }
      }
      tn.node.nodeValue = out;
    }
  }

  return activeElements;
}

export function restoreAllSubItems(items: SubItemState[]) {
  for (const item of items) {
    item.status = "done";
    item.el.style.opacity = "1";
    item.el.style.transform = "scale(1) translateY(0px)";
    item.el.style.outline = "";
    item.el.style.outlineOffset = "";
    for (const tn of item.textNodes) {
      tn.node.nodeValue = tn.originalText;
    }
  }
}

export function hideAllSubItems(items: SubItemState[]) {
  for (const item of items) {
    item.status = "hidden";
    item.el.style.opacity = "0";
    item.el.style.transform = "scale(0.92) translateY(8px)";
    item.el.style.outline = "";
    item.el.style.outlineOffset = "";
  }
}

