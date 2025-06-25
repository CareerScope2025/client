import { AnimatePresence, motion } from "motion/react";

interface SideModalProps {
  children?: React.ReactNode;
  open: boolean;
}

export const SideModal = ({ children, open }: SideModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="absolute inset-y-16 right-16 flex flex-col bg-white/7.5 backdrop-blur-xs"
          exit={{ opacity: 0, x: 200 }}
          initial={{ opacity: 0, x: 200 }}
          style={{ width: 400 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
