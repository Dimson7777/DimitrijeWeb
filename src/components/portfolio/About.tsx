import { motion } from "framer-motion";
import { Blocks, Compass, LayoutPanelTop, MapPin, ServerCog, UserRoundCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const snapshotItems = [
  {
    icon: LayoutPanelTop,
    title: "Product Interfaces",
    text: "I build clean React/Next.js interfaces with responsive layouts, reusable components, and polished user states.",
  },
  {
    icon: Blocks,
    title: "User Systems & SaaS Logic",
    text: "I implement authentication, protected routes, RBAC, Stripe billing flows, plan logic, and dashboard workflows.",
  },
  {
    icon: ServerCog,
    title: "Backend & Data Flow",
    text: "I structure REST APIs, Supabase/PostgreSQL data models, server-side logic, and reliable frontend-backend communication.",
  },
];

export const About = () => (
  <section id="about" className="py-20 md:py-28 relative">
    <div className="container">
      <SectionHeading
        eyebrow="ABOUT"
        title={
          <>
            I build <span className="text-gradient-primary">full-stack products</span> that move from <span className="text-gradient-primary">idea to launch</span>.
          </>
        }
      />

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed"
        >
          <p>
            I'm a Full Stack Engineer focused on building production-ready web applications across React, Next.js, TypeScript, Node.js, REST APIs, Supabase/PostgreSQL, authentication, and Stripe billing.
          </p>
          <p>
            I work on the parts that make a product feel real: clean interfaces, protected user flows, backend logic, database-driven features, subscription flows, loading/error states, and responsive layouts that work across devices.
          </p>
          <p>
            My focus is simple - build products that look polished, work reliably, and are easy to maintain after launch.
          </p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-70px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            }}
            className="pt-4 relative"
          >
            <div className="absolute -inset-x-6 top-6 h-36 bg-gradient-to-r from-primary/10 via-accent-cyan/10 to-primary-glow/5 blur-3xl pointer-events-none" />

            <div className="relative text-xs font-mono uppercase tracking-widest text-primary/85 mb-2.5">
              WHAT I BRING INTO A PRODUCT
            </div>
            <div className="relative text-base md:text-lg font-medium text-foreground mb-4 md:mb-5">
              Practical engineering for real product delivery.
            </div>

            <div className="relative grid md:grid-cols-3 gap-3.5 md:gap-4">
                {snapshotItems.map((item) => (
                  <motion.article
                    key={item.title}
                    variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="glass rounded-2xl border border-primary/15 bg-gradient-to-b from-background/65 to-background/35 px-4 py-4 md:px-5 md:py-4 shadow-[0_12px_30px_-24px_hsl(var(--primary)/0.85)]"
                  >
                    <div className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/25 mb-2.5">
                      <item.icon size={16} className="text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground leading-snug">{item.title}</h3>
                    <p className="mt-1.5 text-xs md:text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </motion.article>
                ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl border border-primary/15 p-6 md:p-7 space-y-5 bg-gradient-to-b from-background/65 to-background/35 shadow-[0_14px_36px_-26px_hsl(var(--primary)/0.85)]"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <UserRoundCheck size={13} className="text-primary/85" />
              CURRENTLY
            </div>
            <div className="mt-2 text-base md:text-lg font-semibold text-foreground">Full Stack Engineer @ TokenFlow</div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <MapPin size={13} className="text-primary/85" />
              BASED
            </div>
            <div className="mt-2 text-base md:text-lg font-semibold text-foreground">Remote · Open worldwide</div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <Compass size={13} className="text-primary/85" />
              APPROACH
            </div>
            <div className="mt-2 text-base md:text-lg font-semibold text-foreground">Plan → Build → Ship → Improve</div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
