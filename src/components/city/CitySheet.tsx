"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { IconLocation06 } from "@/components/icons/header";
import { IconSearch01 } from "@/components/icons/how-it-works";
import { OTHER_CITIES, POPULAR_CITIES } from "./constants";

type CitySheetProps = {
  onSelect: (city: string) => void;
  /** Omitted while no city is chosen yet, which makes the sheet mandatory. */
  onDismiss?: () => void;
};

/** Matches a city if every word of the query appears in it. */
function matches(city: string, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return needle.split(/\s+/).every((word) => city.toLowerCase().includes(word));
}

/**
 * City selection sheet — Figma node 1050:8751.
 *
 * Shown over the landing page until a city is chosen, because programme
 * prices depend on it. The header and search stay put while the two city
 * lists scroll.
 */
export function CitySheet({ onSelect, onDismiss }: CitySheetProps) {
  const [query, setQuery] = useState("");
  const searchId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  const popular = useMemo(
    () => POPULAR_CITIES.filter((city) => matches(city.name, query)),
    [query],
  );
  const others = useMemo(
    () => OTHER_CITIES.filter((city) => matches(city, query)),
    [query],
  );
  const empty = popular.length === 0 && others.length === 0;

  /* Escape closes the sheet, but only once a city exists to fall back on. */
  useEffect(() => {
    if (!onDismiss) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  /* Hold focus inside the sheet: it covers the page, so tabbing out would
     land on controls the user cannot see. */
  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    const focusable = () =>
      [
        ...node.querySelectorAll<HTMLElement>(
          'button, input, [href], [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => !el.hasAttribute("disabled"));

    focusable()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, []);

  /* The page behind must not scroll while the sheet is up. */
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 mx-auto flex w-(--container-frame) items-end bg-black/60">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${searchId}-title`}
        className="flex max-h-[75%] w-full flex-col overflow-clip rounded-tl-4xl rounded-tr-4xl bg-base-white pb-3xl shadow-drop-normal"
      >
        {/* Drag handle — decorative here; the sheet is dismissed by choosing
            a city, or Escape once one is already set. */}
        <div aria-hidden className="flex justify-center px-xl py-lg">
          <span className="h-1 w-10 rounded-full bg-gray-light-mode-100" />
        </div>

        <div className="flex flex-col gap-xl px-xl">
          <div className="flex flex-col gap-xl">
            <p className="flex items-center gap-xs">
              <IconLocation06 className="size-4 shrink-0 text-textcolor-grey-900-primary" />
              <span
                id={`${searchId}-title`}
                className="m-title-m-semibold text-textcolor-grey-900-primary"
              >
                Select Your City
              </span>
            </p>
            <span aria-hidden className="h-px w-full bg-border-secondary" />
          </div>

          <label
            htmlFor={searchId}
            className="flex items-center gap-md rounded-xl border border-gray-light-mode-50 bg-base-white px-xl py-lg shadow-elevation-2"
          >
            <IconSearch01 className="size-5 shrink-0 text-textcolor-blue-600" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search city"
              autoComplete="off"
              className="m-body-m-regular min-w-0 flex-1 bg-transparent text-textcolor-grey-900-primary outline-none placeholder:text-textcolor-grey-500-disabled"
            />
          </label>
        </div>

        {/* Only the lists scroll, so the title and search stay reachable. */}
        <div className="mt-xl flex min-h-0 flex-1 flex-col gap-xl overflow-y-auto px-xl">
          {popular.length > 0 && (
            <section className="flex flex-col gap-md">
              <h2 className="m-title-m-medium text-textcolor-grey-700-secondary">
                Popular Cities
              </h2>
              {/* Four per row, matching the frame; a filtered result may be
                  shorter, so the row is a grid rather than space-between. */}
              <ul className="grid grid-cols-4 gap-y-xl">
                {popular.map((city) => (
                  <li key={city.name} className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => onSelect(city.name)}
                      className="flex w-[72px] flex-col items-center justify-center gap-xs rounded-md"
                    >
                      <Image
                        src={city.icon}
                        alt=""
                        width={Math.round(city.width)}
                        height={Math.round(city.height)}
                        style={{
                          width: `${city.width}px`,
                          height: `${city.height}px`,
                        }}
                      />
                      <span className="m-body-s-regular text-center text-textcolor-grey-700-secondary">
                        {city.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {others.length > 0 && (
            <section className="flex flex-col gap-md">
              <h2 className="m-title-m-medium text-textcolor-grey-700-secondary">
                Other Cities
              </h2>
              <ul className="flex flex-col">
                {others.map((city) => (
                  <li key={city}>
                    <button
                      type="button"
                      onClick={() => onSelect(city)}
                      className="m-body-m-regular flex w-full items-center border-b border-border-secondary py-xl text-left text-textcolor-grey-900-primary"
                    >
                      {city}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {empty && (
            <p
              role="status"
              className="m-body-m-regular py-xl text-textcolor-grey-500-disabled"
            >
              No cities match “{query.trim()}”.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
