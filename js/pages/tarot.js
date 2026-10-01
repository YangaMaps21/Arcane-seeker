import { DECK, SPREADS, shuffle } from "../data/tarot.js";
import { cardEl, setCardFace, esc } from "../ui.js";

export default function tarot(main) {
  let spreadKey = "three";

  main.innerHTML = `
    <div class="page-intro">
      <h1>Tarot</h1>
      <p>Hold a question in mind, choose a spread, then turn the cards one at a time. The full 78-card deck is shuffled fresh for every reading.</p>
    </div>
    <form class="form-row" id="tform">
      <div class="field" style="flex:1 1 280px"><label for="q">Your question (optional)</label><input id="q" placeholder="What should I focus on this month?" maxlength="140"></div>
      <div class="field"><span class="field-label" style="color:var(--dim)">Spread</span>
        <div class="segmented" id="spreadPick" role="group" aria-label="Spread">
          ${Object.entries(SPREADS).map(([k, s]) => `<button type="button" data-k="${k}" aria-pressed="${k === spreadKey}">${s.label}</button>`).join("")}
        </div>
      </div>
      <button class="btn primary" type="submit">Shuffle and deal</button>
    </form>
    <div id="table"></div>
    <div id="reading" aria-live="polite"></div>`;

  const table = main.querySelector("#table");
  const reading = main.querySelector("#reading");

  main.querySelector("#spreadPick").addEventListener("click", e => {
    const b = e.target.closest("button[data-k]");
    if (!b) return;
    spreadKey = b.dataset.k;
    main.querySelectorAll("#spreadPick button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });

  main.querySelector("#tform").addEventListener("submit", e => { e.preventDefault(); deal(); });

  function deal() {
    const spread = SPREADS[spreadKey];
    const drawn = shuffle(DECK).slice(0, spread.positions.length).map(card => ({ card, rev: Math.random() < 0.25 }));
    const question = main.querySelector("#q").value.trim();
    let revealed = 0;

    table.innerHTML = `
      ${question ? `<p class="oracle-voice" style="color:var(--star);text-align:center;border:0;padding:0">“${esc(question)}”</p>` : ""}
      <div class="spread spread-${spread.positions.length}"></div>
      <p style="text-align:center"><button class="btn ghost" type="button" id="revealAll">Turn all cards</button></p>`;
    reading.innerHTML = "";
    const spreadEl = table.querySelector(".spread");
    const items = [];

    drawn.forEach(({ card, rev }, i) => {
      const slot = document.createElement("div");
      slot.className = "slot";
      const el = cardEl(card, { label: `${spread.positions[i]}: face-down card. Select to turn.` });
      slot.append(el);
      slot.insertAdjacentHTML("beforeend", `<span class="pos">${spread.positions[i]}</span>`);
      spreadEl.append(slot);
      el.addEventListener("click", () => turn(i, el));
      items.push(el);
    });

    table.querySelector("#revealAll").addEventListener("click", () => {
      items.forEach((el, i) => setTimeout(() => turn(i, el), i * 180));
    });

    const list = document.createElement("div");
    list.className = "panel reading-list";
    list.hidden = true;
    reading.append(list);
    const entries = new Array(drawn.length);

    function turn(i, el) {
      if (el.classList.contains("flipped")) return;
      const { card, rev } = drawn[i];
      setCardFace(el, card, rev);
      el.classList.add("flipped");
      el.disabled = true;
      el.setAttribute("aria-label", `${spread.positions[i]}: ${card.name}${rev ? ", reversed" : ""}`);
      revealed++;
      entries[i] = `
        <div class="reading-item">
          <h3>${esc(spread.positions[i])}: ${esc(card.name)}${rev ? " (reversed)" : ""}</h3>
          <p class="meta">${card.arcana === "Major" ? `Major Arcana ${card.number}` : `${card.suit} · ${card.element} — ${card.theme}`}</p>
          <p>${esc(rev ? card.reversed : card.upright)}.</p>
        </div>`;
      list.hidden = false;
      list.innerHTML = entries.filter(Boolean).join("") + (revealed === drawn.length ? summary(drawn) : "");
      if (revealed === drawn.length) table.querySelector("#revealAll").remove();
    }
  }
}

function summary(drawn) {
  if (drawn.length < 3) return "";
  const majors = drawn.filter(d => d.card.arcana === "Major").length;
  const revs = drawn.filter(d => d.rev).length;
  const suits = {};
  drawn.forEach(d => { if (d.card.suit) suits[d.card.suit] = (suits[d.card.suit] || 0) + 1; });
  const top = Object.entries(suits).sort((a, b) => b[1] - a[1])[0];
  const lines = [];
  if (majors >= Math.ceil(drawn.length / 2)) lines.push("Major Arcana dominate this spread: these are big life themes, not passing moods.");
  else if (majors === 0) lines.push("No Major Arcana appeared: this is about everyday choices that are within your hands.");
  if (top && top[1] >= 2) {
    const flavour = { Wands: "drive and ambition", Cups: "feelings and relationships", Swords: "thoughts, words and decisions", Pentacles: "money, work and the body" };
    lines.push(`${top[0]} recur, pointing toward ${flavour[top[0]]}.`);
  }
  if (revs >= Math.ceil(drawn.length / 2)) lines.push("Many reversals suggest energy that is blocked or turned inward — something to release before moving forward.");
  if (!lines.length) lines.push("A balanced spread: read each position on its own and notice where the story flows.");
  return `<div class="reading-item" style="border-top:1px solid var(--line);padding-top:16px"><h3>The spread as a whole</h3><p class="oracle-voice">${lines.join(" ")}</p></div>`;
}
