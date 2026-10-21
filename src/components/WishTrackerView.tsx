import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Shield,
  Plus,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit2,
  TrendingUp,
  Award,
  Zap,
  BookOpen,
  Search,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import type { WishRecord } from '../types';
import {
  calculatePityInfo,
  calculateAutoCapturingRadiance,
  calculateWishSummary,
  BANNER_NAMES,
} from '../data/wishData';
import { AddWishModal } from './AddWishModal';

export const WishTrackerView: React.FC = () => {
  const {
    activeWishBanner,
    setActiveWishBanner,
    wishBannerStats,
    wishHistory,
    setCurrentWishPity,
    incrementWishPity,
    toggleWishGuarantee,
    setFatePoints,
    deleteWishRecord,
    clearWishHistory,
  } = useStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingWish, setEditingWish] = useState<WishRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'rateUp' | 'radiance' | 'lost'>('all');
  const [confirmClear, setConfirmClear] = useState(false);

  // Current banner stats
  const currentStats = wishBannerStats[activeWishBanner] || {
    currentPity: 0,
    isGuaranteed: false,
    capturingRadianceLossStreak: 0,
    fatePoints: 0,
  };

  const pityInfo = useMemo(() => {
    return calculatePityInfo(activeWishBanner, currentStats.currentPity);
  }, [activeWishBanner, currentStats.currentPity]);

  // Automatic Capturing Radiance calculation based on history
  const radianceInfo = useMemo(() => {
    return calculateAutoCapturingRadiance(wishHistory, !!currentStats.isGuaranteed);
  }, [wishHistory, currentStats.isGuaranteed]);

  const summary = useMemo(() => {
    return calculateWishSummary(wishHistory, activeWishBanner);
  }, [wishHistory, activeWishBanner]);

  // Determine if player has guarantee based on last record in history
  const lastBannerRecord = useMemo(() => {
    return wishHistory.find((r) => r.bannerType === activeWishBanner);
  }, [wishHistory, activeWishBanner]);

  const isGuaranteedEffective = useMemo(() => {
    if (activeWishBanner === 'standard') return false;
    if (lastBannerRecord) {
      return !lastBannerRecord.isRateUp;
    }
    return !!currentStats.isGuaranteed;
  }, [lastBannerRecord, currentStats.isGuaranteed, activeWishBanner]);

  // Filtered wish history
  const filteredHistory = useMemo(() => {
    const list = wishHistory.filter((r) => r.bannerType === activeWishBanner);
    const query = searchQuery.trim().toLowerCase();

    return list.filter((r) => {
      // Query filter
      if (
        query &&
        !r.name.toLowerCase().includes(query) &&
        !r.nameVi.toLowerCase().includes(query) &&
        !(r.notes || '').toLowerCase().includes(query)
      ) {
        return false;
      }

      // Status filter
      if (activeWishBanner !== 'standard') {
        if (filterType === 'rateUp') {
          return r.isRateUp && !r.isCapturingRadiance;
        }
        if (filterType === 'radiance') {
          return !!r.isCapturingRadiance;
        }
        if (filterType === 'lost') {
          return !r.isRateUp;
        }
      }
      return true;
    });
  }, [wishHistory, activeWishBanner, searchQuery, filterType]);

  const handleOpenAddModal = (wish?: WishRecord) => {
    setEditingWish(wish || null);
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* ================= 1. HEADER SECTION (MINIMAL) ================= */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/25 via-pink-500/20 to-purple-500/25 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.3)]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Lịch Sử Cầu Nguyện</span>
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full radiance-badge text-white">
                5.0+ Bắt Lấy Ánh Sáng
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* ================= 2. BANNER TYPE SELECTOR TABS ================= */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl liquid-glass-subtle border border-white/[0.08] overflow-x-auto">
        <button
          onClick={() => setActiveWishBanner('character')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeWishBanner === 'character'
              ? 'bg-gradient-to-r from-purple-500/90 to-indigo-600/90 text-white shadow-[0_4px_16px_rgba(168,85,247,0.35)] scale-[1.02]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Nhân Vật</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/20 text-white font-extrabold">
            {wishBannerStats.character.currentPity}/90
          </span>
        </button>

        <button
          onClick={() => setActiveWishBanner('weapon')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeWishBanner === 'weapon'
              ? 'bg-gradient-to-r from-amber-500/90 to-orange-600/90 text-white shadow-[0_4px_16px_rgba(245,158,11,0.35)] scale-[1.02]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>Vũ Khí</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/20 text-white font-extrabold">
            {wishBannerStats.weapon.currentPity}/80
          </span>
        </button>

        <button
          onClick={() => setActiveWishBanner('standard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeWishBanner === 'standard'
              ? 'bg-gradient-to-r from-blue-500/90 to-cyan-600/90 text-white shadow-[0_4px_16px_rgba(59,130,246,0.35)] scale-[1.02]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-cyan-300" />
          <span>Thường</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/20 text-white font-extrabold">
            {wishBannerStats.standard.currentPity}/90
          </span>
        </button>

        <button
          onClick={() => setActiveWishBanner('chronicled')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeWishBanner === 'chronicled'
              ? 'bg-gradient-to-r from-teal-500/90 to-emerald-600/90 text-white shadow-[0_4px_16px_rgba(20,184,166,0.35)] scale-[1.02]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-teal-300" />
          <span>Sử Ký</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/20 text-white font-extrabold">
            {wishBannerStats.chronicled.currentPity}/90
          </span>
        </button>
      </div>

      {/* ================= 3. TOP DASHBOARD STATS CARDS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CARD 1: PITY TRACKER CARD */}
        <div className="liquid-glass rounded-3xl p-5 border border-white/[0.12] flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <div className="space-y-4">
            {/* Header of Pity Card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
                  {pityInfo.maxPity}
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Bộ Đếm Pity Hiện Tại
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {activeWishBanner === 'weapon'
                      ? 'Vũ khí (Tối đa 80)'
                      : `${BANNER_NAMES[activeWishBanner]} (Tối đa 90)`}
                  </span>
                </div>
              </div>

              {/* Guarantee Toggle Pill */}
              {activeWishBanner !== 'standard' && (
                <button
                  onClick={() => toggleWishGuarantee(activeWishBanner)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                    isGuaranteedEffective
                      ? 'bg-indigo-500/25 border-indigo-400/50 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                      : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-slate-200'
                  }`}
                  title="Tự động xét từ lần nổ gần nhất (Bấm nếu muốn đổi thủ công)"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>
                    {activeWishBanner === 'chronicled'
                      ? isGuaranteedEffective
                        ? 'Có Định Mệnh'
                        : 'Chưa Có'
                      : isGuaranteedEffective
                      ? 'Có Bảo Hiểm'
                      : '50/50'}
                  </span>
                </button>
              )}
            </div>

            {/* Pity Number & Progress Bar */}
            <div className="space-y-2.5">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`text-4xl sm:text-5xl font-black tracking-tight ${
                      pityInfo.isSoftPity
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300 animate-pulse'
                        : 'text-white'
                    }`}
                  >
                    {pityInfo.currentPity}
                  </span>
                  <span className="text-base font-bold text-slate-400">/ {pityInfo.maxPity}</span>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-extrabold px-2 py-0.5 rounded-lg border ${
                      pityInfo.isSoftPity
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : 'bg-white/[0.06] text-slate-300 border-white/[0.08]'
                    }`}
                  >
                    {pityInfo.isSoftPity
                      ? '⚡ Vùng Soft Pity!'
                      : `Còn ${pityInfo.pullsToSoftPity} roll tới Soft Pity`}
                  </span>
                </div>
              </div>

              {/* Linear Progress Bar with Soft Pity Marker */}
              <div className="relative w-full h-3.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/[0.08]">
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-amber-400/60 z-10"
                  style={{ left: `${(pityInfo.softPityStart / pityInfo.maxPity) * 100}%` }}
                  title={`Soft Pity bắt đầu ở mốc ${pityInfo.softPityStart}`}
                />
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    pityInfo.isSoftPity
                      ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                      : 'bg-gradient-to-r from-indigo-500 to-cyan-400'
                  }`}
                  style={{ width: `${pityInfo.progressPercent}%` }}
                />
              </div>

              {/* Informative Row */}
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>
                  Hard Pity: <strong className="text-slate-200">{pityInfo.pullsToHardPity} roll</strong> (
                  {(pityInfo.primosToHardPity).toLocaleString()} Đá)
                </span>
                <span>Soft Pity: mốc {pityInfo.softPityStart}</span>
              </div>
            </div>
          </div>

          {/* Quick Pity Steppers & Add 5★ button for this banner */}
          <div className="flex items-center justify-between gap-1.5 pt-3 border-t border-white/[0.08] mt-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => incrementWishPity(activeWishBanner, -1)}
                className="px-2 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-slate-300 border border-white/[0.08] transition-colors cursor-pointer active:scale-95"
                title="Giảm 1 roll"
              >
                -1
              </button>
              <button
                onClick={() => incrementWishPity(activeWishBanner, 1)}
                className="px-2.5 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-xs font-bold text-indigo-300 border border-indigo-500/30 transition-colors cursor-pointer active:scale-95"
                title="Cộng 1 roll"
              >
                +1
              </button>
              <button
                onClick={() => incrementWishPity(activeWishBanner, 10)}
                className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-xs font-bold text-amber-300 border border-amber-500/30 transition-colors cursor-pointer active:scale-95"
                title="Cộng 10 roll"
              >
                +10
              </button>
              <button
                onClick={() => setCurrentWishPity(activeWishBanner, 0)}
                className="px-2 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
                title="Đặt lại Pity về 0"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Banner Specific Add 5★ Button */}
            <button
              onClick={() => handleOpenAddModal()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-[0_2px_12px_rgba(245,158,11,0.35)] transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Thêm 5★</span>
            </button>
          </div>
        </div>

        {/* CARD 2: BANNER MECHANIC (STAT ONLY) */}
        {activeWishBanner === 'character' ? (
          <div className="liquid-glass rounded-3xl p-5 border border-pink-500/25 radiance-card-glow flex flex-col justify-between relative overflow-hidden shadow-[0_10px_30px_rgba(236,72,153,0.15)]">
            <div className="space-y-3.5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl radiance-badge flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-pink-300">
                      Bắt Lấy Ánh Sáng (5.0+)
                    </h3>
                    <span className="text-[11px] text-slate-400">Tự động tính từ lần bắt sáng trước</span>
                  </div>
                </div>

                <span
                  className={`text-xs font-black px-2.5 py-0.5 rounded-lg border ${
                    radianceInfo.guaranteedNext
                      ? 'radiance-badge text-white font-extrabold animate-pulse'
                      : 'bg-pink-500/20 text-pink-300 border-pink-500/30'
                  }`}
                >
                  {radianceInfo.statusBadge}
                </span>
              </div>

              {/* High-impact Status & Number */}
              <div className="p-3.5 rounded-2xl bg-black/35 border border-pink-500/20 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Trạng thái:</div>
                <div className="text-lg sm:text-xl font-black text-white leading-tight">
                  {radianceInfo.statusTitle}
                </div>
              </div>

              {/* Visual 3-Loss Progress Tracker */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Tích lũy lệch (3 lần = chắc chắn):</span>
                  <span className="font-bold text-white">
                    {radianceInfo.lossesSinceLastRadiance} / 3 lần lệch
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((step) => {
                    const isPassed = radianceInfo.lossesSinceLastRadiance >= step;
                    const isFinal = step === 3;
                    return (
                      <div
                        key={step}
                        className={`p-2 rounded-xl text-center border transition-all select-none ${
                          isPassed
                            ? isFinal
                              ? 'radiance-badge text-white font-extrabold border-pink-400'
                              : 'bg-purple-500/30 border-purple-400/50 text-purple-200'
                            : 'bg-white/[0.03] border-white/[0.08] text-slate-500'
                        }`}
                      >
                        <div className="text-[10px] font-bold">Lần Lệch {step}</div>
                        <div className="text-[11px] font-black mt-0.5">
                          {step === 1 ? 'Còn 2' : step === 2 ? 'Còn 1' : '100% ✨'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Đến khi chắc chắn:</span>
              <span className="font-bold text-pink-300">
                {radianceInfo.guaranteedNext
                  ? '100% ở lần 50/50 tiếp theo'
                  : `Còn ${radianceInfo.remainingLosses} lần lệch nữa`}
              </span>
            </div>
          </div>
        ) : activeWishBanner === 'weapon' ? (
          /* Weapon Banner Info Card */
          <div className="liquid-glass rounded-3xl p-5 border border-white/[0.12] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Định Mệnh Vũ Khí (5.0)
                    </h3>
                    <span className="text-[11px] text-slate-400">Tối đa 1 Điểm Định Mệnh</span>
                  </div>
                </div>

                <span
                  className={`text-xs font-extrabold px-2.5 py-0.5 rounded-lg border ${
                    currentStats.fatePoints === 1
                      ? 'bg-amber-500/25 border-amber-400/50 text-amber-300'
                      : 'bg-white/[0.05] text-slate-400 border-white/[0.08]'
                  }`}
                >
                  {currentStats.fatePoints || 0} / 1 Điểm
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/[0.08] space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Trạng thái:</div>
                <div className="text-lg font-bold text-white">
                  {currentStats.fatePoints === 1
                    ? '✨ 100% Ra Vũ Khí Đã Chọn'
                    : 'Đang trong kỳ 50/50 vũ khí'}
                </div>
              </div>

              {/* Quick toggle Fate point */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400 text-[11px]">Gán Điểm Định Mệnh:</span>
                <div className="flex items-center gap-1.5">
                  {[0, 1].map((pt) => (
                    <button
                      key={pt}
                      onClick={() => setFatePoints('weapon', pt)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        (currentStats.fatePoints || 0) === pt
                          ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                          : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
                      }`}
                    >
                      {pt} Điểm {pt === 1 ? '(100%)' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] text-xs text-slate-400 flex items-center justify-between">
              <span>Loại Duyên:</span>
              <span className="text-slate-300 font-semibold">Mối Duyên Vương Vấn (Hồng)</span>
            </div>
          </div>
        ) : activeWishBanner === 'chronicled' ? (
          /* Chronicled Banner (Sử Ký) Info Card */
          <div className="liquid-glass rounded-3xl p-5 border border-teal-500/25 flex flex-col justify-between shadow-[0_10px_30px_rgba(20,184,166,0.2)]">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-bold text-xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-teal-300">
                      Định Mệnh Sử Ký
                    </h3>
                    <span className="text-[11px] text-slate-400">Tối đa 1 Điểm Định Mệnh</span>
                  </div>
                </div>

                <span
                  className={`text-xs font-extrabold px-2.5 py-0.5 rounded-lg border ${
                    currentStats.fatePoints === 1
                      ? 'bg-teal-500/25 border-teal-400/50 text-teal-300'
                      : 'bg-white/[0.05] text-slate-400 border-white/[0.08]'
                  }`}
                >
                  {currentStats.fatePoints || 0} / 1 Điểm
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-teal-500/20 space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Trạng thái:</div>
                <div className="text-lg font-bold text-white">
                  {currentStats.fatePoints === 1
                    ? '✨ 100% Ra Mục Tiêu Đã Chọn'
                    : 'Đang trong kỳ 50/50 mục tiêu'}
                </div>
              </div>

              {/* Quick toggle Fate point */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400 text-[11px]">Gán Điểm Định Mệnh:</span>
                <div className="flex items-center gap-1.5">
                  {[0, 1].map((pt) => (
                    <button
                      key={pt}
                      onClick={() => setFatePoints('chronicled', pt)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        (currentStats.fatePoints || 0) === pt
                          ? 'bg-teal-500/30 border-teal-400 text-teal-200'
                          : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
                      }`}
                    >
                      {pt} Điểm {pt === 1 ? '(100%)' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] text-xs text-slate-400 flex items-center justify-between">
              <span>Loại Duyên:</span>
              <span className="text-slate-300 font-semibold">Mối Duyên Vương Vấn (Hồng)</span>
            </div>
          </div>
        ) : (
          /* Standard Banner (Thường) Info Card */
          <div className="liquid-glass rounded-3xl p-5 border border-white/[0.12] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-blue-500/20 text-cyan-300 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Cầu Nguyện Thường
                    </h3>
                    <span className="text-[11px] text-slate-400">Vĩnh viễn</span>
                  </div>
                </div>

                <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-blue-500/15 border border-blue-400/30 text-blue-300">
                  90 Roll Bảo Hiểm
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Nhân vật 5★ nhận được:</span>
                  <span className="font-extrabold text-indigo-300">{summary.characterCount}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Vũ khí 5★ nhận được:</span>
                  <span className="font-extrabold text-amber-300">{summary.weaponCount}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] text-xs text-slate-400 flex items-center justify-between">
              <span>Loại Duyên:</span>
              <span className="text-slate-300 font-semibold">Mối Duyên Tương Ngộ (Xanh)</span>
            </div>
          </div>
        )}

        {/* CARD 3: STATISTICS CARD */}
        <div className="liquid-glass rounded-3xl p-5 border border-white/[0.12] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <div className="space-y-3.5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    {activeWishBanner === 'standard' ? 'Thống Kê 5★ Đã Quay' : 'Thống Kê Thắng / Lệch'}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {activeWishBanner === 'standard' ? 'Phân loại Nhân vật & Vũ khí' : 'Theo lịch sử đã lưu'}
                  </span>
                </div>
              </div>

              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                {summary.luckLabel}
              </span>
            </div>

            {/* Split Bar / Rate Display */}
            {activeWishBanner === 'standard' ? (
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400 font-medium">Tỉ lệ Nhân Vật / Vũ Khí:</span>
                  <span className="text-sm font-black text-slate-200">
                    {summary.total5Star > 0
                      ? `${Math.round((summary.characterCount / summary.total5Star) * 100)}% Nhân Vật`
                      : '0%'}
                  </span>
                </div>

                <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden flex border border-white/[0.08]">
                  <div
                    className="bg-indigo-500 h-full transition-all duration-500"
                    style={{
                      width: `${summary.total5Star > 0 ? (summary.characterCount / summary.total5Star) * 100 : 50}%`,
                    }}
                    title={`Nhân vật: ${summary.characterCount}`}
                  />
                  <div
                    className="bg-amber-500 h-full transition-all duration-500"
                    style={{
                      width: `${summary.total5Star > 0 ? (summary.weaponCount / summary.total5Star) * 100 : 50}%`,
                    }}
                    title={`Vũ khí: ${summary.weaponCount}`}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                  <span className="text-indigo-400 font-bold">Nhân vật: {summary.characterCount}</span>
                  <span className="text-amber-400 font-bold">Vũ khí: {summary.weaponCount}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400 font-medium">Tỉ Lệ Trúng Rate:</span>
                  <span className="text-2xl font-black text-emerald-400">
                    {summary.winRatePercent}%
                  </span>
                </div>

                <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden flex border border-white/[0.08]">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${summary.winRatePercent}%` }}
                    title={`Trúng: ${summary.rateUpCount}`}
                  />
                  <div
                    className="bg-rose-500 h-full transition-all duration-500"
                    style={{ width: `${100 - summary.winRatePercent}%` }}
                    title={`Lệch: ${summary.lost5050Count}`}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                  <span className="text-emerald-400 font-bold">
                    ✓ Trúng: {summary.rateUpCount}
                  </span>
                  <span className="text-rose-400 font-bold">
                    ✕ Lệch: {summary.lost5050Count}
                  </span>
                </div>
              </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.08]">
              <div className="p-2 rounded-xl bg-white/[0.03] text-center border border-white/[0.06]">
                <div className="text-[10px] text-slate-400">Tổng 5★</div>
                <div className="text-base font-extrabold text-white mt-0.5">
                  {summary.total5Star}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.03] text-center border border-white/[0.06]">
                <div className="text-[10px] text-slate-400">Pity TB</div>
                <div className="text-base font-extrabold text-amber-300 mt-0.5">
                  {summary.averagePity}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.03] text-center border border-white/[0.06]">
                <div className="text-[10px] text-slate-400">
                  {activeWishBanner === 'character'
                    ? 'Bắt Sáng'
                    : activeWishBanner === 'standard'
                    ? 'Vũ Khí'
                    : 'Định Mệnh'}
                </div>
                <div className="text-base font-extrabold text-pink-300 mt-0.5">
                  {activeWishBanner === 'character'
                    ? summary.capturingRadianceCount
                    : activeWishBanner === 'standard'
                    ? summary.weaponCount
                    : summary.rateUpCount}
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-3 border-t border-white/[0.08] mt-3 flex items-center justify-between">
            <span>Đã dùng cho 5★:</span>
            <span className="font-bold text-amber-300">
              {summary.totalPrimos.toLocaleString()} Nguyên Thạch
            </span>
          </div>
        </div>
      </div>

      {/* ================= 4. HISTORY TIMELINE & LIST ================= */}
      <div className="space-y-4 pt-2">
        {/* Timeline Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-white">
              Nhật Ký 5★ ({filteredHistory.length})
            </h2>
            <span className="text-xs text-slate-400">
              — Banner {BANNER_NAMES[activeWishBanner]}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Banner Specific Add 5★ Button */}
            <button
              onClick={() => handleOpenAddModal()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Thêm 5★ {BANNER_NAMES[activeWishBanner]}</span>
            </button>

            {/* Search Input */}
            <div className="relative w-36 sm:w-44">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white/[0.06] border border-white/[0.1] rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
              />
            </div>

            {/* Filter Pills (Hidden for Standard banner because standard has no rate-up/down) */}
            {activeWishBanner !== 'standard' && (
              <div className="flex items-center gap-1 p-1 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    filterType === 'all'
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tất Cả
                </button>
                <button
                  onClick={() => setFilterType('rateUp')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    filterType === 'rateUp'
                      ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 font-bold'
                      : 'text-slate-400 hover:text-emerald-300'
                  }`}
                >
                  Trúng
                </button>
                {activeWishBanner === 'character' && (
                  <button
                    onClick={() => setFilterType('radiance')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      filterType === 'radiance'
                        ? 'radiance-badge text-white font-bold'
                        : 'text-slate-400 hover:text-pink-300'
                    }`}
                  >
                    Bắt Sáng ✨
                  </button>
                )}
                <button
                  onClick={() => setFilterType('lost')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    filterType === 'lost'
                      ? 'bg-rose-500/30 text-rose-200 border border-rose-400/40 font-bold'
                      : 'text-slate-400 hover:text-rose-300'
                  }`}
                >
                  Lệch
                </button>
              </div>
            )}

            {/* Clear History Button */}
            {filteredHistory.length > 0 && (
              <button
                onClick={() => {
                  if (confirmClear) {
                    clearWishHistory(activeWishBanner);
                    setConfirmClear(false);
                  } else {
                    setConfirmClear(true);
                    setTimeout(() => setConfirmClear(false), 4000);
                  }
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                  confirmClear
                    ? 'bg-rose-500/80 text-white border-rose-400 animate-pulse'
                    : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-rose-300'
                }`}
                title="Xóa danh sách lịch sử của banner này"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{confirmClear ? 'Xác nhận xoá?' : 'Xoá'}</span>
              </button>
            )}
          </div>
        </div>

        {/* History Cards Grid */}
        {filteredHistory.length === 0 ? (
          <div className="liquid-glass rounded-3xl p-10 text-center border border-white/[0.08] space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-slate-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-sm font-bold text-slate-300">
              Chưa có lịch sử 5★ cho banner {BANNER_NAMES[activeWishBanner]}
            </div>
            <button
              onClick={() => handleOpenAddModal()}
              className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Bản Ghi Đầu Tiên</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredHistory.map((item, index) => {
              // Pity color assessment
              const isEarly = item.pity < 50;
              const isNormal = item.pity >= 50 && item.pity < pityInfo.softPityStart;

              return (
                <div
                  key={item.id}
                  className={`liquid-glass rounded-2xl p-4 border transition-all relative overflow-hidden group hover:border-white/20 hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] ${
                    item.isCapturingRadiance
                      ? 'border-pink-500/40 radiance-card-glow'
                      : !item.isRateUp && item.bannerType !== 'standard'
                      ? 'border-rose-500/30'
                      : 'border-white/[0.1]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Item Avatar & Details */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-black/40 border border-amber-400/40 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                        <img
                          src={item.icon}
                          alt={item.nameVi}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-xs py-0.5 text-center">
                          <span className="text-[10px] font-black text-amber-300 tracking-tighter">
                            ★★★★★
                          </span>
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white leading-tight">
                            {item.nameVi || item.name}
                          </h4>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {item.name !== item.nameVi ? item.name : ''}
                        </div>
                      </div>
                    </div>

                    {/* Pity Number Badge */}
                    <div className="text-right shrink-0">
                      <div
                        className={`text-xl font-black px-2.5 py-1 rounded-xl border leading-none inline-block shadow-sm ${
                          isEarly
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : isNormal
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        }`}
                        title={`Nổ ở roll số ${item.pity}`}
                      >
                        {item.pity}
                      </div>
                      <div className="text-[9px] font-bold text-slate-500 uppercase mt-0.5 tracking-wider">
                        {isEarly ? 'May Mắn!' : isNormal ? 'Bình Thường' : 'Soft Pity'}
                      </div>
                    </div>
                  </div>

                  {/* Badges Row */}
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.06] flex-wrap">
                    {/* Standard banner shows Character or Weapon badge */}
                    {item.bannerType === 'standard' ? (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border flex items-center gap-1 ${
                          item.itemType === 'character'
                            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {item.itemType === 'character' ? 'Nhân Vật' : 'Vũ Khí'}
                      </span>
                    ) : item.isCapturingRadiance ? (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg radiance-badge text-white flex items-center gap-1">
                        <Sparkles className="w-3 h-3 animate-spin-slow" />
                        <span>Bắt Lấy Ánh Sáng</span>
                      </span>
                    ) : item.isRateUp ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{item.bannerType === 'chronicled' ? 'Trúng Mục Tiêu' : 'Trúng Rate'}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        <span>{item.bannerType === 'chronicled' ? 'Lệch Mục Tiêu' : 'Lệch Rate'}</span>
                      </span>
                    )}

                    {item.isGuaranteed && item.bannerType !== 'standard' && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        <span>{item.bannerType === 'chronicled' ? 'Định Mệnh' : 'Bảo Hiểm'}</span>
                      </span>
                    )}

                    {/* Pull Index in history */}
                    <span className="text-[10px] text-slate-500 ml-auto">
                      #{filteredHistory.length - index}
                    </span>
                  </div>

                  {/* Actions overlay on hover */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenAddModal(item)}
                      className="w-7 h-7 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                      title="Chỉnh sửa bản ghi"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteWishRecord(item.id)}
                      className="w-7 h-7 rounded-lg bg-white/[0.08] hover:bg-rose-500/30 text-slate-400 hover:text-rose-300 flex items-center justify-center transition-colors cursor-pointer"
                      title="Xóa bản ghi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= 5. ADD / EDIT WISH MODAL ================= */}
      <AddWishModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingWish(null);
        }}
        editingWish={editingWish}
        defaultBanner={activeWishBanner}
      />
    </div>
  );
};
