import Image from "next/image";
import { IconArrowRight01 } from "@/components/icons/programs";

export type ProgramCardProps = {
  /** Pre-rendered banner exported from Figma. The partner logo, tier label
      and "By Partner" wording are baked into the artwork, so `alt` has to
      carry them for anyone not seeing the image. */
  banner: { src: string; alt: string };
  name: string;
  duration: string;
  price: string;
  href?: string;
};

export function ProgramCard({
  banner,
  name,
  duration,
  price,
  href = "#",
}: ProgramCardProps) {
  // Figma draws the card stroke inside the frame, so the card is 186px tall
  // including its border. A CSS border would add 2px to the auto height; an
  // inset ring paints the same 1px line without affecting layout.
  return (
    <article className="flex w-full flex-col items-center gap-md overflow-clip rounded-lg bg-base-white px-md pt-md pb-lg shadow-elevation-1 inset-ring-1 inset-ring-gray-light-mode-100">
      {/* Banner artwork is composited at 3x (936x318) by
          scripts/build-program-banners.py — Figma only ever exports a node at
          its natural 312x106, which is soft on a retina screen. The intrinsic
          size is declared so next/image can serve a variant matching the
          device's pixel ratio; `sizes` keeps the layout box at 312px.

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

      <div className="flex w-full flex-col gap-lg">
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
          <a
            href={href}
            className="m-title-m-semibold flex items-center justify-center gap-sm rounded-xs text-brand-blue-700 drop-shadow-xs"
          >
            Details
            <IconArrowRight01 className="size-4 shrink-0" />
          </a>
        </div>
      </div>
    </article>
  );
}
