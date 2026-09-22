import {
  IconArrowLeft,
  IconCall,
  IconLocation,
  IconWallet,
} from "@/components/icons/header";

type HeaderProps = {
  /** City shown beside the location pin. */
  location?: string;
  /** Wallet balance shown in the badge over the wallet icon. */
  walletBalance?: string;
};

/**
 * Top navigation — Figma node 1061:19797, 360x64.
 *
 * The 28px device status bar above this in the Figma frame is intentionally
 * not built: a web page cannot render a real status bar, and a mocked one
 * misleads on an actual device.
 */
export function Header({
  location = "Bangalore",
  walletBalance = "4529",
}: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between bg-bg-primary px-xl py-md shadow-elevation-1">
      <div className="flex items-center gap-md">
        <button
          type="button"
          aria-label="Go back"
          className="flex size-6 items-center justify-center text-text-primary"
        >
          <IconArrowLeft className="size-6" />
        </button>

        <p className="flex items-center gap-xs">
          <IconLocation className="size-4 shrink-0 text-text-primary" />
          <span className="text-style-sm font-semibold text-text-primary">
            {location}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-xl">
        {/* 46px wide: the 24px wallet plus the badge overlapping it by 12px.
            Sizing the group (rather than just the icon) keeps the 16px gap to
            the call icon measured from the badge's right edge, as in Figma. */}
        <button
          type="button"
          aria-label={`Wallet, balance ${walletBalance}`}
          className="relative flex h-6 w-[2.875rem] items-center text-text-primary"
        >
          <IconWallet className="size-6 shrink-0" />
          <span
            aria-hidden
            className="absolute -top-sm left-lg rounded-md border border-white bg-bg-brand px-[0.3125rem] py-px text-[0.625rem]/[0.875rem] font-semibold text-text-on-brand"
          >
            {walletBalance}
          </span>
        </button>

        <a
          href="tel:+918047183456"
          aria-label="Call support"
          className="flex size-6 items-center justify-center text-text-primary"
        >
          <IconCall className="size-6" />
        </a>
      </div>
    </header>
  );
}
