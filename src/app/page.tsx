import { BrowseByBrands } from "@/components/site/BrowseByBrands";
import { Faq } from "@/components/site/Faq";
import { FeaturedPrograms } from "@/components/site/FeaturedPrograms";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedPrograms />
        <BrowseByBrands />
        <HowItWorks />
        <Faq />
        {/* Sections get added here one at a time, in Figma order.
            Nothing is designed until the Figma frame specifies it. */}
      </main>
    </>
  );
}
