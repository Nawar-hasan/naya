import { Card } from "@/components/ui/card";
import { MotionClient } from "@/components/ui/MotionClient";
import { contactInfo, seo } from "@/constants";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import ContactForm from "./components/contact-form";
export const generateMetadata = async (): Promise<Metadata> => {
  const url = `${contactInfo.host}/contact`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: seo.contact.title,
    description: seo.contact.description,
    url,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contactInfo.phone,
      contactType: "Customer Service",
      areaServed: ["AE"], // UAE
      availableLanguage: ["Arabic", "English"],
      email: contactInfo.email,
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
  };

  return {
    title: {
      default: seo.contact.title,
      template: `%s | ${seo.siteName}`,
    },
    description: seo.contact.description,
    metadataBase: new URL(contactInfo.host!),
    openGraph: {
      title: seo.contact.title,
      description: seo.contact.description,
      url,
      siteName: seo.siteName,

      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.contact.title,
      description: seo.contact.description,
      images: [seo.logoUrl],
    },
    alternates: {
      canonical: url,
      languages: {
        "ar-SA": url,
        "en-US": url,
      },
    },
    keywords: seo.contact.keywords,
    other: {
      "application/ld+json": JSON.stringify(structuredData),
    },
  };
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 h-screen flex justify-center items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

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
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-[#B8860B] to-primary bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-zinc-400">
              Let&apos;s discuss your project and create something extraordinary
              together
            </p>
          </MotionClient>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Phone",
                content: "+" + contactInfo.phone,
                link: `tel:+${contactInfo.phone}`,
              },
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Email",
                content: contactInfo.email,
                link: `mailto:${contactInfo.email}`,
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Location",
                content: contactInfo.location,
                link: "#",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Business Hours",
                content: "Mon - Fri: 9AM - 6PM",
                link: "#",
              },
            ].map((item, index) => (
              <MotionClient
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a href={item.link} className="block group h-full">
                  <Card className="relative h-full overflow-hidden border-primary/20 bg-black/50 backdrop-blur-sm p-8 hover:border-primary/50 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative flex flex-col h-full">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary mb-3">
                          {item.title}
                        </h3>
                        <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </Card>
                </a>
              </MotionClient>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />

            {/* Map & Additional Info */}
            <MotionClient
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <Card className="relative overflow-hidden border-primary/20 bg-black/50 backdrop-blur-sm aspect-square">
                <div className="absolute inset-0 bg-primary/5" />
                <iframe
                  src={contactInfo.embeddedMap}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale opacity-70 hover:opacity-100 transition-opacity duration-500"
                />
              </Card>
            </MotionClient>
          </div>
        </div>
      </section>
    </>
  );
}
