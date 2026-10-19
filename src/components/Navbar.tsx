import React, { useState } from 'react';
import { Sparkles, Droplet, Gift, RotateCw, CheckCircle2, User, GitBranch } from 'lucide-react';
import { useStore } from '../store/useStore';
import { calculateResinRecovery, formatSecondsToTime } from '../utils/priority';

import { APP_VERSION } from '../version';

export const Navbar: React.FC = () => {

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
  } = useStore();

  const [showCheckInToast, setShowCheckInToast] = useState(false);

  const recoveryInfo = calculateResinRecovery(manualResin, lastResinUpdate);
  const currentResin = recoveryInfo.actualResin;
  const isCapped = currentResin >= 200;
  const isDanger = currentResin >= 170;

  const actualCommissions = hoyoData ? hoyoData.finished_task_num : commissionsCount;
  const activeTreeCount = characterTrees.filter((t) => !t.isCompleted).length;

  const handleCheckIn = async () => {
    await executeDailyCheckIn();
    setShowCheckInToast(true);
    setTimeout(() => setShowCheckInToast(false), 4000);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#07090e]/70 backdrop-blur-2xl border-b border-white/[0.08] px-4 lg:px-8 py-2.5 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Brand + Navigation Menu */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400/20 via-white/10 to-indigo-500/20 p-px shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0f1d]/80 backdrop-blur-md rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              </div>
            </div>
            <span className="text-base font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Genshin Note
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-white/[0.06] text-slate-400 border border-white/[0.08]">
              v{APP_VERSION}
            </span>
          </div>


          {/* Navigation Menu */}
          <nav className="h-9 flex items-center bg-white/[0.04] backdrop-blur-xl p-1 rounded-2xl border border-white/[0.08] text-xs font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <button
              onClick={() => setActiveNav('characters')}
              className={`h-full flex items-center gap-1.5 px-3 rounded-xl transition-all ${
                activeNav === 'characters'
                  ? 'bg-gradient-to-r from-indigo-500/80 to-blue-600/80 text-white font-semibold shadow-[0_2px_12px_rgba(99,102,241,0.3)] border border-indigo-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Nhân vật</span>
            </button>
            <button
              onClick={() => setActiveNav('timeline')}
              className={`h-full flex items-center gap-1.5 px-3 rounded-xl transition-all ${
                activeNav === 'timeline'
                  ? 'bg-gradient-to-r from-amber-500/80 to-amber-600/80 text-white font-semibold shadow-[0_2px_12px_rgba(245,158,11,0.3)] border border-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Việc cần làm ({activeTreeCount})</span>
            </button>
            <button
              onClick={() => setActiveNav('completed')}
              className={`h-full flex items-center gap-1.5 px-3 rounded-xl transition-all ${
                activeNav === 'completed'
                  ? 'bg-gradient-to-r from-emerald-500/80 to-teal-600/80 text-white font-semibold shadow-[0_2px_12px_rgba(16,185,129,0.3)] border border-emerald-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã Xong</span>
            </button>
          </nav>
        </div>

        {/* Right: Resin, Commissions, Check-in, Refresh */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          {/* Resin Pill */}
          <div
            className={`h-9 flex items-center gap-2 px-3 rounded-2xl border backdrop-blur-xl transition-all ${
              isDanger
                ? 'bg-rose-500/15 border-rose-500/30 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
                : 'bg-white/[0.04] border-white/[0.08] text-cyan-200'
            }`}
            title={isCapped ? 'Nhựa đã đầy!' : `Đầy sau ${formatSecondsToTime(recoveryInfo.secondsUntilFull)}`}
          >
            <Droplet className={`w-3.5 h-3.5 fill-current ${isDanger ? 'text-rose-400' : 'text-cyan-400'}`} />
            <span className="font-mono text-xs font-bold">{currentResin}/200</span>
            {!isCapped && (
              <span className="text-[10px] text-slate-400 hidden lg:inline font-mono">
                ({formatSecondsToTime(recoveryInfo.secondsUntilFull)})
              </span>
            )}
          </div>

          {/* Daily Commission Pill */}
          <div
            className={`h-9 flex items-center gap-1.5 px-3 rounded-2xl border backdrop-blur-xl text-xs font-medium ${
              actualCommissions === 4
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                : 'bg-white/[0.04] border-white/[0.08] text-amber-300'
            }`}
            title="Ủy thác hằng ngày"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${actualCommissions === 4 ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
            <span className="font-bold">{actualCommissions}/4</span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">Ủy thác</span>
          </div>

          {/* Daily Check-in Button */}
          <button
            onClick={handleCheckIn}
            disabled={checkInLoading}
            className="h-9 flex items-center gap-1.5 px-3 rounded-2xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 hover:from-violet-500/30 hover:to-purple-500/30 border border-violet-400/30 hover:border-violet-400/50 text-xs font-semibold text-violet-200 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50"
            title="Điểm danh HoYoLAB nhận quà"
          >
            <Gift className={`w-3.5 h-3.5 text-violet-300 ${checkInLoading ? 'animate-bounce' : ''}`} />
            <span>Điểm danh</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={() => syncWithHoyo()}
            disabled={hoyoSyncLoading}
            className="h-9 flex items-center gap-1.5 px-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 text-xs font-semibold text-slate-200 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] active:scale-95 disabled:opacity-50"
            title="Làm mới dữ liệu từ HoYoLAB"
          >
            <RotateCw className={`w-3.5 h-3.5 text-cyan-400 ${hoyoSyncLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>
      </div>

      {/* Check-in Toast Notification */}
      {showCheckInToast && checkInStatus && (
        <div className="absolute top-14 right-8 z-50 px-4 py-2 rounded-2xl bg-slate-900/90 border border-violet-400/40 backdrop-blur-xl text-xs font-semibold text-violet-200 shadow-[0_8px_30px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2 duration-200 flex items-center gap-2">
          <Gift className="w-4 h-4 text-violet-400" />
          <span>{checkInStatus}</span>
        </div>
      )}
    </header>
  );
};
