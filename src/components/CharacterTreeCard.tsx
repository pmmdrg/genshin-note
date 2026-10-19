import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Check,
  Trash2,
  TrendingUp,
  Sword,
  BookOpen,
  Shield,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle2,
  Circle,
  Calendar,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CharacterBranchTree } from '../types';
import { DEFAULT_ARTIFACT_PIECES } from '../types';
import { useStore } from '../store/useStore';
import { isDomainOpenToday } from '../utils/priority';
import { ElementIcon } from './ElementIcon';
import { getMaterialIconUrl, BASE_MATERIAL_ICONS } from '../utils/materialIcons';

interface CharacterTreeCardProps {
  tree: CharacterBranchTree;
  index: number;
}

type ActiveBranchType = 'level' | 'weapon' | 'talent' | 'artifact' | null;

const DAY_NAMES = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export const CharacterTreeCard: React.FC<CharacterTreeCardProps> = ({ tree, index }) => {
  const {
    toggleBranchComplete,
    toggleCompleteCharacterTree,
    deleteCharacterTree,
    updateTreeLevel,
    updateTreeWeaponLevel,
    updateTreeTalentLevel,
    updateTreeArtifactPiece,
  } = useStore();

  const [activeBranch, setActiveBranch] = useState<ActiveBranchType>('level');

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

  const isC6 = (tree.constellation ?? 0) >= 6;
  const currentCharLevel = tree.level ?? tree.levelBranch.currentLevel;

  // Safe artifact pieces fallback (with updated Lông Vũ Tử Vong name)
  const artifactPieces =
    tree.artifactBranch.pieces && tree.artifactBranch.pieces.length === 5
      ? tree.artifactBranch.pieces
      : DEFAULT_ARTIFACT_PIECES;

  const optimizedArtifactCount = artifactPieces.filter((p) => p.isOptimized).length;

  // Weapon cost calculation
  const calculateWeaponCost = (lvl: number) => {
    const cur = Math.max(1, Math.min(90, lvl));
    if (cur >= 90) return { mats: 0, mora: 0 };
    if (cur >= 80) return { mats: 6, mora: 225000 };
    if (cur >= 70) return { mats: 12, mora: 450000 };
    if (cur >= 60) return { mats: 16, mora: 600000 };
    if (cur >= 50) return { mats: 20, mora: 750000 };
    return { mats: 24, mora: 900000 };
  };

  const weaponCost = calculateWeaponCost(tree.weaponBranch.currentLevel);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative rounded-3xl transition-all duration-300 ${
        isDragging ? 'opacity-50 z-50 scale-102 shadow-2xl' : ''
      } ${
        isTopPriority
          ? 'bg-gradient-to-r from-amber-500/[0.08] via-slate-900/60 to-slate-900/60 border border-amber-400/40 shadow-[0_8px_32px_rgba(245,158,11,0.15),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl'
          : 'liquid-glass liquid-glass-interactive'
      }`}
    >
      <div className="p-4 sm:p-5">
        {/* Main Horizontal Tree Layout: Branches extend to the RIGHT with items-start to prevent vertical distortion */}
        <div className="flex items-start gap-3 sm:gap-4 overflow-x-auto pb-2 custom-scrollbar">
          {/* ========================================================= */}
          {/* 1. CHARACTER CARD NODE (Locked fixed dimensions)          */}
          {/* ========================================================= */}
          <div className="w-[140px] sm:w-[150px] min-w-[140px] max-w-[150px] shrink-0 flex flex-col p-3 rounded-2xl bg-slate-900/50 border border-white/[0.08] backdrop-blur-xl relative group/card self-start">
            {/* Top Quick Actions: Drag Handle, Delete & Complete */}
            <div className="flex items-center justify-between mb-2">
              <button
                {...attributes}
                {...listeners}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.06] cursor-grab active:cursor-grabbing transition-colors"
                title="Kéo thả đổi thứ tự ưu tiên"
              >
                <GripVertical className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleFinishAll}
                  className="p-1 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/15 transition-colors"
                  title="Đánh dấu hoàn thành toàn bộ"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteCharacterTree(tree.id)}
                  className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/15 transition-colors"
                  title="Xóa khỏi Timeline"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Avatar Box (Identical to Roster Card) */}
            <div
              className={`w-full aspect-square rounded-2xl overflow-hidden mb-2 relative border ${
                isC6
                  ? 'border-amber-400/60 ring-1 ring-amber-400/50 bg-gradient-to-b from-amber-500/15 to-purple-500/10 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                  : tree.rarity === 5
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
                  C{tree.constellation ?? 0}
                </div>
              )}

              {/* Element Icon - Không để trong khung, to rõ */}
              <div className="absolute top-1.5 right-1.5 z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] pointer-events-none">
                <ElementIcon element={tree.element} className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <img
                src={tree.avatarUrl}
                alt={tree.characterName}
                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* 3 Separate Rows (Identical to Roster Card) */}
            <div className="w-full px-0.5 flex flex-col items-center gap-1 text-center">
              {/* Hàng 1: Tên nhân vật (Cinzel font-genshin) */}
              <div className="w-full text-xs sm:text-sm font-bold text-slate-100 truncate group-hover/card:text-amber-300 transition-colors font-genshin tracking-wide">
                {tree.characterName}
              </div>

              {/* Hàng 2: Cấp độ (Inter) */}
              <div className="flex items-center justify-center">
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-300/90 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/25 shadow-sm font-sans">
                  Lv.{currentCharLevel}
                </span>
              </div>

              {/* Hàng 3: Số sao */}
              <div className="flex items-center justify-center text-amber-400 text-xs sm:text-sm font-bold tracking-widest drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]">
                {'★'.repeat(tree.rarity)}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CONNECTOR LINE & ARROW (Branching out to the right)       */}
          {/* ========================================================= */}
          <div className="flex items-center justify-center shrink-0 text-amber-400/40 pt-16">
            <div className="w-3 sm:w-5 h-0.5 bg-gradient-to-r from-amber-400/60 to-amber-400/20" />
            <ChevronRight className="w-4 h-4 -ml-1.5 text-amber-400/60" />
          </div>

          {/* ========================================================= */}
          {/* 2. THE 4 MAIN BRANCH SELECTORS                            */}
          {/* ========================================================= */}
          <div className="flex flex-col gap-2.5 w-[180px] sm:w-[195px] shrink-0 self-start">
            {/* Branch 1: Cấp độ (Level) */}
            <button
              onClick={() => setActiveBranch(activeBranch === 'level' ? null : 'level')}
              className={`w-full p-2.5 rounded-2xl text-left border transition-all flex items-center justify-between group/branch cursor-pointer ${
                activeBranch === 'level'
                  ? 'bg-amber-400/15 border-amber-400/60 shadow-[0_0_16px_rgba(245,158,11,0.25)] text-amber-200'
                  : tree.levelBranch.isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15'
                  : 'bg-white/[0.03] border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                    tree.levelBranch.isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-400/15 text-amber-300 border-amber-400/30'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Nhánh Cấp Độ</div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    Lv.{currentCharLevel} → 90
                  </div>
                </div>
              </div>
              <div className="shrink-0 ml-1.5">
                {tree.levelBranch.isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 group-hover/branch:text-amber-400/70" />
                )}
              </div>
            </button>

            {/* Branch 2: Vũ Khí (Weapon) - Không để tên vũ khí */}
            <button
              onClick={() => setActiveBranch(activeBranch === 'weapon' ? null : 'weapon')}
              className={`w-full p-2.5 rounded-2xl text-left border transition-all flex items-center justify-between group/branch cursor-pointer ${
                activeBranch === 'weapon'
                  ? 'bg-amber-400/15 border-amber-400/60 shadow-[0_0_16px_rgba(245,158,11,0.25)] text-amber-200'
                  : tree.weaponBranch.isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15'
                  : 'bg-white/[0.03] border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                    tree.weaponBranch.isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-sky-400/15 text-sky-300 border-sky-400/30'
                  }`}
                >
                  <Sword className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Nhánh Vũ Khí</div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    Lv.{tree.weaponBranch.currentLevel} → 90
                  </div>
                </div>
              </div>
              <div className="shrink-0 ml-1.5">
                {tree.weaponBranch.isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 group-hover/branch:text-sky-400/70" />
                )}
              </div>
            </button>

            {/* Branch 3: Thiên Phú (Talents - 3 skills) */}
            <button
              onClick={() => setActiveBranch(activeBranch === 'talent' ? null : 'talent')}
              className={`w-full p-2.5 rounded-2xl text-left border transition-all flex items-center justify-between group/branch cursor-pointer ${
                activeBranch === 'talent'
                  ? 'bg-amber-400/15 border-amber-400/60 shadow-[0_0_16px_rgba(245,158,11,0.25)] text-amber-200'
                  : tree.talentBranch.isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15'
                  : 'bg-white/[0.03] border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                    tree.talentBranch.isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-purple-400/15 text-purple-300 border-purple-400/30'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Nhánh Thiên Phú</div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    3 Kỹ Năng ({tree.talentBranch.currentLevels.attack}/{tree.talentBranch.currentLevels.skill}/{tree.talentBranch.currentLevels.burst})
                  </div>
                </div>
              </div>
              <div className="shrink-0 ml-1.5">
                {tree.talentBranch.isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 group-hover/branch:text-purple-400/70" />
                )}
              </div>
            </button>

            {/* Branch 4: Thánh Di Vật (Artifacts - 5 pieces) - Không để tên bộ */}
            <button
              onClick={() => setActiveBranch(activeBranch === 'artifact' ? null : 'artifact')}
              className={`w-full p-2.5 rounded-2xl text-left border transition-all flex items-center justify-between group/branch cursor-pointer ${
                activeBranch === 'artifact'
                  ? 'bg-amber-400/15 border-amber-400/60 shadow-[0_0_16px_rgba(245,158,11,0.25)] text-amber-200'
                  : tree.artifactBranch.isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15'
                  : 'bg-white/[0.03] border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                    tree.artifactBranch.isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-rose-400/15 text-rose-300 border-rose-400/30'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Nhánh Thánh Di Vật</div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    5 Món ({optimizedArtifactCount}/5 Tối Ưu)
                  </div>
                </div>
              </div>
              <div className="shrink-0 ml-1.5">
                {tree.artifactBranch.isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 group-hover/branch:text-rose-400/70" />
                )}
              </div>
            </button>
          </div>

          {/* ========================================================= */}
          {/* CONNECTOR LINE TO EXPANDED DRAWER PANEL                   */}
          {/* ========================================================= */}
          {activeBranch && (
            <div className="flex items-center justify-center shrink-0 text-amber-400/40 pt-16">
              <div className="w-3 sm:w-5 h-0.5 bg-gradient-to-r from-amber-400/60 to-amber-400/20" />
              <ChevronRight className="w-4 h-4 -ml-1.5 text-amber-400/60" />
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. EXPANDED DRAWER DETAIL PANEL ("mở ra như ngăn kéo")     */}
          {/* ========================================================= */}
          {activeBranch && (
            <div
              key={activeBranch}
              className="w-[360px] sm:w-[450px] lg:w-[480px] shrink-0 p-4 rounded-2xl bg-slate-900/70 border border-white/[0.08] backdrop-blur-xl shadow-2xl flex flex-col justify-between animate-drawer-open self-start"
            >
              {/* -------------------------------------------------- */}
              {/* DETAIL: BRANCH 1 - LEVEL                           */}
              {/* -------------------------------------------------- */}
              {activeBranch === 'level' && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-amber-400/15 text-amber-300 border border-amber-400/30">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                          Nhánh Cấp Độ
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Mục tiêu Lv. 90
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBranchComplete(tree.id, 'levelBranch')}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                        tree.levelBranch.isCompleted
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-amber-400/40'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{tree.levelBranch.isCompleted ? 'Đã Xong' : 'Hoàn Thành'}</span>
                    </button>
                  </div>

                  {/* Level Stepper & Quick presets */}
                  <div className="flex items-center justify-between bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.06]">
                    <div className="text-xs text-slate-300 font-semibold">Cấp hiện tại:</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateTreeLevel(tree.id, currentCharLevel - 1)}
                        disabled={currentCharLevel <= 1}
                        className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-slate-200 cursor-pointer"
                        title="Giảm cấp"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-black text-amber-300 font-sans min-w-[50px] text-center">
                        Lv.{currentCharLevel}
                      </span>
                      <button
                        onClick={() => updateTreeLevel(tree.id, currentCharLevel + 1)}
                        disabled={currentCharLevel >= 90}
                        className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-slate-200 cursor-pointer"
                        title="Tăng cấp"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quick Presets */}
                    <div className="flex items-center gap-1">
                      {[70, 80, 90].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => updateTreeLevel(tree.id, lvl)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                            currentCharLevel === lvl
                              ? 'bg-amber-400/20 border-amber-400/50 text-amber-300'
                              : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Required Materials Grid with Official Icons */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Nguyên liệu cần đến Lv. 90:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {/* Sách Kinh Nghiệm Anh Hùng */}
                      <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={BASE_MATERIAL_ICONS.heroWit}
                            alt="Hero's Wit"
                            className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                          />
                          <span className="text-slate-300 text-xs truncate">Kinh Nghiệm Anh Hùng</span>
                        </div>
                        <span className="font-bold text-amber-300 shrink-0 font-sans">
                          {tree.levelBranch.heroWitNeeded} cuốn
                        </span>
                      </div>

                      {/* Mora */}
                      <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={BASE_MATERIAL_ICONS.mora}
                            alt="Mora"
                            className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                          />
                          <span className="text-slate-300 text-xs truncate">Mora</span>
                        </div>
                        <span className="font-bold text-yellow-300 shrink-0 font-sans">
                          {tree.levelBranch.moraNeeded.toLocaleString()}
                        </span>
                      </div>

                      {/* Boss Thế Giới */}
                      <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-2 col-span-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={getMaterialIconUrl(tree.levelBranch.worldBossMat, 'bossDrop')}
                            alt={tree.levelBranch.worldBossMat}
                            className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = BASE_MATERIAL_ICONS.bossDrop;
                            }}
                          />
                          <span className="text-slate-300 text-xs truncate">
                            {tree.levelBranch.worldBossMat}
                          </span>
                        </div>
                        <span className="font-bold text-emerald-300 shrink-0 font-sans">
                          {tree.levelBranch.bossDropNeeded} cái
                        </span>
                      </div>

                      {/* Đặc Sản Khu Vực */}
                      <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-2 col-span-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={getMaterialIconUrl(tree.levelBranch.localSpecialty, 'specialty')}
                            alt={tree.levelBranch.localSpecialty}
                            className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = BASE_MATERIAL_ICONS.specialty;
                            }}
                          />
                          <span className="text-slate-300 text-xs truncate">
                            {tree.levelBranch.localSpecialty}
                          </span>
                        </div>
                        <span className="font-bold text-sky-300 shrink-0 font-sans">
                          {tree.levelBranch.specialtyNeeded} cái
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------- */}
              {/* DETAIL: BRANCH 2 - WEAPON (Không hiện tên vũ khí)  */}
              {/* -------------------------------------------------- */}
              {activeBranch === 'weapon' && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-sky-400/15 text-sky-300 border border-sky-400/30">
                        <Sword className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                          Nhánh Vũ Khí
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Mục tiêu Lv. 90
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBranchComplete(tree.id, 'weaponBranch')}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                        tree.weaponBranch.isCompleted
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-sky-400/40'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{tree.weaponBranch.isCompleted ? 'Đã Xong' : 'Hoàn Thành'}</span>
                    </button>
                  </div>

                  {/* Weapon Level Stepper */}
                  <div className="flex items-center justify-between bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.06]">
                    <div className="text-xs text-slate-300 font-semibold">Cấp hiện tại:</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateTreeWeaponLevel(tree.id, tree.weaponBranch.currentLevel - 1)}
                        disabled={tree.weaponBranch.currentLevel <= 1}
                        className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-slate-200 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-black text-sky-300 font-sans min-w-[50px] text-center">
                        Lv.{tree.weaponBranch.currentLevel}
                      </span>
                      <button
                        onClick={() => updateTreeWeaponLevel(tree.id, tree.weaponBranch.currentLevel + 1)}
                        disabled={tree.weaponBranch.currentLevel >= 90}
                        className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-slate-200 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      {[70, 80, 90].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => updateTreeWeaponLevel(tree.id, lvl)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                            tree.weaponBranch.currentLevel === lvl
                              ? 'bg-sky-400/20 border-sky-400/50 text-sky-300'
                              : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Required Materials & Schedule (Lịch mở, số NL đột phá, Mora) */}
                  <div className="space-y-2 text-xs">
                    {/* Lịch mở bí cảnh nguyên liệu */}
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        Lịch mở nguyên liệu:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-200 font-bold">
                          {tree.weaponBranch.daysOfWeek.map((d) => DAY_NAMES[d]).join(', ')}
                        </span>
                        {isWeaponOpenToday && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                            Hôm nay mở!
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Số nguyên liệu đột phá cần */}
                    <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={getMaterialIconUrl(tree.weaponBranch.materialName, 'weaponAscension')}
                          alt={tree.weaponBranch.materialName}
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = BASE_MATERIAL_ICONS.weaponAscension;
                          }}
                        />
                        <span className="text-slate-300 text-xs truncate">
                          Nguyên liệu đột phá ({tree.weaponBranch.materialName})
                        </span>
                      </div>
                      <span className="font-bold text-sky-300 shrink-0 font-sans">
                        {weaponCost.mats} cái
                      </span>
                    </div>

                    {/* Mora cần */}
                    <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={BASE_MATERIAL_ICONS.mora}
                          alt="Mora"
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                        />
                        <span className="text-slate-300 text-xs truncate">Mora đột phá</span>
                      </div>
                      <span className="font-bold text-yellow-300 shrink-0 font-sans">
                        {weaponCost.mora.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------- */}
              {/* DETAIL: BRANCH 3 - TALENTS (3 Separate Skills)    */}
              {/* -------------------------------------------------- */}
              {activeBranch === 'talent' && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-purple-400/15 text-purple-300 border border-purple-400/30">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                          Nhánh Thiên Phú (3 Kỹ Năng)
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          {tree.talentBranch.talentBookName}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBranchComplete(tree.id, 'talentBranch')}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                        tree.talentBranch.isCompleted
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-purple-400/40'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{tree.talentBranch.isCompleted ? 'Đã Xong' : 'Hoàn Thành'}</span>
                    </button>
                  </div>

                  {/* 3 Skill Level Controls */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Chỉnh sửa level từng kỹ năng (1 - 10):
                    </div>

                    {/* Skill 1: Đánh Thường */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-[10px] font-bold text-purple-300">
                          A
                        </div>
                        <span className="text-xs font-semibold text-slate-200">Đánh Thường</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateTreeTalentLevel(
                              tree.id,
                              'attack',
                              tree.talentBranch.currentLevels.attack - 1
                            )
                          }
                          disabled={tree.talentBranch.currentLevels.attack <= 1}
                          className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-slate-200 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-purple-300 font-sans min-w-[42px] text-center">
                          Lv.{tree.talentBranch.currentLevels.attack}
                        </span>
                        <button
                          onClick={() =>
                            updateTreeTalentLevel(
                              tree.id,
                              'attack',
                              tree.talentBranch.currentLevels.attack + 1
                            )
                          }
                          disabled={tree.talentBranch.currentLevels.attack >= 10}
                          className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-slate-200 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Skill 2: Kỹ Năng Nguyên Tố (E) */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-[10px] font-bold text-purple-300">
                          E
                        </div>
                        <span className="text-xs font-semibold text-slate-200">Kỹ Năng E</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateTreeTalentLevel(
                              tree.id,
                              'skill',
                              tree.talentBranch.currentLevels.skill - 1
                            )
                          }
                          disabled={tree.talentBranch.currentLevels.skill <= 1}
                          className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-slate-200 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-purple-300 font-sans min-w-[42px] text-center">
                          Lv.{tree.talentBranch.currentLevels.skill}
                        </span>
                        <button
                          onClick={() =>
                            updateTreeTalentLevel(
                              tree.id,
                              'skill',
                              tree.talentBranch.currentLevels.skill + 1
                            )
                          }
                          disabled={tree.talentBranch.currentLevels.skill >= 10}
                          className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-slate-200 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Skill 3: Kỹ Năng Nộ (Q) */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-[10px] font-bold text-purple-300">
                          Q
                        </div>
                        <span className="text-xs font-semibold text-slate-200">Kỹ Năng Nộ Q</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateTreeTalentLevel(
                              tree.id,
                              'burst',
                              tree.talentBranch.currentLevels.burst - 1
                            )
                          }
                          disabled={tree.talentBranch.currentLevels.burst <= 1}
                          className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-slate-200 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-purple-300 font-sans min-w-[42px] text-center">
                          Lv.{tree.talentBranch.currentLevels.burst}
                        </span>
                        <button
                          onClick={() =>
                            updateTreeTalentLevel(
                              tree.id,
                              'burst',
                              tree.talentBranch.currentLevels.burst + 1
                            )
                          }
                          disabled={tree.talentBranch.currentLevels.burst >= 10}
                          className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-slate-200 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Required Materials with images */}
                  <div className="space-y-1.5 text-xs">
                    {/* Sách Thiên Phú Vàng */}
                    <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={BASE_MATERIAL_ICONS.talentBook}
                          alt="Talent Book"
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                        />
                        <span className="text-slate-300 text-xs truncate">
                          Sách Thiên Phú Vàng ({tree.talentBranch.talentBookName})
                        </span>
                      </div>
                      <span className="font-bold text-amber-300 shrink-0 font-sans">
                        {tree.talentBranch.booksGoldNeeded} cuốn
                      </span>
                    </div>

                    {/* Nguyên liệu Boss Tuần */}
                    <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={getMaterialIconUrl(tree.talentBranch.weeklyBossMatName, 'bossDrop')}
                          alt={tree.talentBranch.weeklyBossMatName}
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = BASE_MATERIAL_ICONS.bossDrop;
                          }}
                        />
                        <span className="text-slate-300 text-xs truncate">
                          {tree.talentBranch.weeklyBossMatName}
                        </span>
                      </div>
                      <span className="font-bold text-purple-300 shrink-0 font-sans">
                        {tree.talentBranch.weeklyBossMatsNeeded} cái
                      </span>
                    </div>

                    {/* Vương Miện Trí Thức */}
                    <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={BASE_MATERIAL_ICONS.crown}
                          alt="Crown of Insight"
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                        />
                        <span className="text-slate-300 text-xs truncate">Vương Miện Trí Thức</span>
                      </div>
                      <span className="font-bold text-amber-400 shrink-0 font-sans">
                        {tree.talentBranch.crownsNeeded} cái
                      </span>
                    </div>

                    {isTalentOpenToday && (
                      <div className="pt-1 flex items-center gap-1.5 text-emerald-300 text-[11px] font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Bí cảnh sách hôm nay đang mở!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* -------------------------------------------------- */}
              {/* DETAIL: BRANCH 4 - ARTIFACTS (Không hiện tên bộ)   */}
              {/* -------------------------------------------------- */}
              {activeBranch === 'artifact' && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-rose-400/15 text-rose-300 border border-rose-400/30">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                          Nhánh Thánh Di Vật (5 Món)
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Kiểm soát cấp độ và tối ưu
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBranchComplete(tree.id, 'artifactBranch')}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                        tree.artifactBranch.isCompleted
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-rose-400/40'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{tree.artifactBranch.isCompleted ? 'Đã Xong' : 'Hoàn Thành'}</span>
                    </button>
                  </div>

                  {/* Summary Progress Bar */}
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-rose-400" />
                        Tiến độ tối ưu:
                      </span>
                      <span className="font-bold text-amber-300 font-sans">
                        {optimizedArtifactCount} / 5 Món Đã Tối Ưu
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 transition-all duration-300 rounded-full"
                        style={{ width: `${(optimizedArtifactCount / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* 5 Distinct Artifact Pieces - Không có dòng phụ bên dưới */}
                  <div className="space-y-1.5">
                    {artifactPieces.map((piece, idx) => {
                      // Correct name for plume is Lông Vũ Tử Vong
                      const pieceName =
                        piece.slotKey === 'plume' ? 'Lông Vũ Tử Vong' : piece.slotName;
                      const slotIcon =
                        piece.slotKey === 'flower'
                          ? '🌸'
                          : piece.slotKey === 'plume'
                          ? '🪶'
                          : piece.slotKey === 'sands'
                          ? '⏳'
                          : piece.slotKey === 'goblet'
                          ? '🏆'
                          : '👑';

                      return (
                        <div
                          key={piece.slotKey}
                          className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                            piece.isOptimized
                              ? 'bg-emerald-500/[0.08] border-emerald-500/30'
                              : 'bg-white/[0.02] border-white/[0.06]'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base shrink-0">{slotIcon}</span>
                            <span className="text-xs font-bold text-slate-200 truncate">
                              {pieceName}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Level Stepper */}
                            <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-lg border border-white/[0.08]">
                              <button
                                onClick={() =>
                                  updateTreeArtifactPiece(tree.id, idx, {
                                    level: piece.level - 4,
                                  })
                                }
                                disabled={piece.level <= 0}
                                className="text-slate-400 hover:text-slate-100 disabled:opacity-30 text-xs px-1 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-[11px] font-bold text-amber-300 font-sans min-w-[32px] text-center">
                                +{piece.level}
                              </span>
                              <button
                                onClick={() =>
                                  updateTreeArtifactPiece(tree.id, idx, {
                                    level: piece.level + 4,
                                  })
                                }
                                disabled={piece.level >= 20}
                                className="text-slate-400 hover:text-slate-100 disabled:opacity-30 text-xs px-1 cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            {/* "Đã tối ưu" Toggle Button */}
                            <button
                              onClick={() =>
                                updateTreeArtifactPiece(tree.id, idx, {
                                  isOptimized: !piece.isOptimized,
                                })
                              }
                              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all border flex items-center gap-1 cursor-pointer ${
                                piece.isOptimized
                                  ? 'bg-emerald-500/25 border-emerald-400/50 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                                  : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-slate-200 hover:border-amber-400/30'
                              }`}
                              title={piece.isOptimized ? 'Bấm để đánh dấu chưa tối ưu' : 'Bấm để đánh dấu đã tối ưu'}
                            >
                              {piece.isOptimized ? (
                                <>
                                  <Check className="w-3 h-3 stroke-[2.5]" />
                                  <span>Đã tối ưu</span>
                                </>
                              ) : (
                                <>
                                  <Circle className="w-3 h-3" />
                                  <span>Chưa tối ưu</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
