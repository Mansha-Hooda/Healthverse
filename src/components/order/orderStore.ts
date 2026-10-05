/**
 * The most recent order, remembered so the landing page can show its track
 * strip. Same shape as cityStore: a tiny localStorage-backed store read
 * through useSyncExternalStore, which keeps the read out of an effect.
 */

export const ORDER_STORAGE_KEY = "healthverse.order";

/** A programme slug, `null` for no order, `undefined` before storage is read. */
export type OrderValue = string | null | undefined;

const listeners = new Set<() => void>();
let cached: OrderValue;
let read = false;

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): OrderValue {
  if (!read) {
    try {
      cached = localStorage.getItem(ORDER_STORAGE_KEY) || null;
    } catch {
      cached = null;
    }
    read = true;
  }
  return cached;
}

/** Nothing is decided on the server, so the strip renders nowhere. */
export function getServerSnapshot(): OrderValue {
  return undefined;
}

export function setOrder(slug: string) {
  try {
    localStorage.setItem(ORDER_STORAGE_KEY, slug);
  } catch {
    /* Private mode; the strip simply will not survive a reload. */
  }
  cached = slug;
  read = true;
  listeners.forEach((listener) => listener());
}

export function clearOrder() {
  try {
    localStorage.removeItem(ORDER_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  cached = null;
  read = true;
  listeners.forEach((listener) => listener());
}
