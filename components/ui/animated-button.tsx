"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline";
}

export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(({ className, children, variant = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "relative h-12 transition-colors px-8 rounded-md overflow-hidden group",
        variant === "default"
          ? "bg-primary text-black"
          : "bg-transparent hover:text-black border-2 border-primary text-primary",
        className
      )}
      ref={ref}
      {...props}
    >
      {/* Background gradient animation */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#FDB931] to-primary animate-shimmer" />
      </div>

      {/* Glowing corners */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-8 h-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-2 h-2 bg-primary"
            style={{ originX: 0, originY: 0 }}
          />
        </div>
        <div className="absolute top-0 right-0 w-8 h-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              delay: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-2 h-2 bg-primary"
            style={{ originX: 1, originY: 0 }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-0 w-2 h-2 bg-primary"
            style={{ originX: 0, originY: 1 }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              delay: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute bottom-0 right-0 w-2 h-2 bg-primary"
            style={{ originX: 1, originY: 1 }}
          />
        </div>
      </div>

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Hover effects */}
      {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-primary/10 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div> */}
    </button>
  );
});
AnimatedButton.displayName = "AnimatedButton";
