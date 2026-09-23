import { FeaturedPrograms } from "@/components/site/FeaturedPrograms";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedPrograms />
        {/* Sections get added here one at a time, in Figma order.
            Nothing is designed until the Figma frame specifies it. */}
      </main>
    </>
  );
}
