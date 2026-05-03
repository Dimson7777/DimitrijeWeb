import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import profile from "@/assets/profile.png";

const PARTICLES = [
  { top: "12%", left: "8%", size: "3px", delay: "0s", duration: "8s", opacity: 0.45 },
  { top: "22%", left: "20%", size: "2px", delay: "1.8s", duration: "9.5s", opacity: 0.35 },
  { top: "16%", left: "38%", size: "2px", delay: "0.8s", duration: "7.5s", opacity: 0.4 },
  { top: "30%", left: "55%", size: "3px", delay: "2.2s", duration: "10s", opacity: 0.45 },
  { top: "18%", left: "72%", size: "2px", delay: "1.2s", duration: "8.2s", opacity: 0.35 },
  { top: "10%", left: "88%", size: "2px", delay: "2.8s", duration: "9s", opacity: 0.3 },
  { top: "44%", left: "12%", size: "2px", delay: "1s", duration: "10.5s", opacity: 0.3 },
  { top: "50%", left: "30%", size: "3px", delay: "3.1s", duration: "8.8s", opacity: 0.42 },
  { top: "58%", left: "48%", size: "2px", delay: "2.4s", duration: "9.2s", opacity: 0.33 },
  { top: "46%", left: "66%", size: "2px", delay: "0.4s", duration: "8.4s", opacity: 0.3 },
  { top: "62%", left: "82%", size: "3px", delay: "3.3s", duration: "10.8s", opacity: 0.4 },
  { top: "72%", left: "22%", size: "2px", delay: "1.6s", duration: "9.8s", opacity: 0.28 },
  { top: "76%", left: "58%", size: "2px", delay: "2.1s", duration: "8.7s", opacity: 0.3 },
  { top: "68%", left: "92%", size: "2px", delay: "3s", duration: "9.4s", opacity: 0.25 },
];

export const Hero = () => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    const finePointer = window.matchMedia("(pointer: fine)");

    if (reduceMotion.matches || !desktop.matches || !finePointer.matches) {
      return;
    }

    let frame = 0;

    const onMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;

      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setParallax({ x, y });
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative pt-36 md:pt-44 pb-20 md:pb-32 overflow-hidden"
      style={
        {
          "--hero-parallax-x": `${parallax.x}px`,
          "--hero-parallax-y": `${parallax.y}px`,
        } as React.CSSProperties
      }
    >
      <div className="hero-bg absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="hero-bg-glow hero-parallax-layer" />
        <div className="hero-particles hero-parallax-layer">
          {PARTICLES.map((particle, index) => (
            <span
              key={index}
              className="hero-particle"
              style={
                {
                  top: particle.top,
                  left: particle.left,
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                  "--delay": particle.delay,
                  "--dur": particle.duration,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="hero-shooting-star hero-parallax-layer" />
      </div>

      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="hero-parallax-layer absolute top-1/3 -left-32 w-[480px] h-[480px] bg-primary/20 rounded-full blur-[120px] animate-glow-pulse pointer-events-none" />
      <div className="hero-parallax-layer absolute bottom-0 right-0 w-[420px] h-[420px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono text-muted-foreground mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
              </span>
              Available for new opportunities
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight">
              <span className="text-gradient">Full Stack Developer</span>
              <br />
              <span className="text-gradient-primary">building real-world web applications.</span>
            </h1>

            <p className="mt-7 text-lg md:text-xl text-foreground/85 max-w-xl leading-relaxed">
              Focused on scalable apps, clean UI, and real user experience.
            </p>
            <p className="mt-3 text-base text-muted-foreground max-w-xl leading-relaxed">
              I care about shipping things that work — solid code, thoughtful design, and the small details users actually feel.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-medium text-sm shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.6)] hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.8)] transition-all hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-strong text-foreground font-medium text-sm hover:border-primary/40 transition-all hover:-translate-y-0.5"
              >
                Contact Me
              </a>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border text-foreground font-medium text-sm hover:bg-secondary/60 hover:-translate-y-0.5 transition-all"
              >
                <ExternalLink size={16} /> View CV
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <SocialIcon href="https://github.com/Dimson7777" label="GitHub"><Github size={18} /></SocialIcon>
              <SocialIcon href="https://www.linkedin.com/in/dimitrije-bukejlovic-9055a8400/" label="LinkedIn"><Linkedin size={18} /></SocialIcon>
              <SocialIcon href="mailto:dimibukejlovic@icloud.com" label="Email"><Mail size={18} /></SocialIcon>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-tr from-primary/40 via-primary-glow/30 to-accent-cyan/30 rounded-full blur-2xl opacity-70 animate-glow-pulse" />
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border border-border/80 glass-strong p-1.5">
                <img
                  src={profile}
                  alt="Dimitrije Bukejlovic — Full Stack Engineer"
                  width={512}
                  height={512}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 glass-strong rounded-2xl px-4 py-2.5 text-xs font-mono">
                <span className="text-accent-cyan">$</span> shipping production code
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 inline-flex items-center justify-center rounded-full glass text-muted-foreground hover:text-foreground hover:border-primary/40 hover:-translate-y-0.5 transition-all"
  >
    {children}
  </a>
);
