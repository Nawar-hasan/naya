import { Card } from "@/components/ui/card";
import { MotionClient } from "@/components/ui/MotionClient";
import { Heart, Lightbulb, Target, Users } from "lucide-react";

const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Passion",
    description:
      "We pour our heart into every project, driven by the love for creating exceptional digital experiences.",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Innovation",
    description:
      "Constantly pushing boundaries and exploring new technologies to deliver cutting-edge solutions.",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Excellence",
    description:
      "Committed to delivering the highest quality in everything we do, exceeding expectations.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Collaboration",
    description:
      "Working together with our clients and team members to achieve remarkable results.",
  },
];

export default function ValuesSection() {
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-[#B8860B] to-primary bg-clip-text text-transparent">
            Our Values
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            The principles that guide our work and relationships
          </p>
        </MotionClient>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <MotionClient
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="relative h-full overflow-hidden border-primary/20 bg-black/50 backdrop-blur-sm p-8">
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                </div>

                <div className="relative space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {value.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-primary">
                    {value.title}
                  </h3>

                  <p className="text-zinc-400">{value.description}</p>
                </div>

                {/* Decorative Corner Lines */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-primary to-transparent"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-primary to-transparent"></div>
                </div>
              </Card>
            </MotionClient>
          ))}
        </div>
      </div>
    </section>
  );
}
