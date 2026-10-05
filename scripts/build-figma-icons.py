#!/usr/bin/env python3
"""
Converts Figma-exported SVGs into inline React icon components.

Figma asset URLs expire after ~7 days, so the exported SVGs are committed
under `figma-assets/` and this script regenerates the components from them.
Path data is never hand-transcribed — it is copied verbatim from the export.

Two icon shapes are handled:

  simple    — one exported SVG, used as-is.
  composed  — Figma split one glyph across several exports, each absolutely
              positioned inside the icon box. Each fragment becomes a nested
              <svg> placed at its computed offset, which is geometrically
              equivalent to Figma's absolute-inset layout.

Usage:
    python3 scripts/build-figma-icons.py
"""

import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
ASSETS = os.path.join(ROOT, "figma-assets")
OUT_DIR = os.path.join(ROOT, "src", "components", "icons")

# Both greys in the exported header assets collapse to
# textcolor/Grey 900 - Primary (#252D38), per an explicit decision: the Figma
# file carries #2E3742 in a legacy collection, and the handoff annotation
# specifies #252D38. Emitting currentColor lets each call site supply the
# token instead.
INHERIT = ("#252D38", "#2E3742", "#1CA6C1", "#0066DC", "#141B34")

# Multi-coloured icons cannot collapse to a single currentColor, but their
# colours still have tokens — emit var() so the palette stays single-sourced.
TOKENED = {
    "#F1F8F5": "--color-success-50",
    "#0F7A48": "--color-textcolor-green-700",
    "#F1F7FF": "--color-brand-blue-25",
    "#004FB6": "--color-brand-blue-700",
}

BOX = 24.0  # every header icon box, in px


def read(name):
    with open(os.path.join(ASSETS, name), encoding="utf-8") as fh:
        return fh.read()


def inner(svg):
    """Strip the outer <svg> wrapper, keeping only its children."""
    return re.sub(r"^<svg[^>]*>\s*|\s*</svg>\s*$", "", svg.strip(), flags=re.S)


def viewbox(svg):
    return re.search(r'viewBox="([^"]+)"', svg).group(1)


def jsxify(svg):
    """Rename hyphenated SVG attributes to the camelCase React expects.

    This was a hand-maintained list and it kept springing leaks — first
    `clip-path`, then `stroke-dasharray`, each surfacing only as a console
    error at runtime. Converting every hyphenated attribute instead closes
    the whole class. `data-`, `aria-` and namespaced attributes are the
    documented exceptions: React passes those through verbatim.
    """
    def camel(match):
        name = match.group(1)
        if name.startswith(("data-", "aria-", "xml", "xlink")):
            return match.group(0)
        head, *rest = name.split("-")
        return head + "".join(part.capitalize() for part in rest) + "="

    svg = re.sub(r"\b([a-z]+(?:-[a-z]+)+)=", camel, svg)
    # Drop Figma's layer ids — they collide once several icons share a page.
    svg = re.sub(r'\sid="[^"]*"', "", svg)
    return svg


def recolor(svg, extra=()):
    for colour in INHERIT + tuple(extra):
        svg = svg.replace(colour, "currentColor").replace(colour.lower(), "currentColor")
    return svg


def indent(text, pad):
    return "\n".join(pad + line for line in text.splitlines())


def simple(file):
    svg = read(file)
    return viewbox(svg), recolor(jsxify(inner(svg)))


def tokenise(svg):
    for value, token in TOKENED.items():
        for form in (value, value.lower()):
            svg = svg.replace(f'"{form}"', f'"var({token})"')
    return svg


def simple_tokened(file):
    """For multi-coloured icons: each colour becomes its design token."""
    svg = read(file)
    return viewbox(svg), tokenise(jsxify(inner(svg)))


def simple_inherit_brand(file):
    """For glyphs drawn in brand-blue/700 that should take their call site's
    colour — the plan-detail icons keep theirs as a token, so #004FB6 cannot
    simply go in INHERIT."""
    svg = read(file)
    return viewbox(svg), recolor(jsxify(inner(svg)), extra=("#004FB6",))


def simple_on_dark(file):
    """For icons drawn in literal `white` because they sit on a dark surface.

    `white` is NOT in INHERIT: the wallet icon uses it as a genuine knockout
    fill that must stay white whatever the icon colour is.
    """
    svg = read(file)
    return viewbox(svg), recolor(jsxify(inner(svg)), extra=("white",))


def composed(fragments):
    """Place each fragment at the offset implied by its Figma inset.

    `inset` is (top, right, bottom, left) as percentages of the icon box, taken
    straight from the Figma output. Width/height come from the fragment's own
    viewBox, so only the origin needs deriving.
    """
    parts = []
    for file, (top, _right, _bottom, left) in fragments:
        svg = read(file)
        width, height = viewbox(svg).split()[2:]
        x = round(left / 100 * BOX, 4)
        y = round(top / 100 * BOX, 4)
        body = recolor(jsxify(inner(svg)))
        parts.append(
            f'<svg x="{x}" y="{y}" width="{width}" height="{height}" '
            f'viewBox="0 0 {width} {height}" overflow="visible">\n'
            + indent(body, "  ")
            + "\n</svg>"
        )
    return f"0 0 {BOX:g} {BOX:g}", "\n".join(parts)


# Grouped per section so each section owns its icon module and earlier,
# signed-off sections never need their imports rewritten.
GROUPS = {
    "header.tsx": (
        'header node 1061:19797',
        [
            ("IconArrowLeft02", simple, "arrow-left-02.svg"),
            ("IconLocation06", simple, "location-06.svg"),
            ("IconCall", simple, "call.svg"),
            (
                "IconMedsWallet",
                composed,
                [
                    ("wallet-p77486.svg", (9.52, 6.95, 13.38, 4.76)),
                    ("wallet-p77487.svg", (22.67, 8.90, 71.29, 6.90)),
                    ("wallet-p77488.svg", (37.38, 60.57, 27.95, 20.33)),
                    ("wallet-p77489.svg", (37.43, 55.24, 58.71, 20.33)),
                    ("wallet-p77490.svg", (45.62, 55.24, 50.48, 20.33)),
                    ("wallet-group.svg", (39.52, 0.48, 41.43, 66.19)),
                ],
            ),
        ],
    ),
    "programs.tsx": (
        "featured programs node 1050:6683",
        [
            ("IconArrowRight01", simple, "arrow-right-01.svg"),
        ],
    ),
    "faq.tsx": (
        "faq node 1050:6950",
        [
            ("IconChevronDown", simple, "chevron-down.svg"),
        ],
    ),
    "hero-animated.tsx": (
        "animated header node 1208:3049",
        [
            ("IconCheckmarkBadge02", simple_on_dark, "checkmark-badge-02.svg"),
        ],
    ),
    "reviews.tsx": (
        "user reviews node 1050:6778",
        [
            ("IconVerifiedBadge", simple_tokened, "verified-badge.svg"),
        ],
    ),
    "program-details.tsx": (
        "program details node 1050:14678",
        [
            ("IconPlanUnlimited", simple_tokened, "plan-unlimited.svg"),
            ("IconPlanCredits", simple_tokened, "plan-credits.svg"),
            ("IconPlanWorkout", simple_tokened, "plan-workout.svg"),
            ("IconPlanAtHome", simple_tokened, "plan-athome.svg"),
            ("IconArrowDown01", simple, "arrow-down-01.svg"),
        ],
    ),
    "buy-sheet.tsx": (
        "user details sheet node 1050:14266",
        [
            ("IconCancel01", simple, "cancel-01.svg"),
            ("IconAdd01", simple_inherit_brand, "add-01.svg"),
        ],
    ),
    "order.tsx": (
        "payment confirmation node 1050:15076",
        [
            ("IconSuccessBadge", simple_tokened, "success-badge.svg"),
            ("IconCheckmarkCircle02", simple, "checkmark-circle-02.svg"),
            ("IconHelpCircle", simple, "help-circle.svg"),
        ],
    ),
    "track-order.tsx": (
        "track order sheet node 1050:11965",
        [
            ("IconStatusDone", simple_tokened, "status-done.svg"),
            ("IconStatusPending", simple, "status-pending.svg"),
            ("IconDownload04", simple_inherit_brand, "download-04.svg"),
        ],
    ),
    "how-it-works.tsx": (
        "how it works node 1050:6818",
        [
            ("IconSearch01", simple, "search-01.svg"),
            ("IconCouponPercent", simple, "coupon-percent.svg"),
            ("IconInvoice01", simple, "invoice-01.svg"),
        ],
    ),
}

PREAMBLE = """// AUTO-GENERATED by scripts/build-figma-icons.py — do not edit by hand.
// Source: Figma "Health Verse Revamp_Jan25", {source}.
// Exported SVGs are committed under figma-assets/; re-run the script to rebuild.

export type IconProps = {{
  className?: string;
  /** Icons are decorative by default; pass a label to expose them to AT. */
  label?: string;
}};

function iconAria(label?: string) {{
  return label
    ? ({{ role: "img" as const, "aria-label": label }})
    : ({{ "aria-hidden": true as const, focusable: false as const }});
}}
"""


def main():
    if not os.path.isdir(ASSETS):
        sys.exit(f"missing {ASSETS} — commit the Figma exports there first")

    os.makedirs(OUT_DIR, exist_ok=True)
    for filename, (source, icons) in GROUPS.items():
        parts = [PREAMBLE.format(source=source)]
        for component, builder, spec in icons:
            view, body = builder(spec)
            parts.append(
                f"""
export function {component}({{ className, label }}: IconProps) {{
  return (
    <svg
      viewBox="{view}"
      fill="none"
      className={{className}}
      xmlns="http://www.w3.org/2000/svg"
      {{...iconAria(label)}}
    >
{indent(body, "      ")}
    </svg>
  );
}}
"""
            )
        blob = "".join(parts)
        target = os.path.join(OUT_DIR, filename)
        with open(target, "w", encoding="utf-8") as fh:
            fh.write(blob)
        print(f"wrote {os.path.relpath(target, ROOT)} ({len(blob):,} chars)")


main()
