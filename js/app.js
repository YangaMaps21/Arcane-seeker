import home from "./pages/home.js";
import zodiac from "./pages/zodiac.js";
import chinese from "./pages/chinese.js";
import tarot from "./pages/tarot.js";
import palm from "./pages/palm.js";
import game from "./pages/game.js";
import { startSky } from "./sky.js";

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

/** "#/zodiac?sign=Leo" → { key: "zodiac", params: URLSearchParams } */
function parse(hash) {
  const raw = hash.replace(/^#\/?/, "");
  const [path, query = ""] = raw.split("?");
  return { key: path.split("/")[0], params: new URLSearchParams(query) };
}

let current = parse(location.hash);

export function go(href) {
  current = parse(href);
  try { history.pushState(null, "", href); } catch {}
  route();
}

// Handle in-site links ourselves so navigation works even inside embedded
// previews that restrict hash changes.
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#/"]');
  if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  go(a.getAttribute("href"));
});

function route() {
  const { key, params } = current;
  const r = ROUTES[key] || ROUTES[""];
  if (typeof cleanup === "function") cleanup();
  main.innerHTML = "";
  cleanup = r.render(main, params);
  document.title = r.title;
  for (const a of nav.querySelectorAll("a")) {
    if (a.getAttribute("href") === `#/${key}`) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
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

const syncFromHash = () => { current = parse(location.hash); route(); };
window.addEventListener("hashchange", syncFromHash);
window.addEventListener("popstate", syncFromHash);

startSky(document.getElementById("sky"));
route();
