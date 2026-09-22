import type { Metadata, Viewport } from "next";
import { Lexend_Deca, Lora } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className={`${lexendDeca.variable} ${lora.variable} h-full`}>
      <body className="min-h-full bg-bg-secondary text-text-primary">
        {/* Locked to a fixed 360px mobile frame. Centring it on a tinted
            backdrop keeps the frame edges visible when reviewing on a desktop
            screen. Responsive breakpoints come later. */}
        <div className="mx-auto min-h-screen w-(--container-frame) bg-bg-primary">
          {children}
        </div>
      </body>
    </html>
  );
}
