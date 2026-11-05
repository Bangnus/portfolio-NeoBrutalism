import { ProjectItem } from "./types";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-nebula-canvas",
    title: "Nebula Canvas Engine",
    subtitle: "Multiplayer WebGL2 & CRDT Design Workspace",
    category: "Creative Tooling / Multiplayer",
    year: "2026",
    description:
      "A real-time collaborative vector and shader studio supporting 200+ concurrent cursors with sub-16ms state synchronization and GPU-accelerated infinite zoom.",
    longDescription:
      "Built from the ground up to bridge 2D design systems with 3D WebGL shaders. Nebula Canvas uses a custom Rust/WASM spatial index paired with Yjs CRDTs over WebSockets, allowing teams of designers and creative coders to co-author interactive shaders, inspect pixel bounding boxes live, and export production React + Three.js components in one click.",
    metrics: [
      { label: "Concurrent Agents", value: "250+ @ 120Hz" },
      { label: "Sync Latency", value: "< 14ms P99" },
      { label: "Memory Footprint", value: "-62% vs DOM" },
    ],
    tech: ["Next.js", "TypeScript", "Three.js", "WebGL2", "GSAP", "Rust/WASM", "Yjs CRDT"],
    accentColor: "#38bdf8",
    liveUrl: "https://github.com/Bangnus",
    repoUrl: "https://github.com/Bangnus",
    architectureNotes: [
      "Custom instanced SDF renderer handling 100,000+ bounding boxes in a single draw call",
      "Spring-physics cursor interpolation to eliminate network jitter across continents",
      "Zero-allocation spatial R-Tree for instant viewport culling and marquee selection",
    ],
    featured: true,
  },
  {
    id: "proj-synapse-swarm",
    title: "Synapse Autonomous IDE",
    subtitle: "Multi-Agent Visual Code Synthesizer",
    category: "AI Systems / Developer Tools",
    year: "2026",
    description:
      "An agentic frontend workspace where specialized AI cursors simultaneously scaffold layouts, wire API routes, and verify visual regression in real time.",
    longDescription:
      "Instead of waiting on linear chat responses, Synapse spawns a coordinated swarm of specialized agents directly onto an interactive DOM canvas. Each agent operates within a strict bounding-box sandbox—drawing wireframes, injecting Tailwind tokens, and running live accessibility audits while the developer steers high-level architecture.",
    metrics: [
      { label: "Scaffold Speed", value: "8.4x Faster" },
      { label: "AST Accuracy", value: "99.4%" },
      { label: "Active Studios", value: "18,500+" },
    ],
    tech: ["Next.js", "React 19", "GSAP", "Tailwind CSS", "WebSockets", "AST Parser"],
    accentColor: "#a855f7",
    liveUrl: "https://github.com/Bangnus",
    repoUrl: "https://github.com/Bangnus",
    architectureNotes: [
      "Deterministic layout lock-manager preventing agent cursor collisions on shared AST nodes",
      "Live GSAP timeline scrubbers attached to every code diff for visual time-travel",
      "Streaming Edge runtime with speculative DOM hydration",
    ],
    featured: true,
  },
  {
    id: "proj-chronos-telemetry",
    title: "Chronos Orbital Telemetry",
    subtitle: "3D Spatial Observability & Distributed Tracing",
    category: "Data Visualization / WebGL",
    year: "2025",
    description:
      "High-density 3D topology visualizer for Kubernetes & edge microservices, rendering millions of live request packets as interactive particle streams.",
    longDescription:
      "Traditional dashboards flatten complex microservice cascades into static tables. Chronos transforms live OpenTelemetry streams into a navigable 3D architectural blueprint. Engineers can isolate latency anomalies by slicing through 3D node clusters, inspecting packet trajectories, and replaying traffic spikes frame-by-frame.",
    metrics: [
      { label: "Events / Sec", value: "1.2M Streamed" },
      { label: "Draw Calls", value: "< 12 Total" },
      { label: "MTTR Reduction", value: "47%" },
    ],
    tech: ["Three.js", "GLSL Shaders", "TypeScript", "Go", "gRPC-Web", "Tailwind CSS"],
    accentColor: "#22c55e",
    liveUrl: "https://github.com/Bangnus",
    repoUrl: "https://github.com/Bangnus",
    architectureNotes: [
      "GPU compute-style ping-pong framebuffers for 500k particle trail physics",
      "Custom raycasting octree enabling instant hover inspection on sub-millimeter nodes",
      "Adaptive LOD scaling smoothly from global cluster down to single SQL query spans",
    ],
    featured: true,
  },
  {
    id: "proj-kinetic-design-sys",
    title: "Kinetic UI Protocol",
    subtitle: "Physics-Driven Component & Motion Library",
    category: "Design Systems / Motion",
    year: "2025",
    description:
      "An open-source collection of 60+ accessible React primitives powered by GSAP and hardware-accelerated CSS shaders with built-in blueprint inspection.",
    longDescription:
      "Kinetic UI treats every interface element as a physical object with mass, tension, and spatial awareness. Designed for engineering teams that want Linear-grade polish out of the box, it includes magnetic cursors, morphing layout containers, and a one-keystroke Inspector mode that exposes live pixel dimensions and token bindings.",
    metrics: [
      { label: "Weekly Downloads", value: "84,000+" },
      { label: "Bundle Core", value: "6.2 kB gzip" },
      { label: "WCAG Compliance", value: "AAA Ready" },
    ],
    tech: ["React 19", "GSAP", "TypeScript", "CSS Houdini", "Radix Primitives"],
    accentColor: "#f59e0b",
    liveUrl: "https://github.com/Bangnus",
    repoUrl: "https://github.com/Bangnus",
    architectureNotes: [
      "FLIP-based layout transitions that survive asynchronous React Suspense boundaries",
      "Automatic reduced-motion fallback preserving semantic clarity without jarring jumps",
      "Zero-runtime CSS token compiler with live studio theme hot-swapping",
    ],
    featured: false,
  },
];

