type FooterProps = {
  heading?: string;
  copy?: string;
};

/**
 * Footer — Figma node 1050:6958, 360x176.
 *
 * The background is the `creatives-banners/Cyan/Gradient Surface` style: the
 * same cyan stops the program card banners use, at this frame's own angle.
 * Written as a plain CSS gradient, which interpolates in sRGB and so matches
 * Figma by default — the hero needs an explicit `/srgb` only because it uses
 * Tailwind's bg-linear utility, which would otherwise blend in oklab.
 *
 * The 32px gap above the footer is a margin rather than padding, so the
 * gradient starts below it instead of filling it.
 */
export function Footer({
  heading = "Healthverse",
  copy = "Start your fitness journey with Healthverse",
}: FooterProps) {
  return (
    <footer
      className="mt-4xl flex flex-col gap-lg px-xl py-5xl"
      style={{
        backgroundImage:
          "linear-gradient(-71.90291370259925deg, var(--color-cyan-100) 2.4747%, var(--color-cyan-25) 49.776%) ",
      }}
    >
      <p className="marketing-display-xs-semibold text-textcolor-grey-900-primary">
        {heading}
      </p>
      <p className="marketing-display-xs-regular text-textcolor-grey-700-secondary">
        {copy}
      </p>
    </footer>
  );
}
