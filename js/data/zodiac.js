// Western (tropical) zodiac. Dates are the conventional cusp dates; actual
// sun-ingress times shift by a day in some years.

export const SIGNS = [
  { name: "Aries", glyph: "♈", start: [3, 21], end: [4, 19], element: "Fire", modality: "Cardinal", ruler: "Mars", symbol: "The Ram",
    traits: ["Bold", "Energetic", "Direct", "Competitive"],
    strengths: "Fearless starter who acts first and figures out the rest on the way.",
    challenges: "Impatience; can charge in before others are ready.",
    about: "The first sign of the zodiac is pure ignition. Aries meets life head-on, loves a challenge, and brings the courage that gets things moving.",
    matches: ["Leo", "Sagittarius", "Gemini", "Aquarius"] },
  { name: "Taurus", glyph: "♉", start: [4, 20], end: [5, 20], element: "Earth", modality: "Fixed", ruler: "Venus", symbol: "The Bull",
    traits: ["Steady", "Sensual", "Loyal", "Patient"],
    strengths: "Reliable builder with a deep appreciation for comfort and beauty.",
    challenges: "Stubbornness; resists change even when it's needed.",
    about: "Taurus slows the world down to savour it. Grounded and loyal, the Bull builds things that last — relationships, homes, savings — one patient step at a time.",
    matches: ["Virgo", "Capricorn", "Cancer", "Pisces"] },
  { name: "Gemini", glyph: "♊", start: [5, 21], end: [6, 20], element: "Air", modality: "Mutable", ruler: "Mercury", symbol: "The Twins",
    traits: ["Curious", "Witty", "Adaptable", "Social"],
    strengths: "Quick mind that connects people and ideas with ease.",
    challenges: "Restlessness; interest can scatter before things are finished.",
    about: "Gemini collects conversations, facts and friends. Bright and changeable, the Twins see every side of a story and love to talk it through.",
    matches: ["Libra", "Aquarius", "Aries", "Leo"] },
  { name: "Cancer", glyph: "♋", start: [6, 21], end: [7, 22], element: "Water", modality: "Cardinal", ruler: "The Moon", symbol: "The Crab",
    traits: ["Nurturing", "Intuitive", "Protective", "Tender"],
    strengths: "Creates belonging; remembers what matters to the people they love.",
    challenges: "Moodiness; retreats into the shell when hurt.",
    about: "Ruled by the Moon, Cancer feels the tides of every room. Home and family are sacred, and few signs care as deeply or as faithfully.",
    matches: ["Scorpio", "Pisces", "Taurus", "Virgo"] },
  { name: "Leo", glyph: "♌", start: [7, 23], end: [8, 22], element: "Fire", modality: "Fixed", ruler: "The Sun", symbol: "The Lion",
    traits: ["Generous", "Dramatic", "Warm", "Proud"],
    strengths: "Natural performer whose warmth makes others feel seen.",
    challenges: "Pride; needs appreciation and bristles without it.",
    about: "Leo shines because it can't help it. Big-hearted and expressive, the Lion leads with charisma and loves to make an occasion of life.",
    matches: ["Aries", "Sagittarius", "Gemini", "Libra"] },
  { name: "Virgo", glyph: "♍", start: [8, 23], end: [9, 22], element: "Earth", modality: "Mutable", ruler: "Mercury", symbol: "The Maiden",
    traits: ["Precise", "Helpful", "Analytical", "Modest"],
    strengths: "Sees what needs fixing and quietly makes it better.",
    challenges: "Perfectionism; can be harder on themselves than anyone.",
    about: "Virgo finds the sacred in the details. Practical and devoted, the Maiden improves everything it touches and shows love through useful care.",
    matches: ["Taurus", "Capricorn", "Cancer", "Scorpio"] },
  { name: "Libra", glyph: "♎", start: [9, 23], end: [10, 22], element: "Air", modality: "Cardinal", ruler: "Venus", symbol: "The Scales",
    traits: ["Diplomatic", "Charming", "Fair-minded", "Artistic"],
    strengths: "Peacemaker with an eye for beauty and balance.",
    challenges: "Indecision; weighs every option a little too long.",
    about: "Libra seeks harmony in people, spaces and ideas. Gracious and fair, the Scales bring partners together and make the world more beautiful.",
    matches: ["Gemini", "Aquarius", "Leo", "Sagittarius"] },
  { name: "Scorpio", glyph: "♏", start: [10, 23], end: [11, 21], element: "Water", modality: "Fixed", ruler: "Pluto & Mars", symbol: "The Scorpion",
    traits: ["Intense", "Magnetic", "Loyal", "Perceptive"],
    strengths: "Sees beneath surfaces; loves and commits completely.",
    challenges: "Secrecy; slow to trust and slower to forgive.",
    about: "Scorpio dives where others paddle. Passionate and perceptive, the Scorpion is drawn to truth, transformation and bonds that run deep.",
    matches: ["Cancer", "Pisces", "Virgo", "Capricorn"] },
  { name: "Sagittarius", glyph: "♐", start: [11, 22], end: [12, 21], element: "Fire", modality: "Mutable", ruler: "Jupiter", symbol: "The Archer",
    traits: ["Adventurous", "Optimistic", "Honest", "Philosophical"],
    strengths: "Explorer whose optimism opens doors and horizons.",
    challenges: "Bluntness; honesty can land harder than intended.",
    about: "Sagittarius aims its arrow at the horizon. Freedom-loving and big-picture, the Archer chases meaning through travel, ideas and laughter.",
    matches: ["Aries", "Leo", "Libra", "Aquarius"] },
  { name: "Capricorn", glyph: "♑", start: [12, 22], end: [1, 19], element: "Earth", modality: "Cardinal", ruler: "Saturn", symbol: "The Sea-Goat",
    traits: ["Ambitious", "Disciplined", "Responsible", "Dry-witted"],
    strengths: "Climbs steadily toward long-term goals and gets there.",
    challenges: "All work; forgets to rest or show softness.",
    about: "Capricorn plays the long game. Patient and capable, the Sea-Goat climbs mountains others won't attempt and builds a legacy worth keeping.",
    matches: ["Taurus", "Virgo", "Scorpio", "Pisces"] },
  { name: "Aquarius", glyph: "♒", start: [1, 20], end: [2, 18], element: "Air", modality: "Fixed", ruler: "Uranus & Saturn", symbol: "The Water-Bearer",
    traits: ["Original", "Independent", "Humanitarian", "Inventive"],
    strengths: "Visionary who imagines how things could be and rallies others.",
    challenges: "Detachment; can feel aloof up close.",
    about: "Aquarius pours out new ideas for everyone. Inventive and principled, the Water-Bearer marches to its own rhythm and dreams of a fairer future.",
    matches: ["Gemini", "Libra", "Aries", "Sagittarius"] },
  { name: "Pisces", glyph: "♓", start: [2, 19], end: [3, 20], element: "Water", modality: "Mutable", ruler: "Neptune & Jupiter", symbol: "The Fish",
    traits: ["Imaginative", "Empathetic", "Dreamy", "Gentle"],
    strengths: "Deep empathy and a rich creative inner world.",
    challenges: "Escapism; boundaries can blur.",
    about: "Pisces swims between worlds. Compassionate and artistic, the Fish feels everything and turns it into music, kindness and dreams.",
    matches: ["Cancer", "Scorpio", "Taurus", "Capricorn"] },
];

export function signFor(month, day) {
  const md = month * 100 + day;
  for (const s of SIGNS) {
    const a = s.start[0] * 100 + s.start[1];
    const b = s.end[0] * 100 + s.end[1];
    if (a <= b ? md >= a && md <= b : md >= a || md <= b) return s;
  }
  return SIGNS[0];
}

export const fmtRange = s => {
  const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${m[s.start[0]-1]} ${s.start[1]} – ${m[s.end[0]-1]} ${s.end[1]}`;
};

export const localDateKey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** The sign whose season it is right now. */
export const seasonSign = (date = new Date()) => signFor(date.getMonth() + 1, date.getDate());

/** All 12 signs, starting with the one in season. */
export function signsFromSeason(date = new Date()) {
  const i = SIGNS.indexOf(seasonSign(date));
  return [...SIGNS.slice(i), ...SIGNS.slice(0, i)];
}

/** Days left in a sign's season, counting today. */
export function daysLeftInSeason(sign, date = new Date()) {
  let y = date.getFullYear();
  if (sign.end[0] < date.getMonth() + 1) y++;
  const end = new Date(y, sign.end[0] - 1, sign.end[1]);
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((end - today) / 86400000) + 1;
}

// ---------- deterministic daily reading ----------
export function seeded(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

const OPENERS = [
  "The Moon leans toward your house of {area} today.",
  "A quiet current is moving through your {area}.",
  "Today the sky lights up your {area}.",
  "Something in your {area} asks for attention.",
  "Your ruling planet nudges your {area} into focus.",
];
const AREAS = ["friendships", "work", "home life", "creativity", "finances", "love life", "health and routines", "studies"];
const ADVICE = {
  Fire:  ["Act on the idea you've been circling — momentum is on your side.", "Channel your spark into one thing rather than five.", "Lead, but leave room for someone else's voice."],
  Earth: ["A small practical step now saves a big effort later.", "Trust the slow build; it's working.", "Treat yourself to something simple and good."],
  Air:   ["Say the thing out loud — a conversation unlocks it.", "Write your thoughts down before deciding.", "A new connection brings a useful idea."],
  Water: ["Let your intuition have the final word.", "Protect your energy; not every feeling is yours to carry.", "Reach out to someone you've been thinking about."],
};
const CLOSERS = ["Evening favours rest.", "Expect a pleasant surprise before the week is out.", "Patience pays you back.", "Laughter is your best compass today.", "Keep an eye out for repeating numbers."];
const COLOURS = ["Garnet", "Saffron", "Sea green", "Midnight blue", "Rose gold", "Ivory", "Amber", "Violet", "Copper", "Jade"];

export function dailyReading(sign, date = new Date()) {
  const key = `${sign.name}-${localDateKey(date)}`;
  const r = seeded(key);
  const pick = a => a[Math.floor(r() * a.length)];
  const area = pick(AREAS);
  return {
    text: `${pick(OPENERS).replace("{area}", area)} ${pick(ADVICE[sign.element])} ${pick(CLOSERS)}`,
    luckyNumber: 1 + Math.floor(r() * 44),
    luckyColour: pick(COLOURS),
    mood: pick(["Bright", "Reflective", "Bold", "Tender", "Focused", "Playful"]),
  };
}

export function compatibility(a, b) {
  if (a.name === b.name) return { score: 72, note: "Two of a kind: you understand each other instantly — and share the same blind spots." };
  if (a.matches.includes(b.name)) return a.element === b.element
    ? { score: 92, note: `Both ${a.element} signs — a natural, easy rhythm.` }
    : { score: 84, note: `${a.element} and ${b.element} feed each other well.` };
  const pair = [a.element, b.element].sort().join("+");
  const table = {
    "Earth+Fire": [58, "Fire's speed meets Earth's patience — exciting, if you each give a little."],
    "Fire+Water": [52, "Steam! Passion runs high; so can tempers."],
    "Air+Earth":  [55, "Ideas meet practicality — great teammates once you agree on pace."],
    "Air+Water":  [54, "Head and heart. You'll learn a lot from each other."],
    "Earth+Water":[80, "Nourishing — Water softens Earth, Earth gives Water a home."],
    "Air+Fire":   [82, "Air fans the flame — lively, social and fun."],
  };
  const [score, note] = table[pair] || [65, "An unusual pairing with room to surprise you both."];
  return { score, note };
}
