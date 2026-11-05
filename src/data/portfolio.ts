import { TechCategory, ExperienceItem } from "./types";
import { PROJECTS_DATA } from "./projects";

export * from "./types";
export { SWARM_AGENTS } from "./agents";

export const PORTFOLIO_DATA = {
  profile: {
    name: "Peerapat Laelem",
    handle: "@Bangnus",
    title: "Creative Full-Stack Developer & Interactive Systems Engineer",
    tagline:
      "Designing high-frequency web applications, multiplayer canvas tools, and bold interactive web experiences where code feels tactile.",
    avatarUrl: "/profile.jpg",
    location: "Thailand",
    availability: "Available for Full-Stack / Creative Dev Projects & Roles",
    email: "nuspeerapat@gmail.com",
    github: "https://github.com/Bangnus",
    instagram: "https://www.instagram.com/anxs_ov/",
    stats: [
      { label: "Production Systems", value: "28+" },
      { label: "Frame Budget", value: "120 FPS" },
      { label: "GitHub Handle", value: "@Bangnus" },
      { label: "Design Style", value: "Neo-Brutal" },
    ],
  },

  projects: PROJECTS_DATA,

  techCategories: [
    {
      id: "tech-frontend",
      title: "Interactive Frontend & Architecture",
      tag: "LAYER_01 // UI_CORE",
      accent: "#38bdf8",
      description:
        "Component architectures engineered for zero layout shift, instant hydration, and tactile micro-interactions.",
      skills: [
        { name: "Next.js (App Router)", level: "98%", detail: "RSC, Streaming, Edge Middleware" },
        { name: "React 19 & TypeScript", level: "99%", detail: "Concurrent UI, Strict Type Systems" },
        { name: "Tailwind CSS v4", level: "97%", detail: "Neo-Brutalism, Design Tokens, Grid Systems" },
        { name: "State & Multiplayer", level: "94%", detail: "Zustand, Yjs CRDTs, WebSockets, Canvas Sync" },
      ],
    },
    {
      id: "tech-motion-3d",
      title: "Creative Coding & Physics UI",
      tag: "LAYER_02 // MOTION_FX",
      accent: "#a855f7",
      description:
        "Combining mathematical spring physics with hardware-accelerated CSS & Canvas to build living interfaces.",
      skills: [
        { name: "Spring Physics Engine", level: "98%", detail: "120Hz Delta-Time Critically Damped Springs" },
        { name: "HTML5 Canvas & SVG", level: "96%", detail: "2D Boids Swarms, Procedural Wireframes" },
        { name: "Hardware CSS Transforms", level: "97%", detail: "Zero-Reflow GPU Composite Animations" },
        { name: "Interactive Tooling", level: "95%", detail: "Live Bounding-Box Inspectors, Marquee Tools" },
      ],
    },
    {
      id: "tech-backend-ai",
      title: "Systems, Edge Backend & AI Swarms",
      tag: "LAYER_03 // KERNEL_OPS",
      accent: "#22c55e",
      description:
        "Low-latency backend pipelines and multi-agent orchestration powering real-time collaborative apps.",
      skills: [
        { name: "Node.js / Bun / Go", level: "93%", detail: "High-Concurrency Event Loops, REST & gRPC" },
        { name: "AI Agent Orchestration", level: "95%", detail: "Tool-Use Swarms, Streaming AST Generation" },
        { name: "PostgreSQL & Redis", level: "91%", detail: "Vector pgvector, Pub/Sub Realtime State" },
        { name: "Rust / WebAssembly", level: "86%", detail: "Spatial Indexing, Off-Main-Thread Compute" },
      ],
    },
  ] as TechCategory[],

  experiences: [
    {
      id: "exp-1",
      period: "2025 — PRESENT",
      role: "Creative Full-Stack & Interactive Systems Engineer",
      company: "Independent / Studio Lab (@Bangnus)",
      location: "Thailand / Remote",
      summary:
        "Architecting high-frequency web applications, multiplayer canvases, and AI-driven Neo-Brutalist interfaces.",
      highlights: [
        "Engineered the multi-agent Swarm Canvas engine in Next.js & TypeScript running smoothly at 120fps.",
        "Built modular Neo-Brutalist design systems with live CAD bounding-box inspection.",
        "Delivered full-stack TypeScript applications with real-time state synchronization.",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Spring Physics", "Node.js"],
    },
    {
      id: "exp-2",
      period: "2023 — 2025",
      role: "Frontend & Interactive Developer",
      company: "Creative Web & Product Engineering",
      location: "Thailand",
      summary:
        "Spearheaded responsive UI systems, real-time inspector overlays, and smooth choreographed animations for modern web platforms.",
      highlights: [
        "Designed and implemented interactive canvas systems reactive to scroll and cursor velocity.",
        "Optimized Core Web Vitals and rendering pipelines for complex web applications.",
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "HTML5 Canvas", "Node.js"],
    },
  ] as ExperienceItem[],
};
