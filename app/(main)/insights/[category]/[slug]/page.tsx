import { getAllPosts, getPostBySlug } from "@/app/server/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MotionClient } from "@/components/ui/MotionClient";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "./prose-gold.css";
export const generateStaticParams = async () => {
  const blogs = await getAllPosts();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
};
export default async function ArticlePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const blog = await getPostBySlug(slug);
  if (!blog) {
    notFound();
  }
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <MotionClient className="absolute inset-0">
          <Image
            src={process.env.NEXT_PUBLIC_API_BASE_URL + blog.image}
            alt="AI Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        </MotionClient>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <MotionClient
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center mb-12"
            >
              <MotionClient
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="bg-[#FFD700]/20 text-[#FFD700] px-4 py-2 text-sm">
                  Latest Insights
                </Badge>
              </MotionClient>

              <MotionClient
                asChild
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl  lg:text-6xl font-bold text-white leading-tight"
              >
                <h1>
                  {blog.title}:
                  <MotionClient
                    asChild
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="block text-[#FFD700]"
                  >
                    <span>{blog.excerpt}</span>
                  </MotionClient>
                </h1>
              </MotionClient>

              <MotionClient
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center justify-center gap-6 text-zinc-400 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{blog.read_time} read</span>
                </div>
              </MotionClient>
            </MotionClient>

            {/* Featured Image */}
          </div>
        </div>
      </section>

      {/* Full-width Featured Image */}
      <MotionClient
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        asChild
        className="relative w-full"
      >
        <section>
          <div className="relative aspect-[21/9] w-full">
            <Image
              src={process.env.NEXT_PUBLIC_API_BASE_URL + blog.image}
              alt="AI and Web Development"
              fill
              priority
              className="object-cover"
            />
            <MotionClient
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
            />
          </div>
        </section>
      </MotionClient>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-invert prose-lg prose-gold">
              <MotionClient
                asChild
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-xl text-zinc-300 leading-relaxed"
              >
                <p
                  className=" prose-gold"
                  dangerouslySetInnerHTML={{
                    __html: blog.content,
                  }}
                />
              </MotionClient>

              {/* Call to Action */}
              <MotionClient
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-12 border-t border-[#FFD700]/10 pt-12"
              >
                <Card className="border-[#FFD700]/10 bg-black/50 backdrop-blur-sm p-8 group">
                  <MotionClient
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="text-center flex flex-col gap-6 relative z-10">
                    <h3 className="text-2xl font-bold text-white">
                      Ready to embrace the future?
                    </h3>
                    <p className="text-zinc-400">
                      Start your AI-powered web development journey with us
                      today.
                    </p>
                    <Link href="/start-project">
                      <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 transition-all duration-300 group">
                        Start Your Project
                        <MotionClient
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </MotionClient>
                      </Button>
                    </Link>
                  </div>
                </Card>
              </MotionClient>
            </div>
          </div>

          {/* Related Articles */}
          {/* <MotionClient
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mt-20"
          >
            <h2 className="text-2xl font-bold text-white mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "The Rise of No-Code Platforms",
                  description:
                    "Exploring how no-code solutions are democratizing web development",
                  image:
                    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
                },
                {
                  title: "Web3 and the Future of the Internet",
                  description:
                    "Understanding the impact of blockchain on web development",
                  image:
                    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
                },
              ].map((article, index) => (
                <MotionClient
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href="#">
                    <Card className="group border-[#FFD700]/10 bg-black/50 backdrop-blur-sm overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-[#FFD700] group-hover:underline">
                          {article.title}
                        </h3>
                        <p className="text-zinc-400 mt-2 text-sm">
                          {article.description}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </MotionClient>
              ))}
            </div>
          </MotionClient> */}
        </div>
      </section>
    </>
  );
}
