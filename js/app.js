import home from "./pages/home.js";
import zodiac from "./pages/zodiac.js";
import chinese from "./pages/chinese.js";
import tarot from "./pages/tarot.js";
import palm from "./pages/palm.js";
import game from "./pages/game.js";

const ROUTES = {
  "": { render: home, title: "Arcane Seeker" },
  zodiac: { render: zodiac, title: "Star signs · Arcane Seeker" },
  chinese: { render: chinese, title: "Chinese zodiac · Arcane Seeker" },
  tarot: { render: tarot, title: "Tarot · Arcane Seeker" },
  palm: { render: palm, title: "Palm reading · Arcane Seeker" },
  game: { render: game, title: "Oracle's table · Arcane Seeker" },
};

const main = document.getElementById("main");
const nav = document.getElementById("nav");
const toggle = document.querySelector(".nav-toggle");
let cleanup = null;

function route() {
  const key = location.hash.replace(/^#\/?/, "").split(/[/?]/)[0];
  const r = ROUTES[key] || ROUTES[""];
  if (typeof cleanup === "function") cleanup();
  main.innerHTML = "";
  cleanup = r.render(main);
  document.title = r.title;
  for (const a of nav.querySelectorAll("a")) {
    a.toggleAttribute("aria-current", a.getAttribute("href") === `#/${key}`);
    if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "page");
  }
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0);
  if (key) main.focus({ preventScroll: true });
}

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

window.addEventListener("hashchange", route);
route();
