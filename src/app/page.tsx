import { SwarmProvider } from "@/components/swarm/SwarmContext";
import { SwarmCursorOverlay } from "@/components/swarm/SwarmCursorOverlay";
import { PortfolioStudio } from "@/components/PortfolioStudio";

export default function HomePage() {
  return (
    <SwarmProvider>
      <div className="relative min-h-screen bg-[#FFFDF7] text-zinc-950 overflow-x-hidden brutal-grid-bg">
        {/* Main Full Neo-Brutalist Portfolio Sections wrapped in SwarmBuildBlocks */}
        <PortfolioStudio />

        {/* Pure Pointer-Only 4 Swarm Cursors Overlay */}
        <SwarmCursorOverlay />
      </div>
    </SwarmProvider>
  );
}
