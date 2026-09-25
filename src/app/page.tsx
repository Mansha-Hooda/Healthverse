import { BrowseByBrands } from "@/components/site/BrowseByBrands";
import { Faq } from "@/components/site/Faq";
import { FeaturedPrograms } from "@/components/site/FeaturedPrograms";
import { Footer } from "@/components/site/Footer";
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
      </main>
      <Footer />
    </>
  );
}
