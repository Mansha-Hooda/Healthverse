import Image from "next/image";

/**
 * Reviewer avatar — Figma `Avatar_user` (1183:10368 at 40px, 1163:26373 at
 * 48px).
 *
 * The illustration does NOT fill the circle. Figma insets it to
 * left 12.5% / top 10.42% / right 16.69% / bottom -1.54%, then expands the
 * image itself by ~1% to cover the artwork's own stroke overflow. Resolving
 * both against the 48px circle gives a box of 34.8 x 44.5 at (5.6, 4.6) —
 * 72.5% x 92.8% at 11.7% / 9.4%, which is within a rounding error of the
 * 40px variant's figures too, so one set serves both.
 *
 * `object-cover` is wrong here: it would scale the 29x37 artwork to 48x61
 * and crop the head.
 */
export function Avatar({
  size = 48,
  src = "/reviews/avatar-placeholder.svg",
}: {
  size?: 40 | 48;
  src?: string;
}) {
  return (
    <span
      className={`relative block shrink-0 overflow-clip rounded-full bg-gray-light-mode-50 ${
        size === 40 ? "size-10" : "size-12"
      }`}
    >
      <Image
        src={src}
        alt=""
        width={29}
        height={38}
        /* No `max-w-none` here: --spacing-none makes Tailwind resolve it to
           `max-width: 0` (see the spacing note in globals.css). Preflight's
           `max-width: 100%` is harmless at this size anyway. */
        style={{ width: "72.5%", height: "92.8%" }}
        className="absolute top-[9.4%] left-[11.7%]"
      />
    </span>
  );
}
