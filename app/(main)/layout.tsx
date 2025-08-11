import { ScrollArea } from "@/components/ui/scroll-area";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { FacebookPixelProvider } from "../contexts/FacebookPixelContextProvider";
import { getAllServices } from "../server/actions";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = await getAllServices();
  return (
    <FacebookPixelProvider>
      <Navigation
        services={services
          .map((service) => ({
            slug: service.slug,
            name: service.title,
            description: service.description,
          }))
          .slice(0, 3)}
      />
      <ScrollArea className="h-screen  ">
        <main className="bg-black text-white pt-9 space-y-8 pb-8">
          {children}
        </main>
        <Footer />
      </ScrollArea>
    </FacebookPixelProvider>
  );
}
