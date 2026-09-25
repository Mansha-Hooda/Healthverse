/**
 * Step card artwork — Figma node 1050:6818.
 *
 * Each card carries a faint checkerboard of small squares in its top-right
 * corner, clipped by the card's rounded edge.
 *
 * The placement is derived from the rendered frame rather than from Figma's
 * export, because both of Figma's machine-readable sources are unusable for
 * this node:
 *
 *   - the CSS export wraps the specks in `display: contents` divs, which
 *     discards their offsets, collapsing every speck onto one origin;
 *   - the node metadata reports the group's bounding box at x=150 on a
 *     102px-wide card, i.e. entirely off-card.
 *
 * What Figma *does* report reliably is the geometry of an individual speck
 * and the lattice pitch, so those are taken from the export verbatim and only
 * the origin is measured off the reference render.
 */

/** A single speck: its layout box, the square inside it, and Figma's rotation. */
export const SPECK = {
  boxWidth: 9.825,
  boxHeight: 9.748,
  size: 8.685,
  radius: 0.929,
  /* Visually near-identity on a square, but kept so the shape matches the
     source if the speck ever becomes non-square. */
  transform: "rotate(-98.05deg) skewX(-0.45deg)",
} as const;

/**
 * Staggered lattice: every other row is nudged half a column right, which is
 * what gives the checkerboard reading. Columns run past the card's right edge
 * and are clipped by `overflow-clip`.
 */
const LATTICE = {
  originX: 51.1,
  originY: 2,
  columnPitch: 13.03,
  rowPitch: 9.01,
  rowStagger: 6.51,
  columns: 6,
  rows: 5,
} as const;

/** Each speck's top-left, relative to the step card. */
export const STEP_SPECKS: { left: number; top: number }[] = Array.from(
  { length: LATTICE.rows },
  (_, row) =>
    Array.from({ length: LATTICE.columns }, (_, column) => ({
      left:
        LATTICE.originX +
        (row % 2) * LATTICE.rowStagger +
        column * LATTICE.columnPitch,
      top: LATTICE.originY + row * LATTICE.rowPitch,
    })),
).flat();
