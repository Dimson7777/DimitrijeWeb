import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Validate before hitting the database — keeps junk out and gives clear feedback.
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (min 2 characters)")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(200, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(5000, "Message is too long"),
});

const LINKEDIN_URL = "https://www.linkedin.com/in/dimitrije-bukejlovic-9055a8400/";
const GITHUB_URL = "https://github.com/Dimson7777";
const EMAIL = "dimibukejlovic@icloud.com";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const result = contactSchema.safeParse({ name, email, message });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof typeof errors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the errors and try again.");
      return;
    }

    setErrors({});
    setLoading(true);

    const { error } = await supabase.from("contact_messages").insert({
      name: result.data.name,
      email: result.data.email,
      message: result.data.message,
    });

    setLoading(false);

    if (error) {
      console.error("Contact form submission failed:", error);
      toast.error("Something went wrong. Please try again or email me directly.");
      return;
    }

    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
    toast.success("Message sent successfully. I'll get back to you soon.");
  };

  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-7 md:p-8 flex flex-col justify-between"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono text-primary mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" /> Let's connect
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-gradient">
            Have a project in mind?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Drop a message or reach me directly. I usually respond within 24 hours.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-border/70 hover:border-primary/40 hover:bg-secondary/40 transition-all"
          >
            <span className="w-9 h-9 rounded-xl bg-primary/15 text-primary inline-flex items-center justify-center">
              <Mail size={16} />
            </span>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="text-sm font-medium truncate">{EMAIL}</div>
            </div>
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-border/70 hover:border-primary/40 hover:bg-secondary/40 transition-all"
          >
            <span className="w-9 h-9 rounded-xl bg-primary/15 text-primary inline-flex items-center justify-center">
              <Github size={16} />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">GitHub</div>
              <div className="text-sm font-medium">@Dimson7777</div>
            </div>
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-border/70 hover:border-primary/40 hover:bg-secondary/40 transition-all"
          >
            <span className="w-9 h-9 rounded-xl bg-primary/15 text-primary inline-flex items-center justify-center">
              <Linkedin size={16} />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">LinkedIn</div>
              <div className="text-sm font-medium">Dimitrije Bukejlovic</div>
            </div>
          </a>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onSubmit={onSubmit}
        noValidate
        className="glass-strong rounded-3xl p-7 md:p-8 space-y-5"
      >
        {sent ? (
          <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-glow inline-flex items-center justify-center text-primary-foreground">
              <Check size={26} />
            </div>
            <h3 className="font-display text-2xl font-bold">Message sent successfully</h3>
            <p className="text-muted-foreground max-w-sm">
              Thanks for reaching out — I'll get back to you within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="text-sm text-primary hover:underline mt-2"
            >
              Send another message
            </button>
          </div>
        ) : (
          <>
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                Name
              </label>
              <input
                id="name"
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                aria-invalid={!!errors.name}
                className={`w-full px-4 py-3 rounded-xl bg-background/60 border outline-none transition-all text-sm ${
                  errors.name
                    ? "border-destructive focus:ring-2 focus:ring-destructive/30"
                    : "border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                maxLength={200}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                className={`w-full px-4 py-3 rounded-xl bg-background/60 border outline-none transition-all text-sm ${
                  errors.email
                    ? "border-destructive focus:ring-2 focus:ring-destructive/30"
                    : "border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                maxLength={5000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project or the role..."
                aria-invalid={!!errors.message}
                className={`w-full px-4 py-3 rounded-xl bg-background/60 border outline-none transition-all text-sm resize-none ${
                  errors.message
                    ? "border-destructive focus:ring-2 focus:ring-destructive/30"
                    : "border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                }`}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-medium text-sm shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.6)] hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.8)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={15} />
                </>
              )}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Or email me directly at{" "}
              <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">
                {EMAIL}
              </a>
            </p>
          </>
        )}
      </motion.form>
    </div>
  );
};
