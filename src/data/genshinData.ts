import type { CharacterPreset, WeaponPreset, ElementType, UserCharacter } from '../types';
import { COMPREHENSIVE_WEAPONS } from './weaponsData';

export const ELEMENT_COLORS: Record<ElementType, { bg: string; text: string; border: string; glow: string }> = {
  pyro: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', glow: 'shadow-red-500/20' },
  hydro: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
  anemo: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  electro: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
  dendro: { bg: 'bg-lime-500/10', text: 'text-lime-400', border: 'border-lime-500/30', glow: 'shadow-lime-500/20' },
  cryo: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/20' },
  geo: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
};

export const ELEMENT_NAMES_VI: Record<ElementType, string> = {
  pyro: 'Hỏa',
  hydro: 'Thủy',
  anemo: 'Phong',
  electro: 'Lôi',
  dendro: 'Thảo',
  cryo: 'Băng',
  geo: 'Nham',
};

export const DAY_NAMES: Record<number, string> = {
  0: 'Chủ Nhật (Mở tất cả)',
  1: 'Thứ Hai',
  2: 'Thứ Ba',
  3: 'Thứ Tư',
  4: 'Thứ Năm',
  5: 'Thứ Sáu',
  6: 'Thứ Bảy',
};

// Sách Thiên Phú theo lịch (0: Chủ Nhật - mở hết)
// Nhóm 1: Thứ 2 - Thứ 5 - Chủ Nhật [1, 4, 0]
// Nhóm 2: Thứ 3 - Thứ 6 - Chủ Nhật [2, 5, 0]
// Nhóm 3: Thứ 4 - Thứ 7 - Chủ Nhật [3, 6, 0]

export const CHARACTERS_DATA: CharacterPreset[] = [
  {
    "name": "Aether",
    "nameVi": "Aether",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Triết Học Của \"Tự Do\"",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Nguyên Liệu Boss Tuần",
    "worldBossMat": "Kim Cương Bạc Vụn",
    "localSpecialty": "Cúc Cánh Gió",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_PlayerBoy.png"
  },
  {
    "name": "Albedo",
    "nameVi": "Albedo",
    "element": "geo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Thôn Thiên Kình - Sừng",
    "worldBossMat": "Tháp Huyền Nham",
    "localSpecialty": "Hoa Cecilia",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Albedo.png"
  },
  {
    "name": "Alhaitham",
    "nameVi": "Alhaitham",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Gương Mushin",
    "worldBossMat": "Nhụy Hoa Sỏi Cát",
    "localSpecialty": "Nhộng Cát",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Alhatham.png"
  },
  {
    "name": "Aloy",
    "nameVi": "Aloy",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Thời Khắc Tan Chảy",
    "worldBossMat": "Tinh Hoa Ngưng Kết",
    "localSpecialty": "Tủy Pha Lê",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Aloy.png"
  },
  {
    "name": "Arataki Itto",
    "nameVi": "Arataki Itto",
    "element": "geo",
    "rarity": 5,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Trái Tim Tro Bụi",
    "worldBossMat": "Sừng Vua Quái Cảnh",
    "localSpecialty": "Onikabuto",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Itto.png"
  },
  {
    "name": "Arlecchino",
    "nameVi": "Arlecchino",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Ngọn Nến Lửa Tàn",
    "worldBossMat": "Mảnh Giai Điệu Vàng",
    "localSpecialty": "Tường Vi Cầu Vồng",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Arlecchino.png"
  },
  {
    "name": "Baizhu",
    "nameVi": "Baizhu",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Dương Xỉ Đất Trời",
    "worldBossMat": "Vòng Tròn U Tối",
    "localSpecialty": "Túi Lưu Ly",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Baizhuer.png"
  },
  {
    "name": "Chasca",
    "nameVi": "Chasca",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lông Vũ Tơ Lụa",
    "worldBossMat": "Ánh Nhìn Trói Buộc",
    "localSpecialty": "Lá Khô Tử Anh",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Chasca.png"
  },
  {
    "name": "Chiori",
    "nameVi": "Chiori",
    "element": "geo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Sợi Không Ánh Sáng",
    "worldBossMat": "Linh Kiện Dây Cót - Coppelia",
    "localSpecialty": "Hoa Lan Máu",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Chiori.png"
  },
  {
    "name": "Citlali",
    "nameVi": "Citlali",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Phủ Định Và Phán Quyết",
    "worldBossMat": "Bùa Hộ Mệnh Của Vùng Đất Bí Ẩn",
    "localSpecialty": "Quả Quenepa",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Citlali.png"
  },
  {
    "name": "Clorinde",
    "nameVi": "Clorinde",
    "element": "electro",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Hổ Phách Vĩnh Hằng",
    "worldBossMat": "Sừng Kỳ Lân Biển Sâu",
    "localSpecialty": "Lumitoile",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Clorinde.png"
  },
  {
    "name": "Columbina",
    "nameVi": "Columbina",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mặt Nạ Của Hiền Y",
    "worldBossMat": "Sừng Sáng Lấp Lánh",
    "localSpecialty": "Cỏ Đông Lăng",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Columbina.png"
  },
  {
    "name": "Cyno",
    "nameVi": "Cyno",
    "element": "electro",
    "rarity": 5,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Thủ Ấn Hung Tướng",
    "worldBossMat": "Hạt Tụ Sấm",
    "localSpecialty": "Bọ Thánh Kim",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Cyno.png"
  },
  {
    "name": "Dehya",
    "nameVi": "Dehya",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Dây Tơ Con Rối",
    "worldBossMat": "Khối Tứ Diện Dẫn Sáng",
    "localSpecialty": "Nhộng Cát",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Dehya.png"
  },
  {
    "name": "Diluc",
    "nameVi": "Diluc",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lông Vũ Đông Phong",
    "worldBossMat": "Ngọn Lửa Vĩnh Hằng",
    "localSpecialty": "Tiểu Đăng Thảo",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Diluc.png"
  },
  {
    "name": "Durin",
    "nameVi": "Durin",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lửa Mặt Trời Ăn Mòn",
    "worldBossMat": "Lõi Kuuvahki Quân Dụng Tuần Hoàn",
    "localSpecialty": "Hoa Đèn Lạnh",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Durin.png"
  },
  {
    "name": "Emilie",
    "nameVi": "Emilie",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lông Vũ Tơ Lụa",
    "worldBossMat": "Mảnh Giai Điệu Vàng",
    "localSpecialty": "Lily Ánh Sáng Hồ Nước",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Emilie.png"
  },
  {
    "name": "Escoffier",
    "nameVi": "Escoffier",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Sừng Ăn Mòn",
    "worldBossMat": "Bộ Tụ Khí Bí Ẩn",
    "localSpecialty": "Ốc Beryl",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Escoffier.png"
  },
  {
    "name": "Eula",
    "nameVi": "Eula",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Vương Miện Vua Rồng",
    "worldBossMat": "Tinh Hoa Ngưng Kết",
    "localSpecialty": "Hạt Bồ Công Anh",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Eula.png"
  },
  {
    "name": "Flins",
    "nameVi": "Flins",
    "element": "electro",
    "rarity": 5,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mẫu Vật Thăng Thần: Hậu",
    "worldBossMat": "Khuôn Mẫu Kuuvahki Tinh Vi",
    "localSpecialty": "Hoa Đèn Lạnh",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Flins.png"
  },
  {
    "name": "Furina",
    "nameVi": "Furina",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Khối Không Ánh Sáng",
    "worldBossMat": "Nước Chưa Đạt Mức Siêu Việt",
    "localSpecialty": "Lily Ánh Sáng Hồ Nước",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Furina.png"
  },
  {
    "name": "Ganyu",
    "nameVi": "Ganyu",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Linh Hồn Võ Luyện - Cô Độc",
    "worldBossMat": "Hạt Nhân Cực Hàn",
    "localSpecialty": "Thanh Tâm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ganyu.png"
  },
  {
    "name": "Hu Tao",
    "nameVi": "Hu Tao",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Đao Ma Vương - Mảnh Vỡ",
    "worldBossMat": "Ngọc Chưa Chín",
    "localSpecialty": "Hoa Nghê Thường",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Hutao.png"
  },
  {
    "name": "Ineffa",
    "nameVi": "Ineffa",
    "element": "electro",
    "rarity": 5,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lửa Mặt Trời Ăn Mòn",
    "worldBossMat": "Bộ Tụ Khí Bí Ẩn",
    "localSpecialty": "Nấm Sừng Phát Sáng",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ineffa.png"
  },
  {
    "name": "Jean",
    "nameVi": "Jean",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lông Vũ Đông Phong",
    "worldBossMat": "Hạt Giống Bão",
    "localSpecialty": "Hạt Bồ Công Anh",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Qin.png"
  },
  {
    "name": "Kaedehara Kazuha",
    "nameVi": "Kaedehara Kazuha",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Vảy Vàng",
    "worldBossMat": "Lõi Marionette",
    "localSpecialty": "Hải Linh Chi",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Kazuha.png"
  },
  {
    "name": "Kamisato Ayaka",
    "nameVi": "Kamisato Ayaka",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Nhánh Huyết Ngọc",
    "worldBossMat": "Lõi Động Cơ Vĩnh Cửu",
    "localSpecialty": "Tú Cầu Anh Đào",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ayaka.png"
  },
  {
    "name": "Kamisato Ayato",
    "nameVi": "Kamisato Ayato",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Thủ Ấn Hung Tướng",
    "worldBossMat": "Giọt Nước Bài Trừ",
    "localSpecialty": "Tú Cầu Anh Đào",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ayato.png"
  },
  {
    "name": "Wanderer",
    "nameVi": "Kẻ Lang Thang",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Chuông Daka",
    "worldBossMat": "Lõi Chuyển Động Vĩnh Viễn",
    "localSpecialty": "Nấm Thánh Rukkhashava",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Wanderer.png"
  },
  {
    "name": "Keqing",
    "nameVi": "Keqing",
    "element": "electro",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Móng Vuốt Bắc Phong",
    "worldBossMat": "Lăng Kính Sấm Sét",
    "localSpecialty": "Thạch Phách",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Keqing.png"
  },
  {
    "name": "Kinich",
    "nameVi": "Kinich",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Phủ Định Và Phán Quyết",
    "worldBossMat": "Lựu Lửa Quá Chín",
    "localSpecialty": "Sen Đá Saurian",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Kinich.png"
  },
  {
    "name": "Klee",
    "nameVi": "Klee",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Móng Vuốt Bắc Phong",
    "worldBossMat": "Ngọn Lửa Vĩnh Hằng",
    "localSpecialty": "Nấm Rơm Gió",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Klee.png"
  },
  {
    "name": "Lauma",
    "nameVi": "Lauma",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lông Vảy Ăn Mòn",
    "worldBossMat": "Lông Vảy Lấp Lánh",
    "localSpecialty": "Bạc Ánh Trăng",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Lauma.png"
  },
  {
    "name": "Linnea",
    "nameVi": "Linnea",
    "element": "geo",
    "rarity": 5,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lọ Thuốc Của Dị Đoan",
    "worldBossMat": "Lông Vũ Sa Ngã",
    "localSpecialty": "Không Vũ Điệp",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Linnea.png"
  },
  {
    "name": "Lohen",
    "nameVi": "Lohen",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mẫu Vật Thăng Thần: Mã",
    "worldBossMat": "Đuôi Đứt Của Thằn Lằn",
    "localSpecialty": "Không Vũ Điệp",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Lohen.png"
  },
  {
    "name": "Lumine",
    "nameVi": "Lumine",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Triết Học Của \"Tự Do\"",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Nguyên Liệu Boss Tuần",
    "worldBossMat": "Kim Cương Bạc Vụn",
    "localSpecialty": "Cúc Cánh Gió",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_PlayerGirl.png"
  },
  {
    "name": "Lyney",
    "nameVi": "Lyney",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Hoa Tươi Ban Sơ",
    "worldBossMat": "Phán Quyết Của Đế Vương",
    "localSpecialty": "Tường Vi Cầu Vồng",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Liney.png"
  },
  {
    "name": "Mavuika",
    "nameVi": "Mavuika",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Sừng Ăn Mòn",
    "worldBossMat": "Lõi Nguồn Khắc Hoa Văn Kỳ Bí",
    "localSpecialty": "Lá Khô Tử Anh",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Mavuika.png"
  },
  {
    "name": "Mona",
    "nameVi": "Mona",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Móng Vuốt Bắc Phong",
    "worldBossMat": "Trái Tim Thuần Khiết",
    "localSpecialty": "Nấm Rơm Gió",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Mona.png"
  },
  {
    "name": "Mualani",
    "nameVi": "Mualani",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Khối Không Ánh Sáng",
    "worldBossMat": "Ấn Chúc Phúc Ràng Buộc",
    "localSpecialty": "Mang Bọt Biển",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Mualani.png"
  },
  {
    "name": "Nahida",
    "nameVi": "Nahida",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Dây Tơ Con Rối",
    "worldBossMat": "Dây Leo Chế Ngự",
    "localSpecialty": "Sen Kalpalata",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Nahida.png"
  },
  {
    "name": "Navia",
    "nameVi": "Navia",
    "element": "geo",
    "rarity": 5,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Sợi Không Ánh Sáng",
    "worldBossMat": "Linh Kiện Dây Cót - Coppelius",
    "localSpecialty": "Giọt Sương Ban Sớm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Navia.png"
  },
  {
    "name": "Nefer",
    "nameVi": "Nefer",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mẫu Vật Thăng Thần: Xe",
    "worldBossMat": "Sừng Sáng Lấp Lánh",
    "localSpecialty": "Bạc Ánh Trăng",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Nefer.png"
  },
  {
    "name": "Neuvillette",
    "nameVi": "Neuvillette",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Hổ Phách Vĩnh Hằng",
    "worldBossMat": "Sừng Kỳ Lân Biển Sâu",
    "localSpecialty": "Lumitoile",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Neuvillette.png"
  },
  {
    "name": "Nicole",
    "nameVi": "Nicole",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Nhựa Cây Giả Tạo",
    "worldBossMat": "Xác Cánh Ác Mộng",
    "localSpecialty": "Thông Hổ Phách",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Nicole.png"
  },
  {
    "name": "Nilou",
    "nameVi": "Nilou",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Nước Mắt Tai Ương",
    "worldBossMat": "Lõi Chuyển Động Vĩnh Viễn",
    "localSpecialty": "Padisarah",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Nilou.png"
  },
  {
    "name": "Odette",
    "nameVi": "Odette",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Cành Khô Vặn Xoắn",
    "worldBossMat": "Cành Hoa Bất Diệt Trong Lửa",
    "localSpecialty": "Hoa Sương Tiên",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Odette.png"
  },
  {
    "name": "Qiqi",
    "nameVi": "Qiqi",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lông Vũ Bắc Phong",
    "worldBossMat": "Hạt Nhân Cực Hàn",
    "localSpecialty": "Túi Lưu Ly",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Qiqi.png"
  },
  {
    "name": "Raiden Shogun",
    "nameVi": "Raiden Shogun",
    "element": "electro",
    "rarity": 5,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Thời Khắc Tan Chảy",
    "worldBossMat": "Ngọc Sấm Sét",
    "localSpecialty": "Quả Amakumo",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Shougun.png"
  },
  {
    "name": "Sandrone",
    "nameVi": "Sandrone",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Trói Buộc Của Kẻ Điên",
    "worldBossMat": "Lông Vũ Sa Ngã",
    "localSpecialty": "Đơn Vị Thăm Dò Phụ Trợ",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_MarionetteNew.png"
  },
  {
    "name": "Sangonomiya Kokomi",
    "nameVi": "Sangonomiya Kokomi",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Bướm Hỏa Ngục",
    "worldBossMat": "Giọt Nước Bài Trừ",
    "localSpecialty": "Trân Châu San Hô",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Kokomi.png"
  },
  {
    "name": "Shenhe",
    "nameVi": "Shenhe",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Bướm Hỏa Ngục",
    "worldBossMat": "Vảy Giả Tộc Rồng",
    "localSpecialty": "Thanh Tâm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Shenhe.png"
  },
  {
    "name": "Sigewinne",
    "nameVi": "Sigewinne",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mắt Xoáy Không Ánh Sáng",
    "worldBossMat": "Nước Chưa Đạt Mức Siêu Việt",
    "localSpecialty": "Hoa Romaritime",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Sigewinne.png"
  },
  {
    "name": "Skirk",
    "nameVi": "Skirk",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mẫu Vật Thăng Thần: Mã",
    "worldBossMat": "Ánh Nhìn Trói Buộc",
    "localSpecialty": "Lá Rạn Vân Đá",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_SkirkNew.png"
  },
  {
    "name": "Tartaglia",
    "nameVi": "Tartaglia",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Đao Ma Vương - Mảnh Vỡ",
    "worldBossMat": "Trái Tim Thuần Khiết",
    "localSpecialty": "Ốc Sao",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Tartaglia.png"
  },
  {
    "name": "Tighnari",
    "nameVi": "Tighnari",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Chân Ý Vạn Kiếp",
    "worldBossMat": "Mỏ Vua Nấm",
    "localSpecialty": "Sen Nilotpala",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Tighnari.png"
  },
  {
    "name": "Varesa",
    "nameVi": "Varesa",
    "element": "electro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lông Vảy Ăn Mòn",
    "worldBossMat": "Lõi Tượng Rồng Vô Tri",
    "localSpecialty": "Lá Rạn Vân Đá",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Varesa.png"
  },
  {
    "name": "Varka",
    "nameVi": "Varka",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mẫu Vật Thăng Thần: Xe",
    "worldBossMat": "Đuôi Đứt Của Thằn Lằn",
    "localSpecialty": "Quả Móc Câu",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Varka.png"
  },
  {
    "name": "Venti",
    "nameVi": "Venti",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lông Vũ Bắc Phong",
    "worldBossMat": "Hạt Giống Bão",
    "localSpecialty": "Hoa Cecilia",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Venti.png"
  },
  {
    "name": "Vesna",
    "nameVi": "Vesna",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Chồi Non Báng Bổ",
    "worldBossMat": "Giáp Nứt Của Kẻ Lang Thang",
    "localSpecialty": "Dương Xỉ Vàng",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Vesna.png"
  },
  {
    "name": "Vodyanitsa",
    "nameVi": "Vodyanitsa",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Trói Buộc Của Kẻ Điên",
    "worldBossMat": "Cành Hoa Bất Diệt Trong Lửa",
    "localSpecialty": "Hoa Sương Tiên",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Vodyanitsa.png"
  },
  {
    "name": "Wriothesley",
    "nameVi": "Wriothesley",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Hoa Tươi Ban Sơ",
    "worldBossMat": "\"Thiết Bị Tourbillon\"",
    "localSpecialty": "Đơn Vị Thăm Dò Phụ Trợ",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Wriothesley.png"
  },
  {
    "name": "Xianyun",
    "nameVi": "Xianyun",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mắt Xoáy Không Ánh Sáng",
    "worldBossMat": "Vảy Giáp Tụ Mây",
    "localSpecialty": "Ngọc Thanh Thủy",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Liuyun.png"
  },
  {
    "name": "Xiao",
    "nameVi": "Xiao",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Linh Hồn Võ Luyện - Cô Độc",
    "worldBossMat": "Ngọc Chưa Chín",
    "localSpecialty": "Thanh Tâm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Xiao.png"
  },
  {
    "name": "Xilonen",
    "nameVi": "Xilonen",
    "element": "geo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Gương Mushin",
    "worldBossMat": "Lõi Nguồn Khắc Hoa Văn Kỳ Bí",
    "localSpecialty": "Cúc Rực Rỡ",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Xilonen.png"
  },
  {
    "name": "Yae Miko",
    "nameVi": "Yae Miko",
    "element": "electro",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Chân Ý Vạn Kiếp",
    "worldBossMat": "Vảy Giả Tộc Rồng",
    "localSpecialty": "Hải Linh Chi",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Yae.png"
  },
  {
    "name": "Yelan",
    "nameVi": "Yelan",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Vảy Vàng",
    "worldBossMat": "Bánh Răng Ấn Ký",
    "localSpecialty": "Ốc Sao",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Yelan.png"
  },
  {
    "name": "Yoimiya",
    "nameVi": "Yoimiya",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Vương Miện Vua Rồng",
    "worldBossMat": "Ngọc Lửa Âm Ỉ",
    "localSpecialty": "Cỏ Naku",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Yoimiya.png"
  },
  {
    "name": "Yumemizuki Mizuki",
    "nameVi": "Yumemizuki Mizuki",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Ngọn Nến Lửa Tàn",
    "worldBossMat": "Bùa Hộ Mệnh Của Vùng Đất Bí Ẩn",
    "localSpecialty": "Hải Linh Chi",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Mizuki.png"
  },
  {
    "name": "Zhongli",
    "nameVi": "Zhongli",
    "element": "geo",
    "rarity": 5,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Thôn Thiên Kình - Sừng",
    "worldBossMat": "Tháp Huyền Nham",
    "localSpecialty": "Thạch Phách",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Zhongli.png"
  },
  {
    "name": "Zibai",
    "nameVi": "Zibai",
    "element": "geo",
    "rarity": 5,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mẫu Vật Thăng Thần: Hậu",
    "worldBossMat": "Xác Cánh Ác Mộng",
    "localSpecialty": "Bách Hợp Lưu Ly",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Zibai.png"
  },
  {
    "name": "Aino",
    "nameVi": "Aino",
    "element": "hydro",
    "rarity": 4,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lông Vũ Tơ Lụa",
    "worldBossMat": "Khuôn Mẫu Kuuvahki Tinh Vi",
    "localSpecialty": "Vòng Bi Di Động",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Aino.png"
  },
  {
    "name": "Alyosha",
    "nameVi": "Alyosha",
    "element": "electro",
    "rarity": 4,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lọ Thuốc Của Dị Đoan",
    "worldBossMat": "Đuôi Đứt Của Sinh Vật Bay",
    "localSpecialty": "Cỏ Nhung",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Alyosha.png"
  },
  {
    "name": "Amber",
    "nameVi": "Amber",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Hơi Thở Đông Phong",
    "worldBossMat": "Ngọn Lửa Vĩnh Hằng",
    "localSpecialty": "Tiểu Đăng Thảo",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ambor.png"
  },
  {
    "name": "Barbara",
    "nameVi": "Barbara",
    "element": "hydro",
    "rarity": 4,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Móng Vuốt Bắc Phong",
    "worldBossMat": "Trái Tim Thuần Khiết",
    "localSpecialty": "Nấm Rơm Gió",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Barbara.png"
  },
  {
    "name": "Beidou",
    "nameVi": "Beidou",
    "element": "electro",
    "rarity": 4,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Hơi Thở Đông Phong",
    "worldBossMat": "Lăng Kính Sấm Sét",
    "localSpecialty": "Dạ Phách Thạch",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Beidou.png"
  },
  {
    "name": "Bennett",
    "nameVi": "Bennett",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lông Vũ Đông Phong",
    "worldBossMat": "Ngọn Lửa Vĩnh Hằng",
    "localSpecialty": "Cúc Cánh Quạt",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Bennett.png"
  },
  {
    "name": "Candace",
    "nameVi": "Candace",
    "element": "hydro",
    "rarity": 4,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Nước Mắt Tai Ương",
    "worldBossMat": "Khối Tứ Diện Dẫn Sáng",
    "localSpecialty": "Quả Xích Niệm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Candace.png"
  },
  {
    "name": "Charlotte",
    "nameVi": "Charlotte",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Sợi Không Ánh Sáng",
    "worldBossMat": "\"Thiết Bị Tourbillon\"",
    "localSpecialty": "Ốc Beryl",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Charlotte.png"
  },
  {
    "name": "Chevreuse",
    "nameVi": "Chevreuse",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mắt Xoáy Không Ánh Sáng",
    "worldBossMat": "Sừng Kỳ Lân Biển Sâu",
    "localSpecialty": "Hoa Lumidouce",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Chevreuse.png"
  },
  {
    "name": "Chongyun",
    "nameVi": "Chongyun",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Hơi Thở Đông Phong",
    "worldBossMat": "Hạt Nhân Cực Hàn",
    "localSpecialty": "Thạch Phách",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Chongyun.png"
  },
  {
    "name": "Collei",
    "nameVi": "Collei",
    "element": "dendro",
    "rarity": 4,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Nước Mắt Tai Ương",
    "worldBossMat": "Mỏ Vua Nấm",
    "localSpecialty": "Nấm Thánh Rukkhashava",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Collei.png"
  },
  {
    "name": "Dahlia",
    "nameVi": "Dahlia",
    "element": "hydro",
    "rarity": 4,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lông Vảy Ăn Mòn",
    "worldBossMat": "Bộ Tụ Khí Bí Ẩn",
    "localSpecialty": "Hoa Calla Lily",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Dahlia.png"
  },
  {
    "name": "Diona",
    "nameVi": "Diona",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Đao Ma Vương - Mảnh Vỡ",
    "worldBossMat": "Hạt Nhân Cực Hàn",
    "localSpecialty": "Hoa Calla Lily",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Diona.png"
  },
  {
    "name": "Dori",
    "nameVi": "Dori",
    "element": "electro",
    "rarity": 4,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Nhánh Huyết Ngọc",
    "worldBossMat": "Hạt Tụ Sấm",
    "localSpecialty": "Sen Kalpalata",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Dori.png"
  },
  {
    "name": "Faruzan",
    "nameVi": "Faruzan",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Dây Tơ Con Rối",
    "worldBossMat": "Khối Tứ Diện Dẫn Sáng",
    "localSpecialty": "Quả Xích Niệm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Faruzan.png"
  },
  {
    "name": "Fischl",
    "nameVi": "Fischl",
    "element": "electro",
    "rarity": 4,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Linh Hồn Bắc Phong",
    "worldBossMat": "Lăng Kính Sấm Sét",
    "localSpecialty": "Tiểu Đăng Thảo",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Fischl.png"
  },
  {
    "name": "Freminet",
    "nameVi": "Freminet",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Dương Xỉ Đất Trời",
    "worldBossMat": "Linh Kiện Dây Cót - Coppelius",
    "localSpecialty": "Hoa Romaritime",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Freminet.png"
  },
  {
    "name": "Gaming",
    "nameVi": "Gaming",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Khối Không Ánh Sáng",
    "worldBossMat": "Phán Quyết Của Đế Vương",
    "localSpecialty": "Ốc Sao",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Gaming.png"
  },
  {
    "name": "Gorou",
    "nameVi": "Gorou",
    "element": "geo",
    "rarity": 4,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Thời Khắc Tan Chảy",
    "worldBossMat": "Lõi Động Cơ Vĩnh Cửu",
    "localSpecialty": "Trân Châu San Hô",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Gorou.png"
  },
  {
    "name": "Iansan",
    "nameVi": "Iansan",
    "element": "electro",
    "rarity": 4,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Phủ Định Và Phán Quyết",
    "worldBossMat": "Ánh Nhìn Trói Buộc",
    "localSpecialty": "Lưu Lân Thạch",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Iansan.png"
  },
  {
    "name": "Ifa",
    "nameVi": "Ifa",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mẫu Vật Thăng Thần: Xe",
    "worldBossMat": "Lõi Tượng Rồng Vô Tri",
    "localSpecialty": "Sen Đá Saurian",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ifa.png"
  },
  {
    "name": "Illuga",
    "nameVi": "Illuga",
    "element": "geo",
    "rarity": 4,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Sừng Ăn Mòn",
    "worldBossMat": "Lõi Kuuvahki Quân Dụng Tuần Hoàn",
    "localSpecialty": "Thông Hổ Phách",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Illuga.png"
  },
  {
    "name": "Jahoda",
    "nameVi": "Jahoda",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mẫu Vật Thăng Thần: Mã",
    "worldBossMat": "Lông Vảy Lấp Lánh",
    "localSpecialty": "Vòng Bi Di Động",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Jahoda.png"
  },
  {
    "name": "Kachina",
    "nameVi": "Kachina",
    "element": "geo",
    "rarity": 4,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Ngọn Nến Lửa Tàn",
    "worldBossMat": "Lựu Lửa Quá Chín",
    "localSpecialty": "Quả Quenepa",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Kachina.png"
  },
  {
    "name": "Kaeya",
    "nameVi": "Kaeya",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Linh Hồn Bắc Phong",
    "worldBossMat": "Hạt Nhân Cực Hàn",
    "localSpecialty": "Hoa Calla Lily",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Kaeya.png"
  },
  {
    "name": "Kaveh",
    "nameVi": "Kaveh",
    "element": "dendro",
    "rarity": 4,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Hoa Tươi Ban Sơ",
    "worldBossMat": "Dây Leo Chế Ngự",
    "localSpecialty": "Hoa Tang Thương",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Kaveh.png"
  },
  {
    "name": "Kirara",
    "nameVi": "Kirara",
    "element": "dendro",
    "rarity": 4,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Hổ Phách Vĩnh Hằng",
    "worldBossMat": "Vòng Tròn U Tối",
    "localSpecialty": "Quả Amakumo",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Momoka.png"
  },
  {
    "name": "Kujou Sara",
    "nameVi": "Kujou Sara",
    "element": "electro",
    "rarity": 4,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Trái Tim Tro Bụi",
    "worldBossMat": "Ngọc Sấm Sét",
    "localSpecialty": "Hoa Lan Máu",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Sara.png"
  },
  {
    "name": "Kuki Shinobu",
    "nameVi": "Kuki Shinobu",
    "element": "electro",
    "rarity": 4,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Nước Mắt Tai Ương",
    "worldBossMat": "Bánh Răng Ấn Ký",
    "localSpecialty": "Cỏ Naku",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Shinobu.png"
  },
  {
    "name": "Lan Yan",
    "nameVi": "Lan Yan",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lửa Mặt Trời Ăn Mòn",
    "worldBossMat": "Lõi Nguồn Khắc Hoa Văn Kỳ Bí",
    "localSpecialty": "Ngọc Thanh Thủy",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Lanyan.png"
  },
  {
    "name": "Layla",
    "nameVi": "Layla",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Gương Mushin",
    "worldBossMat": "Lõi Chuyển Động Vĩnh Viễn",
    "localSpecialty": "Sen Nilotpala",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Layla.png"
  },
  {
    "name": "Lisa",
    "nameVi": "Lisa",
    "element": "electro",
    "rarity": 4,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Móng Vuốt Đông Phong",
    "worldBossMat": "Lăng Kính Sấm Sét",
    "localSpecialty": "Quả Dâu Đỏ",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Lisa.png"
  },
  {
    "name": "Lynette",
    "nameVi": "Lynette",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Hổ Phách Vĩnh Hằng",
    "worldBossMat": "Linh Kiện Dây Cót - Coppelia",
    "localSpecialty": "Hoa Lumidouce",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Linette.png"
  },
  {
    "name": "Mika",
    "nameVi": "Mika",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Gương Mushin",
    "worldBossMat": "Nhụy Hoa Sỏi Cát",
    "localSpecialty": "Quả Móc Câu",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Mika.png"
  },
  {
    "name": "Ningguang",
    "nameVi": "Ningguang",
    "element": "geo",
    "rarity": 4,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Linh Hồn Bắc Phong",
    "worldBossMat": "Tháp Huyền Nham",
    "localSpecialty": "Bách Hợp Lưu Ly",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ningguang.png"
  },
  {
    "name": "Noelle",
    "nameVi": "Noelle",
    "element": "geo",
    "rarity": 4,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Móng Vuốt Đông Phong",
    "worldBossMat": "Tháp Huyền Nham",
    "localSpecialty": "Quả Dâu Đỏ",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Noel.png"
  },
  {
    "name": "Ororon",
    "nameVi": "Ororon",
    "element": "electro",
    "rarity": 4,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Sợi Không Ánh Sáng",
    "worldBossMat": "Ấn Chúc Phúc Ràng Buộc",
    "localSpecialty": "Nấm Sừng Phát Sáng",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Olorun.png"
  },
  {
    "name": "Prune",
    "nameVi": "Prune",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Mặt Nạ Của Hiền Y",
    "worldBossMat": "Sừng Sáng Lấp Lánh",
    "localSpecialty": "Cỏ Đông Lăng",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Prune.png"
  },
  {
    "name": "Razor",
    "nameVi": "Razor",
    "element": "electro",
    "rarity": 4,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Móng Vuốt Đông Phong",
    "worldBossMat": "Lăng Kính Sấm Sét",
    "localSpecialty": "Quả Móc Câu",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Razor.png"
  },
  {
    "name": "Rosaria",
    "nameVi": "Rosaria",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Linh Hồn Võ Luyện - Cô Độc",
    "worldBossMat": "Hạt Nhân Cực Hàn",
    "localSpecialty": "Quả Dâu Đỏ",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Rosaria.png"
  },
  {
    "name": "Sayu",
    "nameVi": "Sayu",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Vảy Vàng",
    "worldBossMat": "Lõi Marionette",
    "localSpecialty": "Tủy Pha Lê",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Sayu.png"
  },
  {
    "name": "Sethos",
    "nameVi": "Sethos",
    "element": "electro",
    "rarity": 4,
    "weaponType": "bow",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Chuông Daka",
    "worldBossMat": "Vảy Giáp Tụ Mây",
    "localSpecialty": "Trishiraite",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Sethos.png"
  },
  {
    "name": "Shikanoin Heizou",
    "nameVi": "Shikanoin Heizou",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Chân Ý Vạn Kiếp",
    "worldBossMat": "Bánh Răng Ấn Ký",
    "localSpecialty": "Onikabuto",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Heizo.png"
  },
  {
    "name": "Sucrose",
    "nameVi": "Sucrose",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Linh Hồn Bắc Phong",
    "worldBossMat": "Hạt Giống Bão",
    "localSpecialty": "Cúc Cánh Quạt",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Sucrose.png"
  },
  {
    "name": "Thoma",
    "nameVi": "Thoma",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Bướm Hỏa Ngục",
    "worldBossMat": "Ngọc Lửa Âm Ỉ",
    "localSpecialty": "Nấm U Ám",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Tohma.png"
  },
  {
    "name": "Xiangling",
    "nameVi": "Xiangling",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Móng Vuốt Đông Phong",
    "worldBossMat": "Ngọn Lửa Vĩnh Hằng",
    "localSpecialty": "Ớt Tuyệt Vân",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Xiangling.png"
  },
  {
    "name": "Xingqiu",
    "nameVi": "Xingqiu",
    "element": "hydro",
    "rarity": 4,
    "weaponType": "sword",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Lông Vũ Bắc Phong",
    "worldBossMat": "Trái Tim Thuần Khiết",
    "localSpecialty": "Hoa Nghê Thường",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Xingqiu.png"
  },
  {
    "name": "Xinyan",
    "nameVi": "Xinyan",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "claymore",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Thôn Thiên Kình - Sừng",
    "worldBossMat": "Ngọn Lửa Vĩnh Hằng",
    "localSpecialty": "Túi Lưu Ly",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Xinyan.png"
  },
  {
    "name": "Yanfei",
    "nameVi": "Yanfei",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "catalyst",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Nhánh Huyết Ngọc",
    "worldBossMat": "Ngọc Chưa Chín",
    "localSpecialty": "Dạ Phách Thạch",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Feiyan.png"
  },
  {
    "name": "Yaoyao",
    "nameVi": "Yaoyao",
    "element": "dendro",
    "rarity": 4,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Chuông Daka",
    "worldBossMat": "Dây Leo Chế Ngự",
    "localSpecialty": "Ớt Tuyệt Vân",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Yaoyao.png"
  },
  {
    "name": "Yun Jin",
    "nameVi": "Yun Jin",
    "element": "geo",
    "rarity": 4,
    "weaponType": "polearm",
    "talentBook": "Mora",
    "talentDomain": "Bí Cảnh Luyện Khí",
    "talentDays": [
      1,
      4,
      0
    ],
    "weeklyBossMat": "Trái Tim Tro Bụi",
    "worldBossMat": "Sừng Vua Quái Cảnh",
    "localSpecialty": "Bách Hợp Lưu Ly",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Yunjin.png"
  }
];

export const WEAPONS_DATA: WeaponPreset[] = COMPREHENSIVE_WEAPONS;


export const USER_CHARACTERS_PRESET: UserCharacter[] = [
  {
    id: 'char-furina',
    name: 'Furina',
    nameVi: 'Furina',
    element: 'hydro',
    rarity: 5,
    icon: 'https://enka.network/ui/UI_AvatarIcon_Furina.png',
    level: 70,
    maxLevel: 90,
    constellation: 2,
    fetter: 10,
    weapon: {
      name: 'Sắc Nước Tĩnh Lặng',
      icon: 'https://enka.network/ui/UI_EquipIcon_Sword_Regalis.png',
      rarity: 5,
      level: 80,
      affixLevel: 1,
      typeName: 'Kiếm Đơn',
      materialName: 'Giọt Sương Tinh Khiết',
      domainDays: [2, 5, 0],
    },
    relics: [
      { name: 'Đoàn Kịch Hoàng Kim', icon: 'https://enka.network/ui/UI_ItemIcon_104003.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Đoàn Kịch Hoàng Kim (4 món)' },
    ],
    talents: { attack: 6, skill: 8, burst: 9 },
    talentBook: 'Công Lý (Justice)',
    talentDomain: 'Vinh Quang Nhợt Nhạt (Fontaine)',
    talentDays: [2, 5, 0],
    weeklyBossMat: 'Dây Tơ Không Ám (Cá Voi)',
    worldBossMat: 'Nước Không Thể Tan',
    localSpecialty: 'Hoa Hồ Trung Cảnh',
  },
  {
    id: 'char-raiden',
    name: 'Raiden Shogun',
    nameVi: 'Raiden Shogun',
    element: 'electro',
    rarity: 5,
    icon: 'https://enka.network/ui/UI_AvatarIcon_Shougun.png',
    level: 80,
    maxLevel: 90,
    constellation: 0,
    fetter: 10,
    weapon: {
      name: 'Đoạn Thảo Trảm Quang',
      icon: 'https://enka.network/ui/UI_EquipIcon_Pole_Narukami.png',
      rarity: 5,
      level: 90,
      affixLevel: 1,
      typeName: 'Vũ Khí Cán Dài',
      materialName: 'Mặt Nạ Hổ Phách',
      domainDays: [3, 6, 0],
    },
    relics: [
      { name: 'Dấu Ấn Ngăn Trở', icon: 'https://enka.network/ui/UI_ItemIcon_104003.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở (4 món)' },
    ],
    talents: { attack: 6, skill: 9, burst: 10 },
    talentBook: 'Ánh Sáng (Light)',
    talentDomain: 'Sân Đình Violet (Inazuma)',
    talentDays: [3, 6, 0],
    weeklyBossMat: 'Thời Khắc Tan Biến (Signora)',
    worldBossMat: 'Hạt Sen Sấm Sét',
    localSpecialty: 'Quả Amakumo',
  },
  {
    id: 'char-neuvillette',
    name: 'Neuvillette',
    nameVi: 'Neuvillette',
    element: 'hydro',
    rarity: 5,
    icon: 'https://enka.network/ui/UI_AvatarIcon_Neuvillette.png',
    level: 80,
    maxLevel: 90,
    constellation: 1,
    fetter: 10,
    weapon: {
      name: 'Dòng Chảy Giám Sát',
      icon: 'https://enka.network/ui/UI_EquipIcon_Catalyst_Iudex.png',
      rarity: 5,
      level: 90,
      affixLevel: 1,
      typeName: 'Pháp Khí',
      materialName: 'Thánh Tích Fontaine',
      domainDays: [1, 4, 0],
    },
    relics: [
      { name: 'Thợ Săn Marechaussee', icon: 'https://enka.network/ui/UI_ItemIcon_104003.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Thợ Săn Marechaussee (4 món)' },
    ],
    talents: { attack: 10, skill: 8, burst: 8 },
    talentBook: 'Công Bằng (Equity)',
    talentDomain: 'Vinh Quang Nhợt Nhạt (Fontaine)',
    talentDays: [1, 4, 0],
    weeklyBossMat: 'Thủ Hộ Của Primordial',
    worldBossMat: 'Sừng Của Dị Chủng Biển Sâu',
    localSpecialty: 'Sao Biển Vực Sâu',
  },
  {
    id: 'char-nahida',
    name: 'Nahida',
    nameVi: 'Nahida',
    element: 'dendro',
    rarity: 5,
    icon: 'https://enka.network/ui/UI_AvatarIcon_Nahida.png',
    level: 80,
    maxLevel: 90,
    constellation: 0,
    fetter: 10,
    weapon: {
      name: 'Cõi Mộng Ngàn Đêm',
      icon: 'https://enka.network/ui/UI_EquipIcon_Catalyst_Ayus.png',
      rarity: 5,
      level: 80,
      affixLevel: 1,
      typeName: 'Pháp Khí',
      materialName: 'Bùa Hộ Mệnh Rừng Xanh',
      domainDays: [1, 4, 0],
    },
    relics: [
      { name: 'Ký Ức Rừng Sâu', icon: 'https://enka.network/ui/UI_ItemIcon_104003.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Ký Ức Rừng Sâu (4 món)' },
    ],
    talents: { attack: 1, skill: 9, burst: 9 },
    talentBook: 'Khuyên Nhủ (Ingenuity)',
    talentDomain: 'Tháp Vô Danh (Sumeru)',
    talentDays: [2, 5, 0],
    weeklyBossMat: 'Dây Tơ Rối (Scaramouche)',
    worldBossMat: 'Mầm Cây Nguyên Sinh',
    localSpecialty: 'Sen Kalpalata',
  },
  {
    id: 'char-xilonen',
    name: 'Xilonen',
    nameVi: 'Xilonen',
    element: 'geo',
    rarity: 5,
    icon: 'https://enka.network/ui/UI_AvatarIcon_Xilonen.png',
    level: 70,
    maxLevel: 90,
    constellation: 0,
    fetter: 6,
    weapon: {
      name: 'Tây Phong Kiếm',
      icon: 'https://enka.network/ui/UI_EquipIcon_Sword_Zephyrus.png',
      rarity: 4,
      level: 80,
      affixLevel: 5,
      typeName: 'Kiếm Đơn',
      materialName: 'Xiềng Xích Dandelion',
      domainDays: [3, 6, 0],
    },
    relics: [
      { name: 'Dũng Sĩ Hỏa Diệm', icon: 'https://enka.network/ui/UI_ItemIcon_104003.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Bí Cảnh Dũng Sĩ Natlan' },
    ],
    talents: { attack: 1, skill: 8, burst: 8 },
    talentBook: 'Hàn Huyên (Kindling)',
    talentDomain: 'Bí Cảnh Natlan',
    talentDays: [2, 5, 0],
    weeklyBossMat: 'Nguyên liệu Natlan',
    worldBossMat: 'Lõi Máy Tự Hành Natlan',
    localSpecialty: 'Đá Lửa Vụn Vỡ',
  },
  {
    id: 'char-mavuika',
    name: 'Mavuika',
    nameVi: 'Mavuika',
    element: 'pyro',
    rarity: 5,
    icon: 'https://enka.network/ui/UI_AvatarIcon_Mavuika.png',
    level: 60,
    maxLevel: 90,
    constellation: 0,
    fetter: 4,
    weapon: {
      name: 'Trấn Mavuika',
      icon: 'https://enka.network/ui/UI_EquipIcon_Claymore_RadianceSword.png',
      rarity: 5,
      level: 70,
      affixLevel: 1,
      typeName: 'Trọng Kiếm',
      materialName: 'Nguyên Liệu Natlan',
      domainDays: [1, 4, 0],
    },
    relics: [
      { name: 'Dũng Sĩ Hỏa Diệm', icon: 'https://enka.network/ui/UI_ItemIcon_104003.png', posName: 'Hoa Sự Sống', rarity: 5, level: 16, setName: 'Bí Cảnh Dũng Sĩ Natlan' },
    ],
    talents: { attack: 1, skill: 6, burst: 6 },
    talentBook: 'Bất Diệt (Contention)',
    talentDomain: 'Bí Cảnh Natlan',
    talentDays: [1, 4, 0],
    weeklyBossMat: 'Nguyên liệu Natlan',
    worldBossMat: 'Hạt Giống Ngọn Lửa Natlan',
    localSpecialty: 'Hoa Lửa Hoang Dã',
  },
  {
    id: 'char-arlecchino',
    name: 'Arlecchino',
    nameVi: 'Arlecchino',
    element: 'pyro',
    rarity: 5,
    icon: 'https://enka.network/ui/UI_AvatarIcon_Arlecchino.png',
    level: 80,
    maxLevel: 90,
    constellation: 0,
    fetter: 9,
    weapon: {
      name: 'Xích Nguyệt Liêm',
      icon: 'https://enka.network/ui/UI_EquipIcon_Pole_BloodMoon.png',
      rarity: 5,
      level: 90,
      affixLevel: 1,
      typeName: 'Vũ Khí Cán Dài',
      materialName: 'Thánh Tích Fontaine',
      domainDays: [1, 4, 0],
    },
    relics: [
      { name: 'Mảnh Hài Hòa Hư Ảo', icon: 'https://enka.network/ui/UI_ItemIcon_104003.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Mảnh Hài Hòa Hư Ảo (4 món)' },
    ],
    talents: { attack: 10, skill: 8, burst: 8 },
    talentBook: 'Trật Tự (Order)',
    talentDomain: 'Vinh Quang Nhợt Nhạt (Fontaine)',
    talentDays: [3, 6, 0],
    weeklyBossMat: 'Ngọn Lửa Khắc Ghi (Arlecchino Boss)',
    worldBossMat: 'Bức Tượng Dị Giới',
    localSpecialty: 'Hoa Cầu Vồng',
  },
  {
    id: 'char-kazuha',
    name: 'Kaedehara Kazuha',
    nameVi: 'Kaedehara Kazuha',
    element: 'anemo',
    rarity: 5,
    icon: 'https://enka.network/ui/UI_AvatarIcon_Kazuha.png',
    level: 90,
    maxLevel: 90,
    constellation: 0,
    fetter: 10,
    weapon: {
      name: 'Tây Phong Kiếm',
      icon: 'https://enka.network/ui/UI_EquipIcon_Sword_Zephyrus.png',
      rarity: 4,
      level: 90,
      affixLevel: 5,
      typeName: 'Kiếm Đơn',
      materialName: 'Xiềng Xích Dandelion',
      domainDays: [3, 6, 0],
    },
    relics: [
      { name: 'Bóng Hình Màu Xanh', icon: 'https://enka.network/ui/UI_ItemIcon_104003.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Bóng Hình Màu Xanh (4 món)' },
    ],
    talents: { attack: 6, skill: 8, burst: 8 },
    talentBook: 'Cần Thiết (Diligence)',
    talentDomain: 'Thái Sơn Phủ (Liyue)',
    talentDays: [2, 5, 0],
    weeklyBossMat: 'Vảy Vàng Mạ Bạc (Azhdaha)',
    worldBossMat: 'Hạch Ma Khôi Lỗi',
    localSpecialty: 'Nấm Rơm Biển',
  },
  {
    id: 'char-zhongli',
    name: 'Zhongli',
    nameVi: 'Zhongli',
    element: 'geo',
    rarity: 5,
    icon: 'https://enka.network/ui/UI_AvatarIcon_Zhongli.png',
    level: 90,
    maxLevel: 90,
    constellation: 0,
    fetter: 10,
    weapon: {
      name: 'Giáo Nịnh Thần',
      icon: 'https://enka.network/ui/UI_EquipIcon_Pole_Kunwu.png',
      rarity: 5,
      level: 90,
      affixLevel: 1,
      typeName: 'Vũ Khí Cán Dài',
      materialName: 'Mảnh Xiềng Xích',
      domainDays: [1, 4, 0],
    },
    relics: [
      { name: 'Thiên Nham Vững Chắc', icon: 'https://enka.network/ui/UI_ItemIcon_104003.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Thiên Nham Vững Chắc (4 món)' },
    ],
    talents: { attack: 1, skill: 9, burst: 9 },
    talentBook: 'Vàng Kim (Gold)',
    talentDomain: 'Thái Sơn Phủ (Liyue)',
    talentDays: [3, 6, 0],
    weeklyBossMat: 'Sừng Ma Kiếm Childe',
    worldBossMat: 'Huyền Nham Tháp',
    localSpecialty: 'Thạch Phách',
  },
  {
    id: 'char-hutao',
    name: 'Hu Tao',
    nameVi: 'Hu Tao',
    element: 'pyro',
    rarity: 5,
    icon: 'https://enka.network/ui/UI_AvatarIcon_Hutao.png',
    level: 90,
    maxLevel: 90,
    constellation: 1,
    fetter: 10,
    weapon: {
      name: 'Trượng Homa',
      icon: 'https://enka.network/ui/UI_EquipIcon_Pole_Homa.png',
      rarity: 5,
      level: 90,
      affixLevel: 1,
      typeName: 'Vũ Khí Cán Dài',
      materialName: 'Hạt Muối Đen Liyue',
      domainDays: [3, 6, 0],
    },
    relics: [
      { name: 'Diệm Ma Rực Cháy', icon: 'https://enka.network/ui/UI_ItemIcon_104003.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Diệm Ma Rực Cháy (4 món)' },
    ],
    talents: { attack: 10, skill: 10, burst: 9 },
    talentBook: 'Cần Thiết (Diligence)',
    talentDomain: 'Thái Sơn Phủ (Liyue)',
    talentDays: [2, 5, 0],
    weeklyBossMat: 'Mảnh Ma Kiếm Phong Ma',
    worldBossMat: 'Ngọc Chưa Trưởng Thành',
    localSpecialty: 'Dạ Bạc Thạch',
  },
  {
    id: 'char-yelan',
    name: 'Yelan',
    nameVi: 'Yelan',
    element: 'hydro',
    rarity: 5,
    icon: 'https://enka.network/ui/UI_AvatarIcon_Yelan.png',
    level: 80,
    maxLevel: 90,
    constellation: 0,
    fetter: 10,
    weapon: {
      name: 'Cung Tây Phong',
      icon: 'https://enka.network/ui/UI_EquipIcon_Bow_Zephyrus.png',
      rarity: 4,
      level: 90,
      affixLevel: 5,
      typeName: 'Cung',
      materialName: 'Mảnh Xiềng Xích',
      domainDays: [3, 6, 0],
    },
    relics: [
      { name: 'Dấu Ấn Ngăn Trở', icon: 'https://enka.network/ui/UI_ItemIcon_104003.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Dấu Ấn Ngăn Trở (4 món)' },
    ],
    talents: { attack: 1, skill: 9, burst: 10 },
    talentBook: 'Thịnh Vượng (Prosperity)',
    talentDomain: 'Thái Sơn Phủ (Liyue)',
    talentDays: [1, 4, 0],
    weeklyBossMat: 'Vảy Vàng Azhdaha',
    worldBossMat: 'Bánh Răng Cổ Xưa Runegolem',
    localSpecialty: 'Ốc Tinh Tố',
  },
  {
    id: 'char-bennett',
    name: 'Bennett',
    nameVi: 'Bennett',
    element: 'pyro',
    rarity: 4,
    icon: 'https://enka.network/ui/UI_AvatarIcon_Bennett.png',
    level: 80,
    maxLevel: 90,
    constellation: 5,
    fetter: 10,
    weapon: {
      name: 'Tây Phong Kiếm',
      icon: 'https://enka.network/ui/UI_EquipIcon_Sword_Zephyrus.png',
      rarity: 4,
      level: 90,
      affixLevel: 5,
      typeName: 'Kiếm Đơn',
      materialName: 'Xiềng Xích Dandelion',
      domainDays: [3, 6, 0],
    },
    relics: [
      { name: 'Nghi Thức Tông Thất Cổ', icon: 'https://enka.network/ui/UI_ItemIcon_104003.png', posName: 'Hoa Sự Sống', rarity: 5, level: 20, setName: 'Nghi Thức Tông Thất Cổ (4 món)' },
    ],
    talents: { attack: 1, skill: 6, burst: 10 },
    talentBook: 'Kháng Chiến (Resistance)',
    talentDomain: 'Hẻm Núi Forsaken (Mondstadt)',
    talentDays: [2, 5, 0],
    weeklyBossMat: 'Lông Vũ Dvalin',
    worldBossMat: 'Hạt Lửa Vĩnh Cửu',
    localSpecialty: 'Bồ Công Anh',
  },
];

