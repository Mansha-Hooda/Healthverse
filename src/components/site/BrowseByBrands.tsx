import Image from "next/image";
import { MediBuddyLogo } from "@/components/brand/logos";

type Brand = {
  name: string;
  /** Exported logo, sized to its Figma slot. MediBuddy is the exception —
      it renders the official inline mark instead of a raster. */
  logo?: { src: string; width: number; height: number };
};

/* Order matches the Figma frame. The layer names in the file are stale
   placeholders (several tiles are still called "fitpass"/"fitelo"), so this
   list follows the rendered artwork, not the layer names. */
const BRANDS: Brand[] = [
  { name: "cult.fit", logo: { src: "/brands/cultfit.webp", width: 69, height: 26 } },
  { name: "FITPASS", logo: { src: "/brands/fitpass.webp", width: 103, height: 16 } },
  { name: "FITTR", logo: { src: "/brands/fittr.webp", width: 80, height: 14 } },
  { name: "MediBuddy" },
  { name: "Fitelo", logo: { src: "/brands/fitelo.webp", width: 65, height: 16 } },
  { name: "shyft", logo: { src: "/brands/shyft.webp", width: 45, height: 18 } },
  { name: "PHILIPS", logo: { src: "/brands/philips.webp", width: 76, height: 14 } },
];

/** Browse by Brands — Figma node 1050:6778. */
export function BrowseByBrands() {
  return (
    <section
      aria-labelledby="browse-by-brands"
      className="flex flex-col gap-xl px-xl pt-3xl"
    >
      <h2
        id="browse-by-brands"
        className="m-title-l-semibold text-textcolor-grey-900-primary"
      >
        Browse by Brands
      </h2>

      {/* Two 158px tiles plus a 12px gap fill the 328px grid exactly, so
          wrapping reproduces the design's four rows without hardcoding them —
          the seventh tile falls onto its own row. */}
      <ul className="flex flex-wrap gap-lg">
        {BRANDS.map((brand) => (
          <li
            key={brand.name}
            className="flex h-14 w-[158px] items-center justify-center rounded-md bg-base-white shadow-elevation-1 inset-ring-1 inset-ring-gray-cool-50"
          >
            {brand.logo ? (
              <Image
                src={brand.logo.src}
                alt={brand.name}
                width={brand.logo.width}
                height={brand.logo.height}
                sizes={`${brand.logo.width}px`}
                style={{
                  width: `${brand.logo.width}px`,
                  height: `${brand.logo.height}px`,
                }}
              />
            ) : (
              /* MediBuddy's own mark comes from the design system's official
                 SVG, never a re-export. Width only — the viewBox sets height. */
              <MediBuddyLogo className="w-[125px]" />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
