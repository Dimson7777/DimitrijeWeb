import { motion } from "framer-motion";
import { Compass, Dumbbell, LineChart } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const items = [
  {
    icon: Dumbbell,
    title: "Gym & Discipline",
    desc: "Training keeps me consistent, focused, and structured. It helps me build discipline, manage pressure, and bring better energy into my work.",
    chips: ["Consistency", "Focus", "Routine"],
  },
  {
    icon: Compass,
    title: "World Travel",
    desc: "Travel gives me perspective, adaptability, and a better understanding of how different people use products in real life.",
    chips: ["Perspective", "Adaptability", "Culture"],
  },
  {
    icon: LineChart,
    title: "Investing & Long-Term Thinking",
    desc: "Investing taught me patience, research, risk awareness, and how to think in systems instead of short-term reactions.",
    chips: ["Research", "Patience", "Strategy"],
  },
];

export const Deliver = () => (
  <section className="py-20 md:py-28">
    <div className="container">
      <SectionHeading
        eyebrow="BEYOND CODE"
        title={<>How I stay sharp outside engineering.</>}
        description="The same habits I bring into software - discipline, curiosity, consistency, and long-term thinking - also shape how I spend time outside of work."
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
        }}
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
      >
        <div className="pointer-events-none absolute -inset-x-8 top-10 h-40 bg-gradient-to-r from-primary/8 via-accent-cyan/10 to-primary-glow/8 blur-3xl" />

        {items.map((it) => (
          <motion.div
            key={it.title}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative group glass rounded-2xl p-5 md:p-6 border border-primary/15 bg-gradient-to-b from-background/65 to-background/35 min-h-[250px] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_16px_44px_-26px_hsl(var(--primary)/0.8)]"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-primary/25 via-accent-cyan/15 to-primary-glow/10 border border-primary/30 inline-flex items-center justify-center mb-4 shadow-[0_0_18px_-10px_hsl(var(--primary)/0.8)]">
              <it.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-display text-[1.04rem] md:text-lg font-semibold mb-2.5 leading-snug">{it.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{it.desc}</p>

            <div className="mt-auto flex flex-wrap gap-2">
              {it.chips.map((chip) => (
                <span
                  key={chip}
                  className="text-[0.68rem] md:text-[0.72rem] px-2.5 py-1 rounded-full border border-border/70 bg-secondary/35 text-foreground/80"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
