import { motion } from "framer-motion";
import { Briefcase, LayoutDashboard, ShieldCheck, Workflow } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Years Building Web Products", value: "4+" },
  { icon: LayoutDashboard, label: "Full-Stack Projects Shipped", value: "8+" },
  { icon: Workflow, label: "SaaS Workflows Implemented", value: "5+" },
  { icon: ShieldCheck, label: "Responsive Product Interfaces", value: "100%" },
];

export const Stats = () => (
  <section className="py-12 md:py-16 relative">
    <div className="container">
      <div className="h-px bg-gradient-to-r from-transparent via-amber-400/35 to-transparent mb-8 md:mb-10" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass card-hover rounded-2xl p-5 md:p-6 lg:p-7 border border-amber-300/20 bg-gradient-to-b from-background/65 to-background/35 shadow-[0_12px_30px_-22px_hsl(var(--primary)/0.9)]"
          >
            <s.icon size={20} className="text-amber-300/90 mb-3 md:mb-4" />
            <div className="font-display text-[1.9rem] md:text-[2.2rem] font-semibold tracking-tight text-amber-100 leading-none">{s.value}</div>
            <div className="text-[0.72rem] md:text-sm text-foreground/78 mt-2 md:mt-2.5 leading-relaxed">{s.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mt-8 md:mt-10" />
    </div>
  </section>
);
