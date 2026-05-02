import { motion } from "framer-motion";
import { Plane, Dumbbell, TrendingUp } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const interests = [
  {
    icon: Plane,
    title: "Travel",
    text: "Travel keeps me curious. I like seeing how different places work, how people move through spaces, and how small details can shape the whole experience.",
  },
  {
    icon: Dumbbell,
    title: "Workout",
    text: "Training helps me stay disciplined. It gives structure to my day, keeps my energy high, and reminds me that progress comes from consistency.",
  },
  {
    icon: TrendingUp,
    title: "Investing",
    text: "Investing taught me to think long-term, manage risk, and make decisions based on patience instead of emotion — the same mindset I try to bring into product work.",
  },
];

export const Interests = () => (
  <section id="interests" className="py-20 md:py-28">
    <div className="container">
      <SectionHeading
        eyebrow="Beyond Code"
        title={
          <>
            A few things that keep me{" "}
            <span className="text-gradient-primary">sharp & balanced.</span>
          </>
        }
        description="A few things that keep me sharp, curious, and balanced outside of building software."
      />

      <div className="grid sm:grid-cols-3 gap-5">
        {interests.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass card-hover rounded-2xl p-7 flex flex-col gap-5"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20 shrink-0">
                <Icon size={20} className="text-primary" strokeWidth={1.8} />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-base">{item.title}</h3>
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
