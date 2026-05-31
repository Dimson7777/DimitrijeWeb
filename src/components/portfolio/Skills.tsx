import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Cloud, Code2, Database, ShieldCheck, type LucideIcon } from "lucide-react";

type Accent = "purple" | "blue" | "cyan" | "amber";

type SkillCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: Accent;
  pills: string[];
};

/** Static class strings per accent so Tailwind never purges dynamic values. */
const ACCENTS: Record<
  Accent,
  { iconWrap: string; halo: string; dot: string; pill: string }
> = {
  purple: {
    iconWrap:
      "border-violet-400/30 bg-violet-500/10 text-violet-200 shadow-[0_0_34px_-8px_rgba(168,85,247,0.85)]",
    halo: "border-violet-400/40",
    dot: "bg-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.95)]",
    pill: "border-violet-400/25 hover:border-violet-400/55 hover:bg-violet-500/10 hover:shadow-[0_0_20px_-8px_rgba(168,85,247,0.95)]",
  },
  blue: {
    iconWrap:
      "border-blue-400/30 bg-blue-500/10 text-blue-200 shadow-[0_0_34px_-8px_rgba(59,130,246,0.85)]",
    halo: "border-blue-400/40",
    dot: "bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.95)]",
    pill: "border-blue-400/25 hover:border-blue-400/55 hover:bg-blue-500/10 hover:shadow-[0_0_20px_-8px_rgba(59,130,246,0.95)]",
  },
  cyan: {
    iconWrap:
      "border-cyan-400/30 bg-cyan-500/10 text-cyan-200 shadow-[0_0_34px_-8px_rgba(34,211,238,0.85)]",
    halo: "border-cyan-400/40",
    dot: "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.95)]",
    pill: "border-cyan-400/25 hover:border-cyan-400/55 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_-8px_rgba(34,211,238,0.95)]",
  },
  amber: {
    iconWrap:
      "border-amber-400/30 bg-amber-500/10 text-amber-200 shadow-[0_0_34px_-8px_rgba(245,158,11,0.85)]",
    halo: "border-amber-400/40",
    dot: "bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.95)]",
    pill: "border-amber-400/25 hover:border-amber-400/55 hover:bg-amber-500/10 hover:shadow-[0_0_20px_-8px_rgba(245,158,11,0.95)]",
  },
};

const CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend & Premium UI",
    description: "Crafting fast, accessible, and delightful interfaces with modern web technologies.",
    icon: Code2,
    accent: "purple",
    pills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "Radix UI",
      "React Query",
      "Framer Motion",
      "Zustand",
      "Shadcn UI",
      "Lucide Icons",
      "CSS Animations",
      "Server-Side Rendering",
      "Responsive UI",
      "Component-Driven Architecture",
      "Premium UI Systems",
      "Core Web Vitals",
    ],
  },
  {
    title: "Backend, Data & APIs",
    description: "Building robust server-side systems and data-driven applications.",
    icon: Database,
    accent: "blue",
    pills: [
      "Node.js",
      "Express",
      "Laravel",
      "RESTful APIs",
      "GraphQL",
      "Supabase",
      "PostgreSQL",
      "SQL",
      "Prisma",
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
    description: "Ensuring secure, reliable, and maintainable software through best practices.",
    icon: ShieldCheck,
    accent: "cyan",
    pills: [
      "Authentication",
      "Session Management",
      "OAuth2",
      "JWT",
      "RBAC",
      "Protected Routes",
      "Server-Side Logic",
      "Multi-Tenant Isolation Boundaries",
      "Secure Auth",
      "Error Handling",
      "Automated Testing",
      "Jest",
      "Vitest",
      "Cypress",
      "TDD",
      "Testing Pipelines",
    ],
  },
  {
    title: "Cloud, DevOps & Languages",
    description: "Shipping and scaling applications with modern DevOps and developer tooling.",
    icon: Cloud,
    accent: "amber",
    pills: [
      "Docker",
      "Docker Compose",
      "AWS",
      "Vercel",
      "Git & GitHub",
      "Senior Git Workflows",
      "GitHub Actions",
      "CI/CD",
      "Serverless Functions",
      "Edge Runtime",
      "Monorepos",
      "Turborepo",
      "Linux",
      "Bash",
      "AI Workflow Automation",
      "Python",
      "Kotlin",
    ],
  },
];

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const SkillPill = ({ label, accentClass }: { label: string; accentClass: string }) => (
  <span
    className={`inline-flex items-center rounded-full border bg-white/[0.02] px-3.5 py-1.5 text-xs leading-none text-zinc-300 transition-all duration-200 hover:text-zinc-100 ${accentClass}`}
  >
    {label}
  </span>
);

const SkillRow = ({
  category,
  isFirst,
}: {
  category: SkillCategory;
  isFirst: boolean;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const accent = ACCENTS[category.accent];
  const Icon = category.icon;

  return (
    <motion.div
      variants={rowVariants}
      className={`grid items-center gap-6 py-8 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-10 ${
        isFirst ? "" : "border-t border-white/[0.06]"
      }`}
    >
      {/* Left: glowing circular icon + title/description */}
      <div className="flex items-center gap-4">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <motion.span
            aria-hidden
            className={`absolute inset-0 rounded-full border ${accent.halo}`}
            animate={
              prefersReducedMotion
                ? { opacity: 0.35 }
                : { scale: [1, 1.16, 1], opacity: [0.5, 0.15, 0.5] }
            }
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <span
            className={`relative flex h-14 w-14 items-center justify-center rounded-full border ${accent.iconWrap}`}
          >
            <Icon size={22} strokeWidth={1.75} />
          </span>
          {/* Decorative accent dot on the ring */}
          <span
            aria-hidden
            className={`absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1 rounded-full ${accent.dot}`}
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
            {category.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
            {category.description}
          </p>
        </div>
      </div>

      {/* Right: wrapped pill chips */}
      <div className="flex flex-wrap gap-2.5">
        {category.pills.map((pill) => (
          <SkillPill key={pill} label={pill} accentClass={accent.pill} />
        ))}
      </div>
    </motion.div>
  );
};

export const SkillsSection = () => (
  <section id="skills" className="relative overflow-hidden bg-[#09090b] py-20 md:py-24">
    {/* Subtle dotted + grid texture — very low contrast */}
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
    </div>

    <div className="container relative mx-auto">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.45 }}
          className="inline-flex flex-col items-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-300/90">
            Skills
          </span>
          <span className="mt-2 h-px w-9 bg-gradient-to-r from-transparent via-indigo-400/80 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-6 text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-5xl"
        >
          Engineering toolkit for
          <br />
          scalable products.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400"
        >
          Frontend, backend, infrastructure, and security skills used to build
          clean production-ready systems.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="mx-auto mt-12 max-w-5xl md:mt-14"
      >
        {CATEGORIES.map((category, index) => (
          <SkillRow key={category.title} category={category} isFirst={index === 0} />
        ))}
      </motion.div>
    </div>
  </section>
);

export const Skills = SkillsSection;
