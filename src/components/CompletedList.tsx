import React from 'react';
import { CheckCircle2, RotateCcw, Trash2, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';


export const CompletedList: React.FC = () => {
  const { goals, restoreGoal, deleteGoal, clearCompletedGoals } = useStore();
  const completedGoals = goals.filter((g) => g.isCompleted);

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return '';
    const d = new Date(timestamp);
    return `${d.toLocaleDateString('vi-VN')} lúc ${d.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Lịch Sử Mục Tiêu Đã Hoàn Thành
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {completedGoals.length} đã xong
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Các mục tiêu bạn đã bồi dưỡng thành công. Bạn có thể khôi phục lại bất kỳ lúc nào.
          </p>
        </div>

        {completedGoals.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn xóa vĩnh viễn toàn bộ mục tiêu đã xong?')) {
                clearCompletedGoals();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-500/15 border border-slate-700 hover:border-rose-500/30 text-xs font-semibold text-slate-300 hover:text-rose-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Dọn sạch lịch sử</span>
          </button>
        )}
      </div>

      {/* Empty State */}
      {completedGoals.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-800/80 bg-slate-900/30 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center mb-4 text-slate-500">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-200 mb-1">
            Chưa có mục tiêu nào hoàn thành
          </h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Khi bạn hoàn thành một mục tiêu trên Timeline, hãy nhấp vào nút "Xong" để chuyển qua đây.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {completedGoals.map((goal) => (
            <div
              key={goal.id}
              className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-slate-700/80"
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                {/* Completed Checkmark Icon */}
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>

                {/* Target Avatar if available */}
                {goal.targetAvatar && (
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-700 bg-slate-800">
                    <img
                      src={goal.targetAvatar}
                      alt={goal.title}
                      className="w-full h-full object-cover grayscale opacity-70"
                    />
                  </div>
                )}

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-300 line-through truncate">
                    {goal.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 flex-wrap">
                    {goal.farmTarget && (
                      <span>{goal.farmTarget.materialName}</span>
                    )}
                    {goal.completedAt && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-emerald-400/80">
                          <Calendar className="w-3 h-3" />
                          Hoàn thành: {formatDate(goal.completedAt)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => restoreGoal(goal.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                  title="Đưa mục tiêu này trở lại Đỉnh Timeline"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Khôi phục</span>
                </button>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Xóa vĩnh viễn"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
