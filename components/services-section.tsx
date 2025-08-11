"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Palette,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const services = [
  {
    icon: <Code2 className="w-12 h-12 text-[#D4AF37]" />,
    title: "Web Development",
    content: "Custom web applications built with cutting-edge technologies.",
    features: [
      "Full-stack Development",
      "Progressive Web Apps",
      "E-commerce Solutions",
      "API Integration",
    ],
  },
  {
    icon: <Palette className="w-12 h-12 text-[#D4AF37]" />,
    title: "Creative Design",
    content: "Stunning visuals that capture your brand's essence.",
    features: [
      "UI/UX Design",
      "Brand Identity",
      "Motion Graphics",
      "Visual Content",
    ],
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-[#D4AF37]" />,
    title: "Digital Marketing",
    content: "Strategic marketing solutions for exponential growth.",
    features: [
      "SEO Optimization",
      "Social Media Marketing",
      "Content Strategy",
      "Analytics",
    ],
  },
  // ... other services
];

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + newDirection + services.length) % services.length
    );
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] via-primary to-[#D4AF37] bg-clip-text text-transparent">
            Our Services
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-4 mb-8">
          <Button
            onClick={() => paginate(-1)}
            className="bg-black/50 hover:bg-black/70 border border-[#D4AF37]/20 text-[#D4AF37] rounded-full p-3 hover:scale-110 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={() => paginate(1)}
            className="bg-black/50 hover:bg-black/70 border border-[#D4AF37]/20 text-[#D4AF37] rounded-full p-3 hover:scale-110 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Service Cards */}
        <div className="relative perspective-[1200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, rotateY: direction > 0 ? 45 : -45 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: direction > 0 ? -45 : 45 }}
              transition={{ duration: 0.5 }}
              className="bg-black/60 border border-[#D4AF37]/20 rounded-xl p-8 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div className="p-4 rounded-full bg-[#D4AF37]/10">
                  {services[currentIndex].icon}
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] via-primary to-[#D4AF37] bg-clip-text text-transparent">
                  {services[currentIndex].title}
                </h3>
                <p className="text-zinc-300 text-lg">
                  {services[currentIndex].content}
                </p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
                  {services[currentIndex].features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-zinc-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
