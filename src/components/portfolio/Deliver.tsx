import { motion } from "framer-motion";
import { Boxes, Database, Lock, Plug, Smartphone, Workflow } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const items = [
  { icon: Boxes, title: "End-to-End Development", desc: "Full ownership from initial wireframes through to deployed, monitored systems." },
  { icon: Workflow, title: "Scalable Architecture", desc: "Clean, modular code that holds up as products and teams grow." },
  { icon: Lock, title: "Authentication & User Systems", desc: "Secure sign-in, sessions, and role-based access patterns done right." },
  { icon: Plug, title: "API Integrations & Backend Logic", desc: "Reliable APIs, third-party integrations, and well-shaped data flows." },
  { icon: Smartphone, title: "Modern Responsive UI/UX", desc: "Interfaces that feel polished on every screen — not just desktop." },
  { icon: Database, title: "Production-Ready Features", desc: "Billing, dashboards, analytics — features built to actually ship." },
];

export const Deliver = () => (
  <section className="py-20 md:py-28">
    <div className="container">
      <SectionHeading
        eyebrow="What I Deliver"
        title={<>Real value, <span className="text-gradient-primary">end to end.</span></>}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="glass card-hover rounded-2xl p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/10 border border-primary/20 inline-flex items-center justify-center mb-4">
              <it.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">{it.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
