import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Shield,
  Plus,
  RotateCcw,
  Calendar,
  CheckCircle2,
  XCircle,
  Info,
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
  calculateCapturingRadianceInfo,
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
    setCapturingRadianceStreak,
    setFatePoints,
    deleteWishRecord,
    clearWishHistory,
  } = useStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingWish, setEditingWish] = useState<WishRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'rateUp' | 'radiance' | 'lost'>('all');
  const [showRadianceExplainer, setShowRadianceExplainer] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  // Current banner stats
  const currentStats = wishBannerStats[activeWishBanner] || {
    currentPity: 0,
    isGuaranteed: false,
    capturingRadianceLossStreak: 0,
  };

  const pityInfo = useMemo(() => {
    return calculatePityInfo(activeWishBanner, currentStats.currentPity);
  }, [activeWishBanner, currentStats.currentPity]);

  const radianceInfo = useMemo(() => {
    return calculateCapturingRadianceInfo(
      currentStats.capturingRadianceLossStreak || 0,
      !!currentStats.isGuaranteed
    );
  }, [currentStats.capturingRadianceLossStreak, currentStats.isGuaranteed]);

  const summary = useMemo(() => {
    return calculateWishSummary(wishHistory, activeWishBanner);
  }, [wishHistory, activeWishBanner]);

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
      if (filterType === 'rateUp') {
        return r.isRateUp && !r.isCapturingRadiance;
      }
      if (filterType === 'radiance') {
        return !!r.isCapturingRadiance;
      }
      if (filterType === 'lost') {
        return !r.isRateUp;
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
      {/* ================= 1. HEADER SECTION ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
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
              <p className="text-xs text-slate-400 mt-0.5">
                Quản lý Pity hiện tại, đếm chu kỳ 50/50 và theo dõi cơ chế Capturing Radiance chính xác
              </p>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleOpenAddModal()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-[0_4px_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Thêm Lần Nổ 5★</span>
          </button>
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
                      : activeWishBanner === 'chronicled'
                      ? 'Sử Ký (Tối đa 90)'
                      : activeWishBanner === 'standard'
                      ? 'Thường (Tối đa 90)'
                      : 'Nhân vật (Tối đa 90)'}
                  </span>
                </div>
              </div>

              {/* Guarantee Toggle Pill */}
              {activeWishBanner !== 'standard' && (
                <button
                  onClick={() => toggleWishGuarantee(activeWishBanner)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                    currentStats.isGuaranteed
                      ? 'bg-indigo-500/25 border-indigo-400/50 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                      : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-slate-200'
                  }`}
                  title="Nhấn để đổi trạng thái có/không có bảo hiểm"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>
                    {activeWishBanner === 'chronicled'
                      ? currentStats.isGuaranteed
                        ? 'Có Định Mệnh'
                        : 'Chưa Có'
                      : currentStats.isGuaranteed
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
                {/* Soft Pity Threshold Marker Line */}
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

          {/* Quick Pity Steppers */}
          <div className="flex items-center justify-between gap-1.5 pt-4 border-t border-white/[0.08] mt-4">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => incrementWishPity(activeWishBanner, -1)}
                className="px-2.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-slate-300 border border-white/[0.08] transition-colors cursor-pointer active:scale-95"
                title="Giảm 1 roll"
              >
                -1
              </button>
              <button
                onClick={() => incrementWishPity(activeWishBanner, 1)}
                className="px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-xs font-bold text-indigo-300 border border-indigo-500/30 transition-colors cursor-pointer active:scale-95"
                title="Cộng 1 roll"
              >
                +1 Roll
              </button>
              <button
                onClick={() => incrementWishPity(activeWishBanner, 10)}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-xs font-bold text-amber-300 border border-amber-500/30 transition-colors cursor-pointer active:scale-95"
                title="Cộng 10 roll"
              >
                +10 Rolls
              </button>
            </div>

            <button
              onClick={() => setCurrentWishPity(activeWishBanner, 0)}
              className="px-2 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer flex items-center gap-1"
              title="Đặt lại Pity về 0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* CARD 2: BẮT LẤY ÁNH SÁNG (CAPTURING RADIANCE) CARD */}
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
                    <h3 className="text-xs font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
                      <span>Bắt Lấy Ánh Sáng</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-pink-500/30 text-pink-200 border border-pink-400/40">
                        v5.0+
                      </span>
                    </h3>
                    <span className="text-[11px] text-slate-400">Cơ chế bảo hiểm lệch 50/50</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowRadianceExplainer(!showRadianceExplainer)}
                  className="w-6 h-6 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Xem giải thích cơ chế"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Key User Question Answer: Còn bao nhiêu lần nữa chắc chắn Bắt Lấy Ánh Sáng? */}
              <div className="p-3.5 rounded-2xl bg-black/35 border border-pink-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">
                    Đến Khi Chắc Chắn:
                  </span>
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

                <div className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {radianceInfo.statusTitle}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {radianceInfo.description}
                </p>
              </div>

              {/* Visual Step Indicator (Streak 0, 1, 2) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Chuỗi lệch 50/50 tích lũy:</span>
                  <span className="font-bold text-white">
                    {radianceInfo.streak} / 2 lần liên tiếp
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((step) => {
                    const isActive = (currentStats.capturingRadianceLossStreak || 0) >= step;
                    const isNextGuaranteed = step === 2;
                    return (
                      <div
                        key={step}
                        onClick={() => setCapturingRadianceStreak(step)}
                        className={`p-2 rounded-xl text-center border transition-all cursor-pointer select-none ${
                          isActive
                            ? isNextGuaranteed
                              ? 'radiance-badge text-white font-extrabold border-pink-400'
                              : 'bg-purple-500/30 border-purple-400/50 text-purple-200'
                            : 'bg-white/[0.03] border-white/[0.08] text-slate-500 hover:bg-white/[0.06]'
                        }`}
                        title={`Bấm để điều chỉnh streak = ${step}`}
                      >
                        <div className="text-[10px] font-bold">
                          {step === 0 ? 'Mức 1: Cơ bản' : step === 1 ? 'Mức 2: Tăng tốc' : 'Mức 3: Đảm bảo'}
                        </div>
                        <div className="text-[11px] font-black mt-0.5">
                          {step === 0 ? '~10%' : step === 1 ? '~50%' : '100% ✨'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Streak Adjust Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] mt-3 text-xs">
              <span className="text-slate-400 text-[11px]">Tự chỉnh streak:</span>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => setCapturingRadianceStreak(s)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold border transition-colors cursor-pointer ${
                      (currentStats.capturingRadianceLossStreak || 0) === s
                        ? 'bg-pink-500/30 border-pink-400 text-pink-200'
                        : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    Streak {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : activeWishBanner === 'weapon' ? (
          /* Weapon Banner Info Card */
          <div className="liquid-glass rounded-3xl p-5 border border-white/[0.12] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Định Mệnh Vũ Khí (5.0)
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Tối đa 1 Điểm Định Mệnh
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Điểm Định Mệnh (Fate Points):</span>
                  <span className={`font-extrabold px-2 py-0.5 rounded-md border ${
                    currentStats.fatePoints === 1
                      ? 'bg-amber-500/30 text-amber-200 border-amber-400/50'
                      : 'bg-white/[0.05] text-slate-300 border-white/[0.1]'
                  }`}>
                    {currentStats.fatePoints || 0} / 1
                  </span>
                </div>
                <div className="text-sm font-bold text-white">
                  {currentStats.fatePoints === 1
                    ? '✨ 100% Chắc Chắn Ra Vũ Khí Định Mệnh!'
                    : 'Đang trong kỳ 50/50 vũ khí'}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Từ bản 5.0, Định Mệnh Vũ Khí đã được giảm từ 2 điểm xuống còn <strong>1 điểm</strong>. Nếu lần đầu ra vũ khí 5★ không trúng định mệnh, lần kế tiếp 100% là vũ khí bạn đã chọn!
                </p>
              </div>

              {/* Quick toggle Fate point */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400 text-[11px]">Gán Điểm Định Mệnh:</span>
                <div className="flex items-center gap-1.5">
                  {[0, 1].map((pt) => (
                    <button
                      key={pt}
                      onClick={() => setFatePoints('weapon', pt)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        (currentStats.fatePoints || 0) === pt
                          ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                          : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
                      }`}
                    >
                      {pt} Điểm {pt === 1 ? '(Bảo Hiểm)' : ''}
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
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-bold text-xs">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-300">
                    Định Mệnh Sử Ký (1 Điểm Định Mệnh)
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Cầu Nguyện Sử Ký (Chronicled Wish)
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-teal-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Điểm Định Mệnh:</span>
                  <span className={`font-extrabold px-2 py-0.5 rounded-md border ${
                    currentStats.fatePoints === 1
                      ? 'bg-teal-500/30 text-teal-200 border-teal-400/50'
                      : 'bg-white/[0.05] text-slate-300 border-white/[0.1]'
                  }`}>
                    {currentStats.fatePoints || 0} / 1
                  </span>
                </div>
                <div className="text-sm font-bold text-white">
                  {currentStats.fatePoints === 1
                    ? '✨ 100% Chắc Chắn Ra Mục Tiêu Đã Chọn!'
                    : 'Đang trong kỳ 50/50 mục tiêu'}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Khi chọn Định Mệnh 1 nhân vật hoặc vũ khí, nếu nổ 5★ không phải mục tiêu đó, bạn sẽ nhận 1 Điểm Định Mệnh. Lần nổ 5★ tiếp theo chắc chắn 100% là mục tiêu đã chọn!
                </p>
              </div>

              {/* Quick toggle Fate point */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400 text-[11px]">Gán Điểm Định Mệnh:</span>
                <div className="flex items-center gap-1.5">
                  {[0, 1].map((pt) => (
                    <button
                      key={pt}
                      onClick={() => setFatePoints('chronicled', pt)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        (currentStats.fatePoints || 0) === pt
                          ? 'bg-teal-500/30 border-teal-400 text-teal-200'
                          : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
                      }`}
                    >
                      {pt} Điểm {pt === 1 ? '(Bảo Hiểm)' : ''}
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
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-blue-500/20 text-cyan-300 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Cầu Nguyện Thường
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Danh sách nhân vật & vũ khí vĩnh viễn
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/[0.08] space-y-2">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Banner Thường bao gồm 7 nhân vật 5★ (Diluc, Jean, Mona, Keqing, Qiqi, Tighnari, Dehya) và 10 vũ khí 5★ dòng Thiên Không & nguyên bản.
                </p>
                <div className="text-xs text-indigo-300 font-semibold">
                  Quy tắc 90 roll đảm bảo nhận vật phẩm 5★!
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] text-xs text-slate-400 flex items-center justify-between">
              <span>Loại Duyên:</span>
              <span className="text-slate-300 font-semibold">Mối Duyên Tương Ngộ (Xanh)</span>
            </div>
          </div>
        )}

        {/* CARD 3: WIN / LOSS STATISTICS CARD */}
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
                    Thống Kê Thắng / Lệch
                  </h3>
                  <span className="text-[11px] text-slate-400">Dữ liệu theo lịch sử đã lưu</span>
                </div>
              </div>

              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                {summary.luckLabel}
              </span>
            </div>

            {/* Win Rate Percentage & Split Bar */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400 font-medium">Tỉ Lệ Trúng Rate:</span>
                <span className="text-2xl font-black text-emerald-400">
                  {summary.winRatePercent}%
                </span>
              </div>

              {/* Progress Split Bar */}
              <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden flex border border-white/[0.08]">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${summary.winRatePercent}%` }}
                  title={`Trúng rate: ${summary.rateUpCount}`}
                />
                <div
                  className="bg-rose-500 h-full transition-all duration-500"
                  style={{ width: `${100 - summary.winRatePercent}%` }}
                  title={`Lệch rate: ${summary.lost5050Count}`}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                <span className="text-emerald-400 font-bold">
                  ✓ Trúng: {summary.rateUpCount} lần
                </span>
                <span className="text-rose-400 font-bold">
                  ✕ Lệch: {summary.lost5050Count} lần
                </span>
              </div>
            </div>

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
                <div className="text-[10px] text-slate-400">Bắt Sáng</div>
                <div className="text-base font-extrabold text-pink-300 mt-0.5">
                  {summary.capturingRadianceCount}
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

      {/* ================= 4. EXPLAINER MODAL / BANNER ================= */}
      {showRadianceExplainer && (
        <div className="p-4 rounded-3xl liquid-glass border border-pink-500/30 space-y-3 animate-page-transition">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <h4 className="text-sm font-bold text-white">
                Nguyên Lý Cơ Chế "Bắt Lấy Ánh Sáng" (Capturing Radiance - Bản 5.0)
              </h4>
            </div>
            <button
              onClick={() => setShowRadianceExplainer(false)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Đóng ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-2xl bg-black/30 border border-white/[0.06] space-y-1">
              <strong className="text-pink-300 block">1. Xác Suất Cơ Bản (55%)</strong>
              <p>
                Khi gặp 50/50 ở lần đầu, nếu hệ thống tính toán ra kết quả thua thì có 10% cơ hội kích hoạt Bắt Lấy Ánh Sáng đổi thành thắng. Tổng tỉ lệ thắng ban đầu là ~55%.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-black/30 border border-white/[0.06] space-y-1">
              <strong className="text-purple-300 block">2. Tích Lũy Thua (Streak 1)</strong>
              <p>
                Nếu vẫn bị lệch 50/50, ở kỳ 50/50 tiếp theo, xác suất kích hoạt Bắt Lấy Ánh Sáng khi thua tăng vọt lên ~50%.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-black/30 border border-white/[0.06] space-y-1">
              <strong className="text-amber-300 block">3. Bảo Hiểm Tuyệt Đối (Streak 2)</strong>
              <p>
                Nếu đã lệch 50/50 2 lần liên tiếp mà chưa từng kích hoạt Bắt Lấy Ánh Sáng, ở lần 50/50 thứ 3 chắc chắn 100% Bắt Lấy Ánh Sáng sẽ xuất hiện!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 5. HISTORY TIMELINE & LIST ================= */}
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
            {/* Search Input */}
            <div className="relative w-40 sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm nhân vật / vũ khí..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white/[0.06] border border-white/[0.1] rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
              />
            </div>

            {/* Filter Pills */}
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
                Trúng Rate
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
                Lệch Rate
              </button>
            </div>

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
                <span>{confirmClear ? 'Chắc chắn xoá?' : 'Xoá'}</span>
              </button>
            )}
          </div>
        </div>

        {/* History Cards Grid */}
        {filteredHistory.length === 0 ? (
          <div className="liquid-glass rounded-3xl p-12 text-center border border-white/[0.08] space-y-3">
            <div className="w-14 h-14 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-slate-500">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="text-base font-bold text-slate-300">
              Chưa có lịch sử quay 5★ nào cho banner này
            </div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Hãy nhấn nút "Thêm Lần Nổ 5★" ở góc trên bên phải để bắt đầu ghi lại hành trình may mắn của bạn!
            </p>
            <button
              onClick={() => handleOpenAddModal()}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all cursor-pointer"
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
              const isNormal = item.pity >= 50 && item.pity <= 73;

              return (
                <div
                  key={item.id}
                  className={`liquid-glass rounded-2xl p-4 border transition-all relative overflow-hidden group hover:border-white/20 hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] ${
                    item.isCapturingRadiance
                      ? 'border-pink-500/40 radiance-card-glow'
                      : !item.isRateUp
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
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Calendar className="w-3 h-3" />
                          <span>{item.date}</span>
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
                    {/* Rate-up / Capturing Radiance badge */}
                    {item.isCapturingRadiance ? (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg radiance-badge text-white flex items-center gap-1">
                        <Sparkles className="w-3 h-3 animate-spin-slow" />
                        <span>Bắt Lấy Ánh Sáng</span>
                      </span>
                    ) : item.isRateUp ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Trúng Rate</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        <span>Lệch Rate</span>
                      </span>
                    )}

                    {item.isGuaranteed && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        <span>Bảo Hiểm</span>
                      </span>
                    )}

                    {/* Pull Index in history */}
                    <span className="text-[10px] text-slate-500 ml-auto">
                      #5★ thứ {filteredHistory.length - index}
                    </span>
                  </div>

                  {/* Notes (if any) */}
                  {item.notes && (
                    <p className="text-[11px] text-slate-300/90 italic mt-2 bg-black/20 p-2 rounded-lg border border-white/[0.04]">
                      "{item.notes}"
                    </p>
                  )}

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

      {/* ================= 6. ADD / EDIT WISH MODAL ================= */}
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
