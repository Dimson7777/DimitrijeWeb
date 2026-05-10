import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const projects = [
  {
    title: "Nexus - Multi-Tenant SaaS Platform",
    category: "SaaS Platform",
    description:
      "Built a multi-tenant SaaS platform with authentication, team workspaces, role-based access, Stripe subscriptions, and a command-center dashboard designed for real product workflows.",
    features: ["Multi-tenant auth", "RBAC workspaces", "Stripe subscriptions"],
    tech: ["React", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    live: "https://multi-talent-saas.vercel.app/",
    accent: "from-primary/35 via-accent-cyan/25 to-primary-glow/25",
    featured: true,
    badge: "Key build",
  },
  {
    title: "SaaS Invoicing Platform",
    category: "Billing SaaS",
    description:
      "Developed an invoicing product with Pro/Free plan logic, Stripe checkout flows, subscription states, Supabase data handling, and analytics dashboard UI.",
    features: ["Invoice workflows", "Plan gating", "Stripe checkout"],
    tech: ["React", "Node.js", "Stripe API", "Supabase", "PostgreSQL"],
    live: "https://invoiceflow-saas-mu.vercel.app/",
    accent: "from-accent-cyan/35 via-primary/20 to-primary-glow/20",
    featured: true,
    badge: "Key build",
  },
  {
    title: "SYNAPSE - Developer Platform",
    category: "Developer Network",
    description:
      "Designed a developer platform with session authentication, profiles, personalized feeds, social interactions, responsive pages, and scalable component architecture.",
    features: ["Session auth", "Personalized feeds", "Social interactions"],
    tech: ["React", "Next.js", "TypeScript", "Auth", "Responsive UI"],
    live: "https://synapse-dev-network1.vercel.app/",
    accent: "from-primary/25 via-accent-cyan/20 to-primary-glow/20",
  },
  {
    title: "DevPitch Pro - Developer Pitch Platform",
    category: "AI Productivity Tool",
    description:
      "Built an AI-assisted workspace that turns rough project notes into CV bullets, LinkedIn posts, pitch copy, and interview-ready project answers.",
    features: ["AI-assisted writing", "Project positioning", "CV-ready outputs"],
    tech: ["React", "TypeScript", "AI-Assisted Development", "Product UI"],
    live: "https://devpitch-rho.vercel.app",
    accent: "from-accent-cyan/25 via-primary/20 to-primary-glow/15",
  },
  {
    title: "SCOPELAB",
    category: "AI Project Workspace",
    description:
      "Delivered an AI-powered task and project generator with organized dashboards, structured outputs, clean UX, responsive UI, and production-style flows.",
    features: ["Task generation", "Structured dashboards", "Responsive UX"],
    tech: ["React", "TypeScript", "AI Workflows", "Tailwind CSS"],
    live: "https://scopelab.vercel.app/",
    accent: "from-primary/25 via-primary-glow/20 to-accent-cyan/20",
  },
  {
    title: "Real-Time Collaboration App",
    category: "Collaboration Tool",
    description:
      "Built collaborative workspace flows with shared boards, instant updates, low-latency synchronization, reliable state handling, and frontend-backend coordination.",
    features: ["Shared boards", "Instant updates", "Real-time sync"],
    tech: ["React", "Node.js", "WebSockets", "State Management"],
    live: "https://realtime-collab-app-six.vercel.app/",
    accent: "from-accent-cyan/35 via-primary/20 to-primary-glow/20",
  },
];

export const Projects = () => (
  <section id="projects" className="py-20 md:py-28 relative">
    <div className="container">
      <SectionHeading
        eyebrow="Selected Work"
        title={<>Selected <span className="text-gradient-primary">product work.</span></>}
        description="Production-style projects covering SaaS workflows, authentication, Stripe billing, dashboards, AI-assisted tools, real-time collaboration, and responsive product UI."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6"
      >
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.52, delay: i * 0.08 }}
            className={`group relative glass rounded-3xl overflow-hidden border border-primary/15 bg-gradient-to-b from-background/65 to-background/35 p-5 md:p-6 lg:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_16px_46px_-26px_hsl(var(--primary)/0.75)] ${
              p.featured
                ? "xl:col-span-1 ring-1 ring-primary/35 shadow-[0_14px_36px_-24px_hsl(var(--primary)/0.75)]"
                : ""
            }`}
          >
            <div
              className={`absolute -top-28 -right-28 w-72 h-72 bg-gradient-to-br ${p.accent} rounded-full blur-3xl opacity-55 group-hover:opacity-80 transition-opacity duration-500`}
            />

            <div className="relative h-full flex flex-col">
              {p.badge && (
                <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
                  <Sparkles size={12} />
                  {p.badge}
                </div>
              )}

              <div className="text-[0.68rem] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {p.category}
              </div>

              <h3 className="font-display text-[1.35rem] md:text-[1.55rem] font-bold tracking-tight leading-tight text-foreground mb-3">
                {p.title}
              </h3>

              <p className="text-foreground/78 leading-relaxed text-sm md:text-[0.95rem] mb-4">
                {p.description}
              </p>

              <div className="mb-4">
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-primary/90 mb-2">What I built</div>
                <ul className="flex flex-wrap gap-2">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="text-[0.72rem] md:text-xs px-2.5 py-1.5 rounded-full border border-border/70 bg-secondary/30 text-foreground/82"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-full border border-border/80 bg-secondary/35 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-5 border-t border-border/60">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all"
                >
                  Live <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  </section>
);
