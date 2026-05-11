import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Briefcase, LayoutDashboard, ShieldCheck, Workflow } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Years Building Web Products", value: "4+" },
  { icon: LayoutDashboard, label: "Full-Stack Projects Shipped", value: "10+" },
  { icon: Workflow, label: "SaaS Workflows Implemented", value: "5+" },
  { icon: ShieldCheck, label: "Responsive Product Interfaces", value: "100%" },
];

export const Stats = () => {
  const [showCards, setShowCards] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      setShowCards(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShowCards(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.24,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (reduceMotion.matches) {
        setShowCards(true);
      }
    };

    reduceMotion.addEventListener("change", onChange);

    return () => {
      reduceMotion.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <section className="py-12 md:py-16 relative" ref={sectionRef}>
      <div className="container relative">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/35 to-transparent mb-8 md:mb-10" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 relative z-10">
          {stats.map((s, i) => (
            <motion.article
              key={s.label}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={showCards ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 24, filter: "blur(8px)" }}
              transition={{ duration: 0.62, delay: 0.1 + i * 0.11, ease: [0.2, 0.65, 0.2, 1] }}
              className="stats-premium-card rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-7"
            >
              <div className="stats-premium-card-inner">
                <div className="stats-icon-wrap">
                  <s.icon size={18} className="text-amber-200/90" />
                </div>
                <div className="stats-value font-display text-[2rem] md:text-[2.35rem] font-semibold tracking-tight text-amber-100 leading-none">
                  {s.value}
                </div>
                <div className="stats-label text-[0.74rem] md:text-sm text-foreground/80 mt-2.5 md:mt-3 leading-relaxed">
                  {s.label}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mt-8 md:mt-10" />
      </div>
    </section>
  );
};
