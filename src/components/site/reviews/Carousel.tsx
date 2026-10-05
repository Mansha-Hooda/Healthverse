"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Snap carousel with pagination dots — Figma 1183:10364 (home) and
 * 1163:26370 (program details). Both are the same mechanism with different
 * cards, so this takes the cards as nodes.
 *
 * Scrolling is CSS (snap points), so it works before hydration and without
 * JS. React only keeps the dots in step and lets them act as jump targets.
 *
 * The scroller breaks out of the page's 16px right gutter so cards can run
 * to the edge of the frame, which is what makes the next one peek.
 */
export function Carousel({
  items,
  label,
}: {
  items: React.ReactNode[];
  /** Used to describe the dots, e.g. "review". */
  label: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    // Nearest card to the scroller's left edge, which is where a snap lands.
    let best = 0;
    let bestGap = Infinity;
    ([...el.children] as HTMLElement[]).forEach((card, i) => {
      const gap = Math.abs(card.offsetLeft - el.scrollLeft);
      if (gap < bestGap) {
        bestGap = gap;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    return () => el.removeEventListener("scroll", sync);
  }, [sync]);

  const jumpTo = (index: number) => {
    const el = scroller.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    // Matches the reduced-motion rule the animated header already honours.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {/* `relative` is load-bearing: the cards are positioned, so without it
          their offsetLeft resolves against some ancestor and both the dot
          sync and the jump target are wrong. */}
      <div
        ref={scroller}
        className="relative -mr-xl flex snap-x snap-mandatory gap-lg overflow-x-auto pr-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div key={i} className="shrink-0 snap-start">
            {item}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="flex w-full items-center justify-center gap-xs">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Show ${label} ${i + 1} of ${items.length}`}
              aria-current={i === active}
              className={`h-1.5 rounded-xs transition-[width,background-color] ${
                i === active
                  ? "w-4 bg-pagination-dot-active"
                  : "w-1.5 bg-pagination-dot-idle"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
