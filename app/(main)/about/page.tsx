import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  Code2,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TeamSection from "./team-section";
import ValuesSection from "./values-section";
import {
  getAllProjects,
  getAllServices,
  getAllTeamMembers,
} from "@/app/server/actions";
import { contactInfo, seo } from "@/constants";
import { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamically import AnimatedSection with SSR disabled
const AnimatedSection = dynamic(() => import("../../../components/AnimatedSection"), {
  ssr: false,
});

export const generateMetadata = async (): Promise<Metadata> => {
  const url = `${contactInfo.host}/about`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: seo.about.title,
    description: seo.about.description,
    url,
    publisher: {
      "@type": "Organization",
      name: seo.siteName,
      url: contactInfo.host,
      logo: seo.logoUrl,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contactInfo.phone,
        contactType: "Customer Service",
        areaServed: ["AE"],
        availableLanguage: ["Arabic", "English"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: contactInfo.location,
        addressLocality: "Dubai",
        addressRegion: "Deira",
        addressCountry: "AE",
      },
      sameAs: [
        contactInfo.facebook,
        contactInfo.instagram,
        contactInfo.googleMap,
      ],
    },
  };

  return {
    title: {
      default: seo.about.title,
      template: `%s | ${seo.siteName}`,
    },
    description: seo.about.description,
    metadataBase: new URL(contactInfo.host!),
    openGraph: {
      title: seo.about.title,
      description: seo.about.description,
      url,
      siteName: seo.siteName,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.about.title,
      description: seo.about.description,
      images: [seo.logoUrl],
    },
    alternates: {
      canonical: url,
      languages: {
        "ar-SA": url,
        "en-US": url,
      },
    },
    keywords: seo.about.keywords,
    other: {
      "application/ld+json": JSON.stringify(structuredData),
    },
  };
};

export default async function AboutPage() {
  const teamMembers = await getAllTeamMembers();
  const projects = await getAllProjects();
  const services = await getAllServices();
  const numberOfProject = projects.length || 0;
  const numberOfMember = teamMembers.length || 0;
  const numberOfServices = services.length || 0;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen pt-20 overflow-hidden bg-[#1A3835]">
        {/* Subtle Background Animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#1A3835] animate-pulse opacity-20" />
          <svg
            className="absolute inset-0 opacity-10"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid-pattern"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 15 0 L 15 30 M 0 15 L 30 15"
                  stroke="rgb(188,130,65)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Subtle Constellation Particles */}
        {[...Array(25)].map((_, i) => (
          <AnimatedSection
            key={i}
            className="absolute w-2 h-2 bg-[rgb(188,130,65)] rounded-full shadow-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 0.7 + 0.3,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.5, 0.8, 0.5] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="min-h-[90vh] flex items-center justify-center">
            <AnimatedSection className="max-w-4xl space-y-10 text-center">
              <Badge className="bg-[rgb(188,130,65)]/20 text-[rgb(188,130,65)] px-6 py-3 text-lg font-medium border border-[rgb(188,130,65)]/40 hover:bg-[rgb(188,130,65)]/30 transition-all duration-300 rounded-full">
                Established 2025
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-[rgb(188,130,65)] via-[rgba(236,213,65,0.47)] to-[rgb(188,130,65)] bg-clip-text text-transparent">
                Shaping Digital
                <span className="block mt-2">Masterpieces</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We are a collective of visionary creators, blending cutting-edge technology with artistic precision to craft digital experiences that captivate and inspire.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 pt-12">
                {[
                  {
                    number: "10+",
                    label: "Years of Expertise",
                    icon: Building2,
                  },
                  {
                    number: numberOfMember + "+",
                    label: "Creative Minds",
                    icon: Users,
                  },
                  {
                    number: numberOfProject + "+",
                    label: "Successful Projects",
                    icon: Target,
                  },
                  {
                    number: numberOfServices + "+",
                    label: "Innovative Services",
                    icon: Code2,
                  },
                ].map((stat, index) => (
                  <AnimatedSection
                    key={stat.label}
                    className="text-center group relative"
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="absolute inset-0 bg-[rgb(188,130,65)]/10 rounded-lg blur-md group-hover:bg-[rgb(188,130,65)]/20 transition-all duration-300" />
                    <div className="relative flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-[rgb(50,70,63)]/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                        <stat.icon className="w-8 h-8 text-[rgb(188,130,65)]" />
                      </div>
                      <div className="text-3xl font-bold text-[rgb(188,130,65)] mt-4">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative min-h-screen bg-[#1A3835] overflow-hidden">
        {/* Subtle Background Animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#1A3835] animate-pulse opacity-20" />
          <svg
            className="absolute inset-0 opacity-15"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="wave-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 20 Q10 10 20 20 T40 20"
                  fill="none"
                  stroke="rgb(188,130,65)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)" />
          </svg>
        </div>

        {/* Subtle Constellation Particles */}
        {[...Array(20)].map((_, i) => (
          <AnimatedSection
            key={i}
            className="absolute w-2 h-2 bg-[rgb(188,130,65)] rounded-full shadow-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 0.6 + 0.4,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.4, 0.8, 0.4] }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="space-y-12">
              {/* Section Header */}
              <div className="text-center space-y-6 pt-12">
                <AnimatedSection
                  className="inline-flex items-center justify-center gap-4"
                  transition={{ duration: 0.6 }}
                >
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-[rgb(188,130,65)] to-transparent" />
                  <Badge className="bg-[rgb(188,130,65)]/20 text-[rgb(188,130,65)] border border-[rgb(188,130,65)]/40 px-6 py-3 text-base uppercase tracking-widest hover:bg-[rgb(188,130,65)]/30 transition-all duration-300 rounded-full">
                    Our Vision
                  </Badge>
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-[rgb(188,130,65)] to-transparent" />
                </AnimatedSection>

                <AnimatedSection
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[rgb(188,130,65)] via-[rgba(236,213,65,0.47)] to-[rgb(188,130,65)] bg-clip-text text-transparent">
                    Our Mission
                  </h2>
                </AnimatedSection>
              </div>

              {/* Mission Content */}
              <Card className="relative overflow-hidden border border-[rgb(188,130,65)]/30 bg-[rgb(50,70,63)]/50 backdrop-blur-xl group hover:border-[rgb(188,130,65)]/50 transition-all duration-500">
                <div className="absolute inset-0 bg-[rgb(50,70,63)]/10 animate-pulse opacity-20" />
                <div className="relative p-10 md:p-16 group-hover:scale-[1.01] transition-transform duration-500">
                  <AnimatedSection
                    className="flex items-start gap-8"
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="hidden md:flex shrink-0 w-16 h-16 rounded-full bg-[rgb(50,70,63)]/20 items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Sparkles className="w-8 h-8 text-[rgb(188,130,65)]" />
                    </div>

                    <div className="space-y-8 w-full">
                      <p className="text-3xl md:text-4xl text-gray-200 leading-relaxed font-light">
                        "Empowering businesses with transformative digital solutions, crafting experiences that spark growth and inspire innovation."
                      </p>

                      <div className="grid md:grid-cols-3 gap-8 pt-10">
                        {[
                          {
                            title: "Innovation",
                            description: "Pioneering bold, forward-thinking solutions",
                          },
                          {
                            title: "Excellence",
                            description: "Delivering unparalleled quality and precision",
                          },
                          {
                            title: "Impact",
                            description: "Driving meaningful change for our clients",
                          },
                        ].map((item, index) => (
                          <AnimatedSection
                            key={item.title}
                            className="relative group/item"
                            transition={{
                              duration: 0.6,
                              delay: 0.4 + index * 0.2,
                            }}
                          >
                            <div className="absolute top-0 left-0 w-12 h-12">
                              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[rgb(188,130,65)]/30 to-transparent" />
                              <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-[rgba(236,213,65,0.47)]/30 to-transparent" />
                            </div>
                            <div className="p-6 bg-[rgb(50,70,63)]/30 rounded-xl border border-[rgb(188,130,65)]/20 group-hover/item:border-[rgb(188,130,65)]/30 group-hover/item:shadow-lg transition-all duration-300">
                              <h3 className="text-xl font-semibold text-[rgb(188,130,65)] mb-3">
                                {item.title}
                              </h3>
                              <p className="text-gray-400 text-sm">
                                {item.description}
                              </p>
                            </div>
                          </AnimatedSection>
                        ))}
                      </div>

                      <div className="pt-10 flex justify-center">
                        <Link href="/contact">
                          <Button
                            size="lg"
                            className="relative group overflow-hidden bg-[rgb(188,130,65)] hover:bg-[rgba(236,213,65,0.47)] text-white border-none px-10 py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <span className="relative z-10 flex items-center gap-3 text-lg font-semibold">
                              Join Our Journey
                              <ArrowRight className="w-6 h-6 transition-transform duration-300 transform group-hover:translate-x-2" />
                            </span>
                            <div className="absolute inset-0 bg-[rgba(236,213,65,0.47)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}