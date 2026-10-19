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
import { Plus, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { TimelineCard } from './TimelineCard';

interface TimelineViewProps {
  onOpenAddModal: () => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ onOpenAddModal }) => {
  const { goals, reorderGoals } = useStore();

  const activeGoals = goals.filter((g) => !g.isCompleted);

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
      reorderGoals(String(active.id), String(over.id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Clean Timeline Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-bold tracking-tight text-slate-100">
            Timeline
          </h2>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08] backdrop-blur-md">
            {activeGoals.length}
          </span>
        </div>

        {/* Add Goal Button */}
        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/90 to-yellow-600/90 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs shadow-[0_4px_20px_rgba(245,158,11,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] border border-amber-300/30"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Thêm mục tiêu</span>
        </button>
      </div>

      {/* Empty State */}
      {activeGoals.length === 0 ? (
        <div className="rounded-3xl liquid-glass p-12 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-200 mb-1">
            Timeline đang trống
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mb-5">
            Bấm "Thêm mục tiêu" để đưa nhân vật hoặc vũ khí cần bồi dưỡng vào danh sách ưu tiên.
          </p>
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Thêm mục tiêu
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
              {/* Glass vertical timeline glowing guide line */}
              <div className="absolute left-1.5 sm:left-3 top-6 bottom-6 w-0.5 bg-gradient-to-b from-amber-400/80 via-cyan-400/40 to-slate-800" />

              {activeGoals.map((goal, idx) => (
                <div key={goal.id} className="relative">
                  {/* Timeline Node Dot */}
                  <div
                    className={`absolute -left-3 sm:-left-6 top-6 w-3 h-3 rounded-full border-2 transform -translate-x-1/2 transition-colors ${
                      idx === 0
                        ? 'bg-amber-400 border-white shadow-[0_0_10px_rgba(245,158,11,0.8)]'
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
