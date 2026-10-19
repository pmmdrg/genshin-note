import React from 'react';
import { Sparkles, Plus, CloudSync, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { getGenshinServerDate } from '../utils/priority';
import { useStore } from '../store/useStore';
import { DAY_NAMES } from '../data/genshinData';

interface NavbarProps {
  onOpenAddModal: () => void;
  onOpenHoyoModal: () => void;
  activeTab: 'timeline' | 'completed';
  setActiveTab: (tab: 'timeline' | 'completed') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddModal,
  onOpenHoyoModal,
  activeTab,
  setActiveTab,
}) => {
  const { goals, hoyoData } = useStore();
  const serverDate = getGenshinServerDate(8); // UTC+8 Asia

  const completedCount = goals.filter((g) => g.isCompleted).length;
  const activeCount = goals.filter((g) => !g.isCompleted).length;

  return (
    <header className="sticky top-0 z-40 bg-[#0c101d]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Server Time */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-0.5 shadow-lg shadow-amber-500/10 flex items-center justify-center">
              <div className="w-full h-full bg-[#0d1222] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Genshin Note
                </h1>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Priority Stack
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <div className="flex items-center gap-1 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{DAY_NAMES[serverDate.dayOfWeek]}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Máy chủ {serverDate.displayTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation tabs & Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Tab Switcher */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'timeline'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Timeline ({activeCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'completed'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã Xong ({completedCount})</span>
            </button>
          </div>

          {/* HoYoLAB Connection Status */}
          <button
            onClick={onOpenHoyoModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              hoyoData
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
            }`}
            title="Đồng bộ HoYoLAB API qua Vercel"
          >
            <CloudSync className={`w-3.5 h-3.5 ${hoyoData ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">
              {hoyoData ? 'HoYoLAB: Đã kết nối' : 'Đồng bộ HoYoLAB'}
            </span>
          </button>

          {/* Add Goal Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-semibold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Thêm mục tiêu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
