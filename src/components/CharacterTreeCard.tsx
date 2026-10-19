import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Check,
  Trash2,
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
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteWithAnimation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    setTimeout(() => {
      deleteCharacterTree(tree.id);
    }, 350);
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

  // Active branch Y coordinate for clean branch line to drawer
  const activeBranchY =
    activeBranch === 'level'
      ? 28
      : activeBranch === 'weapon'
      ? 98
      : activeBranch === 'talent'
      ? 170
      : 240;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative transition-all duration-300 py-1 ${
        isDeleting ? 'animate-card-delete' : ''
      } ${isDragging ? 'opacity-50 z-50 scale-102 shadow-2xl' : ''}`}
    >
      {/* Top Priority Badge - Minimal floating pill */}
      {isTopPriority && (
        <div className="absolute -top-2 left-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 text-[9px] font-extrabold uppercase tracking-wider shadow-[0_2px_10px_rgba(245,158,11,0.4)] z-20">
          Ưu Tiên #1
        </div>
      )}

      {/* Main Horizontal Tree Layout (No outer big box!) */}
      <div className="flex items-start gap-0 overflow-x-auto pb-2 custom-scrollbar">
        {/* ========================================================= */}
        {/* 1. CHARACTER CARD NODE (Root node, strictly locked size)  */}
        {/* ========================================================= */}
        <div className="w-[144px] sm:w-[155px] h-[268px] min-h-[268px] max-h-[268px] shrink-0 flex flex-col justify-between p-3 rounded-2xl bg-slate-900/60 border border-white/[0.1] backdrop-blur-xl relative group/card self-start shadow-xl">
          {/* Top Quick Actions: Drag Handle, Delete & Complete */}
          <div className="flex items-center justify-between mb-1">
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
                className="p-1 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/15 transition-colors cursor-pointer"
                title="Đánh dấu hoàn thành toàn bộ"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleDeleteWithAnimation}
                className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/15 transition-colors cursor-pointer"
                title="Xóa khỏi Timeline"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Avatar Box (Identical to Roster Card) */}
          <div
            className={`w-full aspect-square rounded-2xl overflow-hidden mb-1.5 relative border ${
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
          <div className="w-full px-0.5 flex flex-col items-center gap-0.5 text-center">
            {/* Hàng 1: Tên nhân vật (Cinzel font-genshin) */}
            <div className="w-full text-xs sm:text-sm font-bold text-slate-100 truncate group-hover/card:text-amber-300 transition-colors font-genshin tracking-wide">
              {tree.characterName}
            </div>

            {/* Hàng 2: Cấp độ (Inter) */}
            <div className="flex items-center justify-center my-0.5">
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
        {/* 2. SVG CURVED BRANCHES (Simple, no dots, no arrows, no glow)*/}
        {/* ========================================================= */}
        <div className="w-[50px] sm:w-[70px] h-[268px] shrink-0 relative pointer-events-none">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 70 268"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Branch 1: Cấp độ (Target y = 28) */}
            <path
              d="M 0 134 C 35 134, 35 28, 70 28"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
            />

            {/* Branch 2: Vũ Khí (Target y = 98) */}
            <path
              d="M 0 134 C 35 134, 35 98, 70 98"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
            />

            {/* Branch 3: Thiên Phú (Target y = 170) */}
            <path
              d="M 0 134 C 35 134, 35 170, 70 170"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
            />

            {/* Branch 4: Thánh Di Vật (Target y = 240) */}
            <path
              d="M 0 134 C 35 134, 35 240, 70 240"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* ========================================================= */}
        {/* 3. THE 4 MAIN BRANCH SELECTORS (NO ICONS IN FRONT!)       */}
        {/* ========================================================= */}
        <div className="w-[175px] sm:w-[190px] h-[268px] shrink-0 flex flex-col justify-between self-start">
          {/* Branch 1: Cấp độ (Level) */}
          <button
            onClick={() => setActiveBranch(activeBranch === 'level' ? null : 'level')}
            className={`w-full h-[55px] px-3.5 py-2 rounded-2xl text-left border transition-all flex items-center justify-between group/branch cursor-pointer ${
              activeBranch === 'level'
                ? 'bg-sky-500/20 border-sky-400/60 shadow-[0_0_16px_rgba(56,189,248,0.25)] text-sky-200'
                : tree.levelBranch.isCompleted
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15'
                : 'bg-slate-900/50 border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
            }`}
          >
            <div className="min-w-0 flex flex-col justify-center">
              <div className="text-xs font-bold truncate tracking-wide">Cấp Độ</div>
              <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                Lv.{currentCharLevel} → 90
              </div>
            </div>
            <div className="shrink-0 ml-2">
              {tree.levelBranch.isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              ) : (
                <Circle className="w-4 h-4 text-slate-500 group-hover/branch:text-sky-400/70" />
              )}
            </div>
          </button>

          {/* Branch 2: Vũ Khí (Weapon) - Không có icon phía trước, không có tên vũ khí */}
          <button
            onClick={() => setActiveBranch(activeBranch === 'weapon' ? null : 'weapon')}
            className={`w-full h-[55px] px-3.5 py-2 rounded-2xl text-left border transition-all flex items-center justify-between group/branch cursor-pointer ${
              activeBranch === 'weapon'
                ? 'bg-sky-500/20 border-sky-400/60 shadow-[0_0_16px_rgba(56,189,248,0.25)] text-sky-200'
                : tree.weaponBranch.isCompleted
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15'
                : 'bg-slate-900/50 border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
            }`}
          >
            <div className="min-w-0 flex flex-col justify-center">
              <div className="text-xs font-bold truncate tracking-wide">Vũ Khí</div>
              <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                Lv.{tree.weaponBranch.currentLevel} → 90
              </div>
            </div>
            <div className="shrink-0 ml-2">
              {tree.weaponBranch.isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              ) : (
                <Circle className="w-4 h-4 text-slate-500 group-hover/branch:text-sky-400/70" />
              )}
            </div>
          </button>

          {/* Branch 3: Thiên Phú (Talents) */}
          <button
            onClick={() => setActiveBranch(activeBranch === 'talent' ? null : 'talent')}
            className={`w-full h-[55px] px-3.5 py-2 rounded-2xl text-left border transition-all flex items-center justify-between group/branch cursor-pointer ${
              activeBranch === 'talent'
                ? 'bg-sky-500/20 border-sky-400/60 shadow-[0_0_16px_rgba(56,189,248,0.25)] text-sky-200'
                : tree.talentBranch.isCompleted
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15'
                : 'bg-slate-900/50 border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
            }`}
          >
            <div className="min-w-0 flex flex-col justify-center">
              <div className="text-xs font-bold truncate tracking-wide">Thiên Phú</div>
              <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                3 Kỹ Năng ({tree.talentBranch.currentLevels.attack}/{tree.talentBranch.currentLevels.skill}/{tree.talentBranch.currentLevels.burst})
              </div>
            </div>
            <div className="shrink-0 ml-2">
              {tree.talentBranch.isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              ) : (
                <Circle className="w-4 h-4 text-slate-500 group-hover/branch:text-sky-400/70" />
              )}
            </div>
          </button>

          {/* Branch 4: Thánh Di Vật (Artifacts) */}
          <button
            onClick={() => setActiveBranch(activeBranch === 'artifact' ? null : 'artifact')}
            className={`w-full h-[55px] px-3.5 py-2 rounded-2xl text-left border transition-all flex items-center justify-between group/branch cursor-pointer ${
              activeBranch === 'artifact'
                ? 'bg-sky-500/20 border-sky-400/60 shadow-[0_0_16px_rgba(56,189,248,0.25)] text-sky-200'
                : tree.artifactBranch.isCompleted
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15'
                : 'bg-slate-900/50 border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
            }`}
          >
            <div className="min-w-0 flex flex-col justify-center">
              <div className="text-xs font-bold truncate tracking-wide">Thánh Di Vật</div>
              <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                5 Món ({optimizedArtifactCount}/5 Tối Ưu)
              </div>
            </div>
            <div className="shrink-0 ml-2">
              {tree.artifactBranch.isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              ) : (
                <Circle className="w-4 h-4 text-slate-500 group-hover/branch:text-sky-400/70" />
              )}
            </div>
          </button>
        </div>

        {/* ========================================================= */}
        {/* BRANCH LINE TO DRAWER (Same simple branch, no arrows)     */}
        {/* ========================================================= */}
        {activeBranch && (
          <div className="w-[36px] sm:w-[50px] h-[268px] shrink-0 relative pointer-events-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 50 268"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={`M 0 ${activeBranchY} L 50 ${activeBranchY}`}
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />
            </svg>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. EXPANDED DRAWER DETAIL PANEL ("mở ra như ngăn kéo")     */}
        {/* ========================================================= */}
        {activeBranch && (
          <div
            key={activeBranch}
            className="w-[360px] sm:w-[450px] lg:w-[480px] shrink-0 p-4 rounded-2xl bg-slate-900/70 border border-white/[0.1] backdrop-blur-xl shadow-2xl flex flex-col justify-between animate-drawer-open self-start"
          >
            {/* -------------------------------------------------- */}
            {/* DETAIL: BRANCH 1 - LEVEL                           */}
            {/* -------------------------------------------------- */}
            {activeBranch === 'level' && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                      Nhánh Cấp Độ
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Mục tiêu Lv. 90
                    </p>
                  </div>

                  <button
                    onClick={() => toggleBranchComplete(tree.id, 'levelBranch')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                      tree.levelBranch.isCompleted
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-sky-400/40'
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
                            ? 'bg-sky-400/20 border-sky-400/50 text-sky-300'
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
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                      Nhánh Vũ Khí
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Mục tiêu Lv. 90
                    </p>
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
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                      Nhánh Thiên Phú (3 Kỹ Năng)
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                      {tree.talentBranch.talentBookName}
                    </p>
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
                    <span className="text-xs font-semibold text-slate-200">Đánh Thường</span>
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
                        <Minus className="w-3.5 h-3.5" />
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
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Skill 2: Kỹ Năng Nguyên Tố (E) */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-xs font-semibold text-slate-200">Kỹ Năng E</span>
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
                        <Minus className="w-3.5 h-3.5" />
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
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Skill 3: Kỹ Năng Nộ (Q) */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-xs font-semibold text-slate-200">Kỹ Năng Nộ Q</span>
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
                        <Minus className="w-3.5 h-3.5" />
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
                        <Plus className="w-3.5 h-3.5" />
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
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                      Nhánh Thánh Di Vật (5 Món)
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Kiểm soát cấp độ và tối ưu
                    </p>
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
  );
};
