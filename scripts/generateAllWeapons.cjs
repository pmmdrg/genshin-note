const fs = require('fs');
const path = require('path');
const genshin = require('genshin-db');

const dayMap = {
  'thứ 2': 1, 'monday': 1,
  'thứ 3': 2, 'tuesday': 2,
  'thứ 4': 3, 'wednesday': 3,
  'thứ 5': 4, 'thursday': 4,
  'thứ 6': 5, 'friday': 5,
  'thứ 7': 6, 'saturday': 6,
  'chủ nhật': 0, 'sunday': 0
};

function parseDays(days) {
  if (!days || !Array.isArray(days)) return [0, 1, 2, 3, 4, 5, 6];
  const mapped = days.map(d => dayMap[d.toLowerCase()]).filter(x => x !== undefined);
  return mapped.length > 0 ? mapped : [0, 1, 2, 3, 4, 5, 6];
}

const typeMap = {
  'WEAPON_POLE': 'polearm',
  'WEAPON_SWORD_ONE_HAND': 'sword',
  'WEAPON_CLAYMORE': 'claymore',
  'WEAPON_BOW': 'bow',
  'WEAPON_CATALYST': 'catalyst'
};

const wNames = genshin.weapons('names', { matchCategories: true });
console.log(`Scanning ${wNames.length} total weapons from genshin-db...`);

const weaponsList = [];

for (const name of wNames) {
  const wEn = genshin.weapons(name, { resultLanguage: 'English' });
  const wVi = genshin.weapons(name, { resultLanguage: 'Vietnamese' });
  if (!wEn) continue;

  const versionNum = parseFloat(wEn.version || '1.0');
  // Include all released versions up to 5.4
  if (versionNum > 5.4) continue;

  const wType = typeMap[wEn.weaponType];
  if (!wType) continue;

  // Resolve costs
  const costs = wEn.costs || {};
  const stage1 = costs.ascend1 || [];
  const maxStage = costs.ascend6 || costs.ascend4 || stage1;

  // Domain material
  const domainItemEn = stage1[1];
  const maxDomainItemEn = maxStage[1] || domainItemEn;
  let domainMatVi = '';
  let domainNameVi = '';
  let daysOfWeek = [1, 4, 0];
  let domainIcon = '';

  if (domainItemEn) {
    const matVi = genshin.materials(domainItemEn.name, { resultLanguage: 'Vietnamese' });
    const maxMatVi = maxDomainItemEn ? genshin.materials(maxDomainItemEn.name, { resultLanguage: 'Vietnamese' }) : matVi;
    domainMatVi = maxMatVi?.name || matVi?.name || domainItemEn.name;
    domainNameVi = matVi?.dropDomainName || 'Bí Cảnh Luyện Võ';
    daysOfWeek = parseDays(matVi?.daysOfWeek);
    if (matVi?.images?.filename_icon) {
      domainIcon = `https://enka.network/ui/${matVi.images.filename_icon}.png`;
    }
  }

  // Elite material
  const eliteItemEn = stage1[2];
  const maxEliteItemEn = maxStage[2] || eliteItemEn;
  let eliteMatVi = '';
  let eliteIcon = '';
  if (eliteItemEn) {
    const matVi = genshin.materials(eliteItemEn.name, { resultLanguage: 'Vietnamese' });
    const maxMatVi = maxEliteItemEn ? genshin.materials(maxEliteItemEn.name, { resultLanguage: 'Vietnamese' }) : matVi;
    eliteMatVi = maxMatVi?.name || matVi?.name || eliteItemEn.name;
    if (matVi?.images?.filename_icon) {
      eliteIcon = `https://enka.network/ui/${matVi.images.filename_icon}.png`;
    }
  }

  // Common material
  const commonItemEn = stage1[3];
  const maxCommonItemEn = maxStage[3] || commonItemEn;
  let commonMatVi = '';
  let commonIcon = '';
  if (commonItemEn) {
    const matVi = genshin.materials(commonItemEn.name, { resultLanguage: 'Vietnamese' });
    const maxMatVi = maxCommonItemEn ? genshin.materials(maxCommonItemEn.name, { resultLanguage: 'Vietnamese' }) : matVi;
    commonMatVi = maxMatVi?.name || matVi?.name || commonItemEn.name;
    if (matVi?.images?.filename_icon) {
      commonIcon = `https://enka.network/ui/${matVi.images.filename_icon}.png`;
    }
  }

  const avatarUrl = wEn.images?.filename_icon
    ? `https://enka.network/ui/${wEn.images.filename_icon}.png`
    : (wEn.images?.mihoyo_icon || '');

  weaponsList.push({
    name: wEn.name,
    nameVi: wVi?.name || wEn.name,
    rarity: wEn.rarity,
    type: wType,
    ascensionMat: domainMatVi,
    ascensionMatIcon: domainIcon,
    domainName: domainNameVi,
    daysOfWeek: daysOfWeek,
    eliteMatName: eliteMatVi,
    eliteMatIcon: eliteIcon,
    commonMatName: commonMatVi,
    commonMatIcon: commonIcon,
    avatarUrl: avatarUrl
  });
}

// Sort by type, then rarity descending (5 -> 4 -> 3 -> 2 -> 1), then name
const typeOrder = { 'polearm': 1, 'sword': 2, 'claymore': 3, 'bow': 4, 'catalyst': 5 };
weaponsList.sort((a, b) => {
  if (typeOrder[a.type] !== typeOrder[b.type]) {
    return typeOrder[a.type] - typeOrder[b.type];
  }
  if (b.rarity !== a.rarity) {
    return b.rarity - a.rarity;
  }
  return a.nameVi.localeCompare(b.nameVi, 'vi');
});

console.log(`Processed ${weaponsList.length} total weapons!`);
const countByType = {};
for (const w of weaponsList) {
  countByType[w.type] = (countByType[w.type] || 0) + 1;
}
console.log('Breakdown by type:', countByType);

// Write to weaponsData.ts
const fileContent = `import type { WeaponPreset } from '../types';

/**
 * Danh sách toàn bộ vũ khí chính thức trong Genshin Impact (209 vũ khí)
 * Trích xuất đầy đủ từ Genshin Data: Đầy đủ tên tiếng Việt chuẩn trong game,
 * loại vũ khí, độ hiếm 1-5 sao, hình ảnh Enka Network HD, lịch mở Bí Cảnh và nguyên liệu đột phá.
 */
export const COMPREHENSIVE_WEAPONS: WeaponPreset[] = ${JSON.stringify(weaponsList, null, 2)};
`;

const outputPath = path.resolve(__dirname, '../src/data/weaponsData.ts');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully generated ${outputPath}!`);
