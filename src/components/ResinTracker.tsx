import React, { useState, useEffect } from 'react';
import { Droplet, Plus, AlertTriangle, Compass, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { calculateResinRecovery, formatSecondsToTime } from '../utils/priority';

export const ResinTracker: React.FC = () => {
  const {
    manualResin,
    lastResinUpdate,
    updateManualResin,
    spendOrAddResin,
    commissionsCount,
    setCommissionsCount,
    weeklyBossCount,
    setWeeklyBossCount,
    hoyoData,
    syncWithHoyo,
    hoyoSyncLoading,
  } = useStore();

  const [, setTick] = useState(0);

  const [isEditingResin, setIsEditingResin] = useState(false);
  const [editInput, setEditInput] = useState('');

  // Auto tick every second to update countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const recoveryInfo = calculateResinRecovery(manualResin, lastResinUpdate);
  const currentResin = recoveryInfo.actualResin;
  const isCapped = currentResin >= 200;
  const isDanger = currentResin >= 170;

  const handleSaveEdit = () => {
    const parsed = parseInt(editInput, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 200) {
      updateManualResin(parsed);
    }
    setIsEditingResin(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      {/* 1. Main Resin Card */}
      <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0f1424] to-[#12182c] border border-slate-800/80 p-5 shadow-xl shadow-slate-950/40">
        {/* Ambient background glow */}
        <div
          className={`absolute -right-16 -top-16 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none transition-all ${
            isDanger ? 'bg-rose-500' : 'bg-cyan-500'
          }`}
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center p-2.5 transition-all ${
                isDanger
                  ? 'bg-rose-500/15 border border-rose-500/30 text-rose-400 shadow-lg shadow-rose-500/20'
                  : 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/20'
              }`}
            >
              <Droplet className="w-full h-full fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Nhựa Nguyên Bản (Resin)
                </span>
                {isDanger && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    Sắp đầy!
                  </span>
                )}
              </div>

              {/* Editable Resin Number */}
              {isEditingResin ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    min="0"
                    max="200"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    className="w-20 bg-slate-800 border border-cyan-500 rounded px-2 py-0.5 text-xl font-bold text-cyan-300 focus:outline-none"
                    autoFocus
                  />
                  <span className="text-slate-400 text-sm">/ 200</span>
                  <button
                    onClick={handleSaveEdit}
                    className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded font-medium"
                  >
                    Lưu
                  </button>
                  <button
                    onClick={() => setIsEditingResin(false)}
                    className="text-xs text-slate-400 hover:text-slate-300 px-1 py-1"
                  >
                    Hủy
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setEditInput(currentResin.toString());
                    setIsEditingResin(true);
                  }}
                  className="flex items-baseline gap-1.5 cursor-pointer group hover:opacity-90"
                  title="Nhấp để sửa nhanh số lượng nhựa"
                >
                  <span
                    className={`text-3xl font-extrabold tracking-tight transition-colors ${
                      isDanger ? 'text-rose-400' : 'text-cyan-300 group-hover:text-cyan-200'
                    }`}
                  >
                    {currentResin}
                  </span>
                  <span className="text-slate-400 text-sm font-semibold">/ 200</span>
                  <span className="text-[11px] text-slate-500 group-hover:text-slate-400 ml-1">
                    (Nhấp để sửa)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Countdown timer */}
          <div className="text-left sm:text-right">
            <div className="text-xs text-slate-400">Thời gian đầy</div>
            <div className="text-base font-bold text-slate-200 font-mono mt-0.5">
              {isCapped ? (
                <span className="text-rose-400 font-sans">Đã đạt giới hạn (200)</span>
              ) : (
                formatSecondsToTime(recoveryInfo.secondsUntilFull)
              )}
            </div>
            {!isCapped && (
              <div className="text-[11px] text-cyan-400/80 font-mono">
                +1 trong {formatSecondsToTime(recoveryInfo.secondsUntilNext)}
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800/80 rounded-full h-3 mb-4 overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isDanger
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600'
                : 'bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400'
            }`}
            style={{ width: `${Math.min(100, (currentResin / 200) * 100)}%` }}
          />
        </div>

        {/* Quick spend / add buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-medium text-slate-400 mr-1">Tiêu nhanh:</span>
            <button
              onClick={() => spendOrAddResin(-20)}
              disabled={currentResin < 20}
              className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              -20 (Bí cảnh)
            </button>
            <button
              onClick={() => spendOrAddResin(-40)}
              disabled={currentResin < 40}
              className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              -40 (Boss)
            </button>
            <button
              onClick={() => spendOrAddResin(-30)}
              disabled={currentResin < 30}
              className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              -30 (Boss tuần)
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => spendOrAddResin(60)}
              className="px-2.5 py-1 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition-colors flex items-center gap-1"
              title="Dùng 1 Nhựa Dễ Vỡ (Fragile Resin)"
            >
              <Plus className="w-3 h-3" />
              +60 (Nhựa Dễ Vỡ)
            </button>
          </div>
        </div>
      </div>

      {/* 2. Dailies & Weekly Quick Checklist */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0f1424] to-[#12182c] border border-slate-800/80 p-5 shadow-xl shadow-slate-950/40 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-400" />
              Nhiệm Vụ Hằng Ngày & Tuần
            </h2>
            {hoyoData && (
              <button
                onClick={syncWithHoyo}
                disabled={hoyoSyncLoading}
                className="text-slate-400 hover:text-cyan-300 transition-colors"
                title="Đồng bộ lại"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${hoyoSyncLoading ? 'animate-spin' : ''}`} />
              </button>
            )}
          </div>

          {/* Daily Commissions 0/4 */}
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-800 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-200">Ủy Thác Hằng Ngày</span>
              </div>
              <span
                className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                  commissionsCount >= 4
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-700/60 text-slate-300'
                }`}
              >
                {commissionsCount} / 4
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setCommissionsCount(commissionsCount >= num ? num - 1 : num)}
                  className={`h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                    commissionsCount >= num
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-sm shadow-amber-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-500 border border-slate-700/60'
                  }`}
                >
                  #{num}
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Boss Discount 0/3 */}
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-200">Boss Tuần (-50% Nhựa)</span>
              </div>
              <span
                className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                  weeklyBossCount >= 3
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-700/60 text-slate-300'
                }`}
              >
                {weeklyBossCount} / 3
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => setWeeklyBossCount(weeklyBossCount >= num ? num - 1 : num)}
                  className={`h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                    weeklyBossCount >= num
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-sm shadow-indigo-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-500 border border-slate-700/60'
                  }`}
                >
                  30 Nhựa
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sync Footer notice */}
        <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
          <span>{hoyoData ? 'Đồng bộ từ HoYoLAB' : 'Chế độ Cục bộ (Offline)'}</span>
          <span className="text-slate-400">Reset lúc 04:00 AM</span>
        </div>
      </div>
    </div>
  );
};
