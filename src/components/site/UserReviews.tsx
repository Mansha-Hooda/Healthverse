import { Carousel } from "@/components/site/reviews/Carousel";
import { ReviewCard, type Review } from "@/components/site/reviews/ReviewCard";

/**
 * PLACEHOLDER COPY.
 *
 * Figma (1050:6778) draws two cards carrying the same quote from the same
 * person, and a pagination row of four dots — so four reviews are intended
 * but only one has been written. The first entry below is that review,
 * verbatim. The rest are deliberately left without a quote or an author
 * rather than filled with invented ones: a fabricated testimonial attributed
 * to a made-up person is not a placeholder, it is a false claim about a real
 * product. Replace them with the real copy before launch.
 */
const REVIEWS: Review[] = [
  {
    quote:
      "I had put off joining a gym for a year. The plan was cheaper through work and I was training within a day.",
    author: {
      name: "Supriya Rathi",
      role: "Product Analyst, Bengaluru",
    },
  },
  { quote: "[Review copy pending]" },
  { quote: "[Review copy pending]" },
  { quote: "[Review copy pending]" },
];

/** User reviews — Figma node 1050:6778 (named "partners" in the file). */
export function UserReviews() {
  return (
    <section
      aria-labelledby="user-reviews"
      className="flex flex-col gap-xl pt-4xl"
    >
      <h2
        id="user-reviews"
        className="m-title-l-semibold text-textcolor-grey-900-primary"
      >
        What Other Users Have to Say
      </h2>
      <Carousel
        label="review"
        items={REVIEWS.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      />
    </section>
  );
}
