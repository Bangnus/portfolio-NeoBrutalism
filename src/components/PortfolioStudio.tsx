"use client";

import React, { useState } from "react";
import { ProjectItem } from "@/data/portfolio";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { StudioHeader } from "./sections/StudioHeader";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { StackAndExperienceSection } from "./sections/StackAndExperienceSection";
import { ContactSection } from "./sections/ContactSection";

export function PortfolioStudio() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  return (
    <div className="relative min-h-screen z-10 pb-28 selection:bg-yellow-300 selection:text-zinc-950">
      <StudioHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-20">
        <HeroSection />
        <ProjectsSection onSelectProject={setSelectedProject} />
        <StackAndExperienceSection />
        <ContactSection />
      </main>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
