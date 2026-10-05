"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { IconLocation06 } from "@/components/icons/header";
import { IconSearch01 } from "@/components/icons/how-it-works";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { OTHER_CITIES, POPULAR_CITIES } from "./constants";

type CitySheetProps = {
  onSelect: (city: string) => void;
  /** Omitted while no city is chosen yet, which makes the sheet mandatory. */
  onDismiss?: () => void;
  /**
   * Close when the backdrop is clicked. Opt-in: the landing page's sheet is
   * a gate, so tapping past it there must not dismiss it.
   */
  dismissOnOutsideClick?: boolean;
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
export function CitySheet({
  onSelect,
  onDismiss,
  dismissOnOutsideClick = false,
}: CitySheetProps) {
  const [query, setQuery] = useState("");
  const searchId = useId();

  const popular = useMemo(
    () => POPULAR_CITIES.filter((city) => matches(city.name, query)),
    [query],
  );
  const others = useMemo(
    () => OTHER_CITIES.filter((city) => matches(city.name, query)),
    [query],
  );
  const empty = popular.length === 0 && others.length === 0;

  return (
    <BottomSheet
      labelledBy={`${searchId}-title`}
      onDismiss={onDismiss}
      dismissOnOutsideClick={dismissOnOutsideClick}
    >
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
                  <li key={city.name}>
                    {city.programs === null ? (
                      /* Not served yet: a plain row rather than a disabled
                         button, since there is nothing to activate. Left
                         readable so screen readers still announce it. */
                      <div className="flex w-full items-center justify-between border-b border-border-secondary pt-md pb-xl">
                        <span className="m-body-m-regular text-textcolor-grey-500-disabled">
                          {city.name}
                        </span>
                        <span className="m-label-s-medium rounded-xl bg-gray-light-mode-50 px-[0.625rem] py-xs text-textcolor-grey-700-secondary">
                          Coming Soon
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelect(city.name)}
                        className="flex w-full items-center justify-between border-b border-border-secondary pt-md pb-xl text-left"
                      >
                        <span className="m-body-m-regular text-textcolor-grey-900-primary">
                          {city.name}
                        </span>
                        {/* The Sep26 sheet (1172:40186) replaced the programme
                            count with a plain availability tag, mirroring the
                            Coming Soon one. `programs` still carries the count
                            — it is simply no longer shown. */}
                        <span className="m-label-s-medium rounded-xl bg-success-100 px-[0.625rem] py-xs text-textcolor-green-700">
                          Available
                        </span>
                      </button>
                    )}
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
    </BottomSheet>
  );
}
