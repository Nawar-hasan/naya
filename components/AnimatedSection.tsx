"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

type AnimatedSectionProps = {
  children?: ReactNode;  // Made optional with "?"
  className?: string;
  initial?: MotionProps["initial"];
  animate?: MotionProps["whileInView"];
  transition?: MotionProps["transition"];
  style?: CSSProperties;
};

export default function AnimatedSection({
  children,
  className = "",
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.8 },
  style,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      transition={transition}
      viewport={{ once: true }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}