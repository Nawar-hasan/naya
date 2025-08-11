import { Project } from "@/app/server/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MotionClient } from "@/components/ui/MotionClient";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RelatedServices = async ({ services }: { services: Project[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((project, index) => {
        return (
          <MotionClient
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="group relative overflow-hidden border-[#FFD700]/20 bg-black/50 backdrop-blur-sm">
              {/* Project Image */}
              <div className="relative h-48">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API_BASE_URL + project.image ||
                    "/placeholder.svg"
                  }
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:opacity-80" />

                {/* Metrics Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-[#FFD700]/20 text-[#FFD700] px-3 py-1 rounded-full backdrop-blur-sm text-sm">
                    {project.metrics.increase}
                    <span className="text-xs text-zinc-400 ml-1">
                      {project.metrics.metric}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-[#FFD700]">
                  {project.title}
                </h3>
                <p className="text-zinc-400">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="border-[#FFD700]/20 text-zinc-400"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* View Project Link */}
                <Link
                  href={`/portfolio/${project.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="inline-flex items-center text-[#FFD700] hover:text-[#FFD700]/80 transition-colors"
                >
                  <span className="mr-2">View Details</span>
                  <MotionClient
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </MotionClient>
                </Link>
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFD700] to-transparent"></div>
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-[#FFD700] to-transparent"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16">
                <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-[#FFD700] to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-[#FFD700] to-transparent"></div>
              </div>
            </Card>
          </MotionClient>
        );
      })}
    </div>
  );
};

export default RelatedServices;
