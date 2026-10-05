"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { IconLocation06 } from "@/components/icons/header";
import { CitySheet } from "./CitySheet";
import {
  getServerSnapshot,
  getSnapshot,
  setCity,
  subscribe,
} from "./cityStore";

/**
 * The location control on the program details page — Figma 1168:28831, with
 * the city sheet at 1172:40186.
 *
 * Same store and same sheet as the landing page's CityGate; the difference is
 * that nothing is gated here. The details page is reachable directly, so the
 * sheet is always dismissable and the control falls back to a prompt when no
 * city has been chosen yet.
 */
export function CityPicker({ fallback = "Select city" }: { fallback?: string }) {
  const city = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);

  const choose = useCallback((next: string) => {
    setCity(next);
    setOpen(false);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex shrink-0 items-center gap-xs"
      >
        <IconLocation06 className="size-4 shrink-0 text-textcolor-blue-600" />
        <span className="m-title-m-semibold text-textcolor-blue-600">
          {/* `undefined` means storage has not been read yet. */}
          {city ?? fallback}
        </span>
      </button>

      {open && (
        <CitySheet
          onSelect={choose}
          onDismiss={() => setOpen(false)}
          dismissOnOutsideClick
        />
      )}
    </>
  );
}
