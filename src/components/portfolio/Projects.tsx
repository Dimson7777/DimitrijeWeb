import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const projects = [
  {
    title: "Sync",
    description:
      "A real-time collaboration platform with shared workspaces, live cursors, chat, and multi-user synchronization.",
    features: [
      "Live cursors & presence",
      "Chat with reactions",
      "AI assistant (slash command)",
      "Shared workspaces (rooms)",
    ],
    tech: ["React", "TypeScript", "Node.js", "WebSockets", "Tailwind", "Stripe"],
    live: "https://realtime-collab-app-six.vercel.app/",
    github: null,
    accent: "from-primary/40 via-accent-cyan/30 to-primary-glow/30",
    featured: true,
    badge: "Featured · Real-time app",
  },
  {
    title: "InvoiceFlow",
    description:
      "SaaS that helps freelancers and small teams send invoices and get paid without juggling spreadsheets.",
    features: ["Auth & user accounts", "Client management", "Stripe subscriptions", "Dashboard & analytics"],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Stripe"],
    live: "https://invoiceflow-saas-mu.vercel.app/",
    github: null,
    accent: "from-primary/30 to-primary-glow/20",
  },
  {
    title: "SCOPELAB",
    description:
      "Helps people turn a vague idea into an actual project plan instead of staring at a blank page.",
    features: ["AI-generated workflows", "Task breakdown", "Clean planning UI"],
    tech: ["Next.js", "TypeScript", "REST APIs"],
    live: "https://scopelab.vercel.app/",
    github: null,
    accent: "from-accent-cyan/30 to-primary/20",
  },
  {
    title: "Sculpt Stack Store",
    description:
      "A small e-commerce storefront built to practice product layouts, cart flow, and responsive design.",
    features: ["Product catalog", "Responsive UI", "Clean checkout flow"],
    tech: ["React", "TypeScript", "CSS", "Node.js"],
    live: "https://sculpt-stack-store.lovable.app/",
    github: null,
    accent: "from-primary-glow/30 to-accent-cyan/20",
  },
  {
    title: "DevCircle",
    description:
      "A small social network for developers — built to learn how feeds, follows, and real data models work end-to-end.",
    features: ["Profiles & follows", "Posts & comments", "Dynamic feed", "Auth"],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    live: "https://synapse-dev-network.lovable.app/",
    github: "https://github.com/Dimson7777/synapse-dev-network",
    accent: "from-primary/30 to-accent-cyan/20",
  },
];

export const Projects = () => (
  <section id="projects" className="py-20 md:py-28 relative">
    <div className="container">
      <SectionHeading
        eyebrow="Selected Work"
        title={<>Projects I've <span className="text-gradient-primary">actually shipped.</span></>}
        description="Real products I've designed, built, and deployed end-to-end — each one taught me something different."
      />

      <div className="grid md:grid-cols-2 gap-5 md:gap-6">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            className={`group relative glass card-hover rounded-3xl p-7 md:p-8 overflow-hidden transition-all duration-500 ${
              p.featured
                ? "md:col-span-2 ring-1 ring-primary/40 shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_80px_-10px_hsl(var(--primary)/0.55)] hover:-translate-y-1"
                : ""
            }`}
          >
            <div
              className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${p.accent} rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700`}
            />

            <div className="relative">
              {p.badge && (
                <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold">
                  <Sparkles size={12} />
                  {p.badge}
                </div>
              )}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${p.title}`}
                  className="shrink-0 w-11 h-11 rounded-full glass-strong inline-flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all group-hover:rotate-45"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>

              <p className="text-foreground/75 leading-relaxed text-sm md:text-base mb-4">
                {p.description}
              </p>

              <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-5">
                {p.features.map((f) => (
                  <li key={f} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-full border border-border/80 bg-secondary/40 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-5 border-t border-border/60">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all"
                >
                  Live Demo <ArrowUpRight size={14} />
                </a>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                  >
                    <Github size={14} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
