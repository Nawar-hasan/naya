"use client";
import type { BlogPost } from "@/app/server/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaClock, FaTag } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePagination } from "@mantine/hooks";
import { useState } from "react";

const FilteredBlogsSection = ({ blogs }: { blogs: BlogPost[] }) => {
  const itemsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const pagination = usePagination({
    total: totalPages,
    initialPage: 1,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    pagination.setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {paginatedBlogs.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/insights/${article.category}/${article.slug}`}>
                <Card className="group h-full border-[#FFD700]/10 bg-black/50 backdrop-blur-sm overflow-hidden">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_API_BASE_URL + article.image ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 ltr:right-4 rtl:left-4">
                      <Badge className="bg-[#FFD700]/20 text-[#FFD700] backdrop-blur-sm">
                        <FaTag className="w-3 h-3 mr-1 flex-shrink-0" />
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-[#FFD700] group-hover:text-[#FFD700]/80 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-zinc-400 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <div className="flex items-center gap-1">
                        <FaClock className="w-4 h-4 flex-shrink-0" />
                        <span>{article.read_time}</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="pt-4 flex items-center text-[#FFD700] group/link">
                      <span className="mr-2">Read More</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      >
                        <FaArrowRight className="w-4 h-4 flex-shrink-0" />
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
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
                  onClick={() => handlePageChange(pageNumber as number)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === pageNumber
                      ? "bg-[#FFD700] text-black"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                  aria-current={currentPage === pageNumber ? "page" : undefined}
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

export default FilteredBlogsSection;
