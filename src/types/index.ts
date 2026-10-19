export type TaskCategory = 'character' | 'weapon' | 'artifact' | 'boss' | 'custom';

export type ElementType = 'pyro' | 'hydro' | 'anemo' | 'electro' | 'dendro' | 'cryo' | 'geo';

export type NavigationMenu = 'timeline' | 'characters' | 'completed';

export interface FarmMaterial {
  materialName: string;
  materialType: 'talent' | 'weapon' | 'boss' | 'weekly_boss' | 'artifact' | 'custom';
  domainName?: string;
  region?: string;
  daysOfWeek: number[]; // 0: Sun, 1: Mon, ... 6: Sat
  resinCost: number;
  currentCount?: number;
  targetCount?: number;
}

export interface TaskGoal {
  id: string;
  title: string;
  category: TaskCategory;
  description?: string;
  targetName?: string;
  targetAvatar?: string;
  element?: ElementType;
  rarity?: 4 | 5;
  farmTarget?: FarmMaterial;
  order: number;
  isCompleted: boolean;
  createdAt: number;
  completedAt?: number;
  notes?: string;
}


export interface UserCharacter {
  id: string;
  name: string;
  nameVi: string;
  element: ElementType;
  rarity: 4 | 5;
  icon: string;
  image?: string;
  level: number;
  maxLevel: number;
  constellation: number;
  fetter: number;
  weapon?: {
    name: string;
    icon: string;
    rarity: number;
    level: number;
    affixLevel: number;
    typeName: string;
    domainDays?: number[];
    materialName?: string;
  };
  relics?: Array<{
    name: string;
    icon: string;
    posName: string;
    rarity: number;
    level: number;
    setName: string;
  }>;
  talents?: {
    attack: number;
    skill: number;
    burst: number;
  };
  talentBook: string;
  talentDomain: string;
  talentDays: number[];
  weeklyBossMat: string;
  worldBossMat: string;
  localSpecialty: string;
  isExactInGameData?: boolean;
}

export interface ArtifactPieceItem {
  slotKey: 'flower' | 'plume' | 'sands' | 'goblet' | 'circlet';
  slotName: string;
  level: number;
  isOptimized: boolean;
}

export const DEFAULT_ARTIFACT_PIECES: ArtifactPieceItem[] = [
  { slotKey: 'flower', slotName: 'Hoa Sự Sống', level: 20, isOptimized: false },
  { slotKey: 'plume', slotName: 'Lông Vũ Tử Thần', level: 20, isOptimized: false },
  { slotKey: 'sands', slotName: 'Cát Thời Gian', level: 20, isOptimized: false },
  { slotKey: 'goblet', slotName: 'Ly Không Gian', level: 20, isOptimized: false },
  { slotKey: 'circlet', slotName: 'Nón Lý Trí', level: 20, isOptimized: false },
];

export interface CharacterBranchTree {
  id: string;
  characterId: string;
  characterName: string;
  avatarUrl: string;
  element: ElementType;
  rarity: 4 | 5;
  constellation?: number;
  level?: number;
  order: number;
  isCompleted: boolean;
  createdAt: number;
  completedAt?: number;
  
  // 4 Main Branches
  levelBranch: {
    currentLevel: number;
    targetLevel: number;
    heroWitNeeded: number;
    moraNeeded: number;
    bossDropNeeded: number;
    specialtyNeeded: number;
    worldBossMat: string;
    localSpecialty: string;
    isCompleted: boolean;
  };

  weaponBranch: {
    weaponName: string;
    weaponIcon?: string;
    currentLevel: number;
    targetLevel: number;
    materialName: string;
    daysOfWeek: number[];
    isCompleted: boolean;
  };

  talentBranch: {
    talentBookName: string;
    domainName: string;
    daysOfWeek: number[];
    weeklyBossMatName: string;
    currentLevels: { attack: number; skill: number; burst: number };
    targetLevels: { attack: number; skill: number; burst: number };
    booksGoldNeeded: number;
    weeklyBossMatsNeeded: number;
    crownsNeeded: number;
    isCompleted: boolean;
  };

  artifactBranch: {
    setName: string;
    domainName?: string;
    recommendPieces: string[];
    isCompleted: boolean;
    pieces?: ArtifactPieceItem[];
  };
}

export interface HoyoDailyNote {
  current_resin: number;
  max_resin: number;
  resin_recovery_time: string; // in seconds
  finished_task_num: number;
  total_task_num: number;
  is_extra_task_reward_received: boolean;
  remain_resin_discount_num: number;
  resin_discount_num_limit: number;
  current_home_coin: number;
  max_home_coin: number;
  home_coin_recovery_time: string;
  current_expedition_num?: number;
  max_expedition_num?: number;
  expeditions?: Array<{
    avatar_side_icon: string;
    status: 'Ongoing' | 'Finished';
    remained_time: string;
  }>;
  transformer?: {
    obtained: boolean;
    recovery_time?: {
      Day: number;
      Hour: number;
      Minute: number;
      Second: number;
      reached: boolean;
    };
  };
}

export interface CharacterPreset {
  name: string;
  nameVi: string;
  element: ElementType;
  rarity: 4 | 5;
  weaponType: 'sword' | 'claymore' | 'polearm' | 'bow' | 'catalyst';
  talentBook: string;
  talentDomain: string;
  talentDays: number[];
  weeklyBossMat: string;
  worldBossMat?: string;
  localSpecialty?: string;
  avatarUrl: string;
}

export interface WeaponPreset {
  name: string;
  nameVi: string;
  rarity: 4 | 5;
  type: 'sword' | 'claymore' | 'polearm' | 'bow' | 'catalyst';
  ascensionMat: string;
  domainName: string;
  daysOfWeek: number[];
  avatarUrl: string;
}
