import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { TaskGoal, HoyoDailyNote } from '../types';

interface AppState {
  // Goal Stack & Timeline
  goals: TaskGoal[];
  addGoal: (goal: Omit<TaskGoal, 'id' | 'order' | 'isCompleted' | 'createdAt'>) => void;
  reorderGoals: (activeId: string, overId: string) => void;
  toggleComplete: (id: string) => void;
  restoreGoal: (id: string) => void;
  deleteGoal: (id: string) => void;
  updateGoalCount: (id: string, currentCount: number) => void;
  clearCompletedGoals: () => void;

  // Resin Tracker (Offline / Manual)
  manualResin: number;
  lastResinUpdate: number;
  updateManualResin: (amount: number) => void;
  spendOrAddResin: (delta: number) => void;

  // Daily & Weekly Dailies
  commissionsCount: number; // 0 to 4
  weeklyBossCount: number; // 0 to 3
  setCommissionsCount: (count: number) => void;
  setWeeklyBossCount: (count: number) => void;

  // HoYoLAB integration (Vercel Serverless proxy)
  hoyoConfig: {
    enabled: boolean;
    cookie: string;
    uid: string;
    server: string;
    appPin: string;
  };

  hoyoData: HoyoDailyNote | null;
  lastHoyoSync: number | null;
  hoyoSyncLoading: boolean;
  hoyoSyncError: string | null;
  setHoyoConfig: (config: Partial<AppState['hoyoConfig']>) => void;
  setHoyoData: (data: HoyoDailyNote | null) => void;
  syncWithHoyo: () => Promise<void>;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Default initial starter goals so user sees immediate value
      goals: [
        {
          id: 'starter-1',
          title: 'Nâng Thiên Phú Cấp 10 (Q) - Furina',
          category: 'character',
          targetName: 'Furina',
          targetAvatar: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_AvatarIcon_Furina.png',
          element: 'hydro',
          rarity: 5,
          farmTarget: {
            materialName: 'Sách Công Lý (Justice)',
            materialType: 'talent',
            domainName: 'Vinh Quang Nhợt Nhạt (Fontaine)',
            daysOfWeek: [2, 5, 0], // Tue, Fri, Sun
            resinCost: 20,
            currentCount: 8,
            targetCount: 16,
          },
          order: 0,
          isCompleted: false,
          createdAt: Date.now() - 3600000,
          notes: 'Ưu tiên nâng Q trước để tối đa buff sát thương',
        },
        {
          id: 'starter-2',
          title: 'Đột Phá Cấp 90 - Tây Phong Kiếm',
          category: 'weapon',
          targetName: 'Tây Phong Kiếm',
          targetAvatar: 'https://raw.githubusercontent.com/FortOfFans/GenShin/master/UI/UI_EquipIcon_Sword_Favonius.png',
          rarity: 4,
          farmTarget: {
            materialName: 'Xiềng Xích Dandelion',
            materialType: 'weapon',
            domainName: 'Khu Rừng Cecilia (Mondstadt)',
            daysOfWeek: [3, 6, 0], // Wed, Sat, Sun
            resinCost: 20,
            currentCount: 3,
            targetCount: 6,
          },
          order: 1,
          isCompleted: false,
          createdAt: Date.now() - 7200000,
          notes: 'Dùng cho Bennett nạp năng lượng',
        },
      ],

      // STACK LIFO: Newly added goal is prepended to the array (Index 0 = Top of Stack / Priority #1)
      addGoal: (goalData) => {
        const newGoal: TaskGoal = {
          ...goalData,
          id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          order: 0,
          isCompleted: false,
          createdAt: Date.now(),
        };

        set((state) => ({
          goals: [newGoal, ...state.goals],
        }));
      },

      // Reorder items via Drag & Drop
      reorderGoals: (activeId: string, overId: string) => {
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

      // Complete goal -> mark completed and set timestamp
      toggleComplete: (id: string) => {
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id
              ? {
                  ...g,
                  isCompleted: !g.isCompleted,
                  completedAt: !g.isCompleted ? Date.now() : undefined,
                }
              : g
          ),
        }));
      },

      restoreGoal: (id: string) => {
        set((state) => {
          const goal = state.goals.find((g) => g.id === id);
          if (!goal) return state;
          // When restored, put back at the top of active goals
          const remaining = state.goals.filter((g) => g.id !== id);
          const restoredGoal = { ...goal, isCompleted: false, completedAt: undefined };
          return { goals: [restoredGoal, ...remaining] };
        });
      },

      deleteGoal: (id: string) => {
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        }));
      },

      updateGoalCount: (id: string, currentCount: number) => {
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id && g.farmTarget
              ? {
                  ...g,
                  farmTarget: {
                    ...g.farmTarget,
                    currentCount: Math.max(0, currentCount),
                  },
                }
              : g
          ),
        }));
      },

      clearCompletedGoals: () => {
        set((state) => ({
          goals: state.goals.filter((g) => !g.isCompleted),
        }));
      },

      // Manual Resin
      manualResin: 160,
      lastResinUpdate: Date.now(),
      updateManualResin: (amount: number) => {
        set({
          manualResin: Math.min(200, Math.max(0, amount)),
          lastResinUpdate: Date.now(),
        });
      },
      spendOrAddResin: (delta: number) => {
        set((state) => {
          const current = Math.min(200, Math.max(0, state.manualResin + delta));
          return {
            manualResin: current,
            lastResinUpdate: Date.now(),
          };
        });
      },

      // Dailies
      commissionsCount: 0,
      weeklyBossCount: 0,
      setCommissionsCount: (count) => set({ commissionsCount: count }),
      setWeeklyBossCount: (count) => set({ weeklyBossCount: count }),

      // HoYoLAB Integration
      hoyoConfig: {
        enabled: false,
        cookie: '',
        uid: '',
        server: 'os_asia',
        appPin: '',
      },
      hoyoData: null,
      lastHoyoSync: null,
      hoyoSyncLoading: false,
      hoyoSyncError: null,

      setHoyoConfig: (config) => {
        set((state) => ({
          hoyoConfig: { ...state.hoyoConfig, ...config },
        }));
      },

      setHoyoData: (data) => set({ hoyoData: data, lastHoyoSync: Date.now() }),

      syncWithHoyo: async () => {
        const { hoyoConfig } = get();

        set({ hoyoSyncLoading: true, hoyoSyncError: null });

        try {
          const res = await fetch('/api/dailyNote', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-hoyolab-cookie': hoyoConfig.cookie,
              'x-app-pin': hoyoConfig.appPin,
            },
            body: JSON.stringify({
              uid: hoyoConfig.uid,
              server: hoyoConfig.server,
            }),
          });


          if (!res.ok) {
            const errJson = await res.json().catch(() => ({}));
            throw new Error(errJson.message || `Lỗi kết nối (${res.status})`);
          }

          const responseData = await res.json();
          if (responseData.retcode !== 0 && responseData.message) {
            throw new Error(responseData.message);
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
    }),
    {
      name: 'genshin-note-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
