const fs = require('fs');
const path = require('path');
const https = require('https');

const code = fs.readFileSync(path.resolve(__dirname, '../src/data/characterMaterialsData.ts'), 'utf-8');
const jsonStr = code.match(/export const CHARACTER_MATERIALS: Record<string, CharacterMaterialDetail> = ([\s\S]*?);\n\n\/\*\*/);
const map = JSON.parse(jsonStr[1]);

const iconUrls = new Set();
for (const [, detail] of Object.entries(map)) {
  if (detail.worldBossMatIcon) iconUrls.add(detail.worldBossMatIcon);
  if (detail.weeklyBossMatIcon) iconUrls.add(detail.weeklyBossMatIcon);
  if (detail.localSpecialtyIcon) iconUrls.add(detail.localSpecialtyIcon);
}

async function check(url) {
  return new Promise(resolve => {
    https.get(url, { method: 'HEAD', timeout: 5000 }, res => {
      resolve({ url, status: res.statusCode });
    }).on('error', () => resolve({ url, status: 500 }))
      .on('timeout', () => resolve({ url, status: 408 }));
  });
}

async function run() {
  const list = Array.from(iconUrls);
  const failed = [];
  const chunkSize = 25;
  for (let i = 0; i < list.length; i += chunkSize) {
    const chunk = list.slice(i, i + chunkSize);
    const results = await Promise.all(chunk.map(check));
    for (const r of results) {
      if (r.status !== 200) {
        failed.push(r.url);
      }
    }
  }
  fs.writeFileSync('failed_icons.json', JSON.stringify(failed, null, 2));
  console.log(`Checked ${list.length} icons. Failed count: ${failed.length}`);
}

run();
