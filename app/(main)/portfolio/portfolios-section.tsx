"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/app/server/types";
import Image from "next/image";
import { useState, useRef } from "react";
import { FaCode, FaArrowRight, FaPlay, FaPause } from "react-icons/fa";
import { usePagination } from "@mantine/hooks";

const FilteredPortfolioSection = ({
  portfolios,
}: {
  portfolios: Project[];
}) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement>>({});
  const itemsPerPage = 6;
  const totalPages = Math.ceil(portfolios.length / itemsPerPage);

  const pagination = usePagination({
    total: totalPages,
    initialPage: 1,
  });

  const paginatedPortfolios = portfolios.slice(
    (pagination.active - 1) * itemsPerPage,
    pagination.active * itemsPerPage
  );

  const toggleVideo = (projectTitle: string) => {
    const video = videoRefs.current[projectTitle];
    if (video) {
      if (isPlaying[projectTitle]) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying((prev) => ({
        ...prev,
        [projectTitle]: !prev[projectTitle],
      }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {paginatedPortfolios.map((project) => {
            return (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onHoverStart={() => setHoveredProject(project.title)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Card className="relative select-none overflow-hidden group border-primary/20 bg-black/50 backdrop-blur-sm">
                  <div className="relative h-64">
                    {project.video ? (
                      <>
                        <video
                          ref={(el) => {
                            if (el) videoRefs.current[project.title] = el;
                          }}
                          autoPlay
                          src={
                            process.env.NEXT_PUBLIC_API_BASE_URL + project.video
                          }
                          poster={
                            process.env.NEXT_PUBLIC_API_BASE_URL +
                              project.image || "/placeholder.svg"
                          }
                          className="absolute inset-0 w-full h-full object-cover"
                          loop
                          muted
                          playsInline
                        />
                        <button
                          onClick={() => toggleVideo(project.title)}
                          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          aria-label={
                            isPlaying[project.title]
                              ? "Pause video"
                              : "Play video"
                          }
                        >
                          {isPlaying[project.title] ? (
                            <FaPause className="text-white text-4xl" />
                          ) : (
                            <FaPlay className="text-white text-4xl" />
                          )}
                        </button>

                        {/* Category Badge */}
                        <div className="absolute top-4 ltr:right-4 rtl:left-4">
                          <Badge className="bg-primary/20 text-primary backdrop-blur-sm">
                            <span className="flex items-center gap-1">
                              <FaCode className="flex-shrink-0" />
                              {project.category}
                            </span>
                          </Badge>
                        </div>
                      </>
                    ) : (
                      <>
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_API_BASE_URL +
                              project.image || "/placeholder.svg"
                          }
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 size-full  group-hover:scale-110  transition-[opacity_transform] duration-500 group-hover:opacity-80" />

                        {/* Category Badge */}
                        <div className="absolute top-4 ltr:right-4 rtl:left-4">
                          <Badge className="bg-primary/20 text-primary backdrop-blur-sm">
                            <span className="flex items-center gap-1">
                              <FaCode className="flex-shrink-0" />
                              {project.category}
                            </span>
                          </Badge>
                        </div>

                        {/* Stats Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-primary">
                              {project.metrics.increase}
                            </div>
                            <div className="text-sm text-zinc-400">
                              {project.metrics.metric}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold truncate text-primary">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-primary/20 text-zinc-400"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* View Project Link */}
                    <Link
                      href={project.link}
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                      aria-label={`View ${project.title} project`}
                    >
                      <span className="mr-2">View Project</span>
                      <motion.div
                        animate={{
                          x: hoveredProject === project.title ? [0, 4, 0] : 0,
                        }}
                        transition={{
                          duration: 1,
                          repeat:
                            hoveredProject === project.title
                              ? Number.POSITIVE_INFINITY
                              : 0,
                        }}
                      >
                        <FaArrowRight className="w-4 h-4 flex-shrink-0" />
                      </motion.div>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      <nav className="flex justify-center mt-8" aria-label="Pagination">
        <ul className="flex space-x-2 rtl:space-x-reverse">
          {pagination.range.map((pageNumber, index) => (
            <li key={index}>
              {pageNumber === "dots" ? (
                <span className="px-3 py-2">...</span>
              ) : (
                <button
                  onClick={() => pagination.setPage(pageNumber as number)}
                  className={`px-3 py-2 rounded-md ${
                    pagination.active === pageNumber
                      ? "bg-primary text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                  aria-current={
                    pagination.active === pageNumber ? "page" : undefined
                  }
                >
                  {pageNumber}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default FilteredPortfolioSection;
