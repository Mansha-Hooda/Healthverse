"use client";

import { useRouter } from "next/navigation";
import { setOrder } from "./orderStore";

/**
 * The confirmation screen's primary action — Figma node 1050:15233.
 *
 * Records the order and returns to the landing page, where it surfaces as
 * the track strip (1183:11727). There is no tracking screen in the design
 * yet, so this is where the flow ends.
 */
export function TrackRequestButton({ slug }: { slug: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        setOrder(slug);
        router.push("/");
      }}
      className="flex w-full items-center justify-center gap-xs rounded-md bg-brand-blue-600 px-[0.875rem] py-[0.625rem] shadow-xs"
    >
      <span className="m-title-m-semibold px-xxs text-base-white">
        Track Request
      </span>
    </button>
  );
}
