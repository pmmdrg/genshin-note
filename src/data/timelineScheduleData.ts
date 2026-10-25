export type TimelineCategory =
  | 'version'
  | 'character_banner_1'
  | 'character_banner_2'
  | 'weapon_banner'
  | 'event'
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
  borderClass?: string;
  imageUrl?: string;
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

  // Fallback if today is outside range
  if (todayIndex === -1) {
    todayIndex = Math.floor(days.length / 2);
  }

  return { days, months, todayIndex };
}

/**
 * Generate all timeline items (Gantt bars) across the 11 versions:
 * - 5 versions before today: v6.5, v6.6, v6.7, v6.8, v7.0
 * - Current version (contains today Oct 26, 2026): v7.1
 * - 5 versions after today: v7.2, v7.3, v7.4, v7.5, v7.6
 */
export function buildTimelineItems(now: Date = new Date()): TimelineBarItem[] {
  const items: TimelineBarItem[] = [];

  const baseV7_2 = TIMELINE_ANCHOR.v7_2_start;

  // Version numbers mapped from offset -6 to +4 (total 11 versions)
  // -6: v6.5, -5: v6.6, -4: v6.7, -3: v6.8, -2: v7.0, -1: v7.1, 0: v7.2, 1: v7.3, 2: v7.4, 3: v7.5, 4: v7.6
  const versionMeta: Record<
    number,
    {
      num: string;
      char1P1: { name: string; img: string };
      char2P1: { name: string; img: string };
      char1P2: { name: string; img: string };
      char2P2: { name: string; img: string };
      majorEvent: string;
      miniEventsP1: string[];
      miniEventsP2: string[];
    }
  > = {
    [-6]: {
      num: '6.5',
      char1P1: { name: 'Furina', img: 'https://enka.network/ui/UI_AvatarIcon_Furina.png' },
      char2P1: { name: 'Baizhu', img: 'https://enka.network/ui/UI_AvatarIcon_Baizhu.png' },
      char1P2: { name: 'Neuvillette', img: 'https://enka.network/ui/UI_AvatarIcon_Neuvillette.png' },
      char2P2: { name: 'Kazuha', img: 'https://enka.network/ui/UI_AvatarIcon_Kazuha.png' },
      majorEvent: 'Fontaine Alchemy Expo',
      miniEventsP1: ['Mutual Defense Simulation'],
      miniEventsP2: ['Overflowing Mastery'],
    },
    [-5]: {
      num: '6.6',
      char1P1: { name: 'Arlecchino', img: 'https://enka.network/ui/UI_AvatarIcon_Arlecchino.png' },
      char2P1: { name: 'Lyney', img: 'https://enka.network/ui/UI_AvatarIcon_Lyney.png' },
      char1P2: { name: 'Clorinde', img: 'https://enka.network/ui/UI_AvatarIcon_Clorinde.png' },
      char2P2: { name: 'Alhaitham', img: 'https://enka.network/ui/UI_AvatarIcon_Alhaitham.png' },
      majorEvent: 'Harmonious Chants of Fontaine',
      miniEventsP1: ['Windtrace: Seekers and Strategy'],
      miniEventsP2: ['Ley Line Overflow'],
    },
    [-4]: {
      num: '6.7',
      char1P1: { name: 'Sigewinne', img: 'https://enka.network/ui/UI_AvatarIcon_Sigewinne.png' },
      char2P1: { name: 'Navia', img: 'https://enka.network/ui/UI_AvatarIcon_Navia.png' },
      char1P2: { name: 'Wriothesley', img: 'https://enka.network/ui/UI_AvatarIcon_Wriothesley.png' },
      char2P2: { name: 'Yelan', img: 'https://enka.network/ui/UI_AvatarIcon_Yelan.png' },
      majorEvent: 'Fortress Arena Championship',
      miniEventsP1: ['Sparks of Resonance'],
      miniEventsP2: ['Overflowing Favor'],
    },
    [-3]: {
      num: '6.8',
      char1P1: { name: 'Nilou', img: 'https://enka.network/ui/UI_AvatarIcon_Nilou.png' },
      char2P1: { name: 'Nahida', img: 'https://enka.network/ui/UI_AvatarIcon_Nahida.png' },
      char1P2: { name: 'Emilie', img: 'https://enka.network/ui/UI_AvatarIcon_Emilie.png' },
      char2P2: { name: 'Yae Miko', img: 'https://enka.network/ui/UI_AvatarIcon_Yae.png' },
      majorEvent: 'Simulanka Summer Fairy Tale',
      miniEventsP1: ['Encounter of Imagination'],
      miniEventsP2: ['Energy Amplifier: Lemniscate'],
    },
    [-2]: {
      num: '7.0',
      char1P1: { name: 'Mualani', img: 'https://enka.network/ui/UI_AvatarIcon_Mualani.png' },
      char2P1: { name: 'Kazuha', img: 'https://enka.network/ui/UI_AvatarIcon_Kazuha.png' },
      char1P2: { name: 'Kinich', img: 'https://enka.network/ui/UI_AvatarIcon_Kinich.png' },
      char2P2: { name: 'Raiden Shogun', img: 'https://enka.network/ui/UI_AvatarIcon_Shogun.png' },
      majorEvent: 'Traces of Artistry: Northern Arc',
      miniEventsP1: ['Fastidious Frontier Investigation'],
      miniEventsP2: ['Ley Line Overflow'],
    },
    [-1]: {
      num: '7.1',
      char1P1: { name: 'Xilonen', img: 'https://enka.network/ui/UI_AvatarIcon_Xilonen.png' },
      char2P1: { name: 'Chiori', img: 'https://enka.network/ui/UI_AvatarIcon_Chiori.png' },
      char1P2: { name: 'Nahida', img: 'https://enka.network/ui/UI_AvatarIcon_Nahida.png' },
      char2P2: { name: 'Hu Tao', img: 'https://enka.network/ui/UI_AvatarIcon_Hutao.png' },
      majorEvent: 'Tabletop Troupe: A Gathering on Adventure’s Eve',
      miniEventsP1: ['Across the Frozen Wilds, Honing One’s Edge'],
      miniEventsP2: ['Carefree Snowball Fight', 'Predictive Victory Dynamics', 'Overflowing Favor'],
    },
    [0]: {
      num: '7.2',
      char1P1: { name: 'Chasca', img: 'https://enka.network/ui/UI_AvatarIcon_Chasca.png' },
      char2P1: { name: 'Lyney', img: 'https://enka.network/ui/UI_AvatarIcon_Lyney.png' },
      char1P2: { name: 'Zhongli', img: 'https://enka.network/ui/UI_AvatarIcon_Zhongli.png' },
      char2P2: { name: 'Neuvillette', img: 'https://enka.network/ui/UI_AvatarIcon_Neuvillette.png' },
      majorEvent: 'A Rekviem for the Underworld: Snezhnaya Act',
      miniEventsP1: ['Stygian Onslaught', 'Resplendent Starlight - Daily Login'],
      miniEventsP2: ['Missive of Grace: A Thank-You Gift', 'Ley Line Overflow'],
    },
    [1]: {
      num: '7.3',
      char1P1: { name: 'Mavuika', img: 'https://enka.network/ui/UI_AvatarIcon_Mavuika.png' },
      char2P1: { name: 'Citlali', img: 'https://enka.network/ui/UI_AvatarIcon_Citlali.png' },
      char1P2: { name: 'Arlecchino', img: 'https://enka.network/ui/UI_AvatarIcon_Arlecchino.png' },
      char2P2: { name: 'Clorinde', img: 'https://enka.network/ui/UI_AvatarIcon_Clorinde.png' },
      majorEvent: 'Blazing Sun & Frost: Snezhnaya Summit',
      miniEventsP1: ['Flames of Valor Combat Trial'],
      miniEventsP2: ['Frostbound Exploration Guild'],
    },
    [2]: {
      num: '7.4',
      char1P1: { name: 'Xianyun', img: 'https://enka.network/ui/UI_AvatarIcon_Xianyun.png' },
      char2P1: { name: 'Xiao', img: 'https://enka.network/ui/UI_AvatarIcon_Xiao.png' },
      char1P2: { name: 'Yelan', img: 'https://enka.network/ui/UI_AvatarIcon_Yelan.png' },
      char2P2: { name: 'Shenhe', img: 'https://enka.network/ui/UI_AvatarIcon_Shenhe.png' },
      majorEvent: 'Lantern Rite 2027: Lễ Hội Hải Đăng',
      miniEventsP1: ['Paper Shadows A-Drifting'],
      miniEventsP2: ['Hustle and Bustle Lantern Bazaar'],
    },
    [3]: {
      num: '7.5',
      char1P1: { name: 'Venti', img: 'https://enka.network/ui/UI_AvatarIcon_Venti.png' },
      char2P1: { name: 'Albedo', img: 'https://enka.network/ui/UI_AvatarIcon_Albedo.png' },
      char1P2: { name: 'Wanderer', img: 'https://enka.network/ui/UI_AvatarIcon_Wanderer.png' },
      char2P2: { name: 'Kokomi', img: 'https://enka.network/ui/UI_AvatarIcon_Kokomi.png' },
      majorEvent: 'Windblume Festival of Anemo',
      miniEventsP1: ['Floral Freefall Challenge'],
      miniEventsP2: ['Ballads of Breeze Music Show'],
    },
    [4]: {
      num: '7.6',
      char1P1: { name: 'Capitano', img: 'https://enka.network/ui/UI_AvatarIcon_Capitano.png' },
      char2P1: { name: 'Furina', img: 'https://enka.network/ui/UI_AvatarIcon_Furina.png' },
      char1P2: { name: 'Raiden Shogun', img: 'https://enka.network/ui/UI_AvatarIcon_Shogun.png' },
      char2P2: { name: 'Nahida', img: 'https://enka.network/ui/UI_AvatarIcon_Nahida.png' },
      majorEvent: 'Abyssal Threshold & Northern Frontier',
      miniEventsP1: ['Combat Trial of Northern Sovereigns'],
      miniEventsP2: ['Overflowing Mastery'],
    },
  };

  for (let offset = -6; offset <= 4; offset++) {
    const meta = versionMeta[offset];
    if (!meta) continue;

    const vStart = new Date(baseV7_2.getFullYear(), baseV7_2.getMonth(), baseV7_2.getDate() + offset * 42, 10, 0, 0);
    const p2Start = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate() + 20, 17, 0, 0);
    const vEnd = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate() + 42, 6, 0, 0);

    const isP1Active = now >= vStart && now <= p2Start;
    const isP2Active = now >= p2Start && now <= vEnd;

    // 1. Version Phase 1 Bar
    items.push({
      id: `ver-${meta.num}-p1`,
      category: 'version',
      categoryLabel: 'Phiên Bản',
      title: `Phiên Bản ${meta.num} - Phase 1`,
      startDate: vStart,
      endDate: p2Start,
      colorGradient: 'from-blue-600/90 via-indigo-600/90 to-purple-600/90',
      badgeText: isP1Active ? formatRemaining(p2Start, now) : undefined,
      isCurrent: isP1Active,
    });

    // 2. Version Phase 2 Bar
    items.push({
      id: `ver-${meta.num}-p2`,
      category: 'version',
      categoryLabel: 'Phiên Bản',
      title: `Phiên Bản ${meta.num} - Phase 2`,
      startDate: p2Start,
      endDate: vEnd,
      colorGradient: 'from-purple-600/90 via-pink-600/90 to-rose-600/90',
      badgeText: isP2Active ? formatRemaining(vEnd, now) : undefined,
      isCurrent: isP2Active,
    });

    // 3. Character Banner 1 (Phase 1 & Phase 2)
    items.push({
      id: `char1-${meta.num}-p1`,
      category: 'character_banner_1',
      categoryLabel: 'Banner Nhân Vật 1',
      title: `${meta.char1P1.name} Banner`,
      startDate: vStart,
      endDate: p2Start,
      colorGradient: 'from-cyan-700/80 via-blue-700/80 to-indigo-800/80',
      imageUrl: meta.char1P1.img,
      badgeText: isP1Active ? formatRemaining(p2Start, now) : undefined,
      isCurrent: isP1Active,
    });

    items.push({
      id: `char1-${meta.num}-p2`,
      category: 'character_banner_1',
      categoryLabel: 'Banner Nhân Vật 1',
      title: `${meta.char1P2.name} Banner`,
      startDate: p2Start,
      endDate: vEnd,
      colorGradient: 'from-cyan-700/80 via-teal-700/80 to-blue-800/80',
      imageUrl: meta.char1P2.img,
      badgeText: isP2Active ? formatRemaining(vEnd, now) : undefined,
      isCurrent: isP2Active,
    });

    // 4. Character Banner 2 (Phase 1 & Phase 2)
    items.push({
      id: `char2-${meta.num}-p1`,
      category: 'character_banner_2',
      categoryLabel: 'Banner Nhân Vật 2',
      title: `${meta.char2P1.name} Banner`,
      startDate: vStart,
      endDate: p2Start,
      colorGradient: 'from-indigo-700/80 via-purple-700/80 to-pink-800/80',
      imageUrl: meta.char2P1.img,
      badgeText: isP1Active ? formatRemaining(p2Start, now) : undefined,
      isCurrent: isP1Active,
    });

    items.push({
      id: `char2-${meta.num}-p2`,
      category: 'character_banner_2',
      categoryLabel: 'Banner Nhân Vật 2',
      title: `${meta.char2P2.name} Banner`,
      startDate: p2Start,
      endDate: vEnd,
      colorGradient: 'from-purple-700/80 via-rose-700/80 to-pink-800/80',
      imageUrl: meta.char2P2.img,
      badgeText: isP2Active ? formatRemaining(vEnd, now) : undefined,
      isCurrent: isP2Active,
    });

    // 5. Weapon Banner (Phase 1 & Phase 2)
    items.push({
      id: `wpn-${meta.num}-p1`,
      category: 'weapon_banner',
      categoryLabel: 'Banner Vũ Khí',
      title: `Epitome Invocation - Vũ Khí Đợt 1`,
      startDate: vStart,
      endDate: p2Start,
      colorGradient: 'from-amber-600/80 via-orange-600/80 to-amber-700/80',
      badgeText: isP1Active ? formatRemaining(p2Start, now) : undefined,
      isCurrent: isP1Active,
    });

    items.push({
      id: `wpn-${meta.num}-p2`,
      category: 'weapon_banner',
      categoryLabel: 'Banner Vũ Khí',
      title: `Epitome Invocation - Vũ Khí Đợt 2`,
      startDate: p2Start,
      endDate: vEnd,
      colorGradient: 'from-amber-600/80 via-orange-600/80 to-amber-700/80',
      badgeText: isP2Active ? formatRemaining(vEnd, now) : undefined,
      isCurrent: isP2Active,
    });

    // 6. Major Event
    const majorEventEnd = new Date(vStart.getTime() + 24 * 86400000); // 24 days
    const isMajorActive = now >= vStart && now <= majorEventEnd;
    items.push({
      id: `event-major-${meta.num}`,
      category: 'event',
      categoryLabel: 'Sự Kiện',
      title: meta.majorEvent,
      startDate: vStart,
      endDate: majorEventEnd,
      colorGradient: 'from-amber-700/85 via-orange-700/85 to-red-800/85',
      badgeText: isMajorActive ? formatRemaining(majorEventEnd, now) : undefined,
      isCurrent: isMajorActive,
    });

    // 7. Mini Events in Phase 2
    if (meta.miniEventsP2.length > 0) {
      const mini1Start = new Date(p2Start.getTime() + 2 * 86400000);
      const mini1End = new Date(mini1Start.getTime() + 12 * 86400000);
      const isMini1Active = now >= mini1Start && now <= mini1End;

      items.push({
        id: `event-mini-${meta.num}-1`,
        category: 'event',
        categoryLabel: 'Sự Kiện',
        title: meta.miniEventsP2[0],
        startDate: mini1Start,
        endDate: mini1End,
        colorGradient: 'from-teal-600/80 via-cyan-600/80 to-blue-700/80',
        badgeText: isMini1Active ? formatRemaining(mini1End, now) : undefined,
        isCurrent: isMini1Active,
      });

      if (meta.miniEventsP2.length > 1) {
        const mini2Start = new Date(p2Start.getTime() + 10 * 86400000);
        const mini2End = new Date(vEnd.getTime());
        const isMini2Active = now >= mini2Start && now <= mini2End;

        items.push({
          id: `event-mini-${meta.num}-2`,
          category: 'event',
          categoryLabel: 'Sự Kiện',
          title: meta.miniEventsP2[1],
          startDate: mini2Start,
          endDate: mini2End,
          colorGradient: 'from-emerald-600/80 via-teal-600/80 to-cyan-700/80',
          badgeText: isMini2Active ? formatRemaining(mini2End, now) : undefined,
          isCurrent: isMini2Active,
        });
      }
    }
  }

  // 8. Spiral Abyss (La Hoàn Thâm Cảnh) - Resets on 16th of each month
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
      title: `Spiral Abyss (Kỳ ${cM + 1}/${cY})`,
      startDate: abyssStart,
      endDate: abyssEnd,
      colorGradient: 'from-indigo-900/90 via-blue-900/90 to-cyan-900/90',
      badgeText: isAbyssActive ? formatRemaining(abyssEnd, now) : undefined,
      isCurrent: isAbyssActive,
    });

    // 9. Imaginarium Theater (Nhà Hát Giả Tưởng) - Resets on 1st of each month
    const theaterStart = new Date(cY, cM, 1, 4, 0, 0);
    const theaterEnd = new Date(cY, cM + 1, 1, 3, 59, 59);
    const isTheaterActive = now >= theaterStart && now <= theaterEnd;

    items.push({
      id: `theater-${cY}-${cM}`,
      category: 'theater',
      categoryLabel: 'Nhà Hát Giả Tưởng',
      title: `Imaginarium Theater (${cM + 1}/${cY})`,
      startDate: theaterStart,
      endDate: theaterEnd,
      colorGradient: 'from-purple-900/90 via-indigo-900/90 to-blue-900/90',
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
