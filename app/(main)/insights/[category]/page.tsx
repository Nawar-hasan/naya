import { getAllPosts } from "@/app/server/actions";
import { MotionClient } from "@/components/ui/MotionClient";
import { getAllDecodedCategories, getAllEncodedCategories } from "@/lib/utils";
import FilteredBlogsSection from "../blogs-section";
import SearchOption from "../SearchOption";
export const generateStaticParams = async () => {
  const articles = await getAllPosts();

  const categories = getAllEncodedCategories(articles);
  return categories.map((category) => ({ category }));
};
export default async function BlogPage({
  params: { category },
}: {
  params: { category: string };
}) {
  const selectedCategory = decodeURIComponent(category) || "All";
  const articles = await getAllPosts();

  const categories = getAllDecodedCategories(articles);
  const searchQuery = "";
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/10 via-transparent to-transparent" />

          {/* Animated particles */}
          {[...Array(20)].map((_, i) => (
            <MotionClient
              key={i}
              className="absolute w-1 h-1 bg-[#FFD700]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative">
          <MotionClient
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Latest <span className="text-[#FFD700]">Insights</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-12">
              Explore our collection of articles on web development, design, and
              technology
            </p>

            {/* Search Bar */}
          </MotionClient>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-y border-[#FFD700]/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <MotionClient
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SearchOption
                  isActive={category === selectedCategory}
                  category={category}
                />
              </MotionClient>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FilteredBlogsSection blogs={filteredArticles} />
          {/* No Results Message */}
          {filteredArticles.length === 0 && (
            <MotionClient
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">
                No articles found
              </h3>
              <p className="text-zinc-400">
                Try adjusting your search or filter criteria
              </p>
            </MotionClient>
          )}
        </div>
      </section>
    </>
  );
}
