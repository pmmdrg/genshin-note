/**
 * Material Icons & Image Provider for Genshin Impact
 */

export const BASE_MATERIAL_ICONS = {
  heroWit: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_104003.png',
  mora: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_202.png',
  crown: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_104319.png',
  talentBook: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_104303.png',
  weaponAscension: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_114052.png',
  bossDrop: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_113053.png',
  specialty: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_101235.png',
};

const SPECIFIC_MATERIAL_MAP: Record<string, string> = {
  // Boss Drops
  'Nước Không Thể Tan': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_113053.png',
  'Hạt Sen Sấm Sét': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_113023.png',
  'Mảnh Ma Kiếm Phong Ma': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_113014.png',
  'Vảy Vàng Azhdaha': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_113019.png',
  'Sừng Childe': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_113013.png',
  'Lông Vũ Dvalin': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_113001.png',
  'Móng Vuốt Dvalin': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_113002.png',

  // Local Specialties
  'Hoa Hồ Trung Cảnh': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_101235.png',
  'Quả Amakumo': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_101207.png',
  'Dạ Bạc Thạch': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_100028.png',
  'Hoa Nghê Thường': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_100030.png',
  'Hoa Cúc Cánh Gió': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_100024.png',
  'Ớt Tuyệt Vân': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_100027.png',

  // Weekly Boss Drops
  'Dây Tơ Không Ám (Cá Voi)': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_113054.png',
  'Thời Khắc Tan Biến (Signora)': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_113025.png',

  // Weapon Ascension Mats
  'Giọt Sương Tinh Khiết': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_114052.png',
  'Mặt Nạ Hổ Phách': 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_ItemIcon_114028.png',
};

export function getMaterialIconUrl(
  materialName?: string,
  category: keyof typeof BASE_MATERIAL_ICONS = 'bossDrop'
): string {
  if (materialName && SPECIFIC_MATERIAL_MAP[materialName]) {
    return SPECIFIC_MATERIAL_MAP[materialName];
  }
  return BASE_MATERIAL_ICONS[category];
}
