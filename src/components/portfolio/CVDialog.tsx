import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CVDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="relative w-full h-[calc(90vh-2rem)]">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-background/80 hover:bg-background transition-colors"
          >
            <X size={20} />
          </button>

          <iframe
            src="/cv.pdf#toolbar=1"
            className="w-full h-full border-0"
            title="CV"
            allow="web-share"
          />

          <div className="absolute bottom-4 right-4 z-10">
            <a
              href="/cv.pdf"
              download="Dimitrije-Bukejlovic-CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Download PDF
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
