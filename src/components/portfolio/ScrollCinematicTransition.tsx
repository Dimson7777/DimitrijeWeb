import { Children, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Phase = "idle" | "playing" | "done";

const DRAGON_PARTICLES = [
  { top: "18%", left: "12%", delay: "0.04s", duration: "1.2s" },
  { top: "34%", left: "26%", delay: "0.12s", duration: "1.05s" },
  { top: "42%", left: "40%", delay: "0.19s", duration: "1.16s" },
  { top: "22%", left: "56%", delay: "0.27s", duration: "1.08s" },
  { top: "50%", left: "64%", delay: "0.36s", duration: "1.22s" },
  { top: "28%", left: "78%", delay: "0.43s", duration: "1.1s" },
  { top: "40%", left: "88%", delay: "0.5s", duration: "1.18s" },
];

export const ScrollCinematicTransition = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [dragonEnabled, setDragonEnabled] = useState(true);

  const triggerRef = useRef<HTMLDivElement>(null);
  const revealRootRef = useRef<HTMLDivElement>(null);
  const playTimerRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");

    const updatePreferences = () => {
      const shouldEnable = !reduceMotion.matches && !mobile.matches;
      setDragonEnabled(shouldEnable);

      if (!shouldEnable) {
        setPhase("done");
      } else if (!hasPlayedRef.current) {
        setPhase("idle");
      }
    };

    updatePreferences();

    reduceMotion.addEventListener("change", updatePreferences);
    mobile.addEventListener("change", updatePreferences);

    return () => {
      reduceMotion.removeEventListener("change", updatePreferences);
      mobile.removeEventListener("change", updatePreferences);
    };
  }, []);

  useEffect(() => {
    if (!dragonEnabled) {
      return;
    }

    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry || !entry.isIntersecting || hasPlayedRef.current || window.scrollY < 20) {
          return;
        }

        hasPlayedRef.current = true;
        setPhase("playing");

        playTimerRef.current = window.setTimeout(() => {
          setPhase("done");
        }, 1550);

        observer.disconnect();
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
      if (playTimerRef.current !== null) {
        window.clearTimeout(playTimerRef.current);
      }
    };
  }, [dragonEnabled]);

  useEffect(() => {
    if (phase !== "done") {
      return;
    }

    const root = revealRootRef.current;
    if (!root) {
      return;
    }

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-cinematic-reveal]"));
    if (targets.length === 0) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.17,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    targets.forEach((target) => revealObserver.observe(target));

    return () => {
      revealObserver.disconnect();
    };
  }, [phase]);

  const sections = Array.from(Children.toArray(children));

  return (
    <div className="relative" ref={revealRootRef}>
      <div className="cinematic-trigger" ref={triggerRef} aria-hidden="true" />

      <div
        className={`cinematic-overlay ${phase === "playing" ? "is-active" : ""}`}
        aria-hidden="true"
      >
        <div className="cinematic-overlay-vignette" />
        <div className="cinematic-flight" role="presentation">
          <svg
            viewBox="0 0 220 70"
            className="cinematic-dragon"
            focusable="false"
            aria-hidden="true"
          >
            <path
              d="M5 43 C20 34, 39 26, 56 24 C72 23, 87 18, 102 12 C112 8, 122 10, 130 16 C139 23, 150 28, 165 29 C180 30, 195 36, 215 49 C197 44, 181 46, 167 50 C154 54, 144 56, 130 54 C115 51, 99 45, 86 45 C73 45, 59 49, 46 54 C35 58, 22 60, 10 55 C20 51, 28 47, 35 43 C28 42, 17 44, 5 43 Z"
              className="cinematic-dragon-body"
            />
            <path
              d="M66 28 C75 18, 90 10, 112 8 C103 16, 94 22, 86 26 C79 29, 72 30, 66 28 Z"
              className="cinematic-dragon-wing"
            />
            <path
              d="M91 36 C101 31, 115 31, 130 39 C119 41, 108 43, 99 42 C95 41, 92 39, 91 36 Z"
              className="cinematic-dragon-wing"
            />
          </svg>
          <span className="cinematic-flight-blur" />
        </div>

        <div className="cinematic-particles" role="presentation">
          {DRAGON_PARTICLES.map((particle, index) => (
            <span
              key={index}
              className="cinematic-particle"
              style={
                {
                  top: particle.top,
                  left: particle.left,
                  "--particle-delay": particle.delay,
                  "--particle-duration": particle.duration,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      {sections.map((section, index) => (
        <div
          key={index}
          data-cinematic-reveal
          className={`cinematic-reveal ${phase === "done" ? "can-reveal" : ""}`}
          style={
            {
              "--reveal-delay": `${Math.min(index * 70, 260)}ms`,
            } as CSSProperties
          }
        >
          {section}
        </div>
      ))}
    </div>
  );
};
