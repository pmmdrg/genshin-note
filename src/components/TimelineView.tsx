import React from 'react';
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
import { Layers, Plus, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { TimelineCard } from './TimelineCard';

interface TimelineViewProps {
  onOpenAddModal: () => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ onOpenAddModal }) => {
  const { goals, reorderGoals } = useStore();

  // Active goals only (not completed)
  const activeGoals = goals.filter((g) => !g.isCompleted);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement required before drag begins, preventing accidental drags on clicks
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderGoals(String(active.id), String(over.id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Stack Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              Timeline & Ngăn Xếp Ưu Tiên (Stack LIFO)
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {activeGoals.length} mục tiêu
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Mục tiêu mới thêm sẽ tự động nằm ở <span className="text-amber-300 font-semibold">Đỉnh Stack (Ưu tiên #1)</span>. Bạn có thể kéo thả để sắp xếp lại theo ý muốn.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-xs font-semibold text-slate-200 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Thêm mục tiêu</span>
        </button>
      </div>

      {/* Empty State */}
      {activeGoals.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-800/80 bg-slate-900/30 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="text-base font-bold text-slate-200 mb-1">
            Chưa có mục tiêu nào trong Timeline!
          </h3>
          <p className="text-xs text-slate-400 max-w-md mb-6">
            Hãy thêm một nhân vật hoặc vũ khí bạn muốn bồi dưỡng. Hệ thống sẽ tự động xếp vào đầu danh sách ưu tiên.
          </p>
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Thêm mục tiêu ngay
          </button>
        </div>
      ) : (
        /* DnD Sortable Timeline List */
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={activeGoals.map((g) => g.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="relative pl-3 sm:pl-6 space-y-4">
              {/* Vertical timeline glowing guide line */}
              <div className="absolute left-1.5 sm:left-3 top-6 bottom-6 w-0.5 bg-gradient-to-b from-amber-500 via-indigo-500/50 to-slate-800" />

              {activeGoals.map((goal, idx) => (
                <div key={goal.id} className="relative">
                  {/* Timeline Node Dot */}
                  <div
                    className={`absolute -left-3 sm:-left-6 top-6 w-3 h-3 rounded-full border-2 transform -translate-x-1/2 transition-colors ${
                      idx === 0
                        ? 'bg-amber-400 border-amber-200 shadow-md shadow-amber-500/50'
                        : 'bg-slate-900 border-slate-600'
                    }`}
                  />
                  <TimelineCard goal={goal} index={idx} />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
