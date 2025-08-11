import {
  getAllServices,
  getRelatedProjects,
  getServiceBySlug,
} from "@/app/server/actions";
import { Button } from "@/components/ui/button";
import { MotionClient } from "@/components/ui/MotionClient";
import { contactInfo } from "@/constants";
import { ArrowRight, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RelatedServices from "./components/RelatedServices";
export const generateStaticParams = async () => {
  const services = await getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
};
export default async function ServicePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(slug);
  if (!service) {
    notFound();
  }
  const relatedServices = await getRelatedProjects(`${service.id}`);

  return (
    <>
      {/* Hero Section with Diagonal Split */}
      <section className="relative min-h-screen      pt-10 overflow-hidden">
        {/* Background Image with Parallax */}
        <MotionClient className="absolute inset-0 z-0">
          <Image
            src={
              process.env.NEXT_PUBLIC_API_BASE_URL + service.image ||
              "/placeholder.svg"
            }
            alt={`${service.title} name`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-transparent" />
        </MotionClient>

        {/* Diagonal Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            clipPath: "polygon(0 0, 100% 0, 65% 100%, 0 100%)",
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="min-h-[90vh] flex items-center">
            <div className="max-w-2xl space-y-8">
              {/* Service Icon */}
              <MotionClient
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative inline-block"
              >
                <MotionClient
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
                />
                <div className="relative bg-black/50 p-2 md:p-6 rounded-2xl border border-primary/20">
                  <Code2 className=" text-primary size-5" />
                </div>
              </MotionClient>

              {/* Title */}
              <MotionClient
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-7xl font-bold"
                asChild
              >
                <h1>
                  <span className="bg-gradient-to-r from-primary via-[#B8860B] to-primary bg-clip-text text-transparent">
                    {service.title}
                  </span>
                </h1>
              </MotionClient>

              {/* Description */}
              <MotionClient
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                asChild
                className="md:text-xl text-zinc-300 leading-relaxed"
              >
                <p>{service.description}</p>
              </MotionClient>

              {/* CTA Button */}
              <MotionClient
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <a
                  href={`https://wa.me/${contactInfo.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Start your project via WhatsApp"
                >
                  <MotionClient
                    whileHover={{ scale: 1.05 }}
                    className="relative inline-block group"
                  >
                    <div className="absolute inset-0 bg-primary rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <Button
                      size="lg"
                      className="relative px-6 py-3 bg-primary text-black rounded-lg text-lg font-bold tracking-wide hover:bg-primary transition-all duration-300"
                    >
                      <span className="relative flex items-center gap-3">
                        Start Your Project
                        <MotionClient
                          animate={{
                            x: [0, 4, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                        </MotionClient>
                      </span>
                    </Button>
                  </MotionClient>
                </a>
              </MotionClient>
            </div>
          </div>
        </div>

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <MotionClient
            key={i}
            className="absolute w-1 h-1 bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </section>

      {/* Features Section with 3D Cards */}
      <section className="py-8 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service?.features?.map((feature, index) => (
              <MotionClient
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                className="group perspective"
              >
                <div className="relative p-8 bg-black/50 backdrop-blur-sm border border-primary/20 rounded-xl overflow-hidden transform transition-transform duration-500 hover:rotate-y-12">
                  {/* Animated Background */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <MotionClient
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(45deg, transparent, rgba(218,165,32,0.1), transparent)",
                        backgroundSize: "200% 200%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-primary mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400">
                      {service.features[index].description}
                    </p>
                  </div>

                  {/* Corner Decorations */}
                  <div className="absolute top-0 left-0 size-8 md:size-16">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                    <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-primary to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 size-8 md:size-16">
                    <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-primary to-transparent"></div>
                    <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-primary to-transparent"></div>
                  </div>
                </div>
              </MotionClient>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section with Floating Badges */}
      <section className="py-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        </div>

        <div className="container mx-auto px-4 relative">
          <MotionClient
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-[#B8860B] to-primary bg-clip-text text-transparent">
              Technologies We Use
            </h2>
            <p className="text-xl text-zinc-400">
              We leverage cutting-edge technologies to deliver exceptional
              results
            </p>
          </MotionClient>

          <div className="relative  w-[90%] h-[40vh]">
            {service.technologies?.map((tech, index) => (
              <MotionClient
                key={tech.id}
                className="absolute"
                style={{
                  left: `${(index * 20) % 100}%`,
                  top: `${Math.sin(index) * 20 + 50}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <MotionClient
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20"
                >
                  <span className="text-primary font-semibold">
                    {tech.name}
                  </span>
                </MotionClient>
              </MotionClient>
            ))}
          </div>
          <div className="container mx-auto px-4 relative">
            <MotionClient
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#FFD700] via-[#B8860B] to-[#FFD700] bg-clip-text text-transparent">
                {service.title} Portfolio
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Explore our latest {service.title} projects and success stories
              </p>
            </MotionClient>

            <RelatedServices services={relatedServices.slice(0, 3)} />
            <MotionClient
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <Link href="/portfolio">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-black hover:opacity-90 transition-all duration-300 px-8 py-6 text-lg font-semibold"
                >
                  View All Projects
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </MotionClient>
          </div>
        </div>
      </section>
    </>
  );
}
