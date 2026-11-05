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
    <div className="relative min-h-screen z-10 pb-32 selection:bg-sky-500/30 selection:text-sky-200">
      <StudioHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 space-y-28">
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
