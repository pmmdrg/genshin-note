import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Check, Trash2, Calendar, Droplet, Sparkles, Plus, Minus } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { TaskGoal } from '../types';
import { useStore } from '../store/useStore';
import { isDomainOpenToday } from '../utils/priority';
import { ELEMENT_COLORS } from '../data/genshinData';


interface TimelineCardProps {
  goal: TaskGoal;
  index: number;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ goal, index }) => {
  const { toggleComplete, deleteGoal, updateGoalCount } = useStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: goal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isTopPriority = index === 0;
  const openToday = isDomainOpenToday(goal.farmTarget?.daysOfWeek);
  const elementStyle = goal.element ? ELEMENT_COLORS[goal.element] : null;

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Fire festive confetti animation
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6'],
    });
    toggleComplete(goal.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group rounded-2xl transition-all duration-200 ${
        isDragging ? 'opacity-50 z-50 scale-102 shadow-2xl' : ''
      } ${
        isTopPriority
          ? 'bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-slate-900 border-2 border-amber-500/50 shadow-xl shadow-amber-500/10'
          : 'bg-slate-900/80 border border-slate-800/80 hover:border-slate-700/80 shadow-lg shadow-slate-950/20'
      }`}
    >
      {/* Top Priority Badge */}
      {isTopPriority && (
        <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md shadow-amber-500/30">
          <Sparkles className="w-3 h-3 fill-current" />
          Ưu Tiên #1 (Đỉnh Stack)
        </div>
      )}

      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Drag Handle, Avatar, Details */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="p-1 rounded-lg text-slate-600 hover:text-slate-300 hover:bg-slate-800 cursor-grab active:cursor-grabbing transition-colors mt-1"
            title="Kéo thả để đổi thứ tự ưu tiên"
          >
            <GripVertical className="w-5 h-5" />
          </button>

          {/* Priority Index Number */}
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
              isTopPriority
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border border-slate-700/60'
            }`}
          >
            #{index + 1}
          </div>

          {/* Target Avatar or Icon */}
          {goal.targetAvatar ? (
            <div
              className={`w-12 h-12 rounded-xl overflow-hidden shrink-0 border relative ${
                elementStyle ? elementStyle.border : 'border-slate-700'
              } ${elementStyle ? elementStyle.bg : 'bg-slate-800'}`}
            >
              <img
                src={goal.targetAvatar}
                alt={goal.targetName || goal.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-400 font-bold text-lg">
              {goal.title.charAt(0)}
            </div>
          )}

          {/* Title & Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-slate-100 truncate group-hover:text-amber-200 transition-colors">
                {goal.title}
              </h3>
              {goal.rarity && (
                <span className="text-[11px] text-amber-400 font-bold">
                  {'★'.repeat(goal.rarity)}
                </span>
              )}
            </div>

            {/* Farm info & domain */}
            {goal.farmTarget && (
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 flex-wrap">
                <span className="text-slate-300 font-medium">
                  {goal.farmTarget.materialName}
                </span>
                {goal.farmTarget.domainName && (
                  <>
                    <span>•</span>
                    <span className="text-slate-500">{goal.farmTarget.domainName}</span>
                  </>
                )}
              </div>
            )}

            {/* Smart badges */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {/* Day open status */}
              {goal.farmTarget?.daysOfWeek && goal.farmTarget.daysOfWeek.length > 0 && (
                openToday ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Bí cảnh mở hôm nay!
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-800/80 border border-slate-700 px-2 py-0.5 rounded-md">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    Mở: {goal.farmTarget.daysOfWeek.map((d) => (d === 0 ? 'CN' : `T${d + 1}`)).join(', ')}
                  </span>
                )
              )}

              {/* Resin cost */}
              {goal.farmTarget?.resinCost ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                  <Droplet className="w-3 h-3 fill-cyan-400/30" />
                  {goal.farmTarget.resinCost} Nhựa/lần
                </span>
              ) : null}

              {/* Notes */}
              {goal.notes && (
                <span className="text-[11px] text-slate-400 italic bg-slate-800/40 px-2 py-0.5 rounded-md max-w-xs truncate">
                  "{goal.notes}"
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Quantity Progress & Completion Tick */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
          {/* Progress Counter if material counts are defined */}
          {goal.farmTarget?.targetCount && (
            <div className="flex items-center gap-2 bg-slate-800/70 border border-slate-700/60 rounded-xl px-2.5 py-1">
              <span className="text-xs text-slate-400 font-medium">Tiến độ:</span>
              <span className="text-xs font-bold text-slate-200 font-mono">
                {goal.farmTarget.currentCount || 0} / {goal.farmTarget.targetCount}
              </span>
              <div className="flex items-center gap-0.5 ml-1">
                <button
                  onClick={() =>
                    updateGoalCount(goal.id, (goal.farmTarget?.currentCount || 0) - 1)
                  }
                  className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <button
                  onClick={() =>
                    updateGoalCount(goal.id, (goal.farmTarget?.currentCount || 0) + 1)
                  }
                  className="w-5 h-5 rounded hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Delete Button */}
          <button
            onClick={() => deleteGoal(goal.id)}
            className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Xóa mục tiêu này"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Big Completion Checkmark Button */}
          <button
            onClick={handleComplete}
            className="group/btn relative px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-white transition-all shadow-md hover:shadow-emerald-500/20 active:scale-95 flex items-center gap-1.5"
            title="Nhấp để đánh dấu hoàn thành"
          >
            <Check className="w-4 h-4 stroke-[2.5] text-emerald-400 group-hover/btn:text-white transition-colors" />
            <span className="text-xs font-bold">Xong</span>
          </button>
        </div>
      </div>
    </div>
  );
};
