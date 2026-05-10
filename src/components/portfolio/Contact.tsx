import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, Github } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { SectionHeading } from "./SectionHeading";
import { BookCallDialog } from "./BookCallDialog";
import { CVDialog } from "./CVDialog";

export const Contact = () => {
  const [bookOpen, setBookOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px]" />
      </div>

      <div className="container relative">
        <SectionHeading
          eyebrow="Contact"
          title={<>Let's talk about <span className="text-gradient-primary">what you're building.</span></>}
          description="Available for remote full-stack engineering roles and freelance product work. I usually respond within 24 hours."
        />

        <ContactForm />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-gradient max-w-2xl mx-auto leading-tight">
            Prefer a quick chat? Book a 15-min intro call.
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            I usually respond within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setBookOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold text-sm shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.6)] hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.8)] hover:-translate-y-0.5 transition-all"
            >
              <Calendar size={16} /> Book a 15-min call
            </button>
            <a
              href="https://github.com/Dimson7777"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass text-foreground font-medium text-sm hover:border-primary/40 hover:-translate-y-0.5 transition-all"
            >
              <Github size={16} /> GitHub
            </a>
            <button
              onClick={() => setCvOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border text-foreground font-medium text-sm hover:bg-secondary/60 hover:-translate-y-0.5 transition-all"
            >
              <ExternalLink size={16} /> View CV
            </button>
          </div>
        </motion.div>
      </div>

      <BookCallDialog open={bookOpen} onOpenChange={setBookOpen} />
      <CVDialog open={cvOpen} onOpenChange={setCvOpen} />
    </section>
  );
};
