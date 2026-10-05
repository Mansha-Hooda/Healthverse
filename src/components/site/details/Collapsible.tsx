"use client";

import { useId, useState } from "react";
import { IconArrowDown01 } from "@/components/icons/program-details";

/**
 * The bordered, collapsible card used by Terms and Conditions (1050:14730)
 * and Bill Summary (1163:26027). Figma draws both expanded, with the chevron
 * flipped to point up.
 *
 * Figma gives the two headings different sizes (14px for Terms, 16px for
 * Bill Summary), but every heading on the site is 16/24 semibold by
 * instruction, so there is nothing left to vary.
 */
export function Collapsible({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const id = useId();

  return (
    /* Inset ring, not a border: Figma draws the stroke inside the
       frame, so a border would add 2px to the card's auto height. */
    <section className="flex w-full flex-col gap-xl rounded-xl px-lg py-xl inset-ring-1 inset-ring-gray-light-mode-50">
      <h2>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="m-title-l-semibold flex w-full items-center justify-between text-left text-textcolor-grey-900-primary"
        >
          {title}
          <IconArrowDown01
            className={`size-5 shrink-0 text-dark transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h2>
      {open && <div id={id}>{children}</div>}
    </section>
  );
}
