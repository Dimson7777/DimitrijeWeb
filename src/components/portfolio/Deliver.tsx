import { motion } from "framer-motion";
import { Boxes, Database, Lock, Plug, Smartphone, Workflow } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const items = [
  { icon: Boxes, title: "End-to-End Development", desc: "From idea and UI to backend logic, deployment, and production polish." },
  { icon: Workflow, title: "Scalable Architecture", desc: "Modular code, reusable components, and structures that stay maintainable as products grow." },
  { icon: Lock, title: "Authentication & Access Control", desc: "Secure user flows, protected routes, sessions, and role-based permissions." },
  { icon: Plug, title: "API Integrations", desc: "Reliable API logic, third-party integrations, and clean data flow between services." },
  { icon: Smartphone, title: "Product UI / UX", desc: "Responsive interfaces with polished states, clear hierarchy, and real usability." },
  { icon: Database, title: "SaaS Workflows", desc: "Billing, dashboards, user settings, analytics views, and subscription-based product flows." },
];

export const Deliver = () => (
  <section className="py-20 md:py-28">
    <div className="container">
      <SectionHeading
        eyebrow="What I Deliver"
        title={<>Real product value, <span className="text-gradient-primary">end to end.</span></>}
        description="From frontend interfaces to backend logic, I focus on shipping features that are usable, reliable, and ready for real users."
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {items.map((it) => (
          <motion.div
            key={it.title}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="glass card-hover rounded-2xl p-6 border border-border/70"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/10 border border-primary/25 inline-flex items-center justify-center mb-4">
              <it.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2.5">{it.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
