import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const roles = [
  {
    company: "TokenFlow",
    role: "Full Stack Engineer",
    period: "Jan 2025 – Present",
    logo: undefined as string | undefined,
    image: "/tokenflow-banner.png" as string | undefined,
    imageAlt: "TokenFlow smart contract development preview",
    points: [
      "Led end-to-end development of core product features across frontend, backend, and database layers, delivering scalable and production-ready systems",
      "Designed and implemented secure authentication, role-based access control, and API-driven workflows, ensuring reliable and maintainable product architecture",
      "Improved application performance through database query optimization and indexing strategies",
      "Increased development efficiency by introducing modular architecture and reusable components, enabling faster feature delivery",
      "Contributed to system design decisions and long-term architecture, supporting scalability and future product growth",
    ],
  },
  {
    company: "Freelancer / Personal Clients",
    role: "Full Stack Engineer",
    period: "Feb 2023 – Jan 2025",
    logo: undefined as string | undefined,
    image: "/freelancer-banner.png" as string | undefined,
    imageAlt: "Freelancer platform logo",
    points: [
      "Delivered multiple full-stack applications from concept to production, aligning technical solutions with business requirements and user needs",
      "Built responsive, high-performance user interfaces and stable backend systems, ensuring consistent user experience across devices",
      "Owned end-to-end project execution, including planning, development, and deployment, while maintaining code quality and delivery speed",
      "Translated client requirements into scalable technical solutions, reducing iteration cycles and improving delivery efficiency",
      "Implemented API integrations and structured backend systems, enabling flexible and extensible product features",
    ],
  },
];

export const Experience = () => (
  <section id="experience" className="py-20 md:py-28">
    <div className="container">
      <SectionHeading eyebrow="Experience" title={<>Where I've shipped <span className="text-gradient-primary">real work.</span></>} />

      <div className="relative max-w-4xl">
        <div className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />

        <div className="space-y-8">
          {roles.map((r, i) => (
            <motion.div
              key={r.company}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-12 md:pl-16"
            >
              <div className="absolute left-0 top-2 w-7 h-7 rounded-full glass-strong flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-primary to-primary-glow" />
              </div>

              <div className="glass card-hover rounded-2xl p-6 md:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-display text-xl md:text-2xl font-bold">{r.company}</h3>
                  <span className="text-xs font-mono text-muted-foreground">{r.period}</span>
                </div>
                <div className="text-primary text-sm font-medium mb-4">{r.role}</div>
                <ul className="space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm md:text-base text-foreground/80 leading-relaxed">
                      <span className="text-primary mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/70" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {r.image && (
                  <div className="mt-5 pt-5 border-t border-border/50">
                    <div
                      className="relative w-full rounded-xl overflow-hidden border border-primary/20"
                      style={{
                        boxShadow: "0 0 0 1px hsl(190 95% 55% / 0.08), 0 8px 32px rgba(0,0,0,0.5), 0 0 48px hsl(250 90% 66% / 0.12)",
                      }}
                    >
                      <img
                        src={r.image}
                        alt={r.imageAlt}
                        className="w-full h-auto block"
                        style={{ display: "block" }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
