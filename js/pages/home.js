import { DECK, shuffle } from "../data/tarot.js";
import { cardEl, setCardFace, esc } from "../ui.js";

const ICONS = {
  zodiac: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="24" cy="24" r="20"/><circle cx="24" cy="24" r="12"/><path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6"/></svg>`,
  chinese: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="24" cy="24" r="20"/><path d="M24 4a10 10 0 0 1 0 20a10 10 0 0 0 0 20"/><circle cx="24" cy="14" r="2.5" fill="currentColor"/><circle cx="24" cy="34" r="2.5"/></svg>`,
  tarot: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="8" y="6" width="20" height="34" rx="2" transform="rotate(-10 18 23)"/><rect x="20" y="8" width="20" height="34" rx="2" transform="rotate(8 30 25)"/><circle cx="30" cy="25" r="4"/></svg>`,
  palm: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 44V24l-5-7c-1.5-2 1-4.5 3-2.5L16 19V8a2 2 0 0 1 4 0v12V5a2 2 0 0 1 4 0v15V7a2 2 0 0 1 4 0v14V11a2 2 0 0 1 4 0v18c0 8-4 15-10 15z"/><path d="M19 30q5 -3 10 0M18 35q4 2 9 -1"/></svg>`,
  game: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="24" cy="24" r="19"/><circle cx="24" cy="24" r="14" stroke-dasharray="3 3"/><path d="M24 15v18M19 20q0-4 5-4t5 4q0 4-5 4t-5 4q0 4 5 4t5-4"/></svg>`,
};

export default function home(main) {
  main.innerHTML = `
    <section class="hero">
      <div>
        <h1>Ask the cards. Read the stars.</h1>
        <p class="lede">Find your star sign and Chinese zodiac, draw a tarot spread, learn the lines of your palm — then try your luck at the Oracle's table.</p>
        <p><a class="btn" href="#/tarot">Draw a tarot spread</a> &nbsp; <a class="btn ghost" href="#/zodiac">Find my star sign</a></p>
      </div>
      <div>
        <div class="hero-cards" id="heroCards"></div>
        <div class="hero-reveal" aria-live="polite" id="heroReveal">
          <p class="muted" style="font-family:var(--display);font-size:1.3rem">Pick one card for today.</p>
        </div>
      </div>
    </section>

    <section aria-labelledby="booths-h">
      <h2 id="booths-h" class="visually-hidden">Readings</h2>
      <div class="booths">
        ${booth("zodiac", "Star signs", "Your sun sign, its element and ruling planet, today's reading and who you click with.")}
        ${booth("chinese", "Chinese zodiac", "Your animal and element from the lunar calendar, with best and trickiest matches.")}
        ${booth("tarot", "Tarot", "One card, past–present–future or a five-card cross, drawn from the full 78-card deck.")}
        ${booth("palm", "Palm reading", "Explore the lines and mounts of the hand, then describe your own for a reading.")}
        ${booth("game", "Oracle's table", "A card game of fortune: guess higher or lower through the Major Arcana.")}
      </div>
    </section>`;

  const wrap = main.querySelector("#heroCards");
  const reveal = main.querySelector("#heroReveal");
  const picks = shuffle(DECK).slice(0, 3);
  const els = picks.map((c, i) => {
    const el = cardEl(c, { label: `Card ${i + 1} of 3, face down` });
    wrap.appendChild(el);
    return el;
  });
  let done = false;
  els.forEach((el, i) => el.addEventListener("click", () => {
    if (done) return;
    done = true;
    const rev = Math.random() < 0.3;
    setCardFace(el, picks[i], rev);
    el.classList.add("flipped");
    el.setAttribute("aria-label", `${picks[i].name}${rev ? ", reversed" : ""}`);
    els.forEach(e => { if (e !== el) { e.disabled = true; e.style.opacity = ".35"; } });
    const c = picks[i];
    reveal.innerHTML = `
      <p style="font-family:var(--display);font-size:1.6rem;color:var(--card);margin-bottom:.2em">${esc(c.name)}${rev ? " <span class='muted' style='font-size:1.1rem'>(reversed)</span>" : ""}</p>
      <p class="muted">${esc(rev ? c.reversed : c.upright)}.</p>
      <p><button class="btn ghost" type="button" id="again">Shuffle again</button></p>`;
    reveal.querySelector("#again").addEventListener("click", () => home(main));
  }));
}

function booth(key, title, text) {
  return `<a class="booth" href="#/${key}">${ICONS[key]}<h3>${title}</h3><p>${text}</p></a>`;
}
