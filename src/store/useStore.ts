import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { TaskGoal, HoyoDailyNote, UserCharacter, CharacterBranchTree, NavigationMenu } from '../types';
import { USER_CHARACTERS_PRESET } from '../data/genshinData';
import { calculateLevelTo90Cost, calculateTalentCost } from '../utils/calculator';

interface AppState {
  // Navigation Menu
  activeNav: NavigationMenu;
  setActiveNav: (nav: NavigationMenu) => void;

  // Character Roster
  characters: UserCharacter[];
  selectedCharacterId: string;
  setSelectedCharacterId: (id: string) => void;
  fetchCharactersFromHoyo: () => Promise<void>;

  // Character Branch Trees (Việc Cần Làm / Timeline)
  characterTrees: CharacterBranchTree[];
  addCharacterToTimeline: (character: UserCharacter) => void;
  reorderCharacterTrees: (activeId: string, overId: string) => void;
  toggleBranchComplete: (treeId: string, branchKey: 'levelBranch' | 'weaponBranch' | 'talentBranch' | 'artifactBranch') => void;
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
    (set) => ({
      activeNav: 'characters',

      setActiveNav: (nav) => set({ activeNav: nav }),

      characters: USER_CHARACTERS_PRESET,
      selectedCharacterId: 'char-furina',
      setSelectedCharacterId: (id) => set({ selectedCharacterId: id }),

      fetchCharactersFromHoyo: async () => {
        try {
          const res = await fetch('/api/characterList', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          });
          const data = await res.json();
          if (data.retcode === 0 && data.data?.avatars) {
            // Transform HoYoLAB avatars if available
            // Keep existing presets if HoYoLAB list has fewer or different formats
          }
        } catch {
          // Ignore and use local presets
        }
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
          },
        },
        {
          id: 'tree-starter-raiden',
          characterId: 'char-raiden',
          characterName: 'Raiden Shogun',
          avatarUrl: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_AvatarIcon_Shougun.png',
          element: 'electro',
          rarity: 5,
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
          },
        },
      ],

      addCharacterToTimeline: (char) => {
        const levelCost = calculateLevelTo90Cost(char.level, 90);
        const talentCost = calculateTalentCost(
          char.talents || { attack: 1, skill: 1, burst: 1 },
          { attack: 10, skill: 10, burst: 10 }
        );

        const newTree: CharacterBranchTree = {
          id: `tree-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          characterId: char.id,
          characterName: char.nameVi || char.name,
          avatarUrl: char.icon,
          element: char.element,
          rarity: char.rarity,
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
            isCompleted: false,
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
        } catch (error: any) {
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
