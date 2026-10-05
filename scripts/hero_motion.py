#!/usr/bin/env python3
"""
The animated header's motion spec, transcribed from Figma.

Source: Figma "Health Verse Revamp_Jan25", node 1208:3049 "Header/ Animated",
via the Figma MCP `get_motion_context` tool (recursive). The tool returns
motion.dev snippets; each track below is a verbatim transcription of one
`animate` / `transition` pair:

    PROP: (values, times, easings)

`times` are fractions of the 16s loop. `easings` has one entry per segment
(len(values) - 1), or is a single string applied to every segment.

Two Figma conventions matter downstream:

  * `x` / `y` are DELTAS from the node's canvas position, not absolute
    coordinates. Confirmed by proof 2, whose canvas y is 302 and whose
    plateau delta is -8, landing it on y=294 beside proofs 3 and 4.
  * `rotate` is ABSOLUTE degrees. Confirmed because each node's bounding box
    in `get_metadata` equals its unrotated size rotated by its plateau value.

`scaleX` and `scaleY` are equal on every object, so they collapse to a single
uniform `scale`. The tags animate `scaleY` only.
"""

LOOP_SECONDS = 16

# Figma emits these motion.dev keywords; the CSS keywords are the same curves.
EASE_KEYWORDS = {
    "linear": "linear",
    "easeIn": "ease-in",       # cubic-bezier(0.42, 0, 1, 1)
    "easeOut": "ease-out",     # cubic-bezier(0, 0, 0.58, 1)
    "easeInOut": "ease-in-out",  # cubic-bezier(0.42, 0, 0.58, 1)
}

BEZIER = {
    "linear": None,
    "easeIn": (0.42, 0.0, 1.0, 1.0),
    "easeOut": (0.0, 0.0, 0.58, 1.0),
    "easeInOut": (0.42, 0.0, 0.58, 1.0),
}

# nodeId -> (layer name, role, {property: (values, times, easings)})
TRACKS = {
    "1208:3053": ("Ring", "ring", {
        "rotate": ([0, 360], [0, 1], "linear"),
    }),

    # --- proofs -------------------------------------------------------------
    "1208:3111": ("proof 1", "proof", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.0125, 0.035, 0.2325, 0.245, 1],
                    ["linear", "linear", "linear", (0.5, 0, 0.5, 1), "linear"]),
        "y": ([8, 8, 0, 0, -8, -8], [0, 0.0125, 0.035, 0.2325, 0.245, 1],
              ["linear", "easeOut", "linear", "linear", "linear"]),
    }),
    "1208:3098": ("proof 2", "proof", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.26, 0.2825, 0.4825, 0.495, 1], "linear"),
        "y": ([0, 0, -8, -8, -16, -16], [0, 0.26, 0.2825, 0.4825, 0.495, 1],
              ["linear", "easeOut", "linear", "easeIn", "linear"]),
    }),
    "1208:3085": ("proof 3", "proof", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.51, 0.5325, 0.7325, 0.745, 1], "linear"),
        "y": ([8, 8, 0, 0, -8, -8], [0, 0.51, 0.5325, 0.7325, 0.745, 1],
              ["linear", "easeOut", "linear", "easeIn", "linear"]),
    }),
    "1208:3072": ("proof 4", "proof", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.76, 0.7825, 0.9825, 0.995, 1], "linear"),
        "y": ([8, 8, 0, 0, -8, -8], [0, 0.76, 0.7825, 0.9825, 0.995, 1],
              ["linear", "easeOut", "linear", "easeIn", "linear"]),
    }),

    # --- tags ---------------------------------------------------------------
    "1208:3171": ("tag 1", "tag", {
        "opacity": ([0, 1, 1, 0, 0], [0, 0.0075, 0.2325, 0.2475, 1], "linear"),
        "scaleY": ([0, 0.96, 1.1, 1, 1, 0, 0],
                   [0, 0.0175, 0.0219, 0.035, 0.2325, 0.2475, 1],
                   [(0.5, 0, 0.5, 1), "easeOut", (0.5, 0, 0.5, 1), "linear", "easeIn", "linear"]),
    }),
    "1208:3156": ("tag 2", "tag", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.2475, 0.255, 0.4913, 0.4975, 1], "linear"),
        "scaleY": ([0, 0, 1.1, 1, 1, 0, 0],
                   [0, 0.255, 0.2694, 0.2825, 0.4825, 0.4975, 1],
                   ["linear", "easeOut", "easeInOut", "linear", "easeIn", "linear"]),
    }),
    "1208:3140": ("tag 3", "tag", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.4975, 0.505, 0.7413, 0.7475, 1],
                    ["linear", "linear", "linear", (0.5, 0, 0.5, 1), "linear"]),
        "scaleY": ([0, 0, 1.1, 1, 1, 0, 0],
                   [0, 0.4975, 0.5194, 0.5325, 0.7325, 0.7475, 1],
                   ["linear", "easeOut", "easeInOut", "linear", "easeIn", "linear"]),
    }),
    "1208:3125": ("tag 4", "tag", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.7475, 0.755, 0.9913, 0.9975, 1], "linear"),
        "scaleY": ([0, 0, 1.1, 1, 1, 0, 0],
                   [0, 0.7475, 0.7694, 0.7825, 0.9825, 0.9975, 1],
                   ["linear", "easeOut", "easeInOut", "linear", "easeIn", "linear"]),
    }),

    # --- objects, phase 1 (0-25%) ------------------------------------------
    "1208:3567": ("object1.1", "object", {
        "opacity": ([0, 1, 1, 0, 0], [0, 0.0094, 0.2325, 0.25, 1],
                    [(0.5, 0, 0.5, 1), "linear", (0.5, 0, 0.5, 1), "linear"]),
        "rotate": ([-52.865, -12.865, -6.865, -12.865, -42.865, -42.865],
                   [0, 0.0438, 0.1188, 0.2325, 0.25, 1],
                   [(0.22, 1, 0.36, 1), (0.5, 0, 0.5, 1), (0.5, 0, 0.5, 1), "easeIn", "linear"]),
        "scale": ([0.3, 1.08, 1, 1, 0.4, 0.4], [0, 0.0281, 0.0438, 0.2325, 0.25, 1],
                  [(0.22, 1, 0.36, 1), (0.5, 0, 0.5, 1), "linear", "easeIn", "linear"]),
        "x": ([-59.999, 0, 0, -74.549, -74.549], [0, 0.0438, 0.2325, 0.25, 1],
              [(0.22, 1, 0.36, 1), "linear", "easeIn", "linear"]),
        "y": ([-39.998, 0, -7.998, 0.002, -39.998, -39.998],
              [0, 0.0438, 0.1188, 0.2325, 0.25, 1],
              [(0.22, 1, 0.36, 1), "linear", "linear", "easeIn", "linear"]),
    }),
    "1208:3592": ("object1.2", "object", {
        "opacity": ([0, 1, 1, 0, 0], [0, 0.0331, 0.2325, 0.25, 1], "linear"),
        "rotate": ([-20.174, 19.826, 25.826, 19.826, -10.174, -10.174],
                   [0, 0.0488, 0.1375, 0.2325, 0.25, 1],
                   [(0.22, 1, 0.36, 1), (0.5, 0, 0.5, 1), (0.5, 0, 0.5, 1), "easeIn", "linear"]),
        "scale": ([0.3, 1.08, 1, 1, 0.4, 0.4], [0, 0.0331, 0.0488, 0.2325, 0.25, 1],
                  [(0.22, 1, 0.36, 1), (0.5, 0, 0.5, 1), "linear", "easeIn", "linear"]),
        "x": ([86.044, 0, 0, 80.004, 80.004], [0, 0.0488, 0.2325, 0.25, 1],
              [(0.22, 1, 0.36, 1), "linear", "easeIn", "linear"]),
        "y": ([-119.996, 0, -15.996, -7.996, -47.996, -47.996],
              [0, 0.0488, 0.1375, 0.2325, 0.25, 1],
              [(0.22, 1, 0.36, 1), "linear", "linear", "easeIn", "linear"]),
    }),
    "1208:3642": ("object1.3", "object", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.01, 0.0381, 0.2325, 0.25, 1], "linear"),
        "rotate": ([-40, -40, 0, 6, 0, -30, -30], [0, 0.01, 0.0538, 0.1563, 0.2325, 0.25, 1],
                   ["linear", (0.22, 1, 0.36, 1), (0.5, 0, 0.5, 1), (0.5, 0, 0.5, 1),
                    "easeIn", "linear"]),
        "scale": ([0.3, 0.3, 1.08, 1, 1, 0.4, 0.4],
                  [0, 0.01, 0.0381, 0.0538, 0.2325, 0.25, 1],
                  ["linear", (0.22, 1, 0.36, 1), (0.5, 0, 0.5, 1), "linear", "easeIn", "linear"]),
        "x": ([-135, -135, 0, 0, -100, -100], [0, 0.01, 0.0538, 0.2325, 0.25, 1],
              ["linear", (0.22, 1, 0.36, 1), "linear", "easeIn", "linear"]),
        "y": ([60, 60, 0, -8, 0, 60, 60], [0, 0.01, 0.0538, 0.1563, 0.2325, 0.25, 1],
              ["linear", (0.22, 1, 0.36, 1), "linear", "linear", "easeIn", "linear"]),
    }),
    "1208:3617": ("object1.4", "object", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.015, 0.0431, 0.2325, 0.25, 1], "linear"),
        "rotate": ([-12.285, -12.285, 27.715, 33.715, 27.715, -2.285, -2.285],
                   [0, 0.015, 0.0588, 0.175, 0.2325, 0.25, 1],
                   ["linear", (0.22, 1, 0.36, 1), (0.5, 0, 0.5, 1), (0.5, 0, 0.5, 1),
                    "easeIn", "linear"]),
        "scale": ([0.3, 0.3, 1.08, 1, 1, 0.4, 0.4],
                  [0, 0.015, 0.0431, 0.0588, 0.2325, 0.25, 1],
                  ["linear", (0.22, 1, 0.36, 1), (0.5, 0, 0.5, 1), "linear", "easeIn", "linear"]),
        "x": ([137.267, 137.267, 0, 0, 119.997, 119.997], [0, 0.015, 0.0588, 0.2325, 0.25, 1],
              ["linear", (0.22, 1, 0.36, 1), "linear", "easeIn", "linear"]),
        "y": ([59.997, 59.997, 0, -8.003, -0.003, 59.997, 59.997],
              [0, 0.015, 0.0588, 0.175, 0.2325, 0.25, 1],
              ["linear", (0.22, 1, 0.36, 1), "linear", "linear", "easeIn", "linear"]),
    }),

    # --- objects, phase 2 (25-50%) -----------------------------------------
    "1208:3449": ("object2.1", "object", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.25, 0.2594, 0.4913, 0.5, 1],
                    ["linear", (0.5, 0, 0.5, 1), "linear", "linear", "linear"]),
        "rotate": ([-64.261, -64.261, -24.261, -24.261, -18.261, -24.261, -24.261,
                    -34.261, -34.261],
                   [0, 0.25, 0.2781, 0.2938, 0.3688, 0.4825, 0.4913, 0.5, 1],
                   ["linear", (0.5, 0, 0.5, 1), "linear", "linear", "easeOut", "linear",
                    "easeIn", "linear"]),
        "scale": ([0.3, 0.3, 1.08, 1, 1, 0.4, 0.4],
                  [0, 0.25, 0.2781, 0.2938, 0.4913, 0.5, 1],
                  ["linear", (0.5, 0, 0.5, 1), (0.5, 0, 0.5, 1), "linear", "easeIn", "linear"]),
        "x": ([-93.096, -93.096, -10.096, -10.096, -96.096, -96.096],
              [0, 0.25, 0.2781, 0.4825, 0.5, 1],
              ["linear", "linear", "linear", "easeIn", "linear"]),
        "y": ([-39.996, -39.996, -29.096, -37.096, -29.096, -41.096, -41.096],
              [0, 0.25, 0.2781, 0.3688, 0.4825, 0.5, 1],
              ["linear", "linear", "easeOut", "easeOut", "easeIn", "linear"]),
    }),
    "1208:3481": ("object2.2", "object", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.255, 0.2644, 0.4913, 0.5, 1],
                    ["linear", "linear", "linear", (0.5, 0, 0.5, 1), "linear"]),
        "rotate": ([30.391, 30.391, 70.391, 64.391, 70.391, 100.391, 100.391],
                   [0, 0.255, 0.2988, 0.3875, 0.4825, 0.5, 1],
                   ["linear", "easeOut", "easeOut", "easeOut", "easeIn", "linear"]),
        "scale": ([0, 0.4, 1.1, 1, 1, 0.4, 0.4],
                  [0, 0.255, 0.2831, 0.2988, 0.4913, 0.5, 1],
                  ["easeOut", "easeOut", "easeOut", "linear", "easeIn", "linear"]),
        "x": ([80.001, 80.001, 0, 0, 80.001, 80.001], [0, 0.255, 0.2988, 0.4825, 0.5, 1],
              ["linear", "easeOut", "linear", "easeIn", "linear"]),
        "y": ([-59.998, -59.998, 0, -7.998, 0.002, -59.998, -59.998],
              [0, 0.255, 0.2988, 0.3875, 0.4825, 0.5, 1],
              ["linear", "easeOut", "easeOut", "easeOut", "easeIn", "linear"]),
    }),
    "1208:3541": ("object2.3", "object", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.26, 0.3038, 0.4913, 0.5, 1], "linear"),
        "rotate": ([-58.069, -58.069, -18.069, -12.069, -18.069, -18.069, 11.931, 11.931],
                   [0, 0.26, 0.3038, 0.4063, 0.4825, 0.4913, 0.5, 1],
                   ["linear", "easeOut", "easeOut", "easeIn", "linear", "easeIn", "linear"]),
        "scale": ([0.3, 0.3, 1.1, 1, 1, 0, 0],
                  [0, 0.26, 0.2881, 0.3038, 0.4913, 0.5, 1],
                  ["linear", "easeOut", "easeOut", "linear", "easeIn", "linear"]),
        "x": ([-120.004, -120.004, 0, 0, -110.004, -110.004],
              [0, 0.26, 0.3038, 0.4825, 0.5, 1],
              ["linear", "easeOut", "linear", "easeIn", "linear"]),
        "y": ([59.996, 59.996, 0, -8.004, -0.004, -60.004, -60.004],
              [0, 0.26, 0.3038, 0.4063, 0.4825, 0.5, 1],
              ["linear", "easeOut", "linear", "linear", "easeIn", "linear"]),
    }),
    "1208:3512": ("object2.4", "object", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.265, 0.2744, 0.4888, 0.5, 1], "linear"),
        "rotate": ([-63.957, -63.957, -23.957, -29.957, -23.957, -23.957, 6.043, 6.043],
                   [0, 0.265, 0.3088, 0.425, 0.4825, 0.4888, 0.5, 1],
                   ["linear", "easeOut", "easeOut", "easeOut", "linear", "easeIn", "linear"]),
        "scale": ([0.3, 0.3, 1.1, 1, 1, 0.4, 0.4],
                  [0, 0.265, 0.2931, 0.3088, 0.4888, 0.5, 1],
                  ["linear", (0.5, 0, 0.5, 1), "easeOut", "linear", "easeIn", "linear"]),
        "x": ([110.002, 110.002, 0, 0, 110.002, 110.002], [0, 0.265, 0.3088, 0.4888, 0.5, 1],
              ["linear", "easeOut", "linear", "easeIn", "linear"]),
        "y": ([40.002, 40.002, 0, -7.998, 0.002, 0.002, -29.998, -29.998],
              [0, 0.265, 0.3088, 0.425, 0.4825, 0.4888, 0.5, 1],
              ["linear", "easeOut", "easeOut", "easeOut", "linear", "easeIn", "linear"]),
    }),

    # --- objects, phase 3 (50-75%) -----------------------------------------
    # object3.1's opacity flashes to 1 at 7.38% and fades back out by 50%,
    # before its real phase-3 entrance. Transcribed as Figma reports it.
    "1208:3394": ("object3.1", "object", {
        "opacity": ([0, 1, 0, 1, 1, 0, 0], [0, 0.0738, 0.5, 0.5094, 0.7418, 0.75, 1],
                    [(0.5, 0, 0.5, 1), "linear", "linear", "linear", (0.5, 0, 0.5, 1),
                     "linear"]),
        "rotate": ([-6.538, -6.538, 33.462, 27.462, 33.462, 3.462, 3.462],
                   [0, 0.5, 0.5438, 0.6188, 0.7325, 0.75, 1],
                   ["linear", "easeOut", "easeOut", "easeOut", (0.5, 0, 0.5, 1), "linear"]),
        "scale": ([0.3, 0.3, 1.1, 1, 1, 0.4, 0.4],
                  [0, 0.5, 0.5281, 0.5438, 0.7413, 0.75, 1],
                  ["linear", "easeOut", "easeOut", "linear", (0.5, 0, 0.5, 1), "linear"]),
        "x": ([-99.999, -99.999, 0, 0, -99.999, -99.999], [0, 0.5, 0.5438, 0.7325, 0.75, 1],
              ["linear", "easeOut", "linear", "linear", "linear"]),
        "y": ([20.001, 20.001, 0, -7.999, 0.001, 20.001, 20.001],
              [0, 0.5, 0.5438, 0.6188, 0.7325, 0.75, 1],
              ["linear", "easeOut", "easeOut", "easeOut", "linear", "linear"]),
    }),
    "1208:3363": ("object3.2", "object", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.505, 0.5144, 0.7413, 0.75, 1],
                    ["linear", "linear", "linear", (0.5, 0, 0.5, 1), "linear"]),
        "rotate": ([-19.635, -19.635, 20.365, 14.365, 20.365, 20.365, 50.365, 50.365],
                   [0, 0.505, 0.5488, 0.6375, 0.7325, 0.7413, 0.75, 1],
                   ["linear", "easeOut", "easeOut", "easeOut", "linear", (0.5, 0, 0.5, 1),
                    "linear"]),
        "scale": ([0.3, 0.3, 1.1, 1, 1, 0.4, 0.4],
                  [0, 0.505, 0.5331, 0.5488, 0.7413, 0.75, 1],
                  ["linear", "easeOut", "easeOut", "linear", (0.5, 0, 0.5, 1), "linear"]),
        "x": ([100.002, 100.002, 0, 0, 100.002, 100.002], [0, 0.505, 0.5488, 0.7413, 0.75, 1],
              ["linear", "easeOut", "linear", "linear", "linear"]),
        "y": ([30.003, 30.003, 0, -5.997, 0.003, 0.003, -19.997, -19.997],
              [0, 0.505, 0.5488, 0.6375, 0.7325, 0.7413, 0.75, 1],
              ["linear", "easeOut", "easeOut", "easeOut", "linear", "linear", "linear"]),
    }),
    "1208:3421": ("object3.3", "object", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.51, 0.5194, 0.7413, 0.75, 1], "linear"),
        "rotate": ([5.739, 5.739, -24.261, -30.261, -24.261, -24.261, 5.739, 5.739],
                   [0, 0.51, 0.5538, 0.6563, 0.7325, 0.7413, 0.75, 1],
                   ["linear", "easeOut", "easeOut", "easeOut", "linear", "easeIn", "linear"]),
        "scale": ([0.3, 0.3, 1.1, 1, 1, 0.4, 0.4],
                  [0, 0.51, 0.5381, 0.5538, 0.7413, 0.75, 1],
                  ["linear", (0.5, 0, 0.5, 1), "easeOut", "linear", "easeIn", "linear"]),
        "x": ([-130.003, -130.003, 0, 0, -120.003, -120.003],
              [0, 0.51, 0.5538, 0.7413, 0.75, 1],
              ["linear", "easeOut", "linear", "easeIn", "linear"]),
        "y": ([29.999, 29.999, 0, -8.001, -16.001, -16.001, 23.999, 23.999],
              [0, 0.51, 0.5538, 0.6563, 0.7325, 0.7413, 0.75, 1],
              ["linear", "easeOut", "easeOut", "easeOut", "linear", "easeIn", "linear"]),
    }),
    "1208:3330": ("object3.4", "object", {
        "opacity": ([0, 0, 1, 1, 0, 0], [0, 0.515, 0.5244, 0.7413, 0.75, 1],
                    ["linear", "linear", "linear", (0.5, 0, 0.5, 1), "linear"]),
        "rotate": ([-12.285, -12.285, 27.715, 21.715, 27.715, 67.715, 67.715],
                   [0, 0.515, 0.5588, 0.675, 0.7325, 0.75, 1],
                   ["linear", "easeOut", "easeOut", "easeOut", (0.5, 0, 0.5, 1), "linear"]),
        "scale": ([0.3, 0.3, 1.1, 1, 1, 0.4, 0.4],
                  [0, 0.515, 0.5431, 0.5588, 0.7325, 0.75, 1],
                  ["linear", "linear", "easeOut", "linear", (0.5, 0, 0.5, 1), "linear"]),
        "x": ([119.996, 119.996, 0, 0, 119.996, 119.996], [0, 0.515, 0.5588, 0.7325, 0.75, 1],
              ["linear", "easeOut", "linear", "linear", "linear"]),
        "y": ([29.999, 29.999, 0, -8.001, -0.001, -10.001, -10.001],
              [0, 0.515, 0.5588, 0.675, 0.7325, 0.75, 1],
              ["linear", "easeOut", "easeOut", "easeOut", "linear", "linear"]),
    }),

    # --- objects, phase 4 (75-100%) ----------------------------------------
    "1208:3206": ("object4.1", "object", {
        "opacity": ([0, 0, 1, 1, 0], [0, 0.75, 0.7594, 0.9913, 1], "linear"),
        "rotate": ([-40, -40, 0, 6, 0, 0, 30], [0, 0.75, 0.7938, 0.8688, 0.9825, 0.9913, 1],
                   ["linear", "easeOut", (0.5, 0, 0.5, 1), (0.5, 0, 0.5, 1), "linear",
                    "easeIn"]),
        "scale": ([0.3, 0.3, 0.53, 1.1, 1, 1, 0.4],
                  [0, 0.75, 0.7594, 0.7781, 0.7938, 0.9913, 1],
                  ["linear", "easeOut", "easeOut", "easeOut", "linear", "easeIn"]),
        "x": ([-93.054, -93.054, 6.946, 6.946, -93.054], [0, 0.75, 0.7938, 0.9913, 1],
              ["linear", "easeOut", "linear", "easeIn"]),
        "y": ([30, 30, 0, -8, 0, 0, 30], [0, 0.75, 0.7938, 0.8688, 0.9825, 0.9913, 1],
              ["linear", "easeOut", "linear", "linear", "linear", "easeIn"]),
    }),
    "1208:3237": ("object4.2", "object", {
        "opacity": ([0, 0, 1, 1, 0], [0, 0.755, 0.7644, 0.9913, 1],
                    ["linear", "linear", "linear", (0.5, 0, 0.5, 1)]),
        "rotate": ([-12.285, -12.285, 27.715, 21.715, 27.715, 27.715, 57.715],
                   [0, 0.755, 0.7988, 0.8875, 0.9825, 0.9913, 1],
                   ["linear", "easeOut", "easeOut", "easeOut", "linear", (0.5, 0, 0.5, 1)]),
        "scale": ([0.4, 0.4, 1.1, 1, 1, 0], [0, 0.755, 0.7831, 0.7988, 0.9913, 1],
                  ["linear", "easeOut", "easeOut", "linear", (0.5, 0, 0.5, 1)]),
        "x": ([100.002, 100.002, 0, 0, 100.002], [0, 0.755, 0.7988, 0.9913, 1],
              ["linear", "easeOut", "linear", "linear"]),
        "y": ([-39.998, -39.998, 0, -7.998, 0.002, 0.002, -39.998],
              [0, 0.755, 0.7988, 0.8875, 0.9825, 0.9913, 1],
              ["linear", "easeOut", "easeOut", "easeOut", "linear", "linear"]),
    }),
    "1208:3268": ("object4.3", "object", {
        "opacity": ([0, 0, 1, 1, 0], [0, 0.76, 0.7694, 0.9913, 1],
                    ["linear", "linear", "linear", (0.5, 0, 0.5, 1)]),
        "rotate": ([-52.865, -52.865, -12.865, -18.865, -12.865, -12.865, -42.865],
                   [0, 0.76, 0.8038, 0.9063, 0.9825, 0.9913, 1],
                   ["linear", "easeOut", "linear", "easeOut", "linear", (0.5, 0, 0.5, 1)]),
        "scale": ([0.3, 0.3, 1.1, 1, 1, 0.4], [0, 0.76, 0.7881, 0.8038, 0.9913, 1],
                  ["linear", "easeOut", "easeOut", "linear", (0.5, 0, 0.5, 1)]),
        "x": ([-110.003, -110.003, 0, 0, -110.003], [0, 0.76, 0.8038, 0.9913, 1],
              ["linear", "easeOut", "linear", "linear"]),
        "y": ([9.995, 9.995, 0, -8.005, -0.005, -0.005, 9.995],
              [0, 0.76, 0.8038, 0.9063, 0.9825, 0.9913, 1],
              ["linear", "easeOut", "easeOut", "easeOut", "linear", "linear"]),
    }),
    "1208:3299": ("object4.4", "object", {
        "opacity": ([0, 0, 1, 1, 0], [0, 0.765, 0.7744, 0.9913, 1],
                    ["linear", "linear", "linear", (0.5, 0, 0.5, 1)]),
        "rotate": ([-20.174, -20.174, -90.174, 19.826, 25.826, 19.826, 19.826, 59.826],
                   [0, 0.765, 0.7931, 0.8088, 0.925, 0.9825, 0.9913, 1],
                   ["linear", "easeOut", "easeOut", "easeOut", "easeOut", "linear",
                    (0.5, 0, 0.5, 1)]),
        "scale": ([0.3, 0.3, 1, 1, 0.4], [0, 0.765, 0.8088, 0.9913, 1],
                  ["linear", "easeOut", "linear", (0.5, 0, 0.5, 1)]),
        "x": ([160, 160, 0, 0, 160], [0, 0.765, 0.8088, 0.9913, 1],
              ["linear", "easeOut", "linear", "linear"]),
        "y": ([19.997, 19.997, 0, -8.003, -0.003, -0.003],
              [0, 0.765, 0.8088, 0.925, 0.9825, 1],
              ["linear", "easeOut", "easeOut", "easeOut", "linear"]),
    }),
}


def validate():
    """Each track must have one time per value and one easing per segment."""
    problems = []
    for node, (name, _role, props) in TRACKS.items():
        for prop, (values, times, eases) in props.items():
            if len(values) != len(times):
                problems.append(
                    f"{name} {prop}: {len(values)} values vs {len(times)} times")
            if not isinstance(eases, str) and len(eases) != len(times) - 1:
                problems.append(
                    f"{name} {prop}: {len(eases)} easings, expected {len(times) - 1}")
            if times[0] != 0 or times[-1] != 1:
                problems.append(f"{name} {prop}: times must span 0..1, got "
                                f"{times[0]}..{times[-1]}")
            if list(times) != sorted(times):
                problems.append(f"{name} {prop}: times not ascending")
    return problems


if __name__ == "__main__":
    issues = validate()
    print(f"{len(TRACKS)} animated nodes, {LOOP_SECONDS}s loop")
    if issues:
        for line in issues:
            print("  FAIL", line)
        raise SystemExit(1)
    print("  all tracks well-formed")
