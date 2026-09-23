/**
 * Geometry and content for the Featured Programs cards — Figma node 1050:6683.
 *
 * The fractional pixel values below are read straight from the Figma frame.
 * They are deliberately not rounded to the Mozaic spacing scale: they position
 * decorative artwork inside a clipped 312x106 banner, where rounding visibly
 * shifts the composition. Everything the user actually reads — type, colour,
 * padding, radii — uses Mozaic tokens.
 */

export type ProgramTheme = "cyan" | "pink" | "purple";

/** CSS custom properties for each theme's banner gradient stops. */
export const THEME_GRADIENT: Record<ProgramTheme, { from: string; to: string }> = {
  cyan: { from: "--color-cyan-100", to: "--color-cyan-25" },
  pink: { from: "--color-pink-100", to: "--color-pink-25" },
  purple: { from: "--color-purple-100", to: "--color-purple-25" },
};

/* Static class strings so Tailwind can see them at build time — these cannot
   be assembled dynamically or the utilities get dropped. */
export const THEME_BORDER: Record<ProgramTheme, string> = {
  cyan: "border-cyan-100",
  pink: "border-pink-100",
  purple: "border-purple-100",
};

export const THEME_MASK_BG: Record<ProgramTheme, string> = {
  cyan: "bg-cyan-100",
  pink: "bg-pink-100",
  purple: "bg-purple-100",
};

export type DiamondTint = 12 | 20 | 25;

export const THEME_DIAMOND: Record<ProgramTheme, Record<DiamondTint, string>> = {
  cyan: {
    12: "bg-cyan-100/12",
    20: "bg-cyan-100/20",
    25: "bg-cyan-100/25",
  },
  pink: {
    12: "bg-pink-100/12",
    20: "bg-pink-100/20",
    25: "bg-pink-100/25",
  },
  purple: {
    12: "bg-purple-100/12",
    20: "bg-purple-100/20",
    25: "bg-purple-100/25",
  },
};

/** The banner's scattered diamond motif. Positions are banner-relative; many
    sit partly outside the 312x106 box and are clipped. */
export const DIAMONDS: {
  left: number;
  top: number;
  tint: DiamondTint;
  rotate?: number;
}[] = [
  { left: -4.45, top: 31.59, tint: 25 },
  { left: 49.55, top: 49.55, tint: 12 },
  { left: 12.95, top: 49.55, tint: 12 },
  { left: 12.95, top: 87.33, tint: 12 },
  { left: 49.55, top: 12.96, tint: 12 },
  { left: -21.72, top: 13.16, tint: 20 },
  { left: -39, top: 31.59, tint: 20 },
  { left: 11.68, top: -26, tint: 25 },
  { left: 30.11, top: 31.59, tint: 25 },
  { left: 68.43, top: 30.67, tint: 25, rotate: -44.77 },
  { left: -21.72, top: 50.02, tint: 25 },
  { left: -4.76, top: 68.44, tint: 25 },
  { left: 30.66, top: 68.44, tint: 25 },
  { left: -4.45, top: -5.27, tint: 25 },
  { left: 12.83, top: 13.16, tint: 25 },
  { left: 30.11, top: -6.42, tint: 25 },
];

/**
 * The rotated rounded-square that frames the photo.
 *
 * Figma models this as a mask group: a rounded rect rotated -45deg clips the
 * photo, with the same shape drawn behind it in the theme colour. Figma's CSS
 * export emits an axis-aligned `mask-image` and loses the rotation, which
 * renders the photo as a plain rectangle — so the clip is rebuilt here as a
 * rotated `overflow-hidden` frame with the photo counter-rotated inside it.
 * That reproduces the mask exactly and needs no mask asset.
 *
 * `photoOffset` is the photo's top-left expressed inside the counter-rotated
 * frame, derived from its banner-space position:
 *     offset = bannerPos - frameCentre + frameSize / 2
 */
export type ProgramArt = {
  /** Rotated rounded square: both the coloured backdrop and the photo clip. */
  frame: {
    left: number;
    top: number;
    box: number;
    width: number;
    height: number;
    radius: number;
  };
  photo: {
    src: string;
    width: number;
    height: number;
    offset: { left: number; top: number };
    /** cult.fit insets its photo inside the frame; FITPASS fills it. */
    inset?: { left: string; top: string; width: string; height: string };
  };
};

export const ART_CULT: ProgramArt = {
  frame: {
    left: 163.83,
    top: -50.45,
    box: 207.496,
    width: 146.007,
    height: 147.436,
    radius: 22.844,
  },
  photo: {
    src: "/programs/photo-cult.png",
    width: 210.09,
    height: 161.808,
    // banner (157.17, -19.04); centre (267.578, 53.298)
    offset: { left: -37.4045, top: 1.38 },
    inset: { left: "3.09%", top: "-1.18%", width: "86.31%", height: "83.13%" },
  },
};

export const ART_FITPASS: ProgramArt = {
  frame: {
    left: 167,
    top: -53,
    box: 218,
    width: 153.399,
    height: 154.9,
    radius: 24,
  },
  photo: {
    src: "/programs/photo-fitpass.png",
    width: 216,
    height: 162,
    // banner (155, -29); centre (276, 56)
    offset: { left: -44.3005, top: -7.55 },
  },
};
