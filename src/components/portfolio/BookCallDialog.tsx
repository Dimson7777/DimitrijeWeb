import { useEffect, useMemo, useState } from "react";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, Check, Clock, Loader2, Mail } from "lucide-react";
import { z } from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// Available hours (local time) people can book — kept simple on purpose
const SLOT_HOURS = [9, 10, 11, 13, 14, 15, 16, 17];
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzlvnre";

// Validation matches the database constraint
const bookingSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().max(1000).optional(),
});

type Step = "date" | "details" | "done";

export const BookCallDialog = ({ open, onOpenChange }: Props) => {
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [taken, setTaken] = useState<Date[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submittedDetails, setSubmittedDetails] = useState<{
    name: string;
    email: string;
    selectedTime: Date;
  } | null>(null);

  // Reset state every time the dialog reopens
  useEffect(() => {
    if (open) {
      setStep("date");
      setSelectedDate(null);
      setSelectedTime(null);
      setForm({ name: "", email: "", message: "" });
      setSubmittedDetails(null);
    }
  }, [open]);

  // Next 14 weekdays
  const upcomingDays = useMemo(() => {
    const days: Date[] = [];
    let cursor = startOfDay(new Date());
    while (days.length < 14) {
      cursor = addDays(cursor, 1);
      const dow = cursor.getDay();
      if (dow !== 0 && dow !== 6) days.push(cursor);
    }
    return days;
  }, []);

  const slotsForDay = useMemo(() => {
    if (!selectedDate) return [];
    return SLOT_HOURS.map((h) => {
      const slot = new Date(selectedDate);
      slot.setHours(h, 0, 0, 0);
      const isTaken = taken.some((t) => Math.abs(t.getTime() - slot.getTime()) < 60_000);
      return { time: slot, isTaken };
    });
  }, [selectedDate, taken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime || submitting) return;

    const parsed = bookingSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          selectedDate: format(selectedTime, "yyyy-MM-dd"),
          selectedTime: format(selectedTime, "HH:mm"),
          message: parsed.data.message || "",
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { errors?: Array<{ message?: string }> }
        | null;

      if (!response.ok) {
        const formspreeError = data?.errors?.[0]?.message;
        toast.error(
          formspreeError ||
            "Couldn't send your booking request. Please check your details and try again."
        );
        return;
      }

      setSubmittedDetails({
        name: parsed.data.name,
        email: parsed.data.email,
        selectedTime,
      });
      setForm({ name: "", email: "", message: "" });
      setStep("done");
      toast.success("Meeting request sent successfully. I'll get back to you soon.");
    } catch (error) {
      console.error("Booking request failed:", error);
      toast.error("Network error. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary inline-flex items-center justify-center">
              <CalendarIcon size={18} />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-xl font-bold leading-tight">
                Book a 15-min intro call
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Best way to reach me for opportunities or project chats.
              </p>
            </div>
          </div>
        </div>

        {/* Step: pick a date + time */}
        {step === "date" && (
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <CalendarIcon size={14} className="text-muted-foreground" />
                Pick a day
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {upcomingDays.map((d) => {
                  const isSelected = selectedDate && isSameDay(d, selectedDate);
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => {
                        setSelectedDate(d);
                        setSelectedTime(null);
                      }}
                      className={`flex flex-col items-center py-2.5 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border hover:border-primary/40 hover:bg-secondary/40 text-muted-foreground"
                      }`}
                    >
                      <span className="uppercase tracking-wide text-[10px]">
                        {format(d, "EEE")}
                      </span>
                      <span className="text-base font-semibold text-foreground mt-0.5">
                        {format(d, "d")}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {format(d, "MMM")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedDate && (
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Clock size={14} className="text-muted-foreground" />
                  Available times — {format(selectedDate, "EEEE, MMM d")}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slotsForDay.map(({ time, isTaken }) => {
                    const isSelected = selectedTime?.getTime() === time.getTime();
                    return (
                      <button
                        key={time.toISOString()}
                        disabled={isTaken}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          isTaken
                            ? "border-border/40 text-muted-foreground/40 line-through cursor-not-allowed"
                            : isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/40 hover:bg-secondary/40"
                        }`}
                      >
                        {format(time, "HH:mm")}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-muted-foreground mt-3">
                  Times shown in your local timezone.
                </p>
              </div>
            )}

            <button
              disabled={!selectedTime}
              onClick={() => setStep("details")}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold text-sm shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] hover:shadow-[0_12px_30px_-8px_hsl(var(--primary)/0.8)] hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:hover:translate-y-0 disabled:shadow-none"
            >
              Continue <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step: enter details */}
        {step === "details" && selectedTime && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setStep("date")}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={12} /> Change time
            </button>

            <div className="rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm">
              <div className="font-medium">{format(selectedTime, "EEEE, MMMM d")}</div>
              <div className="text-muted-foreground text-xs mt-0.5">
                {format(selectedTime, "HH:mm")} · 15 minutes
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Your name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary/60 focus:outline-none text-sm transition-colors"
                placeholder="Jane Doe"
                maxLength={100}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary/60 focus:outline-none text-sm transition-colors"
                placeholder="jane@company.com"
                maxLength={255}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">
                What's it about? <span className="text-muted-foreground/60">(optional)</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary/60 focus:outline-none text-sm resize-none transition-colors"
                rows={3}
                placeholder="Quick context helps me come prepared."
                maxLength={1000}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold text-sm shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] hover:shadow-[0_12px_30px_-8px_hsl(var(--primary)/0.8)] hover:-translate-y-0.5 transition-all disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={14} /> Sending booking request...
                </>
              ) : (
                <>Confirm booking</>
              )}
            </button>
          </form>
        )}

        {/* Step: confirmation */}
        {step === "done" && submittedDetails && (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-primary/15 text-primary inline-flex items-center justify-center mx-auto">
              <Check size={26} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">Meeting request sent successfully.</h3>
              <p className="text-sm text-muted-foreground mt-2">
                I'll get back to you soon. Requested for{" "}
                <span className="text-foreground font-medium">
                  {format(submittedDetails.selectedTime, "EEEE, MMM d 'at' HH:mm")}
                </span>
                {" "}from{" "}
                <span className="text-foreground font-medium">{submittedDetails.email}</span>.
              </p>
            </div>

            <a
              href={`mailto:dimibukejlovic@icloud.com?subject=Intro%20call%20${encodeURIComponent(
                format(submittedDetails.selectedTime, "MMM d HH:mm")
              )}&body=${encodeURIComponent(
                `Hi Dimitrije,\n\nJust booked an intro call for ${format(
                  submittedDetails.selectedTime,
                  "EEEE, MMM d 'at' HH:mm"
                )}.\n\n— ${submittedDetails.name}`
              )}`}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={12} /> Send me a quick note
            </a>

            <button
              onClick={() => onOpenChange(false)}
              className="block mx-auto px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
