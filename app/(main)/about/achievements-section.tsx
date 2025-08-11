import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MotionClient } from "@/components/ui/MotionClient";
import { Briefcase, Gem, Globe2, Trophy } from "lucide-react";

const achievements = [
  {
    category: "Global Recognition",
    icon: Globe2,
    items: [
      {
        title: "Industry Leader",
        description: "Recognized by Gartner as a Leader in Digital Innovation",
        year: "2023",
      },
      {
        title: "Forbes Recognition",
        description: "Listed among Top 50 Tech Companies to Watch",
        year: "2023",
      },
    ],
  },
  {
    category: "Excellence Awards",
    icon: Trophy,
    items: [
      {
        title: "Best Digital Solutions",
        description: "Awarded for Excellence in Digital Transformation",
        year: "2023",
      },
      {
        title: "Innovation Award",
        description: "Recognition for Breakthrough Technology Solutions",
        year: "2022",
      },
    ],
  },
  {
    category: "Client Success",
    icon: Briefcase,
    items: [
      {
        title: "Enterprise Solutions",
        description: "Successfully delivered 500+ enterprise projects",
        year: "2023",
      },
      {
        title: "Client Satisfaction",
        description: "Maintained 98% client satisfaction rate",
        year: "2023",
      },
    ],
  },
  {
    category: "Company Growth",
    icon: Gem,
    items: [
      {
        title: "Global Expansion",
        description: "Established presence in 15+ countries",
        year: "2023",
      },
      {
        title: "Team Growth",
        description: "Expanded to 250+ skilled professionals",
        year: "2023",
      },
    ],
  },
];

const metrics = [
  { value: 500, label: "Enterprise Clients", prefix: "", suffix: "+" },
  { value: 98, label: "Client Satisfaction", prefix: "", suffix: "%" },
  { value: 15, label: "Global Offices", prefix: "", suffix: "+" },
  { value: 250, label: "Team Members", prefix: "", suffix: "+" },
];

export default function AchievementsSection() {
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <div className="container mx-auto px-4 relative">
        <MotionClient
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="bg-primary/20 text-primary px-4 py-2 text-sm mb-6">
            Excellence & Recognition
          </Badge>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-[#B8860B] to-primary bg-clip-text text-transparent">
            Our Achievements
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A testament to our commitment to excellence and innovation in
            digital solutions
          </p>
        </MotionClient>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <MotionClient
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="border-primary/10 bg-black/30 backdrop-blur-sm p-6 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative space-y-2 text-center">
                  <MotionClient
                    // initial={{ value: 0 }}
                    // whileInView={{ value: metric.value }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-4xl lg:text-5xl font-bold text-primary"
                  >
                    {metric.prefix}
                    {metric.value}
                    {metric.suffix}
                  </MotionClient>
                  <div className="text-sm text-zinc-400 font-medium">
                    {metric.label}
                  </div>
                </div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              </Card>
            </MotionClient>
          ))}
        </div>

        {/* Achievement Categories */}
        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((category, index) => (
            <MotionClient
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-primary/10 bg-black/30 backdrop-blur-sm p-8 h-full relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {category.category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <MotionClient
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: (index * 2 + itemIndex) * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="relative pl-6"
                      >
                        <div className="absolute left-0 top-[10px] w-1.5 h-1.5 rounded-full bg-primary" />
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-primary">
                              {item.title}
                            </h4>
                            <span className="text-sm text-zinc-500">
                              {item.year}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-400">
                            {item.description}
                          </p>
                        </div>
                      </MotionClient>
                    ))}
                  </div>
                </div>

                {/* Decorative corner lines */}
                <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 to-transparent" />
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-primary/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-primary/20 to-transparent" />
                  <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              </Card>
            </MotionClient>
          ))}
        </div>
      </div>
    </section>
  );
}
