import React, { useState, useEffect } from 'react';
import { Droplet, AlertTriangle, Compass, CheckCircle2, CircleDashed, Swords, Sparkles, Home } from 'lucide-react';
import { useStore } from '../store/useStore';
import { calculateResinRecovery, formatSecondsToTime } from '../utils/priority';

export const ResinTracker: React.FC = () => {
  const {
    manualResin,
    lastResinUpdate,
    hoyoData,
  } = useStore();

  const [, setTick] = useState(0);

  // Auto tick every second to update recovery countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const recoveryInfo = calculateResinRecovery(manualResin, lastResinUpdate);
  const currentResin = recoveryInfo.actualResin;
  const isCapped = currentResin >= 200;
  const isDanger = currentResin >= 170;

  // Real status from HoYoLAB if available
  const hasHoyo = !!hoyoData;
  const commissionsDone = hoyoData ? hoyoData.finished_task_num : null;
  const isKatheryneClaimed = hoyoData ? hoyoData.is_extra_task_reward_received : false;
  const weeklyBossUsed = hoyoData ? hoyoData.resin_discount_num_limit - hoyoData.remain_resin_discount_num : null;
  const realmCoins = hoyoData ? hoyoData.current_home_coin : null;
  const realmMaxCoins = hoyoData ? hoyoData.max_home_coin : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      {/* 1. Resin Card - Purely informative Liquid Glass */}
      <div className="lg:col-span-2 relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-7 flex flex-col justify-between">
        {/* Ambient liquid glow behind */}
        <div
          className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-25 pointer-events-none transition-all ${
            isDanger ? 'bg-rose-500' : 'bg-cyan-400'
          }`}
        />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-15 bg-indigo-500 pointer-events-none" />

        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center p-2.5 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${
                  isDanger
                    ? 'bg-rose-500/15 border border-rose-500/30 text-rose-400 shadow-rose-500/10'
                    : 'bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 shadow-cyan-500/10'
                }`}
              >
                <Droplet className="w-full h-full fill-current drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                    Nhựa Nguyên Bản
                  </span>
                  {isDanger && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-300 bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 rounded-full animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                      <AlertTriangle className="w-3 h-3" />
                      Sắp tràn nhựa!
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mt-1">
                  <span
                    className={`text-4xl font-extrabold tracking-tight font-mono ${
                      isDanger
                        ? 'text-rose-300 drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                        : 'text-cyan-200 drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                    }`}
                  >
                    {currentResin}
                  </span>
                  <span className="text-slate-400 text-base font-semibold">/ 200</span>
                </div>
              </div>
            </div>

            {/* Countdown timers */}
            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-400 font-medium">Thời gian đầy</div>
              <div className="text-lg font-bold text-slate-100 font-mono mt-0.5 tracking-tight">
                {isCapped ? (
                  <span className="text-rose-300 font-sans">Đã đầy (200/200)</span>
                ) : (
                  formatSecondsToTime(recoveryInfo.secondsUntilFull)
                )}
              </div>
              {!isCapped && (
                <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">
                  +1 trong {formatSecondsToTime(recoveryInfo.secondsUntilNext)}
                </div>
              )}
            </div>
          </div>

          {/* Liquid Glass Progress Bar */}
          <div className="w-full bg-white/[0.04] rounded-full h-3 overflow-hidden p-0.5 border border-white/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isDanger
                  ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-rose-600 shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                  : 'bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 shadow-[0_0_12px_rgba(34,211,238,0.4)]'
              }`}
              style={{ width: `${Math.min(100, (currentResin / 200) * 100)}%` }}
            />
          </div>
        </div>

        {/* Footer info note */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Tự hồi phục: 1 nhựa / 8 phút
          </span>
          <span className="text-[11px] text-slate-500">
            {hasHoyo ? 'Đã liên kết HoYoLAB' : 'Tự động tính theo thời gian'}
          </span>
        </div>
      </div>

      {/* 2. Dailies Checked Status Card */}
      <div className="rounded-3xl liquid-glass p-6 sm:p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              Nhiệm Vụ Hằng Ngày
            </h2>
          </div>

          {/* If HoYoLAB data exists -> Display real verified status */}
          {hasHoyo ? (
            <div className="space-y-3">
              {/* Daily Commissions */}
              <div className="liquid-glass-subtle rounded-2xl p-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {commissionsDone === 4 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <CircleDashed className="w-4 h-4 text-amber-400 animate-spin" />
                    )}
                    <span className="text-xs font-semibold text-slate-200">Ủy thác ngày</span>
                  </div>
                  <span
                    className={`text-xs font-bold font-mono px-2 py-0.5 rounded-lg border ${
                      commissionsDone === 4
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {commissionsDone} / 4
                  </span>
                </div>
                {commissionsDone === 4 && (
                  <div className="text-[11px] text-emerald-400/90 mt-1 pl-6">
                    {isKatheryneClaimed ? '✓ Đã nhận thưởng Katheryne (20 NT)' : '⚠️ Chưa nhận thưởng Katheryne!'}
                  </div>
                )}
              </div>

              {/* Weekly Bosses */}
              <div className="liquid-glass-subtle rounded-2xl p-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Swords className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-semibold text-slate-200">Boss tuần (-50% nhựa)</span>
                  </div>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    {weeklyBossUsed} / 3 đã đánh
                  </span>
                </div>
              </div>

              {/* Realm Currency if available */}
              {realmCoins !== null && (
                <div className="liquid-glass-subtle rounded-2xl p-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-semibold text-slate-200">Tiền Ấm Trần Ca</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-slate-300">
                      {realmCoins} / {realmMaxCoins}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* When HoYoLAB is not synced yet */
            <div className="flex flex-col items-center justify-center text-center py-6 px-2">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-3 text-slate-400">
                <Compass className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-xs font-semibold text-slate-300 mb-1">
                Tự động kiểm tra trạng thái
              </p>
              <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                Nhấn biểu tượng ⚙️ cài đặt ở góc trên để liên kết HoYoLAB, hệ thống sẽ tự động cập nhật tiến độ ủy thác và boss tuần.
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500">
          <span>Chu kỳ ngày</span>
          <span className="text-slate-400">Đặt lại lúc 04:00 AM</span>
        </div>
      </div>
    </div>
  );
};
