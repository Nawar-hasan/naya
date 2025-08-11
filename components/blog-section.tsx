import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/app/server/actions";

export default async function BlogSection() {
  const blogs = await getAllPosts();
  const blogPosts = blogs.slice(0, 3);
  return (
    <section className="py-8 md:py-8  relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-[#DAA520] opacity-20 blur-lg" />
            <h2 className="relative md:py-2 text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-[#DAA520] to-primary bg-clip-text text-transparent">
              Latest Insights
            </h2>
          </div>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto px-4">
            Explore our latest thoughts and insights on technology, design, and
            digital innovation
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.title}
              href={`/insights/${post.category}/${post.slug}`}
            >
              <Card className="bg-black/60 border border-primary/20 backdrop-blur-md relative overflow-hidden h-full min-h-[28rem] sm:min-h-[32rem]">
                {/* Decorative corner lines */}
                <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-primary to-transparent"></div>
                </div>
                <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16">
                  <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-primary to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-12 sm:w-16 h-12 sm:h-16">
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-primary to-transparent"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16">
                  <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-primary to-transparent"></div>
                </div>

                {/* Image Container */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                  <Image
                    src={process.env.NEXT_PUBLIC_API_BASE_URL + post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-2 sm:px-3 py-1 bg-primary text-black text-xs sm:text-sm font-medium rounded-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex flex-col flex-1">
                  <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-[#DAA520] to-primary bg-clip-text text-transparent">
                    {post.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-400 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>
                        {new Date(post.createdAt || "").getDay().toString()}/
                        {new Date(post.createdAt || "").getMonth().toString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{post.read_time}</span>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-primary/10 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 sm:p-2 rounded-full bg-primary/10">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      </div>
                      <p
                        className=" text-white prose-gold line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: post.content,
                        }}
                      />
                    </div>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <Link href="/insights/All">
            <Button className="h-10 sm:h-12 px-6 sm:px-8 bg-primary text-black text-sm sm:text-base">
              <span className="flex items-center gap-2">
                View All Posts
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
