import type { Metadata, Viewport } from "next";
import { Lexend_Deca, Lora } from "next/font/google";
import { CITY_STORAGE_KEY } from "@/components/city/constants";
import "./globals.css";

/* Runs before first paint, so a returning visitor never sees the city gate.
   The gate is rendered by default — it has to be, or the landing page would
   be usable until hydration — and this marks the document so CSS can hide it
   for anyone who has already chosen. Deliberately not a module: a deferred
   script would run after paint and the flash would be back. */
const CITY_FLAG = `try{if(localStorage.getItem(${JSON.stringify(
  CITY_STORAGE_KEY,
)}))document.documentElement.dataset.hasCity="1"}catch(e){}`;

/* Lexend Deca is MediBuddy's product typeface — everything UI and body copy.
   next/font self-hosts it, so there is no render-blocking request to Google.
   It ships as a variable font, so no `weight` is declared — the axis covers
   400/500/600/700. */
const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  display: "swap",
});

/* Lora carries the marketing headings only (Figma's
   `Marketing/Mobile/Heading5-Semibold` style). It is deliberately NOT exposed
   as a body or UI face — Mozaic still governs everything else. */
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Healthverse",
  description: "Healthverse by MediBuddy",
};

export const viewport: Viewport = {
  width: 360,
  themeColor: "#0066dc",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lexendDeca.variable} ${lora.variable} h-full`}
      /* CITY_FLAG sets data-has-city before hydration; that is the point. */
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: CITY_FLAG }} />
      </head>
      <body className="min-h-full bg-gray-light-mode-25 text-textcolor-grey-900-primary">
        {/* Locked to a fixed 360px mobile frame. Centring it on a tinted
            backdrop keeps the frame edges visible when reviewing on a desktop
            screen. Responsive breakpoints come later. */}
        <div className="mx-auto flex min-h-screen w-(--container-frame) flex-col bg-base-white">
          {children}
        </div>
      </body>
    </html>
  );
}
