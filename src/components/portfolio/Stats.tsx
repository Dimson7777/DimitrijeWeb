import { motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Briefcase, LayoutDashboard, ShieldCheck, Workflow } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Years Building Web Products", value: "4+" },
  { icon: LayoutDashboard, label: "Full-Stack Projects Shipped", value: "10+" },
  { icon: Workflow, label: "SaaS Workflows Implemented", value: "5+" },
  { icon: ShieldCheck, label: "Responsive Product Interfaces", value: "100%" },
];

const CINEMATIC_PARTICLES = [
  { top: "28%", left: "14%", delay: "0.05s", duration: "1.1s" },
  { top: "40%", left: "24%", delay: "0.13s", duration: "1.18s" },
  { top: "34%", left: "39%", delay: "0.19s", duration: "1.08s" },
  { top: "26%", left: "56%", delay: "0.28s", duration: "1.2s" },
  { top: "44%", left: "68%", delay: "0.35s", duration: "1.14s" },
  { top: "33%", left: "82%", delay: "0.44s", duration: "1.06s" },
];

export const Stats = () => {
  const [showCards, setShowCards] = useState(false);
  const [isDragonActive, setIsDragonActive] = useState(false);
  const [canPlayDragon, setCanPlayDragon] = useState<boolean | null>(null);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [hasScrolledPastTop, setHasScrolledPastTop] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);
  const cinematicTimerRef = useRef<number | null>(null);

  const triggerDragon = () => {
    if (hasTriggeredRef.current) {
      return;
    }

    hasTriggeredRef.current = true;

    if (canPlayDragon === false) {
      setShowCards(true);
      return;
    }

    setIsDragonActive(true);
    cinematicTimerRef.current = window.setTimeout(() => {
      setIsDragonActive(false);
      setShowCards(true);
    }, 2000);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreferences = () => {
      const shouldPlay = !reduceMotion.matches;
      setCanPlayDragon(shouldPlay);

      if (!shouldPlay) {
        setIsDragonActive(false);
        setShowCards(true);
      } else if (!hasTriggeredRef.current) {
        setShowCards(false);
      }
    };

    syncPreferences();

    reduceMotion.addEventListener("change", syncPreferences);

    return () => {
      reduceMotion.removeEventListener("change", syncPreferences);

      if (cinematicTimerRef.current !== null) {
        window.clearTimeout(cinematicTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolledPastTop(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (canPlayDragon === null || hasTriggeredRef.current) {
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) {
          return;
        }

        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.28;
        setIsSectionInView(inView);

        if (!inView) {
          return;
        }
      },
      {
        threshold: [0.22, 0.32, 0.44],
        rootMargin: "0px 0px -15% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [canPlayDragon]);

  useEffect(() => {
    if (canPlayDragon === null || hasTriggeredRef.current || !isSectionInView || !hasScrolledPastTop) {
      return;
    }

    triggerDragon();
  }, [canPlayDragon, hasScrolledPastTop, isSectionInView]);

  return (
    <section className="py-12 md:py-16 relative" ref={sectionRef}>
      {isDragonActive &&
        createPortal(
          <div className="stats-dragon-overlay is-active" aria-hidden="true">
            <div className="stats-dragon-vignette" />
            <div className="stats-dragon-flight" role="presentation">
              <svg
                viewBox="0 0 230 72"
                className="stats-dragon"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  d="M6 44 C18 36, 35 29, 53 27 C69 25, 84 20, 102 12 C113 7, 123 9, 132 16 C141 23, 152 28, 167 29 C181 30, 197 36, 224 50 C204 45, 188 46, 173 51 C158 56, 147 57, 132 54 C116 50, 99 43, 87 43 C74 43, 61 48, 48 54 C36 59, 22 60, 9 54 C20 50, 28 45, 35 41 C28 40, 18 42, 6 44 Z"
                  className="stats-dragon-body"
                />
                <path
                  d="M69 30 C79 18, 94 10, 116 8 C107 17, 98 23, 89 27 C80 30, 74 31, 69 30 Z"
                  className="stats-dragon-wing"
                />
                <path
                  d="M95 37 C106 31, 121 31, 138 40 C126 42, 114 44, 103 43 C98 42, 96 40, 95 37 Z"
                  className="stats-dragon-wing"
                />
              </svg>
              <span className="stats-dragon-trail" />
            </div>
            <div className="stats-dragon-particles" role="presentation">
              {CINEMATIC_PARTICLES.map((particle, index) => (
                <span
                  key={index}
                  className="stats-dragon-particle"
                  style={
                    {
                      top: particle.top,
                      left: particle.left,
                      "--stats-dragon-delay": particle.delay,
                      "--stats-dragon-duration": particle.duration,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          </div>,
          document.body,
        )}

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
