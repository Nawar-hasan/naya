"use client";

import { Service } from "@/app/server/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ServicesCarousel({
  services,
}: {
  services: Service[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle empty services array
  if (!services || services.length === 0) {
    return (
      <section className="relative bg-green py-12 md:py-24">
        <div className="text-center px-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent gold-shimmer-text">
            Our Expertise
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
            No services available at the moment. Contact us to learn more!
          </p>
        </div>
      </section>
    );
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1.05, // Slight zoom for emphasis
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + newDirection + services.length) % services.length
    );
  };

  return (
    <section className="relative bg-green py-12 md:py-24">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-custom">
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent transform -skew-y-12"
          style={{ width: "200%", left: "-50%" }}
        />
        <div className="absolute inset-0 bg-gradient-radial from-[#B8860B]/10 via-transparent to-transparent opacity-30 animate-pulse-slow" />
      </div>

      <div className="text-center px-4 mb-16 relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent gold-shimmer-text">
          Our Expertise
        </h2>
        <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
          Tailored digital marketing solutions designed to amplify your brand, engage your audience, and drive measurable growth.
        </p>
      </div>

      <div className="w-full pb-4 px-4 md:pb-8 justify-center items-center flex gap-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={() => paginate(-1)}
            className="bg-black/50 hover:bg-black/70 border border-[#B8860B]/20 text-[#DAA520] rounded-full p-3 transition-all duration-300 hover:scale-110 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DAA520]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <ChevronLeft className="w-6 h-6 relative z-10" />
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={() => paginate(1)}
            className="bg-black/50 hover:bg-black/70 border border-[#B8860B]/20 text-[#DAA520] rounded-full p-3 transition-all duration-300 hover:scale-110 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DAA520]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <ChevronRight className="w-6 h-6 relative z-10" />
          </Button>
        </motion.div>
      </div>

      <div
        ref={containerRef}
        className="relative h-[600px] overflow-hidden perspective-[1200px] transform-gpu"
        style={{ perspective: "1200px" }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute left-[5%] w-[90%] h-96"
          >
            <Card className="group relative bg-black/60 border border-[#B8860B]/20 backdrop-blur-md max-w-5xl mx-auto overflow-hidden transition-transform duration-700 hover:scale-[1.02] hover:border-[#DAA520]/40 animate-glow-border">
              <div
                className="absolute inset-0 max-md:hidden bg-gradient-to-br from-black via-black to-transparent z-10"
                style={{ clipPath: "polygon(0 0, 55% 0, 45% 100%, 0 100%)" }}
              />

              <div className="relative flex flex-col md:flex-row">
                <div className="w-full md:w-[45%] p-6 md:p-12 z-20 space-y-4 md:space-y-6">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="p-4 rounded-full bg-gradient-radial from-[#B8860B]/20 via-[#DAA520]/10 to-transparent relative inline-block"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#DAA520]/20 to-transparent gold-pulse"></div>
                    <Code2 className="size-12 text-[#DAA520]" />
                  </motion.div>

                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent gold-shimmer-text"
                  >
                    {services[currentIndex].title}
                  </motion.h3>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-zinc-300 text-base md:text-lg"
                  >
                    {services[currentIndex].description}
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="grid grid-cols-1 gap-4"
                  >
                    {services[currentIndex].features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-zinc-400 group/feature"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] group-hover/feature:scale-150 transition-transform duration-300"></div>
                        <span className="group-hover/feature:text-[#DAA520] transition-colors duration-300">
                          {feature.title}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <div className="max-mn:absolute max-mn:bg-black/50 max-mn:mix-blend-overlay max-mn:inset-0 max-mn:size-full relative md:w-[55%] h-64 md:h-auto overflow-hidden">
                  <div className="absolute inset-0 z-10 opacity-20">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 50% 50%, #B8860B 1px, transparent 2px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                  </div>

                  <div className="relative h-full transform group-hover:scale-105 transition-transform duration-700">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_API_BASE_URL +
                          services[currentIndex].image || "/placeholder.svg"
                      }
                      alt={services[currentIndex].title}
                      fill
                      className="object-cover brightness-90 group-hover:brightness-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#B8860B]/20 via-black/40 to-black/70" />
                  </div>

                  <div className="absolute top-0 right-0 w-32 h-32">
                    <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#B8860B] to-transparent"></div>
                    <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-[#B8860B] to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-32 h-32">
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#B8860B] to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-[#B8860B] to-transparent"></div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center md:mt-8 items-center space-x-2 mt-4 relative z-10">
        {services.map((_, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-r from-[#B8860B] to-[#DAA520] w-8 gold-pulse"
                : "bg-[#B8860B]/30 hover:bg-[#DAA520]/50"
            }`}
            aria-label={`Go to service ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}