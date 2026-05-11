import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const roles = [
  {
    company: "TokenFlow",
    role: "Full Stack Engineer",
    period: "Jan 2025 - Present",
    description:
      "Built and maintained full-stack product features across frontend, backend, and database layers. Worked on secure authentication, protected user flows, API-driven logic, dashboard experiences, and scalable product architecture with a strong focus on clean UX and reliable delivery.",
    points: [
      "Built production-ready SaaS features using React, TypeScript, Node.js, REST APIs, and database-backed workflows",
      "Implemented secure authentication, role-based access, protected routes, and account-level user flows",
      "Connected frontend UI with backend logic, API endpoints, and structured data models",
      "Improved product reliability by debugging broken flows, cleaning code structure, and polishing user experience",
      "Worked across product architecture, responsive UI, state handling, and deployment-ready feature delivery",
    ],
  },
  {
    company: "ScaleRoad LLC",
    role: "Full Stack Engineer",
    period: "Dec 2023 - Jan 2025",
    description:
      "Developed responsive web applications and internal product tools with a focus on performance, clean interface design, and reliable backend communication. Turned product requirements into working features, improved user flows, and supported scalable frontend/backend implementation.",
    points: [
      "Built responsive frontend interfaces with reusable components and clear user journeys",
      "Integrated REST APIs and backend services into stable product workflows",
      "Improved application structure, loading states, error handling, and cross-device behavior",
      "Collaborated on feature planning, UI polish, and technical decisions for maintainable delivery",
      "Helped turn business requirements into clean, functional, production-ready web features",
    ],
  },
  {
    company: "Freelancer.com / Personal Clients",
    role: "Full Stack Engineer",
    period: "Jan 2023 - Dec 2023",
    description:
      "Delivered full-stack web applications for clients from idea to deployment. Handled frontend design, backend logic, API integrations, responsive layouts, authentication flows, and production polish while communicating directly with clients and turning requirements into working products.",
    points: [
      "Delivered end-to-end web apps from planning and UI design to backend logic and deployment",
      "Built responsive interfaces using React, JavaScript, HTML, CSS, and modern frontend patterns",
      "Created API-connected features, form flows, dashboards, and structured application logic",
      "Improved client projects through debugging, UX polish, performance fixes, and clean deployment setup",
      "Managed requirements, feedback, iterations, and final delivery independently",
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
