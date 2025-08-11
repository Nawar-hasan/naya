import HeroSection from "@/components/hero-section";
import ServicesCarousel from "@/components/services-carousel";
import WhyUsSection from "@/components/why-us-section";
import { getAllServices } from "../server/actions";

export default async function Home() {
  const services = await getAllServices();

  return (
    <>
      <HeroSection />
      <ServicesCarousel services={services} />
      <WhyUsSection />
    </>
  );
}
