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

export const STANDARD_5STAR_WEAPONS = [
  'Kiếm Thiên Không',
  'Đại Kiếm Thiên Không',
  'Thương Thiên Không',
  'Cánh Thiên Không',
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
