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
  'Mặt Nạ Hổ Phách': 'https://enka.network/ui/UI_ItemIcon_114028.png',
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
