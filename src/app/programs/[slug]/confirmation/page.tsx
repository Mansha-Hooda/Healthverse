import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft02 } from "@/components/icons/header";
import {
  IconCheckmarkCircle02,
  IconHelpCircle,
  IconSuccessBadge,
} from "@/components/icons/order";
import { PROGRAMS, findProgram } from "@/components/site/programs/catalog";
import { TrackRequestButton } from "@/components/order/TrackRequestButton";

export function generateStaticParams() {
  return PROGRAMS.map(({ slug }) => ({ slug }));
}

/**
 * PLACEHOLDER. Figma (1050:15076) shows these exact values. The order number,
 * customer name, activation date and the wallet/self split are sample data —
 * they must come from the order the payment provider confirmed. Only the
 * programme name is real, read from the catalog.
 */
const SAMPLE_ORDER = {
  id: "#56123295",
  user: "Monica Addepalli",
  activation: "30th July, 2026",
  paidByWallet: "1,000",
  paidByUser: "8,000",
};

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = findProgram(slug);
  if (!program) notFound();

  const rows = [
    { label: "Order ID", value: SAMPLE_ORDER.id },
    { label: "User name", value: SAMPLE_ORDER.user },
    { label: "Program name", value: program.details.headerTitle },
    { label: "Activation Date", value: SAMPLE_ORDER.activation },
  ];

  return (
    <>
      {/* 64px here, against the details page's 48 — Figma gives this screen
          the taller Header_Cart variant (1050:15223). */}
      <header className="flex h-16 w-full shrink-0 items-center justify-between bg-base-white px-xl py-md shadow-elevation-1">
        <div className="flex min-w-0 items-center gap-md">
          <Link href={`/programs/${slug}`} aria-label="Back" className="shrink-0">
            <IconArrowLeft02 className="size-6 text-textcolor-grey-900-primary" />
          </Link>
          <p className="m-title-m-semibold truncate text-textcolor-grey-900-primary">
            Treatment Request
          </p>
        </div>
        <button type="button" aria-label="Help" className="shrink-0">
          <IconHelpCircle className="size-6 text-textcolor-grey-900-primary" />
        </button>
      </header>

      <main className="flex flex-1 flex-col gap-xl px-xl pt-3xl pb-32">
        <div className="flex flex-col gap-[0.625rem]">
          <div className="flex w-full flex-col items-center justify-center gap-md">
            {/* The rotated green squircle, with the tick knocked out of a
                white disc so the badge colour reads through it. Figma layers
                a Lottie still here, but that asset exports as a blank frame. */}
            <span className="relative grid size-16 place-items-center">
              <IconSuccessBadge className="h-[54.4px] w-[54.933px] shrink-0" />
              <IconCheckmarkCircle02 className="absolute size-8 text-base-white" />
            </span>
            <p className="m-title-l-semibold text-textcolor-green-600">
              Payment Completed
            </p>
            <p className="m-body-s-regular w-full text-center text-textcolor-grey-700-secondary">
              It will take 7-8 days to activate the membership
            </p>
          </div>

          <dl className="flex w-full flex-col gap-md rounded-xl p-lg inset-ring-1 inset-ring-gray-light-mode-100">
            {rows.map((row, i) => (
              <div key={row.label} className="contents">
                {i > 0 && (
                  <span aria-hidden className="h-px w-full bg-neutral-grey-100" />
                )}
                <div className="m-body-s-regular flex w-full items-center justify-between">
                  <dt className="text-textcolor-grey-700-secondary">{row.label}</dt>
                  <dd className="text-textcolor-grey-900-primary">{row.value}</dd>
                </div>
              </div>
            ))}
            <span aria-hidden className="h-px w-full bg-neutral-grey-100" />
            <p className="flex w-full items-start gap-xs">
              <IconCheckmarkCircle02 className="size-4 shrink-0 text-textcolor-blue-600" />
              <span className="m-caption-s-regular flex-1 text-textcolor-blue-600">
                Program details sent to registered mobile number and email
              </span>
            </p>
          </dl>
        </div>

        {[
          { label: "Paid using corporate wallet", amount: SAMPLE_ORDER.paidByWallet },
          { label: "Paid by You", amount: SAMPLE_ORDER.paidByUser },
        ].map((line) => (
          <p
            key={line.label}
            className="flex w-full items-center justify-between rounded-md bg-brand-blue-25 p-lg"
          >
            <span className="m-title-m-medium text-textcolor-grey-700-secondary">
              {line.label}
            </span>
            <span className="m-title-m-semibold text-textcolor-grey-900-primary">
              ₹ {line.amount}
            </span>
          </p>
        ))}
      </main>

      <div className="sticky bottom-0 flex w-full flex-col items-center justify-center bg-base-white p-xl shadow-elevation-3">
        <TrackRequestButton slug={slug} />
      </div>
    </>
  );
}
