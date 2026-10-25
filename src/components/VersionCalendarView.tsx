import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  Edit3,
  Check,
  RotateCcw,
  Sliders,
  CalendarDays,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import {
  generateVersionSchedule,
  DEFAULT_VERSION_SCHEDULE_SETTINGS,
} from '../data/versionSchedule';
import type { VersionScheduleItem } from '../data/versionSchedule';

export const VersionCalendarView: React.FC = () => {
  const {
    versionScheduleSettings,
    updateVersionScheduleSettings,
    setVersionScheduleNote,
  } = useStore();

  const settings = versionScheduleSettings || DEFAULT_VERSION_SCHEDULE_SETTINGS;

  // Live timer for countdown ticking every 10 seconds
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Settings modal / edit state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [inputStartingVersion, setInputStartingVersion] = useState(settings.startingVersion || '7.2');
  const [inputBaseDate, setInputBaseDate] = useState(settings.baseDate || '2026-11-04');

  // Editing notes state
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  // Generate 5 versions based on settings and live `now`
  const versions = useMemo(() => {
    return generateVersionSchedule(
      settings.baseDate || '2026-11-04',
      settings.startingVersion || '7.2',
      settings.customNotes || {},
      now
    );
  }, [settings.baseDate, settings.startingVersion, settings.customNotes, now]);

  // Find the primary version to highlight in the hero banner (current live version, or the first upcoming one)
  const heroVersion = useMemo(() => {
    return versions.find((v) => v.status === 'current') || versions.find((v) => v.status === 'upcoming') || versions[0];
  }, [versions]);

  // Save customized settings
  const handleSaveSettings = () => {
    updateVersionScheduleSettings({
      startingVersion: inputStartingVersion.trim() || '7.2',
      baseDate: inputBaseDate.trim() || '2026-11-04',
    });
    setIsSettingsOpen(false);
  };

  // Reset to default settings
  const handleResetSettings = () => {
    setInputStartingVersion(DEFAULT_VERSION_SCHEDULE_SETTINGS.startingVersion);
    setInputBaseDate(DEFAULT_VERSION_SCHEDULE_SETTINGS.baseDate);
    updateVersionScheduleSettings({
      startingVersion: DEFAULT_VERSION_SCHEDULE_SETTINGS.startingVersion,
      baseDate: DEFAULT_VERSION_SCHEDULE_SETTINGS.baseDate,
    });
    setIsSettingsOpen(false);
  };

  // Save notes for a specific version
  const handleStartEditNote = (version: VersionScheduleItem) => {
    setEditingNoteId(version.id);
    setNoteText(version.notes || '');
  };

  const handleSaveNote = (versionId: string) => {
    setVersionScheduleNote(versionId, noteText.trim());
    setEditingNoteId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* ================= 1. HEADER SECTION ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/25 via-teal-500/20 to-blue-500/25 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_24px_rgba(6,182,212,0.35)] shrink-0">
            <Calendar className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Lịch Hoạt Động & Phiên Bản
              </h1>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                5 Phiên Bản Tiếp Theo
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Chu kỳ 42 ngày (6 tuần) • Cập nhật Thứ Tư • Phase 2 bắt đầu lúc 17:00 Chiều Thứ Ba
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setInputStartingVersion(settings.startingVersion || '5.2');
              setInputBaseDate(settings.baseDate || '2026-11-04');
              setIsSettingsOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white text-xs font-semibold border border-white/[0.08] transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tùy Chỉnh Lịch</span>
          </button>
        </div>
      </div>

      {/* ================= 2. HERO HIGHLIGHT BANNER ================= */}
      {heroVersion && (
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 border border-cyan-500/30 liquid-glass shadow-[0_12px_40px_rgba(6,182,212,0.15)]">
          {/* Subtle background ambient gradients */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span>
                  {heroVersion.status === 'current'
                    ? `Đang Diễn Ra ${heroVersion.currentPhase ? `(Phase ${heroVersion.currentPhase})` : ''}`
                    : 'Phiên Bản Kế Tiếp Sắp Mở'}
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {heroVersion.title}
                </h2>
                <span className="text-xs sm:text-sm font-semibold text-slate-400">
                  {heroVersion.startDateStr} ➔ {heroVersion.endDateStr}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {heroVersion.status === 'current'
                  ? `Phiên bản hiện tại đang hoạt động. Còn ${heroVersion.daysRemaining} ngày trước khi bảo trì phiên bản kế tiếp.`
                  : `Cập nhật chính thức sau bảo trì máy chủ vào sáng ${heroVersion.startDateStr} (khoảng 10:00).`}
              </p>
            </div>

            {/* Countdown / Status Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] text-center min-w-[140px]">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  {heroVersion.status === 'current' ? 'Thời Gian Còn Lại' : 'Đếm Ngược Ra Mắt'}
                </div>
                <div className="text-xl sm:text-2xl font-black text-cyan-300 mt-1">
                  {heroVersion.status === 'current'
                    ? `${heroVersion.daysRemaining} ngày`
                    : `${heroVersion.daysUntilStart} ngày`}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {heroVersion.status === 'current' ? 'kết thúc phiên bản' : 'đến ngày mở bản 5★'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] text-center min-w-[140px]">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Giai Đoạn 2 (Phase 2)
                </div>
                <div className="text-sm sm:text-base font-extrabold text-amber-300 mt-1">
                  17:00 Chiều Thứ Ba
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {heroVersion.phase2.startDateStr.replace(/^Thứ Ba, /, '')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. DETAILED 5 VERSIONS LIST ================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-cyan-400" />
            <span>Lịch Trình 5 Phiên Bản Tiếp Theo (Giai Đoạn 7.x)</span>
          </h2>
          <span className="text-xs text-slate-400">
            Từ {versions[0]?.startDateStr} đến {versions[versions.length - 1]?.endDateStr}
          </span>
        </div>

        <div className="space-y-4">
          {versions.map((ver, idx) => {
            const isHero = ver.id === heroVersion?.id;
            const isEditingThisNote = editingNoteId === ver.id;

            return (
              <div
                key={ver.id}
                className={`liquid-glass rounded-3xl p-5 sm:p-6 border transition-all duration-300 relative overflow-hidden ${
                  ver.status === 'current'
                    ? 'border-cyan-500/40 shadow-[0_8px_32px_rgba(6,182,212,0.2)]'
                    : isHero
                    ? 'border-amber-400/30'
                    : 'border-white/[0.08] hover:border-white/[0.16]'
                }`}
              >
                {/* Header row of Version Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-black shadow-inner shrink-0 ${
                        ver.status === 'current'
                          ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-cyan-500/30'
                          : idx === 0
                          ? 'bg-gradient-to-tr from-amber-500 to-orange-600 text-white'
                          : 'bg-white/[0.06] border border-white/[0.1] text-slate-300'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-white/80 leading-none">VER</span>
                      <span className="text-sm font-black leading-none mt-0.5">{ver.versionNumber}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-black text-white">
                          {ver.title}
                        </h3>

                        {ver.status === 'current' && (
                          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Đang Diễn Ra
                          </span>
                        )}

                        {ver.status === 'upcoming' && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.1]">
                            Còn {ver.daysUntilStart} ngày
                          </span>
                        )}

                        {ver.status === 'past' && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-white/[0.04]">
                            Đã Kết Thúc
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{ver.startDateStr}</span>
                        <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                        <span>{ver.endDateStr}</span>
                        <span className="text-slate-500">• 42 ngày</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2 Phase Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-3.5">
                  {/* Phase 1 Card */}
                  <div
                    className={`rounded-2xl p-4 border transition-all ${
                      ver.currentPhase === 1
                        ? 'bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                        : 'bg-white/[0.02] border-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-black text-xs">
                          1
                        </div>
                        <span className="text-sm font-bold text-white">Giai Đoạn 1 (Phase 1)</span>
                      </div>

                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300">
                        {ver.phase1.durationDays} ngày
                      </span>
                    </div>

                    <div className="mt-3 space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-400">Bắt đầu:</span>
                        <span className="font-bold text-slate-200">
                          {ver.phase1.startTimeStr} • {ver.phase1.startDateStr}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-400">Kết thúc:</span>
                        <span className="font-bold text-slate-200">
                          {ver.phase1.endTimeStr} • {ver.phase1.endDateStr}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Phase 2 Card */}
                  <div
                    className={`rounded-2xl p-4 border transition-all ${
                      ver.currentPhase === 2
                        ? 'bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                        : 'bg-white/[0.02] border-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-xs">
                          2
                        </div>
                        <span className="text-sm font-bold text-white">Giai Đoạn 2 (Phase 2)</span>
                      </div>

                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/20">
                        17:00 Chiều Thứ 3
                      </span>
                    </div>

                    <div className="mt-3 space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-400">Bắt đầu:</span>
                        <span className="font-bold text-amber-200">
                          {ver.phase2.startTimeStr} • {ver.phase2.startDateStr}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-400">Kết thúc:</span>
                        <span className="font-bold text-slate-200">
                          {ver.phase2.endTimeStr} • {ver.phase2.endDateStr}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Notes / Planning area */}
                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                  {isEditingThisNote ? (
                    <div className="space-y-2">
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder={`Kế hoạch cá nhân cho ${ver.title} (vd: Tích 160 roll cho Mavuika, nâng nhân vật, gom nguyên thạch...)`}
                        rows={2}
                        className="w-full text-xs p-2.5 rounded-xl bg-black/40 border border-cyan-500/40 text-slate-200 focus:outline-none focus:border-cyan-400 resize-none"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingNoteId(null)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          Hủy
                        </button>
                        <button
                          onClick={() => handleSaveNote(ver.id)}
                          className="px-3.5 py-1 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Lưu Ghi Chú</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-400 flex-1 min-w-0">
                        <Edit3 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        {ver.notes ? (
                          <span className="text-slate-200 truncate italic">&quot;{ver.notes}&quot;</span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Chưa có ghi chú kế hoạch cho phiên bản này.</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleStartEditNote(ver)}
                        className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer shrink-0"
                      >
                        {ver.notes ? 'Sửa ghi chú' : '+ Thêm ghi chú'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= 5. SETTINGS MODAL ================= */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-3xl liquid-glass border border-white/[0.12] p-6 space-y-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Tùy Chỉnh Lịch Phiên Bản</h3>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Số Phiên Bản Khởi Điểm
                </label>
                <input
                  type="text"
                  value={inputStartingVersion}
                  onChange={(e) => setInputStartingVersion(e.target.value)}
                  placeholder="7.2"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/[0.1] text-slate-200 focus:outline-none focus:border-cyan-400"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Các phiên bản tiếp theo sẽ tự động tăng dần (vd: 7.2 ➔ 7.3 ➔ 7.4 ➔ 7.5 ➔ 7.6)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Ngày Cập Nhật Bắt Đầu (Thứ Tư)
                </label>
                <input
                  type="date"
                  value={inputBaseDate}
                  onChange={(e) => setInputBaseDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/[0.1] text-slate-200 focus:outline-none focus:border-cyan-400"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Mặc định là ngày Thứ Tư 04/11/2026. Mỗi phiên bản sẽ kéo dài 42 ngày (6 tuần).
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
              <button
                onClick={handleResetSettings}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt Lại Mặc Định</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 shadow-md transition-all cursor-pointer"
                >
                  Áp Dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
