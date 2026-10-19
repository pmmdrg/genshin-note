import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, Sparkles, Check, Calendar } from 'lucide-react';
import type { WeaponPreset } from '../types';
import { WEAPONS_DATA } from '../data/genshinData';
import { isDomainOpenToday } from '../utils/priority';
import { useDebounce } from '../hooks/useDebounce';

interface WeaponSelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWeapon: (weapon: WeaponPreset) => void;
  currentWeaponName?: string;
  characterWeaponType?: 'sword' | 'claymore' | 'polearm' | 'bow' | 'catalyst';
  characterName?: string;
}

const WEAPON_TYPE_LABELS: Record<string, string> = {
  sword: 'Kiếm Đơn',
  claymore: 'Trọng Kiếm',
  polearm: 'Cán Dài',
  bow: 'Cung',
  catalyst: 'Pháp Khí',
};

export const WeaponSelectionDrawer: React.FC<WeaponSelectionDrawerProps> = ({
  isOpen,
  onClose,
  onSelectWeapon,
  currentWeaponName,
  characterWeaponType,
  characterName,
}) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 250);
  const [selectedType, setSelectedType] = useState<string>(characterWeaponType || 'all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setSelectedType(characterWeaponType || 'all');
      setSearch('');
      setSelectedRarity('all');
    }
  }

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter weapons
  const filteredWeapons = WEAPONS_DATA.filter((weapon) => {
    // Type match
    if (selectedType !== 'all' && weapon.type !== selectedType) {
      return false;
    }

    // Rarity match
    if (selectedRarity !== 'all' && weapon.rarity.toString() !== selectedRarity) {
      return false;
    }

    // Search query match
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase().trim();
      const matchVi = weapon.nameVi.toLowerCase().includes(q);
      const matchEn = weapon.name.toLowerCase().includes(q);
      const matchMat = weapon.ascensionMat.toLowerCase().includes(q);
      const matchDomain = weapon.domainName.toLowerCase().includes(q);
      if (!matchVi && !matchEn && !matchMat && !matchDomain) {
        return false;
      }
    }

    return true;
  });

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[99999] transition-all duration-300 ${
        isOpen ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0'
      }`}
    >
      {/* Backdrop overlay with fade */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Slide-in Drawer from Right */}
      <aside
        className={`fixed inset-y-0 right-0 top-0 bottom-0 h-screen h-[100dvh] w-full sm:w-[480px] md:w-[540px] max-w-[100vw] bg-slate-900/98 border-l border-white/10 backdrop-blur-2xl shadow-[-20px_0_50px_rgba(0,0,0,0.85)] flex flex-col z-[100000] transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-yellow-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-slate-100 font-genshin tracking-wide flex items-center gap-2">
                <span>Chọn Vũ Khí</span>
                {characterWeaponType && (
                  <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    {WEAPON_TYPE_LABELS[characterWeaponType] || characterWeaponType}
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400 truncate">
                {characterName ? `Trang bị phù hợp cho ${characterName}` : 'Chọn vũ khí từ kho dữ liệu'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] transition-colors cursor-pointer"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 space-y-3 shrink-0 border-b border-white/[0.06] bg-slate-900/60">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên vũ khí, nguyên liệu, bí cảnh..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-amber-400/60 focus:bg-white/[0.08] focus:outline-none text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 transition-all font-sans"
              autoFocus={isOpen}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Weapon Type Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1 rounded-lg font-bold shrink-0 transition-all cursor-pointer ${
                selectedType === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
              }`}
            >
              Tất cả
            </button>
            {Object.entries(WEAPON_TYPE_LABELS).map(([key, label]) => {
              const isSelected = selectedType === key;
              const isCharType = characterWeaponType === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                      : isCharType
                      ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 hover:bg-amber-400/25'
                      : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
                  }`}
                >
                  <span>{label}</span>
                  {isCharType && <span className="text-[10px] opacity-75">★</span>}
                </button>
              );
            })}
          </div>

          {/* Rarity Filter Pills */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[11px] text-slate-400 font-medium">Độ hiếm:</span>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: '5', label: '5★ Vàng', color: 'text-amber-400' },
                { id: '4', label: '4★ Tím', color: 'text-purple-400' },
                { id: '3', label: '3★ Lam', color: 'text-sky-400' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRarity(r.id)}
                  className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition-all cursor-pointer border ${
                    selectedRarity === r.id
                      ? 'bg-white/15 border-white/30 text-white shadow-sm'
                      : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span className={r.color}>{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Weapons List with Grid Animation */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {filteredWeapons.length === 0 ? (
            <div className="py-16 text-center text-slate-500 flex flex-col items-center justify-center">
              <Search className="w-10 h-10 mb-2 opacity-30 stroke-[1.5]" />
              <p className="text-sm font-semibold">Không tìm thấy vũ khí nào phù hợp</p>
              <p className="text-xs text-slate-600 mt-1">Thử đổi từ khóa hoặc bộ lọc loại vũ khí</p>
            </div>
          ) : (
            <div
              key={`${selectedType}-${selectedRarity}-${debouncedSearch.trim()}`}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-filter-grid"
            >
              {filteredWeapons.map((weapon, idx) => {
                const isSelected =
                  currentWeaponName &&
                  (currentWeaponName.toLowerCase() === weapon.nameVi.toLowerCase() ||
                    currentWeaponName.toLowerCase() === weapon.name.toLowerCase());
                const isOpenToday = isDomainOpenToday(weapon.daysOfWeek);

                const rarityStyle =
                  weapon.rarity === 5
                    ? {
                        border: 'border-amber-400/40 hover:border-amber-300',
                        bg: 'bg-gradient-to-br from-amber-500/[0.08] to-purple-500/[0.04]',
                        starColor: 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]',
                        avatarBg: 'bg-gradient-to-b from-amber-500/20 to-transparent border-amber-400/40',
                      }
                    : weapon.rarity === 4
                    ? {
                        border: 'border-purple-400/35 hover:border-purple-300',
                        bg: 'bg-gradient-to-br from-purple-500/[0.08] to-blue-500/[0.04]',
                        starColor: 'text-purple-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]',
                        avatarBg: 'bg-gradient-to-b from-purple-500/20 to-transparent border-purple-400/40',
                      }
                    : {
                        border: 'border-sky-400/30 hover:border-sky-300',
                        bg: 'bg-gradient-to-br from-sky-500/[0.06] to-transparent',
                        starColor: 'text-sky-300',
                        avatarBg: 'bg-gradient-to-b from-sky-500/20 to-transparent border-sky-400/30',
                      };

                return (
                  <button
                    key={weapon.name}
                    onClick={() => {
                      onSelectWeapon(weapon);
                      onClose();
                    }}
                    style={{ animationDelay: `${Math.min(idx * 15, 150)}ms` }}
                    className={`animate-card-pop relative p-3 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 group/item cursor-pointer hover:scale-[1.02] shadow-sm hover:shadow-xl ${
                      isSelected
                        ? 'border-emerald-400/70 bg-emerald-950/25 ring-1 ring-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : `${rarityStyle.bg} ${rarityStyle.border} hover:bg-white/[0.07]`
                    }`}
                  >
                    {/* Top Row: Avatar + Info */}
                    <div className="flex items-start gap-3 w-full">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border relative flex items-center justify-center ${rarityStyle.avatarBg}`}
                      >
                        <img
                          src={weapon.avatarUrl}
                          alt={weapon.nameVi}
                          className="w-full h-full object-contain p-1 group-hover/item:scale-110 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        {/* Selected check badge */}
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-bold text-slate-100 truncate group-hover/item:text-amber-300 transition-colors">
                          {weapon.nameVi}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate font-sans">
                          {weapon.name}
                        </div>

                        {/* Stars & Type */}
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`text-[11px] font-black tracking-widest ${rarityStyle.starColor}`}>
                            {'★'.repeat(weapon.rarity)}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            • {WEAPON_TYPE_LABELS[weapon.type] || weapon.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Material & Schedule Tag */}
                    <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] w-full">
                      <div className="flex items-center gap-1.5 min-w-0 text-slate-400">
                        {weapon.ascensionMatIcon && (
                          <img
                            src={weapon.ascensionMatIcon}
                            alt=""
                            className="w-4 h-4 rounded object-contain shrink-0"
                          />
                        )}
                        <span className="truncate">{weapon.ascensionMat}</span>
                      </div>

                      <div className="shrink-0 flex items-center gap-1 pl-1 font-sans">
                        <Calendar className="w-3 h-3 text-amber-400/80" />
                        {isOpenToday ? (
                          <span className="text-emerald-300 font-bold text-[10px]">Hôm nay mở!</span>
                        ) : (
                          <span className="text-slate-500 text-[10px]">
                            {weapon.daysOfWeek.map((d) => (d === 0 ? 'CN' : `T${d + 1}`)).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </aside>
    </div>,
    document.body
  );
};
