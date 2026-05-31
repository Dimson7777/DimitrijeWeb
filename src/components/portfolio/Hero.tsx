import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { StatusCapsule } from "@/components/portfolio/StatusCapsule";

const FULL_HEADLINE = "Building production-ready\nfull-stack systems for\nmodern digital products.";
const TYPE_INTERVAL_MS = 38;

/** Shared premium easing curve for entrance reveals. */
const EASE = [0.22, 1, 0.36, 1] as const;

const HERO_STATS = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 30, suffix: "+", label: "Full-Stack Projects" },
  { value: 20, suffix: "+", label: "SaaS Workflows" },
  { value: 100, suffix: "%", label: "Responsive Interfaces" },
];

const PARTICLES = [
  { top: "18%", left: "14%", size: 8, delay: 0, dur: 7.4, tone: "primary" },
  { top: "22%", left: "72%", size: 10, delay: 0.8, dur: 8.2, tone: "cyan" },
  { top: "64%", left: "28%", size: 7, delay: 1.3, dur: 7.8, tone: "cyan" },
  { top: "70%", left: "82%", size: 9, delay: 1.8, dur: 8.6, tone: "primary" },
  { top: "38%", left: "8%", size: 5, delay: 0.5, dur: 9.2, tone: "primary" },
  { top: "12%", left: "46%", size: 4, delay: 1.1, dur: 8.8, tone: "cyan" },
  { top: "54%", left: "62%", size: 6, delay: 2.1, dur: 9.6, tone: "primary" },
  { top: "80%", left: "50%", size: 5, delay: 1.6, dur: 8.0, tone: "cyan" },
] as const;

export const Hero = () => {
  const [displayedText, setDisplayedText] = useState(FULL_HEADLINE);
  const [isTyping, setIsTyping] = useState(false);
  const [revealContent, setRevealContent] = useState(true);
  const [revealStats, setRevealStats] = useState(true);

  const prefersReducedMotion = useReducedMotion();

  // Subtle pointer parallax for cinematic depth (GPU transform only, fine pointers).
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 60, damping: 18, mass: 0.6 };
  const smoothX = useSpring(pointerX, springConfig);
  const smoothY = useSpring(pointerY, springConfig);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const gridX = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const gridY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      setDisplayedText(FULL_HEADLINE);
      setIsTyping(false);
      setRevealContent(true);
      setRevealStats(true);
      return;
    }

    setIsTyping(true);
    setRevealContent(false);
    setRevealStats(false);
    setDisplayedText("");

    let index = 0;
    let timeoutId = 0;

    const typeNext = () => {
      index += 1;
      setDisplayedText(FULL_HEADLINE.slice(0, index));

      if (index >= FULL_HEADLINE.length) {
        setIsTyping(false);
        window.setTimeout(() => setRevealContent(true), 130);
        return;
      }

      const nextDelay = FULL_HEADLINE[index] === "\n" ? TYPE_INTERVAL_MS + 70 : TYPE_INTERVAL_MS;
      timeoutId = window.setTimeout(typeNext, nextDelay);
    };

    timeoutId = window.setTimeout(typeNext, TYPE_INTERVAL_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!revealContent) {
      setRevealStats(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setRevealStats(true);
    }, 340);

    return () => {
      window.clearTimeout(timer);
    };
  }, [revealContent]);

  const fixedHeadlineLines = FULL_HEADLINE.split("\n");
  const typedLines = displayedText.split("\n");

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative overflow-hidden pt-28 md:pt-36 pb-24 md:pb-32"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(178deg,hsl(232_34%_6%)_0%,hsl(232_30%_5%)_56%,hsl(230_26%_5%)_100%)]" />

        {/* Depth layer: glows + particles drift gently with the pointer */}
        <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0">
          <motion.div
            animate={prefersReducedMotion ? undefined : { rotate: [0, 8, 0, -8, 0], scale: [1, 1.04, 1.01, 1.04, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[32%] left-1/2 -ml-[525px] h-[1050px] w-[1050px] rounded-full opacity-[0.2] blur-3xl bg-[conic-gradient(from_180deg_at_50%_50%,hsl(var(--primary)/0.18),hsl(var(--accent-cyan)/0.1),hsl(var(--primary-glow)/0.14),hsl(var(--primary)/0.18))]"
          />
          <motion.div
            animate={prefersReducedMotion ? undefined : { x: [0, 26, -18, 0], y: [0, 16, -10, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[18%] top-[2%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.22),transparent_70%)] blur-[90px]"
          />
          <motion.div
            animate={prefersReducedMotion ? undefined : { opacity: [0.22, 0.34, 0.2, 0.22], x: [0, 20, -12, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-x-8 top-20 h-36 bg-[linear-gradient(90deg,transparent,hsl(var(--accent-cyan)/0.16),transparent)] blur-3xl"
          />
          <motion.div
            animate={prefersReducedMotion ? undefined : { x: ["-8%", "8%", "-8%"], opacity: [0.2, 0.33, 0.2] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-[-14%] bottom-[18%] h-32 bg-[repeating-linear-gradient(100deg,transparent_0%,transparent_12%,hsl(var(--primary)/0.12)_26%,transparent_38%)] blur-2xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(36%_32%_at_78%_28%,hsl(var(--accent-cyan)/0.1),transparent_78%)]" />

          {PARTICLES.map((particle, index) => (
            <motion.span
              key={index}
              className={`absolute rounded-full opacity-20 blur-[1px] ${
                particle.tone === "cyan" ? "bg-accent-cyan/40" : "bg-primary/40"
              }`}
              style={{
                top: particle.top,
                left: particle.left,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={prefersReducedMotion ? undefined : { y: [0, -10, 0], opacity: [0.12, 0.36, 0.12] }}
              transition={{ duration: particle.dur, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        <motion.div style={{ x: gridX, y: gridY }} className="absolute inset-0 grid-bg opacity-[0.055]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background/70" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <StatusCapsule label="Engineering Clean UI & Scalable Systems" />

          <h1 className="mt-8 md:mt-10 mx-auto max-w-[20ch] min-h-[3.05em] font-display text-[clamp(2.3rem,7.2vw,5.2rem)] font-bold leading-[0.98] tracking-[-0.02em] text-foreground">
            {fixedHeadlineLines.map((_, lineIndex) => (
              <span
                key={lineIndex}
                className={`block hero-headline-line ${lineIndex === 1 ? "text-gradient-primary" : "text-foreground"}`}
              >
                {typedLines[lineIndex] && typedLines[lineIndex].length > 0 ? typedLines[lineIndex] : "\u00A0"}
              </span>
            ))}
            {isTyping && <span className="hero-type-cursor" aria-hidden="true" />}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: revealContent ? 1 : 0, y: revealContent ? 0 : 12 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mt-7 md:mt-8 mx-auto max-w-[66ch] text-base md:text-lg text-foreground/78 leading-relaxed"
          >
            I build production-ready full-stack applications with clean UI, secure authentication, API-driven architecture, scalable backend logic, and polished user experiences designed for real-world use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: revealContent ? 1 : 0, y: revealContent ? 0 : 12 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
            className="mt-9 md:mt-10"
          >
            <div className="flex flex-wrap justify-center items-center gap-3.5">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-medium text-sm shadow-[0_10px_34px_-12px_hsl(var(--primary)/0.58)] hover:shadow-[0_14px_42px_-10px_hsl(var(--primary)/0.72)] transition-all hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-card/35 text-foreground font-medium text-sm hover:border-primary/45 hover:bg-card/55 transition-all hover:-translate-y-0.5"
              >
                Contact Me
              </a>
            </div>

            <div className="mt-3.5 flex justify-center">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/85 text-foreground/92 font-medium text-sm hover:border-primary/40 hover:bg-secondary/45 hover:-translate-y-0.5 transition-all"
              >
                <ExternalLink size={16} /> View CV
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: revealStats ? 1 : 0, y: revealStats ? 0 : 12 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mt-11 md:mt-12 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 items-start">
            {HERO_STATS.map((stat, index) => (
              <StatMetric
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={0.14 + index * 0.12}
                showDivider={index < HERO_STATS.length - 1}
                start={revealStats}
              />
            ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: revealContent ? 1 : 0, y: revealContent ? 0 : 10 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.24 }}
            className="mt-9 flex items-center justify-center gap-3"
          >
            <SocialIcon href="https://github.com/Dimson7777" label="GitHub">
              <Github size={18} />
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/dimitrije-bukejlovic-9055a8400/" label="LinkedIn">
              <Linkedin size={18} />
            </SocialIcon>
            <SocialIcon href="mailto:dimibukejlovic@icloud.com" label="Email">
              <Mail size={18} />
            </SocialIcon>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatMetric = ({
  value,
  suffix,
  label,
  delay,
  showDivider,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  showDivider: boolean;
  start: boolean;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [shouldCount, setShouldCount] = useState(false);

  useEffect(() => {
    if (start) {
      setShouldCount(true);
    }
  }, [start]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: start ? 1 : 0, y: start ? 0 : 14 }}
      transition={{ duration: 0.45, delay }}
      className="group relative px-1"
    >
      {showDivider && (
        <span
          aria-hidden
          className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 h-9 w-px bg-gradient-to-b from-transparent via-primary/35 to-transparent"
        />
      )}

      <div className="relative inline-flex items-center justify-center">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-[-0.35rem] inset-y-[-0.2rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.14),transparent_72%)] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="relative inline-flex items-baseline overflow-hidden font-display text-[1.85rem] font-bold leading-none text-foreground md:text-[2rem]">
          <span className="relative z-10 inline-flex items-baseline transition-transform duration-300 group-hover:scale-[1.03]">
            <span className="relative">
              <AnimatedCounter target={value} start={shouldCount} />
              <span aria-hidden className="ml-[0.02em]">{suffix}</span>
            </span>
          </span>
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-[-10%] left-[-65%] w-1/2 bg-gradient-to-r from-transparent via-white/55 to-transparent mix-blend-screen opacity-0 blur-[1px]"
            animate={prefersReducedMotion ? { opacity: 0 } : { x: [0, 320], opacity: [0, 0.75, 0] }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 3.8, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 text-transparent [text-shadow:0_0_18px_rgba(168,85,247,0.22),0_0_26px_rgba(34,211,238,0.16)]"
          >
            <AnimatedCounter target={value} start={shouldCount} />
            {suffix}
          </span>
        </div>
      </div>
      <div className="mt-2 text-[0.63rem] md:text-[0.68rem] font-mono uppercase tracking-[0.14em] text-foreground/62">{label}</div>
    </motion.div>
  );
};

const AnimatedCounter = ({ target, start }: { target: number; start: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    let frame = 0;
    let startTime: number | null = null;
    const duration = 1100;

    const tick = (time: number) => {
      if (startTime === null) {
        startTime = time;
      }

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [start, target]);

  return <>{value}</>;
};

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-border/80 bg-card/40 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:-translate-y-0.5 transition-all"
  >
    {children}
  </a>
);
