import Image from "next/image";
import { IconArrowRight01 } from "@/components/icons/programs";
import {
  ART_CULT,
  DIAMONDS,
  THEME_BORDER,
  THEME_DIAMOND,
  THEME_GRADIENT,
  THEME_MASK_BG,
  type ProgramArt,
  type ProgramTheme,
} from "./constants";

export type Partner = {
  logo: { src: string; width: number; height: number; alt: string };
  /** Optional tier label printed beside the logo, e.g. "Pro" / "Elite". */
  tier?: string;
};

export type ProgramCardProps = {
  theme: ProgramTheme;
  partner: Partner;
  name: string;
  duration: string;
  price: string;
  art?: ProgramArt;
  /** Nudges the partner block off centre, matching the Figma frame. */
  partnerOffset?: number;
  href?: string;
};

export function ProgramCard({
  theme,
  partner,
  name,
  duration,
  price,
  art = ART_CULT,
  partnerOffset = 0,
  href = "#",
}: ProgramCardProps) {
  const gradient = THEME_GRADIENT[theme];

  // Figma draws the card stroke inside the frame, so the card is 186px tall
  // including its border. A CSS border would add 2px to the auto height; an
  // inset ring paints the same 1px line without affecting layout.
  return (
    <article className="flex w-full flex-col items-center gap-md overflow-clip rounded-lg bg-base-white px-md pt-md pb-lg shadow-elevation-1 inset-ring-1 inset-ring-gray-light-mode-100">
      <div
        className={`relative h-[106px] w-[312px] overflow-clip rounded-md border ${THEME_BORDER[theme]}`}
        style={{
          backgroundImage: `linear-gradient(-64.81452619074028deg, var(${gradient.from}) 2.4747%, var(${gradient.to}) 49.776%)`,
        }}
      >
        {/* Scattered diamond motif */}
        {DIAMONDS.map((diamond, index) => (
          <div
            key={index}
            className="absolute flex h-[30.324px] w-[30.565px] items-center justify-center"
            style={{ left: `${diamond.left}px`, top: `${diamond.top}px` }}
          >
            <div
              style={{
                transform: `rotate(${diamond.rotate ?? -45}deg) scaleY(-1) skewX(0.45deg)`,
              }}
            >
              <div
                className={`size-[21.528px] rounded-[2.304px] ${THEME_DIAMOND[theme][diamond.tint]}`}
              />
            </div>
          </div>
        ))}

        {/* Rotated rounded square — colour backdrop, then the photo clipped
            to the identical shape and counter-rotated back upright. */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: `${art.frame.left}px`,
            top: `${art.frame.top}px`,
            width: `${art.frame.box}px`,
            height: `${art.frame.box}px`,
          }}
        >
          <div
            className={`-rotate-45 overflow-hidden ${THEME_MASK_BG[theme]}`}
            style={{
              width: `${art.frame.width}px`,
              height: `${art.frame.height}px`,
              borderRadius: `${art.frame.radius}px`,
            }}
          >
            <div className="relative size-full rotate-45">
              <div
                className="absolute"
                style={{
                  left: `${art.photo.offset.left}px`,
                  top: `${art.photo.offset.top}px`,
                  width: `${art.photo.width}px`,
                  height: `${art.photo.height}px`,
                }}
              >
                <div
                  className="absolute"
                  style={
                    art.photo.inset
                      ? {
                          left: art.photo.inset.left,
                          top: art.photo.inset.top,
                          width: art.photo.inset.width,
                          height: art.photo.inset.height,
                        }
                      : { inset: 0 }
                  }
                >
                  <Image
                    src={art.photo.src}
                    alt=""
                    fill
                    sizes="216px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner block */}
        <div
          className="absolute left-[15px] flex w-[162.927px] -translate-y-1/2 flex-col gap-xs"
          style={{ top: `calc(50% - ${partnerOffset}px)` }}
        >
          <p className="m-label-s-semibold text-textcolor-grey-900-primary">
            By Partner
          </p>
          <div className="flex items-center gap-xs">
            {/* Fixed-size box with a filled image: the logo boxes use
                fractional dimensions, which next/image's intrinsic sizing
                cannot express without distorting the aspect ratio. */}
            <div
              className="relative shrink-0"
              style={{
                width: `${partner.logo.width}px`,
                height: `${partner.logo.height}px`,
              }}
            >
              <Image
                src={partner.logo.src}
                alt={partner.logo.alt}
                fill
                sizes="104px"
                className="object-cover"
              />
            </div>
            {partner.tier && (
              <span className="m-title-m-medium text-textcolor-grey-900-primary">
                {partner.tier}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-lg">
        <div className="flex w-full items-center gap-md">
          <p className="m-title-m-medium text-textcolor-grey-900-primary">{name}</p>
          <span
            aria-hidden
            className="size-1 shrink-0 rounded-full bg-textcolor-grey-700-secondary"
          />
          <p className="m-body-m-regular text-textcolor-grey-700-secondary">{duration}</p>
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="m-title-m-semibold text-textcolor-grey-900-primary">
            {price}
          </p>
          <a
            href={href}
            className="flex items-center justify-center gap-sm rounded-xs m-title-m-semibold text-brand-blue-700 drop-shadow-xs"
          >
            Details
            <IconArrowRight01 className="size-4 shrink-0" />
          </a>
        </div>
      </div>
    </article>
  );
}
