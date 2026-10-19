import React, { useState } from 'react';
import { X, Search, Sparkles, User, Sword, Shield, FileText, Droplet } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CHARACTERS_DATA, WEAPONS_DATA, ELEMENT_COLORS } from '../data/genshinData';
import type { CharacterPreset, WeaponPreset } from '../types';
import { useDebounce } from '../hooks/useDebounce';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose }) => {
  const { addGoal } = useStore();

  const [activeTab, setActiveTab] = useState<'character' | 'weapon' | 'boss' | 'custom'>('character');

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 250);

  // Selected preset states
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterPreset | null>(null);
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponPreset | null>(null);

  // Form fields
  const [customTitle, setCustomTitle] = useState('');
  const [targetCount, setTargetCount] = useState<number>(10);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [resinCost, setResinCost] = useState<number>(20);
  const [notes, setNotes] = useState('');
  const [selectedDays] = useState<number[]>([1, 4, 0]);

  if (!isOpen) return null;

  // Filtered lists with debounce
  const filteredCharacters = CHARACTERS_DATA.filter((c) => {
    const q = debouncedSearch.toLowerCase().trim();
    return !q || c.name.toLowerCase().includes(q) || c.nameVi.toLowerCase().includes(q);
  });

  const filteredWeapons = WEAPONS_DATA.filter((w) => {
    const q = debouncedSearch.toLowerCase().trim();
    return !q || w.name.toLowerCase().includes(q) || w.nameVi.toLowerCase().includes(q);
  });

  const handleSelectCharacter = (char: CharacterPreset) => {
    setSelectedCharacter(char);
    setCustomTitle(`Bồi Dưỡng Thiên Phú - ${char.nameVi}`);
    setNotes(`Cần farm ${char.talentBook} tại ${char.talentDomain}`);
  };

  const handleSelectWeapon = (wep: WeaponPreset) => {
    setSelectedWeapon(wep);
    setCustomTitle(`Đột Phá Vũ Khí - ${wep.nameVi}`);
    setNotes(`Cần farm ${wep.ascensionMat} tại ${wep.domainName}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'character' && selectedCharacter) {
      addGoal({
        title: customTitle || `Bồi Dưỡng Thiên Phú - ${selectedCharacter.nameVi}`,
        category: 'character',
        targetName: selectedCharacter.nameVi,
        targetAvatar: selectedCharacter.avatarUrl,
        element: selectedCharacter.element,
        rarity: selectedCharacter.rarity,
        farmTarget: {
          materialName: selectedCharacter.talentBook,
          materialType: 'talent',
          domainName: selectedCharacter.talentDomain,
          daysOfWeek: selectedCharacter.talentDays,
          resinCost: 20,
          currentCount,
          targetCount,
        },
        notes,
      });
    } else if (activeTab === 'weapon' && selectedWeapon) {
      addGoal({
        title: customTitle || `Đột Phá Vũ Khí - ${selectedWeapon.nameVi}`,
        category: 'weapon',
        targetName: selectedWeapon.nameVi,
        targetAvatar: selectedWeapon.avatarUrl,
        rarity: selectedWeapon.rarity,
        farmTarget: {
          materialName: selectedWeapon.ascensionMat,
          materialType: 'weapon',
          domainName: selectedWeapon.domainName,
          daysOfWeek: selectedWeapon.daysOfWeek,
          resinCost: 20,
          currentCount,
          targetCount,
        },
        notes,
      });
    } else if (activeTab === 'boss') {
      addGoal({
        title: customTitle || 'Farm Boss Thế Giới',
        category: 'boss',
        farmTarget: {
          materialName: 'Nguyên liệu Đột phá Boss',
          materialType: 'boss',
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // Any day
          resinCost: resinCost || 40,
          currentCount,
          targetCount,
        },
        notes,
      });
    } else {
      // Custom task
      if (!customTitle.trim()) return;
      addGoal({
        title: customTitle,
        category: 'custom',
        farmTarget: {
          materialName: 'Ghi chú tự do',
          materialType: 'custom',
          daysOfWeek: selectedDays,
          resinCost,
        },
        notes,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0a0f1d]/85 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_16px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-400/20 text-amber-300 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Thêm Mục Tiêu Mới</h3>
              <p className="text-[11px] text-amber-300/80 font-medium">
                Tự động đặt vào Đỉnh Stack (Ưu tiên #1)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 px-6 pt-3 pb-2 border-b border-white/[0.08] bg-white/[0.01] text-xs font-semibold overflow-x-auto">

          <button
            onClick={() => {
              setActiveTab('character');
              setSearchTerm('');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeTab === 'character'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Nhân Vật</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('weapon');
              setSearchTerm('');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeTab === 'weapon'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sword className="w-4 h-4" />
            <span>Vũ Khí</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('boss');
              setCustomTitle('Farm Boss Đột Phá (40 Nhựa)');
              setResinCost(40);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeTab === 'boss'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Boss / TDV</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('custom');
              setCustomTitle('');
              setResinCost(0);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeTab === 'custom'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Tùy Chỉnh</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: CHARACTER */}
          {activeTab === 'character' && (
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Tìm nhân vật (Raiden, Furina, Neuvillette, Bennett...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Character Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
                {filteredCharacters.map((char) => {
                  const isSelected = selectedCharacter?.name === char.name;
                  const elColor = ELEMENT_COLORS[char.element];
                  return (
                    <div
                      key={char.name}
                      onClick={() => handleSelectCharacter(char)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/20 scale-[1.02]'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <img
                        src={char.avatarUrl}
                        alt={char.name}
                        className="w-9 h-9 rounded-lg object-cover bg-slate-800 border border-slate-700 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-200 truncate">
                          {char.nameVi}
                        </div>
                        <div className={`text-[10px] font-medium ${elColor.text} capitalize`}>
                          {char.element}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedCharacter && (
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2 mt-2">
                  <div className="text-xs font-semibold text-amber-300">
                    Thông tin Bí Cảnh Thiên Phú:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500">Sách: </span>
                      <span className="font-medium text-slate-200">{selectedCharacter.talentBook}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Bí cảnh: </span>
                      <span className="font-medium text-slate-200">{selectedCharacter.talentDomain}</span>
                    </div>
                    <div className="col-span-full">
                      <span className="text-slate-500">Ngày mở: </span>
                      <span className="text-indigo-400 font-medium">
                        {selectedCharacter.talentDays.map((d) => (d === 0 ? 'Chủ Nhật' : `Thứ ${d + 1}`)).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WEAPON */}
          {activeTab === 'weapon' && (
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Tìm vũ khí (Ánh Sáng Sương Mù, Đoạn Thảo, Tây Phong...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                {filteredWeapons.map((wep) => {
                  const isSelected = selectedWeapon?.name === wep.name;
                  return (
                    <div
                      key={wep.name}
                      onClick={() => handleSelectWeapon(wep)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/20'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <img
                        src={wep.avatarUrl}
                        alt={wep.name}
                        className="w-9 h-9 rounded-lg object-cover bg-slate-800 border border-slate-700 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-200 truncate">
                          {wep.nameVi}
                        </div>
                        <div className="text-[10px] text-amber-400 font-medium">
                          {'★'.repeat(wep.rarity)} • {wep.type}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: BOSS / ARTIFACTS */}
          {activeTab === 'boss' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => {
                    setCustomTitle('Farm Boss Thế Giới (40 Nhựa)');
                    setResinCost(40);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    resinCost === 40
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold text-xs mb-1">Boss Thế Giới (40 Nhựa)</div>
                  <div className="text-[11px] text-slate-400">Rớt mảnh đột phá nhân vật. Mở 24/7</div>
                </div>

                <div
                  onClick={() => {
                    setCustomTitle('Farm Thánh Di Vật (20 Nhựa)');
                    setResinCost(20);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    resinCost === 20
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold text-xs mb-1">Bí Cảnh Thánh Di Vật (20 Nhựa)</div>
                  <div className="text-[11px] text-slate-400">Farm bộ TDV 5 sao. Mở 24/7</div>
                </div>
              </div>
            </div>
          )}

          {/* Common Fields */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tên Mục Tiêu / Tiêu Đề
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Nhập tên việc cần làm..."
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Đã Có / Mục Tiêu Cần Farm
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={currentCount}
                    onChange={(e) => setCurrentCount(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-slate-100 text-center"
                    placeholder="Hiện có"
                  />
                  <span className="text-slate-500 text-xs">/</span>
                  <input
                    type="number"
                    min="1"
                    value={targetCount}
                    onChange={(e) => setTargetCount(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-slate-100 text-center font-bold text-amber-400"
                    placeholder="Mục tiêu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nhựa Tiêu Tốn / Lượt
                </label>
                <div className="flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-cyan-400 shrink-0" />
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={resinCost}
                    onChange={(e) => setResinCost(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-slate-100 font-bold"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Ghi Chú Thêm
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ghi chú chi tiết hoặc lưu ý khi farm..."
                rows={2}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              Đẩy Lên Đỉnh Stack (Ưu Tiên #1)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
