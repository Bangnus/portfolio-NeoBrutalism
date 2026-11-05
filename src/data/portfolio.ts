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
      title: "Full-Stack Frontend & UI Architecture",
      tag: "LAYER_01 // UI_CORE",
      accent: "#38bdf8",
      description:
        "Modern component architectures engineered for zero layout shift, fast hydration, and tactile Neo-Brutalist polish.",
      skills: [
        { name: "Next.js (App Router)", detail: "SSR, Server Actions, Dynamic Streaming", badge: "Core Stack" },
        { name: "React 19 & TypeScript", detail: "Strict Type Systems, Clean Custom Hooks", badge: "Production" },
        { name: "Tailwind CSS v4", detail: "Neo-Brutalism, Design Tokens, Grid Systems", badge: "Daily Driver" },
        { name: "Figma to Live Code", detail: "Pixel-Perfect Conversion for All Devices", badge: "Specialized" },
      ],
    },
    {
      id: "tech-motion-3d",
      title: "Interactive Coding & Spring Physics",
      tag: "LAYER_02 // MOTION_FX",
      accent: "#a855f7",
      description:
        "Delta-time spring physics and GPU-accelerated CSS animations that make interfaces feel living and responsive.",
      skills: [
        { name: "Spring Physics Engine", detail: "120Hz Delta-Time Damped Interpolation", badge: "Interactive" },
        { name: "HTML5 Canvas & SVG", detail: "Multi-Agent Cursors, Live Wireframes", badge: "Creative" },
        { name: "Hardware GPU Transforms", detail: "Zero-Reflow Composited Micro-Interactions", badge: "Performance" },
        { name: "Tactile Component Design", detail: "Neo-Brutalist Shadows, Accessible Primitives", badge: "Production" },
      ],
    },
    {
      id: "tech-backend-ai",
      title: "Backend, Database & Cloud Infrastructure",
      tag: "LAYER_03 // BACKEND_OPS",
      accent: "#22c55e",
      description:
        "Robust APIs, relational databases, caching pipelines, and SEO-optimized cloud deployment.",
      skills: [
        { name: "Node.js / Bun / Express", detail: "High-Throughput RESTful APIs & Middleware", badge: "Core Stack" },
        { name: "PostgreSQL & Redis", detail: "Prisma ORM, Relational Schemas, Fast Caching", badge: "Production" },
        { name: "Payment & Integrations", detail: "PromptPay QR, Stripe, WebSockets, WebRTC", badge: "Specialized" },
        { name: "SEO & Cloud Deployment", detail: "Vercel, Docker, Linux VPS, 98+ PageSpeed", badge: "Verified" },
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
