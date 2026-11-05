export interface SubItemState {
  el: HTMLElement;
  isImage: boolean;
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
    if (txt.trim().length > 0) result.push({ node: current as Text, originalText: txt });
    current = walker.nextNode();
  }
  return result;
}

export function prepareBlockSubItems(container: HTMLElement): SubItemState[] {
  const candidates = Array.from(
    container.querySelectorAll<HTMLElement>(
      "h1, h2, h3, h4, p, a, button, img, input, select, textarea, li, [data-subitem='true']"
    )
  ).filter((el) => !el.querySelector("h1, h2, h3, p, a, button, img, input, select, textarea"));

  const targets = candidates.length > 0 ? candidates : [container];
  const total = targets.length;

  return targets.map((el, idx) => {
    const textNodes = collectTextNodes(el);
    const startAt = 0.18 + (idx / Math.max(1, total)) * 0.52;
    const endAt = Math.min(0.97, startAt + 0.42);
    const isImage = el.tagName === "IMG" || !!el.querySelector("img");

    el.style.opacity = "0";
    el.style.transform = "scale(0.95) translateY(5px)";
    el.style.transition = "none";

    return { el, isImage, textNodes, status: "hidden", agentIndex: (idx % 7), startAt, endAt };
  });
}

export function updateSubItemsAtProgress(items: SubItemState[], progress: number): HTMLElement[] {
  const activeElements: HTMLElement[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (progress < item.startAt) {
      if (item.status !== "hidden") {
        item.status = "hidden";
        item.el.style.opacity = "0";
        item.el.style.transform = "scale(0.95) translateY(5px)";
        item.el.style.outline = "";
        item.el.style.filter = "";
        delete item.el.dataset.buildProgress;
      }
      continue;
    }

    if (progress >= item.endAt) {
      if (item.status !== "done") {
        item.status = "done";
        item.el.style.opacity = "1";
        item.el.style.transform = "scale(1) translateY(0px)";
        item.el.style.outline = "";
        item.el.style.filter = "";
        delete item.el.dataset.buildProgress;
        for (const tn of item.textNodes) tn.node.nodeValue = tn.originalText;
      }
      continue;
    }

    item.status = "building";
    activeElements.push(item.el);

    const localP = Math.min(1, Math.max(0, (progress - item.startAt) / (item.endAt - item.startAt)));
    item.el.dataset.buildProgress = localP.toFixed(3);
    item.el.style.opacity = (0.35 + localP * 0.65).toFixed(2);
    item.el.style.transform = `scale(${(0.97 + localP * 0.03).toFixed(3)}) translateY(${((1 - localP) * 3).toFixed(1)}px)`;

    // 1. Natural Collaborative Typewriter with Figma text bounding box
    if (item.textNodes.length > 0) {
      item.el.style.outline = "1.5px solid #0D99FF";
      item.el.style.outlineOffset = "2px";

      for (const tn of item.textNodes) {
        const orig = tn.originalText;
        const len = orig.length;
        const revealCount = Math.floor(len * localP);
        const out = orig.slice(0, revealCount);
        const caret = Math.floor(performance.now() / 240) % 2 === 0 ? " |" : "  ";
        tn.node.nodeValue = out + (localP < 0.98 ? caret : "");
      }
    } else if (item.isImage) {
      // 2. Figma Image Swap (grayscale wireframe -> full color asset)
      item.el.style.outline = "1.5px solid #0D99FF";
      item.el.style.outlineOffset = "2px";
      item.el.style.filter = localP < 0.65 ? "grayscale(100%) opacity(45%)" : "grayscale(0%) opacity(100%)";
    } else {
      item.el.style.outline = "1px dashed #0D99FF";
      item.el.style.outlineOffset = "1px";
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
    item.el.style.filter = "";
    delete item.el.dataset.buildProgress;
    for (const tn of item.textNodes) tn.node.nodeValue = tn.originalText;
  }
}

export function hideAllSubItems(items: SubItemState[]) {
  for (const item of items) {
    item.status = "hidden";
    item.el.style.opacity = "0";
    item.el.style.transform = "scale(0.95) translateY(5px)";
    item.el.style.outline = "";
    item.el.style.filter = "";
  }
}
