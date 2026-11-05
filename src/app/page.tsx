import { SwarmProvider } from "@/components/swarm/SwarmContext";
import { SwarmCursorOverlay } from "@/components/swarm/SwarmCursorOverlay";
import { FigmaViewportRulers } from "@/components/swarm/FigmaViewportRulers";
import { PortfolioStudio } from "@/components/PortfolioStudio";

export default function HomePage() {
  return (
    <SwarmProvider>
      <div className="relative min-h-screen bg-[#FFFDF7] text-zinc-950 overflow-x-hidden brutal-grid-bg">
        {/* Dynamic Screen-Edge Figma Canvas Rulers (Top & Left edges) */}
        <FigmaViewportRulers />

        {/* Main Neo-Brutalist Portfolio Sections wrapped in SwarmBuildBlocks */}
        <PortfolioStudio />

        {/* 7 Figma Collaborative Multiplayer Cursors Overlay */}
        <SwarmCursorOverlay />
      </div>
    </SwarmProvider>
  );
}
