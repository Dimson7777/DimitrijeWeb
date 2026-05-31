import { motion, useReducedMotion } from "framer-motion";

type StatusCapsuleProps = {
  label: string;
  className?: string;
  /** When false, the parent orchestrates the entrance (no self mount animation). */
  animateOnMount?: boolean;
};

/**
 * Premium status pill with a glowing, smoothly pulsing dot.
 * The dot is vertically centered with the text and its glow is never clipped
 * (only the shimmer sweep is clipped, in its own rounded layer). All looping
 * animation uses transform/opacity for GPU-friendly, layout-shift-free motion.
 */
export const StatusCapsule = ({
  label,
  className = "",
  animateOnMount = true,
}: StatusCapsuleProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={animateOnMount ? { opacity: 0, y: 10 } : false}
      animate={animateOnMount ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.995 }}
      style={{ willChange: "transform" }}
      className={`group relative inline-flex items-center gap-2.5 rounded-full border border-primary/35 bg-card/65 px-[1.125rem] py-2 text-[0.68rem] font-mono uppercase tracking-[0.15em] text-foreground/90 shadow-[0_0_22px_-6px_hsl(var(--primary)/0.35),0_10px_28px_-18px_hsl(var(--primary)/0.7)] sm:text-[0.7rem] ${className}`}
    >
      {/* Subtle premium border sheen (inner hairline highlight) */}
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/[0.06]" />

      {/* Shimmer + ambient glow, clipped to the pill so it never spills out */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <motion.span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(64%_120%_at_14%_50%,hsl(var(--accent-cyan)/0.18),transparent_70%)]"
          animate={
            prefersReducedMotion
              ? undefined
              : { x: ["-6%", "8%", "-6%"], opacity: [0.22, 0.36, 0.22] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          aria-hidden
          className="absolute -inset-y-2 -left-16 w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[2px]"
          animate={prefersReducedMotion ? undefined : { x: [0, 360] }}
          transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
        />
      </span>

      {/* Glowing dot — fixed footprint, centered with the text. The pulsing
          halo is absolutely positioned so it never shifts layout or clips. */}
      <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute h-2 w-2 rounded-full bg-accent-cyan"
          animate={
            prefersReducedMotion
              ? { opacity: 0.4 }
              : { scale: [1, 2.6, 1], opacity: [0.6, 0, 0.6] }
          }
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_10px_hsl(var(--accent-cyan)/0.95)]" />
      </span>

      <span className="relative">{label}</span>
    </motion.div>
  );
};
