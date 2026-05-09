import { motion } from "framer-motion";
import { CreditCard, LayoutTemplate, LockKeyhole, ServerCog, ShieldCheck, Wrench } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const services = [
  {
    icon: LayoutTemplate,
    title: "SaaS Product Development",
    text: "Full-stack product features from dashboard flows to production-ready user systems.",
  },
  {
    icon: LockKeyhole,
    title: "Authentication & User Systems",
    text: "Secure sign-in, sessions, protected routes, role-based access, and clean user flows.",
  },
  {
    icon: CreditCard,
    title: "Stripe Billing Workflows",
    text: "Upgrade, checkout, subscription status, manage billing, and payment-driven SaaS logic.",
  },
  {
    icon: ServerCog,
    title: "API & Backend Architecture",
    text: "REST APIs, backend logic, database-driven workflows, and structured server-side features.",
  },
  {
    icon: ShieldCheck,
    title: "Responsive Product UI",
    text: "Modern interfaces that work smoothly across desktop, tablet, and mobile.",
  },
  {
    icon: Wrench,
    title: "Debugging & Production Polish",
    text: "Fixing broken flows, improving loading/error states, and making products feel stable.",
  },
];

export const Interests = () => (
  <section id="services" className="py-20 md:py-28">
    <div className="container">
      <SectionHeading
        eyebrow="Services"
        title={
          <>
            What I can <span className="text-gradient-primary">build for you.</span>
          </>
        }
        description="Focused engineering services for shipping stable SaaS product experiences."
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="glass card-hover rounded-2xl p-6 md:p-7 flex flex-col gap-5 border border-border/70"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent-cyan/10 border border-primary/30 shrink-0">
                <Icon size={20} className="text-primary" strokeWidth={1.8} />
              </div>
              <div className="space-y-2.5">
                <h3 className="font-semibold text-foreground text-base md:text-lg">{item.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);
