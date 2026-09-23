type HeroProps = {
  heading?: string;
};

/**
 * Hero banner — Figma node 1050:6680, 328x99 inside a 16px gutter.
 *
 * Figma rasterises the background to a PNG, but the fill is a named gradient
 * style (`Gradients - Cyan/Dark/900 ↗︎ 700 (45deg)`) whose stops both map
 * exactly onto Mozaic Cyan tokens — so it renders here as a real CSS
 * gradient rather than a bitmap.
 */
export function Hero({
  heading = "Start Your Fitness Journey with Healthverse",
}: HeroProps) {
  return (
    <section className="px-xl pt-3xl">
      {/* /srgb pins the interpolation to match Figma, which blends gradients
          in sRGB; Tailwind v4 would otherwise default to oklab and shift the
          midtones even though both stops are identical. */}
      <div className="flex items-center justify-center rounded-tl-md rounded-tr-5xl rounded-br-md rounded-bl-5xl bg-linear-45/srgb from-cyan-900 to-cyan-700 px-xl py-3xl">
        <h1 className="marketing-heading-5 flex-1 font-semibold text-base-white">
          {heading}
        </h1>
      </div>
    </section>
  );
}
