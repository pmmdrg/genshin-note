/**
 * Material Icons & Image Provider for Genshin Impact
 * Provides verified high-resolution item icons (Yatta / Enka CDN)
 */

import { CHARACTER_MATERIALS } from '../data/characterMaterialsData';
import { COMPREHENSIVE_WEAPONS } from '../data/weaponsData';
import { getCharacterTalentDetail } from '../data/characterTalentsData';

export const BASE_MATERIAL_ICONS = {
  heroWit: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104003.png',
  mora: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_202.png',
  crown: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104319.png',
  talentBook: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104303.png',
  weaponAscension: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114052.png',
  bossDrop: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113059.png',
  specialty: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_101235.png',
  realmCurrency: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_204.png',
  mysticOre: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104013.png',
  eliteMonster: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112023.png',
  commonMonster: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112002.png',
};

/**
 * Complete official icon mapping for all 18 Talent Book series in Genshin Impact (Philosophies / Sách Vàng)
 */
export const TALENT_BOOK_ICONS: Record<string, string> = {
  // Mondstadt - Forsaken Rift
  'tự do': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104303.png',
  'freedom': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104303.png',
  'kháng chiến': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104306.png',
  'resistance': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104306.png',
  'thơ văn': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104309.png',
  'ballad': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104309.png',

  // Liyue - Taishan Mansion
  'phồn vinh': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104312.png',
  'thịnh vượng': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104312.png',
  'prosperity': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104312.png',
  'chăm chỉ': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104315.png',
  'cần thiết': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104315.png',
  'diligence': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104315.png',
  'hoàng kim': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104318.png',
  'vàng kim': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104318.png',
  'gold': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104318.png',

  // Inazuma - Violet Court
  'phù thế': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104322.png',
  'transience': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104322.png',
  'phong nhã': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104325.png',
  'nhã nhặn': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104325.png',
  'elegance': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104325.png',
  'ánh sáng': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104328.png',
  'thiên quang': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104328.png',
  'light': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104328.png',

  // Sumeru - Steeple of Ignorance
  'khuyên nhủ': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104331.png',
  'biến chuyển': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104331.png',
  'admonition': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104331.png',
  'khéo léo': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104334.png',
  'sáng suốt': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104334.png',
  'ingenuity': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104334.png',
  'tri hành': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104337.png',
  'thực hành': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104337.png',
  'praxis': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104337.png',

  // Fontaine - Pale Forgotten Glory
  'công bằng': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104340.png',
  'equity': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104340.png',
  'chính nghĩa': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104343.png',
  'công lý': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104343.png',
  'justice': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104343.png',
  'trật tự': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104346.png',
  'order': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104346.png',

  // Natlan - Blazing Ruins
  'tranh đấu': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104349.png',
  'bất diệt': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104349.png',
  'tranh đua': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104349.png',
  'contention': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104349.png',
  'thiêu đốt': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104352.png',
  'hàn huyên': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104352.png',
  'hoàng huyên': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104352.png',
  'đốt lửa': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104352.png',
  'kindling': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104352.png',
  'xung đột': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104355.png',
  'conflict': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104355.png',
};

/**
 * Resolves the authentic gold talent book icon from talent book name or character name
 */
export function getTalentBookIcon(talentBookName?: string, characterName?: string): string {
  // If character name is provided and talentBookName is empty or generic, check character direct talent profile
  if (characterName) {
    const charTalent = getCharacterTalentDetail(characterName);
    if (charTalent && charTalent.talentBookIcon) {
      if (!talentBookName || talentBookName === 'Sách Thiên Phú' || talentBookName.includes('Bất Diệt / Công Lý')) {
        return charTalent.talentBookIcon;
      }
    }
  }

  if (!talentBookName) {
    if (characterName) {
      return getCharacterTalentDetail(characterName).talentBookIcon;
    }
    return BASE_MATERIAL_ICONS.talentBook;
  }

  const lower = talentBookName.toLowerCase();
  for (const [key, icon] of Object.entries(TALENT_BOOK_ICONS)) {
    if (lower.includes(key)) {
      return icon;
    }
  }

  // Fallback to character name if not matched in dictionary
  if (characterName) {
    const charTalent = getCharacterTalentDetail(characterName);
    if (charTalent?.talentBookIcon) return charTalent.talentBookIcon;
  }

  return BASE_MATERIAL_ICONS.talentBook;
}

export interface TalentDomainInfo {
  domainName: string;
  daysOfWeek: number[];
  region: string;
}

/**
 * Resolves domain schedule and location for any talent book or character
 */
export function getTalentDomainInfo(talentBookName?: string, characterName?: string): TalentDomainInfo {
  if (characterName) {
    const charTalent = getCharacterTalentDetail(characterName);
    if (charTalent && charTalent.domainName && (!talentBookName || talentBookName === 'Sách Thiên Phú')) {
      return {
        domainName: charTalent.domainName,
        daysOfWeek: charTalent.daysOfWeek,
        region: 'Teyvat',
      };
    }
  }

  if (!talentBookName) {
    if (characterName) {
      const charTalent = getCharacterTalentDetail(characterName);
      return {
        domainName: charTalent.domainName,
        daysOfWeek: charTalent.daysOfWeek,
        region: 'Teyvat',
      };
    }
    return { domainName: 'Bí Cảnh Thiên Phú', daysOfWeek: [1, 4, 0], region: 'Mondstadt' };
  }
  const name = talentBookName.toLowerCase();

  // Mondstadt
  if (name.includes('tự do') || name.includes('freedom')) {
    return { domainName: 'Hẻm Núi Forsaken (Mondstadt)', daysOfWeek: [1, 4, 0], region: 'Mondstadt' };
  }
  if (name.includes('kháng chiến') || name.includes('resistance')) {
    return { domainName: 'Hẻm Núi Forsaken (Mondstadt)', daysOfWeek: [2, 5, 0], region: 'Mondstadt' };
  }
  if (name.includes('thơ văn') || name.includes('ballad')) {
    return { domainName: 'Hẻm Núi Forsaken (Mondstadt)', daysOfWeek: [3, 6, 0], region: 'Mondstadt' };
  }

  // Liyue
  if (name.includes('phồn vinh') || name.includes('thịnh vượng') || name.includes('prosperity')) {
    return { domainName: 'Thái Sơn Phủ (Liyue)', daysOfWeek: [1, 4, 0], region: 'Liyue' };
  }
  if (name.includes('chăm chỉ') || name.includes('cần thiết') || name.includes('diligence')) {
    return { domainName: 'Thái Sơn Phủ (Liyue)', daysOfWeek: [2, 5, 0], region: 'Liyue' };
  }
  if (name.includes('hoàng kim') || name.includes('vàng kim') || name.includes('gold')) {
    return { domainName: 'Thái Sơn Phủ (Liyue)', daysOfWeek: [3, 6, 0], region: 'Liyue' };
  }

  // Inazuma
  if (name.includes('phù thế') || name.includes('transience')) {
    return { domainName: 'Sân Đình Violet (Inazuma)', daysOfWeek: [1, 4, 0], region: 'Inazuma' };
  }
  if (name.includes('phong nhã') || name.includes('nhã nhặn') || name.includes('elegance')) {
    return { domainName: 'Sân Đình Violet (Inazuma)', daysOfWeek: [2, 5, 0], region: 'Inazuma' };
  }
  if (name.includes('ánh sáng') || name.includes('thiên quang') || name.includes('light')) {
    return { domainName: 'Sân Đình Violet (Inazuma)', daysOfWeek: [3, 6, 0], region: 'Inazuma' };
  }

  // Sumeru
  if (name.includes('khuyên nhủ') || name.includes('biến chuyển') || name.includes('admonition')) {
    return { domainName: 'Tháp Vô Danh (Sumeru)', daysOfWeek: [1, 4, 0], region: 'Sumeru' };
  }
  if (name.includes('khéo léo') || name.includes('sáng suốt') || name.includes('ingenuity')) {
    return { domainName: 'Tháp Vô Danh (Sumeru)', daysOfWeek: [2, 5, 0], region: 'Sumeru' };
  }
  if (name.includes('tri hành') || name.includes('thực hành') || name.includes('praxis')) {
    return { domainName: 'Tháp Vô Danh (Sumeru)', daysOfWeek: [3, 6, 0], region: 'Sumeru' };
  }

  // Fontaine
  if (name.includes('công bằng') || name.includes('equity')) {
    return { domainName: 'Vinh Quang Nhạt Nhòa (Fontaine)', daysOfWeek: [1, 4, 0], region: 'Fontaine' };
  }
  if (name.includes('chính nghĩa') || name.includes('công lý') || name.includes('justice')) {
    return { domainName: 'Vinh Quang Nhạt Nhòa (Fontaine)', daysOfWeek: [2, 5, 0], region: 'Fontaine' };
  }
  if (name.includes('trật tự') || name.includes('order')) {
    return { domainName: 'Vinh Quang Nhạt Nhòa (Fontaine)', daysOfWeek: [3, 6, 0], region: 'Fontaine' };
  }

  // Natlan
  if (name.includes('tranh đấu') || name.includes('bất diệt') || name.includes('tranh đua') || name.includes('contention')) {
    return { domainName: 'Tàn Tích Bốc Cháy (Natlan)', daysOfWeek: [1, 4, 0], region: 'Natlan' };
  }
  if (name.includes('thiêu đốt') || name.includes('hàn huyên') || name.includes('hoàng huyên') || name.includes('đốt lửa') || name.includes('kindling')) {
    return { domainName: 'Tàn Tích Bốc Cháy (Natlan)', daysOfWeek: [2, 5, 0], region: 'Natlan' };
  }
  if (name.includes('xung đột') || name.includes('conflict')) {
    return { domainName: 'Tàn Tích Bốc Cháy (Natlan)', daysOfWeek: [3, 6, 0], region: 'Natlan' };
  }

  if (characterName) {
    const charTalent = getCharacterTalentDetail(characterName);
    return {
      domainName: charTalent.domainName,
      daysOfWeek: charTalent.daysOfWeek,
      region: 'Teyvat',
    };
  }

  return { domainName: 'Bí Cảnh Thiên Phú', daysOfWeek: [1, 4, 0], region: 'Teyvat' };
}

const SPECIFIC_MATERIAL_MAP: Record<string, string> = {
  // Boss Drops (World Boss)
  'Nước Không Thể Tan': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113057.png',
  'Nước Chưa Đạt Mức Siêu Việt': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113057.png',
  'Hạt Sen Sấm Sét': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113023.png',
  'Tháp Huyền Nham': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113009.png',
  'Mảnh Giai Điệu Vàng': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113059.png',
  'Lựu Lửa Quá Chín': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113065.png',
  'Trục Bí Cảnh Bí Ẩn': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113066.png',
  'Lõi Nguồn Khắc Hoa Văn Kỳ Bí': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113064.png',
  'Linh Kiện Dây Cót - Coppelius': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113053.png',
  'Linh Kiện Dây Cót - Coppelia': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113052.png',
  'Sừng Kỳ Lân Biển Sâu': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113058.png',

  // Weekly Boss Drops
  'Khối Không Ánh Sáng': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113056.png',
  'Dây Tơ Không Ám': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113054.png',
  'Dây Tơ Không Ám (Cá Voi)': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113054.png',
  'Mắt Xoáy Không Ánh Sáng': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113055.png',
  'Thời Khắc Tan Biến (Signora)': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113025.png',
  'Thời Khắc Tan Biến': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113025.png',
  'Thời Khắc Tan Chảy': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113025.png',
  'Mảnh Ma Kiếm Phong Ma': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113014.png',
  'Vảy Vàng Azhdaha': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113019.png',
  'Vảy Vàng Mạ Bạc (Azhdaha)': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113019.png',
  'Sừng Childe': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113013.png',
  'Thôn Thiên Kình - Sừng': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113013.png',
  'Sừng Ma Kiếm Childe': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113013.png',
  'Lông Vũ Dvalin': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113001.png',
  'Móng Vuốt Dvalin': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113002.png',
  'Hơi Thở Dvalin': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113003.png',
  'Gương Mushin': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113042.png',
  'Dây Tơ Rối (Scaramouche)': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113041.png',
  'Hỏa Ngục Chi Trọng': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113024.png',
  'Thị Huyết Của Primordial': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113054.png',
  'Ngọn Lửa Khắc Ghi (Arlecchino Boss)': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113060.png',
  'Ngọn Lửa Khắc Ghi': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113060.png',
  'Phủ Định Và Phán Quyết': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113062.png',
  'Sừng Ăn Mòn': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_113071.png',

  // Crown
  'Vương Miện Trí Thức': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104319.png',

  // Local Specialties
  'Lily Ánh Sáng Hồ Nước': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_101238.png',
  'Hoa Hồ Trung Cảnh': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_101235.png',
  'Quả Amakumo': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_101207.png',
  'Dạ Bạc Thạch': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_100028.png',
  'Hoa Nghê Thường': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_100030.png',
  'Hoa Cúc Cánh Gió': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_100024.png',
  'Cúc Cánh Gió': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_100024.png',
  'Ớt Tuyệt Vân': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_100027.png',
  'Thạch Phách': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_100029.png',
  'Bồ Công Anh': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_100021.png',
  'Hạt Bồ Công Anh': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_100021.png',
  'Hoa Cecilia': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_100023.png',
  'Nấm Rơm Biển': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_101201.png',
  'Ốc Tinh Tế': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_100034.png',
  'Lumitoile': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_101237.png',
  'Tường Vi Cầu Vồng': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_101234.png',
  'Giọt Sương Ban Sớm': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_101239.png',
  'Lá Khô Tử Ánh': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_101249.png',
  'Cúc Rực Rỡ': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_101250.png',
  'Sen Đá Saurian': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_101252.png',

  // Weapon Ascension Mats
  'Giọt Sương Tinh Khiết': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114052.png',
  'Mặt Nạ Hổ Phách': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114032.png',
  'Cát Đen Thiên Thạch Liyue': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114020.png',
  'Hạt Muối Đen Liyue': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114020.png',
  'Thạch Lựu Sáng Guyun': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114016.png',
  'Mảnh Xiềng Xích Dandelion': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114012.png',
  'Xiềng Xích Dandelion': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114012.png',
  'Xiềng Xích Đấu Sĩ Nanh Sư Tử': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114012.png',
  'Gia Huy Decarabian': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114004.png',
  'Mảnh Ngói Decarabian': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114001.png',
  'Răng Nanh Sói Bắc Phong': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114008.png',
  'Sữa Răng Sói Bắc Phong': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114005.png',
  'Nhánh Biển Xanh San Hô': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114028.png',
  'Thánh Tích Fontaine': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114060.png',
  'Trái Tim Rực Lửa Tế Lễ': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114064.png',
  'Bộ Cốt Tế Thần': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114068.png',
  'Dây Cót Hợp Âm Fontaine': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_114056.png',

  // Elite Monster Drops
  'Cấu Trúc Hỗn Độn': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112023.png',
  'Mạch Hỗn Độn': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112024.png',
  'Lõi Hỗn Độn': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112025.png',
  'Cơ Quan Hỗn Độn': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112047.png',
  'Trục Hỗn Độn': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112048.png',
  'Mắt Hỗn Độn': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112049.png',
  'Vật Chứa Hỗn Độn': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112065.png',
  'Cành Cây Địa Mạch': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112012.png',
  'Chi Khô Địa Mạch': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112012.png',
  'Cốt Chùy U Tối': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112015.png',
  'Sừng Nặng': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112014.png',
  'Trục Cơ Quan': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112085.png',
  'Bánh Răng Khớp Nối': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112082.png',
  'Dao Săn Nham': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112026.png',
  'Dao Săn Bắt': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112026.png',
  'Tượng Hắc Ám': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112067.png',
  'Giọt Nước Đục': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112086.png',

  // Common Monster Drops
  'Dịch Slime': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112002.png',
  'Tinh Slime': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112003.png',
  'Bột Slime': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112004.png',
  'Mặt Nạ Bị Hỏng': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112005.png',
  'Mặt Nạ Vỡ': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112005.png',
  'Huy Hiệu Sĩ Quan': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112034.png',
  'Phù Hiệu Tân Binh': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112032.png',
  'Kiếm Cách Cũ Nát': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112044.png',
  'Kiếm Cách Bản Ngang': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112045.png',
  'Kiếm Cách Sắc Bén': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112046.png',
  'Bào Tử Nấm': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112061.png',
  'Bào Tử Nấm Quỷ': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112061.png',
  'Giọt Nước Tinh Linh': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112078.png',
  'Ngọc Vụn Đại Dương': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112080.png',
  'Bánh Răng Liên Kết': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112081.png',
  'Răng Nanh Non Nớt': 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_112101.png',
};

/**
 * Universal Material Icon Resolver
 */
export function getMaterialIconUrl(
  materialName?: string,
  category: keyof typeof BASE_MATERIAL_ICONS = 'bossDrop'
): string {
  if (!materialName) return BASE_MATERIAL_ICONS[category];

  const trimmed = materialName.trim();

  // 1. Exact match in SPECIFIC_MATERIAL_MAP
  if (SPECIFIC_MATERIAL_MAP[trimmed]) {
    return SPECIFIC_MATERIAL_MAP[trimmed];
  }

  // 2. Talent book matching
  if (category === 'talentBook' || trimmed.toLowerCase().includes('sách') || trimmed.toLowerCase().includes('triết học')) {
    const talentIcon = getTalentBookIcon(trimmed);
    if (talentIcon !== BASE_MATERIAL_ICONS.talentBook) {
      return talentIcon;
    }
  }

  // 3. Dynamic match from character materials database
  for (const detail of Object.values(CHARACTER_MATERIALS)) {
    if (detail.worldBossMat === trimmed && detail.worldBossMatIcon) return detail.worldBossMatIcon;
    if (detail.weeklyBossMat === trimmed && detail.weeklyBossMatIcon) return detail.weeklyBossMatIcon;
    if (detail.localSpecialty === trimmed && detail.localSpecialtyIcon) return detail.localSpecialtyIcon;
  }

  // 4. Fuzzy / partial match in SPECIFIC_MATERIAL_MAP
  const lower = trimmed.toLowerCase();
  for (const [key, icon] of Object.entries(SPECIFIC_MATERIAL_MAP)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return icon;
    }
  }

  // 5. Dynamic match from comprehensive weapons database
  for (const w of COMPREHENSIVE_WEAPONS) {
    if (w.ascensionMat === trimmed && w.ascensionMatIcon) return w.ascensionMatIcon;
    if (w.eliteMatName === trimmed && w.eliteMatIcon) return w.eliteMatIcon;
    if (w.commonMatName === trimmed && w.commonMatIcon) return w.commonMatIcon;
  }

  return BASE_MATERIAL_ICONS[category];
}
