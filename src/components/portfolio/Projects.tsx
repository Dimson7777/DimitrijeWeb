import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { SectionHeading } from "./SectionHeading";

const projects = [
  {
    title: "Nexus - Multi-Tenant SaaS Ecosystem",
    category: "Enterprise SaaS",
    description:
      "Architected a high-scale, secure multi-tenant SaaS ecosystem designed for enterprise-grade performance. Engineered a robust RBAC (Role-Based Access Control) system and integrated Stripe billing cycles to manage complex subscription lifecycles. Focused on strict tenant isolation and high-availability infrastructure for production-ready workflows.",
    engineered: ["Next.js", "PostgreSQL", "Stripe Enterprise", "Supabase", "RBAC logic"],
    live: "https://multi-talent-saas.vercel.app/",
    github: "https://github.com/Dimson7777",
    accent: "from-emerald-400/12 via-teal-400/10 to-cyan-300/10",
    featured: true,
    badge: "Case Study",
  },
  {
    title: "SaaS Invoicing & Financial Engine",
    category: "Financial Systems",
    description:
      "Engineered a flexible, compliant billing engine with automated invoicing cycles and real-time financial tracking. Optimized complex business logic for plan gating, Pro/Free tier transitions, and subscription state management. Designed a high-density analytics dashboard for monitoring revenue health and billing status.",
    engineered: ["Node.js", "Stripe API", "PostgreSQL", "Data Visualization (Recharts)", "Cron Jobs"],
    live: "https://invoiceflow-saas-mu.vercel.app/",
    github: "https://github.com/Dimson7777",
    accent: "from-emerald-400/12 via-teal-400/10 to-cyan-300/10",
    featured: true,
    badge: "Case Study",
  },
  {
    title: "Synapse - Developer Infrastructure Platform",
    category: "Developer Infrastructure",
    description:
      "Designed and implemented a production-grade identity and collaboration layer for developer-centric ecosystems. Developed a secure session authentication system and a modular, highly scalable component architecture. Focused on low-latency data structures and optimized social interaction feeds to ensure a seamless developer experience.",
    engineered: ["React", "Next.js", "Advanced Auth", "Modular Architecture", "Tailwind CSS"],
    live: "https://synapse-dev-network1.vercel.app/",
    github: "https://github.com/Dimson7777",
    accent: "from-emerald-400/12 via-teal-400/10 to-cyan-300/10",
  },
  {
    title: "DevPitch Pro - AI NLP Workspace",
    category: "AI Product Engineering",
    description:
      "Architected an AI-powered project translation engine utilizing advanced NLP workflows. Engineered custom logic to contextualize raw, unstructured project notes into professional-grade CV bullets, pitch copy, and interview-ready responses. Optimized the UI for high conversion rates and intuitive user flow through complex AI interactions.",
    engineered: ["OpenAI API", "TypeScript", "Vector Embeddings", "Tailwind CSS"],
    live: "https://devpitch-rho.vercel.app",
    github: "https://github.com/Dimson7777",
    accent: "from-emerald-400/12 via-teal-400/10 to-cyan-300/10",
  },
  {
    title: "ScopeLab - AI Project Architect",
    category: "AI Workspace Systems",
    description:
      "Delivered an AI-integrated workspace focused on structured project generation and task management. Engineered a performant dashboard capable of handling complex, structured outputs and real-time state updates. Applied a clean, production-style design philosophy to ensure clarity in data-heavy environments.",
    engineered: ["React", "AI Workflows", "Responsive UI Architecture", "State Management"],
    live: "https://scopelab.vercel.app/",
    github: "https://github.com/Dimson7777",
    accent: "from-emerald-400/12 via-teal-400/10 to-cyan-300/10",
  },
  {
    title: "Real-Time Collaboration Engine",
    category: "Realtime Infrastructure",
    description:
      "Engineered a low-latency, real-time collaboration engine supporting shared boards and instant synchronization. Optimized WebSocket data flow to ensure resilient state management across complex, multi-user shared workspaces. Focused on frontend-backend coordination to minimize collision issues and maximize synchronization reliability.",
    engineered: ["WebSockets (Socket.io)", "Node.js", "Global State Management", "Real-time Sync"],
    live: "https://realtime-collab-app-six.vercel.app/",
    github: "https://github.com/Dimson7777",
    accent: "from-emerald-400/12 via-teal-400/10 to-cyan-300/10",
  },
];

export const Projects = () => (
  <section id="projects" className="py-20 md:py-28 relative">
    <div className="container">
      <SectionHeading
        eyebrow="Selected Work"
        title={
          <>
            Enterprise{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              case studies.
            </span>
          </>
        }
        description="Production-scale systems engineered for reliability, maintainability, and high-performance business workflows."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6"
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </motion.div>
    </div>
  </section>
);

const ProjectCard = ({ project: p, index: i }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [spotlightStyle, setSpotlightStyle] = useState({ left: "0px", top: "0px" });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setSpotlightStyle({
        left: `${x}px`,
        top: `${y}px`,
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.52, delay: i * 0.08 }}
      className={`group relative rounded-3xl overflow-hidden border border-white/5 bg-[#09090b] p-5 md:p-6 lg:p-7 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) hover:scale-[1.02] hover:border-zinc-500 project-card-float project-card-noise ${
        p.featured ? "xl:col-span-1" : ""
      }`}
    >
      {/* Spotlight border glow effect */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute rounded-3xl p-px"
        style={{
          left: spotlightStyle.left,
          top: spotlightStyle.top,
          width: "1px",
          height: "1px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="absolute rounded-3xl"
          style={{
            width: "200px",
            height: "200px",
            left: "-100px",
            top: "-100px",
            background: "radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, transparent 70%)",
            opacity: 0,
            animation: "spotlight-glow 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl p-px opacity-70 transition-opacity duration-300 group-hover:opacity-100">
        <div className="h-full w-full rounded-3xl bg-gradient-to-br from-emerald-300/20 via-transparent to-transparent" />
      </div>

      <div
        className={`absolute -top-28 -right-28 w-72 h-72 bg-gradient-to-br ${p.accent} rounded-full blur-3xl opacity-55 group-hover:opacity-80 transition-opacity duration-500`}
      />

      <div className="relative h-full flex flex-col rounded-[1.4rem] bg-zinc-950/45 px-4 py-4 md:px-5 md:py-5">
        {p.badge && (
          <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-zinc-300 text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
            <Sparkles size={12} />
            {p.badge}
          </div>
        )}

        <div className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">
          {p.category}
        </div>

        <h3 className="font-display text-[1.5rem] md:text-[1.72rem] font-bold tracking-tighter leading-tight text-zinc-100 mb-3">
          {p.title}
        </h3>

        <p className="text-zinc-400 leading-relaxed text-sm md:text-[0.95rem] mb-4">
          {p.description}
        </p>

        <div className="mb-4">
          <div className="text-[0.7rem] uppercase tracking-[0.18em] text-emerald-300/85 mb-2">
            What I Engineered
          </div>
          <ul className="flex flex-wrap gap-2">
            {p.engineered.map((f) => (
              <li key={f} className="tech-badge-shimmer text-[0.72rem] md:text-xs px-2.5 py-1.5 rounded-full border border-white/10 bg-zinc-900/85 text-zinc-300">
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-5 mt-auto border-t border-white/5 flex items-center gap-2.5">
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full border border-white/10 bg-zinc-900 text-zinc-200 hover:border-zinc-500 hover:text-zinc-100 transition-all duration-200"
          >
            <ExternalLink size={14} /> Link
          </a>

          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.title} GitHub repository`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-all duration-200"
          >
            <Github size={15} />
          </a>
        </div>
      </div>
    </motion.article>
  );
};
