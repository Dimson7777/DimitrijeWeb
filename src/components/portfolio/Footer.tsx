import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border/60 py-10">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="text-center sm:text-left">
        <div className="font-display font-semibold text-foreground">Dimitrije Bukejlovic</div>
        <div className="text-xs">© {new Date().getFullYear()} Portfolio Website. Built with care.</div>
      </div>
      <div className="flex items-center gap-4">
        <a href="https://github.com/Dimson7777" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-foreground transition-colors"><Github size={16} /></a>
        <a href="https://www.linkedin.com/in/dimitrije-bukejlovic-9055a8400/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-foreground transition-colors"><Linkedin size={16} /></a>
        <a href="mailto:dimibukejlovic@icloud.com" aria-label="Email" className="hover:text-foreground transition-colors"><Mail size={16} /></a>
      </div>
    </div>
  </footer>
);
