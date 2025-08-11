"use client";
import { Service } from "@/app/server/types";
import { Card } from "@/components/ui/card";
import { MotionClient } from "@/components/ui/MotionClient";
import { Code2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.5,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
    scale: 0.5,
    rotateY: direction > 0 ? -45 : 45,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const ServicesCard = ({ service }: { service: Service }) => {
  const router = useRouter();
  return (
    <MotionClient
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className=" min-h-96 cursor-pointer "
      onClick={() => router.push(`/services/${service.slug}`)}
    >
      <Card className="group relative bg-black/60 border border-[#B8860B]/20 backdrop-blur-md max-w-5xl mx-auto overflow-hidden transition-transform duration-700 hover:scale-[1.02] perspective-3d hover:rotate-y-[-5deg]">
        <div
          className="absolute inset-0 max-md:hidden bg-gradient-to-br from-black via-black to-transparent z-10"
          style={{
            clipPath: "polygon(0 0, 55% 0, 45% 100%, 0 100%)",
          }}
        />

        <div className="relative flex flex-col md:flex-row">
          <div className="w-full md:w-[45%] p-6 md:p-12 z-20 space-y-4 md:space-y-6">
            <MotionClient
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-4 rounded-full   bg-gradient-radial from-[#B8860B]/20 via-[#DAA520]/10 to-transparent relative inline-block"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#DAA520]/20 to-transparent gold-pulse"></div>
              <Code2 className=" relative text-[#FFD700] size-5" />
            </MotionClient>

            <MotionClient
              asChild
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold  bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent gold-shimmer-text"
            >
              <h3> {service.title}</h3>
            </MotionClient>

            <MotionClient
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-zinc-300 text-base md:text-lg"
            >
              <p>{service.description}</p>
            </MotionClient>

            <MotionClient
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="grid grid-cols-1 gap-4"
            >
              {service.features.map((feature, index) => (
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
            </MotionClient>
          </div>

          <div className="max-mn:absolute max-mn:bg-black/50 max-mn:mix-blend-overlay max-mn:inset-0 max-mn:size-full relative md:w-[55%] h-64 md:h-auto overflow-hidden">
            <div className="absolute inset-0 z-10 opacity-30">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #B8860B 1px, transparent 1px), linear-gradient(-45deg, #B8860B 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            <div className="  relative h-full transform group-hover:scale-110 transition-transform duration-700">
              <Image
                src={
                  process.env.NEXT_PUBLIC_API_BASE_URL + service.image ||
                  "/placeholder.svg"
                }
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="absolute  inset-0 bg-gradient-to-l from-[#B8860B]/30 via-black/50 to-black/80" />
            </div>

            <div className="absolute top-0  right-0 w-32 h-32">
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
    </MotionClient>
  );
};

export default ServicesCard;
