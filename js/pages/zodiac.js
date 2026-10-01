import { SIGNS, signFor, fmtRange, dailyReading, compatibility, seasonSign } from "../data/zodiac.js";
import { constellationSVG } from "../data/constellations.js";
import { glyph, esc } from "../ui.js";

const store = {
  get: k => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
};

export default function zodiac(main, params = new URLSearchParams()) {
  main.innerHTML = `
    <div class="page-intro">
      <h1>Star signs</h1>
      <p>Enter your birthday to find your sun sign, or pick any sign to read its constellation, traits and today's update.</p>
    </div>
    <form class="form-row" id="zform">
      <div class="field"><label for="bday">Birthday</label><input type="date" id="bday" required></div>
      <button class="btn primary" type="submit">Read my stars</button>
      <div class="field"><label for="pick">Or choose a sign</label>
        <select id="pick"><option value="">Choose…</option>${SIGNS.map(s => `<option>${s.name}</option>`).join("")}</select>
      </div>
    </form>
    <div id="zout" aria-live="polite"></div>`;

  const out = main.querySelector("#zout");
  const bday = main.querySelector("#bday");
  const pick = main.querySelector("#pick");

  main.querySelector("#zform").addEventListener("submit", e => {
    e.preventDefault();
    if (!bday.value) return;
    const [, m, d] = bday.value.split("-").map(Number);
    store.set("as-bday", bday.value);
    const s = signFor(m, d);
    pick.value = s.name;
    render(s);
  });
  pick.addEventListener("change", () => { const s = SIGNS.find(x => x.name === pick.value); if (s) render(s); });

  function render(s) {
    const today = dailyReading(s);
    out.innerHTML = `
      <div class="reading-grid">
        <div><div class="sky-disc">${constellationSVG(s.name, { animate: true })}</div>
          <p class="muted" style="text-align:center;max-width:320px;margin-top:12px">${s.symbol}${s === seasonSign() ? " is in season now" : ""}</p></div>
        <article class="panel">
          <h2>${s.name} ${glyph(s.glyph)}</h2>
          <p class="muted" style="margin-top:-.4em">${fmtRange(s)}</p>
          <dl class="facts">
            <div><dt>Element</dt><dd>${s.element}</dd></div>
            <div><dt>Quality</dt><dd>${s.modality}</dd></div>
            <div><dt>Ruling planet</dt><dd>${s.ruler}</dd></div>
            <div><dt>Mood today</dt><dd>${today.mood}</dd></div>
          </dl>
          <ul class="tags">${s.traits.map(t => `<li>${t}</li>`).join("")}</ul>
          <p>${s.about}</p>
          <p><strong>Gifts:</strong> ${s.strengths}<br><strong>Watch for:</strong> ${s.challenges}</p>

          <h3>Today's reading</h3>
          <p class="oracle-voice">${esc(today.text)}</p>
          <p class="muted">Lucky number <strong>${today.luckyNumber}</strong> &nbsp;·&nbsp; Lucky colour <strong>${today.luckyColour}</strong></p>

          <h3>Compatibility</h3>
          <p class="muted">Most at ease with ${s.matches.join(", ")}.</p>
          <div class="form-row" style="margin-bottom:12px">
            <div class="field"><label for="partner">Check a match with</label>
              <select id="partner">${SIGNS.map(x => `<option ${x.name === s.matches[0] ? "selected" : ""}>${x.name}</option>`).join("")}</select>
            </div>
          </div>
          <div id="compat"></div>
        </article>
      </div>`;
    const partner = out.querySelector("#partner");
    const compat = out.querySelector("#compat");
    const showCompat = () => {
      const p = SIGNS.find(x => x.name === partner.value);
      const c = compatibility(s, p);
      compat.innerHTML = `
        <p style="font-family:var(--display);font-size:1.4rem;margin-bottom:.2em">${glyph(s.glyph)} ${s.name} + ${glyph(p.glyph)} ${p.name}: ${c.score}%</p>
        <div role="meter" aria-valuenow="${c.score}" aria-valuemin="0" aria-valuemax="100" aria-label="Compatibility" style="height:8px;border-radius:4px;background:rgba(255,255,255,.08);max-width:360px;margin-bottom:10px">
          <div style="height:100%;width:${c.score}%;border-radius:4px;background:linear-gradient(90deg,var(--comet),var(--gold))"></div>
        </div>
        <p>${c.note}</p>`;
    };
    partner.addEventListener("change", showCompat);
    showCompat();
  }

  const saved = store.get("as-bday");
  if (saved) bday.value = saved;
  const asked = SIGNS.find(x => x.name === params.get("sign"));
  if (asked) { pick.value = asked.name; render(asked); }
  else if (saved) main.querySelector("#zform").requestSubmit();
  else { pick.value = seasonSign().name; render(seasonSign()); }
}
