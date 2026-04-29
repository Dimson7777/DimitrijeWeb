import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Stats } from "@/components/portfolio/Stats";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { FeaturedProject } from "@/components/portfolio/FeaturedProject";
import { Projects } from "@/components/portfolio/Projects";
import { Deliver } from "@/components/portfolio/Deliver";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Loader } from "@/components/portfolio/Loader";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Experience />
        <FeaturedProject />
        <Projects />
        <Deliver />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
