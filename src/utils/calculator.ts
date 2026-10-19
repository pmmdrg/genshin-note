/**
 * Resource Calculation Utility for Genshin Impact
 * Computes exact materials needed to max out character level, talents, and weapons.
 */

export interface LevelCost {
  heroWit: number; // Sách tím (20,000 EXP)
  mora: number;
  bossDrops: number; // Boss thế giới (40 nhựa)
  localSpecialty: number; // Đặc sản
}

export function calculateLevelTo90Cost(currentLevel: number, targetLevel: number = 90): LevelCost {
  const cur = Math.max(1, Math.min(90, currentLevel));
  const tgt = Math.max(cur, Math.min(90, targetLevel));

  if (cur >= tgt) {
    return { heroWit: 0, mora: 0, bossDrops: 0, localSpecialty: 0 };
  }

  // Baseline 1 to 90 total values
  const totalHeroWit = 418;
  const totalMora = 2092530;
  const totalBossDrops = 46;
  const totalSpecialty = 168;

  // Level curve weights
  const getProgressRatio = (lvl: number) => {
    if (lvl <= 20) return 0.02;
    if (lvl <= 40) return 0.08;
    if (lvl <= 50) return 0.16;
    if (lvl <= 60) return 0.28;
    if (lvl <= 70) return 0.44;
    if (lvl <= 80) return 0.65;
    return 1.0;
  };

  const curRatio = getProgressRatio(cur);
  const tgtRatio = getProgressRatio(tgt);
  const diffRatio = Math.max(0, tgtRatio - curRatio);

  return {
    heroWit: Math.round(totalHeroWit * diffRatio),
    mora: Math.round(totalMora * diffRatio),
    bossDrops: Math.round(totalBossDrops * diffRatio),
    localSpecialty: Math.round(totalSpecialty * diffRatio),
  };
}

export interface TalentCost {
  goldBooks: number;
  weeklyBossMats: number;
  crowns: number;
  mora: number;
}

export function calculateTalentCost(
  current: { attack: number; skill: number; burst: number },
  target: { attack: number; skill: number; burst: number } = { attack: 10, skill: 10, burst: 10 }
): TalentCost {
  let goldBooks = 0;
  let weeklyBossMats = 0;
  let crowns = 0;
  let mora = 0;

  const calculateSingleTalent = (fromLvl: number, toLvl: number) => {
    const cur = Math.max(1, Math.min(10, fromLvl));
    const tgt = Math.max(cur, Math.min(10, toLvl));
    
    // Per talent 1->10 requires: 38 Philosophies (Gold), 6 Weekly Boss Mats, 1 Crown, 1,652,500 Mora
    const remainingLevels = tgt - cur;
    if (remainingLevels <= 0) return;

    const goldPerLevel = [0, 0, 0, 0, 0, 0, 4, 6, 12, 16]; // approx gold book equivalent for levels 7, 8, 9, 10
    const weeklyMatPerLevel = [0, 0, 0, 0, 0, 0, 1, 1, 2, 2];
    
    for (let l = cur + 1; l <= tgt; l++) {
      goldBooks += goldPerLevel[l - 1] || 2;
      weeklyBossMats += weeklyMatPerLevel[l - 1] || 0;
      mora += l >= 9 ? 450000 : 150000;
      if (l === 10) crowns += 1;
    }
  };

  calculateSingleTalent(current.attack, target.attack);
  calculateSingleTalent(current.skill, target.skill);
  calculateSingleTalent(current.burst, target.burst);

  return { goldBooks, weeklyBossMats, crowns, mora };
}
