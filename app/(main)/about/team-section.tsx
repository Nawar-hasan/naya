"use client";

import { TeamMember } from "@/app/server/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function TeamSection({
  teamMembers: team = [],
}: {
  teamMembers: TeamMember[];
}) {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-[#B8860B] to-primary bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            The creative minds and technical experts behind our success
          </p>
        </motion.div>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team?.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredMember(member.name)}
              onHoverEnd={() => setHoveredMember(null)}
            >
              <Card className="relative aspect-[318/389.78] mx-auto h-full max-h-[389.78px]  overflow-hidden border-primary/20 bg-black/50 backdrop-blur-sm group">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden ">
                  <motion.div
                    animate={{
                      scale: hoveredMember === member.name ? 1.1 : 1,
                      rotateZ: hoveredMember === member.name ? 5 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="relative size-full "
                  >
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_API_BASE_URL! + member.image ||
                        "/placeholder.svg"
                      }
                      alt={member.name}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </motion.div>

                  {/* Role Badge */}
                  <motion.div
                    animate={{
                      y: hoveredMember === member.name ? -60 : 0,
                      opacity: hoveredMember === member.name ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 right-4"
                  >
                    <Badge className="bg-primary/20 text-primary backdrop-blur-sm">
                      {member.role}
                    </Badge>
                  </motion.div>

                  {/* Social Links */}
                  {/* <motion.div
                    initial={false}
                    animate={{
                      y: hoveredMember === member.name ? 0 : 60,
                      opacity: hoveredMember === member.name ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 right-4 flex gap-2"
                  >
                    {Object.entries(member.).map(([platform, url]) => (
                      <Link
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="p-2 rounded-full bg-primary/20 text-primary backdrop-blur-sm"
                        >
                          {platform === "github" && (
                            <Github className="w-4 h-4" />
                          )}
                          {platform === "linkedin" && (
                            <Linkedin className="w-4 h-4" />
                          )}
                          {platform === "twitter" && (
                            <Twitter className="w-4 h-4" />
                          )}
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div> */}
                </div>

                {/* Content */}
                <div className="p-6 space-y-2">
                  <motion.h3
                    animate={{
                      scale: hoveredMember === member.name ? 1.1 : 1,
                      x: hoveredMember === member.name ? 10 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-primary"
                  >
                    {member.name}
                  </motion.h3>

                  <motion.p
                    animate={{
                      opacity: hoveredMember === member.name ? 0.7 : 1,
                      x: hoveredMember === member.name ? 5 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-zinc-400"
                  >
                    {member.bio}
                  </motion.p>
                </div>

                {/* Decorative Corner Lines */}
                <motion.div
                  initial={false}
                  animate={{
                    pathLength: hoveredMember === member.name ? 1 : 0,
                    opacity: hoveredMember === member.name ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {/* Top Left Corner */}
                  <svg
                    className="absolute top-0 left-0 w-8 h-8"
                    viewBox="0 0 8 8"
                  >
                    <motion.path
                      d="M 0 8 L 0 0 L 8 0"
                      stroke="#FFD700"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>

                  {/* bottom Right Corner */}
                  <svg
                    className="absolute bottom-0 right-0 w-8 h-8"
                    viewBox="0 0 8 8"
                  >
                    <motion.path
                      d="M 8 0 L 8 8 L 0 8"
                      stroke="#FFD700"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>

                  {/* Bottom Left Corner */}
                  <svg
                    className="absolute bottom-0 left-0 w-8 h-8"
                    viewBox="0 0 8 8"
                  >
                    <motion.path
                      d="M 0 0 L 0 8 L 8 8"
                      stroke="#FFD700"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>

                  {/* Top Right Corner */}
                  <svg
                    className="absolute top-0 right-0 w-8 h-8"
                    viewBox="0 0 8 8"
                  >
                    <motion.path
                      d="M 8 8 L 8 0 L 0 0"
                      stroke="#FFD700"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
