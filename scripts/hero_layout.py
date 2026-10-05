#!/usr/bin/env python3
"""
The animated header's static layout, transcribed from Figma.

Source: node 1208:3049 "Header/ Animated", 360x395. Every box below comes
from the `left`/`top`/`w`/`h` of `get_design_context`'s generated markup.

DO NOT take positions from `get_metadata`. It disagrees with the rendered
frame for 14 of the 16 objects and for all four tags, each by 6-56px on one
axis. Three independent checks say the code export is the correct one:

  * Each `objects N` group box in get_metadata is exactly the union of its
    children's code-export boxes, and is NOT the union of their get_metadata
    boxes — several children fall outside their own parent.
  * Measuring the coloured pixels in Figma's PNG render of the frame puts
    object1.1's ball at y 85..157 and the GENUINE tag at y 162..212, which
    match the code export (83.5..160.4 and 161..213.2) and not get_metadata
    (100.4..177.3 and 167.2..219.4).
  * The two objects the two sources agree on are the two that never looked
    wrong on screen.

Sizes, rotations and colours come from `get_design_context` too, so only the
origins were ever in doubt.

Two coordinate conventions need unpicking before the numbers are usable:

  * A rotated node's box is its AXIS-ALIGNED BOUNDING BOX, so it is larger
    than the node itself. `unrotate()` recovers the true size; the node's
    centre is the bounding box's centre either way. Boxes are therefore
    stored as-exported and converted to (centre, true size) pairs.

  * The frame's top 28px is a device status bar. Header.tsx already omits its
    equivalent, on the grounds that a web page cannot draw a real status bar
    and a mocked one misleads on a device. The same applies here, so every y
    is shifted up by TOP_INSET and the rendered frame is 360x367.
"""

import math

FRAME_WIDTH = 360
TOP_INSET = 28          # device status bar, not rendered
FRAME_HEIGHT = 395 - TOP_INSET

# Figma: brand-blue/Gradients - Brand/Dark/900 -> 700 (45deg).
# Verified against the exported raster: its bottom-left pixel is #002869 and
# its top-right #004EB5, matching brand-blue/900 and /700 to within the 1/255
# the PNG round-trip costs. The midpoint sample (#003B8F vs #003C90 computed)
# confirms Figma interpolates in sRGB, not oklab.
BACKGROUND = {
    "angle": 45,
    "from": ("brand-blue/900", "#00296a"),
    "to": ("brand-blue/700", "#004fb6"),
}

# Figma: node 1208:3053, transcribed from the exported ring.svg.
RING = {
    "box": (34, 88, 292, 292),      # x, y, w, h — unrotated
    "outer": {"r": 141.576, "stroke_width": 8.84848, "opacity": 0.07},
    "inner": {"r": 115.252, "stroke_width": 1.32727, "opacity": 0.14},
    "dot": {"cx": 146, "cy": 4.42424, "r": 4.42424, "opacity": 0.35},
}

BADGE = {
    "box": (89, 128, 182, 20),
    "icon_size": 16,
    "icon_offset_y": 2,             # icon sits 2px below the text box top
    "gap": 4,                       # text starts at x=20, icon is 16 wide
    "text": "MediBuddy Assured",    # rendered uppercase via the type style
}

HERO_WORD = {
    "box": (75, 228, 209, 48),
    "text": "programs",
    # Figma: 0px 4px 0px #1b1b1b, 0px 10px 18px rgba(0,0,0,0.35)
    "shadow": "0 4px 0 #1b1b1b, 0 10px 18px rgb(0 0 0 / 0.35)",
}

# Each tag is rotated -2 degrees, so `box` is the bounding box and the true
# size comes out of unrotate(). Figma variable names carry the design file's
# own deprecation markers; `colors/yellow (deprecated)/100` is the live value.
# Tags 2-4 are exported centred, as `left-[calc(50%-0.27px)]` against a
# -translate-x-1/2; those resolve to the lefts below on the 360px frame.
TAG_ROTATION = -2
TAGS = [
    {"id": "1", "node": "1208:3171", "text": "GENUINE",
     "box": (90, 161, 179.49694640934467, 52.18408887088299),
     "token": "yellow-100", "figma": "colors/yellow/100"},
    {"id": "2", "node": "1208:3156", "text": "AFFORDABLE",
     "box": (64, 160, 231.46527011692524, 53.99886263906956),
     "token": "success-100", "figma": "colors/success/100"},
    {"id": "3", "node": "1208:3140", "text": "EASY-PAY",
     "box": (90, 160, 179.49694640934467, 52.18408887088299),
     "token": "warning-100", "figma": "colors/warning/100"},
    {"id": "4", "node": "1208:3125", "text": "TRUSTED",
     "box": (93, 161, 174.4999922066927, 52.00959139317274),
     "token": "pink-100", "figma": "colors/pink/100"},
]

# Unrotated text nodes, so `box` is exact. Each pairs with the tag of the same
# index: "GENUINE programs / Directly from cult.fit, FITPASS and more".
PROOFS = [
    {"id": "1", "node": "1208:3111", "box": (39, 295, 282, 20),
     "text": "Directly from cult.fit, FITPASS and more"},
    {"id": "2", "node": "1208:3098", "box": (132, 302, 96, 20),
     "text": "at best prices"},
    {"id": "3", "node": "1208:3085", "box": (71, 294, 217, 20),
     "text": "pay with UPI, card and wallets"},
    {"id": "4", "node": "1208:3072", "box": (81, 294, 197, 20),
     "text": "over 12,000+ already joined"},
]

# The sixteen floating objects. `box` is the bounding box from get_metadata;
# `rest_rotation` is the node's plateau rotation, which is what that bounding
# box reflects, so unrotate(box, rest_rotation) recovers the true size.
# `icon` names one of the eight sprites extracted by build-hero-animated.py —
# the 16 objects reuse them at different sizes.
#
# Listed in Figma's own back-to-front order, which is also the render order:
# phase 4 sits furthest back, phase 1 nearest the front.
OBJECTS = [
    {"id": "4-1", "node": "1208:3206", "icon": "award",
     "box": (18, 100, 58.109, 58), "rest_rotation": 0},
    {"id": "4-2", "node": "1208:3237", "icon": "shield",
     "box": (284, 181, 64.817, 64.817), "rest_rotation": 27.715},
    {"id": "4-3", "node": "1208:3268", "icon": "verified",
     "box": (30, 301, 72.026, 72.61), "rest_rotation": -12.865},
    {"id": "4-4", "node": "1208:3299", "icon": "runner",
     "box": (234, 334, 61.52, 61.465), "rest_rotation": 19.826},

    {"id": "3-4", "node": "1208:3330", "icon": "shield",
     "box": (255, 323, 37.81, 37.81), "rest_rotation": 27.715},
    {"id": "3-2", "node": "1208:3363", "icon": "check",
     "box": (290.49, 175.49, 61.704, 61.704), "rest_rotation": 20.365},
    {"id": "3-1", "node": "1208:3394", "icon": "price-tag",
     "box": (9.75, 117.73, 83.138, 83.138), "rest_rotation": 33.462},
    {"id": "3-3", "node": "1208:3421", "icon": "wallet",
     "box": (65.73, 324.73, 70.097, 70.097), "rest_rotation": -24.261},

    {"id": "2-1", "node": "1208:3449", "icon": "wallet",
     "box": (28.93, 130.06, 58.193, 58.193), "rest_rotation": -24.261},
    {"id": "2-2", "node": "1208:3481", "icon": "price-tag",
     "box": (279, 103, 76.656, 76.656), "rest_rotation": 70.391},
    {"id": "2-4", "node": "1208:3512", "icon": "discount",
     "box": (271, 296, 62.035, 62.035), "rest_rotation": -23.957},
    {"id": "2-3", "node": "1208:3541", "icon": "check",
     "box": (41.84, 297.84, 60.521, 60.521), "rest_rotation": -18.069},

    {"id": "1-1", "node": "1208:3567", "icon": "verified",
     "box": (6, 76, 91.099, 91.837), "rest_rotation": -12.865},
    {"id": "1-2", "node": "1208:3592", "icon": "runner",
     "box": (283, 122, 81.913, 81.913), "rest_rotation": 19.826},
    {"id": "1-4", "node": "1208:3617", "icon": "shield",
     "box": (233, 332, 63.466, 63.466), "rest_rotation": 27.715},
    {"id": "1-3", "node": "1208:3642", "icon": "award",
     "box": (57, 325, 64, 64), "rest_rotation": 0},
]

# Sprite crops, keyed by the name used in OBJECTS[*]["icon"].
#   sheet, background-size %, background-position %
# The crop in sheet pixels is independent of the box it was measured in: the
# box width cancels out of `crop_x = box_w * (-left/100) / scale`, so one crop
# serves every object that reuses the sprite.
SPRITES = {
    "award": ("sprite-a.png", (405.98, 135.58), (-287.85, -13.67)),
    "shield": ("sprite-a.png", (412.93, 137.64), (-155.89, -14.83)),
    "runner": ("sprite-a.png", (407.5, 136.09), (-17.26, -13.35)),
    "verified": ("sprite-b.png", (147.36, 145.48), (-22.91, -19.14)),
    "check": ("sprite-c.png", (471.82, 174.6), (-360.97, -33.79)),
    "price-tag": ("sprite-c.png", (469.66, 175.4), (-125.75, -34.4)),
    "wallet": ("sprite-c.png", (470.74, 175.0), (-9.91, -34.09)),
    "discount": ("sprite-c.png", (468.58, 174.6), (-242.89, -34.01)),
}


# The four `objects N` wrapper frames, from get_metadata. Unlike the per-node
# boxes these are trustworthy, and they pin the objects down: each group box
# is exactly the union of its children, so check_groups() will catch a bad
# origin the moment one is introduced.
OBJECT_GROUPS = {
    "1": (6, 76.00001525878906, 358.91265869140625, 319.46630859375),
    "2": (28.92919921875, 102.99995422363281, 326.7273864746094, 255.3642578125),
    "3": (9.750887870788574, 117.733154296875, 342.4400329589844, 277.08905029296875),
    "4": (18, 100.00016784667969, 330.81622314453125, 295.4653015136719),
}


def check_groups(tolerance=0.01):
    """Each group box must be the union of its children's boxes."""
    problems = []
    for phase, (gx, gy, gw, gh) in OBJECT_GROUPS.items():
        members = [o for o in OBJECTS if o["id"].startswith(f"{phase}-")]
        x0 = min(o["box"][0] for o in members)
        y0 = min(o["box"][1] for o in members)
        x1 = max(o["box"][0] + o["box"][2] for o in members)
        y1 = max(o["box"][1] + o["box"][3] for o in members)
        for label, got, want in (("left", x0, gx), ("top", y0, gy),
                                 ("right", x1, gx + gw), ("bottom", y1, gy + gh)):
            if abs(got - want) > tolerance:
                problems.append(
                    f"objects {phase}: {label} is {got:.3f}, group says {want:.3f}")
    return problems


def unrotate(box, degrees):
    """Recover a node's true size from its axis-aligned bounding box.

    Rotating a w x h box by theta gives a bounding box of
        W = w|cos| + h|sin|,  H = w|sin| + h|cos|
    which is a 2x2 system in w and h. It is singular only at 45 degrees,
    where the two equations coincide; no node here is anywhere near that.
    """
    _x, _y, bw, bh = box
    c, s = abs(math.cos(math.radians(degrees))), abs(math.sin(math.radians(degrees)))
    det = c * c - s * s
    if abs(det) < 1e-9:
        raise ValueError(f"cannot unrotate a box at {degrees} degrees")
    return (bw * c - bh * s) / det, (bh * c - bw * s) / det


def place(box, degrees=0.0):
    """Return (left, top, width, height) for a node, in rendered coordinates.

    `left`/`top` address the node's UNROTATED box, centred where Figma centres
    it, so CSS can apply the rotation about the default centre origin.
    """
    x, y, bw, bh = box
    w, h = unrotate(box, degrees) if degrees else (bw, bh)
    cx, cy = x + bw / 2, y + bh / 2 - TOP_INSET
    return cx - w / 2, cy - h / 2, w, h


def sprite_crop(name, sheet_width, sheet_height):
    """Convert a CSS background-size/position pair into a pixel crop box."""
    _sheet, (w_pct, h_pct), (left_pct, top_pct) = SPRITES[name]
    # scale = rendered sheet px per source px, identical on both axes in
    # principle; Figma rounds them apart slightly, so each axis uses its own.
    x = -left_pct / w_pct * sheet_width
    y = -top_pct / h_pct * sheet_height
    w = 100 / w_pct * sheet_width
    h = 100 / h_pct * sheet_height
    return x, y, w, h


def icon_render_size():
    """Largest (w, h) each sprite is drawn at, so rasters are sized once."""
    sizes = {}
    for obj in OBJECTS:
        _l, _t, w, h = place(obj["box"], obj["rest_rotation"])
        prev = sizes.get(obj["icon"], (0, 0))
        sizes[obj["icon"]] = (max(prev[0], w), max(prev[1], h))
    return sizes


if __name__ == "__main__":
    print(f"frame {FRAME_WIDTH}x{FRAME_HEIGHT} (status bar {TOP_INSET}px omitted)\n")
    issues = check_groups()
    print("group union check:", "ok" if not issues else "FAILED")
    for line in issues:
        print("  ", line)
    print()
    print("tags")
    for tag in TAGS:
        l, t, w, h = place(tag["box"], TAG_ROTATION)
        print(f"  {tag['text']:<11} {w:7.2f}x{h:<6.2f} at ({l:6.2f}, {t:6.2f})")
    print("\nobjects")
    for obj in OBJECTS:
        l, t, w, h = place(obj["box"], obj["rest_rotation"])
        print(f"  {obj['id']:<4} {obj['icon']:<10} {w:6.2f}x{h:<6.2f} "
              f"at ({l:7.2f}, {t:7.2f})  rest {obj['rest_rotation']:+8.3f} deg")
    print("\nsprite rasters at 3x largest use")
    for name, (w, h) in sorted(icon_render_size().items()):
        print(f"  {name:<10} {w:6.2f}x{h:<6.2f} -> {round(w * 3)}x{round(h * 3)}")
