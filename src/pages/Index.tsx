import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Stats } from "@/components/portfolio/Stats";
import { About } from "@/components/portfolio/About";
import { BeyondCode } from "@/components/portfolio/BeyondCode";
import { Experience } from "@/components/portfolio/Experience";
import { FeaturedProject } from "@/components/portfolio/FeaturedProject";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Loader } from "@/components/portfolio/Loader";
import { ScrollCinematicTransition } from "@/components/portfolio/ScrollCinematicTransition";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 overflow-x-hidden">
      <Loader />
      <Navbar />
      <main className="pt-20 [&_section]:py-24 [&_h1]:font-bold [&_h1]:tracking-tighter [&_h2]:font-bold [&_h2]:tracking-tighter [&_h3]:font-bold [&_h3]:tracking-tighter [&_.text-muted-foreground]:!text-zinc-400 [&_p]:text-zinc-400">
        <Hero />
        <ScrollCinematicTransition>
          <Stats />
          <About />
          <BeyondCode />
          <Experience />
          <FeaturedProject />
          <Projects />
          <Skills />
          <Contact />
        </ScrollCinematicTransition>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
