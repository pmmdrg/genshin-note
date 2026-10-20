const fs = require('fs');
const path = require('path');
const genshin = require('genshin-db');

const names = genshin.characters('names', { matchCategories: true });
console.log(`Generating materials mapping for ${names.length} characters...`);

const charMap = {};

for (const name of names) {
  const cEn = genshin.characters(name, { resultLanguage: 'English' });
  const cVi = genshin.characters(name, { resultLanguage: 'Vietnamese' });
  if (!cEn || !cEn.costs) continue;

  const isTraveler = ['Aether', 'Lumine'].includes(cEn.name);
  const s2 = cEn.costs.ascend2 || [];

  let wbName = '';
  let wbIcon = '';
  let spName = '';
  let spIcon = '';

  if (isTraveler) {
    wbName = 'Kim Cương Bạc Vụn';
    wbIcon = 'https://enka.network/ui/UI_ItemIcon_104101.png';
    spName = 'Cúc Cánh Gió';
    spIcon = 'https://enka.network/ui/UI_ItemIcon_100024.png';
  } else if (s2.length >= 4) {
    const wb = s2[2];
    const sp = s2[3];
    if (wb) {
      const wbVi = genshin.materials(wb.name, { resultLanguage: 'Vietnamese' });
      wbName = wbVi?.name || wb.name;
      if (wbVi?.images?.filename_icon) {
        wbIcon = `https://enka.network/ui/${wbVi.images.filename_icon}.png`;
      }
    }
    if (sp) {
      const spVi = genshin.materials(sp.name, { resultLanguage: 'Vietnamese' });
      spName = spVi?.name || sp.name;
      if (spVi?.images?.filename_icon) {
        spIcon = `https://enka.network/ui/${spVi.images.filename_icon}.png`;
      }
    }
  }

  // Weekly boss material from lvl7 talent
  const tEn = genshin.talents(name, { resultLanguage: 'English' });
  let weeklyBossName = '';
  let weeklyBossIcon = '';
  if (tEn && tEn.costs && tEn.costs.lvl7) {
    const wbItem = tEn.costs.lvl7.find((x) => x.id >= 113000 && x.id < 114000);
    if (wbItem) {
      const wbMatVi = genshin.materials(wbItem.name, { resultLanguage: 'Vietnamese' });
      weeklyBossName = wbMatVi?.name || wbItem.name;
      if (wbMatVi?.images?.filename_icon) {
        weeklyBossIcon = `https://enka.network/ui/${wbMatVi.images.filename_icon}.png`;
      }
    }
  }

  if (wbName && spName) {
    const detail = {
      worldBossMat: wbName,
      worldBossMatIcon: wbIcon,
      weeklyBossMat: weeklyBossName || 'Nguyên Liệu Boss Tuần',
      weeklyBossMatIcon: weeklyBossIcon,
      localSpecialty: spName,
      localSpecialtyIcon: spIcon,
    };

    // Index by multiple normalized keys for foolproof matching
    const normalize = (str) =>
      str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove diacritics
        .replace(/[^a-z0-9]/g, '');

    const enRaw = cEn.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const enNorm = normalize(cEn.name);
    charMap[enRaw] = detail;
    charMap[enNorm] = detail;

    if (cVi && cVi.name) {
      const viRaw = cVi.name.toLowerCase().replace(/\s+/g, '');
      const viNorm = normalize(cVi.name);
      charMap[viRaw] = detail;
      charMap[viNorm] = detail;
    }
  }
}

console.log(`Generated ${Object.keys(charMap).length} lookup keys!`);

const fileContent = `/**
 * Genshin Impact Character Material Database (Vietnamese & Official Icons)
 * Auto-generated from GenshinData / genshin-db:
 * Complete mappings for:
 * - World Boss Material (Nguyên Liệu Boss Thế Giới)
 * - Weekly Boss Material (Nguyên Liệu Boss Tuần)
 * - Local Specialty (Đặc Sản Khu Vực)
 */

export interface CharacterMaterialDetail {
  worldBossMat: string;
  worldBossMatIcon: string;
  weeklyBossMat: string;
  weeklyBossMatIcon: string;
  localSpecialty: string;
  localSpecialtyIcon: string;
}

export const CHARACTER_MATERIALS: Record<string, CharacterMaterialDetail> = ${JSON.stringify(charMap, null, 2)};

/**
 * Normalizes character name string for robust lookup
 */
function normalizeKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/\\s*\\(.*?\\)\\s*/g, '') // remove parenthesized suffix e.g. "(Thảo Thần)"
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Resolves accurate materials for any character
 */
export function getCharacterMaterialDetail(characterName: string): CharacterMaterialDetail {
  if (!characterName) {
    return {
      worldBossMat: 'Nguyên Liệu Boss Thế Giới',
      worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113059.png',
      weeklyBossMat: 'Nguyên Liệu Boss Tuần',
      weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113055.png',
      localSpecialty: 'Đặc Sản Khu Vực',
      localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101235.png',
    };
  }

  const key = normalizeKey(characterName);

  if (CHARACTER_MATERIALS[key]) {
    return CHARACTER_MATERIALS[key];
  }

  // Partial match search
  for (const [k, detail] of Object.entries(CHARACTER_MATERIALS)) {
    if (key.includes(k) || k.includes(key)) {
      return detail;
    }
  }

  // Fallback if truly not found
  return {
    worldBossMat: 'Nguyên Liệu Boss Thế Giới',
    worldBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113059.png',
    weeklyBossMat: 'Nguyên Liệu Boss Tuần',
    weeklyBossMatIcon: 'https://enka.network/ui/UI_ItemIcon_113055.png',
    localSpecialty: 'Đặc Sản Khu Vực',
    localSpecialtyIcon: 'https://enka.network/ui/UI_ItemIcon_101235.png',
  };
}
`;

const outputPath = path.resolve(__dirname, '../src/data/characterMaterialsData.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully generated ${outputPath}!`);
