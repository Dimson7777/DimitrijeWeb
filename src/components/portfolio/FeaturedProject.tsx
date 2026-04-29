import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const features = [
  "Authentication & user accounts",
  "Stripe subscriptions & billing",
  "Client management dashboard",
  "Invoice generation & tracking",
];

export const FeaturedProject = () => (
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
        className="relative glass-strong rounded-3xl p-7 md:p-12 overflow-hidden card-hover"
      >
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-primary/25 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[360px] h-[360px] bg-accent-cyan/15 rounded-full blur-[120px]" />

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
                href="https://invoiceflow-play.lovable.app/"
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
            <div className="aspect-[4/3] rounded-2xl glass border border-border/80 p-5 font-mono text-xs leading-relaxed overflow-hidden">
              <div className="flex gap-1.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="space-y-1.5 text-muted-foreground">
                <div><span className="text-primary">const</span> invoice = <span className="text-accent-cyan">await</span> stripe</div>
                <div className="pl-3">.subscriptions.create({"{"}</div>
                <div className="pl-6">customer: <span className="text-green-400">user.id</span>,</div>
                <div className="pl-6">items: [{"{"} price: <span className="text-yellow-400">"plan_pro"</span> {"}"}],</div>
                <div className="pl-3">{"}"});</div>
                <div className="pt-3"><span className="text-primary">await</span> supabase</div>
                <div className="pl-3">.from(<span className="text-yellow-400">"invoices"</span>)</div>
                <div className="pl-3">.insert(invoice);</div>
                <div className="pt-3 text-green-400">✓ deployed to production</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
