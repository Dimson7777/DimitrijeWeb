import { motion } from "framer-motion";

export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="max-w-2xl mb-12 md:mb-16"
  >
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="h-px w-8 bg-primary/60" />
      <span className="text-xs font-mono uppercase tracking-widest text-primary">{eyebrow}</span>
    </div>
    <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient leading-tight">{title}</h2>
    {description && (
      <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">{description}</p>
    )}
  </motion.div>
);
