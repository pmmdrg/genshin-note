import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Check,
  Trash2,
  Sparkles,
  TrendingUp,
  Sword,
  BookOpen,
  Shield,
  Droplet,
} from 'lucide-react';

import confetti from 'canvas-confetti';
import type { CharacterBranchTree } from '../types';
import { useStore } from '../store/useStore';
import { ELEMENT_COLORS, ELEMENT_NAMES_VI } from '../data/genshinData';
import { isDomainOpenToday } from '../utils/priority';
import { ElementIcon } from './ElementIcon';

interface CharacterTreeCardProps {
  tree: CharacterBranchTree;
  index: number;
}

export const CharacterTreeCard: React.FC<CharacterTreeCardProps> = ({ tree, index }) => {
  const { toggleBranchComplete, toggleCompleteCharacterTree, deleteCharacterTree } = useStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tree.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isTopPriority = index === 0;
  const isTalentOpenToday = isDomainOpenToday(tree.talentBranch.daysOfWeek);
  const isWeaponOpenToday = isDomainOpenToday(tree.weaponBranch.daysOfWeek);
  const elColor = ELEMENT_COLORS[tree.element];

  const handleFinishAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6'],
    });
    toggleCompleteCharacterTree(tree.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group rounded-3xl transition-all duration-300 ${
        isDragging ? 'opacity-50 z-50 scale-102 shadow-2xl' : ''
      } ${
        isTopPriority
          ? 'bg-gradient-to-r from-amber-500/[0.08] via-slate-900/60 to-slate-900/60 border border-amber-400/40 shadow-[0_8px_32px_rgba(245,158,11,0.15),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl'
          : 'liquid-glass liquid-glass-interactive'
      }`}
    >
      {/* Top Priority Badge */}
      {isTopPriority && (
        <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-[0_2px_12px_rgba(245,158,11,0.4)]">
          <Sparkles className="w-3 h-3 fill-current" />
          Ưu Tiên #1 (Đỉnh Stack)
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* Character Header: Drag Handle, Avatar, Name, Priority, Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Drag Handle */}
            <button
              {...attributes}
              {...listeners}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.06] cursor-grab active:cursor-grabbing transition-colors"
              title="Kéo thả để đổi thứ tự ưu tiên nhân vật"
            >
              <GripVertical className="w-4 h-4" />
            </button>

            {/* Rank badge */}
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 border ${
                isTopPriority
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                  : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
              }`}
            >
              #{index + 1}
            </div>

            {/* Avatar */}
            <div
              className={`w-12 h-12 rounded-2xl overflow-hidden shrink-0 border relative backdrop-blur-md ${elColor.border} ${elColor.bg}`}
            >
              <div className="absolute top-1 right-1 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                <ElementIcon element={tree.element} className="w-3.5 h-3.5" />
              </div>
              <img src={tree.avatarUrl} alt={tree.characterName} className="w-full h-full object-cover" />
            </div>

            {/* Name & Target summary */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100 truncate tracking-tight">
                  {tree.characterName}
                </h3>
                <span className="text-xs text-amber-400 font-bold">
                  {'★'.repeat(tree.rarity)}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className={`font-semibold ${elColor.text} flex items-center gap-1`}>
                  <ElementIcon element={tree.element} className="w-3 h-3" />
                  <span>Hệ {ELEMENT_NAMES_VI[tree.element] || tree.element}</span>
                </span>
                <span>•</span>
                <span>Mục tiêu: Max Cấp 90 & Thiên Phú</span>
              </div>
            </div>
          </div>

          {/* Quick Finish / Delete */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => deleteCharacterTree(tree.id)}
              className="p-2 rounded-2xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Xóa khỏi Timeline"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleFinishAll}
              className="px-3.5 py-1.5 rounded-2xl bg-white/[0.05] hover:bg-emerald-500/80 border border-white/[0.1] hover:border-emerald-400 text-slate-300 hover:text-slate-950 font-bold text-xs transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
              title="Đánh dấu toàn bộ hoàn thành"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5] text-emerald-400" />
              <span>Xong</span>
            </button>
          </div>
        </div>

        {/* ================= 4 BRANCHES (VẼ CÁC NHÁNH TỪ NHÂN VẬT) ================= */}
        <div className="mt-4 space-y-3 relative pl-6 sm:pl-8">
          {/* Vertical connecting line from character to branches */}
          <div className="absolute left-2.5 sm:left-3.5 top-2 bottom-4 w-0.5 bg-gradient-to-b from-amber-400/50 via-cyan-400/30 to-indigo-500/20" />

          {/* 🌿 NHÁNH 1: CẤP ĐỘ (LEVEL 1-90) */}
          <div className="relative group/branch">
            {/* Branch elbow line */}
            <div className="absolute -left-3.5 sm:-left-4.5 top-4 w-3.5 sm:w-4.5 h-0.5 bg-amber-400/40" />

            <div
              className={`rounded-2xl p-3 sm:p-3.5 transition-all border ${
                tree.levelBranch.isCompleted
                  ? 'bg-emerald-500/[0.04] border-emerald-500/20 opacity-70'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">
                        Nhánh Cấp Độ: Lv.{tree.levelBranch.currentLevel} $\rightarrow$ Lv.90
                      </span>
                      {tree.levelBranch.isCompleted && (
                        <span className="text-[10px] text-emerald-400 font-bold">✓ Đã Max</span>
                      )}
                    </div>
                    {/* Materials needed */}
                    {!tree.levelBranch.isCompleted && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-purple-300 font-mono">
                          {tree.levelBranch.heroWitNeeded} Sách Tím
                        </span>
                        <span>•</span>
                        <span className="text-amber-300 font-mono">
                          {(tree.levelBranch.moraNeeded / 1000).toFixed(0)}k Mora
                        </span>
                        <span>•</span>
                        <span className="text-cyan-300">
                          {tree.levelBranch.bossDropNeeded} {tree.levelBranch.worldBossMat} (40 Nhựa)
                        </span>
                        <span>•</span>
                        <span className="text-emerald-300">
                          {tree.levelBranch.specialtyNeeded} {tree.levelBranch.localSpecialty}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => toggleBranchComplete(tree.id, 'levelBranch')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all border shrink-0 ${
                    tree.levelBranch.isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-slate-200'
                  }`}
                >
                  {tree.levelBranch.isCompleted ? 'Đã xong' : 'Tick xong'}
                </button>
              </div>
            </div>
          </div>

          {/* 🌿 NHÁNH 2: VŨ KHÍ (WEAPON) */}
          <div className="relative group/branch">
            <div className="absolute -left-3.5 sm:-left-4.5 top-4 w-3.5 sm:w-4.5 h-0.5 bg-cyan-400/40" />

            <div
              className={`rounded-2xl p-3 sm:p-3.5 transition-all border ${
                tree.weaponBranch.isCompleted
                  ? 'bg-emerald-500/[0.04] border-emerald-500/20 opacity-70'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0">
                    <Sword className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">
                        Nhánh Vũ Khí: {tree.weaponBranch.weaponName} (Lv.{tree.weaponBranch.currentLevel} $\rightarrow$ 90)
                      </span>
                      {tree.weaponBranch.isCompleted && (
                        <span className="text-[10px] text-emerald-400 font-bold">✓ Đã Max</span>
                      )}
                    </div>
                    {!tree.weaponBranch.isCompleted && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-cyan-300">
                          {tree.weaponBranch.materialName}
                        </span>
                        {isWeaponOpenToday ? (
                          <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-1.5 py-0.2 rounded-md font-semibold">
                            Bí cảnh mở hôm nay!
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500">
                            (Mở {tree.weaponBranch.daysOfWeek.map((d) => (d === 0 ? 'CN' : `T${d + 1}`)).join(', ')})
                          </span>
                        )}
                        <span className="text-slate-500 flex items-center gap-1">
                          <Droplet className="w-3 h-3 text-cyan-400" /> 20 Nhựa/lần
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => toggleBranchComplete(tree.id, 'weaponBranch')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all border shrink-0 ${
                    tree.weaponBranch.isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-slate-200'
                  }`}
                >
                  {tree.weaponBranch.isCompleted ? 'Đã xong' : 'Tick xong'}
                </button>
              </div>
            </div>
          </div>

          {/* 🌿 NHÁNH 3: THIÊN PHÚ (TALENTS) */}
          <div className="relative group/branch">
            <div className="absolute -left-3.5 sm:-left-4.5 top-4 w-3.5 sm:w-4.5 h-0.5 bg-indigo-400/40" />

            <div
              className={`rounded-2xl p-3 sm:p-3.5 transition-all border ${
                tree.talentBranch.isCompleted
                  ? 'bg-emerald-500/[0.04] border-emerald-500/20 opacity-70'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">
                        Nhánh Thiên Phú: Sách {tree.talentBranch.talentBookName} (Cần Max 10/10/10)
                      </span>
                      {tree.talentBranch.isCompleted && (
                        <span className="text-[10px] text-emerald-400 font-bold">✓ Đã Max</span>
                      )}
                    </div>
                    {!tree.talentBranch.isCompleted && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-amber-300 font-mono">
                          {tree.talentBranch.booksGoldNeeded} Sách Vàng
                        </span>
                        <span>•</span>
                        <span className="text-indigo-300">
                          {tree.talentBranch.weeklyBossMatsNeeded} {tree.talentBranch.weeklyBossMatName}
                        </span>
                        <span>•</span>
                        <span className="text-yellow-300">
                          {tree.talentBranch.crownsNeeded} Vương Miện
                        </span>
                        {isTalentOpenToday ? (
                          <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-1.5 py-0.2 rounded-md font-semibold">
                            Bí cảnh mở hôm nay!
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500">
                            (Mở {tree.talentBranch.daysOfWeek.map((d) => (d === 0 ? 'CN' : `T${d + 1}`)).join(', ')})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => toggleBranchComplete(tree.id, 'talentBranch')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all border shrink-0 ${
                    tree.talentBranch.isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-slate-200'
                  }`}
                >
                  {tree.talentBranch.isCompleted ? 'Đã xong' : 'Tick xong'}
                </button>
              </div>
            </div>
          </div>

          {/* 🌿 NHÁNH 4: THÁNH DI VẬT (ARTIFACTS) */}
          <div className="relative group/branch">
            <div className="absolute -left-3.5 sm:-left-4.5 top-4 w-3.5 sm:w-4.5 h-0.5 bg-emerald-400/40" />

            <div
              className={`rounded-2xl p-3 sm:p-3.5 transition-all border ${
                tree.artifactBranch.isCompleted
                  ? 'bg-emerald-500/[0.04] border-emerald-500/20 opacity-70'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">
                        Nhánh Thánh Di Vật: {tree.artifactBranch.setName}
                      </span>
                      {tree.artifactBranch.isCompleted && (
                        <span className="text-[10px] text-emerald-400 font-bold">✓ Đã Xong</span>
                      )}
                    </div>
                    {!tree.artifactBranch.isCompleted && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-emerald-300">
                          Bộ 4 món đề xuất: {tree.artifactBranch.recommendPieces.join(' • ')}
                        </span>
                        <span>•</span>
                        <span className="text-slate-500">20 Nhựa/lần (Mở 24/7)</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => toggleBranchComplete(tree.id, 'artifactBranch')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all border shrink-0 ${
                    tree.artifactBranch.isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-slate-200'
                  }`}
                >
                  {tree.artifactBranch.isCompleted ? 'Đã xong' : 'Tick xong'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
