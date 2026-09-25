import { CITY_STORAGE_KEY } from "./constants";

/**
 * The selected city, held outside React so it can be read with
 * `useSyncExternalStore`.
 *
 * Reading localStorage in an effect and calling setState is the obvious
 * approach but React forbids it, and it also flashes the sheet at returning
 * visitors before the stored value lands. An external store avoids both: the
 * server snapshot is `undefined` ("not known yet"), so the sheet is withheld
 * until the client reports a real value of `string | null`.
 */

/** `undefined` = not yet read; `null` = read, and no city chosen. */
export type CityValue = string | null | undefined;

let value: CityValue;
let hasRead = false;
const listeners = new Set<() => void>();

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): CityValue {
  // Cached, because React calls this repeatedly and expects a stable result.
  if (!hasRead) {
    try {
      value = window.localStorage.getItem(CITY_STORAGE_KEY);
    } catch {
      // Private browsing or blocked storage: behave as if nothing was saved.
      value = null;
    }
    hasRead = true;
  }
  return value;
}

export function getServerSnapshot(): CityValue {
  return undefined;
}

export function setCity(next: string) {
  value = next;
  hasRead = true;
  try {
    window.localStorage.setItem(CITY_STORAGE_KEY, next);
  } catch {
    // Not fatal — the choice just will not survive a reload.
  }
  listeners.forEach((listener) => listener());
}
