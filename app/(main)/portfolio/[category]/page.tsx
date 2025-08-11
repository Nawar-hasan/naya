import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

import { getAllProjects } from "@/app/server/actions";
import { MotionClient } from "@/components/ui/MotionClient";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import SearchOption from "../SearchOption";
import FilteredPortfolioSection from "../portfolios-section";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  const categories = [
    "All",
    ...new Set(projects.map((art) => encodeURIComponent(art.category))),
  ];
  return categories.map((category) => ({
    category: category,
  }));
}
export default async function PortfolioPage({
  params: { category },
}: {
  params: { category: string };
}) {
  const selectedCategory = decodeURIComponent(category) ?? "All";
  const projects = await getAllProjects();
  const categories = ["All", ...new Set(projects.map((art) => art.category))];

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "All" || project.category === selectedCategory
  );

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-20 flex justify-center items-center   overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative">
          <MotionClient
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-[#B8860B] to-primary bg-clip-text text-transparent">
              {category === "All"
                ? "Our Portfolio"
                : decodeURIComponent(category)}
            </h1>
            <p className="text-xl text-zinc-400 mb-12">
              Discover our latest works and success stories
            </p>
          </MotionClient>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 space-y-8">
        {/* Category Filter */}
        <div className="flex container flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <SearchOption
              isActive={selectedCategory === category}
              key={category}
              category={category}
            />
          ))}
        </div>
        <div className="container mx-auto px-4">
          <FilteredPortfolioSection portfolios={filteredProjects} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-[#B8860B] to-primary bg-clip-text text-transparent">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Let&apos;s create something amazing together
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-black hover:opacity-90 transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-md"
              >
                Get in Touch
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
