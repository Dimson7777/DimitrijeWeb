import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Menu, X } from "lucide-react";
import { BookCallDialog } from "./BookCallDialog";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [bookOpen, setBookOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-4 md:py-5"}`}
    >
      <div className="container">
        <nav
          className={`flex items-center justify-between rounded-full px-4 md:px-5 py-2.5 md:py-3 transition-all duration-500 ${
            scrolled ? "glass-strong" : "bg-transparent border border-transparent"
          }`}
        >
          <a href="#home" className="flex items-center gap-2.5 shrink-0 group">
            <span className="font-display font-bold text-lg tracking-tight">
              <span className="text-gradient-primary">DB</span>
              <span className="text-foreground">.</span>
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-foreground">Dimitrije Bukejlovic</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Portfolio Website</span>
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative px-4 py-2 text-sm transition-colors rounded-full ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-secondary/80 border border-border/60"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setBookOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] hover:shadow-[0_12px_30px_-8px_hsl(var(--primary)/0.8)] hover:-translate-y-0.5 transition-all"
            >
              <Calendar size={14} /> Book a Call
            </button>
            <a
              href="#contact"
              className="inline-flex items-center text-sm font-medium px-5 py-2.5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Let's talk
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 rounded-full hover:bg-secondary/60"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-3 glass-strong rounded-2xl p-3 flex flex-col gap-1"
            >
              {links.map((l) => {
                const isActive = active === l.href.slice(1);
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm transition-colors ${
                        isActive
                          ? "bg-secondary/80 text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
              <li className="pt-1 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    setBookOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border border-border hover:bg-secondary/60"
                >
                  <Calendar size={14} /> Book a Call
                </button>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block text-center px-4 py-3 rounded-xl text-sm font-medium bg-foreground text-background"
                >
                  Let's talk
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <BookCallDialog open={bookOpen} onOpenChange={setBookOpen} />
    </motion.header>
  );
};
