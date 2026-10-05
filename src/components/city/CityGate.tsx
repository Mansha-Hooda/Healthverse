"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { AnimatedHeader } from "@/components/site/hero/AnimatedHeader";
import { CitySheet } from "./CitySheet";
import {
  getServerSnapshot,
  getSnapshot,
  setCity,
  subscribe,
} from "./cityStore";

/**
 * Owns the selected city and gates the landing page behind it.
 *
 * Programme prices depend on the city, so the sheet covers the page until one
 * is chosen. The choice is remembered between visits, and the header's
 * location reopens the sheet so it can be changed later.
 *
 * The landing page sections arrive as `children`, which keeps them server
 * components — only this wrapper, the sheet and the header ship to the client.
 *
 * The homepage header is the animated one (Figma 1208:3049), which draws its
 * own navigation. Header.tsx is still the header for every other screen.
 */
export function CityGate({ children }: { children: React.ReactNode }) {
  const city = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = useState(false);

  const choose = useCallback((next: string) => {
    setCity(next);
    setReopened(false);
  }, []);

  /* Gated unless a city is known. `undefined` — storage not read yet, which
     is also what the server renders — counts as gated, so the sheet is in the
     prerendered HTML and is the first thing painted. Were this the other way
     round, the landing page would be fully visible and usable until hydration
     ran, which is exactly what the gate exists to prevent. */
  const sheetOpen = !city || reopened;

  return (
    <>
      <AnimatedHeader
        location={city ?? "Select city"}
        onSelectLocation={() => setReopened(true)}
      />
      {children}
      {sheetOpen && (
        /* Returning visitors have a city, but React only learns that after
           hydration. The inline script in the layout marks the document
           before first paint so CSS can hide this immediately, otherwise
           they would see the sheet flash on every visit. */
        <div data-city-gate>
          <CitySheet
            onSelect={choose}
            /* Dismissable only when there is already a city to fall back on. */
            onDismiss={city ? () => setReopened(false) : undefined}
          />
        </div>
      )}
    </>
  );
}
