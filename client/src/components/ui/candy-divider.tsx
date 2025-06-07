import { motion } from "framer-motion";

interface CandyDividerProps {
  className?: string;
  animate?: boolean;
}

export function CandyDivider({ className = "", animate = true }: CandyDividerProps) {
  return (
    <motion.div
      className={`candy-divider ${className}`}
      initial={animate ? { scaleX: 0 } : {}}
      whileInView={animate ? { scaleX: 1 } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: true }}
    />
  );
}
