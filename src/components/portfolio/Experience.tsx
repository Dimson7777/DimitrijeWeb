import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const roles = [
  {
    company: "TokenFlow",
    role: "Full Stack Engineer",
    period: "Jan 2025 — Present",
    description:
      "At TokenFlow, I engineer scalable product architecture across frontend, backend, and database layers, with a strong focus on secure system boundaries, performance, and production-ready delivery.",
    points: [
      "Designed and implemented a scalable multi-tier architecture using Node.js/Express and PostgreSQL, introducing connection pooling and optimized indexing to support concurrent data streams and 10M+ database rows with sub-second query execution.",
      "Engineered robust API boundaries, RBAC, and secure token-based authentication workflows, reducing unauthorized access attempts and enhancing data-flow reliability across system boundaries.",
      "Established rigorous coding standards and automated linting/testing pipelines using Jest and Cypress, ensuring 100% release readiness and predictable code delivery for high-performance platform surfaces.",
    ],
  },
  {
    company: "ScaleRoad LLC",
    role: "Full Stack Engineer",
    period: "Dec 2023 — Jan 2025",
    description:
      "At ScaleRoad, I worked on client-facing product systems, improving frontend performance, backend communication, and platform stability across desktop and mobile environments.",
    points: [
      "Optimized complex client-facing workflows and responsive component architecture, leveraging advanced state-management patterns and lazy-loading to improve page load speed by 40%.",
      "Formulated strict frontend-backend API contracts and implemented aggressive data-caching strategies, reducing API latency by 30% on low-latency product surfaces.",
      "Standardized global error-handling patterns and defensive loading states across desktop and mobile environments, eliminating UI layout shifts and unhandled runtime exceptions.",
    ],
  },
  {
    company: "Vertex Digital Studio",
    role: "Full Stack Engineer (Contract / Remote)",
    period: "Jan 2023 — Dec 2023",
    description:
      "At Vertex Digital Studio, I delivered full-stack systems for startup and e-commerce clients, turning business requirements into secure, production-ready web applications.",
    points: [
      "Architected end-to-end full-stack solutions for 5+ US-based startups and e-commerce clients, translating high-level business requirements into production-ready dashboards, secure auth flows, and 20+ core RESTful API endpoints.",
      "Designed scalable database schemas and relational persistence layers across varied client ecosystems, optimizing query execution paths to handle 500K+ daily data rows with 100% strict data integrity.",
      "Established repeatable engineering standards by implementing senior Git workflows, delivering a library of 30+ reusable UI components, and reducing deployment failures by 25% through rigorous automated testing and documentation.",
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
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-4">{r.description}</p>
                <ul className="space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm md:text-base text-foreground/80 leading-relaxed">
                      <span className="text-primary mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/70" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
