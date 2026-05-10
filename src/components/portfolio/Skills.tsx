import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const groups = [
  {
    title: "Frontend",
    description: "Product interfaces, responsive layouts, and clean component systems.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Responsive UI",
      "Product UI",
      "Component Architecture",
    ],
  },
  {
    title: "Backend",
    description: "APIs, auth flows, protected logic, and server-side product features.",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "Authentication",
      "Authorization",
      "RBAC",
      "Protected Routes",
      "Server-Side Logic",
    ],
  },
  {
    title: "Data / Payments",
    description: "Database-backed features, billing flows, and subscription-based SaaS logic.",
    items: [
      "Supabase",
      "PostgreSQL",
      "Stripe API",
      "Subscription Billing",
      "Checkout Flows",
      "Webhooks",
      "Plan Gating",
    ],
  },
  {
    title: "Workflow / Delivery",
    description: "Reliable delivery from local development to production deployment.",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "Deployment",
      "Debugging",
      "Performance Optimization",
      "Code Review",
      "Product QA",
    ],
  },
  {
    title: "Quality / Tooling",
    description: "Engineering habits that help keep product flows stable, tested, and maintainable.",
    items: [
      "Testing Basics",
      "API Testing",
      "Error Handling",
      "Loading States",
      "Empty States",
      "CI/CD Fundamentals",
      "Documentation",
    ],
  },
  {
    title: "AI-Assisted Engineering",
    description: "Using AI tools carefully for debugging, refactoring, planning, and code review while keeping engineering decisions controlled.",
    items: [
      "GitHub Copilot",
      "AI-Assisted Debugging",
      "Refactoring Support",
      "Prompt Engineering",
      "Code Review Support",
      "Code Refactoring",
    ],
  },
];

export const Skills = () => (
  <section id="skills" className="py-20 md:py-28">
    <div className="container">
      <SectionHeading
        eyebrow="SKILLS"
        title={<>Engineering <span className="text-gradient-primary">toolkit</span> for product delivery.</>}
        description="A focused stack for building reliable full-stack products across frontend, backend, payments, deployment, testing, and AI-assisted engineering workflows."
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {groups.map((g, i) => {
          return (
            <motion.article
              key={g.title}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.48, ease: "easeOut" }}
              className="glass rounded-2xl border border-primary/15 bg-gradient-to-b from-background/65 to-background/35 p-5 md:p-6 min-h-[280px] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_16px_44px_-26px_hsl(var(--primary)/0.8)] shadow-[0_12px_32px_-24px_hsl(var(--primary)/0.8)]"
            >
              <div className="text-[0.68rem] font-mono uppercase tracking-[0.22em] text-primary/90 mb-3">{g.title}</div>
              <p className="text-sm text-foreground/78 leading-relaxed mb-5 md:mb-6">{g.description}</p>
              <ul className="flex flex-wrap gap-2.5 mt-auto">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="text-xs md:text-[0.8rem] px-2.5 py-1.5 rounded-full border border-border/70 bg-secondary/35 text-foreground/85"
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