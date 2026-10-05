import { Avatar } from "./Avatar";
import { IconVerifiedBadge } from "@/components/icons/reviews";

export type Review = {
  quote: string;
  /** Omitted while the copy is still outstanding — see UserReviews. */
  author?: { name: string; role: string; avatar?: string };
};

/** Review card — Figma node 1183:10365, 300px wide. */
export function ReviewCard({ quote, author }: Review) {
  return (
    <article className="relative flex h-full w-[300px] flex-col items-center justify-center gap-[0.625rem] rounded-xl bg-linear-to-r/srgb from-brand-blue-50 to-brand-blue-25 px-xl pt-[37px] pb-3xl">
      {/* Figma sets this glyph's box to 30x35.783 at top -3.86 while its own
          line box is 80px tall, so the quote deliberately overflows upward
          and the ink lands just inside the card. Reproduced as given. */}
      <span
        aria-hidden
        className="absolute top-[-3.86px] left-xl h-[35.783px] w-[30px] font-bold text-[59.208px]/[1.35] text-brand-blue-700/30"
      >
        &ldquo;
      </span>

      <p className="m-title-m-medium w-full text-textcolor-grey-900-primary">
        {quote}
      </p>

      {author && (
        <div className="relative flex w-full items-center gap-lg">
          <Avatar size={40} />
          {/* min-w-0 lets the truncation Figma specifies actually happen —
              without it the flex item refuses to shrink below its content. */}
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <p className="m-title-s-semibold truncate text-textcolor-grey-900-primary">
              {author.name}
            </p>
            <p className="m-body-s-regular truncate text-textcolor-grey-700-secondary">
              {author.role}
            </p>
          </div>
          {/* Sits over the avatar's lower-right, overflowing the 40px row by
              4px, exactly as Figma positions it. */}
          <IconVerifiedBadge
            label="Verified member"
            className="absolute top-[28px] left-[25px] size-4"
          />
        </div>
      )}
    </article>
  );
}
