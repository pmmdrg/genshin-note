import React, { useState, useMemo } from 'react';
import { X, Sparkles, Shield, Calendar, Check, Search } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { WishBannerType, WishRecord } from '../types';
import { CHARACTERS_DATA } from '../data/genshinData';
import { COMPREHENSIVE_WEAPONS } from '../data/weaponsData';
import { STANDARD_5STAR_CHARACTERS, STANDARD_5STAR_WEAPONS } from '../data/wishData';

interface AddWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingWish?: WishRecord | null;
  defaultBanner?: WishBannerType;
}

interface DialogProps {
  onClose: () => void;
  editingWish?: WishRecord | null;
  defaultBanner: WishBannerType;
}

const AddWishDialog: React.FC<DialogProps> = ({ onClose, editingWish, defaultBanner }) => {
  const { addWishRecord, updateWishRecord, wishBannerStats } = useStore();

  const [bannerType, setBannerType] = useState<WishBannerType>(() => {
    return editingWish?.bannerType || defaultBanner || 'character';
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Available 5★ characters
  const fiveStarCharacters = useMemo(() => {
    return CHARACTERS_DATA.filter((c) => c.rarity === 5);
  }, []);

  // Available 5★ weapons
  const fiveStarWeapons = useMemo(() => {
    return COMPREHENSIVE_WEAPONS.filter((w) => w.rarity === 5);
  }, []);

  const [selectedItemName, setSelectedItemName] = useState<string>(() => {
    if (editingWish) return editingWish.name;
    if (defaultBanner === 'weapon') {
      return fiveStarWeapons[0]?.nameVi || 'Đoạn Thảo Trường Đao';
    }
    return 'Mavuika';
  });

  const [isRateUp, setIsRateUp] = useState<boolean>(() => {
    return editingWish ? editingWish.isRateUp : true;
  });

  const [isCapturingRadiance, setIsCapturingRadiance] = useState<boolean>(() => {
    return !!editingWish?.isCapturingRadiance;
  });

  const [isGuaranteed, setIsGuaranteed] = useState<boolean>(() => {
    if (editingWish) return !!editingWish.isGuaranteed;
    return !!wishBannerStats[defaultBanner || 'character']?.isGuaranteed;
  });

  const [pity, setPity] = useState<number>(() => {
    if (editingWish) return editingWish.pity;
    const currentP = wishBannerStats[defaultBanner || 'character']?.currentPity || 0;
    return currentP > 0 ? currentP : 75;
  });

  const [date, setDate] = useState<string>(() => {
    return editingWish?.date || new Date().toISOString().split('T')[0];
  });

  const [notes, setNotes] = useState<string>(() => {
    return editingWish?.notes || '';
  });

  const [autoResetPity, setAutoResetPity] = useState<boolean>(() => {
    return !editingWish;
  });

  const maxPity = bannerType === 'weapon' ? 80 : 90;

  // Filter items based on banner and search query
  const selectableItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (bannerType === 'character') {
      return fiveStarCharacters
        .filter(
          (c) =>
            !query ||
            c.name.toLowerCase().includes(query) ||
            c.nameVi.toLowerCase().includes(query)
        )
        .map((c) => ({
          name: c.name,
          nameVi: c.nameVi,
          icon: c.avatarUrl,
          itemType: 'character' as const,
          isStandard: STANDARD_5STAR_CHARACTERS.some(
            (s) => s.toLowerCase() === c.name.toLowerCase() || s.toLowerCase() === c.nameVi.toLowerCase()
          ),
        }));
    } else if (bannerType === 'weapon') {
      return fiveStarWeapons
        .filter(
          (w) =>
            !query ||
            w.name.toLowerCase().includes(query) ||
            w.nameVi.toLowerCase().includes(query)
        )
        .map((w) => ({
          name: w.name,
          nameVi: w.nameVi,
          icon: w.avatarUrl,
          itemType: 'weapon' as const,
          isStandard: STANDARD_5STAR_WEAPONS.some(
            (s) => s.toLowerCase() === w.name.toLowerCase() || s.toLowerCase() === w.nameVi.toLowerCase()
          ),
        }));
    } else if (bannerType === 'chronicled') {
      // Chronicled Banner (Sử Ký): all 5★ characters and all 5★ weapons
      const allChars = fiveStarCharacters.map((c) => ({
        name: c.name,
        nameVi: c.nameVi,
        icon: c.avatarUrl,
        itemType: 'character' as const,
        isStandard: false,
      }));
      const allWeapons = fiveStarWeapons.map((w) => ({
        name: w.name,
        nameVi: w.nameVi,
        icon: w.avatarUrl,
        itemType: 'weapon' as const,
        isStandard: false,
      }));
      const combined = [...allChars, ...allWeapons];
      return combined.filter(
        (i) =>
          !query ||
          i.name.toLowerCase().includes(query) ||
          i.nameVi.toLowerCase().includes(query)
      );
    } else {
      // Standard Banner: combine standard characters and standard weapons
      const standardChars = fiveStarCharacters
        .filter((c) =>
          STANDARD_5STAR_CHARACTERS.some(
            (s) => s.toLowerCase() === c.name.toLowerCase() || s.toLowerCase() === c.nameVi.toLowerCase()
          )
        )
        .map((c) => ({
          name: c.name,
          nameVi: c.nameVi,
          icon: c.avatarUrl,
          itemType: 'character' as const,
          isStandard: true,
        }));

      const stdWeapons = fiveStarWeapons
        .filter((w) =>
          STANDARD_5STAR_WEAPONS.some(
            (s) => s.toLowerCase() === w.name.toLowerCase() || s.toLowerCase() === w.nameVi.toLowerCase()
          )
        )
        .map((w) => ({
          name: w.name,
          nameVi: w.nameVi,
          icon: w.avatarUrl,
          itemType: 'weapon' as const,
          isStandard: true,
        }));

      const combined = [...standardChars, ...stdWeapons];
      return combined.filter(
        (i) =>
          !query ||
          i.name.toLowerCase().includes(query) ||
          i.nameVi.toLowerCase().includes(query)
      );
    }
  }, [bannerType, searchQuery, fiveStarCharacters, fiveStarWeapons]);

  // Selected item object
  const selectedItemObj = selectableItems.find(
    (i) => i.name === selectedItemName || i.nameVi === selectedItemName
  ) || selectableItems[0];

  const handleSelectItem = (item: { name: string; nameVi: string; isStandard: boolean }) => {
    setSelectedItemName(item.nameVi || item.name);
    if (bannerType === 'character' || bannerType === 'weapon') {
      if (item.isStandard) {
        setIsRateUp(false);
        setIsCapturingRadiance(false);
      } else {
        setIsRateUp(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemObj) return;

    const recordData: Omit<WishRecord, 'id'> = {
      name: selectedItemObj.name,
      nameVi: selectedItemObj.nameVi,
      icon: selectedItemObj.icon,
      itemType: selectedItemObj.itemType,
      rarity: 5,
      bannerType,
      pity: Math.max(1, Math.min(maxPity, pity)),
      date: date || new Date().toISOString().split('T')[0],
      isRateUp: bannerType === 'standard' ? true : isRateUp,
      isCapturingRadiance: bannerType === 'character' ? isCapturingRadiance : false,
      isGuaranteed,
      notes: notes.trim(),
    };

    if (editingWish) {
      updateWishRecord(editingWish.id, recordData);
    } else {
      addWishRecord(recordData, autoResetPity);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-page-transition">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto liquid-glass rounded-3xl border border-white/15 p-5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.7)] text-slate-100 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500/20 to-purple-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {editingWish ? 'Chỉnh Sửa Lịch Sử 5★' : 'Thêm Lần Nổ 5★ Mới'}
              </h2>
              <p className="text-xs text-slate-400">
                Lưu lại vật phẩm 5★, số roll nổ và trạng thái Trúng/Lệch Rate
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Chọn Banner Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Loại Banner Cầu Nguyện
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => {
                  setBannerType('character');
                  setSearchQuery('');
                  setSelectedItemName('Mavuika');
                  setIsRateUp(true);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  bannerType === 'character'
                    ? 'bg-gradient-to-r from-purple-500/80 to-indigo-600/80 text-white border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                Nhân Vật
              </button>
              <button
                type="button"
                onClick={() => {
                  setBannerType('weapon');
                  setSearchQuery('');
                  setSelectedItemName(fiveStarWeapons[0]?.nameVi || 'Đoạn Thảo Trường Đao');
                  setIsRateUp(true);
                  setIsCapturingRadiance(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  bannerType === 'weapon'
                    ? 'bg-gradient-to-r from-amber-500/80 to-orange-600/80 text-white border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                Vũ Khí
              </button>
              <button
                type="button"
                onClick={() => {
                  setBannerType('standard');
                  setSearchQuery('');
                  setSelectedItemName('Diluc');
                  setIsRateUp(true);
                  setIsCapturingRadiance(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  bannerType === 'standard'
                    ? 'bg-gradient-to-r from-blue-500/80 to-cyan-600/80 text-white border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                Thường
              </button>
              <button
                type="button"
                onClick={() => {
                  setBannerType('chronicled');
                  setSearchQuery('');
                  setSelectedItemName('Jean');
                  setIsRateUp(true);
                  setIsCapturingRadiance(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  bannerType === 'chronicled'
                    ? 'bg-gradient-to-r from-teal-500/80 to-emerald-600/80 text-white border-teal-400/40 shadow-[0_0_15px_rgba(20,184,166,0.3)]'
                    : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                Sử Ký
              </button>
            </div>
          </div>

          {/* 2. Chọn Nhân Vật / Vũ Khí 5★ */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Vật Phẩm 5★ ({selectableItems.length})
              </label>
              <div className="relative w-44">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1 text-xs bg-white/[0.06] border border-white/[0.1] rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                />
              </div>
            </div>

            {/* Selection Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-44 overflow-y-auto p-1.5 rounded-2xl bg-black/25 border border-white/[0.06]">
              {selectableItems.map((item) => {
                const isSelected =
                  selectedItemName === item.name || selectedItemName === item.nameVi;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleSelectItem(item)}
                    className={`relative p-1.5 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer text-center group ${
                      isSelected
                        ? 'bg-amber-500/25 border-2 border-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.4)] scale-105'
                        : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black/40 border border-amber-400/30 shrink-0">
                      <img
                        src={item.icon}
                        alt={item.nameVi}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {item.isStandard && (
                        <span className="absolute top-0 right-0 text-[8px] bg-rose-500/90 text-white font-extrabold px-1 rounded-bl-md">
                          Lệch
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-slate-200 line-clamp-1 leading-tight">
                      {item.nameVi || item.name}
                    </span>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-black rounded-full flex items-center justify-center text-[9px] font-bold shadow-md">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Pity Nổ & Ngày Quay */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Số Roll Nổ 5★ (Pity)
                </label>
                <span className="text-xs font-bold text-amber-300">
                  {pity} / {maxPity}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPity((prev) => Math.max(1, prev - 1))}
                  className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 font-bold flex items-center justify-center cursor-pointer border border-white/[0.08]"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  max={maxPity}
                  value={pity}
                  onChange={(e) => setPity(Number(e.target.value))}
                  className="flex-1 py-2 text-center text-sm font-bold bg-white/[0.06] border border-white/[0.12] rounded-xl text-white focus:outline-none focus:border-amber-400/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPity((prev) => Math.min(maxPity, prev + 1))}
                  className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 font-bold flex items-center justify-center cursor-pointer border border-white/[0.08]"
                >
                  +
                </button>
              </div>

              {/* Quick chips */}
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[10px] text-slate-500">Nhanh:</span>
                {[10, 45, 75, maxPity].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setPity(val)}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 border border-white/[0.08] cursor-pointer"
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Ngày Roll Nổ
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white/[0.06] border border-white/[0.12] rounded-xl text-slate-200 focus:outline-none focus:border-amber-400/50"
                  required
                />
              </div>
            </div>
          </div>

          {/* 4. Kết Quả Rate-Up / Lệch Rate & Bắt Lấy Ánh Sáng */}
          {bannerType !== 'standard' && (
            <div className="p-3.5 rounded-2xl bg-black/25 border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {bannerType === 'chronicled' ? 'Kết Quả Định Mệnh:' : 'Kết Quả 50/50:'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRateUp(true);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isRateUp
                        ? 'bg-emerald-500/25 border-emerald-400/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                        : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
                    }`}
                  >
                    {bannerType === 'chronicled' ? '✓ Trúng Mục Tiêu' : '✓ Trúng Rate'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRateUp(false);
                      setIsCapturingRadiance(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      !isRateUp
                        ? 'bg-rose-500/25 border-rose-400/60 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                        : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
                    }`}
                  >
                    {bannerType === 'chronicled' ? '✕ Lệch Mục Tiêu' : '✕ Lệch Rate'}
                  </button>
                </div>
              </div>

              {/* Bắt Lấy Ánh Sáng (Capturing Radiance) Toggle */}
              {bannerType === 'character' && (
                <div
                  onClick={() => {
                    const nextVal = !isCapturingRadiance;
                    setIsCapturingRadiance(nextVal);
                    if (nextVal) {
                      setIsRateUp(true);
                    }
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                    isCapturingRadiance
                      ? 'radiance-badge border-pink-400/60'
                      : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                        isCapturingRadiance
                          ? 'bg-pink-500 text-white shadow-[0_0_10px_rgba(236,72,153,0.6)]'
                          : 'bg-white/[0.08] text-slate-400'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">
                          Kích Hoạt Bắt Lấy Ánh Sáng (5.0+)
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-pink-500/30 text-pink-200 border border-pink-400/40 font-extrabold">
                          Capturing Radiance
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-300">
                        Khi quay bị lệch nhưng hiệu ứng cầu vồng kích hoạt đổi thành nhân vật sự kiện
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      isCapturingRadiance
                        ? 'bg-pink-500 border-pink-300 text-white'
                        : 'border-white/20 bg-black/30'
                    }`}
                  >
                    {isCapturingRadiance && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              )}

              {/* Bảo hiểm trước đó */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                  <span>
                    {bannerType === 'chronicled'
                      ? 'Lúc quay đã có sẵn 1 Điểm Định Mệnh?'
                      : 'Lúc quay đã có sẵn bảo hiểm 100%?'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsGuaranteed(!isGuaranteed)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium cursor-pointer transition-colors ${
                    isGuaranteed
                      ? 'bg-indigo-500/25 border-indigo-400/50 text-indigo-300'
                      : 'bg-white/[0.04] border-white/[0.08] text-slate-400'
                  }`}
                >
                  {bannerType === 'chronicled'
                    ? isGuaranteed
                      ? 'Có Định Mệnh'
                      : 'Chưa Có'
                    : isGuaranteed
                    ? 'Có Bảo Hiểm'
                    : 'Không (50/50)'}
                </button>
              </div>
            </div>
          )}

          {/* 5. Ghi Chú & Tự Động Reset Pity */}
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                Ghi Chú (Tùy chọn)
              </label>
              <input
                type="text"
                placeholder="VD: C1 Furina, Nổ sớm 32 roll, Cung Mệnh mới..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white/[0.06] border border-white/[0.1] rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
              />
            </div>

            {!editingWish && (
              <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={autoResetPity}
                  onChange={(e) => setAutoResetPity(e.target.checked)}
                  className="rounded bg-white/10 border-white/20 text-amber-500 focus:ring-0 cursor-pointer"
                />
                <span>Tự động đặt lại Pity hiện tại của banner này về 0</span>
              </label>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-[0_4px_16px_rgba(245,158,11,0.35)] transition-all cursor-pointer active:scale-95"
            >
              {editingWish ? 'Lưu Thay Đổi' : 'Xác Nhận Thêm 5★'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AddWishModal: React.FC<AddWishModalProps> = ({
  isOpen,
  onClose,
  editingWish,
  defaultBanner = 'character',
}) => {
  if (!isOpen) return null;

  return (
    <AddWishDialog
      key={editingWish ? editingWish.id : `new-${defaultBanner}`}
      onClose={onClose}
      editingWish={editingWish}
      defaultBanner={defaultBanner}
    />
  );
};
