# Arcane Seeker

A fortune-teller's booth on the web: star signs, Chinese zodiac, tarot, palm reading and a little card game.

## What's inside

| Page | What it does |
| --- | --- |
| **Home** | Pick one of three face-down cards for a card of the day. |
| **Star signs** | Birthday → sun sign, element, quality, ruling planet, traits, a daily reading (same all day, changes tomorrow) and a compatibility checker. |
| **Chinese zodiac** | Birthday → animal, element and yin/yang, using real Lunar New Year dates for 1950–2030. |
| **Tarot** | Full 78-card deck with upright and reversed meanings. One-card, past–present–future and five-card cross spreads, plus a summary of the whole spread. |
| **Palm reading** | Interactive hand diagram of the five main lines and six mounts, plus a guided questionnaire that writes your reading. |
| **Oracle's table** | Higher-or-lower through the 22 Major Arcana, with coins, streaks, the Wheel of Fortune and The Tower. |

## Tech

Plain HTML, CSS and JavaScript modules — no build step, no dependencies.

```
index.html          shell + navigation
css/style.css       theme (oxblood velvet, brass, card stock)
js/app.js           hash router
js/ui.js            card art (SVG), medallions, helpers
js/data/            tarot deck, zodiac, Chinese zodiac data
js/pages/           one module per page
```

## Run locally

ES modules need a server (opening the file directly won't work):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Works as-is on GitHub Pages (Settings → Pages → deploy from `main`, root folder), Netlify or Vercel.

---

Arcane Seeker is for reflection and fun. The stars suggest; you decide.
