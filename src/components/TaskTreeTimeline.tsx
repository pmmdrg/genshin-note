import React, { useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useNavigate } from 'react-router-dom';
import { GitBranch, Plus, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CharacterTreeCard } from './CharacterTreeCard';

export const TaskTreeTimeline: React.FC = () => {
  const navigate = useNavigate();
  const {
    characterTrees,
    reorderCharacterTrees,
    lastAddedTreeId,
    setLastAddedTreeId,
  } = useStore();

  const activeTrees = characterTrees.filter((t) => !t.isCompleted);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderCharacterTrees(String(active.id), String(over.id));
    }
  };

  // Automatically scroll and smoothly focus on newly added character card
  useEffect(() => {
    if (lastAddedTreeId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`tree-node-${lastAddedTreeId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setLastAddedTreeId(null);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [lastAddedTreeId, setLastAddedTreeId]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-amber-300" />
            <span>Việc Cần Làm • Cây Nhánh Bồi Dưỡng</span>
          </h2>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08] backdrop-blur-md">
            {activeTrees.length} nhân vật
          </span>
        </div>

        <button
          onClick={() => navigate('/characters')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/[0.08] hover:border-amber-400/30 text-slate-200 text-xs font-semibold transition-all active:scale-95 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Thêm nhân vật khác</span>
        </button>
      </div>

      {/* Empty State */}
      {activeTrees.length === 0 ? (
        <div className="rounded-3xl liquid-glass p-12 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-200 mb-1">
            Chưa có nhân vật nào trên Timeline
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mb-5">
            Chuyển qua tab "Nhân vật" để chọn và thêm các nhân vật bạn muốn bồi dưỡng vào cây nhiệm vụ.
          </p>
          <button
            onClick={() => navigate('/characters')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Mở Danh Sách Nhân Vật
          </button>
        </div>
      ) : (
        /* Continuous Timeline Spine with Anchored Character Trees */
        <div className="relative pt-3 sm:pt-4">
          {/* Main Timeline Line (Vertical Spine) - Mathematically centered with milestone circles */}
          <div className="absolute left-[18px] sm:left-[22px] top-6 bottom-6 w-1 bg-gradient-to-b from-amber-400 via-amber-400/50 to-purple-500/20 shadow-[0_0_10px_rgba(245,158,11,0.5)] rounded-full pointer-events-none" />

          {/* DnD Sortable Character Trees along Timeline */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activeTrees.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-7 sm:space-y-8">
                {activeTrees.map((tree, idx) => (
                  <div
                    key={tree.id}
                    id={`tree-node-${tree.id}`}
                    className="relative pl-12 sm:pl-14"
                  >
                    {/* Timeline Milestone Dot on Spine (w-7 h-7, centered vertically with character card at y=138px) */}
                    <div
                      className={`absolute left-[5px] sm:left-[9px] top-[124px] w-7 h-7 rounded-full bg-slate-950 border-2 flex items-center justify-center z-10 transition-transform ${
                        idx === 0
                          ? 'border-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.8)] scale-110'
                          : 'border-amber-400/60 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-black font-sans ${
                          idx === 0 ? 'text-amber-300' : 'text-slate-300'
                        }`}
                      >
                        {idx + 1}
                      </span>
                    </div>

                    {/* Horizontal Connector Line from Milestone Dot to Character Card */}
                    <div className="absolute left-[20px] sm:left-[24px] top-[137px] w-[28px] sm:w-[32px] h-0.5 bg-gradient-to-r from-amber-400/80 via-amber-400/40 to-white/10 pointer-events-none" />

                    {/* Character Tree with Horizontal Branching */}
                    <CharacterTreeCard tree={tree} index={idx} />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};
