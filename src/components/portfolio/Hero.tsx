import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { StatusCapsule } from "@/components/portfolio/StatusCapsule";

/** Shared premium easing curve for entrance reveals. */
const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE_LINES = [
  "Building production-ready",
  "full-stack systems for",
  "modern digital products.",
];
/** Index of the line rendered in the blue/cyan gradient. */
const GRADIENT_LINE = 1;

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

// --- Entrance orchestration variants -------------------------------------

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const lineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const statsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const statItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [startCount, setStartCount] = useState(false);
  const [typedChars, setTypedChars] = useState(prefersReducedMotion ? HEADLINE_LINES.join(" ").length : 0);
  const [headlineDone, setHeadlineDone] = useState(prefersReducedMotion);

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

  // Kick off the stats count-up shortly after the cascade reaches them.
  useEffect(() => {
    if (prefersReducedMotion) {
      setStartCount(true);
      return;
    }
    const timer = window.setTimeout(() => setStartCount(true), 750);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const fullHeadline = HEADLINE_LINES.join(" ");
    if (prefersReducedMotion) {
      setTypedChars(fullHeadline.length);
      setHeadlineDone(true);
      return;
    }

    setTypedChars(0);
    setHeadlineDone(false);

    let current = 0;
    const baseDelay = 54;

    const timer = window.setInterval(() => {
      current += 1;
      setTypedChars(current);

      if (current >= fullHeadline.length) {
        window.clearInterval(timer);
        window.setTimeout(() => setHeadlineDone(true), 200);
      }
    }, baseDelay);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const fullHeadline = HEADLINE_LINES.join(" ");
  const typedText = fullHeadline.slice(0, typedChars);
  const lineOneLength = HEADLINE_LINES[0].length;
  const lineTwoLength = HEADLINE_LINES[1].length;
  const typedLineOne = typedText.slice(0, lineOneLength);
  const typedLineTwo = typedText.slice(lineOneLength + 1, lineOneLength + 1 + lineTwoLength);
  const typedLineThree = typedText.slice(lineOneLength + 1 + lineTwoLength + 1);

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative overflow-hidden pt-28 md:pt-36 pb-24 md:pb-32"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Base vertical gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(178deg,hsl(232_34%_6%)_0%,hsl(232_30%_5%)_56%,hsl(230_26%_5%)_100%)]" />

        {/* Depth layer: colored glow orbs + particles drift gently with the pointer */}
        <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0">
          {/* Purple orb (top-left) */}
          <motion.div
            animate={prefersReducedMotion ? undefined : { x: [0, 24, -14, 0], y: [0, 14, -8, 0], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[12%] left-[2%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,hsl(258_90%_66%/0.20),transparent_68%)] blur-[110px]"
          />
          {/* Blue orb (top-right) */}
          <motion.div
            animate={prefersReducedMotion ? undefined : { x: [0, -22, 16, 0], y: [0, 12, -10, 0], opacity: [0.7, 0.95, 0.7] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[4%] right-[1%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,hsl(214_90%_60%/0.18),transparent_70%)] blur-[110px]"
          />
          {/* Cyan orb (bottom-center) */}
          <motion.div
            animate={prefersReducedMotion ? undefined : { x: [0, 18, -16, 0], y: [0, -12, 10, 0], opacity: [0.65, 0.9, 0.65] }}
            transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[0%] left-1/2 -ml-[16rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,hsl(190_95%_55%/0.15),transparent_72%)] blur-[120px]"
          />

          {/* Soft horizontal scan band for an engineered, data-driven feel */}
          <motion.div
            animate={prefersReducedMotion ? undefined : { opacity: [0.18, 0.3, 0.18], x: [0, 18, -12, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-x-8 top-24 h-32 bg-[linear-gradient(90deg,transparent,hsl(var(--accent-cyan)/0.14),transparent)] blur-3xl"
          />

          {/* Floating light particles */}
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

        {/* Faint engineering grid with subtle parallax */}
        <motion.div style={{ x: gridX, y: gridY }} className="absolute inset-0 grid-bg opacity-[0.055]" />

        {/* Vignette so the center content pops */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_52%_at_50%_38%,transparent_52%,hsl(230_28%_4%/0.55)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background/70" />
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate="show"
          className="mx-auto max-w-5xl text-center"
        >
          <motion.div variants={itemVariants} className="flex justify-center">
            <StatusCapsule
              label="Engineering Clean UI & Scalable Systems"
              animateOnMount={false}
            />
          </motion.div>

          <h1 className="mt-8 md:mt-10 mx-auto max-w-[20ch] font-display text-[clamp(2.3rem,7.2vw,5.2rem)] font-bold leading-[0.98] tracking-[-0.02em] text-foreground">
            <span className="block hero-headline-line">{typedLineOne}</span>
            <span className="block hero-headline-line">
              <motion.span
                className="inline-block bg-clip-text text-transparent [background-image:linear-gradient(90deg,hsl(214_90%_64%),hsl(190_95%_60%),hsl(196_96%_66%),hsl(190_95%_60%),hsl(214_90%_64%))] [background-size:200%_auto]"
                style={{ WebkitBackgroundClip: "text" }}
                animate={prefersReducedMotion ? undefined : { backgroundPosition: ["0% 50%", "-200% 50%"] }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              >
                {typedLineTwo}
              </motion.span>
            </span>
            <span className="block hero-headline-line">{typedLineThree}</span>
          </h1>

          <motion.p
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={headlineDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: EASE }}
            className="mt-7 md:mt-8 mx-auto max-w-[66ch] text-base md:text-lg text-foreground/78 leading-relaxed"
          >
            I build production-ready full-stack applications with clean UI, secure authentication, API-driven architecture, scalable backend logic, and polished user experiences designed for real-world use.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 md:mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_34px_-12px_hsl(var(--primary)/0.58)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_42px_-10px_hsl(var(--primary)/0.72)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-[0.98]"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/35 px-6 py-3 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:bg-card/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-[0.98]"
            >
              Contact Me
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/20 px-6 py-3 text-sm font-medium text-foreground/90 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/45 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-[0.98]"
            >
              <ExternalLink size={16} className="opacity-80 transition-opacity group-hover:opacity-100" />
              View CV
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-11 md:mt-12 mx-auto max-w-4xl"
          >
            <motion.div
              variants={statsContainer}
              className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-y-5"
            >
              {HERO_STATS.map((stat, index) => (
                <StatMetric
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  showDivider={index < HERO_STATS.length - 1}
                  start={startCount}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
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
        </motion.div>
      </div>
    </section>
  );
};

const StatMetric = ({
  value,
  suffix,
  label,
  showDivider,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  showDivider: boolean;
  start: boolean;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div variants={statItem} className="group relative px-1">
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
              <AnimatedCounter target={value} start={start} />
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
            <AnimatedCounter target={value} start={start} />
            {suffix}
          </span>
        </div>
      </div>
      <div className="mt-2 text-[0.63rem] md:text-[0.68rem] font-mono uppercase tracking-[0.14em] text-foreground/62">{label}</div>
    </motion.div>
  );
};

const AnimatedCounter = ({ target, start }: { target: number; start: boolean }) => {
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    if (prefersReducedMotion) {
      setValue(target);
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
  }, [start, target, prefersReducedMotion]);

  return <>{value}</>;
};

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-border/80 bg-card/40 text-muted-foreground transition-all hover:text-foreground hover:border-primary/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-95"
  >
    {children}
  </a>
);
