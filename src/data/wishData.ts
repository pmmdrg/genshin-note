import type { WishBannerType, WishBannerStats, WishRecord } from '../types';

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
  const softPityStart = isWeapon ? 63 : 74;
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
  streak: number; // 0, 1, 2
  isGuaranteed: boolean; // Currently has 100% guarantee from losing last 50/50
  guaranteedNext: boolean; // 100% guaranteed to trigger Capturing Radiance on the next 50/50
  remainingAttempts: number; // How many more 50/50 attempts until guaranteed (0, 1, 2, or 3)
  statusTitle: string;
  statusBadge: string;
  description: string;
  probText: string;
}

/**
 * Calculates Capturing Radiance (Bắt Lấy Ánh Sáng) status based on Version 5.0+ mechanics.
 * Streak represents consecutive 50/50 losses without winning or triggering Capturing Radiance.
 * Max consecutive 50/50 non-wins before guaranteed Capturing Radiance is 2 (so the 3rd 50/50 is guaranteed 100%).
 */
export function calculateCapturingRadianceInfo(streak: number, isGuaranteed: boolean): CapturingRadianceInfo {
  const clampedStreak = Math.max(0, Math.min(2, streak));

  if (isGuaranteed) {
    return {
      streak: clampedStreak,
      isGuaranteed: true,
      guaranteedNext: false,
      remainingAttempts: 3 - clampedStreak,
      statusTitle: 'Đang Có Bảo Hiểm 100%',
      statusBadge: 'Bảo Hiểm Banner',
      description: 'Lần 5★ kế tiếp chắc chắn là nhân vật sự kiện của banner! Sau khi nhận, chu kỳ 50/50 tiếp theo sẽ áp dụng cơ chế Bắt Lấy Ánh Sáng.',
      probText: '100% Nhân Vật Banner',
    };
  }

  if (clampedStreak >= 2) {
    return {
      streak: 2,
      isGuaranteed: false,
      guaranteedNext: true,
      remainingAttempts: 0,
      statusTitle: 'Chắc Chắn Kích Hoạt Bắt Lấy Ánh Sáng!',
      statusBadge: '100% Bắt Lấy Ánh Sáng',
      description: 'Bạn đã lệch 50/50 2 lần liên tiếp. Ở lần nổ 5★ 50/50 tiếp theo, cơ chế Bắt Lấy Ánh Sáng CHẮC CHẮN 100% kích hoạt và trao ngay nhân vật Banner!',
      probText: '100% Kích Hoạt',
    };
  }

  if (clampedStreak === 1) {
    return {
      streak: 1,
      isGuaranteed: false,
      guaranteedNext: false,
      remainingAttempts: 1,
      statusTitle: 'Còn Tối Đa 1 Lần 50/50 Nữa',
      statusBadge: 'Tỉ Lệ Cao (~50%)',
      description: 'Bạn đã có 1 lần lệch 50/50 tích lũy. Ở lần 50/50 kế tiếp, nếu thua, tỉ lệ kích hoạt Bắt Lấy Ánh Sáng được tăng vọt lên ~50%. Nếu vẫn chưa kích hoạt, lần kế tiếp sẽ chắc chắn 100%!',
      probText: '~50% Khi Thua 50/50',
    };
  }

  return {
    streak: 0,
    isGuaranteed: false,
    guaranteedNext: false,
    remainingAttempts: 2,
    statusTitle: 'Còn Tối Đa 2 Lần 50/50 Nữa',
    statusBadge: 'Cơ Bản (~10%)',
    description: 'Chu kỳ Bắt Lấy Ánh Sáng ở mức cơ bản. Khi gặp 50/50, bạn có 55% tỉ lệ thắng tự nhiên (50% gốc + 10% cơ chế Bắt Lấy Ánh Sáng khi thua).',
    probText: '~10% Khi Thua 50/50',
  };
}

export interface WishSummary {
  total5Star: number;
  rateUpCount: number;
  lost5050Count: number;
  capturingRadianceCount: number;
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
  let totalPity = 0;

  for (const r of filtered) {
    totalPity += r.pity;
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
    winRatePercent,
    averagePity,
    totalPrimos,
    luckTier,
    luckLabel,
  };
}
