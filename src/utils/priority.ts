/**
 * Utilities for Genshin Server Time & Priority Calculations
 * Genshin Impact servers reset at 04:00 AM local server time (UTC+8 for Asia).
 */

export function getGenshinServerDate(serverOffsetHours: number = 8): {
  dayOfWeek: number; // 0: Sunday, 1: Monday, ... 6: Saturday
  displayTime: string;
  isBeforeDailyReset: boolean;
} {
  const now = new Date();
  // Convert UTC to Server Time
  const serverTime = new Date(now.getTime() + (serverOffsetHours * 60 + now.getTimezoneOffset()) * 60000);
  
  // If time is before 4:00 AM, it belongs to the previous day in Genshin daily cycle
  const currentHour = serverTime.getHours();
  let dayOfWeek = serverTime.getDay();
  
  if (currentHour < 4) {
    dayOfWeek = (dayOfWeek + 6) % 7; // Previous day
  }

  const hours = String(serverTime.getHours()).padStart(2, '0');
  const minutes = String(serverTime.getMinutes()).padStart(2, '0');
  
  return {
    dayOfWeek,
    displayTime: `${hours}:${minutes}`,
    isBeforeDailyReset: currentHour < 4,
  };
}

export function isDomainOpenToday(availableDays?: number[], serverOffsetHours: number = 8): boolean {
  if (!availableDays || availableDays.length === 0) return true;
  const { dayOfWeek } = getGenshinServerDate(serverOffsetHours);
  
  // Sunday (0) opens ALL talent and weapon ascension domains in Genshin!
  if (dayOfWeek === 0) return true;
  
  return availableDays.includes(dayOfWeek);
}

export function calculateResinRecovery(currentResin: number, lastUpdatedTimestamp: number): {
  actualResin: number;
  secondsUntilNext: number;
  secondsUntilFull: number;
  isFull: boolean;
} {
  const MAX_RESIN = 200;
  if (currentResin >= MAX_RESIN) {
    return {
      actualResin: MAX_RESIN,
      secondsUntilNext: 0,
      secondsUntilFull: 0,
      isFull: true,
    };
  }

  const now = Date.now();
  const elapsedSeconds = Math.max(0, Math.floor((now - lastUpdatedTimestamp) / 1000));
  
  // 1 resin recovers every 8 minutes (480 seconds)
  const SECONDS_PER_RESIN = 480;
  const recoveredResin = Math.floor(elapsedSeconds / SECONDS_PER_RESIN);
  const actualResin = Math.min(MAX_RESIN, currentResin + recoveredResin);
  
  if (actualResin >= MAX_RESIN) {
    return {
      actualResin: MAX_RESIN,
      secondsUntilNext: 0,
      secondsUntilFull: 0,
      isFull: true,
    };
  }

  const remainderSeconds = elapsedSeconds % SECONDS_PER_RESIN;
  const secondsUntilNext = SECONDS_PER_RESIN - remainderSeconds;
  const resinRemaining = MAX_RESIN - actualResin;
  const secondsUntilFull = (resinRemaining - 1) * SECONDS_PER_RESIN + secondsUntilNext;

  return {
    actualResin,
    secondsUntilNext,
    secondsUntilFull,
    isFull: false,
  };
}

export function formatSecondsToTime(totalSeconds: number): string {
  if (totalSeconds <= 0) return 'Đã đầy';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m ${seconds}s`;
}
