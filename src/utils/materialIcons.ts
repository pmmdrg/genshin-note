/**
 * Material Icons & Image Provider for Genshin Impact
 */

export const BASE_MATERIAL_ICONS = {
  heroWit: 'https://enka.network/ui/UI_ItemIcon_104003.png',
  mora: 'https://enka.network/ui/UI_ItemIcon_202.png',
  crown: 'https://enka.network/ui/UI_ItemIcon_104319.png',
  talentBook: 'https://enka.network/ui/UI_ItemIcon_104303.png',
  weaponAscension: 'https://enka.network/ui/UI_ItemIcon_114052.png',
  bossDrop: 'https://enka.network/ui/UI_ItemIcon_113059.png',
  specialty: 'https://enka.network/ui/UI_ItemIcon_101235.png',
  realmCurrency: 'https://enka.network/ui/UI_ItemIcon_204.png',
  mysticOre: 'https://enka.network/ui/UI_ItemIcon_104013.png',
  eliteMonster: 'https://enka.network/ui/UI_ItemIcon_112012.png',
  commonMonster: 'https://enka.network/ui/UI_ItemIcon_112002.png',
};

const SPECIFIC_MATERIAL_MAP: Record<string, string> = {
  // Boss Drops
  'Nước Không Thể Tan': 'https://static.wikia.nocookie.net/gensin-impact/images/a/a9/Item_Water_That_Failed_To_Transcend.png',
  'Hạt Sen Sấm Sét': 'https://enka.network/ui/UI_ItemIcon_113023.png',
  'Mảnh Ma Kiếm Phong Ma': 'https://enka.network/ui/UI_ItemIcon_113014.png',
  'Vảy Vàng Azhdaha': 'https://enka.network/ui/UI_ItemIcon_113019.png',
  'Sừng Childe': 'https://enka.network/ui/UI_ItemIcon_113013.png',
  'Lông Vũ Dvalin': 'https://enka.network/ui/UI_ItemIcon_113001.png',
  'Móng Vuốt Dvalin': 'https://enka.network/ui/UI_ItemIcon_113002.png',

  // Local Specialties
  'Hoa Hồ Trung Cảnh': 'https://enka.network/ui/UI_ItemIcon_101235.png',
  'Quả Amakumo': 'https://enka.network/ui/UI_ItemIcon_101207.png',
  'Dạ Bạc Thạch': 'https://enka.network/ui/UI_ItemIcon_100028.png',
  'Hoa Nghê Thường': 'https://enka.network/ui/UI_ItemIcon_100030.png',
  'Hoa Cúc Cánh Gió': 'https://enka.network/ui/UI_ItemIcon_100024.png',
  'Ớt Tuyệt Vân': 'https://enka.network/ui/UI_ItemIcon_100027.png',

  // Weekly Boss Drops
  'Dây Tơ Không Ám (Cá Voi)': 'https://enka.network/ui/UI_ItemIcon_113049.png',
  'Thời Khắc Tan Biến (Signora)': 'https://enka.network/ui/UI_ItemIcon_113025.png',

  // Weapon Ascension Mats
  'Giọt Sương Tinh Khiết': 'https://enka.network/ui/UI_ItemIcon_114052.png',
  'Mặt Nạ Hổ Phách': 'https://enka.network/ui/UI_ItemIcon_114032.png',
  'Cát Đen Thiên Thạch Liyue': 'https://enka.network/ui/UI_ItemIcon_114020.png',
  'Hạt Muối Đen Liyue': 'https://enka.network/ui/UI_ItemIcon_114020.png',
  'Thạch Lựu Sáng Guyun': 'https://enka.network/ui/UI_ItemIcon_114016.png',
  'Mảnh Xiềng Xích Dandelion': 'https://enka.network/ui/UI_ItemIcon_114012.png',
  'Gia Huy Decarabian': 'https://enka.network/ui/UI_ItemIcon_114004.png',
  'Răng Nanh Sói Bắc Phong': 'https://enka.network/ui/UI_ItemIcon_114008.png',
  'Nhánh Biển Xanh San Hô': 'https://enka.network/ui/UI_ItemIcon_114028.png',
  'Thánh Tích Fontaine': 'https://enka.network/ui/UI_ItemIcon_114060.png',
  'Trái Tim Rực Lửa Tế Lễ': 'https://enka.network/ui/UI_ItemIcon_114064.png',
  'Bộ Cốt Tế Thần': 'https://enka.network/ui/UI_ItemIcon_114068.png',
  'Dây Cót Hợp Âm Fontaine': 'https://enka.network/ui/UI_ItemIcon_114056.png',

  // Elite Monster Drops
  'Chi Khô Địa Mạch': 'https://enka.network/ui/UI_ItemIcon_112012.png',
  'Cốt Chùy U Tối': 'https://enka.network/ui/UI_ItemIcon_112015.png',
  'Trục Cơ Quan': 'https://enka.network/ui/UI_ItemIcon_112085.png',
  'Bánh Răng Khớp Nối': 'https://enka.network/ui/UI_ItemIcon_112082.png',
  'Dao Săn Nham': 'https://enka.network/ui/UI_ItemIcon_112026.png',
  'Tượng Hắc Ám': 'https://enka.network/ui/UI_ItemIcon_112067.png',

  // Common Monster Drops
  'Dịch Slime': 'https://enka.network/ui/UI_ItemIcon_112002.png',
  'Mặt Nạ Bị Hỏng': 'https://enka.network/ui/UI_ItemIcon_112007.png',
  'Huy Hiệu Sĩ Quan': 'https://enka.network/ui/UI_ItemIcon_112034.png',
  'Kiếm Cách Sắc Bén': 'https://enka.network/ui/UI_ItemIcon_112046.png',
  'Bào Tử Nấm': 'https://enka.network/ui/UI_ItemIcon_112061.png',
  'Giọt Nước Tinh Linh': 'https://enka.network/ui/UI_ItemIcon_112078.png',
};

import { CHARACTER_MATERIALS } from '../data/characterMaterialsData';

export function getMaterialIconUrl(
  materialName?: string,
  category: keyof typeof BASE_MATERIAL_ICONS = 'bossDrop'
): string {
  if (!materialName) return BASE_MATERIAL_ICONS[category];

  if (SPECIFIC_MATERIAL_MAP[materialName]) {
    return SPECIFIC_MATERIAL_MAP[materialName];
  }

  // Dynamic match from character materials database
  for (const detail of Object.values(CHARACTER_MATERIALS)) {
    if (detail.worldBossMat === materialName) return detail.worldBossMatIcon;
    if (detail.weeklyBossMat === materialName) return detail.weeklyBossMatIcon;
    if (detail.localSpecialty === materialName) return detail.localSpecialtyIcon;
  }

  return BASE_MATERIAL_ICONS[category];
}
