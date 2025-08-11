"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function GoldenWaveSection({
  numberOfMember,
  numberOfProject,
  numberOfServices,
}: {
  numberOfProject: number;
  numberOfMember: number;
  numberOfServices: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] py-8 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${
                50 + mousePosition.x * 20
              }% ${
                50 + mousePosition.y * 20
              }%, rgba(218,165,32,0.15), transparent ${40 + i * 20}%)`,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated Golden Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[600px] h-[600px] border border-[#DAA520] rounded-full"
            style={{
              rotate,
              scale: 1 + i * 0.2,
              opacity: 0.1 - i * 0.02,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1 + i * 0.2, 1.2 + i * 0.2, 1 + i * 0.2],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div style={{ y }} className="relative inline-block mb-8">
            {/* Floating Elements */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${i * 25 - 50}%`,
                  top: `${Math.sin(i) * 50}px`,
                  width: "4px",
                  height: "4px",
                  background: "#DAA520",
                  borderRadius: "50%",
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}

            <motion.div
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-[#DAA520] to-[#B8860B] rounded-xl transform rotate-45 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#DAA520] via-[#B8860B] to-[#DAA520] bg-clip-text text-transparent"
          >
            Transform Your Digital Presence
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-400 text-lg mb-12"
          >
            Experience the perfect blend of innovation and expertise with our
            comprehensive suite of digital services.
          </motion.p>

          {/* Interactive Elements */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { number: numberOfServices + "+", label: "Services available" },
              { number: numberOfProject + "+", label: "Projects Completed" },
              { number: numberOfMember + "+", label: "Team Member" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#DAA520]/10 to-transparent rounded-lg blur-xl group-hover:opacity-75 transition-opacity duration-500" />
                <div className="relative p-6 rounded-lg border border-[#DAA520]/20 bg-black/50">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="text-3xl font-bold text-[#DAA520] mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(${
                120 * i
              }deg, transparent, rgba(218,165,32,0.1) 50%, transparent)`,
              transform: `translateX(${-50 + i * 50}%)`,
            }}
            animate={{
              x: ["0%", "100%"],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  );
}
