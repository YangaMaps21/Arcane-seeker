// The Oracle's table: higher-or-lower through the 22 Major Arcana.
import { MAJOR_ARCANA, ROMAN, shuffle } from "../data/tarot.js";
import { cardEl, setCardFace, esc } from "../ui.js";

const MAX_COINS = 3;
const best = {
  get: () => { try { return Number(localStorage.getItem("as-best")) || 0; } catch { return 0; } },
  set: v => { try { localStorage.setItem("as-best", String(v)); } catch {} },
};

export default function game(main) {
  main.innerHTML = `
    <div class="page-intro">
      <h1>The Oracle's table</h1>
      <p>The 22 Major Arcana are shuffled face down. Guess whether the next card's number is higher or lower than the one showing. Run the whole deck to complete The World.</p>
    </div>
    <div class="table-felt">
      <div class="scoreboard">
        <span>Fortune<b id="score">0</b></span>
        <span>Streak<b id="streak">0</b></span>
        <span>Coins <span class="coins" id="coins" aria-label=""></span></span>
        <span>Best<b id="best">0</b></span>
      </div>
      <div class="game-board">
        <div><div id="curSlot"></div><p class="label-under" id="curLabel"></p></div>
        <div class="game-mid">
          <button class="btn" id="hi" type="button">Higher</button>
          <button class="btn" id="lo" type="button">Lower</button>
        </div>
        <div><div id="nextSlot"></div><p class="label-under" id="left"></p></div>
      </div>
      <p class="game-status" id="status" aria-live="polite">What comes next?</p>
      <p style="text-align:center;margin:0"><button class="btn ghost" id="restart" type="button">New game</button></p>
    </div>
    <section class="how">
      <h2>How to play</h2>
      <ol>
        <li>Guess whether the next card is higher or lower. The Fool is 0, The World is XXI. On a keyboard, use the up and down arrow keys.</li>
        <li>Each correct guess adds your current streak to your fortune — so long streaks pay more.</li>
        <li>A wrong guess costs one of your three coins and resets your streak.</li>
        <li>Turn up the Wheel of Fortune and you win a coin back. Turn up The Tower and your streak collapses — even on a right guess.</li>
        <li>Run the whole deck for a bonus of 10. Lose all your coins and the reading ends.</li>
      </ol>
    </section>`;

  const $ = s => main.querySelector(s);
  const hi = $("#hi"), lo = $("#lo"), status = $("#status");
  let deck, current, coins, score, streak, busy, timer;

  function start() {
    clearTimeout(timer);
    deck = shuffle(MAJOR_ARCANA);
    current = deck.pop();
    coins = MAX_COINS; score = 0; streak = 0; busy = false;
    status.textContent = "What comes next?";
    hi.disabled = lo.disabled = false;
    layout();
  }

  function layout() {
    const cur = cardEl(current, { flipped: true });
    cur.disabled = true;
    $("#curSlot").replaceChildren(cur);
    $("#curLabel").textContent = `${ROMAN[current.number]} · ${current.name}`;
    const next = cardEl(null, { label: "Next card, face down" });
    next.disabled = true;
    $("#nextSlot").replaceChildren(next);
    hud();
  }

  function hud() {
    $("#score").textContent = score;
    $("#streak").textContent = streak;
    const b = best.get();
    $("#best").textContent = b;
    const c = $("#coins");
    c.innerHTML = Array.from({ length: MAX_COINS }, (_, i) => `<span class="coin${i < coins ? "" : " spent"}"></span>`).join("");
    c.setAttribute("aria-label", `${coins} of ${MAX_COINS} coins left`);
    $("#left").textContent = `${deck.length} card${deck.length === 1 ? "" : "s"} left`;
  }

  function guess(dir) {
    if (busy || !deck.length) return;
    busy = true;
    hi.disabled = lo.disabled = true;
    const next = deck.pop();
    const nextEl = $("#nextSlot .tcard");
    setCardFace(nextEl, next);
    nextEl.classList.add("flipped");
    nextEl.setAttribute("aria-label", next.name);

    const right = dir === "hi" ? next.number > current.number : next.number < current.number;
    let msg;
    if (right) {
      streak++;
      score += streak;
      msg = `${next.name} — you read it right. +${streak}`;
    } else {
      coins--;
      streak = 0;
      msg = `${next.name}. The cards had other plans — a coin is lost.`;
    }
    if (next.number === 10 && coins < MAX_COINS && coins > 0) { coins++; msg += " The Wheel turns: one coin returns."; }
    if (next.number === 16 && streak > 0) { streak = 0; msg += " The Tower falls: your streak collapses."; }

    if (score > best.get()) best.set(score);
    status.textContent = msg;
    hud();

    timer = setTimeout(() => {
      current = next;
      if (coins <= 0) return end(false);
      if (!deck.length) return end(true);
      layout();
      busy = false;
      hi.disabled = lo.disabled = false;
      hi.focus({ preventScroll: true });
    }, 1500);
  }

  function end(won) {
    if (won) score += 10;
    if (score > best.get()) best.set(score);
    hud();
    hi.disabled = lo.disabled = true;
    status.innerHTML = won
      ? `The World is complete. Final fortune: <strong>${score}</strong>.`
      : `Your coins are spent. Final fortune: <strong>${score}</strong>.`;
    $("#restart").focus();
  }

  hi.addEventListener("click", () => guess("hi"));
  lo.addEventListener("click", () => guess("lo"));
  $("#restart").addEventListener("click", start);
  const onKey = e => {
    if (e.target.closest("input, select, textarea")) return;
    if (e.key === "ArrowUp") { e.preventDefault(); guess("hi"); }
    if (e.key === "ArrowDown") { e.preventDefault(); guess("lo"); }
  };
  document.addEventListener("keydown", onKey);
  start();

  return () => { clearTimeout(timer); document.removeEventListener("keydown", onKey); };
}
