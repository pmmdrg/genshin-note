import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Check, Trash2, Calendar, Droplet, Sparkles, Plus, Minus } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { TaskGoal, ElementType } from '../types';
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
  const elementStyle = goal.element ? ELEMENT_COLORS[goal.element as ElementType] : null;



  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      className={`relative group rounded-3xl transition-all duration-300 ${
        isDragging ? 'opacity-50 z-50 scale-102 shadow-2xl' : ''
      } ${
        isTopPriority
          ? 'bg-gradient-to-r from-amber-500/[0.08] via-slate-900/60 to-slate-900/60 border border-amber-400/40 shadow-[0_8px_32px_rgba(245,158,11,0.15),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl'
          : 'liquid-glass liquid-glass-interactive'
      }`}
    >
      {/* Top Priority Badge */}
      {isTopPriority && (
        <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-[0_2px_12px_rgba(245,158,11,0.4)]">
          <Sparkles className="w-3 h-3 fill-current" />
          Ưu Tiên #1
        </div>
      )}

      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Drag Handle, Avatar, Details */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="p-1 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/[0.06] cursor-grab active:cursor-grabbing transition-colors mt-1"
            title="Kéo thả để đổi thứ tự ưu tiên"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          {/* Priority Index Number */}
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 mt-0.5 border ${
              isTopPriority
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
            }`}
          >
            #{index + 1}
          </div>

          {/* Target Avatar or Icon */}
          {goal.targetAvatar ? (
            <div
              className={`w-12 h-12 rounded-2xl overflow-hidden shrink-0 border relative backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${
                elementStyle ? elementStyle.border : 'border-white/10'
              } ${elementStyle ? elementStyle.bg : 'bg-slate-800/80'}`}
            >
              <img
                src={goal.targetAvatar}
                alt={goal.targetName || goal.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 text-slate-300 font-bold text-lg">
              {goal.title.charAt(0)}
            </div>
          )}

          {/* Title & Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-slate-100 truncate group-hover:text-amber-200 transition-colors">
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
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-500">{goal.farmTarget.domainName}</span>
                  </>
                )}
              </div>
            )}

            {/* Smart badges */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {goal.farmTarget?.daysOfWeek && goal.farmTarget.daysOfWeek.length > 0 && (
                openToday ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-lg shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Bí cảnh mở hôm nay!
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-lg">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    Mở: {goal.farmTarget.daysOfWeek.map((d: number) => (d === 0 ? 'CN' : `T${d + 1}`)).join(', ')}
                  </span>

                )
              )}

              {goal.farmTarget?.resinCost ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-lg">
                  <Droplet className="w-3 h-3 fill-cyan-400/30" />
                  {goal.farmTarget.resinCost} Nhựa/lần
                </span>
              ) : null}

              {goal.notes && (
                <span className="text-[11px] text-slate-400 italic bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-lg max-w-xs truncate">
                  "{goal.notes}"
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Quantity Progress & Completion Tick */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-white/[0.06]">
          {/* Progress Counter */}
          {goal.farmTarget?.targetCount && (
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-2.5 py-1">
              <span className="text-xs text-slate-400 font-medium">Tiến độ:</span>
              <span className="text-xs font-bold text-slate-200 font-mono">
                {goal.farmTarget.currentCount || 0} / {goal.farmTarget.targetCount}
              </span>
              <div className="flex items-center gap-0.5 ml-1">
                <button
                  onClick={() =>
                    updateGoalCount(goal.id, (goal.farmTarget?.currentCount || 0) - 1)
                  }
                  className="w-5 h-5 rounded-lg hover:bg-white/[0.08] flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <button
                  onClick={() =>
                    updateGoalCount(goal.id, (goal.farmTarget?.currentCount || 0) + 1)
                  }
                  className="w-5 h-5 rounded-lg hover:bg-white/[0.08] flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Delete Button */}
          <button
            onClick={() => deleteGoal(goal.id)}
            className="p-2 rounded-2xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Xóa mục tiêu"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Big Completion Checkmark Button */}
          <button
            onClick={handleComplete}
            className="group/btn relative px-4 py-2 rounded-2xl bg-white/[0.05] hover:bg-emerald-500/80 border border-white/[0.1] hover:border-emerald-400 text-slate-300 hover:text-slate-950 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.3)] active:scale-95 flex items-center gap-1.5 font-bold"
            title="Đánh dấu hoàn thành"
          >
            <Check className="w-4 h-4 stroke-[2.5] text-emerald-400 group-hover/btn:text-slate-950 transition-colors" />
            <span className="text-xs">Xong</span>
          </button>
        </div>
      </div>
    </div>
  );
};
