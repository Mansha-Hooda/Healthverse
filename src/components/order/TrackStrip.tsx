"use client";

import { useState, useSyncExternalStore } from "react";
import { findProgram } from "@/components/site/programs/catalog";
import { TrackOrderSheet } from "./TrackOrderSheet";
import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "./orderStore";

/**
 * Landing page track strip — Figma node 1183:11727, 360x66.
 *
 * Appears once an order exists, which is what "Track Request" on the
 * confirmation screen records. Renders nothing otherwise, including on the
 * server, so it never flashes for a visitor who has not bought anything.
 */
export function TrackStrip() {
  const slug = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const program = slug ? findProgram(slug) : undefined;
  if (!program) return null;

  // Inset top line, not a `border-t`: Figma draws the stroke inside the 66px
  // frame, so a border would make the strip 67.
  return (
    <div className="sticky bottom-0 z-20 flex w-full flex-col items-start gap-md rounded-tl-xl rounded-tr-xl bg-brand-blue-25 p-lg shadow-[inset_0_1px_0_0_var(--color-brand-blue-100)]">
      <div className="flex w-full items-center gap-md">
        <div className="flex min-w-0 flex-1 flex-col gap-xxs">
          {/* Figma's strip reads "Cult Pass Pro- 12 months"; the catalog title
              is "Cultfit Pass Pro- 12 Months". Taking it from the catalog
              keeps one source of truth rather than a third spelling. */}
          <p className="m-title-m-medium text-brand-blue-700">
            {program.details.title}
          </p>
          <p className="m-body-s-regular truncate text-textcolor-grey-700-secondary">
            Gets activated in 3-4 business days
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex shrink-0 items-center justify-center gap-xs rounded-md bg-brand-blue-600 px-lg py-sm shadow-xs"
        >
          <span className="caption-m-semibold px-xxs py-px text-base-white">
            Track Request
          </span>
        </button>
      </div>

      {open && (
        <TrackOrderSheet program={program} onDismiss={() => setOpen(false)} />
      )}
    </div>
  );
}
