import { motion } from "framer-motion";
import { Dumbbell, Globe, TrendingUp } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const focusAreas = [
  {
    icon: Dumbbell,
    title: "Gym & Discipline",
    description:
      "Physical training keeps my execution standards high. It reinforces consistency when momentum slows, and that mindset carries directly into product delivery, technical quality, and calm decision-making under pressure.",
  },
  {
    icon: Globe,
    title: "World Travel",
    description:
      "Travel helps me think beyond one default perspective. It sharpens adaptability, improves how I communicate across contexts, and makes me more deliberate about building products that feel intuitive to diverse users.",
  },
  {
    icon: TrendingUp,
    title: "Investing & Long-Term Thinking",
    description:
      "Investing trained me to evaluate tradeoffs over longer horizons. I apply that same lens in engineering by prioritizing durable architecture, risk-aware decisions, and systems that compound value over time.",
  },
];

export const BeyondCode = () => (
  <section id="beyond-code" className="py-20 md:py-28 relative">
    <div className="container relative beyond-editorial-shell">
      <div className="beyond-editorial-glow" aria-hidden="true" />

      <SectionHeading
        eyebrow="BEYOND CODE"
        title={<>How I stay sharp outside engineering.</>}
        description="The routines and lenses below shape how I think about consistency, adaptability, and long-term product outcomes."
      />

      <motion.div
        className="beyond-editorial-list"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
        }}
      >
        {focusAreas.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              key={item.title}
              className="beyond-editorial-item"
              variants={{
                hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.55, ease: [0.2, 0.65, 0.2, 1] }}
            >
              <div className="beyond-editorial-rule" aria-hidden="true" />

              <div className="beyond-editorial-content">
                <div className="beyond-icon-wrap" aria-hidden="true">
                  <Icon size={20} className="beyond-icon" strokeWidth={1.8} />
                </div>

                <div className="beyond-copy-wrap">
                  <p className="beyond-index">0{index + 1}</p>
                  <h3 className="beyond-title">{item.title}</h3>
                  <p className="beyond-description">{item.description}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  </section>
);
