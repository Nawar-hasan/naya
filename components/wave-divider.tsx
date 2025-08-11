"use client";

import { motion } from "framer-motion";

export default function WaveDivider() {
  return (
    <div className="relative h-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-0 w-full"
      >
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C320,100 420,0 720,50 C1020,100 1120,20 1440,80 L1440,100 L0,100 Z"
            className="fill-primary opacity-[0.15]"
          />
        </svg>
      </motion.div>
    </div>
  );
}
