"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/** How long the stand-in waits before landing on the confirmation screen. */
const REDIRECT_MS = 2000;

/**
 * The third-party payment step, simulated.
 *
 * Deliberately NOT styled to look like a MediBuddy screen: a provider's
 * hosted page would not be, and dressing a placeholder up as finished work
 * invites it being mistaken for the real integration. The advance is
 * automatic so the flow matches the brief, with a button as well so the
 * screen can be inspected without racing a timer.
 */
export function PaymentHandoff({
  slug,
  amount,
}: {
  slug: string;
  amount: string;
}) {
  const router = useRouter();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(
      () => router.replace(`/programs/${slug}/confirmation`),
      REDIRECT_MS,
    );
    return () => clearTimeout(timer);
  }, [paused, router, slug]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-xl px-xl text-center">
      <p
        role="status"
        className="m-title-l-semibold text-textcolor-grey-900-primary"
      >
        Redirecting to payment&hellip;
      </p>
      <p className="m-body-m-regular text-textcolor-grey-700-secondary">
        {amount ? `Paying ${amount} ` : ""}via the payment provider.
      </p>

      <p className="m-body-s-regular rounded-md bg-gray-light-mode-50 p-lg text-textcolor-grey-700-secondary">
        Placeholder — this stands in for the third-party payment screen, which
        has no design because it is the provider&rsquo;s own hosted page.
      </p>

      <div className="flex w-full flex-col gap-md">
        <button
          type="button"
          onClick={() => router.replace(`/programs/${slug}/confirmation`)}
          className="flex w-full items-center justify-center rounded-md bg-brand-blue-600 px-xl py-md shadow-xs"
        >
          <span className="m-title-m-semibold py-xxs text-base-white">
            Simulate successful payment
          </span>
        </button>
        <button
          type="button"
          onClick={() => setPaused(true)}
          disabled={paused}
          className="m-title-m-semibold py-md text-brand-blue-700 disabled:text-textcolor-grey-500-disabled"
        >
          {paused ? "Auto-redirect stopped" : "Stop auto-redirect"}
        </button>
      </div>
    </main>
  );
}
