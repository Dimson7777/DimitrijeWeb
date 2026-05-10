import { motion } from "framer-motion";
import { CreditCard, Database, Lock, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const services = [
  {
    icon: ShieldCheck,
    title: "SaaS Product Development",
    text: "I build production-ready SaaS features from dashboard flows to real user systems that can be deployed and maintained.",
    chips: ["Dashboards", "User flows", "Product logic"],
  },
  {
    icon: Lock,
    title: "Authentication & Access Control",
    text: "I implement secure sign-in, sessions, protected routes, RBAC, and clean account-based workflows.",
    chips: ["Auth", "RBAC", "Protected routes"],
  },
  {
    icon: CreditCard,
    title: "Stripe Billing Systems",
    text: "I create upgrade flows, checkout states, subscription status, plan gating, and payment-driven SaaS logic.",
    chips: ["Checkout", "Subscriptions", "Plan gating"],
  },
  {
    icon: Database,
    title: "Backend & API Architecture",
    text: "I structure REST APIs, server-side logic, database workflows, and reliable frontend-backend communication.",
    chips: ["REST APIs", "Server logic", "Data flow"],
  },
  {
    icon: Smartphone,
    title: "Product UI / UX Polish",
    text: "I design responsive interfaces with strong hierarchy, polished states, and layouts that feel stable across devices.",
    chips: ["Responsive UI", "Loading states", "Mobile polish"],
  },
  {
    icon: Wrench,
    title: "Debugging & Production Cleanup",
    text: "I fix broken flows, improve error states, clean messy code, and make products feel ready for real users.",
    chips: ["Bug fixing", "Performance", "Production QA"],
  },
];

const flowSteps = ["Plan", "Build", "Secure", "Ship", "Improve"];

export const Interests = () => (
  <section id="services" className="py-20 md:py-28">
    <div className="container">
      <SectionHeading
        eyebrow="SERVICES"
        title={<>What I can build for you.</>}
        description="Full-stack engineering services focused on SaaS products, secure user systems, billing flows, backend logic, and polished product experiences."
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="mb-6 md:mb-8 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-accent-cyan/10 to-primary-glow/10 px-4 md:px-5 py-3"
      >
        <div className="relative flex items-center justify-between gap-2">
          <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-primary/35 via-accent-cyan/40 to-primary-glow/35" />
          {flowSteps.map((step) => (
            <div key={step} className="relative z-10 flex flex-col items-center gap-1.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full border border-primary/45 bg-accent-cyan/70 shadow-[0_0_12px_hsl(var(--primary)/0.65)]" />
              <span className="text-[0.66rem] md:text-[0.7rem] font-mono uppercase tracking-[0.16em] text-foreground/78 text-center">
                {step}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
      >
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="group glass rounded-2xl p-5 md:p-6 border border-primary/15 bg-gradient-to-b from-background/65 to-background/35 min-h-[260px] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_16px_44px_-26px_hsl(var(--primary)/0.8)]"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-primary/25 via-accent-cyan/15 to-primary-glow/10 border border-primary/30 inline-flex items-center justify-center mb-4 shadow-[0_0_18px_-10px_hsl(var(--primary)/0.8)]">
                <Icon size={20} className="text-primary" strokeWidth={1.8} />
              </div>

              <h3 className="font-display text-[1.04rem] md:text-lg font-semibold mb-2.5 leading-snug">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.text}</p>

              <div className="mt-auto flex flex-wrap gap-2">
                {item.chips.map((chip) => (
                  <span
                    key={chip}
                    className="text-[0.68rem] md:text-[0.72rem] px-2.5 py-1 rounded-full border border-border/70 bg-secondary/35 text-foreground/80"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);
