import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const groups = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Responsive UI",
      "Product UI",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "Authentication",
      "Authorization",
      "Role-Based Access Control",
    ],
  },
  {
    title: "Data / Payments",
    items: [
      "Supabase",
      "PostgreSQL",
      "Stripe API",
      "Subscription Billing",
      "Secure Payment Flows",
    ],
  },
  {
    title: "Workflow",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "Debugging",
      "Deployment",
      "Performance Optimization",
      "Error / Loading / Empty States",
    ],
  },
  {
    title: "AI / Productivity",
    items: [
      "AI-Assisted Development",
      "GitHub Copilot",
      "Prompt Engineering",
      "Rapid Prototyping",
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
        description="Focused capabilities across frontend, backend, payments, and high-velocity delivery workflows."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass card-hover rounded-2xl p-6"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">{g.title}</div>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="text-xs md:text-sm px-2.5 py-1.5 rounded-full border border-border/80 bg-secondary/45 text-foreground/85"
                >
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
