import { DECK, shuffle } from "../data/tarot.js";
import { signFor, fmtRange, dailyReading, seasonSign, signsFromSeason, daysLeftInSeason } from "../data/zodiac.js";
import { chineseSign } from "../data/chinese.js";
import { constellationSVG } from "../data/constellations.js";
import { cardEl, setCardFace, esc, glyph } from "../ui.js";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const store = {
  get: k => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
};

const ICONS = {
  tarot: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="8" y="6" width="20" height="34" rx="2" transform="rotate(-10 18 23)"/><rect x="20" y="8" width="20" height="34" rx="2" transform="rotate(8 30 25)"/><path d="M30 20l1.4 3.6 3.6 1.4-3.6 1.4L30 30l-1.4-3.6L25 25l3.6-1.4z" fill="currentColor"/></svg>`,
  chinese: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="24" cy="24" r="19"/><path d="M24 5a9.5 9.5 0 0 1 0 19a9.5 9.5 0 0 0 0 19"/><circle cx="24" cy="14.5" r="2.4" fill="currentColor"/><circle cx="24" cy="33.5" r="2.4"/></svg>`,
  palm: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M14 44V24l-5-7c-1.5-2 1-4.5 3-2.5L16 19V8a2 2 0 0 1 4 0v12V5a2 2 0 0 1 4 0v15V7a2 2 0 0 1 4 0v14V11a2 2 0 0 1 4 0v18c0 8-4 15-10 15z"/><path d="M19 30q5 -3 10 0M18 35q4 2 9 -1"/></svg>`,
  game: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="24" cy="24" r="6"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(-20 24 24)"/><circle cx="42" cy="17" r="2" fill="currentColor"/></svg>`,
};

export default function home(main) {
  const now = new Date();
  const season = seasonSign(now);
  const seasonRead = dailyReading(season, now);
  const left = daysLeftInSeason(season, now);
  const dateLabel = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const thisYear = now.getFullYear();

  main.innerHTML = `
    <section class="hero" aria-labelledby="hero-h">
      <div>
        <p class="today-line">${dateLabel}, ${season.name} season</p>
        <h1 id="hero-h">Find your place in the stars.</h1>
        <p class="lede">Enter your birth date to see your sign, its constellation and today's update.</p>
        <form class="birth-form" id="birthForm" novalidate>
          <div class="field"><label for="bDay">Day</label>
            <select id="bDay" required><option value="">Day</option>${range(1, 31).map(d => `<option>${d}</option>`).join("")}</select></div>
          <div class="field"><label for="bMonth">Month</label>
            <select id="bMonth" required><option value="">Month</option>${MONTHS.map((m, i) => `<option value="${i + 1}">${m}</option>`).join("")}</select></div>
          <div class="field"><label for="bYear">Year</label>
            <select id="bYear" required><option value="">Year</option>${range(1920, thisYear).reverse().map(y => `<option>${y}</option>`).join("")}</select></div>
          <button class="btn primary" type="submit">Reveal my sign</button>
        </form>
        <p class="form-error" id="formError" role="alert"></p>
        <div id="yourSign" aria-live="polite"></div>
      </div>

      <aside class="panel spotlight" aria-label="${season.name} season spotlight">
        <span class="badge">In season now</span>
        ${constellationSVG(season.name, { animate: true })}
        <h2>${glyph(season.glyph)} ${season.name}</h2>
        <p class="range">${fmtRange(season)}, ${left} day${left === 1 ? "" : "s"} left</p>
        <p class="oracle-voice" style="text-align:left">${esc(seasonRead.text)}</p>
        <p class="muted">Lucky number <b style="color:var(--gold);font-weight:400">${seasonRead.luckyNumber}</b>, lucky colour <b style="color:var(--gold);font-weight:400">${seasonRead.luckyColour}</b></p>
        <a class="btn" href="#/zodiac?sign=${season.name}">Read ${season.name}'s update</a>
      </aside>
    </section>

    <section aria-labelledby="updates-h">
      <div class="section-head">
        <h2 id="updates-h">Today's star updates</h2>
        <p>Fresh readings for every sign, renewed at midnight.</p>
      </div>
      <div class="sign-grid">
        ${signsFromSeason(now).map((s, i) => signCard(s, i, s === season, now)).join("")}
      </div>
    </section>

    <section aria-labelledby="extras-h">
      <div class="section-head">
        <h2 id="extras-h">More from the observatory</h2>
        <p>Cards, palms and the lunar calendar.</p>
      </div>
      <div class="extras">
        <div class="panel card-of-day" id="cardOfDay">
          <h3 style="margin-top:0">Card of the day</h3>
          <p class="muted">Three cards from the full deck. Choose one.</p>
          <div class="hero-cards" id="heroCards"></div>
          <div class="hero-reveal" id="heroReveal" aria-live="polite"></div>
        </div>
        <nav class="portals" aria-label="More readings">
          ${portal("tarot", "Tarot spreads", "Past, present and future, or a five-card cross from all 78 cards.")}
          ${portal("chinese", "Chinese zodiac", "Your animal, element and best matches from the lunar calendar.")}
          ${portal("palm", "Palm reading", "Learn the lines of your hand, then describe yours for a reading.")}
          ${portal("game", "Oracle's table", "Guess higher or lower through the Major Arcana.")}
        </nav>
      </div>
    </section>`;

  // ---- birth date ----
  const form = main.querySelector("#birthForm");
  const err = main.querySelector("#formError");
  const out = main.querySelector("#yourSign");
  const [dSel, mSel, ySel] = ["#bDay", "#bMonth", "#bYear"].map(s => main.querySelector(s));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = +dSel.value, m = +mSel.value, y = +ySel.value;
    if (!d || !m || !y) { err.textContent = "Choose your day, month and year of birth."; return; }
    const test = new Date(y, m - 1, d);
    if (test.getMonth() !== m - 1) { err.textContent = `${MONTHS[m - 1]} ${y} has no day ${d}. Check the day and month.`; return; }
    err.textContent = "";
    store.set("as-bday", `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
    showSign(y, m, d, true);
  });

  function showSign(y, m, d, animate) {
    const s = signFor(m, d);
    const r = dailyReading(s, now);
    const c = chineseSign(y, m, d);
    out.innerHTML = `
      <div class="panel your-sign">
        ${constellationSVG(s.name, { animate })}
        <div>
          <h2>You are ${s.name} ${glyph(s.glyph)}</h2>
          <p class="muted">${s.element} sign ruled by ${s.ruler}. Chinese zodiac: ${c.element} ${c.animal.name}.</p>
          <p><b style="color:var(--gold);font-weight:400">Today:</b> ${esc(r.text)}</p>
          <div class="actions">
            <a class="btn" href="#/zodiac?sign=${s.name}">Full reading</a>
            <a class="btn ghost" href="#/chinese">Your ${c.animal.name} year</a>
          </div>
        </div>
      </div>`;
  }

  const saved = store.get("as-bday");
  if (saved) {
    const [y, m, d] = saved.split("-").map(Number);
    dSel.value = d; mSel.value = m; ySel.value = y;
    showSign(y, m, d, false);
  }

  // ---- card of the day ----
  const wrap = main.querySelector("#heroCards");
  const reveal = main.querySelector("#heroReveal");
  function dealDay() {
    wrap.innerHTML = "";
    reveal.innerHTML = "";
    const picks = shuffle(DECK).slice(0, 3);
    let done = false;
    const els = picks.map((c, i) => {
      const el = cardEl(c, { label: `Card ${i + 1} of 3, face down` });
      wrap.appendChild(el);
      el.addEventListener("click", () => {
        if (done) return;
        done = true;
        const rev = Math.random() < 0.3;
        setCardFace(el, c, rev);
        el.classList.add("flipped");
        el.setAttribute("aria-label", `${c.name}${rev ? ", reversed" : ""}`);
        els.forEach(o => { if (o !== el) { o.disabled = true; o.style.opacity = ".3"; } });
        reveal.innerHTML = `
          <p style="font-family:var(--display);font-size:1.7rem;margin-bottom:.1em">${esc(c.name)}${rev ? ` <span class="muted" style="font-size:1.1rem">(reversed)</span>` : ""}</p>
          <p class="muted">${esc(rev ? c.reversed : c.upright)}.</p>
          <p><button class="btn ghost" type="button" id="again">Shuffle again</button></p>`;
        reveal.querySelector("#again").addEventListener("click", dealDay);
      });
      return el;
    });
  }
  dealDay();
}

function signCard(s, i, inSeason, now) {
  const r = dailyReading(s, now);
  return `
    <a class="sign-card${inSeason ? " in-season" : ""}" style="--i:${i}" href="#/zodiac?sign=${s.name}">
      ${constellationSVG(s.name)}
      <span class="name">${s.name} ${glyph(s.glyph)}</span>
      <span class="dates">${fmtRange(s)}${inSeason ? `<br><span class="tag">In season now</span>` : ""}</span>
      <span class="text">${esc(r.text)}</span>
      <span class="meta"><span>Mood <b>${r.mood}</b></span><span>Lucky <b>${r.luckyNumber}</b></span></span>
    </a>`;
}

function portal(key, title, text) {
  return `<a class="portal" href="#/${key}">${ICONS[key]}<h3>${title}</h3><p>${text}</p></a>`;
}

function range(a, b) { return Array.from({ length: b - a + 1 }, (_, i) => a + i); }
