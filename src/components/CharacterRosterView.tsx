import React, { useState, useDeferredValue } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Layers, RotateCw, Check, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ELEMENT_NAMES_VI } from '../data/genshinData';
import { ElementIcon } from './ElementIcon';
import type { UserCharacter } from '../types';
import confetti from 'canvas-confetti';

export const CharacterRosterView: React.FC = () => {
  const navigate = useNavigate();
  const {
    characters,
    addCharacterToTimeline,
    fetchCharactersFromHoyo,
    characterFetchLoading,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const [addedCharName, setAddedCharName] = useState<string | null>(null);

  const deferredSearch = useDeferredValue(searchTerm);

  const filteredCharacters = characters.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      c.nameVi.toLowerCase().includes(deferredSearch.toLowerCase());
    const matchesElement = selectedElement === 'all' || c.element === selectedElement;
    return matchesSearch && matchesElement;
  });

  const handleAddCharacter = (char: UserCharacter) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    addCharacterToTimeline(char);
    setAddedCharName(char.nameVi || char.name);
    navigate('/timeline');
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto w-full">
      {/* ================= SEARCH & FILTER BAR (LIQUID GLASS) ================= */}
      <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">Danh Sách Nhân Vật</h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  {filteredCharacters.length}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Nhấn vào nút <span className="text-amber-300 font-semibold">Timeline</span> ở mỗi nhân vật để thêm vào kế hoạch cày cuốc
              </p>
            </div>
          </div>

          <button
            onClick={() => fetchCharactersFromHoyo()}
            disabled={characterFetchLoading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-cyan-400/40 text-xs font-semibold text-slate-200 transition-all active:scale-95 disabled:opacity-50 shadow-sm cursor-pointer"
            title="Đồng bộ danh sách nhân vật thực tế từ tài khoản HoYoLAB"
          >
            <RotateCw className={`w-4 h-4 text-cyan-400 ${characterFetchLoading ? 'animate-spin' : ''}`} />
            <span>{characterFetchLoading ? 'Đang đồng bộ...' : 'Đồng bộ HoYoLAB'}</span>
          </button>
        </div>

        {/* Search Input with Clear Button */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm kiếm nhân vật theo tên (Diluc, Furina, Raiden, Zhongli, Bennett...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.1] focus:border-amber-400/50 rounded-2xl pl-11 pr-10 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Xoá tìm kiếm"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Element Filter Pills (Vietnamese) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold scrollbar-none">
          {['all', 'pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo'].map((elem) => {
            const label = elem === 'all' ? 'Tất cả hệ' : `Hệ ${ELEMENT_NAMES_VI[elem as keyof typeof ELEMENT_NAMES_VI] || elem}`;
            const isSelected = selectedElement === elem;
            return (
              <button
                key={elem}
                onClick={() => setSelectedElement(elem)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all capitalize shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border border-transparent'
                }`}
              >
                {elem !== 'all' && (
                  <ElementIcon element={elem as any} className="w-4 h-4" />
                )}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= EXPANDED FULL-WIDTH CHARACTER GRID ================= */}
      <div className="liquid-glass rounded-3xl p-5 sm:p-6 min-h-[520px] transition-all duration-300">
        {filteredCharacters.length === 0 ? (
          <div className="py-20 text-center space-y-3 animate-card-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-slate-500">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-sm text-slate-400">Không tìm thấy nhân vật nào phù hợp với bộ lọc.</p>
          </div>
        ) : (
          <div
            key={`${selectedElement}-${deferredSearch.trim()}`}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3.5 sm:gap-4 animate-filter-grid"
          >
            {filteredCharacters.map((char, index) => {
              const isC6 = char.constellation === 6;

              return (
                <div
                  key={char.id}
                  style={{ animationDelay: `${Math.min(index * 12, 120)}ms` }}
                  className={`animate-card-pop group relative rounded-2xl p-2.5 transition-all duration-300 flex flex-col justify-between text-center hover:scale-[1.02] ${
                    isC6
                      ? 'bg-gradient-to-b from-amber-500/[0.09] to-purple-500/[0.05] border border-amber-400/35 hover:border-amber-300/60 shadow-[0_0_12px_rgba(245,158,11,0.12)] hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]'
                      : 'bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 hover:bg-white/[0.06] hover:shadow-[0_8px_24px_rgba(0,0,0,0.45)]'
                  }`}
                >
                  {/* Top: Avatar & Badges */}
                  <div className="w-full flex flex-col items-center">
                    <div
                      className={`w-full aspect-square rounded-2xl overflow-hidden mb-2.5 relative border ${
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

                      {/* Element Icon - Không để trong khung, to rõ */}
                      <div className="absolute top-1.5 right-1.5 z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] pointer-events-none">
                        <ElementIcon element={char.element} className="w-6 h-6 sm:w-7 sm:h-7" />
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

                    {/* 3 Separate Rows */}
                    <div className="w-full px-1 flex flex-col items-center gap-1 text-center">
                      {/* Hàng 1: Tên nhân vật (Cinzel font-genshin) */}
                      <div className="w-full text-xs sm:text-sm font-bold text-slate-100 truncate group-hover:text-amber-300 transition-colors font-genshin tracking-wide">
                        {char.nameVi}
                      </div>

                      {/* Hàng 2: Cấp độ (Inter) */}
                      <div className="flex items-center justify-center">
                        <span className="text-[10px] sm:text-[11px] font-bold text-amber-300/90 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/25 shadow-sm">
                          Lv.{char.level}
                        </span>
                      </div>

                      {/* Hàng 3: Số sao */}
                      <div className="flex items-center justify-center text-amber-400 text-xs sm:text-sm font-bold tracking-widest drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]">
                        {'★'.repeat(char.rarity)}
                      </div>
                    </div>
                  </div>

                  {/* Nút Thêm vào Timeline cho từng nhân vật */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddCharacter(char);
                    }}
                    className="w-full mt-3 py-1.5 px-2 rounded-xl bg-gradient-to-r from-amber-400/15 to-yellow-500/15 hover:from-amber-400 hover:to-yellow-500 text-amber-300 hover:text-slate-950 font-bold text-xs border border-amber-400/30 hover:border-amber-400 transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5 shadow-sm group/btn cursor-pointer"
                    title={`Thêm ${char.nameVi} vào Việc Cần Làm (Timeline)`}
                  >
                    <Plus className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition-transform duration-200" />
                    <span>Timeline</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Toast thông báo đã thêm vào Timeline */}
      {addedCharName && (
        <div className="fixed bottom-8 right-8 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-emerald-400/40 backdrop-blur-xl text-xs font-bold text-emerald-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Đã thêm {addedCharName} vào Việc Cần Làm!</span>
        </div>
      )}
    </div>
  );
};
