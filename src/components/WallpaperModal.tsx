import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, Check, Sliders, Upload, Link as LinkIcon, RotateCcw, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { WALLPAPER_PRESETS } from '../data/wallpapers';
import type { WallpaperConfig } from '../types';

export const WallpaperModal: React.FC = () => {
  const { wallpaper, setWallpaper, resetWallpaper, isWallpaperModalOpen, setIsWallpaperModalOpen } = useStore();
  const [customInput, setCustomInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isWallpaperModalOpen) return null;

  const handleSelectPreset = (presetId: string) => {
    setWallpaper({ presetId, customUrl: presetId === 'custom' ? wallpaper.customUrl : undefined });
    setErrorMsg(null);
  };

  const handleApplyCustomUrl = () => {
    const trimmed = customInput.trim();
    if (!trimmed) {
      setErrorMsg('Vui lòng dán liên kết hình ảnh hợp lệ.');
      return;
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('data:image/')) {
      setErrorMsg('Liên kết phải bắt đầu bằng http:// hoặc https://');
      return;
    }
    setWallpaper({ presetId: 'custom', customUrl: trimmed });
    setErrorMsg(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Vui lòng chọn tập tin hình ảnh (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('Kích thước ảnh không nên vượt quá 8MB để đảm bảo hiệu năng.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setWallpaper({ presetId: 'custom', customUrl: result });
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    resetWallpaper();
    setCustomInput('');
    setErrorMsg(null);
  };

  const blurOptions: Array<{ id: WallpaperConfig['blur']; label: string }> = [
    { id: 'none', label: 'Tắt (Sắc nét)' },
    { id: 'sm', label: 'Mờ nhẹ (4px)' },
    { id: 'md', label: 'Mờ vừa (10px)' },
    { id: 'lg', label: 'Mờ sâu (20px)' },
  ];

  const opacityOptions = [
    { value: 0.45, label: '45% (Sáng)' },
    { value: 0.65, label: '65% (Chuẩn)' },
    { value: 0.78, label: '78% (Dịu mắt)' },
    { value: 0.88, label: '88% (Tối sâu)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-page-transition">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={() => setIsWallpaperModalOpen(false)} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] liquid-glass border border-white/20 rounded-3xl shadow-2xl backdrop-blur-3xl flex flex-col overflow-hidden text-slate-100 z-10 animate-card-pop">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>Tuỳ Chọn Hình Nền Trang Web</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                  Liquid Glass
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Chọn phong cảnh các quốc gia Teyvat hoặc tải lên hình nền yêu thích của bạn
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWallpaperModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* 1. PRESET WALLPAPERS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Bộ Sưu Tập Phong Cảnh Teyvat
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                {WALLPAPER_PRESETS.length} giao diện
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {WALLPAPER_PRESETS.map((p) => {
                const isSelected = wallpaper.presetId === p.id;
                const isDefaultObsidian = p.id === 'default';

                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p.id)}
                    className={`group relative rounded-2xl overflow-hidden border p-2 text-left transition-all duration-300 cursor-pointer flex flex-col justify-between aspect-[16/10] ${
                      isSelected
                        ? 'border-purple-400/80 ring-2 ring-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.35)] scale-[1.02]'
                        : 'border-white/[0.1] hover:border-white/30 hover:scale-[1.01] liquid-glass-subtle'
                    }`}
                  >
                    {/* Background Preview */}
                    {isDefaultObsidian ? (
                      <div className="absolute inset-0 bg-[#07090e] flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600/30 via-cyan-500/20 to-transparent blur-xl" />
                      </div>
                    ) : (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${p.thumbnail})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                      </div>
                    )}

                    {/* Active Checkmark Badge */}
                    <div className="relative z-10 flex items-center justify-between w-full">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-slate-300 border border-white/10">
                        {p.region}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <div className="relative z-10">
                      <div className="text-xs font-bold text-slate-100 truncate group-hover:text-purple-300 transition-colors">
                        {p.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. CUSTOM WALLPAPER SECTION */}
          <div className="p-4 rounded-2xl liquid-glass-subtle space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              Sử Dụng Ảnh Của Bạn
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option A: Paste URL */}
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                  Dán liên kết ảnh trực tiếp:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/wallpaper.jpg"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="flex-1 bg-white/[0.04] border border-white/[0.1] focus:border-purple-400/60 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
                  />
                  <button
                    onClick={handleApplyCustomUrl}
                    className="px-3 py-2 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>

              {/* Option B: Upload from device */}
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-slate-400" />
                  Tải ảnh từ máy tính / điện thoại:
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-cyan-400/40 text-xs text-slate-200 font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Chọn tệp ảnh trên máy...</span>
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="text-xs text-rose-400 font-medium pt-1">
                ⚠️ {errorMsg}
              </div>
            )}

            {wallpaper.presetId === 'custom' && wallpaper.customUrl && (
              <div className="pt-2 flex items-center justify-between text-xs text-purple-300 bg-purple-500/10 p-2 rounded-xl border border-purple-500/20">
                <span className="truncate max-w-[400px]">Đang dùng ảnh tùy chỉnh của bạn</span>
                <span className="text-[10px] font-bold text-emerald-400">Đã kích hoạt</span>
              </div>
            )}
          </div>

          {/* 3. VISUAL TUNING (BLUR & DIM OVERLAY) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Blur adjustment */}
            <div className="p-3.5 rounded-2xl liquid-glass-subtle space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  Độ Mờ Hậu Cảnh (Blur):
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {blurOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setWallpaper({ blur: opt.id })}
                    className={`px-2 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      wallpaper.blur === opt.id
                        ? 'bg-amber-400/20 border-amber-400/60 text-amber-300 shadow-sm'
                        : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Darkening / Dim overlay */}
            <div className="p-3.5 rounded-2xl liquid-glass-subtle space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-sky-400" />
                  Độ Tối Lớp Phủ (Đọc rõ chữ):
                </span>
                <span className="text-sky-300 font-bold">
                  {Math.round(wallpaper.overlayOpacity * 100)}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {opacityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setWallpaper({ overlayOpacity: opt.value })}
                    className={`px-2 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      Math.abs(wallpaper.overlayOpacity - opt.value) < 0.05
                        ? 'bg-sky-400/20 border-sky-400/60 text-sky-300 shadow-sm'
                        : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors px-2 py-1.5 rounded-xl hover:bg-rose-500/10 cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục mặc định</span>
          </button>

          <button
            onClick={() => setIsWallpaperModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            Hoàn Tất
          </button>
        </div>
      </div>
    </div>
  );
};
