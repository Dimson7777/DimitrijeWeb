import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Loader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow animate-glow-pulse" />
            <span className="font-display font-bold text-2xl text-gradient">DB.</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
