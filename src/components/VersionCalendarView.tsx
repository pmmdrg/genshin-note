import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Target,
} from 'lucide-react';
import {
  buildDayColumns,
  buildTimelineItems,
  TIMELINE_START_DATE,
} from '../data/timelineScheduleData';
import type { TimelineBarItem, TimelineCategory } from '../data/timelineScheduleData';

type FilterType = 'all' | 'version' | 'banner' | 'event' | 'endgame';

const TRACK_CONFIG: {
  category: TimelineCategory | 'banner';
  label: string;
  filterGroup: FilterType;
  filterCategories: TimelineCategory[];
}[] = [
  {
    category: 'version',
    label: 'Phiên Bản (Version & Phase)',
    filterGroup: 'version',
    filterCategories: ['version'],
  },
  {
    category: 'event',
    label: 'Sự Kiện Chính & Phụ',
    filterGroup: 'event',
    filterCategories: ['event'],
  },
  {
    category: 'character_banner_1',
    label: 'Banner Nhân Vật 1',
    filterGroup: 'banner',
    filterCategories: ['character_banner_1'],
  },
  {
    category: 'character_banner_2',
    label: 'Banner Nhân Vật 2',
    filterGroup: 'banner',
    filterCategories: ['character_banner_2'],
  },
  {
    category: 'weapon_banner',
    label: 'Banner Vũ Khí',
    filterGroup: 'banner',
    filterCategories: ['weapon_banner'],
  },
  {
    category: 'abyss',
    label: 'La Hoàn Thâm Cảnh',
    filterGroup: 'endgame',
    filterCategories: ['abyss'],
  },
  {
    category: 'theater',
    label: 'Nhà Hát Giả Tưởng',
    filterGroup: 'endgame',
    filterCategories: ['theater'],
  },
];

export const VersionCalendarView: React.FC = () => {
  const [now, setNow] = useState<Date>(() => new Date());
  const [dayWidth, setDayWidth] = useState<number>(38); // pixels per day (zoom)
  const [filter, setFilter] = useState<FilterType>('all');
  const [useLocalTime, setUseLocalTime] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<TimelineBarItem | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Live timer ticking every second for the "Hôm nay" badge
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Build calendar days and months data
  const { days, months, todayIndex } = useMemo(() => {
    return buildDayColumns(now);
  }, [now]);

  // Build timeline items
  const allItems = useMemo(() => {
    return buildTimelineItems(now);
  }, [now]);

  // Calculate day offset helper
  const getDayOffset = useCallback((targetDate: Date): number => {
    const start = new Date(
      TIMELINE_START_DATE.getFullYear(),
      TIMELINE_START_DATE.getMonth(),
      TIMELINE_START_DATE.getDate()
    ).getTime();
    const cur = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate()
    ).getTime();
    return Math.max(0, (cur - start) / (1000 * 60 * 60 * 24));
  }, []);

  // Jump to Today
  const handleScrollToToday = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const targetScrollLeft = todayIndex * dayWidth - container.clientWidth / 2 + dayWidth / 2;
    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: 'smooth',
    });
  }, [todayIndex, dayWidth]);

  // Auto-center on Today upon initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      handleScrollToToday();
    }, 120);
    return () => clearTimeout(timer);
  }, [handleScrollToToday]);

  // Total timeline width in px
  const totalTimelineWidth = days.length * dayWidth;

  // Filter tracks
  const visibleTracks = useMemo(() => {
    if (filter === 'all') return TRACK_CONFIG;
    return TRACK_CONFIG.filter((t) => t.filterGroup === filter);
  }, [filter]);

  // Format today time badge
  const todayTimeStr = useMemo(() => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }, [now]);

  return (
    <div className="space-y-4 max-w-[100vw] mx-auto pb-16">
      {/* ================= 1. HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Lịch Hoạt Động</span>
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              11 Phiên Bản (5 Trước ➔ 5 Sau)
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer select-none hover:text-slate-200 transition-colors">
              <input
                type="checkbox"
                checked={useLocalTime}
                onChange={(e) => setUseLocalTime(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-black/40 border-white/20 text-cyan-500 focus:ring-0 cursor-pointer"
              />
              <span>Dùng giờ địa phương (Asia/Bangkok - Asia Server UTC+8)</span>
            </label>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tất Cả
            </button>
            <button
              onClick={() => setFilter('version')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                filter === 'version'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Phiên Bản
            </button>
            <button
              onClick={() => setFilter('banner')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                filter === 'banner'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Banner
            </button>
            <button
              onClick={() => setFilter('event')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                filter === 'event'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sự Kiện
            </button>
            <button
              onClick={() => setFilter('endgame')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                filter === 'endgame'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              La Hoàn & Nhà Hát
            </button>
          </div>

          {/* Jump to Today button */}
          <button
            onClick={handleScrollToToday}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-[0_0_16px_rgba(245,158,11,0.35)] transition-all cursor-pointer active:scale-95"
            title="Cuộn nhanh về ngày hôm nay"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Về Hôm Nay</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setDayWidth((w) => Math.max(26, w - 6))}
              disabled={dayWidth <= 26}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 cursor-pointer"
              title="Thu nhỏ ngày"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono font-bold text-slate-300 px-1 min-w-[28px] text-center">
              {dayWidth}px
            </span>
            <button
              onClick={() => setDayWidth((w) => Math.min(52, w + 6))}
              disabled={dayWidth >= 52}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 cursor-pointer"
              title="Phóng to ngày"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= 2. GANTT TIMELINE CONTAINER ================= */}
      <div className="rounded-3xl liquid-glass border border-white/[0.1] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto relative select-none scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent cursor-grab active:cursor-grabbing"
          style={{ maxHeight: '72vh' }}
        >
          <div
            className="relative min-h-[500px]"
            style={{ width: `${totalTimelineWidth}px` }}
          >
            {/* ================= STICKY TOP CALENDAR HEADER ================= */}
            <div className="sticky top-0 z-40 bg-[#0d111a]/95 backdrop-blur-xl border-b border-white/[0.12]">
              {/* Row 1: Month Groups */}
              <div className="flex border-b border-white/[0.06] h-7">
                {months.map((m) => {
                  const mWidth = m.daysCount * dayWidth;
                  return (
                    <div
                      key={m.key}
                      style={{ width: `${mWidth}px` }}
                      className="shrink-0 px-2 flex items-center border-r border-white/[0.08]"
                    >
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        {m.monthName} <span className="text-slate-500 font-normal">({m.year})</span>
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Row 2: Days Columns */}
              <div className="flex h-11">
                {days.map((d) => {
                  return (
                    <div
                      key={d.dateStr}
                      style={{ width: `${dayWidth}px` }}
                      className={`shrink-0 flex flex-col items-center justify-center border-r border-white/[0.04] text-center ${
                        d.isToday
                          ? 'bg-cyan-500/15'
                          : d.isWeekend
                          ? 'bg-white/[0.015]'
                          : ''
                      }`}
                    >
                      <span
                        className={`text-[9px] font-bold uppercase leading-none ${
                          d.isToday
                            ? 'text-cyan-300 font-black'
                            : d.isWeekend
                            ? 'text-slate-500'
                            : 'text-slate-400'
                        }`}
                      >
                        {d.dayOfWeek}
                      </span>
                      <span
                        className={`text-xs mt-0.5 leading-none ${
                          d.isToday
                            ? 'font-black text-cyan-200'
                            : 'font-semibold text-slate-300'
                        }`}
                      >
                        {d.dayNumber}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= VERTICAL GRID LINES ================= */}
            <div className="absolute inset-0 top-[72px] pointer-events-none flex z-0">
              {days.map((d) => (
                <div
                  key={d.dateStr}
                  style={{ width: `${dayWidth}px` }}
                  className={`shrink-0 border-r border-white/[0.03] h-full ${
                    d.isToday
                      ? 'bg-cyan-500/[0.04]'
                      : d.isWeekend
                      ? 'bg-white/[0.008]'
                      : ''
                  }`}
                />
              ))}
            </div>

            {/* ================= VERTICAL "TODAY" MARKER BEAM ================= */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none flex flex-col items-center"
              style={{
                left: `${todayIndex * dayWidth + dayWidth / 2}px`,
                transform: 'translateX(-50%)',
              }}
            >
              {/* Top Time Badge on Sticky Header */}
              <div className="sticky top-5 z-40 bg-slate-950/95 border border-white/40 shadow-[0_0_16px_rgba(255,255,255,0.7)] px-2.5 py-0.5 rounded-full text-white font-mono text-[10px] font-bold flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>{todayTimeStr}</span>
              </div>

              {/* Glowing vertical line cutting down */}
              <div className="w-[2px] h-full bg-gradient-to-b from-white via-cyan-400 to-white/30 shadow-[0_0_12px_rgba(255,255,255,0.8)] opacity-90 mt-1" />
            </div>

            {/* ================= GANTT TRACKS & BARS ================= */}
            <div className="relative z-10 py-4 space-y-3.5">
              {visibleTracks.map((track) => {
                const trackItems = allItems.filter((i) =>
                  track.filterCategories.includes(i.category)
                );

                if (trackItems.length === 0) return null;

                return (
                  <div key={track.category} className="relative h-11 flex items-center">
                    {/* Render each horizontal bar */}
                    {trackItems.map((item) => {
                      const startOffset = getDayOffset(item.startDate);
                      const endOffset = getDayOffset(item.endDate);
                      const durationDays = Math.max(0.5, endOffset - startOffset);

                      const leftPx = startOffset * dayWidth;
                      const widthPx = Math.max(dayWidth * 1.2, durationDays * dayWidth);

                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          style={{
                            left: `${leftPx}px`,
                            width: `${widthPx}px`,
                          }}
                          className={`absolute h-9.5 rounded-xl flex items-center justify-between px-3 overflow-hidden cursor-pointer shadow-md transition-transform hover:scale-[1.01] hover:z-20 bg-gradient-to-r ${item.colorGradient} ${
                            item.isCurrent
                              ? 'ring-2 ring-white/60 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                              : 'border border-white/10 opacity-85 hover:opacity-100'
                          }`}
                          title={`${item.title} (${item.startDate.toLocaleDateString('vi-VN')} - ${item.endDate.toLocaleDateString('vi-VN')})`}
                        >
                          {/* Title text */}
                          <div className="flex items-center gap-2 truncate z-10 pr-2">
                            <span className="text-xs font-bold text-white truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                              {item.title}
                            </span>
                          </div>

                          {/* Right side: Badge + Avatar */}
                          <div className="flex items-center gap-1.5 shrink-0 z-10">
                            {item.badgeText && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-amber-300 border border-white/20 whitespace-nowrap shadow-sm">
                                {item.badgeText}
                              </span>
                            )}

                            {item.imageUrl && (
                              <div className="w-7 h-7 rounded-lg overflow-hidden bg-black/40 border border-white/20 shrink-0">
                                <img
                                  src={item.imageUrl}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            )}
                          </div>

                          {/* Subtle right avatar background bleed */}
                          {item.imageUrl && (
                            <div
                              className="absolute right-0 top-0 bottom-0 w-28 pointer-events-none opacity-20 bg-cover bg-center"
                              style={{ backgroundImage: `url(${item.imageUrl})` }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. POPUP MODAL ON BAR CLICK ================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-3xl liquid-glass border border-white/[0.14] p-6 space-y-4 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {selectedItem.categoryLabel}
                </span>
                {selectedItem.isCurrent && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Đang diễn ra
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3">
              {selectedItem.imageUrl && (
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-black/40 border border-white/20 shrink-0 shadow-md">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  {selectedItem.title}
                </h3>
                {selectedItem.badgeText && (
                  <div className="text-xs text-amber-300 font-bold mt-1">
                    Còn lại: {selectedItem.badgeText}
                  </div>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Thời gian bắt đầu:</span>
                <span className="font-bold text-white">
                  {selectedItem.startDate.toLocaleString('vi-VN', {
                    weekday: 'short',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Thời gian kết thúc:</span>
                <span className="font-bold text-white">
                  {selectedItem.endDate.toLocaleString('vi-VN', {
                    weekday: 'short',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-white/[0.08] hover:bg-white/[0.16] text-white transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
