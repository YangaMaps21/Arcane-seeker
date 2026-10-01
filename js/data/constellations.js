// Stylised star patterns for the 12 zodiac constellations.
// Coordinates are on a 0–100 grid; `r` is relative brightness (1 = brightest).
// Lines join star indexes. Shapes follow the traditional stick-figure asterisms.

export const CONSTELLATIONS = {
  Aries: {
    stars: [[12, 62, .7], [44, 42, 1], [68, 40, .85], [86, 52, .6]],
    lines: [[0, 1], [1, 2], [2, 3]],
  },
  Taurus: {
    stars: [[30, 56, .7], [44, 50, 1], [58, 44, .6], [86, 18, .8], [44, 63, .6], [58, 68, .6], [84, 78, .7], [14, 26, .5], [18, 22, .4], [16, 30, .4]],
    lines: [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6]],
  },
  Gemini: {
    stars: [[26, 12, 1], [30, 36, .6], [34, 60, .6], [26, 88, .7], [48, 10, .95], [54, 34, .6], [60, 58, .6], [66, 86, .7], [42, 48, .4]],
    lines: [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [0, 4], [1, 8], [8, 5]],
  },
  Cancer: {
    stars: [[50, 10, .7], [50, 38, .55], [52, 54, .6], [28, 86, .85], [74, 82, .65]],
    lines: [[0, 1], [1, 2], [2, 3], [2, 4]],
  },
  Leo: {
    stars: [[26, 72, 1], [28, 52, .65], [20, 36, .6], [28, 20, .65], [42, 16, .6], [60, 64, .7], [86, 70, .85], [56, 46, .6]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [5, 7], [7, 1]],
  },
  Virgo: {
    stars: [[12, 30, .6], [32, 40, .65], [50, 46, .7], [66, 40, .6], [88, 26, .6], [54, 66, .6], [60, 90, 1], [28, 62, .55]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [1, 7]],
  },
  Libra: {
    stars: [[50, 14, .9], [24, 44, .85], [76, 40, .7], [30, 80, .6], [80, 76, .55]],
    lines: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4]],
  },
  Scorpio: {
    stars: [[12, 22, .65], [18, 34, .7], [12, 46, .6], [34, 44, 1], [44, 54, .6], [54, 68, .6], [64, 80, .6], [80, 86, .65], [92, 76, .7], [86, 64, .8]],
    lines: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
  },
  Sagittarius: {
    stars: [[44, 22, .65], [34, 40, .7], [56, 40, .75], [30, 62, .8], [56, 64, 1], [74, 50, .7], [14, 44, .55], [14, 62, .55]],
    lines: [[0, 1], [0, 2], [1, 2], [1, 3], [3, 4], [4, 2], [2, 5], [5, 4], [1, 6], [6, 7], [7, 3]],
  },
  Capricorn: {
    stars: [[14, 30, .8], [30, 54, .6], [54, 80, .6], [70, 72, .6], [88, 40, .85], [74, 36, .6], [50, 44, .55]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]],
  },
  Aquarius: {
    stars: [[18, 18, .7], [34, 30, .85], [50, 24, .6], [60, 40, .7], [48, 56, .55], [64, 70, .6], [80, 64, .55], [90, 82, .65]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
  },
  Pisces: {
    stars: [[12, 16, .6], [26, 36, .55], [40, 58, .6], [58, 86, .9], [76, 72, .55], [86, 52, .6], [80, 40, .5], [90, 32, .5], [96, 44, .5]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 5]],
  },
};

let uid = 0;
/** SVG drawing of a constellation. `animate` draws the lines in on load. */
export function constellationSVG(name, { label = name, animate = false, className = "constellation" } = {}) {
  const c = CONSTELLATIONS[name];
  if (!c) return "";
  const id = `cg${++uid}`;
  const lines = c.lines.map(([a, b], i) => {
    const [x1, y1] = c.stars[a], [x2, y2] = c.stars[b];
    const len = Math.hypot(x2 - x1, y2 - y1).toFixed(1);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${animate ? `style="--len:${len};animation-delay:${(i * 0.18).toFixed(2)}s" class="draw"` : ""}/>`;
  }).join("");
  const stars = c.stars.map(([x, y, r], i) => `
    <circle cx="${x}" cy="${y}" r="${(3.4 * r + 1.2).toFixed(2)}" fill="url(#${id})" class="halo"/>
    <circle cx="${x}" cy="${y}" r="${(1.1 * r + .5).toFixed(2)}" class="core" style="animation-delay:${(i * 0.37 % 3).toFixed(2)}s"/>`).join("");
  return `<svg class="${className}" viewBox="-6 -6 112 112" role="img" aria-label="${label} constellation">
    <defs><radialGradient id="${id}"><stop offset="0" stop-color="#fff6dc" stop-opacity=".9"/><stop offset="1" stop-color="#fff6dc" stop-opacity="0"/></radialGradient></defs>
    <g class="links">${lines}</g>${stars}</svg>`;
}
