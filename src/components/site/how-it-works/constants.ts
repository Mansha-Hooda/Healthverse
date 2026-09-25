/**
 * Step card artwork — Figma node 1050:6818.
 *
 * Each card carries a faint lattice of small rotated squares behind its
 * content. Figma nests them in two groups inside an offset wrapper, but the
 * CSS export flattens those wrappers to `display: contents`, which drops
 * their offsets — so every speck would collapse onto the same origin.
 *
 * The positions below are pre-resolved to card-relative coordinates:
 *
 *     card position = wrapper (28.23, -33.4) + group offset + speck offset
 *
 * where the second group sits a further 52.13px to the right. Most of the
 * lattice sits above the card's top edge and is clipped; only the lowest
 * rows are visible, which is the texture you see beside the icon.
 */

/** One speck's top-left, relative to the step card. */
export const STEP_SPECKS: { left: number; top: number }[] = [
  // Group 1 — wrapper offset only
  { left: 28.24, top: -33.4 },
  { left: 28.23, top: -15.38 },
  { left: 41.26, top: -33.4 },
  { left: 41.26, top: -15.37 },
  { left: 54.29, top: -33.4 },
  { left: 54.3, top: -15.38 },
  { left: 67.33, top: -33.4 },
  { left: 66.89, top: -15.07 },
  { left: 47.78, top: -24.48 },
  { left: 47.78, top: -6.46 },
  { left: 60.81, top: -24.48 },
  { left: 60.81, top: -6.46 },
  { left: 73.85, top: -24.48 },
  { left: 73.84, top: -6.46 },

  // Group 2 — wrapper offset + 52.13px
  { left: 80.37, top: -33.39 },
  { left: 80.36, top: -15.38 },
  { left: 93.39, top: -33.4 },
  { left: 93.39, top: -15.37 },
  { left: 106.42, top: -33.4 },
  { left: 106.43, top: -15.38 },
  { left: 119.46, top: -33.4 },
  { left: 119.45, top: -15.38 },
  { left: 132.49, top: -33.4 },
  { left: 132.48, top: -15.38 },
  { left: 86.87, top: -24.48 },
  { left: 86.87, top: -6.45 },
  { left: 99.9, top: -24.48 },
  { left: 99.91, top: -6.46 },
  { left: 112.94, top: -24.47 },
  { left: 112.94, top: -6.46 },
  { left: 125.98, top: -24.48 },
  { left: 125.97, top: -6.45 },
  { left: 139.01, top: -24.47 },
  { left: 139.01, top: -6.45 },
];

/** Speck box and the rotation Figma applies to each square. */
export const SPECK = {
  boxWidth: 9.825,
  boxHeight: 9.748,
  size: 8.685,
  radius: 0.929,
  transform: "rotate(-98.05deg) skewX(-0.45deg)",
} as const;
