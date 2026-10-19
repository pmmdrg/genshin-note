import React, { useState } from 'react';
import { Search, Plus, Sparkles, Sword, Shield, BookOpen, Layers, RotateCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ELEMENT_COLORS, ELEMENT_NAMES_VI } from '../data/genshinData';
import { calculateLevelTo90Cost, calculateTalentCost } from '../utils/calculator';
import { isDomainOpenToday } from '../utils/priority';
import { ElementIcon } from './ElementIcon';
import confetti from 'canvas-confetti';

export const CharacterRosterView: React.FC = () => {
  const {
    characters,
    selectedCharacterId,
    setSelectedCharacterId,
    addCharacterToTimeline,
    fetchCharactersFromHoyo,
    characterFetchLoading,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const targetLevel = 90;
  const [isAddedToast, setIsAddedToast] = useState(false);


  const filteredCharacters = characters.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.nameVi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesElement = selectedElement === 'all' || c.element === selectedElement;
    return matchesSearch && matchesElement;
  });

  const selectedChar = characters.find((c) => c.id === selectedCharacterId) || characters[0];

  const levelCost = selectedChar
    ? calculateLevelTo90Cost(selectedChar.level, targetLevel)
    : { heroWit: 0, mora: 0, bossDrops: 0, localSpecialty: 0 };

  const talentCost = selectedChar
    ? calculateTalentCost(
        selectedChar.talents || { attack: 1, skill: 1, burst: 1 },
        { attack: 10, skill: 10, burst: 10 }
      )
    : { goldBooks: 0, weeklyBossMats: 0, crowns: 0, mora: 0 };

  const isOpenToday = selectedChar ? isDomainOpenToday(selectedChar.talentDays) : false;

  const handleAddToTimeline = () => {
    if (!selectedChar) return;
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    });
    addCharacterToTimeline(selectedChar);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* ================= LEFT PANEL: 4-COLUMN CHARACTER GRID (5 cols on lg) ================= */}
      <div className="lg:col-span-6 space-y-4">
        {/* Search & Filter Header */}
        <div className="liquid-glass rounded-3xl p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-300" />
              <span>Danh Sách Nhân Vật</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                {characters.length}
              </span>
            </h2>

            <button
              onClick={() => fetchCharactersFromHoyo()}
              disabled={characterFetchLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-xs font-semibold text-slate-200 transition-all active:scale-95 disabled:opacity-50"
              title="Đồng bộ danh sách nhân vật từ tài khoản HoYoLAB"
            >
              <RotateCw className={`w-3.5 h-3.5 text-cyan-400 ${characterFetchLoading ? 'animate-spin' : ''}`} />
              <span>{characterFetchLoading ? 'Đang tải...' : 'Đồng bộ HoYoLAB'}</span>
            </button>
          </div>

          {/* Search bar - perfectly vertically centered icon */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm nhân vật (Furina, Raiden, Bennett...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-amber-400/50 rounded-2xl pl-10 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
            />
          </div>

          {/* Element filter pills in Vietnamese */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-semibold">
            {['all', 'pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo'].map((elem) => {
              const label = elem === 'all' ? 'Tất cả' : (ELEMENT_NAMES_VI[elem as keyof typeof ELEMENT_NAMES_VI] || elem);
              return (
                <button
                  key={elem}
                  onClick={() => setSelectedElement(elem)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all capitalize shrink-0 ${
                    selectedElement === elem
                      ? 'bg-white/[0.15] text-white border border-white/20 shadow-md font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {elem !== 'all' && (
                    <ElementIcon element={elem as any} className="w-3.5 h-3.5" />
                  )}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-COLUMN CHARACTER GRID */}
        <div className="liquid-glass rounded-3xl p-4 max-h-[620px] overflow-y-auto">
          <div className="grid grid-cols-4 gap-2.5">
            {filteredCharacters.map((char) => {
              const isSelected = selectedChar?.id === char.id;
              const isC6 = char.constellation === 6;

              return (
                <div
                  key={char.id}
                  onClick={() => setSelectedCharacterId(char.id)}
                  className={`group relative rounded-2xl p-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center ${
                    isSelected
                      ? 'bg-amber-400/15 border-2 border-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.3)] scale-[1.03]'
                      : isC6
                      ? 'bg-gradient-to-b from-amber-500/[0.08] to-purple-500/[0.04] border border-amber-400/35 hover:border-amber-300/60 hover:bg-white/[0.06] shadow-[0_0_12px_rgba(245,158,11,0.12)]'
                      : 'bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06]'
                  }`}
                >
                  {/* Character Avatar Box */}
                  <div
                    className={`w-full aspect-square rounded-xl overflow-hidden mb-2 relative border ${
                      isC6
                        ? 'border-amber-400/60 ring-1 ring-amber-400/50 bg-gradient-to-b from-amber-500/15 to-purple-500/10 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                        : char.rarity === 5
                        ? 'border-amber-400/40 bg-gradient-to-b from-amber-500/10 to-transparent'
                        : 'border-purple-400/40 bg-gradient-to-b from-purple-500/10 to-transparent'
                    }`}
                  >
                    {/* Constellation Badge - Distinct for C6 */}
                    {isC6 ? (
                      <div className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-[9px] font-black text-white border border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.7)] flex items-center gap-0.5">
                        <span>✦ C6</span>
                      </div>
                    ) : (
                      <div className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-white/20 shadow-sm">
                        C{char.constellation}
                      </div>
                    )}

                    {/* Element Icon - Không để trong khung, biểu tượng nguyên tố tự nhiên */}
                    <div className="absolute top-1.5 right-1.5 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] pointer-events-none">
                      <ElementIcon element={char.element} className="w-4 h-4" />
                    </div>

                    <img
                      src={char.icon}
                      alt={char.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Character Name & Level */}
                  <div className="w-full px-0.5">
                    <div className="text-[11px] font-bold text-slate-200 truncate group-hover:text-amber-300 transition-colors">
                      {char.nameVi}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-[10px] mt-0.5">
                      <span className="font-mono font-semibold text-slate-400">Lv.{char.level}</span>
                      <span className="text-amber-400 text-[9px] font-bold">
                        {'★'.repeat(char.rarity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= RIGHT PANEL: CHARACTER DETAIL & RESOURCE CALCULATOR (7 cols on lg) ================= */}
      {selectedChar && (
        <div className="lg:col-span-6 space-y-4">
          <div className="liquid-glass rounded-3xl p-6 sm:p-7 relative overflow-hidden">
            {/* Ambient character element glow */}
            <div
              className={`absolute -right-24 -top-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none ${
                ELEMENT_COLORS[selectedChar.element].bg
              }`}
            />

            {/* Character Header: Avatar + Info + Add to Timeline Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl overflow-hidden shrink-0 border relative backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${
                    ELEMENT_COLORS[selectedChar.element].border
                  }`}
                >
                  <img
                    src={selectedChar.icon}
                    alt={selectedChar.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  {/* Name & Level inline horizontally (to hơn) */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-100 font-genshin tracking-wide drop-shadow-sm">
                      {selectedChar.nameVi}
                    </h3>
                    <span className="text-xs sm:text-sm font-mono font-black px-3 py-1 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm">
                      Lv.{selectedChar.level}
                    </span>
                  </div>

                  {/* Stars rating directly below name (to hơn) */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex text-amber-400 text-base sm:text-lg tracking-widest drop-shadow-[0_0_8px_rgba(251,191,36,0.65)]">
                      {'★'.repeat(selectedChar.rarity)}
                    </div>
                    <span className="text-xs text-amber-300/90 font-bold bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                      {selectedChar.rarity} Sao
                    </span>
                  </div>

                  {/* Element in Vietnamese (Không để trong khung), Constellation, and Fetter below stars */}
                  <div className="flex items-center gap-2.5 text-xs text-slate-400 mt-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 font-bold">
                      <ElementIcon element={selectedChar.element} className="w-4 h-4 drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]" />
                      <span className={ELEMENT_COLORS[selectedChar.element].text}>
                        Hệ {ELEMENT_NAMES_VI[selectedChar.element] || selectedChar.element}
                      </span>
                    </span>
                    <span>•</span>
                    {selectedChar.constellation === 6 ? (
                      <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-black text-xs shadow-[0_0_12px_rgba(245,158,11,0.5)] border border-amber-300/60 flex items-center gap-1">
                        <span>✦ Cung Mệnh 6 (Tối Đa)</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-white/[0.06] text-amber-300 font-semibold border border-white/[0.08]">
                        Cung Mệnh: C{selectedChar.constellation}
                      </span>
                    )}
                    <span>•</span>
                    <span className="text-slate-300 font-medium">
                      Độ Yêu Thích: Lv.{selectedChar.fetter}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Thêm vào Timeline */}
              <button
                onClick={handleAddToTimeline}
                className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shrink-0 border border-amber-300/30"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Thêm vào Timeline</span>
              </button>
            </div>

            {/* Equipment & Talents Status Grid - Tối ưu hiển thị hình ảnh vũ khí & thánh di vật */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
              {/* Equipped Weapon */}
              <div className="liquid-glass-subtle rounded-2xl p-4 flex items-center gap-3.5 border border-white/10 hover:border-amber-400/30 transition-all">
                <div className={`w-14 h-14 rounded-2xl overflow-hidden shrink-0 border relative flex items-center justify-center p-1 ${
                  (selectedChar.weapon?.rarity || 4) === 5
                    ? 'bg-gradient-to-b from-amber-500/25 via-amber-600/10 to-transparent border-amber-400/40 shadow-[0_0_14px_rgba(245,158,11,0.2)]'
                    : 'bg-gradient-to-b from-purple-500/25 via-purple-600/10 to-transparent border-purple-400/40 shadow-[0_0_14px_rgba(168,85,247,0.2)]'
                }`}>
                  {selectedChar.weapon?.icon ? (
                    <img
                      src={selectedChar.weapon.icon}
                      alt={selectedChar.weapon.name}
                      className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <Sword className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <span>Vũ khí trang bị</span>
                    <span className="text-amber-400 font-bold ml-1">
                      {'★'.repeat(selectedChar.weapon?.rarity || 4)}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-100 truncate mt-0.5">
                    {selectedChar.weapon?.name || 'Chưa trang bị'}
                  </div>
                  <div className="text-xs text-amber-300 font-mono flex items-center gap-2 mt-1">
                    <span className="bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20 font-bold">
                      Lv.{selectedChar.weapon?.level || 1}
                    </span>
                    <span className="bg-white/[0.04] px-2 py-0.5 rounded-md text-slate-300 border border-white/[0.08]">
                      Tinh luyện {selectedChar.weapon?.affixLevel || 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Equipped Relics */}
              <div className="liquid-glass-subtle rounded-2xl p-4 flex flex-col justify-between border border-white/10 hover:border-emerald-400/30 transition-all">
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-emerald-500/20 via-teal-600/10 to-transparent border border-emerald-400/40 flex items-center justify-center shrink-0 p-1 shadow-[0_0_14px_rgba(16,185,129,0.2)] overflow-hidden">
                    {selectedChar.relics?.[0]?.icon ? (
                      <img
                        src={selectedChar.relics[0].icon}
                        alt="relic"
                        className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <Shield className="w-6 h-6 text-emerald-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-slate-400 font-medium">Thánh di vật</div>
                    <div className="text-sm font-bold text-slate-100 truncate mt-0.5">
                      {selectedChar.relics?.[0]?.setName || 'Bộ Thánh Di Vật'}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>5 món đã trang bị (+20)</span>
                    </div>
                  </div>
                </div>

                {/* 5 Relic slots with icons, labels, levels */}
                {selectedChar.relics && selectedChar.relics.length > 0 && (
                  <div className="grid grid-cols-5 gap-1.5 pt-2.5 border-t border-white/[0.06]">
                    {selectedChar.relics.slice(0, 5).map((r, idx) => {
                      const shortSlot = ['Hoa', 'Lông', 'Cát', 'Ly', 'Nón'][idx] || r.posName;
                      return (
                        <div
                          key={idx}
                          className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-amber-400/40 rounded-xl p-1 text-center flex flex-col items-center transition-all group/relic"
                          title={`${r.name} (${r.posName}) - Cấp ${r.level}`}
                        >
                          <div className="w-7 h-7 relative flex items-center justify-center">
                            <img
                              src={r.icon}
                              alt={r.name}
                              className="w-full h-full object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] group-hover/relic:scale-110 transition-transform"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>
                          <span className="text-[8px] font-mono font-bold text-amber-300 mt-0.5">+{r.level}</span>
                          <span className="text-[7.5px] text-slate-400 truncate max-w-full leading-tight">{shortSlot}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Talent Levels */}
            <div className="liquid-glass-subtle rounded-2xl p-4 mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  Cấp Độ Thiên Phú Hiện Tại
                </span>
                <span className="text-[11px] text-indigo-300">Mục tiêu Max: 10 / 10 / 10</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-2 text-center">
                  <div className="text-[10px] text-slate-400">Đánh thường</div>
                  <div className="text-sm font-extrabold text-slate-100 font-mono mt-0.5">
                    Lv.{selectedChar.talents?.attack || 1}
                  </div>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-2 text-center">
                  <div className="text-[10px] text-slate-400">Kỹ năng (E)</div>
                  <div className="text-sm font-extrabold text-cyan-300 font-mono mt-0.5">
                    Lv.{selectedChar.talents?.skill || 1}
                  </div>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-2 text-center">
                  <div className="text-[10px] text-slate-400">Chiêu nộ (Q)</div>
                  <div className="text-sm font-extrabold text-amber-300 font-mono mt-0.5">
                    Lv.{selectedChar.talents?.burst || 1}
                  </div>
                </div>
              </div>
            </div>

            {/* RESOURCE CALCULATOR: MATERIALS NEEDED TO MAX */}
            <div className="space-y-3 pt-3 border-t border-white/[0.08]">
              <div className="flex items-center justify-between">
                <div className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tài Nguyên Cần Để Max Cấp {targetLevel} & Thiên Phú 10
                </div>
                {selectedChar.level < 90 && (
                  <span className="text-[11px] text-slate-400">
                    Từ Lv.{selectedChar.level} $\rightarrow$ Lv.{targetLevel}
                  </span>
                )}
              </div>

              {/* Resource Grid Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* EXP Books */}
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-2.5 text-center">
                  <div className="text-[10px] text-purple-300 font-medium">Sách EXP Tím</div>
                  <div className="text-base font-extrabold text-slate-100 font-mono mt-0.5">
                    {levelCost.heroWit} cuốn
                  </div>
                  <div className="text-[9px] text-slate-500">Kinh Nghiệm Anh Hùng</div>
                </div>

                {/* Mora */}
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-2.5 text-center">
                  <div className="text-[10px] text-amber-300 font-medium">Tổng Mora</div>
                  <div className="text-base font-extrabold text-slate-100 font-mono mt-0.5">
                    {((levelCost.mora + talentCost.mora) / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-[9px] text-slate-500">Cấp độ & Thiên phú</div>
                </div>

                {/* World Boss Drops */}
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-2.5 text-center">
                  <div className="text-[10px] text-cyan-300 font-medium">Mảnh Boss (40N)</div>
                  <div className="text-base font-extrabold text-slate-100 font-mono mt-0.5">
                    {levelCost.bossDrops} cái
                  </div>
                  <div className="text-[9px] text-slate-500 truncate" title={selectedChar.worldBossMat}>
                    {selectedChar.worldBossMat}
                  </div>
                </div>

                {/* Local Specialty */}
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-2.5 text-center">
                  <div className="text-[10px] text-emerald-300 font-medium">Đặc Sản Vùng</div>
                  <div className="text-base font-extrabold text-slate-100 font-mono mt-0.5">
                    {levelCost.localSpecialty} cây
                  </div>
                  <div className="text-[9px] text-slate-500 truncate" title={selectedChar.localSpecialty}>
                    {selectedChar.localSpecialty}
                  </div>
                </div>
              </div>

              {/* Talent Books & Weekly Boss Details */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="text-slate-300 font-bold flex items-center gap-1.5">
                    <span>Sách: {selectedChar.talentBook}</span>
                    {isOpenToday ? (
                      <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded-md font-semibold">
                        Mở hôm nay!
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">
                        ({selectedChar.talentDays.map((d) => (d === 0 ? 'CN' : `T${d + 1}`)).join(', ')})
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Boss tuần: {selectedChar.weeklyBossMat}
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono text-slate-200 shrink-0">
                  <span className="font-bold text-amber-300">{talentCost.goldBooks}</span> Sách Vàng •{' '}
                  <span className="font-bold text-indigo-300">{talentCost.weeklyBossMats}</span> Boss Tuần
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Added to Timeline Toast */}
      {isAddedToast && selectedChar && (
        <div className="fixed bottom-8 right-8 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-emerald-400/40 backdrop-blur-xl text-xs font-bold text-emerald-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-center gap-2">
          <span>✓ Đã thêm {selectedChar.nameVi} vào Việc Cần Làm!</span>
        </div>
      )}
    </div>
  );
};

