#!/usr/bin/env python3
"""
Composites the Featured Programs banner artwork at 3x.

Figma's MCP export only ever renders a node at its natural size — asking for
a larger image returns the same 312x106 bitmap — so a sharp banner cannot be
exported, it has to be rebuilt. Every ingredient is available at much higher
resolution than the banner needs (the photos are 705x523 and 1448x1086, the
logos 2000x753 and 3414x640), so the artwork is re-composited here at 3x and
downsampled by the browser.

Geometry is the same set of numbers the CSS implementation used, recovered
from git history (commit 0844e36^). Coordinates below are in 1x banner space
and scaled by SCALE on the way out.

Usage:
    python3 scripts/build-program-banners.py
"""

import os
import sys

from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, ".figma-ref", "programs")
FONTS = os.path.join(ROOT, ".figma-ref", "fonts")
OUT = os.path.join(ROOT, "public", "programs")

SCALE = 3
BANNER_W, BANNER_H = 312, 106
RADIUS = 8  # banner corner, radius-md

# Supersampling for rotated shapes: drawn large, rotated, then downsampled so
# the diagonal edges stay smooth.
SS = 4

WHITE = (255, 255, 255, 255)

THEMES = {
    "cyan": {"c100": "#d2f5fc", "c25": "#f4fdfe"},
    "pink": {"c100": "#fbd4ef", "c25": "#fef6fb"},
    "purple": {"c100": "#e4dafd", "c25": "#fafaff"},
}

GRADIENT_ANGLE = -64.81452619074028  # CSS deg
GRADIENT_STOPS = (0.024747, 0.49776)  # c100 -> c25

# left, top, tint%, rotation
DIAMONDS = [
    (-4.45, 31.59, 25, -45), (49.55, 49.55, 12, -45), (12.95, 49.55, 12, -45),
    (12.95, 87.33, 12, -45), (49.55, 12.96, 12, -45), (-21.72, 13.16, 20, -45),
    (-39, 31.59, 20, -45), (11.68, -26, 25, -45), (30.11, 31.59, 25, -45),
    (68.43, 30.67, 25, -44.77), (-21.72, 50.02, 25, -45), (-4.76, 68.44, 25, -45),
    (30.66, 68.44, 25, -45), (-4.45, -5.27, 25, -45), (12.83, 13.16, 25, -45),
    (30.11, -6.42, 25, -45),
]
DIAMOND_BOX = (30.565, 30.324)
DIAMOND_SIZE = 21.528
DIAMOND_RADIUS = 2.304

ART = {
    "cult": {
        # Rotated rounded square: colour backdrop and photo clip.
        "frame": dict(left=163.83, top=-50.45, box=207.496,
                      width=146.007, height=147.436, radius=22.844),
        # Photo rect in banner space, after the CSS inset is applied.
        "photo": dict(src="photo-cult.png", left=163.66, top=-20.95,
                      width=181.33, height=134.51),
    },
    "fitpass": {
        "frame": dict(left=167, top=-53, box=218,
                      width=153.399, height=154.9, radius=24),
        "photo": dict(src="photo-fitpass.png", left=155, top=-29,
                      width=216, height=162),
    },
}

# Partner block: the CSS sets left:15px, but the banner carries a 1px border
# and absolutely-positioned children are offset from the padding box, which
# the border insets — so it lands 16px from the frame edge. Confirmed by
# measurement: this region's mean error drops from 14.94 to 4.11 at 16px,
# while the photo and motif are already correct and get worse if shifted.
PARTNER_LEFT = 16
PARTNER_GAP = 4
LABEL = "By Partner"
LABEL_SIZE, LABEL_LINE = 10, 16          # m-label-s-semibold
TIER_SIZE, TIER_LINE = 14, 20            # m-title-m-medium
TEXT_PRIMARY = (37, 45, 56, 255)         # textcolor/Grey 900 - Primary

BANNERS = [
    dict(out="banner-cult-pro.webp", theme="cyan", art="cult",
         logo="cultfit-logo.png", logo_w=66.722, logo_h=25.121,
         tier="Pro", offset=0.44),
    dict(out="banner-fitpass.webp", theme="pink", art="fitpass",
         logo="fitpass-logo.png", logo_w=102.292, logo_h=16,
         tier=None, offset=0),
    dict(out="banner-cult-elite.webp", theme="purple", art="cult",
         logo="cultfit-logo.png", logo_w=66.722, logo_h=25.121,
         tier="Elite", offset=0.44),
]


def hex_rgb(value):
    value = value.lstrip("#")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def px(value):
    """1x banner units -> output pixels."""
    return value * SCALE


def gradient(size, angle_deg, start, end, stops):
    """CSS-equivalent linear-gradient.

    CSS measures the angle clockwise from 'to top', so the direction vector is
    (sin A, -cos A) in screen coordinates. The gradient line is centred on the
    box and long enough to cover it: |W sin A| + |H cos A|.
    """
    import math

    w, h = size
    a = math.radians(angle_deg)
    dx, dy = math.sin(a), -math.cos(a)
    length = abs(w * math.sin(a)) + abs(h * math.cos(a))
    cx, cy = w / 2, h / 2
    s0, s1 = stops

    img = Image.new("RGB", size)
    pixels = img.load()
    for y in range(h):
        for x in range(w):
            t = 0.5 + ((x - cx) * dx + (y - cy) * dy) / length
            t = (t - s0) / (s1 - s0)
            t = 0.0 if t < 0 else 1.0 if t > 1 else t
            pixels[x, y] = tuple(
                round(start[i] + (end[i] - start[i]) * t) for i in range(3)
            )
    return img


def rounded_layer(w, h, radius, fill, rotate=0.0):
    """A rounded rectangle, optionally rotated, antialiased via supersampling."""
    big = Image.new("RGBA", (max(1, round(w * SS)), max(1, round(h * SS))), (0, 0, 0, 0))
    ImageDraw.Draw(big).rounded_rectangle(
        [0, 0, big.width - 1, big.height - 1], radius=radius * SS, fill=fill
    )
    if rotate:
        big = big.rotate(-rotate, expand=True, resample=Image.BICUBIC)
    return big.resize(
        (max(1, round(big.width / SS)), max(1, round(big.height / SS))),
        Image.LANCZOS,
    )


def paste_centred(base, layer, centre):
    x = round(centre[0] - layer.width / 2)
    y = round(centre[1] - layer.height / 2)
    base.alpha_composite(layer, (x, y))


def load_font(weight, size):
    return ImageFont.truetype(
        os.path.join(FONTS, f"LexendDeca-{weight}.ttf"), round(px(size))
    )


def draw_line(canvas, text, font, left, line_top, line_height, fill):
    """Place text the way CSS does.

    A line box centres the font's em box — ascent plus descent — not the
    glyph bounding box, and the baseline sits an ascent below that. Centring
    the glyph box instead shifts text by a couple of pixels depending on
    which ascenders and descenders the string happens to contain.
    """
    ascent, descent = font.getmetrics()
    baseline = px(line_top) + (px(line_height) - (ascent + descent)) / 2 + ascent
    ImageDraw.Draw(canvas).text(
        (px(left), baseline), text, font=font, fill=fill, anchor="ls"
    )
    box = font.getbbox(text)
    return box[2] - box[0]


def build(spec):
    theme = THEMES[spec["theme"]]
    c100, c25 = hex_rgb(theme["c100"]), hex_rgb(theme["c25"])
    art = ART[spec["art"]]
    size = (px(BANNER_W), px(BANNER_H))

    # White base, so the area outside the rounded corners matches the card.
    canvas = Image.new("RGBA", size, WHITE)

    # Gradient, clipped to the banner's rounded rectangle.
    grad = gradient(size, GRADIENT_ANGLE, c100, c25, GRADIENT_STOPS).convert("RGBA")
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size[0] - 1, size[1] - 1], radius=px(RADIUS), fill=255
    )
    canvas.paste(grad, (0, 0), mask)

    # Diamond motif.
    for left, top, tint, rotation in DIAMONDS:
        layer = rounded_layer(
            px(DIAMOND_SIZE), px(DIAMOND_SIZE), px(DIAMOND_RADIUS),
            c100 + (round(255 * tint / 100),), rotation,
        )
        paste_centred(canvas, layer, (
            px(left) + px(DIAMOND_BOX[0]) / 2,
            px(top) + px(DIAMOND_BOX[1]) / 2,
        ))

    # Rotated rounded square: colour backdrop, then the photo clipped to it.
    frame = art["frame"]
    centre = (px(frame["left"] + frame["box"] / 2),
              px(frame["top"] + frame["box"] / 2))
    backdrop = rounded_layer(px(frame["width"]), px(frame["height"]),
                             px(frame["radius"]), c100 + (255,), -45)
    paste_centred(canvas, backdrop, centre)

    photo_spec = art["photo"]
    photo = Image.open(os.path.join(SRC, photo_spec["src"])).convert("RGBA")
    target = (round(px(photo_spec["width"])), round(px(photo_spec["height"])))
    # object-cover: fill the box, cropping the overflow.
    ratio = max(target[0] / photo.width, target[1] / photo.height)
    photo = photo.resize(
        (round(photo.width * ratio), round(photo.height * ratio)), Image.LANCZOS
    )
    photo = photo.crop((
        (photo.width - target[0]) // 2, (photo.height - target[1]) // 2,
        (photo.width - target[0]) // 2 + target[0],
        (photo.height - target[1]) // 2 + target[1],
    ))

    photo_layer = Image.new("RGBA", size, (0, 0, 0, 0))
    photo_layer.alpha_composite(
        photo, (round(px(photo_spec["left"])), round(px(photo_spec["top"])))
    )
    clip = Image.new("RGBA", size, (0, 0, 0, 0))
    paste_centred(clip, backdrop, centre)
    photo_layer.putalpha(
        Image.composite(photo_layer.getchannel("A"),
                        Image.new("L", size, 0), clip.getchannel("A"))
    )
    canvas.alpha_composite(photo_layer)

    # Re-clip to the banner radius, since the artwork overflows it.
    corners = Image.new("RGBA", size, WHITE)
    corners.paste(canvas, (0, 0), mask)
    canvas = corners

    # Banner stroke.
    ImageDraw.Draw(canvas).rounded_rectangle(
        [0, 0, size[0] - 1, size[1] - 1], radius=px(RADIUS),
        outline=c100 + (255,), width=SCALE,
    )

    # Partner block, vertically centred with the design's small nudge.
    block_h = LABEL_LINE + PARTNER_GAP + spec["logo_h"]
    block_top = BANNER_H / 2 - spec["offset"] - block_h / 2

    draw_line(canvas, LABEL, load_font(600, LABEL_SIZE),
              PARTNER_LEFT, block_top, LABEL_LINE, TEXT_PRIMARY)

    logo = Image.open(os.path.join(SRC, spec["logo"])).convert("RGBA")
    logo_box = (round(px(spec["logo_w"])), round(px(spec["logo_h"])))
    logo = logo.resize(logo_box, Image.LANCZOS)
    logo_top = block_top + LABEL_LINE + PARTNER_GAP
    canvas.alpha_composite(logo, (round(px(PARTNER_LEFT)), round(px(logo_top))))

    if spec["tier"]:
        # Tier label sits beside the logo, its line box centred on the logo.
        tier_top = logo_top + (spec["logo_h"] - TIER_LINE) / 2
        draw_line(canvas, spec["tier"], load_font(500, TIER_SIZE),
                  PARTNER_LEFT + spec["logo_w"] + PARTNER_GAP,
                  tier_top, TIER_LINE, TEXT_PRIMARY)

    target_path = os.path.join(OUT, spec["out"])
    canvas.convert("RGB").save(target_path, "WEBP", quality=92, method=6)
    return target_path, canvas.size


def main():
    # Both input folders live under .figma-ref/, which is gitignored: the
    # photos and logos are Figma exports (tens of MB) and the fonts are
    # third-party binaries. Only the composited output is committed.
    needs = {
        SRC: (
            "Figma exports. Re-download photo-cult.png, photo-fitpass.png, "
            "cultfit-logo.png and fitpass-logo.png from the Featured Programs "
            "node (1050:6683) via get_design_context."
        ),
        FONTS: (
            "Lexend Deca TTFs, one per weight (400/500/600). Google Fonts "
            "serves TTF rather than woff2 to an older user agent:\n"
            '    curl -H "User-Agent: Mozilla/5.0 (Linux; Android 4.3)" \\\n'
            '      "https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@600"'
        ),
    }
    for folder, how in needs.items():
        if not os.path.isdir(folder):
            sys.exit(f"missing {folder}\n  {how}")
    os.makedirs(OUT, exist_ok=True)
    for spec in BANNERS:
        path, size = build(spec)
        kb = os.path.getsize(path) / 1024
        print(f"wrote {os.path.relpath(path, ROOT)}  {size[0]}x{size[1]}  {kb:.1f} KB")


main()
