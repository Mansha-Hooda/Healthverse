import { Avatar } from "@/components/site/reviews/Avatar";
import { Carousel } from "@/components/site/reviews/Carousel";
import type { ProgramReview } from "@/components/site/programs/catalog";

/** Review card on the details page — Figma node 1163:26371, 300x176. */
function DetailsReviewCard({ body, author }: ProgramReview) {
  return (
    <article className="flex h-full w-[300px] flex-col justify-center gap-xl rounded-xl px-lg py-xl inset-ring-1 inset-ring-gray-light-mode-50">
      {author && (
        <div className="flex w-full items-center gap-lg">
          <Avatar size={48} />
          <div className="flex min-w-0 flex-1 items-start gap-lg">
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="m-title-m-medium truncate text-textcolor-grey-900-primary">
                {author.name}
              </p>
              <p className="m-caption-s-regular text-textcolor-grey-700-secondary">
                {author.when}
              </p>
            </div>
            <span className="m-label-s-medium shrink-0 rounded-xs bg-success-50 px-md py-xs text-textcolor-green-700">
              {author.rating}
            </span>
          </div>
        </div>
      )}

      {/* Figma truncates the body in the design and appends a Read More link;
          the ellipsis is part of the copy, so it is left in the data. */}
      <p className="m-body-s-light text-textcolor-grey-900-primary">
        {body}
        {author && (
          <>
            {" "}
            <button type="button" className="m-title-s-medium text-brand-blue-700">
              Read More
            </button>
          </>
        )}
      </p>
    </article>
  );
}

/** User Reviews — Figma node 1163:26368. */
export function DetailsReviews({ reviews }: { reviews: ProgramReview[] }) {
  return (
    <section aria-labelledby="program-reviews" className="flex flex-col gap-xl">
      <h2
        id="program-reviews"
        className="m-title-l-semibold text-textcolor-grey-900-primary"
      >
        User Reviews
      </h2>
      <Carousel
        label="review"
        items={reviews.map((review, i) => (
          <DetailsReviewCard key={i} {...review} />
        ))}
      />
    </section>
  );
}
