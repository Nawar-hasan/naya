"use client";

import { Slot, SlotProps } from "@radix-ui/react-slot";
import { motion, MotionProps } from "framer-motion";
import React, { forwardRef, ReactNode } from "react";

// Combine SlotProps and MotionProps while omitting conflicting types
type AnimatedSlotProps = Omit<SlotProps, "style"> & {
  children?: ReactNode;
  className?: string;
  asChild?: boolean; // Radix's asChild prop
} & MotionProps;

export const MotionClient = forwardRef<HTMLElement, AnimatedSlotProps>(
  ({ children, asChild = false, className, ...motionProps }, ref) => {
    // Use Slot when asChild is true; otherwise, use a div
    const Component = asChild ? motion.create(Slot) : motion.div;

    return (
      //@ts-expect-error: Known issue with `motion` and `Slot` types
      <Component {...motionProps} ref={ref} className={className}>
        {children}
      </Component>
    );
  }
);

MotionClient.displayName = "MotionClient"; // Set display name for debugging
