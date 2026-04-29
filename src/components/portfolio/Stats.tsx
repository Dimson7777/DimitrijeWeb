import { motion } from "framer-motion";
import { Briefcase, Code2, Layers, Rocket } from "lucide-react";

const stats = [
  { icon: Rocket, label: "Projects Delivered", value: "10+" },
  { icon: Layers, label: "Stack", value: "Full Stack" },
  { icon: Code2, label: "Focus", value: "Web Applications" },
  { icon: Briefcase, label: "Experience", value: "Production Systems" },
];

export const Stats = () => (
  <section className="py-12 md:py-16">
    <div className="container">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass card-hover rounded-2xl p-5 md:p-6"
          >
            <s.icon size={20} className="text-primary mb-3" />
            <div className="font-display text-xl md:text-2xl font-bold text-gradient">{s.value}</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
