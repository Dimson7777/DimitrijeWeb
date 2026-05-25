import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const features = [
  "Authentication & user accounts",
  "Stripe subscriptions & billing",
  "Client management dashboard",
  "Invoice generation & tracking",
];

const CODE_LINES = [
  "const invoice = await stripe",
  ".subscriptions.create({",
  "customer: user.id,",
  "items: [{ price: \"plan_pro\" }],",
  "});",
  "await supabase",
  ".from(\"invoices\")",
  ".insert(invoice);",
] as const;

const INDENT = ["", "pl-3", "pl-6", "pl-6", "pl-3", "", "pl-3", "pl-3"] as const;

const PREVIEW_PARTICLES = [
  { top: "11%", left: "84%", size: 3, delay: 0, dur: 8.4 },
  { top: "26%", left: "12%", size: 2, delay: 0.8, dur: 7.8 },
  { top: "58%", left: "88%", size: 2, delay: 1.2, dur: 8.2 },
  { top: "75%", left: "18%", size: 3, delay: 1.9, dur: 9.4 },
] as const;

const lineTypingDelay = (index: number) => (index === 0 || index === 5 ? 250 : 170);
const linePauseDelay = (index: number) => 300 + index * 22;

const renderFinalLine = (index: number) => {
  switch (index) {
    case 0:
      return (
        <>
          <span className="text-primary">const</span> invoice = <span className="text-accent-cyan">await</span> stripe
        </>
      );
    case 1:
      return <>.subscriptions.create({"{"}</>;
    case 2:
      return (
        <>
          customer: <span className="text-green-400">user.id</span>,
        </>
      );
    case 3:
      return (
        <>
          items: [{"{"} price: <span className="text-yellow-400">"plan_pro"</span> {"}"}],
        </>
      );
    case 4:
      return <>{"}"});</>;
    case 5:
      return (
        <>
          <span className="text-primary">await</span> supabase
        </>
      );
    case 6:
      return (
        <>
          .from(<span className="text-yellow-400">"invoices"</span>)
        </>
      );
    default:
      return <>.insert(invoice);</>;
  }
};

export const FeaturedProject = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      setLineIndex(CODE_LINES.length - 1);
      setCharIndex(CODE_LINES[CODE_LINES.length - 1].length);
      return;
    }

    let timeoutId = 0;
    const isDone = lineIndex >= CODE_LINES.length - 1 && charIndex >= CODE_LINES[CODE_LINES.length - 1].length;

    if (isDone) {
      timeoutId = window.setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
      }, 2200);
    } else {
      const currentLine = CODE_LINES[lineIndex];

      if (charIndex < currentLine.length) {
        timeoutId = window.setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, lineTypingDelay(lineIndex));
      } else {
        timeoutId = window.setTimeout(() => {
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
        }, linePauseDelay(lineIndex));
      }
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [lineIndex, charIndex]);

  const typedLines = useMemo(() => {
    return CODE_LINES.map((line, index) => {
      if (index < lineIndex) {
        return line;
      }
      if (index > lineIndex) {
        return "";
      }
      return line.slice(0, charIndex);
    });
  }, [lineIndex, charIndex]);

  const showSuccess = lineIndex >= CODE_LINES.length - 1 && charIndex >= CODE_LINES[CODE_LINES.length - 1].length;

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <SectionHeading
          eyebrow="Featured"
          title={<>The flagship: <span className="text-gradient-primary">InvoiceFlow.</span></>}
          description="A complete SaaS invoicing platform — built end-to-end, from auth and billing to dashboards and database."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -5, rotateX: 0.4, rotateY: -0.4, scale: 1.002 }}
          className="group relative glass-strong rounded-3xl p-7 md:p-12 overflow-hidden card-hover border border-primary/18 hover:border-primary/35 hover:shadow-[0_28px_80px_-36px_hsl(var(--primary)/0.95)] transition-all duration-500"
          style={{ transformPerspective: 1200 }}
        >
          <motion.div
            aria-hidden
            animate={{ opacity: [0.24, 0.38, 0.24], x: [0, 20, -8, 0], y: [0, -8, 0, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-primary/25 rounded-full blur-[120px]"
          />
          <motion.div
            aria-hidden
            animate={{ opacity: [0.2, 0.34, 0.2], x: [0, -16, 0], y: [0, 10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-32 -left-32 w-[360px] h-[360px] bg-accent-cyan/15 rounded-full blur-[120px]"
          />
          <motion.div
            aria-hidden
            animate={{ x: ["-20%", "22%", "-20%"], opacity: [0.1, 0.24, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-[-14%] top-[24%] h-28 bg-[linear-gradient(95deg,transparent,hsl(var(--primary)/0.22),transparent)] blur-2xl"
          />
          <motion.div
            aria-hidden
            animate={{ x: ["120%", "-25%"] }}
            transition={{ duration: 10.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 -right-24 w-40 bg-[linear-gradient(100deg,transparent,hsl(var(--accent-cyan)/0.12),transparent)] blur-xl"
          />

          <motion.span
            aria-hidden
            animate={{ x: ["-34%", "126%"] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 h-px w-[36%] bg-gradient-to-r from-transparent via-primary/75 to-transparent"
          />
          <motion.span
            aria-hidden
            animate={{ y: ["-28%", "126%"] }}
            transition={{ duration: 7.1, repeat: Infinity, ease: "linear", delay: 0.8 }}
            className="absolute right-0 top-0 w-px h-[38%] bg-gradient-to-b from-transparent via-accent-cyan/72 to-transparent"
          />
          <motion.span
            aria-hidden
            animate={{ x: ["128%", "-28%"] }}
            transition={{ duration: 6.8, repeat: Infinity, ease: "linear", delay: 1.2 }}
            className="absolute bottom-0 right-0 h-px w-[34%] bg-gradient-to-l from-transparent via-primary-glow/70 to-transparent"
          />
          <motion.span
            aria-hidden
            animate={{ y: ["126%", "-24%"] }}
            transition={{ duration: 7.4, repeat: Infinity, ease: "linear", delay: 1.4 }}
            className="absolute left-0 bottom-0 w-px h-[36%] bg-gradient-to-t from-transparent via-primary/65 to-transparent"
          />
          <div className="absolute inset-0 rounded-3xl pointer-events-none [background:linear-gradient(120deg,transparent_0%,hsl(var(--primary)/0.08)_45%,transparent_72%)] opacity-60" />

          <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono text-primary mb-5">
                <Sparkles size={12} /> Flagship Project
              </div>

              <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                <span className="text-gradient">Invoice</span>
                <span className="text-gradient-primary">Flow</span>
              </h3>

              <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                A production SaaS for freelancers and small teams to invoice clients, manage subscriptions, and run their billing — built with secure auth, role-based access, and Stripe-powered subscription workflows.
              </p>

              <ul className="grid sm:grid-cols-2 gap-2.5 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-primary to-primary-glow shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-7">
                {["React", "TypeScript", "Supabase", "PostgreSQL", "Stripe"].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-full border border-border/80 bg-secondary/40 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://invoiceflow-saas-mu.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-medium text-sm shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.6)] hover:-translate-y-0.5 transition-all"
                >
                  View Live <ArrowUpRight size={15} className="group-hover:rotate-45 transition-transform" />
                </a>
                <a
                  href="https://github.com/Dimson7777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass text-foreground font-medium text-sm hover:border-primary/40 hover:-translate-y-0.5 transition-all"
                >
                  <Github size={15} /> View Code
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] rounded-2xl glass border border-border/80 p-5 font-mono text-xs leading-relaxed overflow-hidden shadow-[0_16px_50px_-34px_hsl(var(--primary)/0.8)]">
                {PREVIEW_PARTICLES.map((p, index) => (
                  <motion.span
                    key={index}
                    aria-hidden
                    className="absolute rounded-full bg-primary/50 blur-[1px]"
                    style={{ top: p.top, left: p.left, width: `${p.size}px`, height: `${p.size}px` }}
                    animate={{ y: [0, -6, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}

                <motion.span
                  aria-hidden
                  animate={{ opacity: [0.45, 1, 0.45], scale: [0.96, 1.08, 0.96] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_14px_hsl(var(--accent-cyan)/0.8)]"
                />
                <motion.span
                  aria-hidden
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="absolute top-5 right-10 w-1 h-1 rounded-full bg-primary/70"
                />
                <motion.span
                  aria-hidden
                  animate={{ opacity: [0.2, 0.68, 0.2] }}
                  transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                  className="absolute bottom-8 left-6 w-1 h-1 rounded-full bg-accent-cyan/70"
                />
                <motion.span
                  aria-hidden
                  animate={{ opacity: [0.3, 0.75, 0.3] }}
                  transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="absolute -bottom-3 left-5 h-px w-16 bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                />
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0.16, 0.28, 0.16], x: [0, 12, 0] }}
                  transition={{ duration: 9.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-x-6 top-10 h-16 bg-[linear-gradient(90deg,transparent,hsl(var(--accent-cyan)/0.18),transparent)] blur-xl"
                />

                <div className="flex gap-1.5 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>

                <div className="relative space-y-1.5 text-muted-foreground">
                  {typedLines.map((line, index) => {
                    const isTyped = index < lineIndex || (index === lineIndex && charIndex === CODE_LINES[index].length);
                    const isActiveLine = index === lineIndex && line.length > 0;
                    const isHidden = line.length === 0 && index > lineIndex;

                    return (
                      <div key={index} className={`${INDENT[index]} ${isHidden ? "opacity-0" : "opacity-100"}`}>
                        {isTyped ? renderFinalLine(index) : line}
                        {isActiveLine && (
                          <motion.span
                            aria-hidden
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.86, repeat: Infinity, ease: "linear" }}
                            className="inline-block ml-1 text-foreground/80"
                          >
                            _
                          </motion.span>
                        )}
                        {index === 7 && isTyped && (
                          <motion.span
                            aria-hidden
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.92, repeat: Infinity, ease: "linear" }}
                            className="inline-block ml-1 text-foreground/80"
                          >
                            _
                          </motion.span>
                        )}
                      </div>
                    );
                  })}

                  <motion.div
                    animate={{ opacity: showSuccess ? 1 : 0, y: showSuccess ? 0 : 6 }}
                    transition={{ duration: 0.4 }}
                    className="pt-3"
                  >
                    <motion.span
                      animate={{ opacity: [0.85, 1, 0.85] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-flex items-center gap-2 text-green-400"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_hsl(142_72%_50%/0.8)]" />
                      ✓ deployed to production
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
