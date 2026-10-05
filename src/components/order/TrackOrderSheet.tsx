"use client";

import { useId } from "react";
import { IconCancel01 } from "@/components/icons/buy-sheet";
import {
  IconDownload04,
  IconStatusDone,
  IconStatusPending,
} from "@/components/icons/track-order";
import { BottomSheet } from "@/components/ui/BottomSheet";
import type { Program } from "@/components/site/programs/catalog";

/**
 * PLACEHOLDER. Figma (1050:11965) stamps both steps "14 Sep, 2026 • 04:00
 * p.m."; real timestamps come from the order. The design also carries two
 * further steps — "Order Confirmed with Cult.fit" and "Membership Setup" —
 * both marked hidden, so only these two render.
 */
const STEPS = [
  { label: "Payment Received", when: "14 Sep, 2026", at: "04:00 p.m.", done: true },
  { label: "Membership Activated", when: "14 Sep, 2026", at: "04:00 p.m.", done: false },
];

/** Track Order — Figma node 1050:11965, opened from the landing strip. */
export function TrackOrderSheet({
  program,
  onDismiss,
}: {
  program: Program;
  onDismiss: () => void;
}) {
  const id = useId();
  const bill = program.details.bill;

  return (
    <BottomSheet labelledBy={`${id}-title`} onDismiss={onDismiss} dismissOnOutsideClick>
      <div className="flex min-h-0 flex-1 flex-col gap-xl overflow-y-auto px-xl">
        <div className="flex flex-col gap-xl">
          <div className="flex items-center gap-2xl">
            <h2
              id={`${id}-title`}
              className="m-title-l-semibold flex-1 truncate text-textcolor-grey-900-primary"
            >
              Track Order
            </h2>
            <button type="button" onClick={onDismiss} aria-label="Close" className="shrink-0">
              <IconCancel01 className="size-5 text-textcolor-grey-900-primary" />
            </button>
          </div>
          <span aria-hidden className="h-px w-full bg-border-secondary" />
        </div>

        <div className="flex w-full flex-col gap-xs rounded-md bg-brand-blue-25 px-lg py-md inset-ring-1 inset-ring-brand-blue-100">
          <p className="m-title-s-medium text-brand-blue-700">Payment Received!</p>
          <p className="m-body-s-regular text-textcolor-grey-700-secondary">
            It takes 3-4 business days for plan to get activated
          </p>
        </div>

        <ol className="flex w-full flex-col rounded-xl p-lg inset-ring-1 inset-ring-gray-light-mode-100">
          {STEPS.map((step, i) => (
            <li key={step.label} className="flex items-start gap-md">
              {/* The rail is the flex column: indicator, then a line that
                  stretches to the next step. The last step has no line. */}
              <span className="flex shrink-0 flex-col items-center self-stretch pt-[2px]">
                {step.done ? (
                  <IconStatusDone className="size-4 shrink-0" />
                ) : (
                  <IconStatusPending className="size-4 shrink-0 text-textcolor-grey-900-primary" />
                )}
                {i < STEPS.length - 1 && (
                  <span className="w-px flex-1 bg-gray-light-mode-200" />
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col pb-xl last:pb-0">
                <span className="m-title-s-medium truncate text-textcolor-grey-900-primary">
                  {step.label}
                </span>
                <span className="m-body-s-regular flex items-center gap-xs text-textcolor-grey-700-secondary">
                  {step.when}
                  <span aria-hidden className="size-1 rounded-full bg-current" />
                  {step.at}
                </span>
              </span>
            </li>
          ))}
        </ol>

        {bill && (
          <div className="flex w-full flex-col gap-xl rounded-xl p-lg inset-ring-1 inset-ring-gray-light-mode-100">
            <div className="flex w-full items-center justify-between">
              <h3 className="m-title-l-semibold text-textcolor-grey-900-primary">
                Bill Summary
              </h3>
              <button
                type="button"
                className="flex shrink-0 items-center justify-center gap-sm rounded-xs drop-shadow-xs"
              >
                <span className="m-title-s-semibold text-brand-blue-700">Invoice</span>
                <IconDownload04 className="size-4 shrink-0 text-brand-blue-700" />
              </button>
            </div>

            <dl className="flex w-full flex-col gap-md">
              {bill.lines.map((line) => (
                <div key={line.label} className="flex items-center justify-between">
                  <dt className="m-body-s-regular text-textcolor-grey-900-primary">
                    {line.label}
                  </dt>
                  <dd className="m-title-m-medium tabular-nums text-textcolor-grey-900-primary">
                    ₹ {line.amount}
                  </dd>
                </div>
              ))}
              <span
                aria-hidden
                className="h-px w-full border-t border-dashed border-gray-light-mode-100"
              />
              <div className="flex items-center justify-between">
                <dt className="m-body-s-regular text-textcolor-grey-900-primary">
                  Total Amount
                </dt>
                <dd className="m-title-l-semibold tabular-nums text-textcolor-grey-900-primary">
                  ₹{bill.total}
                </dd>
              </div>
            </dl>
          </div>
        )}

        <a
          href="tel:"
          className="flex w-full items-center justify-center gap-sm rounded-md bg-base-white px-xl py-md text-brand-blue-600 shadow-xs inset-ring-1 inset-ring-brand-blue-300"
        >
          <span className="m-title-m-semibold py-xxs">Need Help? Call Us</span>
        </a>
      </div>
    </BottomSheet>
  );
}
