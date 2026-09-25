/**
 * Step card artwork — Figma node 1050:6818.
 *
 * Each card carries a faint checkerboard in its top-right corner: a diagonal
 * cascade of tilted squares, clipped by the card's edge.
 *
 * It ships as an exported asset rather than being rebuilt in CSS, because
 * both of Figma's machine-readable sources describe it wrongly:
 *
 *   - the CSS export wraps the squares in `display: contents` divs, which
 *     discards their offsets and collapses every square onto one origin;
 *   - the node metadata reports the group's bounding box at x=150 on a
 *     102px-wide card, i.e. entirely off-card.
 *
 * Reconstructing it from those numbers produced a uniform axis-aligned grid;
 * the real artwork is a tilted wedge that thins toward the lower left. The
 * export is faithful and far less code.
 *
 * Placement is measured from the rendered frame: the pattern's own content
 * starts 4px into the 74px asset, and lands at x=43 on the card, so the
 * asset sits at x=39. Its right-hand columns overflow the 102px card and are
 * clipped by `overflow-clip`, which is what the design does too.
 */
export const STEP_PATTERN = {
  src: "/how-it-works/step-pattern.webp",
  left: 39,
  top: 1,
  width: 74,
  height: 73,
} as const;
