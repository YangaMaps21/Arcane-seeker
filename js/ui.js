import { ROMAN } from "./data/tarot.js";

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const TXT = "︎"; // force text (not emoji) presentation for zodiac glyphs
export const glyph = g => g + TXT;

/* ---------------- tarot card art ---------------- */
const INK = "#2b1a12", OX = "#57192a", BRASS = "#a07c3b", GOLD = "#d7a74e";

const SUIT_GLYPH = {
  wand: (s = 1) => `<g transform="scale(${s})"><path d="M0 -22 L0 22" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M0 -14 q7 -4 9 -10 M0 -4 q-8 -3 -10 -9 M0 6 q7 -3 9 -9" stroke="${OX}" stroke-width="2" fill="none" stroke-linecap="round"/></g>`,
  cup: (s = 1) => `<g transform="scale(${s})"><path d="M-11 -16 h22 q0 16 -11 18 q-11 -2 -11 -18 z" fill="${OX}" stroke="${INK}" stroke-width="1.5"/><path d="M0 2 v12 M-8 16 h16" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/></g>`,
  sword: (s = 1) => `<g transform="scale(${s})"><path d="M0 -24 l3 6 v24 h-6 v-24 z" fill="#c9c2b0" stroke="${INK}" stroke-width="1.3"/><path d="M-10 6 h20" stroke="${OX}" stroke-width="3.5" stroke-linecap="round"/><path d="M0 8 v12" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><circle cx="0" cy="22" r="2.5" fill="${OX}"/></g>`,
  pentacle: (s = 1) => `<g transform="scale(${s})"><circle r="15" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/><circle r="11.5" fill="none" stroke="${INK}" stroke-width=".8"/><path d="${starPath(5, 11, 4.3)}" fill="none" stroke="${OX}" stroke-width="1.4" stroke-linejoin="round"/></g>`,
};

function starPath(points, R, r, rot = -90) {
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const rad = (i % 2 ? r : R), a = (rot + i * 180 / points) * Math.PI / 180;
    d += (i ? "L" : "M") + (rad * Math.cos(a)).toFixed(2) + " " + (rad * Math.sin(a)).toFixed(2);
  }
  return d + "Z";
}

function rays(n, r1, r2, stroke = BRASS, w = 1.5) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = i * 2 * Math.PI / n;
    s += `<line x1="${(r1 * Math.cos(a)).toFixed(1)}" y1="${(r1 * Math.sin(a)).toFixed(1)}" x2="${(r2 * Math.cos(a)).toFixed(1)}" y2="${(r2 * Math.sin(a)).toFixed(1)}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"/>`;
  }
  return s;
}

function majorEmblem(n) {
  switch (n) {
    case 0: return `<circle r="30" fill="none" stroke="${BRASS}"/><path d="M-30 18 h60" stroke="${INK}" stroke-width="2"/><circle cy="-6" r="9" fill="${GOLD}" stroke="${INK}"/><path d="M-4 3 l-10 15 M4 3 l12 15" stroke="${INK}" stroke-width="2"/>`;
    case 10: return `<circle r="30" fill="none" stroke="${INK}" stroke-width="2"/><circle r="20" fill="none" stroke="${BRASS}"/>${rays(8, 6, 30, INK, 1.4)}<circle r="6" fill="${OX}"/>`;
    case 13: return `<path d="M-26 22 q26 -50 52 0" fill="none" stroke="${INK}" stroke-width="2"/><circle cy="-6" r="8" fill="${GOLD}" stroke="${INK}"/>${rays(12, 12, 20, BRASS, 1)}<path d="M-30 22 h60" stroke="${OX}" stroke-width="2.5"/>`;
    case 16: return `<rect x="-11" y="-20" width="22" height="44" fill="${OX}" stroke="${INK}" stroke-width="1.5"/><path d="M-14 -20 h28 l-4 -8 h-20 z" fill="${GOLD}" stroke="${INK}"/><path d="M18 -34 l-12 16 h8 l-10 16" fill="none" stroke="${GOLD}" stroke-width="2.5" stroke-linejoin="round"/><rect x="-4" y="6" width="8" height="12" fill="${INK}"/>`;
    case 17: return `<path d="${starPath(8, 26, 10)}" fill="${GOLD}" stroke="${INK}" stroke-width="1.2"/>${[[-22,-24],[24,-22],[-26,20],[25,22]].map(([x,y]) => `<path transform="translate(${x} ${y})" d="${starPath(8, 5, 2)}" fill="${GOLD}"/>`).join("")}`;
    case 18: return `<circle r="26" fill="${GOLD}" stroke="${INK}" stroke-width="1.2"/><circle cx="10" cy="-6" r="22" fill="#f3e5c5"/><circle r="31" fill="none" stroke="${BRASS}" stroke-dasharray="2 4"/>`;
    case 19: return `${rays(16, 18, 32, GOLD, 3)}<circle r="16" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/><circle cx="-5" cy="-3" r="1.6" fill="${INK}"/><circle cx="5" cy="-3" r="1.6" fill="${INK}"/><path d="M-6 5 q6 5 12 0" fill="none" stroke="${INK}" stroke-width="1.4"/>`;
    case 21: return `<ellipse rx="22" ry="32" fill="none" stroke="${OX}" stroke-width="4" stroke-dasharray="6 3"/><path d="${starPath(4, 10, 3)}" fill="${GOLD}" stroke="${INK}"/>`;
    default: {
      const sides = 3 + (n % 6);
      return `<circle r="31" fill="none" stroke="${BRASS}"/><path d="${starPath(sides, 26, 26 * Math.cos(Math.PI / sides))}" fill="none" stroke="${INK}" stroke-width="1.6"/>${rays(sides, 30, 34, BRASS, 1.2)}<circle r="9" fill="${OX}"/><circle r="3.5" fill="${GOLD}"/>`;
    }
  }
}

const PIP_LAYOUT = {
  1: [[0, 0]], 2: [[0, -28], [0, 28]], 3: [[0, -34], [0, 0], [0, 34]],
  4: [[-20, -26], [20, -26], [-20, 26], [20, 26]],
  5: [[-20, -30], [20, -30], [0, 0], [-20, 30], [20, 30]],
  6: [[-20, -32], [20, -32], [-20, 0], [20, 0], [-20, 32], [20, 32]],
  7: [[-20, -36], [20, -36], [0, -18], [-20, 2], [20, 2], [-20, 36], [20, 36]],
  8: [[-20, -38], [20, -38], [0, -20], [-20, 0], [20, 0], [0, 20], [-20, 38], [20, 38]],
  9: [[-22, -38], [22, -38], [-22, -13], [22, -13], [0, 0], [-22, 13], [22, 13], [-22, 38], [22, 38]],
  10: [[-22, -40], [22, -40], [0, -27], [-22, -13], [22, -13], [-22, 13], [22, 13], [0, 27], [-22, 40], [22, 40]],
};

function minorArt(card) {
  const g = SUIT_GLYPH[card.glyph];
  if (card.number <= 10) {
    const scale = card.number === 1 ? 2 : card.number <= 3 ? 0.9 : 0.62;
    return PIP_LAYOUT[card.number].map(([x, y]) => `<g transform="translate(${x} ${y})">${g(scale)}</g>`).join("");
  }
  const letter = card.rank[0];
  const crown = card.number >= 13 ? `<path d="M-14 -44 l5 -10 5 7 4 -10 4 10 5 -7 5 10 z" fill="${GOLD}" stroke="${INK}"/>` : "";
  return `${crown}<circle r="32" fill="none" stroke="${BRASS}"/><g transform="translate(0 -2)">${g(1.3)}</g><text y="48" text-anchor="middle" font-family="IM Fell English SC, Georgia, serif" font-size="16" fill="${OX}">${letter}</text>`;
}

export function cardFrontSVG(card) {
  const top = card.arcana === "Major" ? ROMAN[card.number] : card.number <= 10 ? (card.number === 1 ? "A" : card.number) : card.rank;
  const name = card.arcana === "Major" ? card.name : card.number <= 10 ? `${card.rank} of ${card.suit}` : card.name;
  const fs = name.length > 16 ? 10.5 : 12.5;
  const art = card.arcana === "Major" ? majorEmblem(card.number) : minorArt(card);
  return `<svg viewBox="0 0 140 240" role="img" aria-label="${esc(card.name)}">
    <rect x="9" y="9" width="122" height="222" rx="5" fill="none" stroke="${BRASS}" stroke-width="1"/>
    <text x="70" y="32" text-anchor="middle" font-family="IM Fell English, Georgia, serif" font-size="15" fill="${OX}">${esc(top)}</text>
    <g class="art" style="transform-origin:70px 118px"><g transform="translate(70 118)">${art}</g></g>
    <line x1="22" y1="196" x2="118" y2="196" stroke="${BRASS}" stroke-width=".8"/>
    <text x="70" y="214" text-anchor="middle" font-family="IM Fell English SC, Georgia, serif" font-size="${fs}" fill="${INK}">${esc(name)}</text>
  </svg>`;
}

export function cardBackSVG() {
  return `<svg viewBox="0 0 140 240" aria-hidden="true">
    <defs><pattern id="lattice" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 7h14M7 0v14" stroke="${GOLD}" stroke-opacity=".22" stroke-width="1"/></pattern></defs>
    <rect x="10" y="10" width="120" height="220" rx="5" fill="url(#lattice)" stroke="${GOLD}" stroke-opacity=".7"/>
    <g transform="translate(70 120)">
      <circle r="34" fill="#3a0f1a" stroke="${GOLD}"/>
      ${rays(24, 36, 44, GOLD, 1)}
      <circle r="18" fill="${GOLD}" opacity=".9"/>
      <circle cx="8" cy="-4" r="16" fill="#3a0f1a"/>
      <path transform="translate(-8 14)" d="${starPath(4, 5, 1.6)}" fill="${GOLD}"/>
    </g>
  </svg>`;
}

/** A flippable card button. `reversed` rotates the art on the face. */
export function cardEl(card, { reversed = false, label = "Face-down card", flipped = false } = {}) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "tcard" + (flipped ? " flipped" : "");
  b.setAttribute("aria-label", flipped && card ? `${card.name}${reversed ? ", reversed" : ""}` : label);
  b.innerHTML = `<span class="face back">${cardBackSVG()}</span><span class="face front${reversed ? " reversed" : ""}">${card ? cardFrontSVG(card) : ""}</span>`;
  return b;
}

export function setCardFace(el, card, reversed = false) {
  const front = el.querySelector(".front");
  front.className = "face front" + (reversed ? " reversed" : "");
  front.innerHTML = cardFrontSVG(card);
}

/* ---------------- medallion for signs ---------------- */
export function medallionSVG({ big, small, ring = [], label = "" }) {
  const n = ring.length || 12;
  const ticks = ring.map((t, i) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    const x = 150 + 122 * Math.cos(a), y = 150 + 122 * Math.sin(a);
    return `<text x="${x.toFixed(1)}" y="${(y + 6).toFixed(1)}" text-anchor="middle" font-size="17" fill="currentColor" opacity="${t.active ? 1 : .45}">${esc(t.text)}</text>`;
  }).join("");
  return `<svg class="medallion" viewBox="0 0 300 300" role="img" aria-label="${esc(label)}">
    <circle cx="150" cy="150" r="142" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="150" cy="150" r="104" fill="none" stroke="currentColor" stroke-width="1"/>
    <circle cx="150" cy="150" r="98" fill="#24080f" stroke="currentColor" stroke-width=".6" stroke-dasharray="2 5"/>
    ${ticks}
    <text x="150" y="170" text-anchor="middle" font-size="84" fill="#f3e5c5">${esc(big)}</text>
    <text x="150" y="214" text-anchor="middle" font-size="18" fill="currentColor">${esc(small)}</text>
  </svg>`;
}
