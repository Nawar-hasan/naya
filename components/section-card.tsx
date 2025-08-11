import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { MotionClient } from "./ui/MotionClient";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  icon: ReactNode;
  index: number;
}

export default function SectionCard({
  title,
  children,
  icon,
  index,
}: SectionCardProps) {
  return (
    <MotionClient
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-primary rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1000"></div>
      <Card className="relative bg-black/60 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 backdrop-blur-sm p-8">
        {/* Decorative corner lines */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16">
          <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#D4AF37] to-transparent"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-[#D4AF37] to-transparent"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16">
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#D4AF37] to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-[#D4AF37] to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-[#D4AF37]/10">{icon}</div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] via-primary to-[#D4AF37] bg-clip-text text-transparent">
              {title}
            </h3>
          </div>
          <div className="text-zinc-300 leading-relaxed space-y-4">
            {children}
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent"></div>
        </div>
      </Card>
    </MotionClient>
  );
}
