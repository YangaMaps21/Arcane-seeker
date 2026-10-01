import { ANIMALS, ELEMENTS, chineseSign, animalByName } from "../data/chinese.js";
import { medallionSVG } from "../ui.js";

export default function chinese(main) {
  main.innerHTML = `
    <div class="page-intro">
      <h1>Chinese zodiac</h1>
      <p>Your animal is set by the lunar year you were born in, which begins at Lunar New Year — usually late January or February.</p>
    </div>
    <form class="form-row" id="cform">
      <div class="field"><label for="cbday">Birthday</label><input type="date" id="cbday" required min="1900-01-01" max="2099-12-31"></div>
      <button class="btn primary" type="submit">Find my animal</button>
    </form>
    <div id="cout" aria-live="polite"></div>
    <section style="margin-top:48px">
      <h2>The twelve animals</h2>
      <div class="segmented" id="animalList">${ANIMALS.map(a => `<button type="button" aria-pressed="false" data-a="${a.name}">${a.hanzi} ${a.name}</button>`).join("")}</div>
    </section>`;

  const out = main.querySelector("#cout");
  const input = main.querySelector("#cbday");
  try { const s = localStorage.getItem("as-bday"); if (s) input.value = s; } catch {}

  main.querySelector("#cform").addEventListener("submit", e => {
    e.preventDefault();
    const [y, m, d] = input.value.split("-").map(Number);
    if (!y) return;
    const r = chineseSign(y, m, d);
    let note = "";
    if (r.year !== y) note = `Born before Lunar New Year ${y}, so you belong to the ${r.year} lunar year.`;
    if (!r.exact) note += ` Lunar New Year dates are built in for 1950–2030; for other years we've used 4 February as the boundary, so check if your birthday is in late January or early February.`;
    render(r.animal, { element: r.element, polarity: r.polarity, year: r.year, note });
    pressed(r.animal.name);
  });

  main.querySelector("#animalList").addEventListener("click", e => {
    const b = e.target.closest("button[data-a]");
    if (!b) return;
    render(animalByName(b.dataset.a));
    pressed(b.dataset.a);
    out.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  function pressed(name) {
    main.querySelectorAll("#animalList button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.a === name)));
  }

  function render(a, extra = null) {
    const ring = ANIMALS.map(x => ({ text: x.hanzi, active: x === a }));
    const title = extra ? `${extra.element} ${a.name}` : a.name;
    out.innerHTML = `
      <div class="reading-grid">
        <div>${medallionSVG({ big: a.hanzi, small: a.name, ring, label: title })}</div>
        <article class="panel">
          <h2>${title}</h2>
          ${extra ? `<p class="muted" style="margin-top:-.4em">Lunar year ${extra.year} · ${extra.polarity}</p>` : ""}
          ${extra?.note ? `<p class="muted"><em>${extra.note}</em></p>` : ""}
          <ul class="tags">${a.traits.map(t => `<li>${t}</li>`).join("")}</ul>
          <p>${a.about}</p>
          ${extra ? `<p><strong>${extra.element} element:</strong> ${ELEMENTS[extra.element]} It colours your ${a.name} nature with that energy.</p>` : ""}
          <dl class="facts">
            <div><dt>Best matches</dt><dd>${a.best.join(", ")}</dd></div>
            <div><dt>Trickier with</dt><dd>${a.avoid.join(", ")}</dd></div>
            <div><dt>Lucky numbers</dt><dd>${a.numbers.join(", ")}</dd></div>
            <div><dt>Lucky colours</dt><dd>${a.colours.join(", ")}</dd></div>
          </dl>
          <p class="muted">Recent ${a.name} years: ${recentYears(a).join(", ")}</p>
        </article>
      </div>`;
  }
}

function recentYears(a) {
  const idx = ANIMALS.indexOf(a);
  const ys = [];
  for (let y = 1948; y <= 2032; y++) if (((y - 4) % 12 + 12) % 12 === idx) ys.push(y);
  return ys.slice(-6);
}
