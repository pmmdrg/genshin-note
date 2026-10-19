import React, { useState } from 'react';
import { X, CloudSync, Shield, AlertCircle, CheckCircle2, ExternalLink, Key } from 'lucide-react';
import { useStore } from '../store/useStore';

interface HoyoSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HoyoSyncModal: React.FC<HoyoSyncModalProps> = ({ isOpen, onClose }) => {
  const {
    hoyoConfig,
    setHoyoConfig,
    syncWithHoyo,
    hoyoSyncLoading,
    hoyoSyncError,
    hoyoData,
  } = useStore();


  const [uid, setUid] = useState(hoyoConfig.uid || '');
  const [cookie, setCookie] = useState(hoyoConfig.cookie || '');
  const [server, setServer] = useState(hoyoConfig.server || 'os_asia');
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleSaveAndSync = async () => {
    setHoyoConfig({
      uid: uid.trim(),
      cookie: cookie.trim(),
      server,
      enabled: true,
    });

    setSuccessMsg(false);
    await syncWithHoyo();
    setSuccessMsg(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0f1424] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CloudSync className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Đồng Bộ API HoYoLAB (Vercel Serverless)
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Tự động lấy Nhựa, Ủy thác, Boss tuần theo thời gian thực
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Security Notice */}
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-2.5 text-indigo-200">
            <Shield className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-indigo-300">
                An toàn tuyệt đối cho người dùng cá nhân
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Khi deploy lên Vercel, hàm Serverless nội bộ <code className="text-indigo-300">/api/dailyNote</code> sẽ làm trung gian gọi HoYoLAB để vượt qua kiểm tra CORS. Dữ liệu chỉ lưu trong trình duyệt của bạn hoặc biến môi trường Vercel của chính bạn.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Genshin In-Game UID
              </label>
              <input
                type="text"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                placeholder="Ví dụ: 812345678 (Server Asia)"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Máy Chủ (Server)
              </label>
              <select
                value={server}
                onChange={(e) => setServer(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="os_asia">Châu Á (Asia) - os_asia (UID đầu 8 hoặc 18)</option>
                <option value="os_usa">Bắc Mỹ (America) - os_usa (UID đầu 6)</option>
                <option value="os_euro">Châu Âu (Europe) - os_euro (UID đầu 7)</option>
                <option value="os_cht">TW, HK, MO - os_cht (UID đầu 9)</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  HoYoLAB Cookie
                </label>
                <span className="text-[10px] text-slate-500">(Bắt buộc để xác thực)</span>
              </div>
              <textarea
                value={cookie}
                onChange={(e) => setCookie(e.target.value)}
                placeholder="Dán chuỗi cookie (ltuid_v2=...; ltoken_v2=...) vào đây..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Guide to get cookie */}
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
            <div className="font-semibold text-slate-300 flex items-center gap-1">
              <span>Hướng dẫn lấy Cookie nhanh:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>Mở trình duyệt, đăng nhập vào trang <a href="https://www.hoyolab.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline inline-flex items-center gap-0.5">hoyolab.com <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li>Bấm <kbd className="px-1 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">F12</kbd> $\rightarrow$ chọn tab <b>Console</b></li>
              <li>Gõ lệnh <code className="text-amber-300">document.cookie</code> và nhấn Enter</li>
              <li>Copy toàn bộ dòng kết quả trong dấu nháy kép và dán vào ô bên trên.</li>
            </ol>
          </div>

          {/* Status feedback */}
          {hoyoSyncError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{hoyoSyncError}</span>
            </div>
          )}

          {hoyoData && successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Đồng bộ thành công! Nhựa hiện tại: {hoyoData.current_resin}/200.</span>
            </div>
          )}

          {/* Action button */}
          <button
            onClick={handleSaveAndSync}
            disabled={hoyoSyncLoading || !uid}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <CloudSync className={`w-4 h-4 ${hoyoSyncLoading ? 'animate-spin' : ''}`} />
            {hoyoSyncLoading ? 'Đang kết nối HoYoLAB...' : 'Lưu & Đồng Bộ Ngay'}
          </button>
        </div>
      </div>
    </div>
  );
};
