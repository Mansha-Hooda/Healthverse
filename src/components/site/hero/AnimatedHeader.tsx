import { IconArrowLeft02, IconCall, IconLocation06 } from "@/components/icons/header";
import { IconCheckmarkBadge02 } from "@/components/icons/hero-animated";
import {
  BACKGROUND,
  BADGE,
  FRAME_HEIGHT,
  HERO_WORD,
  OBJECTS,
  PROOFS,
  RING,
  TAG_ROTATION,
  TAGS,
} from "./heroSpec";

type AnimatedHeaderProps = {
  /** City shown beside the location pin. */
  location?: string;
  /** When given, the location becomes a button that reopens the city sheet. */
  onSelectLocation?: () => void;
};

/** Figma binds each tag to a different 100-step. */
const TAG_BACKGROUND: Record<string, string> = {
  "yellow-100": "bg-yellow-100",
  "success-100": "bg-success-100",
  "warning-100": "bg-warning-100",
  "pink-100": "bg-pink-100",
};

/**
 * Animated header — Figma node 1208:3049, 360x367.
 *
 * A 16-second loop in four equal phases. Each phase brings in one tag word,
 * one supporting line and four badges that fly in, overshoot and settle,
 * while the ring turns once behind them. Reading one phase gives a sentence:
 * "GENUINE programs / Directly from cult.fit, FITPASS and more".
 *
 * The motion is pure CSS, generated into hero-animation.css by
 * scripts/build-hero-animated.py from Figma's own keyframe data. Nothing
 * here is timed in JavaScript, so the loop survives hydration and runs with
 * scripting off. Each `.hv-*` class carries that element's keyframes.
 *
 * Figma's frame is 360x395; the top 28px is a device status bar, omitted for
 * the reason Header.tsx gives. Everything below it keeps its Figma geometry,
 * which is why the children are absolutely positioned from a spec file
 * rather than laid out in flow — the composition is artwork, not a document.
 */
export function AnimatedHeader({
  location = "Bangalore",
  onSelectLocation,
}: AnimatedHeaderProps) {
  const locationContent = (
    <>
      <IconLocation06 className="size-4 shrink-0" />
      <span className="m-title-m-semibold">{location}</span>
    </>
  );

  return (
    <header
      className="relative w-(--container-frame) overflow-clip text-base-white"
      style={{ height: FRAME_HEIGHT, background: BACKGROUND }}
    >
      {/* --- decorative layer, back to front ------------------------------ */}

      {/* Figma 1208:3053. One turn per loop. */}
      <svg
        aria-hidden
        className="hv-ring absolute"
        style={{ left: RING.left, top: RING.top }}
        width={RING.size}
        height={RING.size}
        viewBox={`0 0 ${RING.size} ${RING.size}`}
        fill="none"
      >
        <circle
          cx={RING.size / 2}
          cy={RING.size / 2}
          r={RING.outer.r}
          stroke="currentColor"
          strokeOpacity={RING.outer.opacity}
          strokeWidth={RING.outer.width}
        />
        <circle
          cx={RING.size / 2}
          cy={RING.size / 2}
          r={RING.inner.r}
          stroke="currentColor"
          strokeOpacity={RING.inner.opacity}
          strokeWidth={RING.inner.width}
        />
        <circle
          cx={RING.dot.cx}
          cy={RING.dot.cy}
          r={RING.dot.r}
          fill="currentColor"
          fillOpacity={RING.dot.opacity}
        />
      </svg>

      <p
        className="absolute flex items-center"
        style={{ left: BADGE.left, top: BADGE.top, gap: BADGE.gap }}
      >
        {/* size-4 is BADGE.iconSize; the generated icons take a class, not
            a style, so the value is spelled rather than threaded through. */}
        <IconCheckmarkBadge02 className="size-4 shrink-0" />
        <span className="m-title-m-semibold uppercase">{BADGE.text}</span>
      </p>

      {/* Every phase spells one claim about the same noun, and only one is
          on screen at a time. Announcing the live one would mean timing the
          DOM to the animation; announcing all four at once would read as
          nonsense. So the visible artwork is hidden from assistive tech and
          the whole proposition is stated once, in order, here. */}
      <h1 className="sr-only">
        {TAGS.map((tag) => tag.text.toLowerCase()).join(", ")} {HERO_WORD.text}
      </h1>
      <ul className="sr-only">
        {TAGS.map((tag, index) => (
          <li key={tag.id}>
            {tag.text.toLowerCase()} {HERO_WORD.text} — {PROOFS[index].text}
          </li>
        ))}
      </ul>

      {PROOFS.map((proof) => (
        <p
          key={proof.id}
          aria-hidden
          className={`hv-proof-${proof.id} m-title-m-semibold absolute text-center`}
          style={{ left: proof.left, top: proof.top, width: proof.width }}
        >
          {proof.text}
        </p>
      ))}

      {TAGS.map((tag) => (
        <p
          key={tag.id}
          aria-hidden
          className={`hv-tag-${tag.id} hero-tag-bold absolute flex items-center justify-center text-textcolor-grey-900-primary ${TAG_BACKGROUND[tag.token]}`}
          style={{
            left: tag.left,
            top: tag.top,
            width: tag.width,
            height: tag.height,
            rotate: `${TAG_ROTATION}deg`,
            borderRadius: 6,
            boxShadow: "var(--shadow-hero-tag)",
          }}
        >
          {tag.text}
        </p>
      ))}

      <p
        aria-hidden
        className="hero-word-bold absolute text-center"
        style={{
          left: HERO_WORD.left,
          top: HERO_WORD.top,
          width: HERO_WORD.width,
          textShadow: HERO_WORD.shadow,
        }}
      >
        {HERO_WORD.text}
      </p>

      {/* Plain <img>, not next/image: these are decorative, already cut to
          exactly 3x their drawn size, and must not lazy-load — they sit
          above the fold and would otherwise pop in mid-animation. */}
      {OBJECTS.map((object) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={object.id}
          src={`/hero/object-${object.icon}.webp`}
          alt=""
          aria-hidden
          decoding="async"
          width={Math.round(object.width)}
          height={Math.round(object.height)}
          className={`hv-object${object.id} absolute`}
          style={{
            left: object.left,
            top: object.top,
            width: object.width,
            height: object.height,
          }}
        />
      ))}

      {/* --- navigation, above the artwork -------------------------------- */}
      {/* White on the gradient, and without the wallet the white header
          carries — this is the nav as node 1208:3643 draws it, not a restyle
          of Header.tsx, which is left untouched for the other screens. */}
      <nav className="absolute inset-x-0 top-0 flex h-16 items-center justify-between px-xl py-md">
        <div className="flex items-center gap-md">
          <button
            type="button"
            aria-label="Go back"
            className="flex size-6 items-center justify-center"
          >
            <IconArrowLeft02 className="size-6" />
          </button>

          {onSelectLocation ? (
            <button
              type="button"
              onClick={onSelectLocation}
              aria-label={`Change city, currently ${location}`}
              className="flex items-center gap-xs"
            >
              {locationContent}
            </button>
          ) : (
            <p className="flex items-center gap-xs">{locationContent}</p>
          )}
        </div>

        <a
          href="tel:+918047183456"
          aria-label="Call support"
          className="flex size-6 items-center justify-center"
        >
          <IconCall className="size-6" />
        </a>
      </nav>
    </header>
  );
}
