import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

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
            I'm a full stack developer working across <span className="text-foreground font-medium">React, Next.js, TypeScript, and Node.js</span>. I enjoy taking an idea from a rough sketch to a deployed app that real people actually use — and learning from what breaks along the way.
          </p>
          <p>
            I'm comfortable across the stack: building UIs that feel right, designing APIs that don't fall over, wiring up auth and payments, and modeling data so it still makes sense six months later. I try to keep code <span className="text-foreground font-medium">simple, readable, and easy to change</span> — fancy abstractions usually cost more than they save.
          </p>
          <p>
            What I care about most: shipping useful things, writing code I'd be happy to revisit, and respecting the user's time.
          </p>
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
            <div className="mt-1 font-medium">Idea → Architecture → Ship</div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
