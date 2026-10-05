"use client";

import { useEffect, useRef } from "react";

type BottomSheetProps = {
  /** id of the element naming the sheet, for aria-labelledby. */
  labelledBy: string;
  /** Omitted to make the sheet mandatory — Escape then does nothing. */
  onDismiss?: () => void;
  /** Close when the backdrop is clicked. Opt-in: the landing page's sheet is
      a gate, so tapping past it there must not dismiss it. */
  dismissOnOutsideClick?: boolean;
  /** Extra classes for the card, e.g. its max height. */
  className?: string;
  children: React.ReactNode;
};

/**
 * The shared bottom-sheet shell — backdrop, card, drag handle, and the three
 * behaviours every sheet needs: focus containment, Escape, and a scroll lock
 * on the page behind.
 *
 * Figma draws the card the same way everywhere (1050:8752, 1172:40186,
 * 1050:14266): 24px top corners, Drop shadow/Normal, 24px bottom padding and
 * a 40x4 handle in a 16/12 well.
 */
export function BottomSheet({
  labelledBy,
  onDismiss,
  dismissOnOutsideClick = false,
  className = "max-h-[75%]",
  children,
}: BottomSheetProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  /* A click only counts as "outside" if it both started and ended on the
     backdrop. Without this, dragging a selection out of the sheet, or
     flicking a list inside it, releases over the backdrop and closes it. */
  const pressedBackdrop = useRef(false);

  /* Escape closes, but only when the sheet is dismissable at all. */
  useEffect(() => {
    if (!onDismiss) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  /* Hold focus inside the sheet: it covers the page, so tabbing out would
     land on controls the user cannot see. */
  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    const focusable = () =>
      [
        ...node.querySelectorAll<HTMLElement>(
          'button, input, [href], [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => !el.hasAttribute("disabled"));

    focusable()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, []);

  /* The page behind must not scroll while a sheet is up.

     Set and clear the property outright rather than saving and restoring a
     previous value. The landing page's gate mounts during hydration and
     unmounts again the moment a stored city is read, so mounts and cleanups
     can interleave — and a saved "previous" captured while the lock was
     already on restores `hidden`, stranding the page unscrollable with no
     sheet in sight. Nothing else writes an inline overflow. */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  const outside = dismissOnOutsideClick && onDismiss;

  return (
    <div
      className="fixed inset-0 z-50 mx-auto flex w-(--container-frame) items-end bg-black/60"
      onPointerDown={
        outside
          ? (event) => {
              pressedBackdrop.current = event.target === event.currentTarget;
            }
          : undefined
      }
      onClick={
        outside
          ? (event) => {
              if (pressedBackdrop.current && event.target === event.currentTarget) {
                onDismiss();
              }
            }
          : undefined
      }
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`flex w-full flex-col overflow-clip rounded-tl-4xl rounded-tr-4xl bg-base-white pb-3xl shadow-drop-normal ${className}`}
      >
        {/* Decorative: the sheet is dismissed by its own controls. */}
        <div aria-hidden className="flex justify-center px-xl py-lg">
          <span className="h-1 w-10 rounded-full bg-gray-light-mode-100" />
        </div>
        {children}
      </div>
    </div>
  );
}
