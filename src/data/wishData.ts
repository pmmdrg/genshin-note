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
  'Yumemizuki Mizuki',
  'Mizuki',
];

export interface Gacha5StarCharacter {
  name: string;
  nameVi: string;
  element: 'pyro' | 'hydro' | 'anemo' | 'electro' | 'dendro' | 'cryo' | 'geo';
  rarity?: 5;
  weaponType: 'sword' | 'claymore' | 'polearm' | 'bow' | 'catalyst';
  avatarUrl: string;
  isStandard: boolean;
}

export const GACHA_5STAR_CHARACTERS: Gacha5StarCharacter[] = [
  {
    "name": "Albedo",
    "nameVi": "Albedo",
    "element": "geo",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Albedo.png",
    "isStandard": false
  },
  {
    "name": "Alhaitham",
    "nameVi": "Alhaitham",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Alhatham.png",
    "isStandard": false
  },
  {
    "name": "Aloy",
    "nameVi": "Aloy",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Aloy.png",
    "isStandard": false
  },
  {
    "name": "Arataki Itto",
    "nameVi": "Arataki Itto",
    "element": "geo",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Itto.png",
    "isStandard": false
  },
  {
    "name": "Arlecchino",
    "nameVi": "Arlecchino",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Arlecchino.png",
    "isStandard": false
  },
  {
    "name": "Baizhu",
    "nameVi": "Baizhu",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Baizhuer.png",
    "isStandard": false
  },
  {
    "name": "Chasca",
    "nameVi": "Chasca",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Chasca.png",
    "isStandard": false
  },
  {
    "name": "Chiori",
    "nameVi": "Chiori",
    "element": "geo",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Chiori.png",
    "isStandard": false
  },
  {
    "name": "Citlali",
    "nameVi": "Citlali",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Citlali.png",
    "isStandard": false
  },
  {
    "name": "Clorinde",
    "nameVi": "Clorinde",
    "element": "electro",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Clorinde.png",
    "isStandard": false
  },
  {
    "name": "Columbina",
    "nameVi": "Columbina",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Columbina.png",
    "isStandard": false
  },
  {
    "name": "Cyno",
    "nameVi": "Cyno",
    "element": "electro",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Cyno.png",
    "isStandard": false
  },
  {
    "name": "Dehya",
    "nameVi": "Dehya",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Dehya.png",
    "isStandard": true
  },
  {
    "name": "Diluc",
    "nameVi": "Diluc",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Diluc.png",
    "isStandard": true
  },
  {
    "name": "Durin",
    "nameVi": "Durin",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Durin.png",
    "isStandard": false
  },
  {
    "name": "Emilie",
    "nameVi": "Emilie",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Emilie.png",
    "isStandard": false
  },
  {
    "name": "Escoffier",
    "nameVi": "Escoffier",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Escoffier.png",
    "isStandard": false
  },
  {
    "name": "Eula",
    "nameVi": "Eula",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Eula.png",
    "isStandard": false
  },
  {
    "name": "Flins",
    "nameVi": "Flins",
    "element": "electro",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Flins.png",
    "isStandard": false
  },
  {
    "name": "Furina",
    "nameVi": "Furina",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Furina.png",
    "isStandard": false
  },
  {
    "name": "Ganyu",
    "nameVi": "Ganyu",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ganyu.png",
    "isStandard": false
  },
  {
    "name": "Hu Tao",
    "nameVi": "Hu Tao",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Hutao.png",
    "isStandard": false
  },
  {
    "name": "Ineffa",
    "nameVi": "Ineffa",
    "element": "electro",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ineffa.png",
    "isStandard": false
  },
  {
    "name": "Jean",
    "nameVi": "Jean",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Qin.png",
    "isStandard": true
  },
  {
    "name": "Kaedehara Kazuha",
    "nameVi": "Kaedehara Kazuha",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Kazuha.png",
    "isStandard": false
  },
  {
    "name": "Kamisato Ayaka",
    "nameVi": "Kamisato Ayaka",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ayaka.png",
    "isStandard": false
  },
  {
    "name": "Kamisato Ayato",
    "nameVi": "Kamisato Ayato",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ayato.png",
    "isStandard": false
  },
  {
    "name": "Wanderer",
    "nameVi": "Kẻ Lang Thang",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Wanderer.png",
    "isStandard": false
  },
  {
    "name": "Keqing",
    "nameVi": "Keqing",
    "element": "electro",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Keqing.png",
    "isStandard": true
  },
  {
    "name": "Kinich",
    "nameVi": "Kinich",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Kinich.png",
    "isStandard": false
  },
  {
    "name": "Klee",
    "nameVi": "Klee",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Klee.png",
    "isStandard": false
  },
  {
    "name": "Lauma",
    "nameVi": "Lauma",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Lauma.png",
    "isStandard": false
  },
  {
    "name": "Linnea",
    "nameVi": "Linnea",
    "element": "geo",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Linnea.png",
    "isStandard": false
  },
  {
    "name": "Lohen",
    "nameVi": "Lohen",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Lohen.png",
    "isStandard": false
  },
  {
    "name": "Lyney",
    "nameVi": "Lyney",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Liney.png",
    "isStandard": false
  },
  {
    "name": "Mavuika",
    "nameVi": "Mavuika",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Mavuika.png",
    "isStandard": false
  },
  {
    "name": "Mona",
    "nameVi": "Mona",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Mona.png",
    "isStandard": true
  },
  {
    "name": "Mualani",
    "nameVi": "Mualani",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Mualani.png",
    "isStandard": false
  },
  {
    "name": "Nahida",
    "nameVi": "Nahida",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Nahida.png",
    "isStandard": false
  },
  {
    "name": "Navia",
    "nameVi": "Navia",
    "element": "geo",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Navia.png",
    "isStandard": false
  },
  {
    "name": "Nefer",
    "nameVi": "Nefer",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Nefer.png",
    "isStandard": false
  },
  {
    "name": "Neuvillette",
    "nameVi": "Neuvillette",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Neuvillette.png",
    "isStandard": false
  },
  {
    "name": "Nicole",
    "nameVi": "Nicole",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Nicole.png",
    "isStandard": false
  },
  {
    "name": "Nilou",
    "nameVi": "Nilou",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Nilou.png",
    "isStandard": false
  },
  {
    "name": "Odette",
    "nameVi": "Odette",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Odette.png",
    "isStandard": false
  },
  {
    "name": "Qiqi",
    "nameVi": "Qiqi",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Qiqi.png",
    "isStandard": true
  },
  {
    "name": "Raiden Shogun",
    "nameVi": "Raiden Shogun",
    "element": "electro",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Shougun.png",
    "isStandard": false
  },
  {
    "name": "Sandrone",
    "nameVi": "Sandrone",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_MarionetteNew.png",
    "isStandard": false
  },
  {
    "name": "Sangonomiya Kokomi",
    "nameVi": "Sangonomiya Kokomi",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Kokomi.png",
    "isStandard": false
  },
  {
    "name": "Shenhe",
    "nameVi": "Shenhe",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Shenhe.png",
    "isStandard": false
  },
  {
    "name": "Sigewinne",
    "nameVi": "Sigewinne",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Sigewinne.png",
    "isStandard": false
  },
  {
    "name": "Skirk",
    "nameVi": "Skirk",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_SkirkNew.png",
    "isStandard": false
  },
  {
    "name": "Tartaglia",
    "nameVi": "Tartaglia",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Tartaglia.png",
    "isStandard": false
  },
  {
    "name": "Tighnari",
    "nameVi": "Tighnari",
    "element": "dendro",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Tighnari.png",
    "isStandard": true
  },
  {
    "name": "Varesa",
    "nameVi": "Varesa",
    "element": "electro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Varesa.png",
    "isStandard": false
  },
  {
    "name": "Varka",
    "nameVi": "Varka",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Varka.png",
    "isStandard": false
  },
  {
    "name": "Venti",
    "nameVi": "Venti",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Venti.png",
    "isStandard": false
  },
  {
    "name": "Vesna",
    "nameVi": "Vesna",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Vesna.png",
    "isStandard": false
  },
  {
    "name": "Vodyanitsa",
    "nameVi": "Vodyanitsa",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Vodyanitsa.png",
    "isStandard": false
  },
  {
    "name": "Wriothesley",
    "nameVi": "Wriothesley",
    "element": "cryo",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Wriothesley.png",
    "isStandard": false
  },
  {
    "name": "Xianyun",
    "nameVi": "Xianyun",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Liuyun.png",
    "isStandard": false
  },
  {
    "name": "Xiao",
    "nameVi": "Xiao",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Xiao.png",
    "isStandard": false
  },
  {
    "name": "Xilonen",
    "nameVi": "Xilonen",
    "element": "geo",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Xilonen.png",
    "isStandard": false
  },
  {
    "name": "Yae Miko",
    "nameVi": "Yae Miko",
    "element": "electro",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Yae.png",
    "isStandard": false
  },
  {
    "name": "Yelan",
    "nameVi": "Yelan",
    "element": "hydro",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Yelan.png",
    "isStandard": false
  },
  {
    "name": "Yoimiya",
    "nameVi": "Yoimiya",
    "element": "pyro",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Yoimiya.png",
    "isStandard": false
  },
  {
    "name": "Yumemizuki Mizuki",
    "nameVi": "Yumemizuki Mizuki",
    "element": "anemo",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Mizuki.png",
    "isStandard": true
  },
  {
    "name": "Zhongli",
    "nameVi": "Zhongli",
    "element": "geo",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Zhongli.png",
    "isStandard": false
  },
  {
    "name": "Zibai",
    "nameVi": "Zibai",
    "element": "geo",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Zibai.png",
    "isStandard": false
  }
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
  rateUpCount: number; // Tổng số lần trúng rate 50/50 (tự nhiên + bắt sáng)
  naturalWinCount: number; // Trúng rate tự nhiên (50/50)
  capturingRadianceCount: number; // Trúng rate nhờ Bắt Lấy Ánh Sáng
  guaranteedCount: number; // Trúng rate nhờ Bảo Hiểm (không tính vào tỉ lệ 50/50)
  lost5050Count: number; // Lệch 50/50
  total5050Count: number; // Tổng số lần đối mặt 50/50 (rateUpCount + lost5050Count)
  characterCount: number;
  weaponCount: number;
  winRatePercent: number; // Tỉ lệ trúng 50/50: (rateUpCount / total5050Count) * 100
  averagePity: number;
  totalPrimos: number;
  luckTier: 'very_lucky' | 'lucky' | 'normal' | 'unlucky';
  luckLabel: string;
}

export function calculateWishSummary(records: WishRecord[], bannerType?: WishBannerType): WishSummary {
  // Chỉ tính các bản ghi 5★ (rarity 5 hoặc mặc định nếu chưa gán)
  const filtered = (bannerType ? records.filter((r) => r.bannerType === bannerType) : records).filter(
    (r) => r.rarity === 5 || !r.rarity
  );
  const total5Star = filtered.length;

  if (total5Star === 0) {
    return {
      total5Star: 0,
      rateUpCount: 0,
      naturalWinCount: 0,
      capturingRadianceCount: 0,
      guaranteedCount: 0,
      lost5050Count: 0,
      total5050Count: 0,
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
  let naturalWinCount = 0;
  let capturingRadianceCount = 0;
  let guaranteedCount = 0;
  let lost5050Count = 0;
  let characterCount = 0;
  let weaponCount = 0;
  let totalPity = 0;

  // Lịch sử trong state lưu theo thứ tự mới nhất ở đầu (index 0).
  // Đảo ngược lại theo thứ tự thời gian (cũ -> mới) để suy luận bảo hiểm chính xác nếu chưa lưu cờ.
  const chronological = filtered.slice().reverse();
  let wasPreviousLoss = false;

  for (const r of chronological) {
    totalPity += r.pity;
    if (r.itemType === 'character') {
      characterCount++;
    } else {
      weaponCount++;
    }

    // Một lần quay có bảo hiểm nếu được đánh dấu cụ thể HOẶC lần nổ trước đó trên banner bị lệch
    const isGuaranteedPull = typeof r.isGuaranteed === 'boolean' ? r.isGuaranteed : wasPreviousLoss;

    if (r.isCapturingRadiance) {
      // Kích hoạt Bắt Lấy Ánh Sáng: tính là thắng 50/50
      capturingRadianceCount++;
      rateUpCount++;
      wasPreviousLoss = false;
    } else if (!r.isRateUp) {
      // Lệch rate 50/50
      lost5050Count++;
      wasPreviousLoss = true;
    } else if (isGuaranteedPull) {
      // Trúng rate nhờ BẢO HIỂM: KHÔNG tính vào tỷ lệ trúng/lệch 50/50
      guaranteedCount++;
      wasPreviousLoss = false;
    } else {
      // Trúng rate thực sự không nhờ bảo hiểm (thắng 50/50 tự nhiên)
      naturalWinCount++;
      rateUpCount++;
      wasPreviousLoss = false;
    }
  }

  const total5050Count = rateUpCount + lost5050Count;
  const averagePity = Math.round((totalPity / total5Star) * 10) / 10;
  const totalPrimos = totalPity * 160;
  const winRatePercent = total5050Count > 0 ? Math.round((rateUpCount / total5050Count) * 100) : 0;

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
    naturalWinCount,
    capturingRadianceCount,
    guaranteedCount,
    lost5050Count,
    total5050Count,
    characterCount,
    weaponCount,
    winRatePercent,
    averagePity,
    totalPrimos,
    luckTier,
    luckLabel,
  };
}

export interface Gacha5StarWeapon {
  name: string;
  nameVi: string;
  rarity?: 5;
  weaponType: 'sword' | 'claymore' | 'polearm' | 'bow' | 'catalyst';
  avatarUrl: string;
  isStandard: boolean;
}

export const GACHA_5STAR_WEAPONS: Gacha5StarWeapon[] = [
  {
    "name": "A Teaspoon of Transcendence",
    "nameVi": "Muỗng Trà Siêu Việt",
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_CrystallineSword.png",
    "isStandard": false
  },
  {
    "name": "A Thousand Blazing Suns",
    "nameVi": "Thiên Dương Rực Lửa",
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_RadianceSword.png",
    "isStandard": false
  },
  {
    "name": "A Thousand Floating Dreams",
    "nameVi": "Cõi Mộng Ngàn Đêm",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Ayus.png",
    "isStandard": false
  },
  {
    "name": "Absolution",
    "nameVi": "Xá Tội",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Estoc.png",
    "isStandard": false
  },
  {
    "name": "Amos' Bow",
    "nameVi": "Cung Amos",
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Amos.png",
    "isStandard": true
  },
  {
    "name": "Angelos' Heptades",
    "nameVi": "Trần Quang Thất Dụ",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_FairyGarden.png",
    "isStandard": false
  },
  {
    "name": "Aqua Simulacra",
    "nameVi": "Nhược Thủy",
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Kirin.png",
    "isStandard": false
  },
  {
    "name": "Aquila Favonia",
    "nameVi": "Phong Ưng Kiếm",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Falcon.png",
    "isStandard": true
  },
  {
    "name": "Astral Vulture's Crimson Plumage",
    "nameVi": "Xích Vũ Tinh Tựu",
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Qoyllorsnova.png",
    "isStandard": false
  },
  {
    "name": "Athame Artis",
    "nameVi": "Hắc Ám Xâm Thực",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Motsognir.png",
    "isStandard": false
  },
  {
    "name": "Azurelight",
    "nameVi": "Thương Diệu",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_OuterSword.png",
    "isStandard": false
  },
  {
    "name": "Beacon of the Reed Sea",
    "nameVi": "Hải Đăng Bờ Biển Lau",
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Deshret.png",
    "isStandard": false
  },
  {
    "name": "Beyond the Chrysalis",
    "nameVi": "Cánh Bướm Biến Hóa",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Samosvist.png",
    "isStandard": false
  },
  {
    "name": "Bloodsoaked Ruins",
    "nameVi": "Tàn Tích Nhuốm Máu",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_TummaLyhty.png",
    "isStandard": false
  },
  {
    "name": "Calamity Queller",
    "nameVi": "Hủy Diệt",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Santika.png",
    "isStandard": false
  },
  {
    "name": "Cashflow Supervision",
    "nameVi": "Quản Đốc Vàng Ròng",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Wheatley.png",
    "isStandard": false
  },
  {
    "name": "Crane's Echoing Call",
    "nameVi": "Dư Âm Tiếng Hạc",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_MountainGale.png",
    "isStandard": false
  },
  {
    "name": "Crimson Moon's Semblance",
    "nameVi": "Hình Thái Xích Nguyệt",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_BloodMoon.png",
    "isStandard": false
  },
  {
    "name": "Disaster and Remorse",
    "nameVi": "Tai Họa Và Hối Hận",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Carbine.png",
    "isStandard": false
  },
  {
    "name": "Elegy for the End",
    "nameVi": "Tiếng Thở Dài Vô Tận",
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Widsith.png",
    "isStandard": false
  },
  {
    "name": "Engulfing Lightning",
    "nameVi": "Đoạn Thảo Trường Đao",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Narukami.png",
    "isStandard": false
  },
  {
    "name": "Everlasting Moonglow",
    "nameVi": "Vầng Trăng Bất Diệt",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Kaleido.png",
    "isStandard": false
  },
  {
    "name": "Exaiphanes Blade",
    "nameVi": "Thanh Kiếm Exaiphanes",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_WeaponQuestSnezhnaya.png",
    "isStandard": false
  },
  {
    "name": "Fang of the Mountain King",
    "nameVi": "Nanh Sơn Vương",
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_EmeraldSword.png",
    "isStandard": false
  },
  {
    "name": "Fractured Halo",
    "nameVi": "Hào Quang Tách Rời",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Perdix.png",
    "isStandard": false
  },
  {
    "name": "Freedom-Sworn",
    "nameVi": "Lời Thề Tự Do Cổ Xưa",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Widsith.png",
    "isStandard": false
  },
  {
    "name": "Gest of the Mighty Wolf",
    "nameVi": "Chiến Hùng Ca Của Sói",
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_EnsisAquilonis.png",
    "isStandard": false
  },
  {
    "name": "Golden Frostbound Oath",
    "nameVi": "Lời Thề Vàng Sương Giá",
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Alkonost.png",
    "isStandard": false
  },
  {
    "name": "Haran Geppaku Futsu",
    "nameVi": "Haran Geppaku Futsu",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Amenoma.png",
    "isStandard": false
  },
  {
    "name": "Hunter's Path",
    "nameVi": "Con Đường Thợ Săn",
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Ayus.png",
    "isStandard": false
  },
  {
    "name": "Hymn of the Maelstrom",
    "nameVi": "Thánh Ca Vòng Xoáy",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Bludnye.png",
    "isStandard": false
  },
  {
    "name": "Jadefall's Splendor",
    "nameVi": "Ngọc Bích Huy Hoàng",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Morax.png",
    "isStandard": false
  },
  {
    "name": "Kagura's Verity",
    "nameVi": "Chân Ý Của Kagura",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Narukami.png",
    "isStandard": false
  },
  {
    "name": "Key of Khaj-Nisut",
    "nameVi": "Chìa Khóa Khaj-Nisut",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Deshret.png",
    "isStandard": false
  },
  {
    "name": "Light of Foliar Incision",
    "nameVi": "Ánh Lá Phán Quyết",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Ayus.png",
    "isStandard": false
  },
  {
    "name": "Lightbearing Moonshard",
    "nameVi": "Mảnh Trăng Ánh Sáng",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_SilverwareSaw.png",
    "isStandard": false
  },
  {
    "name": "Lost Prayer to the Sacred Winds",
    "nameVi": "Điển Tích Tây Phong",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Fourwinds.png",
    "isStandard": true
  },
  {
    "name": "Lumidouce Elegy",
    "nameVi": "Bi Ca Lumidouce",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Muguet.png",
    "isStandard": false
  },
  {
    "name": "Memory of Dust",
    "nameVi": "Khóa Trần Thế",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Kunwu.png",
    "isStandard": false
  },
  {
    "name": "Mistsplitter Reforged",
    "nameVi": "Ánh Sáng Đêm Sương Mù",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Narukami.png",
    "isStandard": false
  },
  {
    "name": "Nightweaver's Looking Glass",
    "nameVi": "Kính Dệt Màn Đêm",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_MenulisRing.png",
    "isStandard": false
  },
  {
    "name": "Nocturne's Curtain Call",
    "nameVi": "Dạ Khúc Hạ Màn",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Brisingamen.png",
    "isStandard": false
  },
  {
    "name": "Peak Patrol Song",
    "nameVi": "Khúc Ca Núi Đá",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_XochitlsTube.png",
    "isStandard": false
  },
  {
    "name": "Polar Star",
    "nameVi": "Ngôi Sao Cực Đông",
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Worldbane.png",
    "isStandard": false
  },
  {
    "name": "Primordial Jade Cutter",
    "nameVi": "Bàn Nham Kết Lục",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Morax.png",
    "isStandard": false
  },
  {
    "name": "Primordial Jade Winged-Spear",
    "nameVi": "Hòa Phác Diên",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Morax.png",
    "isStandard": true
  },
  {
    "name": "Redhorn Stonethresher",
    "nameVi": "Xích Giác Phá Thạch Đao",
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Itadorimaru.png",
    "isStandard": false
  },
  {
    "name": "Reliquary of Truth",
    "nameVi": "Chân Ngôn Bí Hạp",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Sistrum.png",
    "isStandard": false
  },
  {
    "name": "Silvershower Heartstrings",
    "nameVi": "Màn Mưa Tơ Lòng",
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Arcdange.png",
    "isStandard": false
  },
  {
    "name": "Skyward Atlas",
    "nameVi": "Quyển Thiên Không",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Dvalin.png",
    "isStandard": true
  },
  {
    "name": "Skyward Blade",
    "nameVi": "Thiên Không Kiếm",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Dvalin.png",
    "isStandard": true
  },
  {
    "name": "Skyward Harp",
    "nameVi": "Cánh Thiên Không",
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Dvalin.png",
    "isStandard": true
  },
  {
    "name": "Skyward Pride",
    "nameVi": "Thiên Không Kiêu Ngạo",
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Dvalin.png",
    "isStandard": true
  },
  {
    "name": "Skyward Spine",
    "nameVi": "Xương Sống Thiên Không",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Dvalin.png",
    "isStandard": true
  },
  {
    "name": "Song of Broken Pines",
    "nameVi": "Tiếng Gió Trong Rừng Thông",
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Widsith.png",
    "isStandard": false
  },
  {
    "name": "Splendor of Tranquil Waters",
    "nameVi": "Sắc Nước Lộng Lẫy",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Regalis.png",
    "isStandard": false
  },
  {
    "name": "Staff of Homa",
    "nameVi": "Trượng Hộ Ma",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Homa.png",
    "isStandard": false
  },
  {
    "name": "Staff of the Scarlet Sands",
    "nameVi": "Quyền Trượng Cát Đỏ",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Deshret.png",
    "isStandard": false
  },
  {
    "name": "Starcaller's Watch",
    "nameVi": "Ánh Nhìn Tư Tế",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Figurines.png",
    "isStandard": false
  },
  {
    "name": "Summit Shaper",
    "nameVi": "Kiếm Chước Phong",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Kunwu.png",
    "isStandard": false
  },
  {
    "name": "Sunny Morning Sleep-In",
    "nameVi": "Hòa Giấc Trong Nắng Mai",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_SakuraFan.png",
    "isStandard": false
  },
  {
    "name": "Surf's Up",
    "nameVi": "Thời Khắc Lướt Sóng",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_MechaPufferfish.png",
    "isStandard": false
  },
  {
    "name": "Symphonist of Scents",
    "nameVi": "Nhạc Sĩ Hương Thơm",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Trident.png",
    "isStandard": false
  },
  {
    "name": "The Daybreak Chronicles",
    "nameVi": "Biên Niên Sử Bình Minh",
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Arianna.png",
    "isStandard": false
  },
  {
    "name": "The First Great Magic",
    "nameVi": "Màn Ảo Thuật Đầu Tiên",
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Pledge.png",
    "isStandard": false
  },
  {
    "name": "The Unforged",
    "nameVi": "Kiếm Vô Công",
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Kunwu.png",
    "isStandard": false
  },
  {
    "name": "Thundering Pulse",
    "nameVi": "Sấm Sét Rung Động",
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Narukami.png",
    "isStandard": false
  },
  {
    "name": "Tome of the Eternal Flow",
    "nameVi": "Nghi Thức Dòng Chảy Vĩnh Hằng",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Iudex.png",
    "isStandard": false
  },
  {
    "name": "Tulaytullah's Remembrance",
    "nameVi": "Hồi Ức Tulaytullah",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Alaya.png",
    "isStandard": false
  },
  {
    "name": "Uraku Misugiri",
    "nameVi": "Uraku Misugiri",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Needle.png",
    "isStandard": false
  },
  {
    "name": "Verdict",
    "nameVi": "Phán Quyết",
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_GoldenVerdict.png",
    "isStandard": false
  },
  {
    "name": "Vivid Notions",
    "nameVi": "Tâm Niệm Sắc Màu",
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_VaresaTransformer.png",
    "isStandard": false
  },
  {
    "name": "Vortex Vanquisher",
    "nameVi": "Giáo Nịnh Thần",
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Kunwu.png",
    "isStandard": false
  },
  {
    "name": "Whitelake Frostfeather",
    "nameVi": "Bạch Hồ Đông Vũ",
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Swanlake.png",
    "isStandard": false
  },
  {
    "name": "Wolf's Gravestone",
    "nameVi": "Đường Cùng Của Sói",
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Wolfmound.png",
    "isStandard": true
  }
];

// 5-Star only aliases
export const GACHA_ALL_CHARACTERS = GACHA_5STAR_CHARACTERS;
export const GACHA_ALL_WEAPONS = GACHA_5STAR_WEAPONS;
