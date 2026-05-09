import { motion } from "framer-motion";
import { Blocks, LayoutPanelTop, ServerCog } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const snapshotItems = [
  {
    icon: Blocks,
    title: "Production SaaS Features",
    text: "Authentication, billing flows, dashboards, protected routes, and user systems.",
  },
  {
    icon: LayoutPanelTop,
    title: "Frontend + Product UI",
    text: "Clean React/Next.js interfaces with responsive layouts and polished user states.",
  },
  {
    icon: ServerCog,
    title: "Backend + API Logic",
    text: "Node.js, REST APIs, Supabase/PostgreSQL, and scalable product workflows.",
  },
];

export const About = () => (
  <section id="about" className="py-20 md:py-28 relative">
    <div className="container">
      <SectionHeading eyebrow="About" title={<>Engineering with <span className="text-gradient-primary">product sense.</span></>} />

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed"
        >
          <p>
            I'm a Full Stack Engineer focused on building production-ready SaaS applications from idea to deployment. I work across <span className="text-foreground font-medium">React, Next.js, TypeScript, Node.js, APIs, Supabase/PostgreSQL, authentication, billing flows, and polished product UI</span>.
          </p>
          <p>
            I care about reliable user flows, clean architecture, responsive interfaces, and features that are easy to maintain after launch. My focus is not only making the product look good, but making it work well in real use.
          </p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-70px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
            }}
            className="pt-3"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-primary/85 mb-3.5">
              What I bring into a product
            </div>
            <div className="glass rounded-2xl p-4 md:p-5 border border-border/70">
              <div className="text-sm font-medium text-foreground mb-4">Engineering Snapshot</div>
              <div className="grid md:grid-cols-3 gap-3.5">
                {snapshotItems.map((item) => (
                  <motion.article
                    key={item.title}
                    variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="rounded-xl border border-border/70 bg-secondary/35 px-4 py-3.5"
                  >
                    <div className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/25 mb-2.5">
                      <item.icon size={16} className="text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground leading-snug">{item.title}</h3>
                    <p className="mt-1.5 text-xs md:text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-2xl p-6 space-y-4"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Currently</div>
            <div className="mt-1 font-medium">Full Stack Engineer @ TokenFlow</div>
          </div>
          <div className="h-px bg-border" />
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Based</div>
            <div className="mt-1 font-medium">Remote · Open worldwide</div>
          </div>
          <div className="h-px bg-border" />
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Approach</div>
            <div className="mt-1 font-medium">Plan → Build → Ship → Improve</div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
