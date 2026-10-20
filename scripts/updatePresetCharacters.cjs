const fs = require('fs');
const path = require('path');
const { getCharacterMaterialDetail } = require('../src/data/characterMaterialsData.ts');

const filePath = path.resolve(__dirname, '../src/data/genshinData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const regex = /\{\s*name:\s*'([^']+)',\s*nameVi:\s*'([^']+)'[\s\S]*?avatarUrl:\s*'([^']+)',?\s*\}/g;

let count = 0;
content = content.replace(regex, (block, name, nameVi) => {
  const detail = getCharacterMaterialDetail(nameVi) || getCharacterMaterialDetail(name);
  if (!detail || detail.worldBossMat === 'Nguyên Liệu Boss Thế Giới') {
    return block;
  }

  let updated = block;
  // Update weeklyBossMat if placeholder
  if (detail.weeklyBossMat && !detail.weeklyBossMat.includes('Nguyên Liệu')) {
    if (updated.includes("weeklyBossMat: 'Nguyên liệu Natlan'") || updated.includes("weeklyBossMat: 'Nguyên Liệu Boss Tuần'")) {
      updated = updated.replace(/weeklyBossMat:\s*'[^']+',/, `weeklyBossMat: '${detail.weeklyBossMat}',`);
    }
  }

  if (!updated.includes('worldBossMat:')) {
    updated = updated.replace(/(weeklyBossMat:\s*'[^']+',)/, `$1\n    worldBossMat: '${detail.worldBossMat}',`);
    count++;
  }
  if (!updated.includes('localSpecialty:')) {
    updated = updated.replace(/(worldBossMat:\s*'[^']+',)/, `$1\n    localSpecialty: '${detail.localSpecialty}',`);
    count++;
  }
  return updated;
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`Updated ${count} material entries in CHARACTERS_DATA!`);
