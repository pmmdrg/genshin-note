import type { WishBannerType, WishBannerStats, WishRecord } from '../types';

export const BANNER_NAMES: Record<WishBannerType, string> = {
  character: 'Nhân Vật',
  weapon: 'Vũ Khí',
  standard: 'Thường',
  chronicled: 'Sử Ký',
};

export const STANDARD_5STAR_CHARACTERS = [
  'Diluc',
  'Jean',
  'Keqing',
  'Mona',
  'Qiqi',
  'Tighnari',
  'Dehya',
];

export interface Gacha5StarCharacter {
  name: string;
  nameVi: string;
  element: 'pyro' | 'hydro' | 'anemo' | 'electro' | 'dendro' | 'cryo' | 'geo';
  weaponType: 'sword' | 'claymore' | 'polearm' | 'bow' | 'catalyst';
  avatarUrl: string;
  isStandard: boolean;
}

export const GACHA_5STAR_CHARACTERS: Gacha5StarCharacter[] = [
  // Natlan
  { name: 'Mavuika', nameVi: 'Mavuika', element: 'pyro', weaponType: 'claymore', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Mavuika.png', isStandard: false },
  { name: 'Citlali', nameVi: 'Citlali', element: 'cryo', weaponType: 'catalyst', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Citlali.png', isStandard: false },
  { name: 'Chasca', nameVi: 'Chasca', element: 'anemo', weaponType: 'bow', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Chasca.png', isStandard: false },
  { name: 'Xilonen', nameVi: 'Xilonen', element: 'geo', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Xilonen.png', isStandard: false },
  { name: 'Kinich', nameVi: 'Kinich', element: 'dendro', weaponType: 'claymore', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Kinich.png', isStandard: false },
  { name: 'Mualani', nameVi: 'Mualani', element: 'hydro', weaponType: 'catalyst', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Mualani.png', isStandard: false },

  // Fontaine
  { name: 'Emilie', nameVi: 'Emilie', element: 'dendro', weaponType: 'polearm', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Emilie.png', isStandard: false },
  { name: 'Sigewinne', nameVi: 'Sigewinne', element: 'hydro', weaponType: 'bow', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Sigewinne.png', isStandard: false },
  { name: 'Clorinde', nameVi: 'Clorinde', element: 'electro', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Clorinde.png', isStandard: false },
  { name: 'Arlecchino', nameVi: 'Arlecchino', element: 'pyro', weaponType: 'polearm', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Arlecchino.png', isStandard: false },
  { name: 'Chiori', nameVi: 'Chiori', element: 'geo', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Chiori.png', isStandard: false },
  { name: 'Xianyun', nameVi: 'Xianyun', element: 'anemo', weaponType: 'catalyst', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Liuyun.png', isStandard: false },
  { name: 'Navia', nameVi: 'Navia', element: 'geo', weaponType: 'claymore', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Navia.png', isStandard: false },
  { name: 'Furina', nameVi: 'Furina', element: 'hydro', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Furina.png', isStandard: false },
  { name: 'Wriothesley', nameVi: 'Wriothesley', element: 'cryo', weaponType: 'catalyst', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Wriothesley.png', isStandard: false },
  { name: 'Neuvillette', nameVi: 'Neuvillette', element: 'hydro', weaponType: 'catalyst', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Neuvillette.png', isStandard: false },
  { name: 'Lyney', nameVi: 'Lyney', element: 'pyro', weaponType: 'bow', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Liney.png', isStandard: false },

  // Sumeru
  { name: 'Baizhu', nameVi: 'Baizhu', element: 'dendro', weaponType: 'catalyst', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Baizhuer.png', isStandard: false },
  { name: 'Dehya', nameVi: 'Dehya', element: 'pyro', weaponType: 'claymore', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Dehya.png', isStandard: true },
  { name: 'Alhaitham', nameVi: 'Alhaitham', element: 'dendro', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Alhatham.png', isStandard: false },
  { name: 'Wanderer', nameVi: 'Kẻ Lang Thang', element: 'anemo', weaponType: 'catalyst', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Wanderer.png', isStandard: false },
  { name: 'Nahida', nameVi: 'Nahida', element: 'dendro', weaponType: 'catalyst', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Nahida.png', isStandard: false },
  { name: 'Nilou', nameVi: 'Nilou', element: 'hydro', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Nilou.png', isStandard: false },
  { name: 'Cyno', nameVi: 'Cyno', element: 'electro', weaponType: 'polearm', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Cyno.png', isStandard: false },
  { name: 'Tighnari', nameVi: 'Tighnari', element: 'dendro', weaponType: 'bow', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Tighnari.png', isStandard: true },

  // Inazuma
  { name: 'Yelan', nameVi: 'Yelan', element: 'hydro', weaponType: 'bow', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Yelan.png', isStandard: false },
  { name: 'Kamisato Ayato', nameVi: 'Kamisato Ayato', element: 'hydro', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Ayato.png', isStandard: false },
  { name: 'Yae Miko', nameVi: 'Yae Miko', element: 'electro', weaponType: 'catalyst', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Yae.png', isStandard: false },
  { name: 'Shenhe', nameVi: 'Shenhe', element: 'cryo', weaponType: 'polearm', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Shenhe.png', isStandard: false },
  { name: 'Arataki Itto', nameVi: 'Arataki Itto', element: 'geo', weaponType: 'claymore', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Itto.png', isStandard: false },
  { name: 'Sangonomiya Kokomi', nameVi: 'Sangonomiya Kokomi', element: 'hydro', weaponType: 'catalyst', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Kokomi.png', isStandard: false },
  { name: 'Raiden Shogun', nameVi: 'Raiden Shogun', element: 'electro', weaponType: 'polearm', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Shougun.png', isStandard: false },
  { name: 'Yoimiya', nameVi: 'Yoimiya', element: 'pyro', weaponType: 'bow', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Yoimiya.png', isStandard: false },
  { name: 'Kamisato Ayaka', nameVi: 'Kamisato Ayaka', element: 'cryo', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Ayaka.png', isStandard: false },
  { name: 'Kaedehara Kazuha', nameVi: 'Kaedehara Kazuha', element: 'anemo', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Kazuha.png', isStandard: false },

  // Liyue & Mondstadt
  { name: 'Eula', nameVi: 'Eula', element: 'cryo', weaponType: 'claymore', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Eula.png', isStandard: false },
  { name: 'Hu Tao', nameVi: 'Hu Tao', element: 'pyro', weaponType: 'polearm', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Hutao.png', isStandard: false },
  { name: 'Xiao', nameVi: 'Xiao', element: 'anemo', weaponType: 'polearm', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Xiao.png', isStandard: false },
  { name: 'Ganyu', nameVi: 'Ganyu', element: 'cryo', weaponType: 'bow', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Ganyu.png', isStandard: false },
  { name: 'Albedo', nameVi: 'Albedo', element: 'geo', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Albedo.png', isStandard: false },
  { name: 'Zhongli', nameVi: 'Zhongli', element: 'geo', weaponType: 'polearm', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Zhongli.png', isStandard: false },
  { name: 'Tartaglia', nameVi: 'Tartaglia', element: 'hydro', weaponType: 'bow', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Tartaglia.png', isStandard: false },
  { name: 'Klee', nameVi: 'Klee', element: 'pyro', weaponType: 'catalyst', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Klee.png', isStandard: false },
  { name: 'Venti', nameVi: 'Venti', element: 'anemo', weaponType: 'bow', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Venti.png', isStandard: false },
  { name: 'Keqing', nameVi: 'Keqing', element: 'electro', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Keqing.png', isStandard: true },
  { name: 'Mona', nameVi: 'Mona', element: 'hydro', weaponType: 'catalyst', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Mona.png', isStandard: true },
  { name: 'Qiqi', nameVi: 'Qiqi', element: 'cryo', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Qiqi.png', isStandard: true },
  { name: 'Diluc', nameVi: 'Diluc', element: 'pyro', weaponType: 'claymore', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Diluc.png', isStandard: true },
  { name: 'Jean', nameVi: 'Jean', element: 'anemo', weaponType: 'sword', avatarUrl: 'https://enka.network/ui/UI_AvatarIcon_Qin.png', isStandard: true },
];

export const STANDARD_5STAR_WEAPONS = [
  'Thiên Không Kiếm',
  'Thiên Không Kiêu Ngạo',
  'Xương Sống Thiên Không',
  'Cánh Thiên Không',
  'Quyển Thiên Không',
  'Kiếm Thiên Không',
  'Đại Kiếm Thiên Không',
  'Thương Thiên Không',
  'Quyển Sách Thiên Không',
  'Cung Amos',
  'Điển Tích Tây Phong',
  'Đường Cùng Của Sói',
  'Hòa Phác Diên',
  'Phong Ưng Kiếm',
  'Skyward Blade',
  'Skyward Pride',
  'Skyward Spine',
  'Skyward Harp',
  'Skyward Atlas',
  "Amos' Bow",
  'Lost Prayer to the Sacred Winds',
  "Wolf's Gravestone",
  'Primordial Jade Winged-Spear',
  'Aquila Favonia',
];

export const DEFAULT_BANNER_STATS: Record<WishBannerType, WishBannerStats> = {
  character: {
    currentPity: 38,
    isGuaranteed: false,
    capturingRadianceLossStreak: 1,
  },
  weapon: {
    currentPity: 15,
    isGuaranteed: false,
    capturingRadianceLossStreak: 0,
    fatePoints: 0,
  },
  standard: {
    currentPity: 42,
    isGuaranteed: false,
    capturingRadianceLossStreak: 0,
  },
  chronicled: {
    currentPity: 0,
    isGuaranteed: false,
    capturingRadianceLossStreak: 0,
    fatePoints: 0,
  },
};

export const INITIAL_WISH_HISTORY: WishRecord[] = [
  {
    id: 'wish-mavuika-1',
    name: 'Mavuika',
    nameVi: 'Mavuika',
    icon: 'https://enka.network/ui/UI_AvatarIcon_Mavuika.png',
    itemType: 'character',
    rarity: 5,
    bannerType: 'character',
    pity: 74,
    date: '2025-01-02',
    isRateUp: true,
    isCapturingRadiance: true,
    isGuaranteed: false,
    notes: 'Kích hoạt Bắt Lấy Ánh Sáng (Capturing Radiance)!',
  },
  {
    id: 'wish-diluc-1',
    name: 'Diluc',
    nameVi: 'Diluc',
    icon: 'https://enka.network/ui/UI_AvatarIcon_Diluc.png',
    itemType: 'character',
    rarity: 5,
    bannerType: 'character',
    pity: 78,
    date: '2024-11-20',
    isRateUp: false,
    isCapturingRadiance: false,
    isGuaranteed: false,
    notes: 'Lệch rate tại mốc 78',
  },
  {
    id: 'wish-furina-1',
    name: 'Furina',
    nameVi: 'Furina',
    icon: 'https://enka.network/ui/UI_AvatarIcon_Furina.png',
    itemType: 'character',
    rarity: 5,
    bannerType: 'character',
    pity: 76,
    date: '2024-07-15',
    isRateUp: true,
    isCapturingRadiance: false,
    isGuaranteed: true,
    notes: 'Nổ bảo hiểm Furina C1',
  },
  {
    id: 'wish-raiden-1',
    name: 'Raiden Shogun',
    nameVi: 'Raiden Shogun',
    icon: 'https://enka.network/ui/UI_AvatarIcon_Shougun.png',
    itemType: 'character',
    rarity: 5,
    bannerType: 'character',
    pity: 32,
    date: '2024-01-10',
    isRateUp: true,
    isCapturingRadiance: false,
    isGuaranteed: false,
    notes: 'Trúng 50/50 may mắn ở roll 32!',
  },
];

export interface PityInfo {
  maxPity: number;
  softPityStart: number;
  currentPity: number;
  pullsToSoftPity: number;
  pullsToHardPity: number;
  primosToHardPity: number;
  isSoftPity: boolean;
  progressPercent: number;
}

export function calculatePityInfo(banner: WishBannerType, currentPity: number): PityInfo {
  const isWeapon = banner === 'weapon';
  const maxPity = isWeapon ? 80 : 90;
  const softPityStart = isWeapon ? 65 : 75; // 75 for character/standard/chronicled, 65 for weapon
  const clamped = Math.max(0, Math.min(maxPity, currentPity));

  const pullsToSoftPity = Math.max(0, softPityStart - clamped);
  const pullsToHardPity = Math.max(0, maxPity - clamped);
  const primosToHardPity = pullsToHardPity * 160;
  const isSoftPity = clamped >= softPityStart;
  const progressPercent = Math.round((clamped / maxPity) * 100);

  return {
    maxPity,
    softPityStart,
    currentPity: clamped,
    pullsToSoftPity,
    pullsToHardPity,
    primosToHardPity,
    isSoftPity,
    progressPercent,
  };
}

export interface CapturingRadianceInfo {
  lossesSinceLastRadiance: number; // 0, 1, 2, 3+
  remainingLosses: number; // 3, 2, 1, 0
  guaranteedNext: boolean; // true if lossesSinceLastRadiance >= 3
  isGuaranteed: boolean;
  statusTitle: string;
  statusBadge: string;
}

/**
 * Tự động tính cơ chế Bắt Lấy Ánh Sáng kể từ lần Bắt Lấy Ánh Sáng gần nhất.
 * Cứ tích lũy đủ 3 lần lệch sẽ chắc chắn có Bắt Lấy Ánh Sáng ở lần 50/50 tiếp theo!
 */
export function calculateAutoCapturingRadiance(
  records: WishRecord[],
  isGuaranteed: boolean = false
): CapturingRadianceInfo {
  const charRecords = records.filter((r) => r.bannerType === 'character');
  let lossesSinceLastRadiance = 0;

  for (const r of charRecords) {
    if (r.isCapturingRadiance) {
      break;
    }
    if (!r.isRateUp) {
      lossesSinceLastRadiance++;
    }
  }

  const remainingLosses = Math.max(0, 3 - lossesSinceLastRadiance);
  const guaranteedNext = lossesSinceLastRadiance >= 3;

  let statusBadge = '';
  let statusTitle = '';

  if (guaranteedNext) {
    statusBadge = '100% Chắc Chắn';
    statusTitle = 'Chắc chắn có Bắt Lấy Ánh Sáng ở lần 50/50 tới!';
  } else {
    statusBadge = `${lossesSinceLastRadiance}/3 Lệch`;
    statusTitle = `Còn ${remainingLosses} lần lệch nữa chắc chắn có Bắt Lấy Ánh Sáng`;
  }

  return {
    lossesSinceLastRadiance,
    remainingLosses,
    guaranteedNext,
    isGuaranteed,
    statusTitle,
    statusBadge,
  };
}

export interface WishSummary {
  total5Star: number;
  rateUpCount: number;
  lost5050Count: number;
  capturingRadianceCount: number;
  characterCount: number;
  weaponCount: number;
  winRatePercent: number;
  averagePity: number;
  totalPrimos: number;
  luckTier: 'very_lucky' | 'lucky' | 'normal' | 'unlucky';
  luckLabel: string;
}

export function calculateWishSummary(records: WishRecord[], bannerType?: WishBannerType): WishSummary {
  const filtered = bannerType ? records.filter((r) => r.bannerType === bannerType) : records;
  const total5Star = filtered.length;

  if (total5Star === 0) {
    return {
      total5Star: 0,
      rateUpCount: 0,
      lost5050Count: 0,
      capturingRadianceCount: 0,
      characterCount: 0,
      weaponCount: 0,
      winRatePercent: 0,
      averagePity: 0,
      totalPrimos: 0,
      luckTier: 'normal',
      luckLabel: 'Chưa có dữ liệu',
    };
  }

  let rateUpCount = 0;
  let lost5050Count = 0;
  let capturingRadianceCount = 0;
  let characterCount = 0;
  let weaponCount = 0;
  let totalPity = 0;

  for (const r of filtered) {
    totalPity += r.pity;
    if (r.itemType === 'character') {
      characterCount++;
    } else {
      weaponCount++;
    }
    if (r.isCapturingRadiance) {
      capturingRadianceCount++;
      rateUpCount++;
    } else if (r.isRateUp) {
      rateUpCount++;
    } else {
      lost5050Count++;
    }
  }

  const averagePity = Math.round((totalPity / total5Star) * 10) / 10;
  const totalPrimos = totalPity * 160;
  const winRatePercent = total5Star > 0 ? Math.round((rateUpCount / total5Star) * 100) : 0;

  let luckTier: WishSummary['luckTier'] = 'normal';
  let luckLabel = 'Bình Thường';

  if (averagePity < 50) {
    luckTier = 'very_lucky';
    luckLabel = 'Cực Kỳ May Mắn ✨';
  } else if (averagePity < 65) {
    luckTier = 'lucky';
    luckLabel = 'Khá May Mắn 🍀';
  } else if (averagePity < 76) {
    luckTier = 'normal';
    luckLabel = 'Bình Thường ⚖️';
  } else {
    luckTier = 'unlucky';
    luckLabel = 'Cần Thêm May Mắn 🛡️';
  }

  return {
    total5Star,
    rateUpCount,
    lost5050Count,
    capturingRadianceCount,
    characterCount,
    weaponCount,
    winRatePercent,
    averagePity,
    totalPrimos,
    luckTier,
    luckLabel,
  };
}
