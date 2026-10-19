import React, { useState } from 'react';
import {
  Sparkles,
  Droplet,
  Gift,
  RotateCw,
  CheckCircle2,
  User,
  GitBranch,
  Calendar,
  Clock,
  Compass,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { calculateResinRecovery, formatSecondsToTime, getGenshinServerDate } from '../utils/priority';
import { DAY_NAMES } from '../data/genshinData';
import { APP_VERSION } from '../version';

export const Sidebar: React.FC = () => {
  const {
    activeNav,
    setActiveNav,
    manualResin,
    lastResinUpdate,
    hoyoData,
    commissionsCount,
    syncWithHoyo,
    hoyoSyncLoading,
    executeDailyCheckIn,
    checkInLoading,
    checkInStatus,
    characterTrees,
    characters,
  } = useStore();

  const [showCheckInToast, setShowCheckInToast] = useState(false);

  const serverDate = getGenshinServerDate(8); // UTC+8 Asia
  const recoveryInfo = calculateResinRecovery(manualResin, lastResinUpdate);
  const currentResin = recoveryInfo.actualResin;
  const isCapped = currentResin >= 200;
  const isDanger = currentResin >= 170;

  const actualCommissions = hoyoData ? hoyoData.finished_task_num : commissionsCount;
  const activeTreeCount = characterTrees.filter((t) => !t.isCompleted).length;
  const completedCount = characterTrees.filter((t) => t.isCompleted).length;

  const handleCheckIn = async () => {
    await executeDailyCheckIn();
    setShowCheckInToast(true);
    setTimeout(() => setShowCheckInToast(false), 4000);
  };

  return (
    <aside className="w-full md:w-72 lg:w-80 md:h-screen md:sticky md:top-0 bg-[#07090e]/75 backdrop-blur-2xl border-b md:border-b-0 md:border-r border-white/[0.08] p-4 flex flex-col justify-between shrink-0 z-30 shadow-[4px_0_30px_rgba(0,0,0,0.3)] overflow-y-auto">
      {/* ================= TOP: BRAND & SERVER TIME ================= */}
      <div className="space-y-4">
        {/* Brand */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400/20 via-white/10 to-indigo-500/20 p-px shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0f1d]/80 backdrop-blur-md rounded-[15px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Genshin Note
                </h1>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-white/[0.06] text-slate-400 border border-white/[0.08]">
                  v{APP_VERSION}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Server Time Widget */}
        <div className="liquid-glass-subtle rounded-2xl p-2.5 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-medium">{DAY_NAMES[serverDate.dayOfWeek]}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>Máy chủ {serverDate.displayTime}</span>
          </div>
        </div>

        {/* ================= NAVIGATION MENU ================= */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 pb-1">
            Menu Chính
          </div>

          {/* 1. Danh Sách Nhân Vật */}
          <button
            onClick={() => setActiveNav('characters')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
              activeNav === 'characters'
                ? 'bg-gradient-to-r from-indigo-500/80 to-blue-600/80 text-white shadow-[0_4px_16px_rgba(99,102,241,0.3)] border border-indigo-400/30'
                : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4" />
              <span>Danh Sách Nhân Vật</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeNav === 'characters' ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400'
              }`}
            >
              {characters.length}
            </span>
          </button>

          {/* 2. Việc Cần Làm (Timeline Cây Nhánh) */}
          <button
            onClick={() => setActiveNav('timeline')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
              activeNav === 'timeline'
                ? 'bg-gradient-to-r from-amber-500/80 to-amber-600/80 text-white shadow-[0_4px_16px_rgba(245,158,11,0.3)] border border-amber-400/30'
                : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <GitBranch className="w-4 h-4" />
              <span>Việc Cần Làm</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeNav === 'timeline' ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-amber-300'
              }`}
            >
              {activeTreeCount}
            </span>
          </button>

          {/* 3. Đã Hoàn Thành */}
          <button
            onClick={() => setActiveNav('completed')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
              activeNav === 'completed'
                ? 'bg-gradient-to-r from-emerald-500/80 to-teal-600/80 text-white shadow-[0_4px_16px_rgba(16,185,129,0.3)] border border-emerald-400/30'
                : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã Hoàn Thành</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeNav === 'completed' ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-emerald-300'
              }`}
            >
              {completedCount}
            </span>
          </button>
        </div>
      </div>

      {/* ================= BOTTOM: RESIN CARD, DAILIES, CHECK-IN, REFRESH ================= */}
      <div className="space-y-3 pt-4 border-t border-white/[0.08] mt-4">
        {/* RESIN WIDGET CARD */}
        <div
          className={`liquid-glass rounded-2xl p-3.5 relative overflow-hidden transition-all ${
            isDanger ? 'border-rose-500/30 shadow-[0_0_16px_rgba(244,63,94,0.15)]' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center p-1.5 ${
                  isDanger
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                }`}
              >
                <Droplet className="w-full h-full fill-current" />
              </div>
              <span className="text-xs font-bold text-slate-200">Nhựa Nguyên Bản</span>
            </div>
            <div className="text-right">
              <span
                className={`text-base font-extrabold font-mono ${
                  isDanger ? 'text-rose-300' : 'text-cyan-200'
                }`}
              >
                {currentResin}
              </span>
              <span className="text-slate-400 text-xs font-medium">/200</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/[0.04] rounded-full h-2 overflow-hidden border border-white/[0.08] mb-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isDanger
                  ? 'bg-gradient-to-r from-amber-400 to-rose-500'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              }`}
              style={{ width: `${Math.min(100, (currentResin / 200) * 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>{isCapped ? 'Đã đạt giới hạn' : `Đầy sau: ${formatSecondsToTime(recoveryInfo.secondsUntilFull)}`}</span>
            {!isCapped && <span>+1: {formatSecondsToTime(recoveryInfo.secondsUntilNext)}</span>}
          </div>
        </div>

        {/* DAILY COMMISSIONS WIDGET */}
        <div className="liquid-glass-subtle rounded-2xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-300" />
            <span className="font-semibold text-slate-200">Ủy thác ngày</span>
          </div>
          <span
            className={`font-mono font-bold px-2 py-0.5 rounded-lg border text-[11px] ${
              actualCommissions === 4
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            }`}
          >
            {actualCommissions} / 4 {actualCommissions === 4 ? '✓' : ''}
          </span>
        </div>

        {/* ACTION BUTTONS: CHECK-IN & REFRESH */}
        <div className="grid grid-cols-2 gap-2">
          {/* Daily Check-in Button */}
          <button
            onClick={handleCheckIn}
            disabled={checkInLoading}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 hover:from-violet-500/30 hover:to-purple-500/30 border border-violet-400/30 text-xs font-bold text-violet-200 transition-all active:scale-95 disabled:opacity-50"
            title="Điểm danh HoYoLAB nhận quà"
          >
            <Gift className={`w-3.5 h-3.5 text-violet-300 ${checkInLoading ? 'animate-bounce' : ''}`} />
            <span>Điểm danh</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={() => syncWithHoyo()}
            disabled={hoyoSyncLoading}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-xs font-bold text-slate-200 transition-all active:scale-95 disabled:opacity-50"
            title="Làm mới dữ liệu từ HoYoLAB"
          >
            <RotateCw className={`w-3.5 h-3.5 text-cyan-400 ${hoyoSyncLoading ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* Check-in Toast Notification */}
      {showCheckInToast && checkInStatus && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-violet-400/40 backdrop-blur-xl text-xs font-bold text-violet-200 shadow-[0_8px_30px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-center gap-2">
          <Gift className="w-4 h-4 text-violet-400" />
          <span>{checkInStatus}</span>
        </div>
      )}
    </aside>
  );
};
