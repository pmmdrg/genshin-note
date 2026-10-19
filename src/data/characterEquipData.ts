/**
 * Character Signature Weapons and Recommended Artifact Builds
 * Provides accurate mappings for in-game characters and Enka showcase item resolution.
 */

export interface CharacterBuildInfo {
  weapon: {
    name: string;
    icon: string;
    rarity: number;
    level: number;
    affixLevel: number;
    typeName: string;
  };
  relics: {
    setName: string;
    pieces: Array<{
      name: string;
      icon: string;
      posName: string;
      rarity: number;
      level: number;
      setName: string;
    }>;
  };
}

export const RELIC_POS_NAMES: Record<string, string> = {
  EQUIP_BRACER: 'Hoa Sự Sống',
  EQUIP_NECKLACE: 'Lông Vũ Tử Thần',
  EQUIP_SHOES: 'Cát Thời Gian',
  EQUIP_RING: 'Ly Không Gian',
  EQUIP_DRESS: 'Nón Lý Trí',
};

export const ENKA_WEAPON_NAMES: Record<string, { name: string; typeName: string; rarity: number }> = {
  // Polearms
  UI_EquipIcon_Pole_Kunwu: { name: 'Giáo Nịnh Thần', typeName: 'Vũ Khí Cán Dài', rarity: 5 },
  UI_EquipIcon_Pole_BloodMoon: { name: 'Xích Nguyệt Liêm', typeName: 'Vũ Khí Cán Dài', rarity: 5 },
  UI_EquipIcon_Pole_Homa: { name: 'Trượng Homa', typeName: 'Vũ Khí Cán Dài', rarity: 5 },
  UI_EquipIcon_Pole_Narukami: { name: 'Đoạn Thảo Trảm Quang', typeName: 'Vũ Khí Cán Dài', rarity: 5 },
  UI_EquipIcon_Pole_Zephyrus: { name: 'Thương Tây Phong', typeName: 'Vũ Khí Cán Dài', rarity: 4 },
  UI_EquipIcon_Pole_Arakalari: { name: 'Trăng Lưỡi Liềm Trôi Dạt', typeName: 'Vũ Khí Cán Dài', rarity: 4 },
  UI_EquipIcon_Pole_Ilmarinen: { name: 'Gậy Vệt Cầu Vồng', typeName: 'Vũ Khí Cán Dài', rarity: 4 },
  UI_EquipIcon_Pole_TummaLyhty: { name: 'Khúc Ca Đêm Tối', typeName: 'Vũ Khí Cán Dài', rarity: 5 },
  UI_EquipIcon_Pole_Noire: { name: 'Hắc Anh Thương', typeName: 'Vũ Khí Cán Dài', rarity: 3 },
  UI_EquipIcon_Pole_TheCatch: { name: 'Lao Xiên Cá', typeName: 'Vũ Khí Cán Dài', rarity: 4 },

  // Swords
  UI_EquipIcon_Sword_Dawn: { name: 'Kiếm Bình Minh', typeName: 'Kiếm Đơn', rarity: 3 },
  UI_EquipIcon_Sword_Zephyrus: { name: 'Tây Phong Kiếm', typeName: 'Kiếm Đơn', rarity: 4 },
  UI_EquipIcon_Sword_Favonius: { name: 'Tây Phong Kiếm', typeName: 'Kiếm Đơn', rarity: 4 },
  UI_EquipIcon_Sword_Machination: { name: 'Ống Đồng Vùng Fleuve Cendre', typeName: 'Kiếm Đơn', rarity: 4 },
  UI_EquipIcon_Sword_Fossil: { name: 'Kiếm Tế Lễ', typeName: 'Kiếm Đơn', rarity: 4 },
  UI_EquipIcon_Sword_OuterSword: { name: 'Ám Vũ Skirk', typeName: 'Kiếm Đơn', rarity: 5 },
  UI_EquipIcon_Sword_GlintstoneSword: { name: 'Hắc Nham Trảm Kiếm', typeName: 'Kiếm Đơn', rarity: 4 },
  UI_EquipIcon_Sword_IronSting: { name: 'Thiết Phong Kích', typeName: 'Kiếm Đơn', rarity: 4 },
  UI_EquipIcon_Sword_Transmutation: { name: 'Khát Vọng Răng Kiếm', typeName: 'Kiếm Đơn', rarity: 4 },
  UI_EquipIcon_Sword_Regalis: { name: 'Ánh Lửa Tự Do', typeName: 'Kiếm Đơn', rarity: 5 },
  UI_EquipIcon_Sword_Pleroma: { name: 'Thanh Kiếm Tĩnh Lặng', typeName: 'Kiếm Đơn', rarity: 5 },

  // Catalysts
  UI_EquipIcon_Catalyst_Brisingamen: { name: 'Chân Ngụy Thiên Ngân', typeName: 'Pháp Khí', rarity: 5 },
  UI_EquipIcon_Catalyst_Fossil: { name: 'Mảnh Chương Tế Lễ', typeName: 'Pháp Khí', rarity: 4 },
  UI_EquipIcon_Catalyst_Ilmarinen: { name: 'Vòng Xoáy Dập Dềnh', typeName: 'Pháp Khí', rarity: 4 },
  UI_EquipIcon_Catalyst_Ayus: { name: 'Cõi Mộng Ngàn Đêm', typeName: 'Pháp Khí', rarity: 5 },
  UI_EquipIcon_Catalyst_Iudex: { name: 'Dòng Chảy Giám Sát', typeName: 'Pháp Khí', rarity: 5 },
  UI_EquipIcon_Catalyst_Zephyrus: { name: 'Tây Phong Bí Điển', typeName: 'Pháp Khí', rarity: 4 },
  UI_EquipIcon_Catalyst_Troupe: { name: 'Chương Nhạc Lang Thang', typeName: 'Pháp Khí', rarity: 4 },
  UI_EquipIcon_Catalyst_Widsith: { name: 'Chương Nhạc Lang Thang', typeName: 'Pháp Khí', rarity: 4 },
  UI_EquipIcon_Catalyst_Apprentice: { name: 'Câu Chuyện Diệt Rồng', typeName: 'Pháp Khí', rarity: 3 },

  // Claymores
  UI_EquipIcon_Claymore_Wolfmound: { name: 'Đường Cùng Của Sói', typeName: 'Trọng Kiếm', rarity: 5 },
  UI_EquipIcon_Claymore_RadianceSword: { name: 'Thiên Nhật Thiêu Đốt', typeName: 'Trọng Kiếm', rarity: 5 },
  UI_EquipIcon_Claymore_Mavuika: { name: 'Thiên Nhật Thiêu Đốt', typeName: 'Trọng Kiếm', rarity: 5 },
  UI_EquipIcon_Claymore_Itadorimaru: { name: 'Xích Giác Phá Thạch Đao', typeName: 'Trọng Kiếm', rarity: 5 },
  UI_EquipIcon_Claymore_Kione: { name: 'Kiếm Li Cốt', typeName: 'Trọng Kiếm', rarity: 4 },
  UI_EquipIcon_Claymore_Zephyrus: { name: 'Đại Kiếm Tây Phong', typeName: 'Trọng Kiếm', rarity: 4 },
  UI_EquipIcon_Claymore_Exotic: { name: 'Bạch Ảnh Kiếm', typeName: 'Trọng Kiếm', rarity: 4 },
  UI_EquipIcon_Claymore_Whiteblind: { name: 'Bạch Ảnh Kiếm', typeName: 'Trọng Kiếm', rarity: 4 },

  // Bows
  UI_EquipIcon_Bow_Zephyrus: { name: 'Cung Tây Phong', typeName: 'Cung', rarity: 4 },
  UI_EquipIcon_Bow_Favonius: { name: 'Cung Tây Phong', typeName: 'Cung', rarity: 4 },
  UI_EquipIcon_Bow_Fossil: { name: 'Cung Tế Lễ', typeName: 'Cung', rarity: 4 },
  UI_EquipIcon_Bow_Troupe: { name: 'Tuyệt Huyền', typeName: 'Cung', rarity: 4 },
  UI_EquipIcon_Bow_Hunter: { name: 'Cung Lửa Thợ Săn', typeName: 'Cung', rarity: 5 },
};

export const ENKA_RELIC_SETS: Record<string, string> = {
  '15003': 'Đoàn Hát Lang Thang',
  '15005': 'Bóng Hình Màu Xanh',
  '15006': 'Nghi Thức Tông Thất Cổ',
  '15008': 'Diệm Liệt Ma Nữ Cháy Rực',
  '15009': 'Băng Giá Dũng Sĩ',
  '15014': 'Bạch Ngân Sấm Sét',
  '15017': 'Thiên Nham Vững Chắc',
  '15020': 'Dấu Ấn Ngăn Trở',
  '15021': 'Giáp Hoa Nở Rộ',
  '15025': 'Ký Ức Rừng Sâu',
  '15026': 'Giấc Mộng Hoàng Kim',
  '15027': 'Đoá Hoa Trang Viên Lạc Lối',
  '15032': 'Thợ Săn Marechaussee',
  '15033': 'Đoàn Kịch Hoàng Kim',
  '15035': 'Mảnh Hài Hòa Hư Ảo',
  '15040': 'Nguyện Ước Dị Giới (Skirk)',
  '15041': 'Cuộn Bí Ẩn Dũng Sĩ Tro Tàn',
  '15042': 'Dũng Sĩ Hỏa Diệm Khắc Họa',
  '15043': 'Khúc Ca Băng Tuyết Dạ Thần',
  '15048': 'Vết Tích Đêm Huyền Bí',
};

/**
 * Character Signature Weapon & Best-in-slot Relic Build Catalog
 */
export const CHARACTER_DEFAULT_BUILDS: Record<string, CharacterBuildInfo> = {
  zhongli: {
    weapon: {
      name: 'Giáo Nịnh Thần',
      icon: 'https://enka.network/ui/UI_EquipIcon_Pole_Kunwu.png',
      rarity: 5,
      level: 90,
      affixLevel: 1,
      typeName: 'Vũ Khí Cán Dài',
    },
    relics: {
      setName: 'Thiên Nham Vững Chắc (4 món)',
      pieces: [
        { name: 'Hoa Sự Sống', icon: 'https://enka.network/ui/UI_RelicIcon_15017_4.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Thiên Nham Vững Chắc' },
        { name: 'Lông Vũ Tử Thần', icon: 'https://enka.network/ui/UI_RelicIcon_15017_2.png', posName: 'Lông Vũ Tử Thần', rarity: 5, level: 20, setName: 'Thiên Nham Vững Chắc' },
        { name: 'Cát Thời Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15017_5.png', posName: 'Cát Thời Gian', rarity: 5, level: 20, setName: 'Thiên Nham Vững Chắc' },
        { name: 'Ly Không Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15017_1.png', posName: 'Ly Không Gian', rarity: 5, level: 20, setName: 'Thiên Nham Vững Chắc' },
        { name: 'Nón Lý Trí', icon: 'https://enka.network/ui/UI_RelicIcon_15017_3.png', posName: 'Nón Lý Trí', rarity: 5, level: 20, setName: 'Thiên Nham Vững Chắc' },
      ],
    },
  },
  diluc: {
    weapon: {
      name: 'Đường Cùng Của Sói',
      icon: 'https://enka.network/ui/UI_EquipIcon_Claymore_Wolfmound.png',
      rarity: 5,
      level: 90,
      affixLevel: 1,
      typeName: 'Trọng Kiếm',
    },
    relics: {
      setName: 'Diệm Liệt Ma Nữ Cháy Rực (4 món)',
      pieces: [
        { name: 'Hoa Ma Nữ', icon: 'https://enka.network/ui/UI_RelicIcon_15008_4.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Diệm Liệt Ma Nữ' },
        { name: 'Lông Vũ Ma Nữ', icon: 'https://enka.network/ui/UI_RelicIcon_15008_2.png', posName: 'Lông Vũ Tử Thần', rarity: 5, level: 20, setName: 'Diệm Liệt Ma Nữ' },
        { name: 'Cát Thời Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15008_5.png', posName: 'Cát Thời Gian', rarity: 5, level: 20, setName: 'Diệm Liệt Ma Nữ' },
        { name: 'Ly Không Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15008_1.png', posName: 'Ly Không Gian', rarity: 5, level: 20, setName: 'Diệm Liệt Ma Nữ' },
        { name: 'Nón Lý Trí', icon: 'https://enka.network/ui/UI_RelicIcon_15008_3.png', posName: 'Nón Lý Trí', rarity: 5, level: 20, setName: 'Diệm Liệt Ma Nữ' },
      ],
    },
  },
  bennett: {
    weapon: {
      name: 'Tây Phong Kiếm',
      icon: 'https://enka.network/ui/UI_EquipIcon_Sword_Favonius.png',
      rarity: 4,
      level: 90,
      affixLevel: 5,
      typeName: 'Kiếm Đơn',
    },
    relics: {
      setName: 'Nghi Thức Tông Thất Cổ (4 món)',
      pieces: [
        { name: 'Hoa Tông Thất', icon: 'https://enka.network/ui/UI_RelicIcon_15006_4.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Nghi Thức Tông Thất Cổ' },
        { name: 'Lông Tông Thất', icon: 'https://enka.network/ui/UI_RelicIcon_15006_2.png', posName: 'Lông Vũ Tử Thần', rarity: 5, level: 20, setName: 'Nghi Thức Tông Thất Cổ' },
        { name: 'Cát Tông Thất', icon: 'https://enka.network/ui/UI_RelicIcon_15006_5.png', posName: 'Cát Thời Gian', rarity: 5, level: 20, setName: 'Nghi Thức Tông Thất Cổ' },
        { name: 'Ly Tông Thất', icon: 'https://enka.network/ui/UI_RelicIcon_15006_1.png', posName: 'Ly Không Gian', rarity: 5, level: 20, setName: 'Nghi Thức Tông Thất Cổ' },
        { name: 'Nón Tông Thất', icon: 'https://enka.network/ui/UI_RelicIcon_15006_3.png', posName: 'Nón Lý Trí', rarity: 5, level: 20, setName: 'Nghi Thức Tông Thất Cổ' },
      ],
    },
  },
  xiangling: {
    weapon: {
      name: 'Lao Xiên Cá',
      icon: 'https://enka.network/ui/UI_EquipIcon_Pole_TheCatch.png',
      rarity: 4,
      level: 90,
      affixLevel: 5,
      typeName: 'Vũ Khí Cán Dài',
    },
    relics: {
      setName: 'Dấu Ấn Ngăn Trở (4 món)',
      pieces: [
        { name: 'Hoa Dấu Ấn', icon: 'https://enka.network/ui/UI_RelicIcon_15020_4.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
        { name: 'Lông Dấu Ấn', icon: 'https://enka.network/ui/UI_RelicIcon_15020_2.png', posName: 'Lông Vũ Tử Thần', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
        { name: 'Cát Dấu Ấn', icon: 'https://enka.network/ui/UI_RelicIcon_15020_5.png', posName: 'Cát Thời Gian', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
        { name: 'Ly Dấu Ấn', icon: 'https://enka.network/ui/UI_RelicIcon_15020_1.png', posName: 'Ly Không Gian', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
        { name: 'Nón Dấu Ấn', icon: 'https://enka.network/ui/UI_RelicIcon_15020_3.png', posName: 'Nón Lý Trí', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
      ],
    },
  },
  xingqiu: {
    weapon: {
      name: 'Kiếm Tế Lễ',
      icon: 'https://enka.network/ui/UI_EquipIcon_Sword_Fossil.png',
      rarity: 4,
      level: 90,
      affixLevel: 5,
      typeName: 'Kiếm Đơn',
    },
    relics: {
      setName: 'Dấu Ấn Ngăn Trở (4 món)',
      pieces: [
        { name: 'Hoa Dấu Ấn', icon: 'https://enka.network/ui/UI_RelicIcon_15020_4.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
        { name: 'Lông Dấu Ấn', icon: 'https://enka.network/ui/UI_RelicIcon_15020_2.png', posName: 'Lông Vũ Tử Thần', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
        { name: 'Cát Dấu Ấn', icon: 'https://enka.network/ui/UI_RelicIcon_15020_5.png', posName: 'Cát Thời Gian', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
        { name: 'Ly Dấu Ấn', icon: 'https://enka.network/ui/UI_RelicIcon_15020_1.png', posName: 'Ly Không Gian', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
        { name: 'Nón Dấu Ấn', icon: 'https://enka.network/ui/UI_RelicIcon_15020_3.png', posName: 'Nón Lý Trí', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
      ],
    },
  },
  kukishinobu: {
    weapon: {
      name: 'Thiết Phong Kích',
      icon: 'https://enka.network/ui/UI_EquipIcon_Sword_IronSting.png',
      rarity: 4,
      level: 90,
      affixLevel: 1,
      typeName: 'Kiếm Đơn',
    },
    relics: {
      setName: 'Đoá Hoa Trang Viên Lạc Lối (4 món)',
      pieces: [
        { name: 'Hoa Lạc Lối', icon: 'https://enka.network/ui/UI_RelicIcon_15027_4.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Đoá Hoa Trang Viên Lạc Lối' },
        { name: 'Lông Vũ Lạc Lối', icon: 'https://enka.network/ui/UI_RelicIcon_15027_2.png', posName: 'Lông Vũ Tử Thần', rarity: 5, level: 20, setName: 'Đoá Hoa Trang Viên Lạc Lối' },
        { name: 'Cát Thời Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15027_5.png', posName: 'Cát Thời Gian', rarity: 5, level: 20, setName: 'Đoá Hoa Trang Viên Lạc Lối' },
        { name: 'Ly Không Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15027_1.png', posName: 'Ly Không Gian', rarity: 5, level: 20, setName: 'Đoá Hoa Trang Viên Lạc Lối' },
        { name: 'Nón Lý Trí', icon: 'https://enka.network/ui/UI_RelicIcon_15027_3.png', posName: 'Nón Lý Trí', rarity: 5, level: 20, setName: 'Đoá Hoa Trang Viên Lạc Lối' },
      ],
    },
  },
  sucrose: {
    weapon: {
      name: 'Mảnh Chương Tế Lễ',
      icon: 'https://enka.network/ui/UI_EquipIcon_Catalyst_Fossil.png',
      rarity: 4,
      level: 90,
      affixLevel: 5,
      typeName: 'Pháp Khí',
    },
    relics: {
      setName: 'Bóng Hình Màu Xanh (4 món)',
      pieces: [
        { name: 'Hoa Bóng Hình', icon: 'https://enka.network/ui/UI_RelicIcon_15005_4.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Bóng Hình Màu Xanh' },
        { name: 'Lông Vũ Bóng Hình', icon: 'https://enka.network/ui/UI_RelicIcon_15005_2.png', posName: 'Lông Vũ Tử Thần', rarity: 5, level: 20, setName: 'Bóng Hình Màu Xanh' },
        { name: 'Cát Thời Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15005_5.png', posName: 'Cát Thời Gian', rarity: 5, level: 20, setName: 'Bóng Hình Màu Xanh' },
        { name: 'Ly Không Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15005_1.png', posName: 'Ly Không Gian', rarity: 5, level: 20, setName: 'Bóng Hình Màu Xanh' },
        { name: 'Nón Lý Trí', icon: 'https://enka.network/ui/UI_RelicIcon_15005_3.png', posName: 'Nón Lý Trí', rarity: 5, level: 20, setName: 'Bóng Hình Màu Xanh' },
      ],
    },
  },
  fischl: {
    weapon: {
      name: 'Tuyệt Huyền',
      icon: 'https://enka.network/ui/UI_EquipIcon_Bow_Troupe.png',
      rarity: 4,
      level: 90,
      affixLevel: 5,
      typeName: 'Cung',
    },
    relics: {
      setName: 'Đoàn Kịch Hoàng Kim (4 món)',
      pieces: [
        { name: 'Hoa Đoàn Kịch', icon: 'https://enka.network/ui/UI_RelicIcon_15033_4.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Đoàn Kịch Hoàng Kim' },
        { name: 'Lông Vũ Đoàn Kịch', icon: 'https://enka.network/ui/UI_RelicIcon_15033_2.png', posName: 'Lông Vũ Tử Thần', rarity: 5, level: 20, setName: 'Đoàn Kịch Hoàng Kim' },
        { name: 'Cát Thời Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15033_5.png', posName: 'Cát Thời Gian', rarity: 5, level: 20, setName: 'Đoàn Kịch Hoàng Kim' },
        { name: 'Ly Không Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15033_1.png', posName: 'Ly Không Gian', rarity: 5, level: 20, setName: 'Đoàn Kịch Hoàng Kim' },
        { name: 'Nón Lý Trí', icon: 'https://enka.network/ui/UI_RelicIcon_15033_3.png', posName: 'Nón Lý Trí', rarity: 5, level: 20, setName: 'Đoàn Kịch Hoàng Kim' },
      ],
    },
  },
  arlecchino: {
    weapon: {
      name: 'Xích Nguyệt Liêm',
      icon: 'https://enka.network/ui/UI_EquipIcon_Pole_BloodMoon.png',
      rarity: 5,
      level: 90,
      affixLevel: 1,
      typeName: 'Vũ Khí Cán Dài',
    },
    relics: {
      setName: 'Mảnh Hài Hòa Hư Ảo (4 món)',
      pieces: [
        { name: 'Hoa Hài Hòa', icon: 'https://enka.network/ui/UI_RelicIcon_15035_4.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Mảnh Hài Hòa Hư Ảo' },
        { name: 'Lông Vũ Hài Hòa', icon: 'https://enka.network/ui/UI_RelicIcon_15035_2.png', posName: 'Lông Vũ Tử Thần', rarity: 5, level: 20, setName: 'Mảnh Hài Hòa Hư Ảo' },
        { name: 'Cát Thời Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15035_5.png', posName: 'Cát Thời Gian', rarity: 5, level: 20, setName: 'Mảnh Hài Hòa Hư Ảo' },
        { name: 'Ly Không Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15035_1.png', posName: 'Ly Không Gian', rarity: 5, level: 20, setName: 'Mảnh Hài Hòa Hư Ảo' },
        { name: 'Nón Lý Trí', icon: 'https://enka.network/ui/UI_RelicIcon_15035_3.png', posName: 'Nón Lý Trí', rarity: 5, level: 20, setName: 'Mảnh Hài Hòa Hư Ảo' },
      ],
    },
  },
  nahida: {
    weapon: {
      name: 'Cõi Mộng Ngàn Đêm',
      icon: 'https://enka.network/ui/UI_EquipIcon_Catalyst_Ayus.png',
      rarity: 5,
      level: 90,
      affixLevel: 1,
      typeName: 'Pháp Khí',
    },
    relics: {
      setName: 'Ký Ức Rừng Sâu (4 món)',
      pieces: [
        { name: 'Hoa Rừng Sâu', icon: 'https://enka.network/ui/UI_RelicIcon_15025_4.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Ký Ức Rừng Sâu' },
        { name: 'Lông Vũ Rừng Sâu', icon: 'https://enka.network/ui/UI_RelicIcon_15025_2.png', posName: 'Lông Vũ Tử Thần', rarity: 5, level: 20, setName: 'Ký Ức Rừng Sâu' },
        { name: 'Cát Thời Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15025_5.png', posName: 'Cát Thời Gian', rarity: 5, level: 20, setName: 'Ký Ức Rừng Sâu' },
        { name: 'Ly Không Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15025_1.png', posName: 'Ly Không Gian', rarity: 5, level: 20, setName: 'Ký Ức Rừng Sâu' },
        { name: 'Nón Lý Trí', icon: 'https://enka.network/ui/UI_RelicIcon_15025_3.png', posName: 'Nón Lý Trí', rarity: 5, level: 20, setName: 'Ký Ức Rừng Sâu' },
      ],
    },
  },
};

/**
 * Get accurate build for any character by name or id
 */
export function getCharacterDefaultBuild(charName: string, weaponType: string): CharacterBuildInfo {
  const normalized = charName.toLowerCase().replace(/[^a-z]/g, '');

  if (CHARACTER_DEFAULT_BUILDS[normalized]) {
    return CHARACTER_DEFAULT_BUILDS[normalized];
  }

  // Fallback based on weapon type
  const typeWeaponMap: Record<string, { name: string; icon: string; typeName: string }> = {
    sword: { name: 'Tây Phong Kiếm', icon: 'https://enka.network/ui/UI_EquipIcon_Sword_Favonius.png', typeName: 'Kiếm Đơn' },
    claymore: { name: 'Đường Cùng Của Sói', icon: 'https://enka.network/ui/UI_EquipIcon_Claymore_Wolfmound.png', typeName: 'Trọng Kiếm' },
    polearm: { name: 'Thương Tây Phong', icon: 'https://enka.network/ui/UI_EquipIcon_Pole_Zephyrus.png', typeName: 'Vũ Khí Cán Dài' },
    bow: { name: 'Cung Tây Phong', icon: 'https://enka.network/ui/UI_EquipIcon_Bow_Favonius.png', typeName: 'Cung' },
    catalyst: { name: 'Mảnh Chương Tế Lễ', icon: 'https://enka.network/ui/UI_EquipIcon_Catalyst_Fossil.png', typeName: 'Pháp Khí' },
  };

  const def = typeWeaponMap[weaponType] || typeWeaponMap.sword;

  return {
    weapon: {
      name: def.name,
      icon: def.icon,
      rarity: 4,
      level: 90,
      affixLevel: 1,
      typeName: def.typeName,
    },
    relics: {
      setName: 'Bộ Thánh Di Vật Đề Cử (4 món)',
      pieces: [
        { name: 'Hoa Sự Sống', icon: 'https://enka.network/ui/UI_RelicIcon_15020_4.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
        { name: 'Lông Vũ Tử Thần', icon: 'https://enka.network/ui/UI_RelicIcon_15020_2.png', posName: 'Lông Vũ Tử Thần', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
        { name: 'Cát Thời Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15020_5.png', posName: 'Cát Thời Gian', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
        { name: 'Ly Không Gian', icon: 'https://enka.network/ui/UI_RelicIcon_15020_1.png', posName: 'Ly Không Gian', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
        { name: 'Nón Lý Trí', icon: 'https://enka.network/ui/UI_RelicIcon_15020_3.png', posName: 'Nón Lý Trí', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở' },
      ],
    },
  };
}
