import { Children, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export const ScrollCinematicTransition = ({
  children,
}: {
  children: ReactNode;
}) => {
  const revealRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  const sections = Array.from(Children.toArray(children));

  return (
    <div className="relative" ref={revealRootRef}>
      {sections.map((section, index) => (
        <div
          key={index}
          data-cinematic-reveal
          className="cinematic-reveal can-reveal"
          style={
            {
              "--reveal-delay": `${Math.min(index * 90, 420)}ms`,
            } as CSSProperties
          }
        >
          {section}
        </div>
      ))}
    </div>
  );
};
