// Palm reading: an interactive diagram of a right palm (as you look at your own),
// plus a short questionnaire that assembles a reading.

const LINES = {
  heart: {
    name: "Heart line", d: "M92 300 C150 282 205 270 262 250",
    find: "The highest major line, running across the top of the palm from below the little finger toward the index or middle finger.",
    means: "Emotions, love and how you connect with others.",
  },
  head: {
    name: "Head line", d: "M300 322 C240 330 170 350 104 384",
    find: "Below the heart line, starting near the thumb side and running across the palm.",
    means: "Thinking style, learning and decision-making.",
  },
  life: {
    name: "Life line", d: "M300 326 C240 360 238 430 266 490",
    find: "Curves around the base of the thumb, usually starting near the head line.",
    means: "Vitality, energy and major life changes — not how long you'll live.",
  },
  fate: {
    name: "Fate line", d: "M196 490 C198 420 202 350 210 288",
    find: "A vertical line running up the centre of the palm toward the middle finger. Not everyone has one.",
    means: "Career, life path and the influence of circumstances.",
  },
  sun: {
    name: "Sun line", d: "M150 452 C150 410 152 360 156 306",
    find: "A shorter vertical line below the ring finger. Often faint or absent.",
    means: "Creativity, recognition and fulfilment.",
  },
};

const MOUNTS = [
  ["Jupiter", 264, 236, "Ambition and confidence"],
  ["Saturn", 210, 226, "Responsibility and wisdom"],
  ["Apollo", 156, 236, "Creativity and joy"],
  ["Mercury", 104, 250, "Communication and wit"],
  ["Venus", 296, 430, "Love, warmth and sensuality"],
  ["Moon", 112, 440, "Imagination and intuition"],
];

const QUIZ = [
  { key: "shape", q: "What shape is your hand?", opts: [
    ["earth", "Square palm, short fingers", "Earth hand: practical, grounded and dependable. You learn by doing and like results you can touch."],
    ["air", "Square palm, long fingers", "Air hand: curious, talkative and quick-minded. Ideas and conversation fuel you."],
    ["fire", "Long palm, short fingers", "Fire hand: energetic, spontaneous and driven. You lead with enthusiasm."],
    ["water", "Long palm, long fingers", "Water hand: sensitive, creative and intuitive. You feel things deeply and notice what others miss."],
  ]},
  { key: "heart", q: "How does your heart line run?", opts: [
    ["curved", "Long and curving up toward the fingers", "Your heart line curves upward: you express feelings openly and love warmly."],
    ["straight", "Straight across the palm", "A straight heart line suggests you're thoughtful in love, steady and a little reserved."],
    ["short", "Short, ending under the middle finger", "A shorter heart line points to independence — you value your own space in relationships."],
    ["chained", "Broken or chained", "A chained heart line hints at a rich emotional history and a heart that has learned from it."],
  ]},
  { key: "head", q: "And your head line?", opts: [
    ["straight", "Long and straight", "Your straight head line marks a logical, focused thinker who likes clear plans."],
    ["sloping", "Sloping down toward the wrist", "A sloping head line belongs to an imaginative, creative mind."],
    ["short", "Short", "A short head line suggests quick, decisive thinking — you trust your first instinct."],
    ["forked", "Forked at the end", "A forked head line is the 'writer's fork': you see both sides and can argue either well."],
  ]},
  { key: "life", q: "How does your life line look?", opts: [
    ["deep", "Deep and clearly drawn", "A deep life line shows robust energy and a strong sense of self."],
    ["wide", "Swings wide into the palm", "A wide arc speaks of adventure and an appetite for new experiences."],
    ["close", "Hugs the thumb closely", "A life line close to the thumb suggests you recharge best in familiar, cosy surroundings."],
    ["faint", "Faint or broken in places", "A fainter or broken life line points to times of change and reinvention — you adapt well."],
  ]},
  { key: "fate", q: "Can you find a fate line?", opts: [
    ["strong", "Yes, strong and straight", "A strong fate line suggests a clear sense of direction and purpose in your work."],
    ["life", "Yes, starting from the life line", "A fate line rising from the life line hints at success built through your own effort."],
    ["faint", "Faint or patchy", "A faint fate line suggests a flexible path with several chapters."],
    ["none", "I can't see one", "No fate line? You write your own route — less predestined, more freely chosen."],
  ]},
];

export default function palm(main) {
  main.innerHTML = `
    <div class="page-intro">
      <h1>Palm reading</h1>
      <p>In palmistry your dominant hand shows who you're becoming; the other shows what you were born with. Select a line on the hand to learn where to find it.</p>
    </div>
    <div class="palm-layout">
      <div>
        <div class="line-keys segmented" role="group" aria-label="Palm lines">
          ${Object.entries(LINES).map(([k, l]) => `<button type="button" data-line="${k}" aria-pressed="false">${l.name}</button>`).join("")}
        </div>
        ${handSVG()}
        <label class="choice" style="color:var(--dim)"><input type="checkbox" id="showMounts"> Show the mounts</label>
      </div>
      <div>
        <div class="panel" id="lineInfo" aria-live="polite">
          <h2>The five main lines</h2>
          <p>Most palms show the heart, head and life lines clearly. The fate and sun lines are subtler and sometimes missing — that's normal.</p>
          <p class="muted">Select a line on the hand, or one of the buttons above it.</p>
        </div>
      </div>
    </div>

    <section style="margin-top:56px">
      <h2>Read your own palm</h2>
      <p class="muted">Look at your dominant hand in good light and choose what you see.</p>
      <form class="panel" id="palmQuiz">
        ${QUIZ.map(q => `
          <div class="quiz-q"><fieldset><legend>${q.q}</legend>
            ${q.opts.map(([v, label]) => `<label class="choice"><input type="radio" name="${q.key}" value="${v}" required> <span>${label}</span></label>`).join("")}
          </fieldset></div>`).join("")}
        <button class="btn" type="submit">Read my palm</button>
        <div id="palmResult" aria-live="polite" style="margin-top:24px"></div>
      </form>
    </section>`;

  const info = main.querySelector("#lineInfo");
  const svg = main.querySelector(".palm-svg");

  function select(key) {
    const l = LINES[key];
    svg.querySelectorAll(".line").forEach(p => p.classList.toggle("active", p.dataset.line === key));
    main.querySelectorAll(".line-keys button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.line === key)));
    info.innerHTML = `<h2>${l.name}</h2><p><strong>What it shows:</strong> ${l.means}</p><p><strong>Where to find it:</strong> ${l.find}</p>`;
  }

  main.querySelector(".line-keys").addEventListener("click", e => { const b = e.target.closest("button"); if (b) select(b.dataset.line); });
  svg.querySelectorAll("g[data-line]").forEach(g => {
    g.addEventListener("click", () => select(g.dataset.line));
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(g.dataset.line); } });
  });
  main.querySelector("#showMounts").addEventListener("change", e => {
    svg.querySelector("#mounts").style.display = e.target.checked ? "" : "none";
  });

  main.querySelector("#palmQuiz").addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const parts = QUIZ.map(q => q.opts.find(o => o[0] === data.get(q.key))[2]);
    const [shape, ...rest] = parts;
    main.querySelector("#palmResult").innerHTML = `
      <h2>Your reading</h2>
      <p class="oracle-voice">${shape}</p>
      ${rest.map(p => `<p>${p}</p>`).join("")}
      <p class="muted">Lines change over the years — read again whenever you like.</p>`;
  });
}

function handSVG() {
  const shapes = `
    <rect x="82" y="150" width="50" height="150" rx="24"/>
    <rect x="128" y="82" width="56" height="210" rx="27"/>
    <rect x="181" y="50" width="58" height="230" rx="28"/>
    <rect x="235" y="90" width="56" height="200" rx="27"/>
    <path d="M290 480 L312 352 Q336 312 368 276 Q392 254 404 280 Q404 312 378 360 Q352 420 322 470 Z"/>
    <path d="M80 270 Q78 230 120 228 L290 228 Q318 232 318 280 L318 420 Q312 505 220 505 Q120 505 92 450 Q78 400 80 270 Z"/>`;
  return `
  <svg class="palm-svg" viewBox="40 30 380 490" role="img" aria-label="Diagram of a right palm with the five main lines">
    <g class="hand" stroke-width="4">${shapes}</g>
    <g class="hand-fill">${shapes}</g>
    <g class="creases" stroke-width="1.5" fill="none" stroke-linecap="round">
      <path d="M92 200 h30 M92 236 h30 M140 140 h34 M140 190 h34 M194 115 h36 M194 170 h36 M246 150 h34 M246 200 h34"/>
      <path d="M130 178 V250 M182 112 V246 M237 122 V250" stroke="rgba(143,220,255,.45)" stroke-width="1.5"/>
    </g>
    <g id="mounts" style="display:none">
      ${MOUNTS.map(([n, x, y, t]) => `<g><title>Mount of ${n}: ${t}</title><circle class="mount" cx="${x}" cy="${y}" r="22"/><text class="mount-label" x="${x}" y="${y + 4}" text-anchor="middle">${n}</text></g>`).join("")}
    </g>
    ${Object.entries(LINES).map(([k, l]) => `
      <g data-line="${k}" tabindex="0" role="button" aria-label="${l.name}">
        <path class="line-hit" d="${l.d}"/>
        <path class="line" data-line="${k}" d="${l.d}"/>
      </g>`).join("")}
  </svg>`;
}
