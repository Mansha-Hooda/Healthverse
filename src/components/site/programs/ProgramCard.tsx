import Image from "next/image";
import Link from "next/link";
import { IconArrowRight01 } from "@/components/icons/programs";

/** The tag strip's two colourways, from Figma's `M-Cart Page Tags` variants. */
const HIGHLIGHT_TONES = {
  purple: "bg-purple-50 text-purple-600",
  orange: "bg-warning-50 text-orange-600",
} as const;

export type ProgramCardProps = {
  /** Pre-rendered banner exported from Figma. The partner logo, tier label
      and "By Partner" wording are baked into the artwork, so `alt` has to
      carry them for anyone not seeing the image. */
  banner: { src: string; alt: string };
  /** Banner price line. `was` renders struck through; `period` is the
      optional billing suffix ("/year") that only FITPASS carries. */
  offer: { was: string; now: string; period?: string };
  /** Tag strip across the foot of the banner. Omitted on cards that have
      none — Cult Elite, in the current design. */
  highlight?: { label: string; detail: string; tone: keyof typeof HIGHLIGHT_TONES };
  name: string;
  duration: string;
  price: string;
  href?: string;
};

export function ProgramCard({
  banner,
  offer,
  highlight,
  name,
  duration,
  price,
  href = "#",
}: ProgramCardProps) {
  // Figma draws the card stroke inside the frame, so a CSS border would add
  // 2px to the auto height; an inset ring paints the same 1px line without
  // affecting layout.
  return (
    <article className="flex w-full flex-col items-center gap-lg overflow-clip rounded-lg bg-base-white px-md pt-md pb-lg shadow-elevation-1 inset-ring-1 inset-ring-gray-light-mode-100">
      {/* The banner is a positioning context: the gradient, motif, photo and
          partner branding are one raster, and the price and tag strip are
          laid over it as real text. They are deliberately NOT baked in —
          prices vary by city (the whole point of the city gate) and the tag
          copy is a live count, so baking either would mean regenerating
          three WebPs on every content change. */}
      <div className="relative h-[106px] w-[312px] shrink-0">
        {/* Composited at 3x (936x318) by scripts/build-program-banners.py —
            Figma only exports a node at its natural 312x106, which is soft on
            a retina screen. The intrinsic size lets next/image serve a
            variant matching the device's pixel ratio; `sizes` keeps the
            layout box at 312px.

            The artwork carries the banner's own 1px stroke and fills the area
            outside its 8px radius with white; clipping at rounded-md removes
            those corners so the card's white shows through. */}
        <Image
          src={banner.src}
          alt={banner.alt}
          width={936}
          height={318}
          sizes="312px"
          className="h-[106px] w-[312px] rounded-md"
        />

        {/* Figma puts this at top 56 on the two cards that carry a tag strip
            and top 76 on the one that does not — the strip takes 20px off the
            bottom, so everything above it rides up. */}
        <p
          className={`absolute left-[15px] flex items-center gap-xs ${
            highlight ? "top-[56px]" : "top-[76px]"
          }`}
        >
          <s className="m-body-s-regular text-textcolor-grey-500-disabled">
            {offer.was}
          </s>
          <span className="m-title-s-semibold text-textcolor-grey-900-primary">
            {offer.now}
          </span>
          {offer.period && (
            <span className="m-title-s-medium text-textcolor-grey-900-primary">
              {offer.period}
            </span>
          )}
        </p>

        {highlight && (
          /* Figma offsets this to -2px/-1px so it laps over the banner's own
             stroke. Insetting it to the edges does the same thing without
             depending on the artwork's exact border width. */
          <p
            className={`absolute inset-x-0 bottom-0 flex items-center justify-center gap-xs rounded-tl-xs rounded-tr-xs px-[0.625rem] py-xs ${HIGHLIGHT_TONES[highlight.tone]}`}
          >
            <span className="m-label-s-semibold">{highlight.label}</span>
            <span aria-hidden className="size-1 shrink-0 rounded-full bg-current" />
            <span className="m-label-s-semibold">{highlight.detail}</span>
          </p>
        )}
      </div>

      <div className="flex w-full flex-col gap-md">
        <div className="flex w-full items-center gap-md">
          <p className="m-title-m-medium text-textcolor-grey-900-primary">
            {name}
          </p>
          <span
            aria-hidden
            className="size-1 shrink-0 rounded-full bg-textcolor-grey-700-secondary"
          />
          <p className="m-body-m-regular text-textcolor-grey-700-secondary">
            {duration}
          </p>
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="m-title-m-semibold text-textcolor-grey-900-primary">
            {price}
          </p>
          <Link
            href={href}
            className="m-title-m-semibold flex items-center justify-center gap-sm rounded-xs text-brand-blue-700 drop-shadow-xs"
          >
            Details
            <IconArrowRight01 className="size-4 shrink-0" />
          </Link>
        </div>
      </div>
    </article>
  );
}
