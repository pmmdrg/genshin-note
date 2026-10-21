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
  rarity?: 4 | 5;
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


export interface GachaItemOption {
  name: string;
  nameVi: string;
  rarity: 4 | 5;
  element?: string;
  weaponType: string;
  avatarUrl: string;
  isStandard: boolean;
}

export const GACHA_ALL_CHARACTERS: GachaItemOption[] = [
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
  },
  {
    "name": "Aino",
    "nameVi": "Aino",
    "element": "hydro",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Aino.png",
    "isStandard": false
  },
  {
    "name": "Alyosha",
    "nameVi": "Alyosha",
    "element": "electro",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Alyosha.png",
    "isStandard": false
  },
  {
    "name": "Amber",
    "nameVi": "Amber",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ambor.png",
    "isStandard": false
  },
  {
    "name": "Barbara",
    "nameVi": "Barbara",
    "element": "hydro",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Barbara.png",
    "isStandard": false
  },
  {
    "name": "Beidou",
    "nameVi": "Beidou",
    "element": "electro",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Beidou.png",
    "isStandard": false
  },
  {
    "name": "Bennett",
    "nameVi": "Bennett",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Bennett.png",
    "isStandard": false
  },
  {
    "name": "Candace",
    "nameVi": "Candace",
    "element": "hydro",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Candace.png",
    "isStandard": false
  },
  {
    "name": "Charlotte",
    "nameVi": "Charlotte",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Charlotte.png",
    "isStandard": false
  },
  {
    "name": "Chevreuse",
    "nameVi": "Chevreuse",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Chevreuse.png",
    "isStandard": false
  },
  {
    "name": "Chongyun",
    "nameVi": "Chongyun",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Chongyun.png",
    "isStandard": false
  },
  {
    "name": "Collei",
    "nameVi": "Collei",
    "element": "dendro",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Collei.png",
    "isStandard": false
  },
  {
    "name": "Dahlia",
    "nameVi": "Dahlia",
    "element": "hydro",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Dahlia.png",
    "isStandard": false
  },
  {
    "name": "Diona",
    "nameVi": "Diona",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Diona.png",
    "isStandard": false
  },
  {
    "name": "Dori",
    "nameVi": "Dori",
    "element": "electro",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Dori.png",
    "isStandard": false
  },
  {
    "name": "Faruzan",
    "nameVi": "Faruzan",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Faruzan.png",
    "isStandard": false
  },
  {
    "name": "Fischl",
    "nameVi": "Fischl",
    "element": "electro",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Fischl.png",
    "isStandard": false
  },
  {
    "name": "Freminet",
    "nameVi": "Freminet",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Freminet.png",
    "isStandard": false
  },
  {
    "name": "Gaming",
    "nameVi": "Gaming",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Gaming.png",
    "isStandard": false
  },
  {
    "name": "Gorou",
    "nameVi": "Gorou",
    "element": "geo",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Gorou.png",
    "isStandard": false
  },
  {
    "name": "Iansan",
    "nameVi": "Iansan",
    "element": "electro",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Iansan.png",
    "isStandard": false
  },
  {
    "name": "Ifa",
    "nameVi": "Ifa",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ifa.png",
    "isStandard": false
  },
  {
    "name": "Illuga",
    "nameVi": "Illuga",
    "element": "geo",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Illuga.png",
    "isStandard": false
  },
  {
    "name": "Jahoda",
    "nameVi": "Jahoda",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Jahoda.png",
    "isStandard": false
  },
  {
    "name": "Kachina",
    "nameVi": "Kachina",
    "element": "geo",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Kachina.png",
    "isStandard": false
  },
  {
    "name": "Kaeya",
    "nameVi": "Kaeya",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Kaeya.png",
    "isStandard": false
  },
  {
    "name": "Kaveh",
    "nameVi": "Kaveh",
    "element": "dendro",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Kaveh.png",
    "isStandard": false
  },
  {
    "name": "Kirara",
    "nameVi": "Kirara",
    "element": "dendro",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Momoka.png",
    "isStandard": false
  },
  {
    "name": "Kujou Sara",
    "nameVi": "Kujou Sara",
    "element": "electro",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Sara.png",
    "isStandard": false
  },
  {
    "name": "Kuki Shinobu",
    "nameVi": "Kuki Shinobu",
    "element": "electro",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Shinobu.png",
    "isStandard": false
  },
  {
    "name": "Lan Yan",
    "nameVi": "Lan Yan",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Lanyan.png",
    "isStandard": false
  },
  {
    "name": "Layla",
    "nameVi": "Layla",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Layla.png",
    "isStandard": false
  },
  {
    "name": "Lisa",
    "nameVi": "Lisa",
    "element": "electro",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Lisa.png",
    "isStandard": false
  },
  {
    "name": "Lynette",
    "nameVi": "Lynette",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Linette.png",
    "isStandard": false
  },
  {
    "name": "Mika",
    "nameVi": "Mika",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Mika.png",
    "isStandard": false
  },
  {
    "name": "Ningguang",
    "nameVi": "Ningguang",
    "element": "geo",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Ningguang.png",
    "isStandard": false
  },
  {
    "name": "Noelle",
    "nameVi": "Noelle",
    "element": "geo",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Noel.png",
    "isStandard": false
  },
  {
    "name": "Ororon",
    "nameVi": "Ororon",
    "element": "electro",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Olorun.png",
    "isStandard": false
  },
  {
    "name": "Prune",
    "nameVi": "Prune",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Prune.png",
    "isStandard": false
  },
  {
    "name": "Razor",
    "nameVi": "Razor",
    "element": "electro",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Razor.png",
    "isStandard": false
  },
  {
    "name": "Rosaria",
    "nameVi": "Rosaria",
    "element": "cryo",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Rosaria.png",
    "isStandard": false
  },
  {
    "name": "Sayu",
    "nameVi": "Sayu",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Sayu.png",
    "isStandard": false
  },
  {
    "name": "Sethos",
    "nameVi": "Sethos",
    "element": "electro",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Sethos.png",
    "isStandard": false
  },
  {
    "name": "Shikanoin Heizou",
    "nameVi": "Shikanoin Heizou",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Heizo.png",
    "isStandard": false
  },
  {
    "name": "Sucrose",
    "nameVi": "Sucrose",
    "element": "anemo",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Sucrose.png",
    "isStandard": false
  },
  {
    "name": "Thoma",
    "nameVi": "Thoma",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Tohma.png",
    "isStandard": false
  },
  {
    "name": "Xiangling",
    "nameVi": "Xiangling",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Xiangling.png",
    "isStandard": false
  },
  {
    "name": "Xingqiu",
    "nameVi": "Xingqiu",
    "element": "hydro",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Xingqiu.png",
    "isStandard": false
  },
  {
    "name": "Xinyan",
    "nameVi": "Xinyan",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Xinyan.png",
    "isStandard": false
  },
  {
    "name": "Yanfei",
    "nameVi": "Yanfei",
    "element": "pyro",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Feiyan.png",
    "isStandard": false
  },
  {
    "name": "Yaoyao",
    "nameVi": "Yaoyao",
    "element": "dendro",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Yaoyao.png",
    "isStandard": false
  },
  {
    "name": "Yun Jin",
    "nameVi": "Yun Jin",
    "element": "geo",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_AvatarIcon_Yunjin.png",
    "isStandard": false
  }
];

export const GACHA_ALL_WEAPONS: GachaItemOption[] = [
  {
    "name": "Light of Foliar Incision",
    "nameVi": "Ánh Lá Phán Quyết",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Ayus.png",
    "isStandard": false
  },
  {
    "name": "Starcaller's Watch",
    "nameVi": "Ánh Nhìn Tư Tế",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Figurines.png",
    "isStandard": false
  },
  {
    "name": "Mistsplitter Reforged",
    "nameVi": "Ánh Sáng Đêm Sương Mù",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Narukami.png",
    "isStandard": false
  },
  {
    "name": "Whitelake Frostfeather",
    "nameVi": "Bạch Hồ Đông Vũ",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Swanlake.png",
    "isStandard": false
  },
  {
    "name": "Primordial Jade Cutter",
    "nameVi": "Bàn Nham Kết Lục",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Morax.png",
    "isStandard": false
  },
  {
    "name": "Lumidouce Elegy",
    "nameVi": "Bi Ca Lumidouce",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Muguet.png",
    "isStandard": false
  },
  {
    "name": "The Daybreak Chronicles",
    "nameVi": "Biên Niên Sử Bình Minh",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Arianna.png",
    "isStandard": false
  },
  {
    "name": "Beyond the Chrysalis",
    "nameVi": "Cánh Bướm Biến Hóa",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Samosvist.png",
    "isStandard": false
  },
  {
    "name": "Skyward Harp",
    "nameVi": "Cánh Thiên Không",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Dvalin.png",
    "isStandard": true
  },
  {
    "name": "Reliquary of Truth",
    "nameVi": "Chân Ngôn Bí Hạp",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Sistrum.png",
    "isStandard": false
  },
  {
    "name": "Kagura's Verity",
    "nameVi": "Chân Ý Của Kagura",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Narukami.png",
    "isStandard": false
  },
  {
    "name": "Key of Khaj-Nisut",
    "nameVi": "Chìa Khóa Khaj-Nisut",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Deshret.png",
    "isStandard": false
  },
  {
    "name": "Gest of the Mighty Wolf",
    "nameVi": "Chiến Hùng Ca Của Sói",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_EnsisAquilonis.png",
    "isStandard": false
  },
  {
    "name": "A Thousand Floating Dreams",
    "nameVi": "Cõi Mộng Ngàn Đêm",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Ayus.png",
    "isStandard": false
  },
  {
    "name": "Hunter's Path",
    "nameVi": "Con Đường Thợ Săn",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Ayus.png",
    "isStandard": false
  },
  {
    "name": "Amos' Bow",
    "nameVi": "Cung Amos",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Amos.png",
    "isStandard": true
  },
  {
    "name": "Nocturne's Curtain Call",
    "nameVi": "Dạ Khúc Hạ Màn",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Brisingamen.png",
    "isStandard": false
  },
  {
    "name": "Crane's Echoing Call",
    "nameVi": "Dư Âm Tiếng Hạc",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_MountainGale.png",
    "isStandard": false
  },
  {
    "name": "Lost Prayer to the Sacred Winds",
    "nameVi": "Điển Tích Tây Phong",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Fourwinds.png",
    "isStandard": true
  },
  {
    "name": "Engulfing Lightning",
    "nameVi": "Đoạn Thảo Trường Đao",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Narukami.png",
    "isStandard": false
  },
  {
    "name": "Wolf's Gravestone",
    "nameVi": "Đường Cùng Của Sói",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Wolfmound.png",
    "isStandard": true
  },
  {
    "name": "Vortex Vanquisher",
    "nameVi": "Giáo Nịnh Thần",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Kunwu.png",
    "isStandard": false
  },
  {
    "name": "Beacon of the Reed Sea",
    "nameVi": "Hải Đăng Bờ Biển Lau",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Deshret.png",
    "isStandard": false
  },
  {
    "name": "Fractured Halo",
    "nameVi": "Hào Quang Tách Rời",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Perdix.png",
    "isStandard": false
  },
  {
    "name": "Haran Geppaku Futsu",
    "nameVi": "Haran Geppaku Futsu",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Amenoma.png",
    "isStandard": false
  },
  {
    "name": "Athame Artis",
    "nameVi": "Hắc Ám Xâm Thực",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Motsognir.png",
    "isStandard": false
  },
  {
    "name": "Crimson Moon's Semblance",
    "nameVi": "Hình Thái Xích Nguyệt",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_BloodMoon.png",
    "isStandard": false
  },
  {
    "name": "Sunny Morning Sleep-In",
    "nameVi": "Hòa Giấc Trong Nắng Mai",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_SakuraFan.png",
    "isStandard": false
  },
  {
    "name": "Primordial Jade Winged-Spear",
    "nameVi": "Hòa Phác Diên",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Morax.png",
    "isStandard": true
  },
  {
    "name": "Tulaytullah's Remembrance",
    "nameVi": "Hồi Ức Tulaytullah",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Alaya.png",
    "isStandard": false
  },
  {
    "name": "Calamity Queller",
    "nameVi": "Hủy Diệt",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Santika.png",
    "isStandard": false
  },
  {
    "name": "Memory of Dust",
    "nameVi": "Khóa Trần Thế",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Kunwu.png",
    "isStandard": false
  },
  {
    "name": "Peak Patrol Song",
    "nameVi": "Khúc Ca Núi Đá",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_XochitlsTube.png",
    "isStandard": false
  },
  {
    "name": "Summit Shaper",
    "nameVi": "Kiếm Chước Phong",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Kunwu.png",
    "isStandard": false
  },
  {
    "name": "The Unforged",
    "nameVi": "Kiếm Vô Công",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Kunwu.png",
    "isStandard": false
  },
  {
    "name": "Nightweaver's Looking Glass",
    "nameVi": "Kính Dệt Màn Đêm",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_MenulisRing.png",
    "isStandard": false
  },
  {
    "name": "Freedom-Sworn",
    "nameVi": "Lời Thề Tự Do Cổ Xưa",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Widsith.png",
    "isStandard": false
  },
  {
    "name": "Golden Frostbound Oath",
    "nameVi": "Lời Thề Vàng Sương Giá",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Alkonost.png",
    "isStandard": false
  },
  {
    "name": "The First Great Magic",
    "nameVi": "Màn Ảo Thuật Đầu Tiên",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Pledge.png",
    "isStandard": false
  },
  {
    "name": "Silvershower Heartstrings",
    "nameVi": "Màn Mưa Tơ Lòng",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Arcdange.png",
    "isStandard": false
  },
  {
    "name": "Lightbearing Moonshard",
    "nameVi": "Mảnh Trăng Ánh Sáng",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_SilverwareSaw.png",
    "isStandard": false
  },
  {
    "name": "A Teaspoon of Transcendence",
    "nameVi": "Muỗng Trà Siêu Việt",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_CrystallineSword.png",
    "isStandard": false
  },
  {
    "name": "Fang of the Mountain King",
    "nameVi": "Nanh Sơn Vương",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_EmeraldSword.png",
    "isStandard": false
  },
  {
    "name": "Tome of the Eternal Flow",
    "nameVi": "Nghi Thức Dòng Chảy Vĩnh Hằng",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Iudex.png",
    "isStandard": false
  },
  {
    "name": "Jadefall's Splendor",
    "nameVi": "Ngọc Bích Huy Hoàng",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Morax.png",
    "isStandard": false
  },
  {
    "name": "Polar Star",
    "nameVi": "Ngôi Sao Cực Đông",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Worldbane.png",
    "isStandard": false
  },
  {
    "name": "Symphonist of Scents",
    "nameVi": "Nhạc Sĩ Hương Thơm",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Trident.png",
    "isStandard": false
  },
  {
    "name": "Aqua Simulacra",
    "nameVi": "Nhược Thủy",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Kirin.png",
    "isStandard": false
  },
  {
    "name": "Verdict",
    "nameVi": "Phán Quyết",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_GoldenVerdict.png",
    "isStandard": false
  },
  {
    "name": "Aquila Favonia",
    "nameVi": "Phong Ưng Kiếm",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Falcon.png",
    "isStandard": true
  },
  {
    "name": "Cashflow Supervision",
    "nameVi": "Quản Đốc Vàng Ròng",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Wheatley.png",
    "isStandard": false
  },
  {
    "name": "Skyward Atlas",
    "nameVi": "Quyển Thiên Không",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Dvalin.png",
    "isStandard": true
  },
  {
    "name": "Staff of the Scarlet Sands",
    "nameVi": "Quyền Trượng Cát Đỏ",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Deshret.png",
    "isStandard": false
  },
  {
    "name": "Splendor of Tranquil Waters",
    "nameVi": "Sắc Nước Lộng Lẫy",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Regalis.png",
    "isStandard": false
  },
  {
    "name": "Thundering Pulse",
    "nameVi": "Sấm Sét Rung Động",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Narukami.png",
    "isStandard": false
  },
  {
    "name": "Disaster and Remorse",
    "nameVi": "Tai Họa Và Hối Hận",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Carbine.png",
    "isStandard": false
  },
  {
    "name": "Bloodsoaked Ruins",
    "nameVi": "Tàn Tích Nhuốm Máu",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_TummaLyhty.png",
    "isStandard": false
  },
  {
    "name": "Vivid Notions",
    "nameVi": "Tâm Niệm Sắc Màu",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_VaresaTransformer.png",
    "isStandard": false
  },
  {
    "name": "Hymn of the Maelstrom",
    "nameVi": "Thánh Ca Vòng Xoáy",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Bludnye.png",
    "isStandard": false
  },
  {
    "name": "Exaiphanes Blade",
    "nameVi": "Thanh Kiếm Exaiphanes",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_WeaponQuestSnezhnaya.png",
    "isStandard": false
  },
  {
    "name": "A Thousand Blazing Suns",
    "nameVi": "Thiên Dương Rực Lửa",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_RadianceSword.png",
    "isStandard": false
  },
  {
    "name": "Skyward Blade",
    "nameVi": "Thiên Không Kiếm",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Dvalin.png",
    "isStandard": true
  },
  {
    "name": "Skyward Pride",
    "nameVi": "Thiên Không Kiêu Ngạo",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Dvalin.png",
    "isStandard": true
  },
  {
    "name": "Surf's Up",
    "nameVi": "Thời Khắc Lướt Sóng",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_MechaPufferfish.png",
    "isStandard": false
  },
  {
    "name": "Azurelight",
    "nameVi": "Thương Diệu",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_OuterSword.png",
    "isStandard": false
  },
  {
    "name": "Song of Broken Pines",
    "nameVi": "Tiếng Gió Trong Rừng Thông",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Widsith.png",
    "isStandard": false
  },
  {
    "name": "Elegy for the End",
    "nameVi": "Tiếng Thở Dài Vô Tận",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Widsith.png",
    "isStandard": false
  },
  {
    "name": "Angelos' Heptades",
    "nameVi": "Trần Quang Thất Dụ",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_FairyGarden.png",
    "isStandard": false
  },
  {
    "name": "Staff of Homa",
    "nameVi": "Trượng Hộ Ma",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Homa.png",
    "isStandard": false
  },
  {
    "name": "Uraku Misugiri",
    "nameVi": "Uraku Misugiri",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Needle.png",
    "isStandard": false
  },
  {
    "name": "Everlasting Moonglow",
    "nameVi": "Vầng Trăng Bất Diệt",
    "rarity": 5,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Kaleido.png",
    "isStandard": false
  },
  {
    "name": "Absolution",
    "nameVi": "Xá Tội",
    "rarity": 5,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Estoc.png",
    "isStandard": false
  },
  {
    "name": "Redhorn Stonethresher",
    "nameVi": "Xích Giác Phá Thạch Đao",
    "rarity": 5,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Itadorimaru.png",
    "isStandard": false
  },
  {
    "name": "Astral Vulture's Crimson Plumage",
    "nameVi": "Xích Vũ Tinh Tựu",
    "rarity": 5,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Qoyllorsnova.png",
    "isStandard": false
  },
  {
    "name": "Skyward Spine",
    "nameVi": "Xương Sống Thiên Không",
    "rarity": 5,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Dvalin.png",
    "isStandard": true
  },
  {
    "name": "\"Ultimate Overlord's Mega Magic Sword\"",
    "nameVi": "\"Bá Vương Tối Thượng Siêu Cấp Ma Kiếm\"",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Champion.png",
    "isStandard": false
  },
  {
    "name": "Akuoumaru",
    "nameVi": "Akuoumaru",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Maria.png",
    "isStandard": false
  },
  {
    "name": "Mouun's Moon",
    "nameVi": "Ánh Trăng Mouun",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Maria.png",
    "isStandard": false
  },
  {
    "name": "Xiphos' Moonlight",
    "nameVi": "Ánh Trăng Xiphos",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Pleroma.png",
    "isStandard": false
  },
  {
    "name": "Windblume Ode",
    "nameVi": "Bài Ca Hoa Gió",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Fleurfair.png",
    "isStandard": false
  },
  {
    "name": "Moonweaver's Dawn",
    "nameVi": "Bình Minh Của Người Dệt Trăng",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Miekka.png",
    "isStandard": false
  },
  {
    "name": "Tidal Shadow",
    "nameVi": "Bóng Tối Thủy Triều",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Vorpal.png",
    "isStandard": false
  },
  {
    "name": "Song of the Vigil",
    "nameVi": "Ca Dao Hy Vọng",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_GlintstonePolearm.png",
    "isStandard": false
  },
  {
    "name": "New Bough",
    "nameVi": "Cành Mới",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_SpikedStake.png",
    "isStandard": false
  },
  {
    "name": "King's Squire",
    "nameVi": "Cận Vệ Nhà Vua",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Arakalari.png",
    "isStandard": false
  },
  {
    "name": "Master Key",
    "nameVi": "Chìa Khóa Vạn Năng",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Ilmarinen.png",
    "isStandard": false
  },
  {
    "name": "Eye of Perception",
    "nameVi": "Chiêu Tâm",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Truelens.png",
    "isStandard": false
  },
  {
    "name": "The Widsith",
    "nameVi": "Chương Nhạc Lang Thang",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Troupe.png",
    "isStandard": false
  },
  {
    "name": "Serenity's Call",
    "nameVi": "Còi Yên Tĩnh",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Ilmarinen.png",
    "isStandard": false
  },
  {
    "name": "Oathsworn Eye",
    "nameVi": "Con Ngươi Tuyên Thệ",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Jyanome.png",
    "isStandard": false
  },
  {
    "name": "Cinnabar Spindle",
    "nameVi": "Con Thoi Chu Sa",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Opus.png",
    "isStandard": false
  },
  {
    "name": "Blackcliff Warbow",
    "nameVi": "Cung Hắc Nham",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Blackrock.png",
    "isStandard": false
  },
  {
    "name": "Jade Vista",
    "nameVi": "Cung Huyền Lê",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_ShatteredMirror.png",
    "isStandard": false
  },
  {
    "name": "Rust",
    "nameVi": "Cung Rỉ Sét",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Recluse.png",
    "isStandard": false
  },
  {
    "name": "The Viridescent Hunt",
    "nameVi": "Cung Sắc Xanh",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Viridescent.png",
    "isStandard": false
  },
  {
    "name": "Favonius Warbow",
    "nameVi": "Cung Tây Phong",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Zephyrus.png",
    "isStandard": false
  },
  {
    "name": "Sacrificial Bow",
    "nameVi": "Cung Tế Lễ",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Fossil.png",
    "isStandard": false
  },
  {
    "name": "Compound Bow",
    "nameVi": "Cung Thép",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Exotic.png",
    "isStandard": false
  },
  {
    "name": "Hamayumi",
    "nameVi": "Cung Trừ Ma",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Bakufu.png",
    "isStandard": false
  },
  {
    "name": "Prized Isshin Blade",
    "nameVi": "Danh Đao \"Trường Phái Isshin\"",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_YoutouEnchanted.png",
    "isStandard": false
  },
  {
    "name": "Prized Isshin Blade",
    "nameVi": "Danh Đao \"Trường Phái Isshin\"",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_YoutouEnchanted.png",
    "isStandard": false
  },
  {
    "name": "Prized Isshin Blade",
    "nameVi": "Danh Đao \"Trường Phái Isshin\"",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_YoutouEnchanted.png",
    "isStandard": false
  },
  {
    "name": "Rainbow Serpent's Rain Bow",
    "nameVi": "Dây Mưa Của Cầu Vồng",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_ElegguaBow.png",
    "isStandard": false
  },
  {
    "name": "Flowing Purity",
    "nameVi": "Dòng Chảy Tinh Khiết",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Vorpal.png",
    "isStandard": false
  },
  {
    "name": "Echoes of the Heart",
    "nameVi": "Dư Âm Tấm Lòng",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_GlintstoneCatalyst.png",
    "isStandard": false
  },
  {
    "name": "Favonius Greatsword",
    "nameVi": "Đại Kiếm Tây Phong",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Zephyrus.png",
    "isStandard": false
  },
  {
    "name": "Sacrificial Greatsword",
    "nameVi": "Đại Kiếm Tế Lễ",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Fossil.png",
    "isStandard": false
  },
  {
    "name": "Royal Greatsword",
    "nameVi": "Đại Kiếm Tông Thất",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Theocrat.png",
    "isStandard": false
  },
  {
    "name": "Etherlight Spindlelute",
    "nameVi": "Đàn Thiên Quang",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_SeeliesLute.png",
    "isStandard": false
  },
  {
    "name": "Earth Shaker",
    "nameVi": "Đao Chấn Động",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Isikhulu.png",
    "isStandard": false
  },
  {
    "name": "Blackmarrow Lantern",
    "nameVi": "Đèn Tủy Đen",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Ilmarinen.png",
    "isStandard": false
  },
  {
    "name": "Mitternachts Waltz",
    "nameVi": "Điệu Van Ban Đêm",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Nachtblind.png",
    "isStandard": false
  },
  {
    "name": "Mailed Flower",
    "nameVi": "Đóa Hoa Tôn Màu Thép",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Fleurfair.png",
    "isStandard": false
  },
  {
    "name": "Amenoma Kageuchi",
    "nameVi": "Đoản Đao Amenoma",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Bakufu.png",
    "isStandard": false
  },
  {
    "name": "Dialogues of the Desert Sages",
    "nameVi": "Đối Thoại Của Hiền Giả Sa Mạc",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Caduceus.png",
    "isStandard": false
  },
  {
    "name": "Talking Stick",
    "nameVi": "Gậy Đàm Phán",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_BeastTamer.png",
    "isStandard": false
  },
  {
    "name": "Breezeborne Refrain",
    "nameVi": "Giai Điệu Gió Thoảng",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Windtalker.png",
    "isStandard": false
  },
  {
    "name": "Kitain Cross Spear",
    "nameVi": "Giáo Thập Tự Kitain",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Bakufu.png",
    "isStandard": false
  },
  {
    "name": "Mappa Mare",
    "nameVi": "Hải Đồ Vạn Quốc",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Exotic.png",
    "isStandard": false
  },
  {
    "name": "Frostbreath",
    "nameVi": "Hàn Khí",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_FaesCrystalle.png",
    "isStandard": false
  },
  {
    "name": "Blackcliff Agate",
    "nameVi": "Hắc Nham Phỉ Ngọc",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Blackrock.png",
    "isStandard": false
  },
  {
    "name": "Blackcliff Slasher",
    "nameVi": "Hắc Nham Trảm Đao",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Blackrock.png",
    "isStandard": false
  },
  {
    "name": "Blackcliff Longsword",
    "nameVi": "Hắc Nham Trường Kiếm",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Blackrock.png",
    "isStandard": false
  },
  {
    "name": "Scion of the Blazing Sun",
    "nameVi": "Hậu Duệ Mặt Trời",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Gurabad.png",
    "isStandard": false
  },
  {
    "name": "Kagotsurube Isshin",
    "nameVi": "Kagotsurube Isshin",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Youtou.png",
    "isStandard": false
  },
  {
    "name": "Predator",
    "nameVi": "Kẻ Săn Mồi",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Predator.png",
    "isStandard": false
  },
  {
    "name": "Song of Stillness",
    "nameVi": "Khúc Ca Tĩnh Lặng",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Vorpal.png",
    "isStandard": false
  },
  {
    "name": "Ballad of the Fjords",
    "nameVi": "Khúc Ca Vịnh Hẹp",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Shanty.png",
    "isStandard": false
  },
  {
    "name": "Ballad of the Boundless Blue",
    "nameVi": "Khúc Ca Xanh Bao La",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_DandelionPoem.png",
    "isStandard": false
  },
  {
    "name": "Whiteblind",
    "nameVi": "Kiếm Bạch Ảnh",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Exotic.png",
    "isStandard": false
  },
  {
    "name": "The Dockhand's Assistant",
    "nameVi": "Kiếm Bến Tàu",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Mechanic.png",
    "isStandard": false
  },
  {
    "name": "The Bell",
    "nameVi": "Kiếm Chuông",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Troupe.png",
    "isStandard": false
  },
  {
    "name": "The Black Sword",
    "nameVi": "Kiếm Đen",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Bloodstained.png",
    "isStandard": false
  },
  {
    "name": "Sword of Descension",
    "nameVi": "Kiếm Giáng Lâm",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Psalmus.png",
    "isStandard": false
  },
  {
    "name": "Sapwood Blade",
    "nameVi": "Kiếm Gỗ",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Arakalari.png",
    "isStandard": false
  },
  {
    "name": "Serpent Spine",
    "nameVi": "Kiếm Li Cốt",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Kione.png",
    "isStandard": false
  },
  {
    "name": "The Flute",
    "nameVi": "Kiếm Sáo",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Troupe.png",
    "isStandard": false
  },
  {
    "name": "Sacrificial Sword",
    "nameVi": "Kiếm Tế Lễ",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Fossil.png",
    "isStandard": false
  },
  {
    "name": "Forged by the Golden Melody",
    "nameVi": "Kim Luật Đúc Ảnh",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_EscapeWheel.png",
    "isStandard": false
  },
  {
    "name": "Fading Twilight",
    "nameVi": "Lạc Hà",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Fallensun.png",
    "isStandard": false
  },
  {
    "name": "\"The Catch\"",
    "nameVi": "Lao Xiên Cá",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Mori.png",
    "isStandard": false
  },
  {
    "name": "Flower-Wreathed Feathers",
    "nameVi": "Lông Vũ Thêu Hoa",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Umpakati.png",
    "isStandard": false
  },
  {
    "name": "Heretic's Molten Blade",
    "nameVi": "Lưỡi Kiếm Dung Luyện Dị Đoan",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_SerpentTooth.png",
    "isStandard": false
  },
  {
    "name": "Sword of Narzissenkreuz",
    "nameVi": "Lưỡi Kiếm Narzissenkreuz",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Purewill.png",
    "isStandard": false
  },
  {
    "name": "Crescent Pike",
    "nameVi": "Lưu Nguyệt Châm",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Exotic.png",
    "isStandard": false
  },
  {
    "name": "Sacrificial Fragments",
    "nameVi": "Mảnh Chương Tế Lễ",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Fossil.png",
    "isStandard": false
  },
  {
    "name": "Portable Power Saw",
    "nameVi": "Máy Cưa Cầm Tay",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Mechanic.png",
    "isStandard": false
  },
  {
    "name": "Range Gauge",
    "nameVi": "Máy Đo Cự Ly",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Mechanic.png",
    "isStandard": false
  },
  {
    "name": "Royal Grimoire",
    "nameVi": "Mật Pháp Tông Thất",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Theocrat.png",
    "isStandard": false
  },
  {
    "name": "Prototype Archaic",
    "nameVi": "Mẫu Cổ Hoa",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Proto.png",
    "isStandard": false
  },
  {
    "name": "Prototype Crescent",
    "nameVi": "Mẫu Đạm Nguyệt",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Proto.png",
    "isStandard": false
  },
  {
    "name": "Prototype Amber",
    "nameVi": "Mẫu Kim Phách",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Proto.png",
    "isStandard": false
  },
  {
    "name": "Prototype Starglitter",
    "nameVi": "Mẫu Tinh Liêm",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Proto.png",
    "isStandard": false
  },
  {
    "name": "Prototype Rancour",
    "nameVi": "Mẫu Trảm Nham",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Proto.png",
    "isStandard": false
  },
  {
    "name": "Ibis Piercer",
    "nameVi": "Mỏ Cò Xuyên Thấu",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Ibis.png",
    "isStandard": false
  },
  {
    "name": "Snare Hook",
    "nameVi": "Móc Cạm Bẫy",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Ilmarinen.png",
    "isStandard": false
  },
  {
    "name": "Fruitful Hook",
    "nameVi": "Móc Trĩu Quả",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Umpakati.png",
    "isStandard": false
  },
  {
    "name": "Mountain-Bracing Bolt",
    "nameVi": "Mũi Đinh Trấn Núi",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Umpakati.png",
    "isStandard": false
  },
  {
    "name": "Prospector's Drill",
    "nameVi": "Mũi Khoan Thăm Dò",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Mechanic.png",
    "isStandard": false
  },
  {
    "name": "Missive Windspear",
    "nameVi": "Mũi Nhọn Của Gió",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Windvane.png",
    "isStandard": false
  },
  {
    "name": "Wolf-Fang",
    "nameVi": "Nanh Sói",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Boreas.png",
    "isStandard": false
  },
  {
    "name": "Silver Light",
    "nameVi": "Ngân Cang",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Fajian.png",
    "isStandard": false
  },
  {
    "name": "Sacrificial Jade",
    "nameVi": "Ngọc Bích Hiến Tế",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Yue.png",
    "isStandard": false
  },
  {
    "name": "Emberwell",
    "nameVi": "Ngọn Nguồn Dẫn Lửa",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_GlintstoneSword.png",
    "isStandard": false
  },
  {
    "name": "Finale of the Deep",
    "nameVi": "Nhạc Khúc Biển Sâu",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Vorpal.png",
    "isStandard": false
  },
  {
    "name": "Blade of Atonement",
    "nameVi": "Nhát Chém Cứu Rỗi",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_GlintstoneClaymore.png",
    "isStandard": false
  },
  {
    "name": "Solar Pearl",
    "nameVi": "Nhật Nguyệt Hạp",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Resurrection.png",
    "isStandard": false
  },
  {
    "name": "Fleuve Cendre Ferryman",
    "nameVi": "Ống Đồng Fleuve Cendre",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Machination.png",
    "isStandard": false
  },
  {
    "name": "Chain Breaker",
    "nameVi": "Phá Xích",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Isikhulu.png",
    "isStandard": false
  },
  {
    "name": "Fruit of Fulfillment",
    "nameVi": "Quả Mọng",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Arakalari.png",
    "isStandard": false
  },
  {
    "name": "Moonpiercer",
    "nameVi": "Quán Nguyệt Thương",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Arakalari.png",
    "isStandard": false
  },
  {
    "name": "Sacrificer's Staff",
    "nameVi": "Quyền Trượng Kẻ Thánh Tế",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Krivule.png",
    "isStandard": false
  },
  {
    "name": "Festering Desire",
    "nameVi": "Răng Nanh Rỉ Sét",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Magnum.png",
    "isStandard": false
  },
  {
    "name": "Wine and Song",
    "nameVi": "Rượu Và Thơ Nơi Hẻm Tối",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Outlaw.png",
    "isStandard": false
  },
  {
    "name": "Wandering Evenstar",
    "nameVi": "Sao Đêm Rong Ruổi",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Pleroma.png",
    "isStandard": false
  },
  {
    "name": "Flute of Ezpitzal",
    "nameVi": "Sáo Ezpitzal",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Isikhulu.png",
    "isStandard": false
  },
  {
    "name": "Makhaira Aquamarine",
    "nameVi": "Sắc Nước Makhaira",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Pleroma.png",
    "isStandard": false
  },
  {
    "name": "End of the Line",
    "nameVi": "Sông Cạn",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Fin.png",
    "isStandard": false
  },
  {
    "name": "Ash-Graven Drinking Horn",
    "nameVi": "Sừng Rượu Vân Xanh",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_ConchSprayer.png",
    "isStandard": false
  },
  {
    "name": "Dawning Frost",
    "nameVi": "Sương Mai",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Ziedas.png",
    "isStandard": false
  },
  {
    "name": "Calamity of Eshu",
    "nameVi": "Tai Họa Eshu",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_SacrificialNgombe.png",
    "isStandard": false
  },
  {
    "name": "Dragon's Bane",
    "nameVi": "Tai Ương Của Rồng",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Stardust.png",
    "isStandard": false
  },
  {
    "name": "Tamayuratei no Ohanashi",
    "nameVi": "Tamayuratei no Ohanashi",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Aoandon.png",
    "isStandard": false
  },
  {
    "name": "Favonius Sword",
    "nameVi": "Tây Phong Kiếm",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Zephyrus.png",
    "isStandard": false
  },
  {
    "name": "Favonius Codex",
    "nameVi": "Tây Phong Mật Điển",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Zephyrus.png",
    "isStandard": false
  },
  {
    "name": "Sequence of Solitude",
    "nameVi": "Thanh Âm Lạnh Lẽo",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Stinger.png",
    "isStandard": false
  },
  {
    "name": "Covenant of Frost and Snow",
    "nameVi": "Thệ Ước Sương Tuyết",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_GlintstoneBow.png",
    "isStandard": false
  },
  {
    "name": "Lithic Blade",
    "nameVi": "Thiên Nham Cổ Kiếm",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Lapis.png",
    "isStandard": false
  },
  {
    "name": "Iron Sting",
    "nameVi": "Thiết Phong Kích",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Exotic.png",
    "isStandard": false
  },
  {
    "name": "Alley Hunter",
    "nameVi": "Thợ Săn Hẻm Tối",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Outlaw.png",
    "isStandard": false
  },
  {
    "name": "Rightful Reward",
    "nameVi": "Thù Lao Của Chính Nghĩa",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Vorpal.png",
    "isStandard": false
  },
  {
    "name": "Blackcliff Pole",
    "nameVi": "Thương Hắc Nham",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Blackrock.png",
    "isStandard": false
  },
  {
    "name": "Dragonspine Spear",
    "nameVi": "Thương Long Tích",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Everfrost.png",
    "isStandard": false
  },
  {
    "name": "Deathmatch",
    "nameVi": "Thương Quyết Chiến",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Gladiator.png",
    "isStandard": false
  },
  {
    "name": "Royal Spear",
    "nameVi": "Thương Săn Tông Thất",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Theocrat.png",
    "isStandard": false
  },
  {
    "name": "Favonius Lance",
    "nameVi": "Thương Tây Phong",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Zephyrus.png",
    "isStandard": false
  },
  {
    "name": "Lithic Spear",
    "nameVi": "Thương Thiên Nham",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Lapis.png",
    "isStandard": false
  },
  {
    "name": "The Alley Flash",
    "nameVi": "Tia Sáng Nơi Hẻm Tối",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Outlaw.png",
    "isStandard": false
  },
  {
    "name": "Lion's Roar",
    "nameVi": "Tiếng Hét Của Rồng",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Rockkiller.png",
    "isStandard": false
  },
  {
    "name": "Toukabou Shigure",
    "nameVi": "Toukabou Shigure",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Kasabouzu.png",
    "isStandard": false
  },
  {
    "name": "Frostbearer",
    "nameVi": "Trái Chịu Lạnh",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Everfrost.png",
    "isStandard": false
  },
  {
    "name": "Winter's Heavy Heart",
    "nameVi": "Trái Tim Ngưng Tuyết",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_FrostScepter.png",
    "isStandard": false
  },
  {
    "name": "Flame-Forged Insight",
    "nameVi": "Trí Tuệ Dung Luyện",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Polilith.png",
    "isStandard": false
  },
  {
    "name": "Clash of Kings",
    "nameVi": "Trò Chơi Của Các Nhà Vua",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_SandMemoria.png",
    "isStandard": false
  },
  {
    "name": "Cloudforged",
    "nameVi": "Trúc Vân",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Ultimatum.png",
    "isStandard": false
  },
  {
    "name": "Royal Bow",
    "nameVi": "Trường Cung Tông Thất",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Theocrat.png",
    "isStandard": false
  },
  {
    "name": "Katsuragikiri Nagamasa",
    "nameVi": "Trường Đao Katsuragi",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Bakufu.png",
    "isStandard": false
  },
  {
    "name": "Royal Longsword",
    "nameVi": "Trường Kiếm Tông Thất",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Theocrat.png",
    "isStandard": false
  },
  {
    "name": "Dodoco Tales",
    "nameVi": "Tuyển tập các câu chuyện về Dodoco",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Ludiharpastum.png",
    "isStandard": false
  },
  {
    "name": "The Stringless",
    "nameVi": "Tuyệt Huyền",
    "rarity": 4,
    "weaponType": "bow",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Bow_Troupe.png",
    "isStandard": false
  },
  {
    "name": "Snow-Tombed Starsilver",
    "nameVi": "Tuyết Vùi Tinh Ngân",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Dragonfell.png",
    "isStandard": false
  },
  {
    "name": "Wavebreaker's Fin",
    "nameVi": "Vây Cá Chẻ Sóng",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Maria.png",
    "isStandard": false
  },
  {
    "name": "Footprint of the Rainbow",
    "nameVi": "Vết Tích Cầu Vồng",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Isikhulu.png",
    "isStandard": false
  },
  {
    "name": "Hakushin Ring",
    "nameVi": "Vòng Bạch Thần",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Bakufu.png",
    "isStandard": false
  },
  {
    "name": "Waveriding Whirl",
    "nameVi": "Vòng Xoáy Cưỡi Sóng",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Umpakati.png",
    "isStandard": false
  },
  {
    "name": "Ring of Yaxche",
    "nameVi": "Vòng Yaxche",
    "rarity": 4,
    "weaponType": "catalyst",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Catalyst_Isikhulu.png",
    "isStandard": false
  },
  {
    "name": "Rainslasher",
    "nameVi": "Vũ Tài",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Perdue.png",
    "isStandard": false
  },
  {
    "name": "Luxurious Sea-Lord",
    "nameVi": "Vua Biển Hàng Hiệu",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_MillenniaTuna.png",
    "isStandard": false
  },
  {
    "name": "Forest Regalia",
    "nameVi": "Vương Khí Rừng Sâu",
    "rarity": 4,
    "weaponType": "claymore",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Claymore_Arakalari.png",
    "isStandard": false
  },
  {
    "name": "Prospector's Shovel",
    "nameVi": "Xẻng Đào Vàng",
    "rarity": 4,
    "weaponType": "polearm",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Pole_Ilmarinen.png",
    "isStandard": false
  },
  {
    "name": "Sturdy Bone",
    "nameVi": "Xương Cứng",
    "rarity": 4,
    "weaponType": "sword",
    "avatarUrl": "https://enka.network/ui/UI_EquipIcon_Sword_Umpakati.png",
    "isStandard": false
  }
];
