import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { TaskGoal, HoyoDailyNote, UserCharacter, CharacterBranchTree, NavigationMenu, ArtifactPieceItem } from '../types';
import { DEFAULT_ARTIFACT_PIECES } from '../types';
import { USER_CHARACTERS_PRESET, CHARACTERS_DATA } from '../data/genshinData';
import { getCharacterDefaultBuild } from '../data/characterEquipData';
import { calculateLevelTo90Cost, calculateTalentCost } from '../utils/calculator';

interface AppState {
  // Navigation Menu
  activeNav: NavigationMenu;
  setActiveNav: (nav: NavigationMenu) => void;

  // Character Roster
  characters: UserCharacter[];
  selectedCharacterId: string;
  setSelectedCharacterId: (id: string) => void;
  characterFetchLoading: boolean;
  fetchCharactersFromHoyo: () => Promise<void>;
  updateCharacterCustomData: (charId: string, updates: {
    weaponName?: string;
    weaponLevel?: number;
    weaponAffix?: number;
    talents?: { attack: number; skill: number; burst: number };
    relicSetName?: string;
  }) => void;

  // Character Branch Trees (Việc Cần Làm / Timeline)
  characterTrees: CharacterBranchTree[];
  addCharacterToTimeline: (character: UserCharacter) => void;
  reorderCharacterTrees: (activeId: string, overId: string) => void;
  toggleBranchComplete: (treeId: string, branchKey: 'levelBranch' | 'weaponBranch' | 'talentBranch' | 'artifactBranch') => void;
  updateTreeLevel: (treeId: string, newLevel: number) => void;
  updateTreeWeaponLevel: (treeId: string, newLevel: number) => void;
  updateTreeTalentLevel: (treeId: string, skill: 'attack' | 'skill' | 'burst', newLevel: number) => void;
  updateTreeArtifactPiece: (treeId: string, slotIndex: number, updates: { level?: number; isOptimized?: boolean }) => void;
  toggleCompleteCharacterTree: (treeId: string) => void;
  restoreCharacterTree: (treeId: string) => void;
  deleteCharacterTree: (treeId: string) => void;
  clearCompletedTrees: () => void;

  // Legacy Task Goals (preserved)
  goals: TaskGoal[];
  addGoal: (goal: Omit<TaskGoal, 'id' | 'order' | 'isCompleted' | 'createdAt'>) => void;
  reorderGoals: (activeId: string, overId: string) => void;
  toggleComplete: (id: string) => void;
  restoreGoal: (id: string) => void;
  deleteGoal: (id: string) => void;
  updateGoalCount: (id: string, currentCount: number) => void;
  clearCompletedGoals: () => void;

  // Resin Tracker
  manualResin: number;
  lastResinUpdate: number;
  updateManualResin: (amount: number) => void;
  spendOrAddResin: (delta: number) => void;

  // Dailies
  commissionsCount: number;
  weeklyBossCount: number;
  setCommissionsCount: (count: number) => void;
  cycleCommissionsCount: () => void;
  setWeeklyBossCount: (count: number) => void;

  // HoYoLAB Daily Note Sync & Check-In
  hoyoData: HoyoDailyNote | null;
  lastHoyoSync: number | null;
  hoyoSyncLoading: boolean;
  hoyoSyncError: string | null;
  syncWithHoyo: () => Promise<void>;

  // Daily Check-in
  checkInLoading: boolean;
  checkInStatus: string | null;
  executeDailyCheckIn: () => Promise<void>;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeNav: 'characters',

      setActiveNav: (nav) => set({ activeNav: nav }),

      characters: USER_CHARACTERS_PRESET,
      selectedCharacterId: 'char-furina',
      setSelectedCharacterId: (id) => set({ selectedCharacterId: id }),
      characterFetchLoading: false,

      fetchCharactersFromHoyo: async () => {
        set({ characterFetchLoading: true });
        try {
          const res = await fetch('/api/characterList', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          });
          const json = await res.json();
          if (json.retcode === 0 && Array.isArray(json.data?.avatars) && json.data.avatars.length > 0) {
            const transformed: UserCharacter[] = json.data.avatars.map((hoyoChar: any) => {
              const rawName = (hoyoChar.name || '').trim();
              const userPreset = USER_CHARACTERS_PRESET.find(
                (p) =>
                  p.name.toLowerCase() === rawName.toLowerCase() ||
                  rawName.toLowerCase().includes(p.name.toLowerCase()) ||
                  p.name.toLowerCase().includes(rawName.toLowerCase())
              );
              const dataPreset = CHARACTERS_DATA.find(
                (p) =>
                  p.name.toLowerCase() === rawName.toLowerCase() ||
                  rawName.toLowerCase().includes(p.name.toLowerCase()) ||
                  p.name.toLowerCase().includes(rawName.toLowerCase())
              );

              const element = (hoyoChar.element || userPreset?.element || dataPreset?.element || 'pyro').toLowerCase() as any;

              const weaponType = dataPreset?.weaponType || 'sword';
              const defaultBuild = getCharacterDefaultBuild(rawName, weaponType);

              const weaponData = hoyoChar.weapon && hoyoChar.weapon.name && hoyoChar.weapon.name !== 'Vũ Khí Trang Bị'
                ? {
                    name: hoyoChar.weapon.name,
                    icon: hoyoChar.weapon.icon || defaultBuild.weapon.icon,
                    rarity: hoyoChar.weapon.rarity || defaultBuild.weapon.rarity,
                    level: hoyoChar.weapon.level || 90,
                    affixLevel: hoyoChar.weapon.affix_level || 1,
                    typeName: hoyoChar.weapon.type_name || defaultBuild.weapon.typeName,
                    domainDays: [1, 4, 0],
                    materialName: 'Nguyên liệu rèn',
                  }
                : userPreset?.weapon || {
                    name: defaultBuild.weapon.name,
                    icon: defaultBuild.weapon.icon,
                    rarity: defaultBuild.weapon.rarity,
                    level: Math.min(90, Math.max(70, hoyoChar.level || 80)),
                    affixLevel: defaultBuild.weapon.affixLevel,
                    typeName: defaultBuild.weapon.typeName,
                    domainDays: [1, 4, 0],
                    materialName: 'Nguyên liệu rèn',
                  };

              const relicsData = hoyoChar.relics?.length
                ? hoyoChar.relics.map((r: any) => ({
                    name: r.name,
                    icon: r.icon,
                    posName: r.pos_name,
                    rarity: r.rarity,
                    level: r.level,
                    setName: r.set?.name || 'Thánh Di Vật',
                  }))
                : userPreset?.relics || defaultBuild.relics.pieces;

              const talentVals = hoyoChar.showcaseTalents ? (Object.values(hoyoChar.showcaseTalents) as number[]) : null;
              const hasRealTalents = Boolean(talentVals && talentVals.length >= 3);
              const talents = hasRealTalents
                ? { attack: talentVals![0], skill: talentVals![1], burst: talentVals![2] }
                : (userPreset?.talents || {
                    attack: Math.min(10, Math.max(1, Math.floor((hoyoChar.level || 1) / 10))),
                    skill: Math.min(10, Math.max(1, Math.floor((hoyoChar.level || 1) / 9))),
                    burst: Math.min(10, Math.max(1, Math.floor((hoyoChar.level || 1) / 9))),
                  });

              const isExactInGameData = Boolean(hoyoChar.showcaseTalents || (hoyoChar.weapon && hoyoChar.weapon.name && hoyoChar.weapon.name !== 'Vũ Khí Trang Bị'));

              return {
                id: `char-hoyo-${hoyoChar.id}`,
                  name: rawName,
                  nameVi: userPreset?.nameVi || dataPreset?.nameVi || rawName,
                  element,
                  rarity: (hoyoChar.rarity || userPreset?.rarity || dataPreset?.rarity || 4) as 4 | 5,
                  icon: hoyoChar.image || userPreset?.icon || dataPreset?.avatarUrl || '',
                  image: hoyoChar.card_image || hoyoChar.image,
                  level: hoyoChar.level || 1,
                  maxLevel: 90,
                  constellation: hoyoChar.actived_constellation_num ?? 0,
                  fetter: hoyoChar.fetter ?? 1,
                  weapon: weaponData,
                  relics: relicsData,
                  talents,
                  isExactInGameData,
                  talentBook: userPreset?.talentBook || dataPreset?.talentBook || 'Sách Thiên Phú',
                  talentDomain: userPreset?.talentDomain || dataPreset?.talentDomain || 'Bí Cảnh Thiên Phú',
                  talentDays: userPreset?.talentDays || dataPreset?.talentDays || [1, 4, 0],
                  weeklyBossMat: userPreset?.weeklyBossMat || dataPreset?.weeklyBossMat || 'Nguyên Liệu Boss Tuần',
                  worldBossMat: userPreset?.worldBossMat || dataPreset?.worldBossMat || 'Nguyên Liệu Boss Thế Giới',
                  localSpecialty: userPreset?.localSpecialty || dataPreset?.localSpecialty || 'Đặc Sản Khu Vực',
                };
              });

              // Sort: 5-star first, then by level descending, then constellation
              transformed.sort((a, b) => {
                if (b.rarity !== a.rarity) return b.rarity - a.rarity;
                if (b.level !== a.level) return b.level - a.level;
                return b.constellation - a.constellation;
              });

              set((state) => ({
                characters: transformed,
                selectedCharacterId:
                  transformed.some((c) => c.id === state.selectedCharacterId && state.selectedCharacterId.startsWith('char-hoyo-'))
                    ? state.selectedCharacterId
                    : transformed[0]?.id || state.selectedCharacterId,
                characterFetchLoading: false,
              }));
            } else {
              set({ characterFetchLoading: false });
            }
          } catch {
            set({ characterFetchLoading: false });
          }
        },

        updateCharacterCustomData: (charId, updates) => {
          set((state) => ({
            characters: state.characters.map((c) => {
              if (c.id !== charId) return c;
              const updatedWeapon = c.weapon
                ? {
                    ...c.weapon,
                    name: updates.weaponName || c.weapon.name,
                    level: updates.weaponLevel ?? c.weapon.level,
                    affixLevel: updates.weaponAffix ?? c.weapon.affixLevel,
                  }
                : undefined;

              const updatedRelics = updates.relicSetName && c.relics
                ? c.relics.map((r) => ({ ...r, setName: updates.relicSetName! }))
                : c.relics;

              return {
                ...c,
                weapon: updatedWeapon,
                talents: updates.talents || c.talents,
                relics: updatedRelics,
                isExactInGameData: true,
              };
            }),
          }));
        },

      // Starter character trees on timeline
      characterTrees: [
        {
          id: 'tree-starter-furina',
          characterId: 'char-furina',
          characterName: 'Furina',
          avatarUrl: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_AvatarIcon_Furina.png',
          element: 'hydro',
          rarity: 5,
          constellation: 6,
          level: 70,
          order: 0,
          isCompleted: false,
          createdAt: Date.now() - 3600000,
          levelBranch: {
            currentLevel: 70,
            targetLevel: 90,
            heroWitNeeded: 234,
            moraNeeded: 1171800,
            bossDropNeeded: 26,
            specialtyNeeded: 94,
            worldBossMat: 'Nước Không Thể Tan',
            localSpecialty: 'Hoa Hồ Trung Cảnh',
            isCompleted: false,
          },
          weaponBranch: {
            weaponName: 'Sắc Nước Tĩnh Lặng',
            weaponIcon: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_EquipIcon_Sword_Regalis.png',
            currentLevel: 80,
            targetLevel: 90,
            materialName: 'Giọt Sương Tinh Khiết',
            daysOfWeek: [2, 5, 0],
            isCompleted: false,
          },
          talentBranch: {
            talentBookName: 'Sách Công Lý (Justice)',
            domainName: 'Vinh Quang Nhợt Nhạt (Fontaine)',
            daysOfWeek: [2, 5, 0],
            weeklyBossMatName: 'Dây Tơ Không Ám (Cá Voi)',
            currentLevels: { attack: 6, skill: 8, burst: 9 },
            targetLevels: { attack: 6, skill: 10, burst: 10 },
            booksGoldNeeded: 28,
            weeklyBossMatsNeeded: 4,
            crownsNeeded: 2,
            isCompleted: false,
          },
          artifactBranch: {
            setName: 'Đoàn Kịch Hoàng Kim (4 món)',
            domainName: 'Bí Cảnh Tội Lỗi Tận Cùng',
            recommendPieces: ['Hoa', 'Lông', 'Đồng Hồ HP%', 'Ly Sát Thương Thủy', 'Nón Tỉ Lệ Bạo'],
            isCompleted: false,
            pieces: DEFAULT_ARTIFACT_PIECES.map((p) => ({
              ...p,
              level: 20,
              isOptimized: p.slotKey === 'flower' || p.slotKey === 'plume',
            })),
          },
        },
        {
          id: 'tree-starter-raiden',
          characterId: 'char-raiden',
          characterName: 'Raiden Shogun',
          avatarUrl: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_AvatarIcon_Shougun.png',
          element: 'electro',
          rarity: 5,
          constellation: 2,
          level: 80,
          order: 1,
          isCompleted: false,
          createdAt: Date.now() - 7200000,
          levelBranch: {
            currentLevel: 80,
            targetLevel: 90,
            heroWitNeeded: 146,
            moraNeeded: 732385,
            bossDropNeeded: 16,
            specialtyNeeded: 59,
            worldBossMat: 'Hạt Sen Sấm Sét',
            localSpecialty: 'Quả Amakumo',
            isCompleted: false,
          },
          weaponBranch: {
            weaponName: 'Đoạn Thảo Trảm Quang',
            weaponIcon: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_EquipIcon_Pole_Narukami.png',
            currentLevel: 90,
            targetLevel: 90,
            materialName: 'Mặt Nạ Hổ Phách',
            daysOfWeek: [3, 6, 0],
            isCompleted: true,
          },
          talentBranch: {
            talentBookName: 'Sách Ánh Sáng (Light)',
            domainName: 'Sân Đình Violet (Inazuma)',
            daysOfWeek: [3, 6, 0],
            weeklyBossMatName: 'Thời Khắc Tan Biến (Signora)',
            currentLevels: { attack: 6, skill: 9, burst: 10 },
            targetLevels: { attack: 6, skill: 10, burst: 10 },
            booksGoldNeeded: 16,
            weeklyBossMatsNeeded: 2,
            crownsNeeded: 1,
            isCompleted: false,
          },
          artifactBranch: {
            setName: 'Dấu Ấn Ngăn Trở (4 món)',
            domainName: 'Sân Đình Momiji',
            recommendPieces: ['Hoa', 'Lông', 'Đồng Hồ Hiệu Quả Nạp', 'Ly Sát Thương Lôi', 'Nón Tỉ Lệ Bạo'],
            isCompleted: true,
            pieces: DEFAULT_ARTIFACT_PIECES.map((p) => ({
              ...p,
              level: 20,
              isOptimized: true,
            })),
          },
        },
      ],

      addCharacterToTimeline: (char) => {
        const levelCost = calculateLevelTo90Cost(char.level, 90);
        const talentCost = calculateTalentCost(
          char.talents || { attack: 1, skill: 1, burst: 1 },
          { attack: 10, skill: 10, burst: 10 }
        );

        const initialPieces: ArtifactPieceItem[] = DEFAULT_ARTIFACT_PIECES.map((piece, idx) => {
          const relic = char.relics?.[idx];
          const relicLvl = relic ? relic.level : 20;
          return {
            ...piece,
            level: relicLvl,
            isOptimized: relicLvl >= 20,
          };
        });

        const newTree: CharacterBranchTree = {
          id: `tree-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          characterId: char.id,
          characterName: char.nameVi || char.name,
          avatarUrl: char.icon,
          element: char.element,
          rarity: char.rarity,
          constellation: char.constellation,
          level: char.level,
          order: 0,
          isCompleted: false,
          createdAt: Date.now(),
          levelBranch: {
            currentLevel: char.level,
            targetLevel: 90,
            heroWitNeeded: levelCost.heroWit,
            moraNeeded: levelCost.mora,
            bossDropNeeded: levelCost.bossDrops,
            specialtyNeeded: levelCost.localSpecialty,
            worldBossMat: char.worldBossMat,
            localSpecialty: char.localSpecialty,
            isCompleted: char.level >= 90,
          },
          weaponBranch: {
            weaponName: char.weapon?.name || 'Vũ Khí',
            weaponIcon: char.weapon?.icon,
            currentLevel: char.weapon?.level || 1,
            targetLevel: 90,
            materialName: char.weapon?.materialName || 'Nguyên liệu rèn',
            daysOfWeek: char.weapon?.domainDays || [1, 4, 0],
            isCompleted: (char.weapon?.level || 1) >= 90,
          },
          talentBranch: {
            talentBookName: char.talentBook,
            domainName: char.talentDomain,
            daysOfWeek: char.talentDays,
            weeklyBossMatName: char.weeklyBossMat,
            currentLevels: char.talents || { attack: 1, skill: 1, burst: 1 },
            targetLevels: { attack: 10, skill: 10, burst: 10 },
            booksGoldNeeded: talentCost.goldBooks,
            weeklyBossMatsNeeded: talentCost.weeklyBossMats,
            crownsNeeded: talentCost.crowns,
            isCompleted: false,
          },
          artifactBranch: {
            setName: char.relics?.[0]?.setName || 'Bộ Thánh Di Vật',
            domainName: 'Bí Cảnh Thánh Di Vật',
            recommendPieces: ['Hoa', 'Lông', 'Đồng Hồ', 'Ly', 'Nón'],
            isCompleted: initialPieces.every((p) => p.isOptimized),
            pieces: initialPieces,
          },
        };

        set((state) => ({
          characterTrees: [newTree, ...state.characterTrees],
          activeNav: 'timeline',
        }));
      },

      reorderCharacterTrees: (activeId: string, overId: string) => {
        set((state) => {
          const oldIndex = state.characterTrees.findIndex((t) => t.id === activeId);
          const newIndex = state.characterTrees.findIndex((t) => t.id === overId);
          if (oldIndex === -1 || newIndex === -1) return state;

          const updated = [...state.characterTrees];
          const [movedItem] = updated.splice(oldIndex, 1);
          updated.splice(newIndex, 0, movedItem);

          return { characterTrees: updated };
        });
      },

      toggleBranchComplete: (treeId, branchKey) => {
        set((state) => ({
          characterTrees: state.characterTrees.map((tree) => {
            if (tree.id !== treeId) return tree;
            const updatedBranch = {
              ...tree[branchKey],
              isCompleted: !tree[branchKey].isCompleted,
            };
            return {
              ...tree,
              [branchKey]: updatedBranch,
            };
          }),
        }));
      },

      updateTreeLevel: (treeId, newLevel) => {
        const clampedLevel = Math.max(1, Math.min(90, newLevel));
        const levelCost = calculateLevelTo90Cost(clampedLevel, 90);
        set((state) => ({
          characterTrees: state.characterTrees.map((tree) => {
            if (tree.id !== treeId) return tree;
            return {
              ...tree,
              level: clampedLevel,
              levelBranch: {
                ...tree.levelBranch,
                currentLevel: clampedLevel,
                heroWitNeeded: levelCost.heroWit,
                moraNeeded: levelCost.mora,
                bossDropNeeded: levelCost.bossDrops,
                specialtyNeeded: levelCost.localSpecialty,
                isCompleted: clampedLevel >= 90,
              },
            };
          }),
        }));
      },

      updateTreeWeaponLevel: (treeId, newLevel) => {
        const clampedLevel = Math.max(1, Math.min(90, newLevel));
        set((state) => ({
          characterTrees: state.characterTrees.map((tree) => {
            if (tree.id !== treeId) return tree;
            return {
              ...tree,
              weaponBranch: {
                ...tree.weaponBranch,
                currentLevel: clampedLevel,
                isCompleted: clampedLevel >= 90,
              },
            };
          }),
        }));
      },

      updateTreeTalentLevel: (treeId, skill, newLevel) => {
        const clamped = Math.max(1, Math.min(10, newLevel));
        set((state) => ({
          characterTrees: state.characterTrees.map((tree) => {
            if (tree.id !== treeId) return tree;
            const updatedLevels = {
              ...tree.talentBranch.currentLevels,
              [skill]: clamped,
            };
            const talentCost = calculateTalentCost(updatedLevels, tree.talentBranch.targetLevels);
            const isCompleted =
              updatedLevels.attack >= tree.talentBranch.targetLevels.attack &&
              updatedLevels.skill >= tree.talentBranch.targetLevels.skill &&
              updatedLevels.burst >= tree.talentBranch.targetLevels.burst;
            return {
              ...tree,
              talentBranch: {
                ...tree.talentBranch,
                currentLevels: updatedLevels,
                booksGoldNeeded: talentCost.goldBooks,
                weeklyBossMatsNeeded: talentCost.weeklyBossMats,
                crownsNeeded: talentCost.crowns,
                isCompleted,
              },
            };
          }),
        }));
      },

      updateTreeArtifactPiece: (treeId, slotIndex, updates) => {
        set((state) => ({
          characterTrees: state.characterTrees.map((tree) => {
            if (tree.id !== treeId) return tree;
            const currentPieces =
              tree.artifactBranch.pieces && tree.artifactBranch.pieces.length === 5
                ? [...tree.artifactBranch.pieces]
                : [...DEFAULT_ARTIFACT_PIECES];

            if (!currentPieces[slotIndex]) return tree;
            currentPieces[slotIndex] = {
              ...currentPieces[slotIndex],
              level:
                updates.level !== undefined
                  ? Math.max(0, Math.min(20, updates.level))
                  : currentPieces[slotIndex].level,
              isOptimized:
                updates.isOptimized !== undefined
                  ? updates.isOptimized
                  : currentPieces[slotIndex].isOptimized,
            };

            const allOptimized = currentPieces.every((p) => p.isOptimized);

            return {
              ...tree,
              artifactBranch: {
                ...tree.artifactBranch,
                pieces: currentPieces,
                isCompleted: allOptimized,
              },
            };
          }),
        }));
      },

      toggleCompleteCharacterTree: (treeId) => {
        set((state) => ({
          characterTrees: state.characterTrees.map((tree) =>
            tree.id === treeId
              ? {
                  ...tree,
                  isCompleted: !tree.isCompleted,
                  completedAt: !tree.isCompleted ? Date.now() : undefined,
                }
              : tree
          ),
        }));
      },

      restoreCharacterTree: (treeId) => {
        set((state) => {
          const tree = state.characterTrees.find((t) => t.id === treeId);
          if (!tree) return state;
          const remaining = state.characterTrees.filter((t) => t.id !== treeId);
          const restored = { ...tree, isCompleted: false, completedAt: undefined };
          return { characterTrees: [restored, ...remaining] };
        });
      },

      deleteCharacterTree: (treeId) => {
        set((state) => ({
          characterTrees: state.characterTrees.filter((t) => t.id !== treeId),
        }));
      },

      clearCompletedTrees: () => {
        set((state) => ({
          characterTrees: state.characterTrees.filter((t) => !t.isCompleted),
        }));
      },

      // Goals (preserved)
      goals: [],
      addGoal: (goalData) => {
        const newGoal: TaskGoal = {
          ...goalData,
          id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          order: 0,
          isCompleted: false,
          createdAt: Date.now(),
        };
        set((state) => ({ goals: [newGoal, ...state.goals] }));
      },
      reorderGoals: (activeId, overId) => {
        set((state) => {
          const oldIndex = state.goals.findIndex((g) => g.id === activeId);
          const newIndex = state.goals.findIndex((g) => g.id === overId);
          if (oldIndex === -1 || newIndex === -1) return state;
          const updated = [...state.goals];
          const [movedItem] = updated.splice(oldIndex, 1);
          updated.splice(newIndex, 0, movedItem);
          return { goals: updated };
        });
      },
      toggleComplete: (id) => {
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, isCompleted: !g.isCompleted, completedAt: !g.isCompleted ? Date.now() : undefined } : g
          ),
        }));
      },
      restoreGoal: (id) => {
        set((state) => {
          const goal = state.goals.find((g) => g.id === id);
          if (!goal) return state;
          return { goals: [{ ...goal, isCompleted: false, completedAt: undefined }, ...state.goals.filter((g) => g.id !== id)] };
        });
      },
      deleteGoal: (id) => set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),
      updateGoalCount: (id, count) => {
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id && g.farmTarget ? { ...g, farmTarget: { ...g.farmTarget, currentCount: count } } : g)),
        }));
      },
      clearCompletedGoals: () => set((state) => ({ goals: state.goals.filter((g) => !g.isCompleted) })),

      // Resin Tracker
      manualResin: 160,
      lastResinUpdate: Date.now(),
      updateManualResin: (amount) => set({ manualResin: Math.min(200, Math.max(0, amount)), lastResinUpdate: Date.now() }),
      spendOrAddResin: (delta) =>
        set((state) => ({ manualResin: Math.min(200, Math.max(0, state.manualResin + delta)), lastResinUpdate: Date.now() })),

      // Dailies
      commissionsCount: 0,
      weeklyBossCount: 0,
      setCommissionsCount: (count) => set({ commissionsCount: count }),
      cycleCommissionsCount: () =>
        set((state) => ({ commissionsCount: (state.commissionsCount + 1) % 5 })),
      setWeeklyBossCount: (count) => set({ weeklyBossCount: count }),

      // HoYoLAB Daily Note Sync
      hoyoData: null,
      lastHoyoSync: null,
      hoyoSyncLoading: false,
      hoyoSyncError: null,

      syncWithHoyo: async () => {
        set({ hoyoSyncLoading: true, hoyoSyncError: null });
        try {
          const res = await fetch('/api/dailyNote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          });
          const responseData = await res.json().catch(() => ({}));
          if (!res.ok) {
            throw new Error(responseData.message || `Lỗi kết nối (${res.status})`);
          }
          if (responseData.retcode !== 0) {
            throw new Error(responseData.message || 'Lỗi khi gọi API HoYoLAB');
          }
          const data: HoyoDailyNote = responseData.data;
          set({
            hoyoData: data,
            lastHoyoSync: Date.now(),
            manualResin: data.current_resin,
            lastResinUpdate: Date.now(),
            commissionsCount: data.finished_task_num,
            weeklyBossCount: data.resin_discount_num_limit - data.remain_resin_discount_num,
            hoyoSyncLoading: false,
            hoyoSyncError: null,
          });

          // Also synchronize characters list
          get().fetchCharactersFromHoyo().catch(() => {});
        } catch (error: any) {
          // Even if daily note has an issue (e.g. 10102 privacy), still attempt to fetch characters
          get().fetchCharactersFromHoyo().catch(() => {});
          set({
            hoyoSyncLoading: false,
            hoyoSyncError: error.message || 'Không thể đồng bộ với HoYoLAB',
          });
        }
      },

      // Daily Check-in
      checkInLoading: false,
      checkInStatus: null,
      executeDailyCheckIn: async () => {
        set({ checkInLoading: true, checkInStatus: null });
        try {
          const res = await fetch('/api/checkIn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await res.json();
          set({
            checkInLoading: false,
            checkInStatus: data.message || (data.retcode === 0 ? 'Điểm danh thành công!' : 'Hôm nay đã điểm danh rồi'),
          });
        } catch (err: any) {
          set({
            checkInLoading: false,
            checkInStatus: 'Lỗi kết nối điểm danh',
          });
        }
      },
    }),
    {
      name: 'genshin-note-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
