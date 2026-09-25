import { CityGate } from "@/components/city/CityGate";
import { BrowseByBrands } from "@/components/site/BrowseByBrands";
import { Faq } from "@/components/site/Faq";
import { FeaturedPrograms } from "@/components/site/FeaturedPrograms";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";

export default function Home() {
  /* CityGate renders the header and the city sheet. The sections below are
     passed as children so they stay server components — only the gate, the
     sheet and the header are sent to the client. */
  return (
    <CityGate>
      <main>
        <Hero />
        <FeaturedPrograms />
        <BrowseByBrands />
        <HowItWorks />
        <Faq />
      </main>
      <Footer />
    </CityGate>
  );
}
