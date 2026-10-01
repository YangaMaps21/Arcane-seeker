// Full 78-card tarot deck. Meanings follow the common Rider–Waite–Smith tradition.

const MAJOR = [
  ["The Fool", "Beginnings, innocence, a leap of faith", "Recklessness, hesitation, a risk taken blindly"],
  ["The Magician", "Willpower, skill, turning ideas into reality", "Manipulation, untapped talent, scattered focus"],
  ["The High Priestess", "Intuition, hidden knowledge, the inner voice", "Secrets kept from yourself, ignored instincts"],
  ["The Empress", "Abundance, nurture, creativity in bloom", "Creative block, dependence, neglecting self-care"],
  ["The Emperor", "Structure, authority, steady leadership", "Rigidity, control for its own sake, stubbornness"],
  ["The Hierophant", "Tradition, learning, shared beliefs", "Rebellion, questioning the rules, a personal path"],
  ["The Lovers", "Union, values, a meaningful choice", "Imbalance, misaligned values, a choice avoided"],
  ["The Chariot", "Drive, victory, mastering opposing forces", "Loss of direction, aggression, stalled momentum"],
  ["Strength", "Courage, patience, gentle power", "Self-doubt, raw emotion, low energy"],
  ["The Hermit", "Solitude, reflection, inner guidance", "Isolation, loneliness, withdrawing too far"],
  ["Wheel of Fortune", "Cycles, turning points, luck shifting", "Resistance to change, a run of bad luck"],
  ["Justice", "Fairness, truth, cause and effect", "Unfairness, dishonesty, avoiding accountability"],
  ["The Hanged Man", "Surrender, pause, a new perspective", "Stalling, martyrdom, refusing to let go"],
  ["Death", "Endings, transformation, clearing the way", "Clinging to the past, fear of change"],
  ["Temperance", "Balance, moderation, patient blending", "Excess, impatience, things out of tune"],
  ["The Devil", "Attachment, temptation, chains you can remove", "Release, breaking free, reclaiming power"],
  ["The Tower", "Sudden upheaval, revelation, a false structure falls", "Averted disaster, fear of change, delayed collapse"],
  ["The Star", "Hope, renewal, quiet faith", "Discouragement, lost faith, disconnection"],
  ["The Moon", "Illusion, dreams, the unconscious", "Confusion lifting, truths surfacing, released fear"],
  ["The Sun", "Joy, success, warmth and clarity", "Temporary clouds, dimmed optimism"],
  ["Judgement", "Awakening, reckoning, a calling answered", "Self-doubt, harsh self-judgement, ignoring the call"],
  ["The World", "Completion, wholeness, a cycle fulfilled", "Loose ends, delays, seeking closure"],
];

const SUITS = {
  Wands:     { element: "Fire",  theme: "passion, ambition and creative energy", glyph: "wand" },
  Cups:      { element: "Water", theme: "emotion, love and intuition",           glyph: "cup" },
  Swords:    { element: "Air",   theme: "thought, truth and conflict",           glyph: "sword" },
  Pentacles: { element: "Earth", theme: "money, work and the material world",    glyph: "pentacle" },
};

const RANKS = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"];

const MINOR = {
  Wands: [
    ["A spark of inspiration, a bold new venture", "Delays, lack of direction, a fizzled start"],
    ["Planning ahead, choosing a path, future vision", "Fear of the unknown, playing it safe"],
    ["Expansion, foresight, ships coming in", "Obstacles abroad, plans held up"],
    ["Celebration, homecoming, a stable foundation", "Tension at home, a celebration postponed"],
    ["Competition, friction, clashing egos", "Avoiding conflict, finding common ground"],
    ["Public recognition, victory, confidence", "Ego, fall from grace, private success"],
    ["Standing your ground, defending your position", "Overwhelm, giving up, exhaustion"],
    ["Swift movement, news arriving, momentum", "Frustration, waiting, scattered energy"],
    ["Resilience, persistence, one last push", "Paranoia, fatigue, defensive walls"],
    ["Burden, heavy responsibility, overcommitment", "Putting the load down, delegating"],
    ["Enthusiasm, curiosity, an exciting message", "Impatience, half-finished ideas"],
    ["Adventure, impulsiveness, charging ahead", "Haste, scattered energy, recklessness"],
    ["Warmth, confidence, magnetic determination", "Jealousy, insecurity, burnout"],
    ["Visionary leadership, boldness, entrepreneurship", "Impulsive decisions, overbearing ambition"],
  ],
  Cups: [
    ["New love, overflowing feeling, compassion", "Blocked emotions, emptiness, self-love needed"],
    ["Partnership, mutual attraction, connection", "Imbalance, broken communication"],
    ["Friendship, celebration, community", "Overindulgence, gossip, three's a crowd"],
    ["Apathy, contemplation, missed offers", "Fresh motivation, accepting what's offered"],
    ["Loss, grief, focusing on what spilled", "Acceptance, moving on, forgiveness"],
    ["Nostalgia, childhood memories, kindness", "Stuck in the past, unrealistic memories"],
    ["Many choices, daydreams, illusion", "Clarity, decisiveness, grounded choice"],
    ["Walking away, seeking deeper meaning", "Fear of leaving, aimless drifting"],
    ["Contentment, wishes granted, satisfaction", "Smugness, materialism, unmet wishes"],
    ["Harmony, family happiness, emotional fulfilment", "Disconnection, misaligned values at home"],
    ["Creative beginnings, tender messages, intuition", "Emotional immaturity, creative block"],
    ["Romance, charm, following the heart", "Moodiness, unrealistic expectations"],
    ["Compassion, calm, emotional security", "Codependence, martyrdom, self-neglect"],
    ["Emotional balance, diplomacy, generosity", "Manipulation, moodiness, coldness"],
  ],
  Swords: [
    ["Breakthrough, clarity, a sharp new idea", "Confusion, clouded judgement"],
    ["A difficult choice, stalemate, avoidance", "Information overload, indecision lifting"],
    ["Heartbreak, sorrow, painful truth", "Recovery, forgiveness, releasing pain"],
    ["Rest, recuperation, quiet contemplation", "Restlessness, burnout, returning to the fray"],
    ["Conflict, winning at a cost, tension", "Reconciliation, making amends"],
    ["Transition, moving on, calmer waters ahead", "Unfinished business, resistance to change"],
    ["Strategy, stealth, getting away with something", "Coming clean, a plan exposed"],
    ["Feeling trapped, self-imposed limits", "Release, new perspective, freedom"],
    ["Anxiety, worry, sleepless nights", "Hope returning, reaching out for help"],
    ["A painful ending, hitting bottom", "Recovery, regeneration, the worst is over"],
    ["Curiosity, new ideas, mental restlessness", "All talk, haste, scattered thoughts"],
    ["Ambition, fast action, driven focus", "Rushing in, burnout, carelessness"],
    ["Independence, clear boundaries, honesty", "Coldness, bitterness, harsh words"],
    ["Intellectual power, truth, clear authority", "Misused power, manipulation, cruelty"],
  ],
  Pentacles: [
    ["A new opportunity, prosperity, a solid start", "Missed chance, poor planning"],
    ["Juggling priorities, adaptability, balance", "Overcommitted, disorganised"],
    ["Teamwork, craftsmanship, learning", "Disharmony, working alone, poor quality"],
    ["Saving, security, holding on tight", "Greed, over-control, letting go"],
    ["Hardship, insecurity, feeling left out", "Recovery, help arriving, spiritual wealth"],
    ["Generosity, giving and receiving, charity", "Debt, strings attached, one-sided giving"],
    ["Patience, long-term view, steady investment", "Impatience, poor return, wasted effort"],
    ["Diligence, skill-building, mastery", "Perfectionism, lack of focus"],
    ["Self-sufficiency, luxury, earned reward", "Overwork, superficial success"],
    ["Legacy, family wealth, lasting foundations", "Financial loss, family disputes"],
    ["Ambition to learn, a new skill, diligence", "Procrastination, learning stalled"],
    ["Hard work, routine, reliability", "Boredom, feeling stuck, laziness"],
    ["Practical care, nurturing, financial comfort", "Work–home imbalance, self-neglect"],
    ["Abundance, security, disciplined success", "Greed, stubbornness, materialism"],
  ],
};

function buildDeck() {
  const deck = MAJOR.map(([name, up, rev], i) => ({
    id: `M${i}`, name, arcana: "Major", number: i, upright: up, reversed: rev,
    suit: null, element: null,
  }));
  for (const [suit, info] of Object.entries(SUITS)) {
    MINOR[suit].forEach(([up, rev], i) => {
      deck.push({
        id: `${suit[0]}${i + 1}`, name: `${RANKS[i]} of ${suit}`, arcana: "Minor",
        number: i + 1, rank: RANKS[i], suit, element: info.element, theme: info.theme,
        glyph: info.glyph, upright: up, reversed: rev,
      });
    });
  }
  return deck;
}

export const DECK = buildDeck();
export const MAJOR_ARCANA = DECK.filter(c => c.arcana === "Major");
export { SUITS };

export const ROMAN = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI"];

export function shuffle(arr, rand = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const SPREADS = {
  one:   { label: "One card", positions: ["Your card"] },
  three: { label: "Past, present, future", positions: ["Past", "Present", "Future"] },
  cross: { label: "Five-card cross", positions: ["The heart of it", "What holds you back", "What helps you", "What's above you", "Where it leads"] },
};
