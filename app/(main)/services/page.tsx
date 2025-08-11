import AnimatedServicesBackground from "@/components/animated-services-background";
import GoldenWaveSection from "@/components/golden-wave-section";
import { MotionClient } from "@/components/ui/MotionClient";
import ServicesCard from "./components/ServicesCard";
import {
  getAllProjects,
  getAllServices,
  getAllTeamMembers,
} from "@/app/server/actions";
import { contactInfo, seo } from "@/constants";
import { Metadata } from "next";
export const generateMetadata = async (): Promise<Metadata> => {
  // Dynamically fetch the list of services.
  const services = await getAllServices();

  const url = `${contactInfo.host}/services`;

  // Build structured data using the ItemList schema to represent the services.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: seo.services.title,
    description: seo.services.description,
    url,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title, // Ensure service.title exists in your service objects
      description: service.description, // Ensure service.description exists in your service objects
      url: `${contactInfo.host}/services/${service.slug}`, // Ensure service.slug is available
    })),
  };
  const servicesKeywords = [
    ...new Set(
      ...services.map((service) => service.title),
      ...seo.services.keywords
    ),
  ];
  return {
    title: {
      default: seo.services.title,
      template: `%s | ${seo.siteName}`,
    },
    description: seo.services.description,
    metadataBase: new URL(contactInfo.host!),
    openGraph: {
      title: seo.services.title,
      description: seo.services.description,
      url,
      siteName: seo.siteName,

      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.services.title,
      description: seo.services.description,
      images: [seo.logoUrl],
    },
    alternates: {
      canonical: url,
      languages: {
        "ar-SA": url,
        "en-US": url,
      },
    },
    keywords: servicesKeywords,
    other: {
      "application/ld+json": JSON.stringify(structuredData),
    },
  };
};

export default async function ServicesPage() {
  const services = await getAllServices();
  const teamMembers = await getAllTeamMembers();
  const projects = await getAllProjects();
  const numberOfProject = projects.length || 0;
  const numberOfMember = teamMembers.length || 0;
  const numberOfServices = services.length || 0;
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 h-screen flex justify-center items-center">
        <AnimatedServicesBackground />
        <div className="container isolate mx-auto px-4 relative ">
          <MotionClient
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <MotionClient
              asChild
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: [0, 10, 0, -10, 0],
                textShadow: [
                  "0 0 0px rgba(218,165,32,0)",
                  "0 0 20px rgba(218,165,32,0.5)",
                  "0 0 0px rgba(218,165,32,0)",
                  "0 0 20px rgba(218,165,32,0.5)",
                  "0 0 0px rgba(218,165,32,0)",
                ],
              }}
              transition={{
                duration: 0.8,
                textShadow: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotateX: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent gold-shimmer-text"
            >
              <h2>Our Services</h2>
            </MotionClient>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Comprehensive solutions for your digital success
            </p>
          </MotionClient>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative px-4 py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-20">
            {services.map((service, index) => (
              <ServicesCard service={service} key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* New Golden Wave Section */}
      <GoldenWaveSection
        numberOfProject={numberOfProject}
        numberOfMember={numberOfMember}
        numberOfServices={numberOfServices}
      />
    </>
  );
}
