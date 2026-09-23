# Healthverse — component reference

A map of how this page is built, written for editing it in **v0 by Vercel**.

Source of truth for the design is the Figma file
*Health Verse Revamp_Jan25*, page frame `1050:6678` (360 × 2077). Every
component below records the Figma node it came from.

---

## 1. Rules — paste this into v0 before asking for changes

> This project uses the MediBuddy **Mozaic** design system. All colour,
> spacing, radius and type values come from CSS tokens defined in
> `src/app/globals.css` under `@theme`. Never write a raw hex code, a raw
> `px` value, or a default Tailwind colour (`gray-500`, `blue-600`, …).
> Use the token utilities listed in the token tables below.
>
> The page is locked to a **fixed 360px frame** and is deliberately **not
> responsive**. Do not add `sm:` / `md:` / `lg:` variants, and do not change
> the frame width.
>
> Lexend Deca is the product typeface. Lora is used **only** for marketing
> headings via `.marketing-heading-5` — never for body or UI text.
>
> If a value you need has no token, stop and ask rather than inventing one.

**Why so strict:** the accent ramps in MediBuddy's skills disagree with each
other, and the Figma file carries legacy variable collections alongside
current ones. The tokens in `globals.css` are the reconciled set. Improvising
a colour reintroduces the drift this build exists to avoid.

---

## 2. Stack

| | |
|---|---|
| Framework | Next.js 16, App Router, Turbopack |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`) |
| Fonts | `next/font/google` — Lexend Deca (product), Lora (marketing headings) |
| Images | `next/image` |

All section components are **server components**. Only `Header` would need
`"use client"` if interactivity is added; nothing is client-side today.

---

## 3. Tokens — the vocabulary to use

Defined in `src/app/globals.css`. Tailwind generates utilities from them.

### Colour

Semantic tokens (prefer these):

| Utility | Token | Value |
|---|---|---|
| `text-text-primary` | Gray-900 | `#252D38` |
| `text-text-secondary` | Gray-700 | `#47566A` |
| `text-text-on-brand` | White | `#FFFFFF` |
| `text-brand` / `bg-bg-brand` | Blue-600 | `#0066DC` |
| `bg-bg-primary` | White | `#FFFFFF` |
| `bg-bg-secondary` | Gray-25 | `#F5F7F8` |
| `bg-bg-brand-subtle` | Blue-25 | `#F1F7FF` |
| `border-border-primary` | Gray-200 | `#BFC8D2` |
| `text-error` / `text-success` / `text-warning` | Red-500 / Green-600 / Yellow-600 | |

Full ramps are also available as `{bg,text,border}-<hue>-<step>` for
**gray, blue, red, green, yellow, orange, cyan, purple, pink** at steps
`25 · 50 · 100 · 200 · 300 · 400 · 500 · 600 · 700 · 800 · 900 · 950`.

### Spacing — `p-*`, `m-*`, `gap-*`, etc.

| Token | px | | Token | px |
|---|---|---|---|---|
| `none` | 0 | | `3xl` | 24 |
| `xxs` | 2 | | `4xl` | 32 |
| `xs` | 4 | | `5xl` | 40 |
| `sm` | 6 | | `6xl` | 48 |
| `md` | 8 | | `7xl` | 64 |
| `lg` | 12 | | `8xl` | 80 |
| `xl` | 16 | | `9xl` | 96 |
| `2xl` | 20 | | `10xl` / `11xl` | 128 / 160 |

Example: `px-xl` = 16px, `gap-md` = 8px, `pt-4xl` = 32px.

### Radius — `rounded-*`

`none` 0 · `xxs` 2 · `xs` 4 · `sm` 6 · `md` 8 · `lg` 10 · `xl` 12 ·
`2xl` 16 · `3xl` 20 · `4xl` 24 · **`5xl` 32** · `full`

### Elevation — `shadow-*`

| Utility | Use |
|---|---|
| `shadow-figma-elevation-1` | **Header and cards.** The value this design actually uses. |
| `shadow-figma-xs` | Outlined buttons |
| `drop-shadow-figma-xs` | The "Details" affordance (filter, not box-shadow) |
| `shadow-elevation-1` … `shadow-elevation-4` | Mozaic's own scale — see the warning below |

> ⚠️ **`shadow-elevation-1` and `shadow-figma-elevation-1` are different
> shadows with confusingly similar names.** Mozaic's is heavier. This build
> uses the **Figma** one everywhere. Reach for `shadow-figma-elevation-1`.

### Type

Size and weight are separate — combine a size class with `font-medium` /
`font-semibold` / `font-bold`.

| Class | Size / line-height | Use |
|---|---|---|
| `display-2xl` … `display-xs` | 72/90 → 24/32, −2% tracking | Display headings |
| `text-style-xl` | 20 / 30 | |
| `text-style-lg` | 18 / 28 | |
| `text-style-md` | 16 / 24 | Section headings, button labels |
| `text-style-sm` | 14 / 20 | Body, card text |
| `text-style-xs` | 12 / 18 | |
| `text-caption-md` | 10 / 16 | Micro labels only — below Mozaic's floor |
| `marketing-heading-5` | 20 / 1.35, **Lora** | Marketing hero only |

### Layout

`w-(--container-frame)` = 360px (the page frame).

---

## 4. File map

```
src/
  app/
    layout.tsx          Fonts, metadata, the fixed 360px frame
    page.tsx            Section composition — edit to reorder/add sections
    globals.css         ALL tokens live here
  components/
    brand/logos.tsx     MediBuddyLogo, MediBuddyLogoWhite
    icons/
      header.tsx        IconArrowLeft, IconLocation, IconCall, IconWallet
      programs.tsx      IconArrowRight
    site/
      Header.tsx          section 1
      Hero.tsx            section 2
      FeaturedPrograms.tsx section 3 (content + layout)
      programs/
        ProgramCard.tsx   one program card
        constants.ts      card geometry, themes, artwork positions
public/programs/        Partner logos and photos
figma-assets/           Raw Figma SVG exports (icon source of truth)
scripts/                Asset generators — see §7
```

`src/app/page.tsx` is the composition root:

```tsx
<Header />
<main>
  <Hero />
  <FeaturedPrograms />
  {/* new sections append here, in Figma order */}
</main>
```

---

## 5. Sections

### `Header` — `src/components/site/Header.tsx`
Figma `1061:19797` · 360 × 64

```tsx
<Header location="Bangalore" walletBalance="4529" />
```

| Prop | Type | Default |
|---|---|---|
| `location` | `string` | `"Bangalore"` |
| `walletBalance` | `string` | `"4529"` |

Layout: `flex h-16 items-center justify-between px-xl py-md shadow-figma-elevation-1`.
Left is back arrow + location pin + label; right is the wallet (with an
overlapping balance badge) and a call link.

The 28px device status bar shown above this in Figma is **intentionally not
built** — a web page cannot render a real status bar.

The wallet group is a fixed `w-[2.875rem]` (46px) so the 16px gap to the call
icon is measured from the badge's right edge, as in Figma.

### `Hero` — `src/components/site/Hero.tsx`
Figma `1050:6680` · 328 × 99 inside a 16px gutter

```tsx
<Hero heading="Start Your Fitness Journey with Healthverse" />
```

Asymmetric corners `rounded-tl-md rounded-tr-5xl rounded-br-md rounded-bl-5xl`
(8 / 32 / 32 / 8) over `bg-linear-45/srgb from-cyan-900 to-cyan-700`.

Two things to preserve when editing:
- **`/srgb`** pins gradient interpolation to match Figma. Tailwind v4 defaults
  to oklab, which shifts the midtones even with identical stops.
- The heading uses `marketing-heading-5` (**Lora**). This is the only place
  Lora appears.

### `FeaturedPrograms` — `src/components/site/FeaturedPrograms.tsx`
Figma `1050:6683` · 328 × 702

Takes no props; content is the `PROGRAMS` array at the top of the file. To
change copy or pricing, edit that array. Renders a heading, three
`ProgramCard`s, and a See All button.

### `ProgramCard` — `src/components/site/programs/ProgramCard.tsx`
Figma `1051:8957` · 328 × 186

```tsx
<ProgramCard
  theme="cyan"                       // "cyan" | "pink" | "purple"
  partner={{ logo: { src, width, height, alt }, tier: "Pro" }}
  name="Cult Pro + OnePass"
  duration="12 months"
  price="₹9,297 (including taxes)"
  art={ART_CULT}                     // ART_CULT | ART_FITPASS
  partnerOffset={0.44}
  href="#"
/>
```

`theme` drives the banner gradient, border, diamond motif and artwork
backdrop together. Adding a fourth theme means adding an entry to **every**
map in `constants.ts` — the class strings there are written out in full so
Tailwind can see them; they cannot be built by string concatenation or the
utilities get purged.

---

## 6. Patterns worth knowing before you edit

**Strokes use inset rings, not borders.** Figma draws strokes *inside* the
frame. A CSS `border` adds to an auto height, which made cards 188px instead
of 186 and the button 46px instead of 44. Cards and outlined buttons use
`inset-ring-1 inset-ring-<colour>`. Keep it that way, or heights drift.
(Tailwind v4 spells this `inset-ring-*`; `ring-inset` is v3 syntax and does
nothing here.)

**The card artwork is a rotated clip, not a mask image.** Figma models it as
a mask group — a rounded square rotated −45° clipping the photo. Figma's CSS
export emits an *axis-aligned* `mask-image` and drops the rotation, rendering
the photo as a plain rectangle. It is rebuilt as a rotated `overflow-hidden`
frame with the photo counter-rotated back upright inside. `photo.offset` in
`constants.ts` is the photo's position inside that counter-rotated frame:

```
offset = bannerPosition − frameCentre + frameSize / 2
```

If you move the artwork, recompute the offset — don't eyeball it.

**Fractional pixel values in `constants.ts` are deliberate.** They position
decorative artwork inside a clipped 312 × 106 banner where rounding visibly
shifts the composition. Everything the user reads still uses tokens.

**"Figma extensions" block in `globals.css`.** Values the Figma file
specifies that Mozaic has no token for, kept in one reviewable list:
`--radius-5xl` (32px), `--shadow-figma-elevation-1`, `--shadow-figma-xs`,
`--drop-shadow-figma-xs`, plus `.text-caption-md` and `.marketing-heading-5`.
Add here — not inline — if another genuinely unavoidable value appears.

**`next/image` lazy-loads.** Screenshots taken immediately after an edit can
show cards with missing photos. Scroll and let it settle before judging.

---

## 7. Assets

Icons and logos are **generated, not hand-written** — path data is copied
verbatim from source so it can't drift.

| Script | Produces | Source |
|---|---|---|
| `scripts/build-figma-icons.py` | `src/components/icons/*.tsx` | `figma-assets/*.svg` |
| `scripts/extract-mozaic-assets.py` | `src/components/brand/logos.tsx` | mb-design-system skill |

```bash
python3 scripts/build-figma-icons.py
MB_SKILL_DIR=<path-to-mb-design-system> python3 scripts/extract-mozaic-assets.py
```

To add an icon: export the SVG from Figma into `figma-assets/`, add an entry
to `GROUPS` in `build-figma-icons.py`, re-run. Icons emit `currentColor`, so
colour them with a token at the call site (`text-text-primary`).

Figma asset URLs expire after ~7 days, which is why the exports are committed.

Photos and partner logos live in `public/programs/` and are referenced by path.

---

## 8. Adding the next section

1. Get the Figma node's spec; map every value to a token in §3.
2. Build `src/components/site/<Name>.tsx`. Sub-parts go in a folder beside it
   (see `programs/`).
3. Render it in `src/app/page.tsx`, in Figma order.
4. Verify measured geometry against the Figma frame, not by eye.

**Sections already signed off — `Header`, `Hero`, `FeaturedPrograms` — should
not be modified while building a new one.** Changes to them are made only
when explicitly requested.

Remaining, in order: Browse by Brands `1050:6778` · How It Works `1050:6818` ·
FAQ `1050:6950` · Footer `1050:6958`.
