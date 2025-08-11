import { ScrollArea } from "@/components/ui/scroll-area";
import "./../styles/globals.css";

import { Toaster } from "@/components/ui/toaster";
import { contactInfo, navItems, seo } from "@/constants";
import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import { TankStackContext } from "./contexts/TankStackContext";
import { getAllServices } from "./server/actions";
const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["cyrillic"],
});
export async function generateStaticParams() {
  return [];
}

export const generateMetadata = async (): Promise<Metadata> => {
  const services = await getAllServices(); // Fetch services dynamically

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo.siteName,
    url: contactInfo.host,
    description: seo.home.description,
    logo: seo.logoUrl,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: contactInfo.host,
        },
        ...navItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: item.label,
          item: `${contactInfo.host}${item.href}`,
        })),
      ],
    },
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
    itemList: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        description: service.description,
        url: `${contactInfo.host}/services/${service.slug}`,
      })),
    },
  };

  return {
    title: {
      default: seo.siteName,
      template: `%s | ${seo.siteName}`,
    },
    description: seo.home.description,
    metadataBase: new URL(contactInfo.host!),
    openGraph: {
      title: seo.siteName,
      description: seo.home.description,
      url: contactInfo.host,
      siteName: seo.siteName,
      images: [
        {
          url: `${contactInfo.host}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `${seo.siteName} Logo`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.siteName,
      description: seo.home.description,
      images: [seo.logoUrl],
    },
    alternates: {
      languages: {
        "ar-SA": contactInfo.host, // Arabic language alternate
        "en-US": contactInfo.host, // English language alternate
      },
      canonical: contactInfo.host,
    },
    keywords: seo.home.keywords,
    other: {
      "application/ld+json": JSON.stringify(structuredData),
    },
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <meta name="apple-mobile-web-app-title" content="Naya" />
      <body className={ptSerif.className}>
        <TankStackContext>
          <ScrollArea className="h-screen  ">{children}</ScrollArea>
        </TankStackContext>
        <Toaster />
      </body>
    </html>
  );
}
