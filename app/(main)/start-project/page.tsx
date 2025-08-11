import { getAllServices } from "@/app/server/actions";
import MotionLink from "@/components/ui/motion-link";
import { MotionClient } from "@/components/ui/MotionClient";
import { contactInfo, seo } from "@/constants";
import { ArrowRight, Code2 } from "lucide-react";
import { Metadata } from "next";
export const generateMetadata = async (): Promise<Metadata> => {
  const url = `${contactInfo.host}/start-project`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo.startProject.title,
    description: seo.startProject.description,
    url,
    potentialAction: {
      "@type": "Action",
      name: "Start a Project",
      target: {
        "@type": "EntryPoint",
        urlTemplate: url,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
    publisher: {
      "@type": "Organization",
      name: seo.siteName,
      url: contactInfo.host,
      logo: seo.logoUrl,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contactInfo.phone,
        contactType: "Customer Service",
        areaServed: ["AE"], // UAE
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
      default: seo.startProject.title,
      template: `%s | ${seo.siteName}`,
    },
    description: seo.startProject.description,
    metadataBase: new URL(contactInfo.host!),
    openGraph: {
      title: seo.startProject.title,
      description: seo.startProject.description,
      url,
      siteName: seo.siteName,

      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.startProject.title,
      description: seo.startProject.description,
      images: [seo.logoUrl],
    },
    alternates: {
      canonical: url,
      languages: {
        "ar-SA": url,
        "en-US": url,
      },
    },
    keywords: seo.startProject.keywords,
    other: {
      "application/ld+json": JSON.stringify(structuredData),
    },
  };
};

export default async function StartProjectPage() {
  const services = await getAllServices();
  return (
    <div className=" relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0  size-full">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-transparent" /> */}

        {/* Interactive particles */}
        {[...Array(30)].map((_, i) => (
          <MotionClient
            key={i}
            className="absolute w-1 h-1 bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [0, 50],
              y: [0, 50],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-20 ">
        <MotionClient
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-[#B8860B] to-primary bg-clip-text text-transparent">
            What type of project are you looking to start?
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <MotionLink
                key={service.title}
                whileHover={{ scale: 1.02 }}
                href={`/services/${service.slug}`}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 bg-black/50 backdrop-blur-sm border border-primary/20 rounded-xl overflow-hidden group-hover:border-primary/50 transition-all duration-500">
                  {/* Service Icon */}
                  <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary relative group-hover:scale-110 transition-transform duration-500">
                      <Code2 className="w-12 h-12 text-[#B8860B]" />
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>

                  {/* Service Details */}
                  <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-white transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500">
                    {service.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </MotionLink>
            ))}
          </div>
        </MotionClient>
      </div>
    </div>
  );
}
