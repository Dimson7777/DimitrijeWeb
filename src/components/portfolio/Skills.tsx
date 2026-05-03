import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const groups = [
  {
    title: "Frontend",
    items: [
      "React (component architecture & hooks)",
      "Next.js (SSR, routing, performance)",
      "TypeScript (type-safe applications)",
      "Tailwind CSS (responsive UI systems)",
      "State management & data fetching",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js (production-grade applications)",
      "Express.js (API architecture & middleware)",
      "RESTful API design & integration",
      "Authentication & Authorization",
      "API security & validation",
    ],
  },
  {
    title: "Data & Integrations",
    items: [
      "Supabase (auth, database, real-time)",
      "PostgreSQL (data modeling & queries)",
      "Stripe API (payments & subscriptions)",
      "Third-party API integrations",
      "Environment configuration",
    ],
  },
  {
    title: "Workflow",
    items: [
      "Git & GitHub (version control)",
      "Vercel deployment",
      "Debugging & error handling",
      "Performance optimization",
      "Clean architecture & problem solving",
    ],
  },
];

export const Skills = () => (
  <section id="skills" className="py-20 md:py-28">
    <div className="container">
      <SectionHeading
        eyebrow="SKILLS"
        title={<>The <span className="text-gradient-primary">stack</span> I build with.</>}
        description="Technologies I use to build scalable, production-ready applications."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
            <ul className="space-y-2.5">
              {g.items.map((it) => (
                <li key={it} className="flex items-center gap-3 text-foreground/85">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  <span className="text-sm md:text-base">{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
