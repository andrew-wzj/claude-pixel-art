# claude-pixel-art

Teaching Claude to make good pixel art in code.

## Why

Claude's first attempt (36 illustrations for the Going, Going, Gone! game page) used rough geometric shapes and
heavy checkerboard dithering, and looked bad. This repo collects the references, rules and practice needed to do
better.

## References

- [`patch-gg/pixelfx`](https://github.com/patch-gg/pixelfx) (MIT, ~9k stars): 244 pixel-art effects written as
  code, plus a Claude Code skill. Cloned into `references/pixelfx` (git-ignored, read-only).
  It covers animated VFX more than still illustrations, but its method and quality rules apply to both.

## Lessons from pixelfx so far

1. **Draft, render, look, fix.** A single attempt gives mediocre work. Render, open the image, fix the worst
   thing, and repeat at least three times.
2. **Palette ramps, not loose colors.** Use one ramp of 5 to 8 steps from dark to bright for each material
   (`src/core/color.js` `PAL`), with hard steps between colors and no smooth gradients.
3. **Clear silhouette, one focal point, bigger shapes.** If it reads as mush at 1x, use fewer colors and simpler
   shapes.
4. **No speckle.** Don't put stray noise pixels inside shapes, and don't use checkerboard dithering for soft
   things like smoke or sky.
5. **Light from one side.** Brighten the top-left edge, darken the bottom-right, put a darker step at the base,
   and keep white for the brightest highlight only.
6. **Lines and light, not flat fills.** Build with 1 px rims and outlines. Big flat areas of saturated color are
   almost always wrong.
7. **Benchmark against a better piece** at the same size. If it has more detail, light or life, yours isn't done.
