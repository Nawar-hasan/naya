import { Card } from "@/components/ui/card";
import { MotionClient } from "@/components/ui/MotionClient";
import { ScrollArea } from "@/components/ui/scroll-area";
import { contactInfo, seo } from "@/constants";
import { Eye, FileCheck, Lock, Shield } from "lucide-react";
import { Metadata } from "next";
export const generateMetadata = async (): Promise<Metadata> => {
  const url = `${contactInfo.host}/privacy`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo.privacy.title,
    description: seo.privacy.description,
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
      default: seo.privacy.title,
      template: `%s | ${seo.siteName}`,
    },
    description: seo.privacy.description,
    metadataBase: new URL(contactInfo.host!),
    openGraph: {
      title: seo.privacy.title,
      description: seo.privacy.description,
      url,
      siteName: seo.siteName,

      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.privacy.title,
      description: seo.privacy.description,
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

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-zinc-400">
              Your privacy is important to us. Learn how we collect, use, and
              protect your information.
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
                    icon: <Shield className="w-6 h-6" />,
                    title: "Information We Collect",
                    content: `We collect information that you provide directly to us, including:
                    • Personal information (name, email address, phone number)
                    • Company information
                    • Project requirements and preferences
                    • Communication history
                    • Technical information about your device and internet connection`,
                  },
                  {
                    icon: <Lock className="w-6 h-6" />,
                    title: "How We Protect Your Data",
                    content: `We implement appropriate technical and organizational security measures to protect your personal information, including:
                    • Encryption of sensitive data
                    • Regular security assessments
                    • Access controls and authentication
                    • Secure data storage
                    • Regular security updates and monitoring`,
                  },
                  {
                    icon: <Eye className="w-6 h-6" />,
                    title: "How We Use Your Information",
                    content: `We use the collected information for:
                    • Providing our services
                    • Communicating with you about your projects
                    • Improving our services
                    • Sending relevant updates and marketing communications
                    • Complying with legal obligations`,
                  },
                  {
                    icon: <FileCheck className="w-6 h-6" />,
                    title: "Your Rights",
                    content: `You have the right to:
                    • Access your personal information
                    • Request corrections to your data
                    • Request deletion of your data
                    • Object to processing of your data
                    • Data portability
                    • Withdraw consent at any time`,
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
                    Contact Us
                  </h2>
                  <p className="text-zinc-300">
                    If you have any questions about this Privacy Policy, please
                    contact us at:
                    <br />
                    Email: privacy@goldenroots.com
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
