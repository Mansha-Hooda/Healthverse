"use client";

import { useState } from "react";
import { UserDetailsSheet } from "./UserDetailsSheet";
import type { ProgramDetails } from "@/components/site/programs/catalog";

type Buy = NonNullable<ProgramDetails["buy"]>;

/**
 * Sticky activation note and buy bar — Figma node 1172:28921, 360x136.
 *
 * In the Figma frame this sits over the end of the scrolling content; here it
 * is sticky, and the page reserves matching bottom padding so the last
 * element can scroll clear of it.
 */
export function BuyBar({ buy, slug }: { buy: Buy; slug: string }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <div className="sticky bottom-0 z-10 w-full">
        {/* One paragraph with an inline bold run, not a flex row — as a flex
          container the label becomes its own item and wraps on its own. */}
        <p className="m-label-s-medium rounded-tl-xl rounded-tr-xl bg-gray-light-mode-50 p-lg text-textcolor-grey-700-secondary">
          <span className="m-label-s-semibold">Please note:</span> It may take
          3-4 working days post payment for plan to get activated. We&rsquo;ll
          notify you once it&rsquo;s activated
        </p>

        {/* Two shadows in one declaration. The inset line is the top stroke,
          which Figma draws inside the 80px frame — as a `border-t` it would
          push the bar to 137px. The second is Figma's drop shadow, given
          there as a filter (0 1px 0.5px / 0 2px 2px); a filter's blur is half
          a box-shadow's for the same result, so that is Shadow/Elevation 1. */}
        <div className="flex w-full flex-col justify-center bg-base-white px-xl py-lg shadow-[inset_0_1px_0_0_var(--color-gray-light-mode-50),var(--shadow-elevation-1)]">
          <div className="flex w-full items-center justify-between py-md">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-sm">
                <s className="m-body-s-light text-textcolor-grey-500-disabled">
                  ₹{buy.was}
                </s>
                <span className="m-body-s-regular text-textcolor-green-600">
                  {buy.discount}
                </span>
              </div>
              <p className="m-title-m-medium text-textcolor-grey-900-primary">
                {buy.now}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex shrink-0 items-center justify-center gap-sm rounded-md bg-brand-blue-600 px-xl py-md text-base-white shadow-xs"
            >
              <span className="m-title-m-semibold py-xxs">Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {sheetOpen && (
        <UserDetailsSheet slug={slug} onDismiss={() => setSheetOpen(false)} />
      )}
    </>
  );
}
