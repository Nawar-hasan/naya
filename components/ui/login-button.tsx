"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function LoginButton({
  className,
  children,
  isLoading,
  ...props
}: LoginButtonProps) {
  return (
    <button
      className={cn(
        "relative w-full h-12 rounded-lg font-medium transition-all duration-300 overflow-hidden disabled:opacity-50",
        "bg-gradient-to-r from-primary via-[#DAA520] to-primary bg-[length:200%_100%]",
        "hover:bg-right hover:shadow-lg hover:shadow-primary/20",
        "active:scale-[0.98] active:duration-100",
        "disabled:cursor-not-allowed disabled:active:scale-100",
        "text-black",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-black/[0.03]" />

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-[-10%] w-[120%] rotate-[-5deg] blur-md bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_2s_ease-in-out_infinite]" />
      </div>

      {/* Border gradient */}
      <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-primary/50 via-[#DAA520]/50 to-primary/50 opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        <span
          className={cn(
            "transition-opacity duration-200",
            isLoading ? "opacity-70" : "opacity-100"
          )}
        >
          {children}
        </span>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-primary opacity-0 blur-xl transition-opacity duration-300"
        initial={false}
        animate={{ opacity: isLoading ? 0.1 : 0 }}
        whileHover={{ opacity: 0.15 }}
      />
    </button>
  );
}
