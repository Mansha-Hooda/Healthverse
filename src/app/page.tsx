import { CityGate } from "@/components/city/CityGate";
import { BrowseByBrands } from "@/components/site/BrowseByBrands";
import { Faq } from "@/components/site/Faq";
import { FeaturedPrograms } from "@/components/site/FeaturedPrograms";
import { Footer } from "@/components/site/Footer";
import { TrackStrip } from "@/components/order/TrackStrip";
import { HowItWorks } from "@/components/site/HowItWorks";
import { UserReviews } from "@/components/site/UserReviews";

export default function Home() {
  /* CityGate renders the header and the city sheet. The sections below are
     passed as children so they stay server components — only the gate, the
     sheet and the header are sent to the client. */
  return (
    <CityGate>
      {/* The page gutter lives here, once, rather than on each section. The
          animated header and the footer are deliberately outside it: both are
          full-bleed blocks whose artwork runs to the edge of the frame. */}
      <main className="px-xl">
        <FeaturedPrograms />
        <UserReviews />
        <BrowseByBrands />
        <HowItWorks />
        <Faq />
      </main>
      <Footer />
      {/* Shown only once an order exists. */}
      <TrackStrip />
    </CityGate>
  );
}
