import { motion } from "framer-motion";
import { Cloud, Code2, Database, ShieldCheck } from "lucide-react";

type SkillCard = {
  title: string;
  description: string;
  icon: typeof Code2;
  badge: string;
  skills: string[];
};

const cards: SkillCard[] = [
  {
    title: "Frontend & Premium UI",
    badge: "UI SYSTEMS",
    description:
      "High-performance interfaces with polished interaction design and scalable component systems.",
    icon: Code2,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "Zustand",
      "React Query",
      "Tailwind CSS",
      "Shadcn UI",
      "Radix UI",
      "Framer Motion",
      "Lucide Icons",
      "CSS Animations",
      "UI Primitives",
      "Component-Driven Architecture",
      "State Propagation",
      "Lifecycle Optimization",
      "Server-Side Rendering",
      "Client-Side Hydration",
      "Core Web Vitals",
      "Responsive UI",
      "Premium UI Systems",
      "Clean Interaction Design",
    ],
  },
  {
    title: "Backend, Data & APIs",
    badge: "API LAYER",
    description:
      "Server-side systems, API boundaries, databases, and data-intensive application architecture.",
    icon: Database,
    skills: [
      "Node.js",
      "Express",
      "Laravel",
      "RESTful API Design",
      "GraphQL",
      "Supabase",
      "PostgreSQL",
      "SQL",
      "Prisma",
      "Eloquent",
      "Redis",
      "WebSockets",
      "Message Queues",
      "BullMQ",
      "Database Architecture",
      "Connection Pooling",
      "Query Optimization",
      "Advanced Indexing",
    ],
  },
  {
    title: "Security & Engineering Quality",
    badge: "SECURITY",
    description:
      "Secure user flows, access control, testing, and reliable production-grade engineering practices.",
    icon: ShieldCheck,
    skills: [
      "Authentication",
      "Session Management",
      "OAuth2",
      "JWT",
      "Granular RBAC",
      "Protected Routes",
      "Server-Side Logic",
      "Multi-Tenant Isolation Boundaries",
      "Automated Testing",
      "Jest",
      "Vitest",
      "Cypress",
      "Test-Driven Development",
    ],
  },
  {
    title: "Cloud, DevOps & Languages",
    badge: "DEPLOYMENT",
    description:
      "Deployment, automation, infrastructure workflows, and core programming languages across the stack.",
    icon: Cloud,
    skills: [
      "Docker",
      "Docker Compose",
      "AWS",
      "Vercel",
      "Git & GitHub",
      "GitHub Actions",
      "CI/CD Pipelines",
      "Edge Runtime",
      "Serverless Functions",
      "Monorepos",
      "Turborepo",
      "Linux System Administration",
      "Senior Git Workflows",
      "Bash Shell Scripting",
      "AI Workflow Automation",
      "Kotlin",
      "Python",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const SkillPill = ({ label }: { label: string }) => (
  <span className="inline-flex min-h-8 items-center rounded-full border border-white/10 bg-white/[0.04] px-3 text-[0.72rem] leading-none text-zinc-300 transition-all duration-200 hover:border-violet-400/45 hover:bg-violet-400/10 hover:text-zinc-100 hover:shadow-[0_0_18px_-10px_rgba(168,85,247,0.85)]">
    {label}
  </span>
);

const SkillsCard = ({
  title,
  description,
  icon: Icon,
  badge,
  skills,
  delay,
}: SkillCard & { delay: number }) => (
  <motion.article
    variants={cardVariants}
    custom={delay}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.25 }}
    whileHover={{ y: -4 }}
    className="group relative h-full overflow-hidden rounded-3xl border border-violet-300/15 bg-[linear-gradient(180deg,rgba(19,20,29,0.82),rgba(11,12,18,0.70))] p-5 shadow-[0_18px_60px_-40px_rgba(139,92,246,0.95)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/30 hover:shadow-[0_24px_75px_-34px_rgba(34,211,238,0.68)] sm:p-6"
  >
    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_36%)] opacity-70" />
      <div className="absolute -left-1/3 top-0 h-full w-2/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-145%] transition-transform duration-700 ease-out group-hover:translate-x-[250%]" />
    </div>

    <div className="flex h-full flex-col">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 text-violet-100 shadow-[0_0_24px_-12px_rgba(168,85,247,0.8)] transition-all duration-300 group-hover:border-cyan-300/30 group-hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.95)]">
            <Icon size={18} />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-100 sm:text-xl">
              {title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
              {description}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.62rem] font-mono uppercase tracking-[0.18em] text-zinc-400">
          {badge}
        </span>
      </div>

      <div className="mt-auto flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <SkillPill key={skill} label={skill} />
        ))}
      </div>
    </div>
  </motion.article>
);

export const Skills = () => (
  <motion.section
    id="skills"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="relative overflow-hidden bg-[#09090b] py-20 md:py-24"
  >
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        aria-hidden
        animate={{ opacity: [0.18, 0.28, 0.18], x: [0, 24, -16, 0], y: [0, -10, 8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-12 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-violet-500/12 blur-[120px]"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.12, 0.2, 0.12], x: [0, -18, 12, 0], y: [0, 12, -8, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px]"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.015, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(168,85,247,0.09),transparent_28%),radial-gradient(circle_at_50%_55%,rgba(34,211,238,0.07),transparent_34%)]"
      />
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:28px_28px]" />
    </div>

    <div className="container relative mx-auto">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.45 }}
          className="mb-3 text-[0.7rem] font-mono uppercase tracking-[0.26em] text-violet-200/90"
        >
          SKILLS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl md:text-[2.7rem] md:leading-tight"
        >
          Engineering toolkit for scalable <span className="border-b border-violet-400/50 text-zinc-50">products</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300/80 sm:text-base"
        >
          Frontend, backend, infrastructure, and security skills used to build clean production-ready systems.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="mt-12 grid gap-6 md:grid-cols-2 md:gap-7"
      >
        {cards.map((card, index) => (
          <SkillsCard key={card.title} {...card} delay={index * 0.08} />
        ))}
      </motion.div>
    </div>
  </motion.section>
);
