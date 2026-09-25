"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { Header } from "@/components/site/Header";
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
 */
export function CityGate({ children }: { children: React.ReactNode }) {
  const city = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = useState(false);

  const choose = useCallback((next: string) => {
    setCity(next);
    setReopened(false);
  }, []);

  // `undefined` means storage has not been read yet, so nothing is decided.
  const known = city !== undefined;
  const sheetOpen = known && (city === null || reopened);

  return (
    <>
      <Header
        location={city ?? "Select city"}
        onSelectLocation={() => setReopened(true)}
      />
      {children}
      {sheetOpen && (
        <CitySheet
          onSelect={choose}
          /* Dismissable only when there is already a city to fall back on. */
          onDismiss={city ? () => setReopened(false) : undefined}
        />
      )}
    </>
  );
}
