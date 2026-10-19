import React from 'react';
import { Sparkles, RotateCw, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { getGenshinServerDate } from '../utils/priority';
import { useStore } from '../store/useStore';
import { DAY_NAMES } from '../data/genshinData';

interface NavbarProps {
  activeTab: 'timeline' | 'completed';
  setActiveTab: (tab: 'timeline' | 'completed') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { goals, syncWithHoyo, hoyoSyncLoading } = useStore();
  const serverDate = getGenshinServerDate(8); // UTC+8 Asia
  const completedCount = goals.filter((g) => g.isCompleted).length;
  const activeCount = goals.filter((g) => !g.isCompleted).length;

  return (
    <header className="sticky top-0 z-40 bg-[#07090e]/60 backdrop-blur-2xl border-b border-white/[0.08] px-4 lg:px-8 py-3.5 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand & Server Time */}
        <div className="flex items-center gap-3.5 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400/20 via-white/10 to-indigo-500/20 p-px shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0f1d]/70 backdrop-blur-md rounded-[15px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Genshin Note
                </h1>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <div className="flex items-center gap-1 text-slate-300">
                  <Calendar className="w-3 h-3 text-indigo-400" />
                  <span>{DAY_NAMES[serverDate.dayOfWeek]}</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{serverDate.displayTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation tabs & Action Buttons - Exactly Equal Height */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Tab Filter Switcher (h-10) */}
          <div className="h-10 flex items-center bg-white/[0.04] backdrop-blur-xl p-1 rounded-2xl border border-white/[0.08] text-xs font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`h-full flex items-center gap-1.5 px-3.5 rounded-xl transition-all ${
                activeTab === 'timeline'
                  ? 'bg-gradient-to-r from-amber-500/80 to-amber-600/80 text-white font-semibold shadow-[0_4px_16px_rgba(245,158,11,0.25)] border border-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Timeline ({activeCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`h-full flex items-center gap-1.5 px-3.5 rounded-xl transition-all ${
                activeTab === 'completed'
                  ? 'bg-gradient-to-r from-emerald-500/80 to-teal-600/80 text-white font-semibold shadow-[0_4px_16px_rgba(16,185,129,0.25)] border border-emerald-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã Xong ({completedCount})</span>
            </button>
          </div>

          {/* Refresh Button (h-10 - matched height & radius) */}
          <button
            onClick={() => syncWithHoyo()}
            disabled={hoyoSyncLoading}
            className="h-10 flex items-center gap-2 px-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 text-xs font-semibold text-slate-200 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] active:scale-95 disabled:opacity-50"
            title="Làm mới dữ liệu từ HoYoLAB"
          >
            <RotateCw className={`w-3.5 h-3.5 text-cyan-400 ${hoyoSyncLoading ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </button>
        </div>
      </div>
    </header>
  );
};
