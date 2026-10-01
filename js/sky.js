// Full-screen night sky: twinkling, slowly drifting stars plus the odd comet.
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

export function startSky(canvas) {
  const ctx = canvas.getContext("2d");
  let w, h, dpr, stars = [], comets = [], nextComet = 0, raf;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round((w * h) / 2600);
    stars = Array.from({ length: n }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * w, y: Math.random() * h,
        r: depth < .9 ? .3 + Math.random() * .8 : 1 + Math.random() * 1.1,
        a: .25 + Math.random() * .75,
        tw: .4 + Math.random() * 1.8, ph: Math.random() * 6.3,
        v: .02 + depth * .08,
        hue: Math.random() < .12 ? 210 : Math.random() < .1 ? 40 : 0,
      };
    });
    if (reduce) draw(0);
  }

  function spawnComet(t) {
    const fromLeft = Math.random() < .5;
    const speed = 7 + Math.random() * 5;
    const ang = (fromLeft ? 20 : 160) + (Math.random() * 18 - 9);
    const rad = ang * Math.PI / 180;
    comets.push({
      x: fromLeft ? Math.random() * w * .5 : w * .5 + Math.random() * w * .5,
      y: Math.random() * h * .35,
      vx: Math.cos(rad) * speed, vy: Math.sin(rad) * speed,
      life: 0, max: 60 + Math.random() * 40, len: 110 + Math.random() * 90,
    });
    nextComet = t + 3500 + Math.random() * 6000;
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    const s = t / 1000;
    for (const st of stars) {
      if (!reduce) { st.x -= st.v; if (st.x < -2) st.x = w + 2; }
      const a = reduce ? st.a : st.a * (.55 + .45 * Math.sin(s * st.tw + st.ph));
      ctx.fillStyle = st.hue ? `hsla(${st.hue},80%,85%,${a})` : `rgba(240,244,255,${a})`;
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 6.283); ctx.fill();
      if (st.r > 1.4) {
        ctx.fillStyle = `rgba(240,244,255,${a * .12})`;
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r * 4, 0, 6.283); ctx.fill();
      }
    }
    if (reduce) return;
    if (t > nextComet) spawnComet(t);
    comets = comets.filter(c => c.life < c.max);
    for (const c of comets) {
      c.x += c.vx; c.y += c.vy; c.life++;
      const fade = Math.sin(Math.PI * c.life / c.max);
      const sp = Math.hypot(c.vx, c.vy);
      const tx = c.x - c.vx / sp * c.len, ty = c.y - c.vy / sp * c.len;
      const g = ctx.createLinearGradient(c.x, c.y, tx, ty);
      g.addColorStop(0, `rgba(255,248,225,${.95 * fade})`);
      g.addColorStop(.25, `rgba(150,220,255,${.45 * fade})`);
      g.addColorStop(1, "rgba(150,220,255,0)");
      ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(tx, ty); ctx.stroke();
      ctx.fillStyle = `rgba(255,250,235,${fade})`;
      ctx.beginPath(); ctx.arc(c.x, c.y, 1.8, 0, 6.283); ctx.fill();
    }
  }

  function loop(t) { draw(t); raf = requestAnimationFrame(loop); }

  resize();
  window.addEventListener("resize", resize);
  if (!reduce) {
    nextComet = 1200;
    raf = requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(loop);
    });
  }
}
