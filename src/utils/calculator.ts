/**
 * Resource Calculation Utility for Genshin Impact
 * Computes exact materials needed to max out character level, talents, and weapons.
 */

export interface LevelCost {
  heroWit: number; // Sách tím (20,000 EXP)
  mora: number;
  bossDrops: number; // Boss thế giới (40 nhựa)
  localSpecialty: number; // Đặc sản khu vực
}

// Cumulative EXP required from Lv. 1 to reach each milestone level in Genshin Impact
const CUMULATIVE_EXP: Record<number, number> = {
  1: 0,
  20: 120175,
  40: 698500,
  50: 1277600,
  60: 2131725,
  70: 3327650,
  80: 4939525,
  90: 8362650,
};

// Exact ascension milestones (Đột phá cấp 1-6)
// Both 4-star and 5-star characters require the EXACT SAME ascension materials
const ASCENSION_PHASES = [
  { atLevel: 20, boss: 0, specialty: 3, mora: 20000 },
  { atLevel: 40, boss: 2, specialty: 10, mora: 40000 },
  { atLevel: 50, boss: 4, specialty: 20, mora: 60000 },
  { atLevel: 60, boss: 8, specialty: 30, mora: 80000 },
  { atLevel: 70, boss: 12, specialty: 45, mora: 100000 },
  { atLevel: 80, boss: 20, specialty: 60, mora: 120000 }, // Final ascension Lv.80 -> 90: exactly 20 boss materials & 60 specialties
];

function getExpAtLevel(lvl: number): number {
  const brackets = [1, 20, 40, 50, 60, 70, 80, 90];
  if (lvl <= 1) return 0;
  if (lvl >= 90) return CUMULATIVE_EXP[90];
  for (let i = 0; i < brackets.length - 1; i++) {
    const low = brackets[i];
    const high = brackets[i + 1];
    if (lvl >= low && lvl <= high) {
      const frac = (lvl - low) / (high - low);
      return Math.round(CUMULATIVE_EXP[low] + frac * (CUMULATIVE_EXP[high] - CUMULATIVE_EXP[low]));
    }
  }
  return 0;
}

export function calculateLevelTo90Cost(currentLevel: number, targetLevel: number = 90): LevelCost {
  const cur = Math.max(1, Math.min(90, currentLevel));
  const tgt = Math.max(cur, Math.min(90, targetLevel));

  if (cur >= tgt) {
    return { heroWit: 0, mora: 0, bossDrops: 0, localSpecialty: 0 };
  }

  const expDiff = getExpAtLevel(tgt) - getExpAtLevel(cur);
  const heroWit = Math.ceil(expDiff / 20000);
  const levelingMora = Math.round(expDiff * 0.2);
  let ascMora = 0;
  let bossDrops = 0;
  let localSpecialty = 0;

  for (const p of ASCENSION_PHASES) {
    if (cur <= p.atLevel && tgt > p.atLevel) {
      bossDrops += p.boss;
      localSpecialty += p.specialty;
      ascMora += p.mora;
    }
  }

  return {
    heroWit,
    mora: levelingMora + ascMora,
    bossDrops,
    localSpecialty,
  };
}

export interface TalentCost {
  goldBooks: number;
  books: {
    green: number;
    blue: number;
    gold: number;
    total: number;
  };
  weeklyBossMats: number;
  crowns: number;
  mora: number;
}

export function calculateTalentCost(
  current: { attack: number; skill: number; burst: number },
  target: { attack: number; skill: number; burst: number } = { attack: 10, skill: 10, burst: 10 }
): TalentCost {
  let greenBooks = 0;
  let blueBooks = 0;
  let goldBooks = 0;
  let weeklyBossMats = 0;
  let crowns = 0;
  let mora = 0;

  const calculateSingleTalent = (fromLvl: number, toLvl: number) => {
    const cur = Math.max(1, Math.min(10, fromLvl));
    const tgt = Math.max(cur, Math.min(10, toLvl));
    
    // Per talent 1->10 requires:
    // Lv2: 3 green, 12,500 Mora
    // Lv3: 2 blue, 17,500 Mora
    // Lv4: 4 blue, 25,000 Mora
    // Lv5: 6 blue, 30,000 Mora
    // Lv6: 9 blue, 37,500 Mora
    // Lv7: 4 gold, 1 weekly, 120,000 Mora
    // Lv8: 6 gold, 1 weekly, 260,000 Mora
    // Lv9: 12 gold, 2 weekly, 450,000 Mora
    // Lv10: 16 gold, 2 weekly, 1 crown, 700,000 Mora
    const remainingLevels = tgt - cur;
    if (remainingLevels <= 0) return;

    for (let l = cur + 1; l <= tgt; l++) {
      if (l === 2) {
        greenBooks += 3;
        mora += 12500;
      } else if (l === 3) {
        blueBooks += 2;
        mora += 17500;
      } else if (l === 4) {
        blueBooks += 4;
        mora += 25000;
      } else if (l === 5) {
        blueBooks += 6;
        mora += 30000;
      } else if (l === 6) {
        blueBooks += 9;
        mora += 37500;
      } else if (l === 7) {
        goldBooks += 4;
        weeklyBossMats += 1;
        mora += 120000;
      } else if (l === 8) {
        goldBooks += 6;
        weeklyBossMats += 1;
        mora += 260000;
      } else if (l === 9) {
        goldBooks += 12;
        weeklyBossMats += 2;
        mora += 450000;
      } else if (l === 10) {
        goldBooks += 16;
        weeklyBossMats += 2;
        crowns += 1;
        mora += 700000;
      }
    }
  };

  calculateSingleTalent(current.attack, target.attack);
  calculateSingleTalent(current.skill, target.skill);
  calculateSingleTalent(current.burst, target.burst);

  return {
    goldBooks,
    books: {
      green: greenBooks,
      blue: blueBooks,
      gold: goldBooks,
      total: greenBooks + blueBooks + goldBooks,
    },
    weeklyBossMats,
    crowns,
    mora,
  };
}

export interface WeaponCostBreakdown {
  domainMats: {
    green: number;
    blue: number;
    purple: number;
    gold: number;
    total: number;
  };
  eliteMats: {
    green: number;
    blue: number;
    purple: number;
    total: number;
  };
  commonMats: {
    gray: number;
    green: number;
    blue: number;
    total: number;
  };
  ascensionMora: number;
  enhancementMora: number;
  totalMora: number;
  mysticOre: number;
}

export function calculateWeaponTo90Cost(
  currentLevel: number,
  rarity: number = 5
): WeaponCostBreakdown {
  const cur = Math.max(1, Math.min(90, currentLevel));
  if (cur >= 90) {
    return {
      domainMats: { green: 0, blue: 0, purple: 0, gold: 0, total: 0 },
      eliteMats: { green: 0, blue: 0, purple: 0, total: 0 },
      commonMats: { gray: 0, green: 0, blue: 0, total: 0 },
      ascensionMora: 0,
      enhancementMora: 0,
      totalMora: 0,
      mysticOre: 0,
    };
  }

  interface PhaseCost {
    lvlReq: number;
    domain: { green: number; blue: number; purple: number; gold: number };
    elite: { green: number; blue: number; purple: number };
    common: { gray: number; green: number; blue: number };
    mora: number;
  }

  const phase5Star: PhaseCost[] = [
    { lvlReq: 20, domain: { green: 5, blue: 0, purple: 0, gold: 0 }, elite: { green: 5, blue: 0, purple: 0 }, common: { gray: 3, green: 0, blue: 0 }, mora: 10000 },
    { lvlReq: 40, domain: { green: 0, blue: 5, purple: 0, gold: 0 }, elite: { green: 18, blue: 0, purple: 0 }, common: { gray: 12, green: 0, blue: 0 }, mora: 20000 },
    { lvlReq: 50, domain: { green: 0, blue: 9, purple: 0, gold: 0 }, elite: { green: 0, blue: 9, purple: 0 }, common: { gray: 0, green: 9, blue: 0 }, mora: 30000 },
    { lvlReq: 60, domain: { green: 0, blue: 0, purple: 5, gold: 0 }, elite: { green: 0, blue: 18, purple: 0 }, common: { gray: 0, green: 14, blue: 0 }, mora: 45000 },
    { lvlReq: 70, domain: { green: 0, blue: 0, purple: 9, gold: 0 }, elite: { green: 0, blue: 0, purple: 14 }, common: { gray: 0, green: 0, blue: 9 }, mora: 55000 },
    { lvlReq: 80, domain: { green: 0, blue: 0, purple: 0, gold: 6 }, elite: { green: 0, blue: 0, purple: 27 }, common: { gray: 0, green: 0, blue: 18 }, mora: 65000 },
  ];

  const phase4Star: PhaseCost[] = [
    { lvlReq: 20, domain: { green: 3, blue: 0, purple: 0, gold: 0 }, elite: { green: 3, blue: 0, purple: 0 }, common: { gray: 2, green: 0, blue: 0 }, mora: 5000 },
    { lvlReq: 40, domain: { green: 0, blue: 3, purple: 0, gold: 0 }, elite: { green: 12, blue: 0, purple: 0 }, common: { gray: 8, green: 0, blue: 0 }, mora: 15000 },
    { lvlReq: 50, domain: { green: 0, blue: 6, purple: 0, gold: 0 }, elite: { green: 0, blue: 6, purple: 0 }, common: { gray: 0, green: 6, blue: 0 }, mora: 20000 },
    { lvlReq: 60, domain: { green: 0, blue: 0, purple: 3, gold: 0 }, elite: { green: 0, blue: 12, purple: 0 }, common: { gray: 0, green: 9, blue: 0 }, mora: 30000 },
    { lvlReq: 70, domain: { green: 0, blue: 0, purple: 6, gold: 0 }, elite: { green: 0, blue: 0, purple: 9 }, common: { gray: 0, green: 0, blue: 6 }, mora: 35000 },
    { lvlReq: 80, domain: { green: 0, blue: 0, purple: 0, gold: 4 }, elite: { green: 0, blue: 0, purple: 18 }, common: { gray: 0, green: 0, blue: 12 }, mora: 45000 },
  ];

  const phase3Star: PhaseCost[] = [
    { lvlReq: 20, domain: { green: 2, blue: 0, purple: 0, gold: 0 }, elite: { green: 2, blue: 0, purple: 0 }, common: { gray: 1, green: 0, blue: 0 }, mora: 5000 },
    { lvlReq: 40, domain: { green: 0, blue: 2, purple: 0, gold: 0 }, elite: { green: 8, blue: 0, purple: 0 }, common: { gray: 5, green: 0, blue: 0 }, mora: 10000 },
    { lvlReq: 50, domain: { green: 0, blue: 4, purple: 0, gold: 0 }, elite: { green: 0, blue: 4, purple: 0 }, common: { gray: 0, green: 4, blue: 0 }, mora: 15000 },
    { lvlReq: 60, domain: { green: 0, blue: 0, purple: 2, gold: 0 }, elite: { green: 0, blue: 8, purple: 0 }, common: { gray: 0, green: 6, blue: 0 }, mora: 20000 },
    { lvlReq: 70, domain: { green: 0, blue: 0, purple: 4, gold: 0 }, elite: { green: 0, blue: 0, purple: 6 }, common: { gray: 0, green: 0, blue: 4 }, mora: 25000 },
    { lvlReq: 80, domain: { green: 0, blue: 0, purple: 0, gold: 3 }, elite: { green: 0, blue: 0, purple: 12 }, common: { gray: 0, green: 0, blue: 8 }, mora: 30000 },
  ];

  const phases = rarity === 5 ? phase5Star : rarity === 3 ? phase3Star : phase4Star;

  const domainMats = { green: 0, blue: 0, purple: 0, gold: 0, total: 0 };
  const eliteMats = { green: 0, blue: 0, purple: 0, total: 0 };
  const commonMats = { gray: 0, green: 0, blue: 0, total: 0 };
  let ascensionMora = 0;

  for (const p of phases) {
    if (cur < p.lvlReq) {
      domainMats.green += p.domain.green;
      domainMats.blue += p.domain.blue;
      domainMats.purple += p.domain.purple;
      domainMats.gold += p.domain.gold;

      eliteMats.green += p.elite.green;
      eliteMats.blue += p.elite.blue;
      eliteMats.purple += p.elite.purple;

      commonMats.gray += p.common.gray;
      commonMats.green += p.common.green;
      commonMats.blue += p.common.blue;

      ascensionMora += p.mora;
    }
  }

  domainMats.total = domainMats.green + domainMats.blue + domainMats.purple + domainMats.gold;
  eliteMats.total = eliteMats.green + eliteMats.blue + eliteMats.purple;
  commonMats.total = commonMats.gray + commonMats.green + commonMats.blue;

  const getExpProgressRatio = (lvl: number) => {
    if (lvl <= 20) return 0.02;
    if (lvl <= 40) return 0.08;
    if (lvl <= 50) return 0.16;
    if (lvl <= 60) return 0.28;
    if (lvl <= 70) return 0.44;
    if (lvl <= 80) return 0.65;
    return 1.0;
  };

  const remainingRatio = Math.max(0, 1 - getExpProgressRatio(cur));
  const baseOre = rarity === 5 ? 907 : rarity === 3 ? 400 : 605;
  const baseEnhanceMora = rarity === 5 ? 906420 : rarity === 3 ? 398820 : 604260;

  const mysticOre = Math.round(baseOre * remainingRatio);
  const enhancementMora = Math.round(baseEnhanceMora * remainingRatio);
  const totalMora = ascensionMora + enhancementMora;

  return {
    domainMats,
    eliteMats,
    commonMats,
    ascensionMora,
    enhancementMora,
    totalMora,
    mysticOre,
  };
}
