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
 * Placement is measured from the rendered frame by comparing the asset's
 * content row-by-row against the reference, rather than by eye:
 *
 *     card row y=3   reference x 43..94    asset row 3 starts at x 14
 *     card row y=7   reference x 44..97    asset row 7 starts at x 15
 *
 * which pins the asset at x = 43 - 14 = 29. All three cards measure
 * identically, so one placement serves them all.
 *
 * The asset's right-hand columns overflow the 102px card and are clipped by
 * `overflow-clip`, as in the design.
 */
export const STEP_PATTERN = {
  src: "/how-it-works/step-pattern.webp",
  left: 29,
  top: 1,
  width: 74,
  height: 73,
} as const;
