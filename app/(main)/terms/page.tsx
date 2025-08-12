import { Card } from "@/components/ui/card";
import { MotionClient } from "@/components/ui/MotionClient";
import { ScrollArea } from "@/components/ui/scroll-area";
import { contactInfo, seo } from "@/constants";
import { AlertCircle, FileText, HandshakeIcon, Scale } from "lucide-react";
import { Metadata } from "next";
export const generateMetadata = async (): Promise<Metadata> => {
  const url = `${contactInfo.host}/terms`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo.terms.title,
    description: seo.privacy.title,
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
    },
  };

  return {
    title: {
      default: seo.terms.title,
      template: `%s | ${seo.siteName}`,
    },
    description: seo.privacy.title,
    metadataBase: new URL(contactInfo.host!),
    openGraph: {
      title: seo.terms.title,
      description: seo.privacy.title,
      url,
      siteName: seo.siteName,

      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.terms.title,
      description: seo.privacy.title,
      images: [seo.logoUrl],
    },
    alternates: {
      canonical: url,
      languages: {
        "ar-SA": url,
        "en-US": url,
      },
    },
    other: {
      "application/ld+json": JSON.stringify(structuredData),
    },
  };
};

export default function TermsAndConditions() {
  return (
    <>
      <section className="relative py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

          {/* Animated particles */}
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

        <div className="container mx-auto px-4">
          <MotionClient
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-[#B8860B] to-primary bg-clip-text text-transparent">
              Terms and Conditions
            </h1>
            <p className="text-xl text-zinc-400">
              Please read these terms carefully before using our services
            </p>
          </MotionClient>

          <Card className="relative overflow-hidden border-primary/20 bg-black/50 backdrop-blur-sm">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, rgba(184,134,11,0.03) 1px, transparent 1px), linear-gradient(-45deg, rgba(184,134,11,0.03) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            <ScrollArea className="h-[70vh] relative">
              <div className="p-8 space-y-8">
                {[
                  {
                    icon: <HandshakeIcon className="w-6 h-6" />,
                    title: "Agreement to Terms",
                    content: `By accessing or using our services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.

These terms apply to all users, visitors, and others who access or use our services.`,
                  },
                  {
                    icon: <FileText className="w-6 h-6" />,
                    title: "Intellectual Property",
                    content: `All content, features, and functionality of our services, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of Naya and protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

You may not modify, reproduce, distribute, create derivative works or adaptations of, publicly display or in any way exploit any of our content in whole or in part except as expressly authorized by us.`,
                  },
                  {
                    icon: <Scale className="w-6 h-6" />,
                    title: "Service Terms",
                    content: `We reserve the right to:
• Modify or withdraw our services without notice
• Refuse service to anyone for any reason
• Change our prices and payment terms at any time
• Terminate accounts that violate these terms

Project timelines, deliverables, and specifications will be outlined in separate agreements specific to each engagement.`,
                  },
                  {
                    icon: <AlertCircle className="w-6 h-6" />,
                    title: "Limitations and Liability",
                    content: `We will not be liable for:
• Any indirect, incidental, special, consequential or punitive damages
• Any loss of profits, revenue, data, or business opportunities
• Any damages resulting from interruption of service
• Any damages resulting from unauthorized access to our services

Our total liability for any claim arising from or relating to these terms or our services shall not exceed the amount paid by you for the services giving rise to the claim.`,
                  },
                ].map((section, index) => (
                  <MotionClient
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        {section.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-primary">
                        {section.title}
                      </h2>
                    </div>
                    <div className="pl-16 text-zinc-300 whitespace-pre-line">
                      {section.content}
                    </div>
                  </MotionClient>
                ))}

                <MotionClient
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Contact Information
                  </h2>
                  <p className="text-zinc-300">
                    Questions about the Terms and Conditions should be sent to
                    us at:
                    <br />
                    Email: legal@naya.nawar.site
                    <br />
                    Address: 123 Innovation Street, Tech City, TC 12345
                  </p>
                </MotionClient>

                <MotionClient
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-sm text-zinc-400"
                >
                  Last updated: January 15, 2024
                </MotionClient>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </section>
    </>
  );
}
