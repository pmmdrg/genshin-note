export type TimelineCategory =
  | 'phase_1'
  | 'phase_2'
  | 'ao_canh'
  | 'abyss'
  | 'theater';

export interface TimelineBarItem {
  id: string;
  category: TimelineCategory;
  categoryLabel: string;
  title: string;
  subtitle?: string;
  startDate: Date;
  endDate: Date;
  colorGradient: string;
  badgeText?: string;
  isCurrent?: boolean;
}

export interface DayColumn {
  date: Date;
  dateStr: string; // YYYY-MM-DD
  dayNumber: number;
  dayOfWeek: string; // T2, T3, T4, T5, T6, T7, CN
  isWeekend: boolean;
  isToday: boolean;
  dayIndex: number;
}

export interface MonthGroup {
  key: string;
  monthName: string; // e.g. "tháng 10", "tháng 11"
  year: number;
  daysCount: number;
  startIndex: number;
}

export const VI_DAY_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatRemaining(targetDate: Date, now: Date): string {
  const diffMs = targetDate.getTime() - now.getTime();
  if (diffMs <= 0) return 'Đã hết';

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

/**
 * 11 Versions: 5 before today + Current 7.1 + 5 after today.
 * Anchor: Version 7.2 starts Wednesday, 04/11/2026.
 * Cycle: 42 days (6 weeks).
 */
export const TIMELINE_ANCHOR = {
  v7_2_start: new Date(2026, 10, 4, 10, 0, 0), // 04/11/2026 10:00
};

// Start of timeline: 6 versions before 7.2 = Version 6.5 (25/02/2026)
export const TIMELINE_START_DATE = new Date(2026, 1, 25, 0, 0, 0);
// End of timeline: 5 versions after 7.2 = Version 7.6 end (02/06/2027)
export const TIMELINE_END_DATE = new Date(2027, 5, 2, 23, 59, 59);

export function buildDayColumns(now: Date = new Date()): {
  days: DayColumn[];
  months: MonthGroup[];
  todayIndex: number;
} {
  const days: DayColumn[] = [];
  const months: MonthGroup[] = [];

  const cur = new Date(TIMELINE_START_DATE.getFullYear(), TIMELINE_START_DATE.getMonth(), TIMELINE_START_DATE.getDate());
  const end = new Date(TIMELINE_END_DATE.getFullYear(), TIMELINE_END_DATE.getMonth(), TIMELINE_END_DATE.getDate());

  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDate = now.getDate();

  let todayIndex = -1;
  let index = 0;
  let currentMonthKey = '';
  let currentMonthGroup: MonthGroup | null = null;

  while (cur <= end) {
    const isToday =
      cur.getFullYear() === todayYear &&
      cur.getMonth() === todayMonth &&
      cur.getDate() === todayDate;

    if (isToday) {
      todayIndex = index;
    }

    const monthKey = `${cur.getFullYear()}-${cur.getMonth()}`;
    if (monthKey !== currentMonthKey) {
      currentMonthKey = monthKey;
      currentMonthGroup = {
        key: monthKey,
        monthName: `tháng ${cur.getMonth() + 1}`,
        year: cur.getFullYear(),
        daysCount: 0,
        startIndex: index,
      };
      months.push(currentMonthGroup);
    }
    if (currentMonthGroup) {
      currentMonthGroup.daysCount++;
    }

    days.push({
      date: new Date(cur),
      dateStr: `${cur.getFullYear()}-${pad2(cur.getMonth() + 1)}-${pad2(cur.getDate())}`,
      dayNumber: cur.getDate(),
      dayOfWeek: VI_DAY_SHORT[cur.getDay()],
      isWeekend: cur.getDay() === 0 || cur.getDay() === 6,
      isToday,
      dayIndex: index,
    });

    cur.setDate(cur.getDate() + 1);
    index++;
  }

  if (todayIndex === -1) {
    todayIndex = Math.floor(days.length / 2);
  }

  return { days, months, todayIndex };
}

/**
 * Clean & Accurate Timeline Items:
 * - Phase 1 & Phase 2 for each version
 * - Ảo Cảnh: opens exactly 5 days after version update
 * - Spiral Abyss (La Hoàn): resets on the 16th of each month
 * - Imaginarium Theater (Nhà Hát): resets on the 1st of each month
 */
export function buildTimelineItems(now: Date = new Date()): TimelineBarItem[] {
  const items: TimelineBarItem[] = [];

  const baseV7_2 = TIMELINE_ANCHOR.v7_2_start;

  // 11 Version numbers: 5 before + Current 7.1 + 5 after
  const versionNumbers: { offset: number; num: string }[] = [
    { offset: -6, num: '6.5' },
    { offset: -5, num: '6.6' },
    { offset: -4, num: '6.7' },
    { offset: -3, num: '6.8' },
    { offset: -2, num: '7.0' },
    { offset: -1, num: '7.1' }, // Current version containing today Oct 26, 2026
    { offset: 0, num: '7.2' },  // Next version starting Nov 04, 2026
    { offset: 1, num: '7.3' },
    { offset: 2, num: '7.4' },
    { offset: 3, num: '7.5' },
    { offset: 4, num: '7.6' },
  ];

  for (const v of versionNumbers) {
    const vStart = new Date(baseV7_2.getFullYear(), baseV7_2.getMonth(), baseV7_2.getDate() + v.offset * 42, 10, 0, 0);
    const p2Start = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate() + 20, 17, 0, 0);
    const vEnd = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate() + 42, 6, 0, 0);

    const isP1Active = now >= vStart && now <= p2Start;
    const isP2Active = now >= p2Start && now <= vEnd;

    // 1. Phase 1 Bar
    items.push({
      id: `p1-${v.num}`,
      category: 'phase_1',
      categoryLabel: 'Phase 1',
      title: `Phiên Bản ${v.num} - Phase 1`,
      subtitle: 'Thứ Tư 10:00 ➔ Thứ Ba 17:00 (20 ngày)',
      startDate: vStart,
      endDate: p2Start,
      colorGradient: 'from-blue-600/90 via-indigo-600/90 to-purple-600/90',
      badgeText: isP1Active ? formatRemaining(p2Start, now) : undefined,
      isCurrent: isP1Active,
    });

    // 2. Phase 2 Bar
    items.push({
      id: `p2-${v.num}`,
      category: 'phase_2',
      categoryLabel: 'Phase 2',
      title: `Phiên Bản ${v.num} - Phase 2`,
      subtitle: 'Thứ Ba 17:00 ➔ Thứ Tư 06:00 (21 ngày)',
      startDate: p2Start,
      endDate: vEnd,
      colorGradient: 'from-purple-600/90 via-pink-600/90 to-rose-600/90',
      badgeText: isP2Active ? formatRemaining(vEnd, now) : undefined,
      isCurrent: isP2Active,
    });

    // 3. Ảo Cảnh: starts 5 days after version update (vStart + 5 days) until end of version (vEnd)
    const aoCanhStart = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate() + 5, 4, 0, 0);
    const isAoCanhActive = now >= aoCanhStart && now <= vEnd;

    items.push({
      id: `aocanh-${v.num}`,
      category: 'ao_canh',
      categoryLabel: 'Ảo Cảnh',
      title: `Ảo Cảnh (${v.num})`,
      subtitle: 'Mở sau cập nhật bản mới 5 ngày',
      startDate: aoCanhStart,
      endDate: vEnd,
      colorGradient: 'from-teal-600/90 via-cyan-600/90 to-blue-700/90',
      badgeText: isAoCanhActive ? formatRemaining(vEnd, now) : undefined,
      isCurrent: isAoCanhActive,
    });
  }

  // 4. Spiral Abyss (La Hoàn Thâm Cảnh) - Resets on 16th of each month
  const startMonth = TIMELINE_START_DATE.getMonth();
  const startYear = TIMELINE_START_DATE.getFullYear();
  const endMonth = TIMELINE_END_DATE.getMonth();
  const endYear = TIMELINE_END_DATE.getFullYear();

  let cY = startYear;
  let cM = startMonth;

  while (cY < endYear || (cY === endYear && cM <= endMonth)) {
    const abyssStart = new Date(cY, cM, 16, 4, 0, 0);
    const abyssEnd = new Date(cY, cM + 1, 16, 3, 59, 59);
    const isAbyssActive = now >= abyssStart && now <= abyssEnd;

    items.push({
      id: `abyss-${cY}-${cM}`,
      category: 'abyss',
      categoryLabel: 'La Hoàn Thâm Cảnh',
      title: `La Hoàn Thâm Cảnh (Kỳ ${cM + 1}/${cY})`,
      subtitle: 'Reset vào ngày 16 hàng tháng',
      startDate: abyssStart,
      endDate: abyssEnd,
      colorGradient: 'from-indigo-900/90 via-blue-900/90 to-cyan-900/90',
      badgeText: isAbyssActive ? formatRemaining(abyssEnd, now) : undefined,
      isCurrent: isAbyssActive,
    });

    // 5. Imaginarium Theater (Nhà Hát Giả Tưởng) - Resets on 1st of each month
    const theaterStart = new Date(cY, cM, 1, 4, 0, 0);
    const theaterEnd = new Date(cY, cM + 1, 1, 3, 59, 59);
    const isTheaterActive = now >= theaterStart && now <= theaterEnd;

    items.push({
      id: `theater-${cY}-${cM}`,
      category: 'theater',
      categoryLabel: 'Nhà Hát Giả Tưởng',
      title: `Nhà Hát Giả Tưởng (Kỳ ${cM + 1}/${cY})`,
      subtitle: 'Reset vào ngày 1 hàng tháng',
      startDate: theaterStart,
      endDate: theaterEnd,
      colorGradient: 'from-purple-900/90 via-indigo-900/90 to-rose-900/90',
      badgeText: isTheaterActive ? formatRemaining(theaterEnd, now) : undefined,
      isCurrent: isTheaterActive,
    });

    cM++;
    if (cM > 11) {
      cM = 0;
      cY++;
    }
  }

  return items;
}
