import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const roles = [
  {
    company: "TokenFlow",
    role: "Full Stack Engineer",
    period: "Jan 2025 - Present",
    description:
      "Designed and delivered production-ready full-stack features across frontend, backend, and database layers. Implemented secure authentication, role-based access control, API-driven workflows, and scalable product architecture.",
    points: [
      "Production feature ownership from UI through API and database",
      "Authentication and role-based access flows for protected product areas",
      "Scalable architecture decisions supporting long-term product growth",
    ],
  },
  {
    company: "ScaleRoad LLC",
    role: "Full Stack Engineer",
    period: "Dec 2023 - Jan 2025",
    description:
      "Improved product UX and platform reliability through tailored frontend components and low-latency APIs. Built responsive interfaces, strengthened application flows, and supported cleaner, more maintainable product delivery.",
    points: [
      "Responsive interface systems with reliable cross-device behavior",
      "Low-latency API integrations for smoother product workflows",
      "Cleaner engineering structure for maintainable feature delivery",
    ],
  },
  {
    company: "Freelancer.com / Personal Clients",
    role: "Full Stack Engineer",
    period: "Jan 2023 - Dec 2023",
    description:
      "Developed full-stack web applications from concept to deployment, translating client requirements into responsive interfaces, structured backend logic, API integrations, and production-ready user experiences.",
    points: [
      "End-to-end delivery from requirement discovery to deployment",
      "Backend logic and integrations aligned with practical product needs",
      "Production-ready responsive interfaces with clear user journeys",
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
