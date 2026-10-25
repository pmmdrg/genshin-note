export interface VersionPhase {
  phase: 1 | 2;
  name: string;
  startDate: Date;
  endDate: Date;
  startDateStr: string;
  startTimeStr: string;
  endDateStr: string;
  endTimeStr: string;
  durationDays: number;
  status: 'past' | 'current' | 'upcoming';
  progressPercent: number;
  daysRemaining: number;
  hoursRemaining: number;
}

export interface VersionScheduleItem {
  id: string;
  versionNumber: string;
  title: string;
  startDate: Date;
  endDate: Date;
  startDateStr: string;
  endDateStr: string;
  durationDays: number;
  status: 'past' | 'current' | 'upcoming';
  currentPhase: 1 | 2 | null;
  phase1: VersionPhase;
  phase2: VersionPhase;
  daysUntilStart: number;
  daysRemaining: number;
  progressPercent: number;
  notes?: string;
}

const VI_DAYS = [
  'Chủ Nhật',
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
];

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatDateVi(date: Date): string {
  const dayName = VI_DAYS[date.getDay()];
  return `${dayName}, ${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function formatTimeVi(date: Date): string {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

export function formatFullDateTimeVi(date: Date): string {
  return `${formatTimeVi(date)} • ${formatDateVi(date)}`;
}

/**
 * Increment Genshin version numbers logically:
 * 5.2 -> 5.3 -> 5.4 -> 5.5 -> 5.6 -> 5.7 -> 5.8 -> 6.0
 */
export function getNextVersionNumber(current: string, step: number = 1): string {
  const match = current.trim().match(/^(\d+)\.(\d+)$/);
  if (!match) {
    return current;
  }
  let major = parseInt(match[1], 10);
  let minor = parseInt(match[2], 10);

  for (let i = 0; i < step; i++) {
    if (minor >= 8) {
      major += 1;
      minor = 0;
    } else {
      minor += 1;
    }
  }

  return `${major}.${minor}`;
}

export const DEFAULT_VERSION_SCHEDULE_SETTINGS = {
  baseDate: '2026-11-04',
  startingVersion: '7.2',
  customNotes: {} as Record<string, string>,
};

/**
 * Generate schedule for 5 consecutive Genshin Impact versions.
 * - Base starts on Wednesday (e.g. 04/11/2026 at 10:00 AM server maintenance finish).
 * - Version duration: 42 days (6 weeks), always ending on Wednesday 06:00 AM maintenance start.
 * - Phase 1: Starts Wed 10:00 -> Ends Tue 17:00 (20 days).
 * - Phase 2: Starts Tue 17:00 -> Ends Wed 06:00 (21 days).
 */
export function generateVersionSchedule(
  baseDateStr: string = DEFAULT_VERSION_SCHEDULE_SETTINGS.baseDate,
  startingVersion: string = DEFAULT_VERSION_SCHEDULE_SETTINGS.startingVersion,
  customNotes: Record<string, string> = {},
  now: Date = new Date()
): VersionScheduleItem[] {
  const [yearStr, monthStr, dayStr] = baseDateStr.split('-');
  const baseYear = parseInt(yearStr, 10) || 2026;
  const baseMonth = (parseInt(monthStr, 10) || 11) - 1; // 0-indexed
  const baseDay = parseInt(dayStr, 10) || 4;

  const baseDate = new Date(baseYear, baseMonth, baseDay, 10, 0, 0);

  const versions: VersionScheduleItem[] = [];

  for (let i = 0; i < 5; i++) {
    const versionNumber = i === 0 ? startingVersion : getNextVersionNumber(startingVersion, i);
    const id = `ver-${versionNumber.replace('.', '-')}-${i}`;

    // Version Start: Wednesday 10:00
    const vStart = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + i * 42, 10, 0, 0);

    // Phase 2 Start: Tuesday 17:00 (+20 days)
    const p2Start = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate() + 20, 17, 0, 0);

    // Version End: Wednesday 06:00 (+42 days)
    const vEnd = new Date(vStart.getFullYear(), vStart.getMonth(), vStart.getDate() + 42, 6, 0, 0);

    // Version Status
    const isPast = now.getTime() > vEnd.getTime();
    const isCurrent = now.getTime() >= vStart.getTime() && now.getTime() <= vEnd.getTime();
    const status: 'past' | 'current' | 'upcoming' = isPast ? 'past' : isCurrent ? 'current' : 'upcoming';

    // Phase 1 status & progress
    const isP1Past = now.getTime() > p2Start.getTime();
    const isP1Current = now.getTime() >= vStart.getTime() && now.getTime() <= p2Start.getTime();
    const p1Status: 'past' | 'current' | 'upcoming' = isP1Past ? 'past' : isP1Current ? 'current' : 'upcoming';

    const p1TotalDurationMs = p2Start.getTime() - vStart.getTime();
    const p1ElapsedMs = Math.max(0, Math.min(p1TotalDurationMs, now.getTime() - vStart.getTime()));
    const p1Progress = isP1Past ? 100 : isP1Current ? Math.round((p1ElapsedMs / p1TotalDurationMs) * 100) : 0;
    const p1RemainingMs = Math.max(0, p2Start.getTime() - now.getTime());

    // Phase 2 status & progress
    const isP2Past = now.getTime() > vEnd.getTime();
    const isP2Current = now.getTime() >= p2Start.getTime() && now.getTime() <= vEnd.getTime();
    const p2Status: 'past' | 'current' | 'upcoming' = isP2Past ? 'past' : isP2Current ? 'current' : 'upcoming';

    const p2TotalDurationMs = vEnd.getTime() - p2Start.getTime();
    const p2ElapsedMs = Math.max(0, Math.min(p2TotalDurationMs, now.getTime() - p2Start.getTime()));
    const p2Progress = isP2Past ? 100 : isP2Current ? Math.round((p2ElapsedMs / p2TotalDurationMs) * 100) : 0;
    const p2RemainingMs = Math.max(0, vEnd.getTime() - now.getTime());

    // Whole version progress & countdowns
    const vTotalDurationMs = vEnd.getTime() - vStart.getTime();
    const vElapsedMs = Math.max(0, Math.min(vTotalDurationMs, now.getTime() - vStart.getTime()));
    const vProgress = isPast ? 100 : isCurrent ? Math.round((vElapsedMs / vTotalDurationMs) * 100) : 0;

    const daysUntilStart = Math.max(0, Math.ceil((vStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const daysRemaining = Math.max(0, Math.ceil((vEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    const currentPhase: 1 | 2 | null = isCurrent ? (now.getTime() < p2Start.getTime() ? 1 : 2) : null;

    const phase1: VersionPhase = {
      phase: 1,
      name: `Phase 1 (Đợt 1)`,
      startDate: vStart,
      endDate: p2Start,
      startDateStr: formatDateVi(vStart),
      startTimeStr: formatTimeVi(vStart),
      endDateStr: formatDateVi(p2Start),
      endTimeStr: formatTimeVi(p2Start),
      durationDays: 20,
      status: p1Status,
      progressPercent: p1Progress,
      daysRemaining: Math.ceil(p1RemainingMs / (1000 * 60 * 60 * 24)),
      hoursRemaining: Math.ceil(p1RemainingMs / (1000 * 60 * 60)),
    };

    const phase2: VersionPhase = {
      phase: 2,
      name: `Phase 2 (Đợt 2)`,
      startDate: p2Start,
      endDate: vEnd,
      startDateStr: formatDateVi(p2Start),
      startTimeStr: formatTimeVi(p2Start),
      endDateStr: formatDateVi(vEnd),
      endTimeStr: formatTimeVi(vEnd),
      durationDays: 21,
      status: p2Status,
      progressPercent: p2Progress,
      daysRemaining: Math.ceil(p2RemainingMs / (1000 * 60 * 60 * 24)),
      hoursRemaining: Math.ceil(p2RemainingMs / (1000 * 60 * 60)),
    };

    versions.push({
      id,
      versionNumber,
      title: `Phiên Bản ${versionNumber}`,
      startDate: vStart,
      endDate: vEnd,
      startDateStr: formatDateVi(vStart),
      endDateStr: formatDateVi(vEnd),
      durationDays: 42,
      status,
      currentPhase,
      phase1,
      phase2,
      daysUntilStart,
      daysRemaining,
      progressPercent: vProgress,
      notes: customNotes[id] || '',
    });
  }

  return versions;
}
