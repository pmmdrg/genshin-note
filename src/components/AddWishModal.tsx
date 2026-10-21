import React, { useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, CheckCircle2, XCircle, Search, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useDebounce } from '../hooks/useDebounce';
import type { WishBannerType, WishRecord } from '../types';
import {
  STANDARD_5STAR_CHARACTERS,
  STANDARD_5STAR_WEAPONS,
  GACHA_ALL_CHARACTERS,
  GACHA_ALL_WEAPONS,
  BANNER_NAMES,
} from '../data/wishData';

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

function cleanStr(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/\s+/g, '');
}

const ALIASES: Record<string, string[]> = {
  // Characters
  tartaglia: ['childe', 'ajax', 'quan tinh'],
  wanderer: ['scaramouche', 'ke lang thang', 'kelangthang', 'hat guy'],
  'raiden shogun': ['ei', 'baal', 'raiden', 'loi than'],
  zhongli: ['morax', 'rex lapis', 'nham than'],
  venti: ['barbatos', 'phong than'],
  nahida: ['kusanali', 'buer', 'thao than'],
  furina: ['focalors', 'thuy than'],
  mavuika: ['habaki', 'hoa than'],
  'yumemizuki mizuki': ['mizuki', 'baku'],
  aloy: ['aloy'],
  // Weapons
  'staff of homa': ['truong homa', 'homa', 'tran hu tao'],
  'engulfing lightning': ['doan thao', 'doan thao tram quang', 'tran raiden'],
  "crimson moon's semblance": ['xich nguyet liem', 'tran arlecchino'],
  'a thousand blazing suns': ['thien nhat thieu dot', 'tran mavuika'],
  'tome of the eternal flow': ['dong chay giam sat', 'tran neuvillette'],
  'splendor of tranquil waters': ['anh lua tu do', 'tran furina'],
  "nocturne's curtain call": ['chan nguy thien ngan', 'tran mizuki', 'da khuc ha man', 'nocturne'],
  azurelight: ['am vu skirk', 'thuong dieu', 'tran skirk'],
  'bloodsoaked ruins': ['khuc ca dem toi', 'tan tich nhuom mau'],
  'mistsplitter reforged': ['mistsplitter', 'anh sang dem suong mu', 'tran ayaka'],
  'aqua simulacra': ['aqua', 'nhuoc thuy', 'tran yelan'],
  'thundering pulse': ['sam set rung dong', 'tran yoimiya'],
  "hunter's path": ['con duong tho san', 'cung tho san', 'tran tighnari'],
  'beacon of the reed sea': ['hai dang bo bien lau', 'tran dehya'],
  'redhorn stonethresher': ['xich giac', 'xich giac pha thach dao', 'tran itto'],
  'the catch': ['lao xien ca'],
  'the widsith': ['chuong nhac lang thang', 'widsith'],
  'favonius sword': ['tay phong kiem'],
  'favonius lance': ['thuong tay phong'],
  'favonius warbow': ['cung tay phong'],
  'favonius codex': ['tay phong bi dien'],
  'favonius greatsword': ['dai kiem tay phong'],
  'sacrificial sword': ['kiem te le'],
  'sacrificial bow': ['cung te le'],
  'sacrificial fragments': ['manh chuong te le'],
  'sacrificial greatsword': ['dai kiem te le'],
};

function itemMatchesQuery(name: string, nameVi: string, qClean: string): boolean {
  if (!qClean) return true;
  const nClean = cleanStr(name);
  const viClean = cleanStr(nameVi);
  if (nClean.includes(qClean) || viClean.includes(qClean)) return true;

  const key = name.toLowerCase();
  const aliasList = ALIASES[key];
  if (aliasList && aliasList.some((al) => cleanStr(al).includes(qClean))) {
    return true;
  }
  return false;
}

interface GachaCardProps {
  name: string;
  nameVi: string;
  icon: string;
  rarity: 4 | 5;
  isStandard: boolean;
  isSelected: boolean;
  showStandardBadge: boolean;
  onSelect: (item: { name: string; nameVi: string }) => void;
}

const GachaItemCard = React.memo<GachaCardProps>(
  ({ name, nameVi, icon, rarity, isStandard, isSelected, showStandardBadge, onSelect }) => {
    return (
      <button
        type="button"
        onClick={() => onSelect({ name, nameVi })}
        className={`relative p-1.5 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer text-center group ${
          isSelected
            ? rarity === 4
              ? 'bg-purple-500/25 border-2 border-purple-400 shadow-[0_0_14px_rgba(168,85,247,0.4)] scale-105'
              : 'bg-amber-500/25 border-2 border-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.4)] scale-105'
            : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08]'
        }`}
      >
        <div
          className={`relative w-12 h-12 rounded-lg overflow-hidden bg-black/40 border shrink-0 ${
            rarity === 4 ? 'border-purple-400/40' : 'border-amber-400/30'
          }`}
        >
          <img
            src={icon}
            alt={nameVi || name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {showStandardBadge && isStandard && (
            <span className="absolute top-0 right-0 text-[8px] bg-rose-500/90 text-white font-extrabold px-1 rounded-bl-md">
              Lệch
            </span>
          )}
          {rarity === 4 && (
            <span className="absolute bottom-0 left-0 text-[8px] bg-purple-600/90 text-white font-black px-1 rounded-tr-md">
              4★
            </span>
          )}
        </div>
        <span className="text-[10px] font-medium text-slate-200 line-clamp-1 leading-tight w-full truncate">
          {nameVi || name}
        </span>
        {isSelected && (
          <div
            className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shadow-md ${
              rarity === 4 ? 'bg-purple-400 text-black' : 'bg-amber-400 text-black'
            }`}
          >
            ✓
          </div>
        )}
      </button>
    );
  }
);
GachaItemCard.displayName = 'GachaItemCard';

const AddWishDialog: React.FC<DialogProps> = ({ onClose, editingWish, defaultBanner }) => {
  const { addWishRecord, updateWishRecord, wishBannerStats, wishHistory } = useStore();

  const bannerType: WishBannerType = editingWish?.bannerType || defaultBanner || 'character';

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 150);

  const [rarityFilter, setRarityFilter] = useState<'all' | '5' | '4'>(() => {
    return editingWish && editingWish.rarity === 4 ? '4' : '5';
  });

  const [selectedItemName, setSelectedItemName] = useState<string>(() => {
    if (editingWish) return editingWish.nameVi || editingWish.name;
    if (bannerType === 'weapon') {
      return 'Đoạn Thảo Trường Đao';
    }
    if (bannerType === 'standard' || bannerType === 'chronicled') {
      return 'Jean';
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
    const currentP = wishBannerStats[bannerType]?.currentPity || 0;
    return currentP > 0 ? currentP : bannerType === 'weapon' ? 65 : 75;
  });

  const [autoResetPity, setAutoResetPity] = useState<boolean>(() => {
    return !editingWish;
  });

  const maxPity = bannerType === 'weapon' ? 80 : 90;

  // Base items per banner
  const baseItems = useMemo(() => {
    if (bannerType === 'character') {
      return GACHA_ALL_CHARACTERS.map((c) => ({
        ...c,
        itemType: 'character' as const,
        icon: c.avatarUrl,
      }));
    } else if (bannerType === 'weapon') {
      return GACHA_ALL_WEAPONS.map((w) => ({
        ...w,
        itemType: 'weapon' as const,
        icon: w.avatarUrl,
      }));
    } else if (bannerType === 'chronicled') {
      const chars = GACHA_ALL_CHARACTERS.map((c) => ({
        ...c,
        itemType: 'character' as const,
        icon: c.avatarUrl,
        isStandard: false,
      }));
      const weps = GACHA_ALL_WEAPONS.map((w) => ({
        ...w,
        itemType: 'weapon' as const,
        icon: w.avatarUrl,
        isStandard: false,
      }));
      return [...chars, ...weps];
    } else {
      // Standard Banner: prioritize standard characters & weapons
      const chars = GACHA_ALL_CHARACTERS.map((c) => ({
        ...c,
        itemType: 'character' as const,
        icon: c.avatarUrl,
      }));
      const weps = GACHA_ALL_WEAPONS.map((w) => ({
        ...w,
        itemType: 'weapon' as const,
        icon: w.avatarUrl,
      }));
      return [...chars, ...weps];
    }
  }, [bannerType]);

  // Filter items using debounced search and rarity filter
  const selectableItems = useMemo(() => {
    const qClean = cleanStr(debouncedSearch.trim());
    const isSearching = qClean.length > 0;

    return baseItems.filter((item) => {
      // Match search query first
      if (isSearching) {
        return itemMatchesQuery(item.name, item.nameVi, qClean);
      }

      // Banner type constraints when not searching
      if (bannerType === 'standard') {
        const isStdChar =
          item.itemType === 'character' &&
          (item.isStandard ||
            STANDARD_5STAR_CHARACTERS.some(
              (s) => cleanStr(s) === cleanStr(item.name) || cleanStr(s) === cleanStr(item.nameVi)
            ));
        const isStdWep =
          item.itemType === 'weapon' &&
          (item.isStandard ||
            STANDARD_5STAR_WEAPONS.some(
              (s) => cleanStr(s) === cleanStr(item.name) || cleanStr(s) === cleanStr(item.nameVi)
            ));
        if (!isStdChar && !isStdWep) return false;
      }

      // Rarity filter
      if (rarityFilter === '5') {
        return item.rarity === 5;
      }
      if (rarityFilter === '4') {
        return item.rarity === 4;
      }
      return true;
    });
  }, [baseItems, debouncedSearch, rarityFilter, bannerType]);

  // Selected item object (lookup in baseItems so it persists across search filters)
  const selectedItemObj = useMemo(() => {
    return (
      baseItems.find((i) => i.name === selectedItemName || i.nameVi === selectedItemName) ||
      selectableItems[0] ||
      baseItems[0]
    );
  }, [baseItems, selectedItemName, selectableItems]);

  const handleSelectItem = useCallback((item: { name: string; nameVi: string }) => {
    setSelectedItemName(item.nameVi || item.name);
    setIsCapturingRadiance(false);
  }, []);

  // Automatic determination of rate-up vs loss
  const isSelectedStandard = useMemo(() => {
    if (!selectedItemObj) return false;
    if (selectedItemObj.rarity === 4) return false;

    if (bannerType === 'character') {
      return (
        selectedItemObj.isStandard ||
        STANDARD_5STAR_CHARACTERS.some(
          (s) =>
            cleanStr(s) === cleanStr(selectedItemObj.name) ||
            cleanStr(s) === cleanStr(selectedItemObj.nameVi)
        )
      );
    }
    if (bannerType === 'weapon') {
      return (
        selectedItemObj.isStandard ||
        STANDARD_5STAR_WEAPONS.some(
          (s) =>
            cleanStr(s) === cleanStr(selectedItemObj.name) ||
            cleanStr(s) === cleanStr(selectedItemObj.nameVi)
        )
      );
    }
    return false;
  }, [selectedItemObj, bannerType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemObj) return;

    const itemRarity = (selectedItemObj.rarity || 5) as 4 | 5;

    // Determine rateUp status automatically
    let isRateUp = true;
    if (bannerType === 'character' || bannerType === 'weapon') {
      if (itemRarity === 5) {
        isRateUp = !isSelectedStandard || isCapturingRadiance;
      } else {
        isRateUp = true;
      }
    } else if (bannerType === 'chronicled') {
      isRateUp = chronicledRateUp;
    } else {
      isRateUp = true;
    }

    // Determine guarantee automatically based on previous 5★ in history
    const prevBannerRecord = wishHistory.find(
      (r) => r.bannerType === bannerType && r.rarity === 5 && r.id !== editingWish?.id
    );
    const wasGuaranteed = prevBannerRecord
      ? !prevBannerRecord.isRateUp
      : !!wishBannerStats[bannerType]?.isGuaranteed;

    const recordData: Omit<WishRecord, 'id'> = {
      name: selectedItemObj.name,
      nameVi: selectedItemObj.nameVi,
      icon: selectedItemObj.icon,
      itemType: selectedItemObj.itemType,
      rarity: itemRarity,
      bannerType,
      pity: Math.max(1, Math.min(maxPity, pity)),
      date: editingWish?.date || new Date().toISOString().split('T')[0],
      isRateUp,
      isCapturingRadiance:
        bannerType === 'character' && itemRarity === 5 ? isCapturingRadiance : false,
      isGuaranteed: itemRarity === 5 ? wasGuaranteed : false,
      notes: editingWish?.notes || '',
    };

    if (editingWish) {
      updateWishRecord(editingWish.id, recordData);
    } else {
      // Only reset 5★ pity if a 5★ was pulled and autoResetPity is enabled
      const shouldResetPity = itemRarity === 5 && autoResetPity;
      addWishRecord(recordData, shouldResetPity);
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
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  {editingWish ? 'Chỉnh Sửa Lần Nổ' : 'Thêm Lần Nổ Cầu Nguyện'}
                </h2>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300">
                  Banner {BANNER_NAMES[bannerType]}
                </span>
              </div>
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
          {/* 1. Chọn Vật Phẩm (Hỗ trợ Debounce và tìm kiếm không dấu/bí danh) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Chọn Vật Phẩm
                </label>
                {/* Rarity Filter Tabs */}
                <div className="flex items-center gap-1 p-0.5 bg-white/[0.04] border border-white/[0.08] rounded-lg">
                  <button
                    type="button"
                    onClick={() => setRarityFilter('5')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                      rarityFilter === '5'
                        ? 'bg-amber-500/25 text-amber-300 border border-amber-400/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    5★ Vàng
                  </button>
                  <button
                    type="button"
                    onClick={() => setRarityFilter('4')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                      rarityFilter === '4'
                        ? 'bg-purple-500/25 text-purple-300 border border-purple-400/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    4★ Tím
                  </button>
                  <button
                    type="button"
                    onClick={() => setRarityFilter('all')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                      rarityFilter === 'all'
                        ? 'bg-white/20 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tất Cả
                  </button>
                </div>
              </div>

              {/* Search Box with instant typing */}
              <div className="relative w-44 sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm tên, bí danh (Homa, Raiden...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1 text-xs bg-white/[0.06] border border-white/[0.1] rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                />
              </div>
            </div>

            {/* Selection Grid (Optimized with React.memo and lazy decoding) */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 min-h-[176px] max-h-48 overflow-y-auto p-1.5 rounded-2xl bg-black/25 border border-white/[0.06]">
              {selectableItems.length === 0 ? (
                <div className="col-span-full py-8 text-center text-xs text-slate-400 space-y-1">
                  <div>Không tìm thấy vật phẩm nào khớp với &quot;{debouncedSearch}&quot;</div>
                  <div className="text-[10px] text-slate-500">
                    Thử tìm bằng tiếng Anh, viết liền hoặc không dấu (vd: homa, hutao, doan thao...)
                  </div>
                </div>
              ) : (
                selectableItems.map((item) => {
                  const isSelected =
                    selectedItemObj &&
                    (selectedItemObj.name === item.name || selectedItemObj.nameVi === item.nameVi);
                  return (
                    <GachaItemCard
                      key={item.name}
                      name={item.name}
                      nameVi={item.nameVi}
                      icon={item.icon}
                      rarity={item.rarity}
                      isStandard={item.isStandard}
                      isSelected={isSelected}
                      showStandardBadge={bannerType !== 'standard'}
                      onSelect={handleSelectItem}
                    />
                  );
                })
              )}
            </div>

            {/* Selected item details summary chip */}
            {selectedItemObj && (
              <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[11px]">Đang chọn:</span>
                  <span
                    className={`font-bold ${
                      selectedItemObj.rarity === 4 ? 'text-purple-300' : 'text-amber-300'
                    }`}
                  >
                    {selectedItemObj.nameVi || selectedItemObj.name} ({selectedItemObj.rarity}★)
                  </span>
                  {selectedItemObj.name !== selectedItemObj.nameVi && (
                    <span className="text-[10px] text-slate-500">({selectedItemObj.name})</span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500">
                  {selectableItems.length} kết quả
                </span>
              </div>
            )}
          </div>

          {/* 2. Tự Động Xét Bảo Hiểm / Trúng Rate */}
          {selectedItemObj && selectedItemObj.rarity === 5 ? (
            <>
              {bannerType === 'character' && (
                <div className="p-3 rounded-2xl bg-black/25 border border-white/[0.08] flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Kết quả 5★:</span>
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
                  <span className="text-xs text-slate-400">Kết quả 5★:</span>
                  {isSelectedStandard ? (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Lệch (Vũ khí thường) → Tích 1 Điểm Định Chuẩn</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Trúng Vũ Khí Định Chuẩn</span>
                    </span>
                  )}
                </div>
              )}

              {bannerType === 'chronicled' && (
                <div className="p-3 rounded-2xl bg-black/25 border border-white/[0.08] flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-400">Định Chuẩn Sử Ký:</span>
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
                      ✓ Trúng Định Chuẩn
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
                      ✕ Lệch Định Chuẩn
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-purple-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Nổ Vật Phẩm 4★ (Tím)</span>
              </span>
              <span className="text-slate-400 text-[11px]">
                Nổ 4★ không làm đặt lại bộ đếm Pity 5★
              </span>
            </div>
          )}

          {/* 3. Số Roll Nổ (Pity) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {selectedItemObj?.rarity === 4 ? 'Số Roll Nhận 4★' : 'Số Roll Nổ 5★ (Pity)'}
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

          {/* 4. Tự Động Reset Pity */}
          {!editingWish && selectedItemObj?.rarity === 5 && (
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
              {editingWish ? 'Lưu Thay Đổi' : 'Xác Nhận Thêm'}
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
