export type TaskCategory = 'character' | 'weapon' | 'artifact' | 'boss' | 'custom';

export type ElementType = 'pyro' | 'hydro' | 'anemo' | 'electro' | 'dendro' | 'cryo' | 'geo';

export interface FarmMaterial {
  materialName: string;
  materialType: 'talent' | 'weapon' | 'boss' | 'weekly_boss' | 'artifact' | 'custom';
  domainName?: string;
  region?: string;
  daysOfWeek: number[]; // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat. (0 is Sunday, all open)
  resinCost: number; // 20 for domain/artifact, 40 for world boss, 30/60 for weekly boss
  currentCount?: number;
  targetCount?: number;
}

export interface TaskGoal {
  id: string;
  title: string;
  category: TaskCategory;
  description?: string;
  
  // Target identity
  targetName?: string;
  targetAvatar?: string;
  element?: ElementType;
  rarity?: 4 | 5;
  
  // Farm & Schedule details
  farmTarget?: FarmMaterial;
  
  // Stack ordering & state
  order: number; // 0 is top of stack (highest priority)
  isCompleted: boolean;
  createdAt: number;
  completedAt?: number;
  
  notes?: string;
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
  talentDays: number[]; // e.g. [1, 4, 0]
  weeklyBossMat: string;
  avatarUrl: string;
}

export interface WeaponPreset {
  name: string;
  nameVi: string;
  rarity: 4 | 5;
  type: 'sword' | 'claymore' | 'polearm' | 'bow' | 'catalyst';
  ascensionMat: string;
  domainName: string;
  daysOfWeek: number[]; // e.g. [2, 5, 0]
  avatarUrl: string;
}
