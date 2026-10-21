import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, CheckCircle2, XCircle, Search } from 'lucide-react';
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
  const { addWishRecord, updateWishRecord, wishBannerStats, wishHistory } = useStore();

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

  const [isCapturingRadiance, setIsCapturingRadiance] = useState<boolean>(() => {
    return !!editingWish?.isCapturingRadiance;
  });

  // For chronicled banner only
  const [chronicledRateUp, setChronicledRateUp] = useState<boolean>(() => {
    return editingWish ? editingWish.isRateUp : true;
  });

  const [pity, setPity] = useState<number>(() => {
    if (editingWish) return editingWish.pity;
    const currentP = wishBannerStats[defaultBanner || 'character']?.currentPity || 0;
    return currentP > 0 ? currentP : (defaultBanner === 'weapon' ? 65 : 75);
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

  // Automatic determination of rate-up vs loss
  const isSelectedStandard = useMemo(() => {
    if (!selectedItemObj) return false;
    if (bannerType === 'character') {
      return STANDARD_5STAR_CHARACTERS.some(
        (s) =>
          s.toLowerCase() === selectedItemObj.name.toLowerCase() ||
          s.toLowerCase() === selectedItemObj.nameVi.toLowerCase()
      );
    }
    if (bannerType === 'weapon') {
      return STANDARD_5STAR_WEAPONS.some(
        (s) =>
          s.toLowerCase() === selectedItemObj.name.toLowerCase() ||
          s.toLowerCase() === selectedItemObj.nameVi.toLowerCase()
      );
    }
    return false;
  }, [selectedItemObj, bannerType]);

  const handleSelectItem = (item: { name: string; nameVi: string }) => {
    setSelectedItemName(item.nameVi || item.name);
    setIsCapturingRadiance(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemObj) return;

    // Determine rateUp status automatically
    let isRateUp = true;
    if (bannerType === 'character' || bannerType === 'weapon') {
      // If standard item selected -> loss (false), unless Capturing Radiance is active
      isRateUp = !isSelectedStandard || isCapturingRadiance;
    } else if (bannerType === 'chronicled') {
      isRateUp = chronicledRateUp;
    } else {
      isRateUp = true;
    }

    // Determine guarantee automatically based on previous pull in history
    const prevBannerRecord = wishHistory.find(
      (r) => r.bannerType === bannerType && r.id !== editingWish?.id
    );
    const wasGuaranteed = prevBannerRecord
      ? !prevBannerRecord.isRateUp
      : !!wishBannerStats[bannerType]?.isGuaranteed;

    const recordData: Omit<WishRecord, 'id'> = {
      name: selectedItemObj.name,
      nameVi: selectedItemObj.nameVi,
      icon: selectedItemObj.icon,
      itemType: selectedItemObj.itemType,
      rarity: 5,
      bannerType,
      pity: Math.max(1, Math.min(maxPity, pity)),
      date: editingWish?.date || new Date().toISOString().split('T')[0],
      isRateUp,
      isCapturingRadiance: bannerType === 'character' ? isCapturingRadiance : false,
      isGuaranteed: wasGuaranteed,
      notes: editingWish?.notes || '',
    };

    if (editingWish) {
      updateWishRecord(editingWish.id, recordData);
    } else {
      addWishRecord(recordData, autoResetPity);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-page-transition"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto liquid-glass rounded-3xl border border-white/15 p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-slate-100 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/20 to-purple-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                {editingWish ? 'Chỉnh Sửa Lần Nổ 5★' : 'Thêm Lần Nổ 5★'}
              </h2>
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
              Loại Banner
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => {
                  setBannerType('character');
                  setSearchQuery('');
                  setSelectedItemName('Mavuika');
                  setIsCapturingRadiance(false);
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
                  setIsCapturingRadiance(false);
                  setChronicledRateUp(true);
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

          {/* 2. Chọn Vật Phẩm 5★ */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Chọn Vật Phẩm 5★
              </label>
              <div className="relative w-40 sm:w-48">
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
                      {item.isStandard && bannerType !== 'standard' && (
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

          {/* 3. Tự Động Xét Bảo Hiểm / Trúng Rate */}
          {bannerType === 'character' && (
            <div className="p-3 rounded-2xl bg-black/25 border border-white/[0.08] flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Kết quả:</span>
                {isSelectedStandard ? (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Lệch Rate (Nhân vật thường) → Lần sau BẢO HIỂM</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Trúng Rate (Nhân vật giới hạn)</span>
                  </span>
                )}
              </div>

              {/* Bắt Lấy Ánh Sáng switch */}
              {!isSelectedStandard && (
                <button
                  type="button"
                  onClick={() => setIsCapturingRadiance(!isCapturingRadiance)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCapturingRadiance
                      ? 'radiance-badge text-white border-pink-400'
                      : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-pink-300'
                  }`}
                  title="Nhấn nếu lần này nổ ra nhờ hiệu ứng Bắt Lấy Ánh Sáng"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isCapturingRadiance ? '✓ Bắt Lấy Ánh Sáng' : 'Bắt Lấy Ánh Sáng?'}</span>
                </button>
              )}
            </div>
          )}

          {bannerType === 'weapon' && (
            <div className="p-3 rounded-2xl bg-black/25 border border-white/[0.08] flex items-center gap-2">
              <span className="text-xs text-slate-400">Kết quả:</span>
              {isSelectedStandard ? (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Lệch (Vũ khí thường) → Tích 1 Điểm Định Mệnh</span>
                </span>
              ) : (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Trúng Vũ Khí Định Mệnh</span>
                </span>
              )}
            </div>
          )}

          {bannerType === 'chronicled' && (
            <div className="p-3 rounded-2xl bg-black/25 border border-white/[0.08] flex items-center justify-between gap-2">
              <span className="text-xs text-slate-400">Mục tiêu Sử Ký:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setChronicledRateUp(true)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    chronicledRateUp
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
                  }`}
                >
                  ✓ Trúng Mục Tiêu
                </button>
                <button
                  type="button"
                  onClick={() => setChronicledRateUp(false)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    !chronicledRateUp
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
                  }`}
                >
                  ✕ Lệch Mục Tiêu
                </button>
              </div>
            </div>
          )}

          {/* 4. Số Roll Nổ (Pity) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
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
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-500">Mốc nhanh:</span>
              {[10, 45, bannerType === 'weapon' ? 65 : 75, maxPity].map((val) => (
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

          {/* 5. Tự Động Reset Pity */}
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

  return createPortal(
    <AddWishDialog
      key={editingWish ? editingWish.id : `new-${defaultBanner}`}
      onClose={onClose}
      editingWish={editingWish}
      defaultBanner={defaultBanner}
    />,
    document.body
  );
};
