import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const groups = [
  {
    title: "Languages",
    description: "Core programming and query languages used for production-grade full-stack systems.",
    items: [
      "TypeScript",
      "JavaScript",
      "SQL",
      "PostgreSQL",
      "Bash Shell Scripting",
    ],
  },
  {
    title: "Backend & Distributed Systems",
    description: "Scalable server architecture, API boundaries, and data-intensive backend engineering.",
    items: [
      "Node.js",
      "Express",
      "Laravel",
      "RESTful API Design",
      "GraphQL",
      "Redis",
      "WebSockets",
      "Message Queues",
      "BullMQ",
      "Database Architecture",
      "Connection Pooling",
      "Query Optimization",
      "Advanced Indexing",
      "Prisma",
      "Eloquent",
    ],
  },
  {
    title: "Frontend Engineering & Premium UI",
    description: "High-performance frontend architecture for polished interfaces and measurable user experience.",
    items: [
      "React",
      "Next.js",
      "Redux Toolkit",
      "Component-Driven Architecture",
      "Lifecycle Optimization",
      "Tailwind CSS",
      "Radix UI",
      "UI Primitives",
      "State Propagation",
      "Server-Side Rendering",
      "Client-Side Hydration",
      "Core Web Vitals",
    ],
  },
  {
    title: "Cloud, DevOps & Infrastructure",
    description: "Deployment, automation, and infrastructure practices for stable, repeatable delivery.",
    items: [
      "Docker",
      "Docker Compose",
      "AWS",
      "GitHub Actions",
      "CI/CD Pipelines",
      "Edge Runtime",
      "Serverless Functions",
      "Vercel",
      "Monorepos",
      "Turborepo",
      "Linux System Administration",
      "Senior Git Workflows",
    ],
  },
  {
    title: "Security & Engineering Excellence",
    description: "Security-first implementation and quality disciplines for resilient production systems.",
    items: [
      "Authentication",
      "Session Management",
      "OAuth2",
      "JWT",
      "Granular RBAC",
      "Multi-Tenant Isolation Boundaries",
      "Automated Testing",
      "Jest",
      "Vitest",
      "Cypress",
      "Test-Driven Development",
      "AI Workflow Automation",
    ],
  },
];

const cardOrder = [
  "Backend & Distributed Systems",
  "Frontend Engineering & Premium UI",
  "Security & Engineering Excellence",
  "Cloud, DevOps & Infrastructure",
  "Languages",
] as const;

const orderedGroups = cardOrder
  .map((title) => groups.find((g) => g.title === title))
  .filter((g): g is (typeof groups)[number] => Boolean(g));

export const Skills = () => (
  <section id="skills" className="py-20 md:py-28 relative overflow-hidden">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(70%_55%_at_50%_18%,hsl(var(--primary)/0.14),transparent_70%)]"
    />

    <div className="container relative z-10">
      <SectionHeading
        eyebrow="TECHNICAL EXPERTISE"
        title={<>Engineering <span className="text-gradient-primary">Capabilities</span></>}
        description="A production-focused stack across distributed systems, frontend architecture, infrastructure, security, testing, and delivery."
      />

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8 md:mb-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent origin-left"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6 items-start">
        {orderedGroups.map((g) => {
          const isLanguages = g.title === "Languages";
          const cardSpan =
            g.title === "Cloud, DevOps & Infrastructure"
              ? "lg:col-span-4"
              : "lg:col-span-2";

            return (
              <motion.article
                key={g.title}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.48, ease: "easeOut" }}
                className={`glass rounded-2xl border border-primary/25 bg-[linear-gradient(165deg,hsl(var(--background)/0.78)_0%,hsl(var(--background)/0.5)_55%,hsl(var(--background)/0.34)_100%)] p-5 md:p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_18px_52px_-28px_hsl(var(--primary)/0.95)] shadow-[0_14px_36px_-24px_hsl(var(--primary)/0.75)] ${cardSpan} ${
                isLanguages ? "min-h-[220px]" : "min-h-[290px]"
              }`}
              >
                <div className="mb-4 md:mb-5">
                  <div className="text-[0.66rem] font-mono uppercase tracking-[0.2em] text-primary/90 mb-2">
                  {g.title}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{g.description}</p>
                </div>

                <div className="h-px w-full mb-4 md:mb-5 bg-gradient-to-r from-primary/35 via-primary/15 to-transparent" />

                <ul className="flex flex-wrap content-start gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="inline-flex items-center text-[0.72rem] md:text-xs h-7 px-2.5 rounded-full border border-border/70 bg-secondary/35 text-foreground/85 leading-none"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
      </motion.div>
    </div>
  </section>
);