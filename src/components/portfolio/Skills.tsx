import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const groups = [
  { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Express", "REST APIs", "Authentication"] },
  { title: "Data", items: ["Supabase", "PostgreSQL", "Stripe API"] },
  { title: "Workflow", items: ["Git", "GitHub", "Debugging", "Clean Architecture"] },
];

export const Skills = () => (
  <section id="skills" className="py-20 md:py-28">
    <div className="container">
      <SectionHeading
        eyebrow="Skills"
        title={<>The <span className="text-gradient-primary">stack</span> I work in.</>}
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
