// Chinese zodiac: 12 animals × 5 elements, starting at Lunar New Year.

export const ANIMALS = [
  { name: "Rat", hanzi: "鼠", traits: ["Quick-witted", "Resourceful", "Charming", "Thrifty"],
    about: "First to arrive in the legendary Great Race, the Rat wins through cleverness rather than strength. Adaptable and sociable, Rats spot opportunities others miss.",
    best: ["Ox", "Dragon", "Monkey"], avoid: ["Horse", "Goat"], numbers: [2, 3], colours: ["Blue", "Gold"] },
  { name: "Ox", hanzi: "牛", traits: ["Diligent", "Dependable", "Strong", "Determined"],
    about: "The Ox carried the Rat across the river. Steady and honest, Oxen succeed through patience and hard work, and their word is their bond.",
    best: ["Rat", "Snake", "Rooster"], avoid: ["Goat", "Horse"], numbers: [1, 4], colours: ["White", "Yellow"] },
  { name: "Tiger", hanzi: "虎", traits: ["Brave", "Confident", "Competitive", "Unpredictable"],
    about: "The Tiger is a born leader with a big heart and bigger courage. Tigers love a challenge and fight hard for the people they care about.",
    best: ["Horse", "Dog", "Pig"], avoid: ["Monkey", "Snake"], numbers: [1, 3], colours: ["Blue", "Orange"] },
  { name: "Rabbit", hanzi: "兔", traits: ["Gentle", "Elegant", "Alert", "Kind"],
    about: "Graceful and diplomatic, the Rabbit prefers peace to conflict. Rabbits have refined taste, sharp instincts and a soft spot for home comforts.",
    best: ["Goat", "Pig", "Dog"], avoid: ["Rooster", "Dragon"], numbers: [3, 4], colours: ["Red", "Pink"] },
  { name: "Dragon", hanzi: "龙", traits: ["Ambitious", "Charismatic", "Energetic", "Lucky"],
    about: "The only mythical animal of the twelve, the Dragon is a symbol of power and good fortune. Dragons are magnetic, ambitious and full of vitality.",
    best: ["Rooster", "Rat", "Monkey"], avoid: ["Dog", "Rabbit"], numbers: [1, 6], colours: ["Gold", "Silver"] },
  { name: "Snake", hanzi: "蛇", traits: ["Wise", "Enigmatic", "Intuitive", "Graceful"],
    about: "The Snake thinks deeply and speaks carefully. Calm, elegant and intuitive, Snakes trust their own judgement and usually turn out to be right.",
    best: ["Dragon", "Rooster", "Ox"], avoid: ["Tiger", "Pig"], numbers: [2, 8], colours: ["Black", "Red"] },
  { name: "Horse", hanzi: "马", traits: ["Free-spirited", "Energetic", "Warm", "Independent"],
    about: "The Horse loves open roads and good company. Lively and hard-working, Horses need freedom to roam and enthusiasm to fuel them.",
    best: ["Tiger", "Goat", "Rabbit"], avoid: ["Rat", "Ox"], numbers: [2, 3], colours: ["Yellow", "Green"] },
  { name: "Goat", hanzi: "羊", traits: ["Creative", "Gentle", "Compassionate", "Calm"],
    about: "Also called the Sheep, the Goat is artistic and kind-hearted. Goats thrive in harmonious surroundings and bring beauty wherever they settle.",
    best: ["Rabbit", "Horse", "Pig"], avoid: ["Ox", "Tiger"], numbers: [2, 7], colours: ["Green", "Red"] },
  { name: "Monkey", hanzi: "猴", traits: ["Clever", "Playful", "Inventive", "Curious"],
    about: "The Monkey solves problems with flair. Witty and mischievous, Monkeys are quick learners who keep life entertaining for everyone around them.",
    best: ["Ox", "Rabbit", "Dragon"], avoid: ["Tiger", "Pig"], numbers: [4, 9], colours: ["White", "Blue"] },
  { name: "Rooster", hanzi: "鸡", traits: ["Observant", "Hard-working", "Courageous", "Honest"],
    about: "The Rooster greets every day ready to work. Proud, punctual and frank, Roosters notice everything and take pride in a job well done.",
    best: ["Ox", "Snake", "Dragon"], avoid: ["Rat", "Rabbit"], numbers: [5, 7], colours: ["Gold", "Brown"] },
  { name: "Dog", hanzi: "狗", traits: ["Loyal", "Honest", "Protective", "Just"],
    about: "The Dog is the most faithful friend of the zodiac. Fair-minded and protective, Dogs stand up for what's right and never abandon those they love.",
    best: ["Rabbit", "Tiger", "Horse"], avoid: ["Dragon", "Goat"], numbers: [3, 4], colours: ["Red", "Green"] },
  { name: "Pig", hanzi: "猪", traits: ["Generous", "Easy-going", "Sincere", "Warm"],
    about: "Last to arrive in the Great Race after stopping for a feast, the Pig enjoys life fully. Pigs are kind, generous and refreshingly honest.",
    best: ["Tiger", "Rabbit", "Goat"], avoid: ["Snake", "Monkey"], numbers: [2, 5], colours: ["Yellow", "Grey"] },
];

export const ELEMENTS = {
  Metal: "Determined, self-reliant and principled.",
  Water: "Intuitive, flexible and persuasive.",
  Wood:  "Generous, cooperative and growth-minded.",
  Fire:  "Passionate, adventurous and dynamic.",
  Earth: "Patient, practical and stabilising.",
};

// Lunar New Year dates (month, day) by Gregorian year.
const LNY = {
  1950:[2,17],1951:[2,6],1952:[1,27],1953:[2,14],1954:[2,3],1955:[1,24],1956:[2,12],1957:[1,31],1958:[2,18],1959:[2,8],
  1960:[1,28],1961:[2,15],1962:[2,5],1963:[1,25],1964:[2,13],1965:[2,2],1966:[1,21],1967:[2,9],1968:[1,30],1969:[2,17],
  1970:[2,6],1971:[1,27],1972:[2,15],1973:[2,3],1974:[1,23],1975:[2,11],1976:[1,31],1977:[2,18],1978:[2,7],1979:[1,28],
  1980:[2,16],1981:[2,5],1982:[1,25],1983:[2,13],1984:[2,2],1985:[2,20],1986:[2,9],1987:[1,29],1988:[2,17],1989:[2,6],
  1990:[1,27],1991:[2,15],1992:[2,4],1993:[1,23],1994:[2,10],1995:[1,31],1996:[2,19],1997:[2,7],1998:[1,28],1999:[2,16],
  2000:[2,5],2001:[1,24],2002:[2,12],2003:[2,1],2004:[1,22],2005:[2,9],2006:[1,29],2007:[2,18],2008:[2,7],2009:[1,26],
  2010:[2,14],2011:[2,3],2012:[1,23],2013:[2,10],2014:[1,31],2015:[2,19],2016:[2,8],2017:[1,28],2018:[2,16],2019:[2,5],
  2020:[1,25],2021:[2,12],2022:[2,1],2023:[1,22],2024:[2,10],2025:[1,29],2026:[2,17],2027:[2,6],2028:[1,26],2029:[2,13],2030:[2,3],
};

/** Returns { year, animal, element, polarity, exact } for a birth date. */
export function chineseSign(y, m, d) {
  let zy = y, exact = true;
  const lny = LNY[y];
  if (lny) {
    if (m * 100 + d < lny[0] * 100 + lny[1]) zy = y - 1;
  } else {
    exact = false; // outside table: assume new year ~Feb 4 (Lichun)
    if (m === 1 || (m === 2 && d < 4)) zy = y - 1;
  }
  const animal = ANIMALS[((zy - 4) % 12 + 12) % 12];
  const element = ["Metal", "Metal", "Water", "Water", "Wood", "Wood", "Fire", "Fire", "Earth", "Earth"][((zy % 10) + 10) % 10];
  const polarity = zy % 2 === 0 ? "Yang" : "Yin";
  return { year: zy, animal, element, polarity, exact, lny };
}

export const animalByName = n => ANIMALS.find(a => a.name === n);
