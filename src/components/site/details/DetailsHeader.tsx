import Link from "next/link";
import { IconArrowLeft02, IconCall } from "@/components/icons/header";

/**
 * Program details top bar — Figma node 1050:14797, 360x48.
 *
 * Deliberately NOT the homepage Header: this one is 48px rather than 64,
 * carries the programme name instead of the city, and drops the wallet.
 */
export function DetailsHeader({ title }: { title: string }) {
  return (
    <header className="flex h-12 w-full shrink-0 items-center justify-between bg-base-white px-xl py-lg">
      <div className="flex min-w-0 items-center gap-lg">
        <Link href="/" aria-label="Back" className="shrink-0">
          <IconArrowLeft02 className="size-6 text-textcolor-grey-900-primary" />
        </Link>
        <p className="m-title-m-semibold truncate text-textcolor-grey-900-primary">
          {title}
        </p>
      </div>
      <a href="tel:" aria-label="Call us" className="shrink-0">
        <IconCall className="size-6 text-textcolor-grey-900-primary" />
      </a>
    </header>
  );
}
