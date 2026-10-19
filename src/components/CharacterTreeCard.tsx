import React, { useState, useEffect, useRef } from 'react';
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
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CharacterBranchTree } from '../types';
import { DEFAULT_ARTIFACT_PIECES } from '../types';
import { useStore } from '../store/useStore';
import { isDomainOpenToday } from '../utils/priority';
import { ElementIcon } from './ElementIcon';
import { getMaterialIconUrl, BASE_MATERIAL_ICONS } from '../utils/materialIcons';
import { WeaponSelectionDrawer } from './WeaponSelectionDrawer';
import { calculateWeaponTo90Cost } from '../utils/calculator';
import { CHARACTERS_DATA } from '../data/genshinData';
import { getCharacterMaterialDetail } from '../data/characterMaterialsData';

interface CharacterTreeCardProps {
  tree: CharacterBranchTree;
  index: number;
}

type ActiveBranchType = 'level' | 'weapon' | 'talent' | 'artifact' | null;

export const CharacterTreeCard: React.FC<CharacterTreeCardProps> = ({ tree, index }) => {
  const {
    toggleBranchComplete,
    toggleCompleteCharacterTree,
    deleteCharacterTree,
    updateTreeLevel,
    updateTreeWeaponLevel,
    setTreeWeapon,
    updateTreeTalentLevel,
    updateTreeArtifactPiece,
  } = useStore();

  const [activeBranch, setActiveBranch] = useState<ActiveBranchType>('level');
  const [displayedBranch, setDisplayedBranch] = useState<'level' | 'weapon' | 'talent' | 'artifact'>('level');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWeaponDrawerOpen, setIsWeaponDrawerOpen] = useState(false);

  const handleBranchToggle = (branch: 'level' | 'weapon' | 'talent' | 'artifact') => {
    if (activeBranch === branch) {
      setActiveBranch(null);
    } else {
      setActiveBranch(branch);
      setDisplayedBranch(branch);
    }
  };

  const effectiveBranch = activeBranch || displayedBranch;

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

  // Character Weapon Type & Accurate Cost Calculation
  const characterPreset = CHARACTERS_DATA.find(
    (c) =>
      c.nameVi.toLowerCase() === tree.characterName.toLowerCase() ||
      c.name.toLowerCase() === tree.characterName.toLowerCase()
  );
  const characterWeaponType = tree.weaponBranch.weaponType || characterPreset?.weaponType;
  const weaponRarity = tree.weaponBranch.weaponRarity || 5;
  const weaponCost = calculateWeaponTo90Cost(tree.weaponBranch.currentLevel, weaponRarity);

  // Active branch Y coordinate for clean branch line to drawer (uses effectiveBranch during close animation)
  const activeBranchY =
    effectiveBranch === 'level'
      ? 28
      : effectiveBranch === 'weapon'
      ? 98
      : effectiveBranch === 'talent'
      ? 170
      : 240;

  // Accurate Character Material resolution (World boss, weekly boss, specialty)
  const matDetail = getCharacterMaterialDetail(tree.characterName);
  const displayWorldBossMat =
    tree.levelBranch.worldBossMat &&
    !tree.levelBranch.worldBossMat.includes('Nguyên Liệu') &&
    !tree.levelBranch.worldBossMat.includes('Boss Thế Giới')
      ? tree.levelBranch.worldBossMat
      : matDetail.worldBossMat;

  const displayWeeklyBossMat =
    tree.talentBranch.weeklyBossMatName &&
    !tree.talentBranch.weeklyBossMatName.includes('Nguyên Liệu') &&
    !tree.talentBranch.weeklyBossMatName.includes('Boss Tuần')
      ? tree.talentBranch.weeklyBossMatName
      : matDetail.weeklyBossMat;

  const displaySpecialty =
    tree.levelBranch.localSpecialty &&
    !tree.levelBranch.localSpecialty.includes('Đặc Sản')
      ? tree.levelBranch.localSpecialty
      : matDetail.localSpecialty;

  // Measure content height for smooth vertical transition to eliminate sibling jumping below
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(268);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = Math.round(entry.contentRect.height);
        if (h > 0) {
          setContentHeight(h);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative py-1 transition-opacity duration-200 ${
        isDeleting ? 'animate-card-delete' : ''
      } ${isDragging ? 'opacity-50 z-50 scale-102 shadow-2xl' : ''}`}
    >
      {/* Top Priority Badge - Minimal floating pill */}
      {isTopPriority && (
        <div className="absolute -top-2 left-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 text-[9px] font-extrabold uppercase tracking-wider shadow-[0_2px_10px_rgba(245,158,11,0.4)] z-20">
          Ưu Tiên #1
        </div>
      )}

      {/* Smooth Height-Animated Card Container (Prevents sibling characters below from jumping down) */}
      <div
        style={{
          minHeight: '268px',
          height: activeBranch ? `${Math.max(268, contentHeight + 8)}px` : '268px',
          transition: 'height 320ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="overflow-visible"
      >
        {/* Main Horizontal Tree Layout (No outer big box!) */}
        <div
          ref={contentRef}
          className="flex items-start gap-0 overflow-x-auto pb-2 custom-scrollbar"
        >
        {/* ========================================================= */}
        {/* 1. CHARACTER CARD NODE (Root node, strictly locked size)  */}
        {/* ========================================================= */}
        <div className="w-[144px] sm:w-[155px] h-[268px] min-h-[268px] max-h-[268px] shrink-0 flex flex-col justify-between p-3 rounded-3xl liquid-glass liquid-glass-interactive relative group/card self-start shadow-xl border border-white/[0.12]">
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
            onClick={() => handleBranchToggle('level')}
            className={`w-full h-[55px] px-3.5 py-2 rounded-2xl text-left border transition-all flex items-center justify-between group/branch cursor-pointer liquid-glass-interactive ${
              activeBranch === 'level'
                ? '!bg-sky-500/25 !border-sky-400/70 shadow-[0_0_20px_rgba(56,189,248,0.3)] text-sky-200 backdrop-blur-xl'
                : tree.levelBranch.isCompleted
                ? '!bg-emerald-500/15 !border-emerald-500/40 text-emerald-300 hover:!bg-emerald-500/20 backdrop-blur-md'
                : 'liquid-glass-subtle text-slate-300 hover:text-white hover:border-white/25'
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
            onClick={() => handleBranchToggle('weapon')}
            className={`w-full h-[55px] px-3.5 py-2 rounded-2xl text-left border transition-all flex items-center justify-between group/branch cursor-pointer liquid-glass-interactive ${
              activeBranch === 'weapon'
                ? '!bg-sky-500/25 !border-sky-400/70 shadow-[0_0_20px_rgba(56,189,248,0.3)] text-sky-200 backdrop-blur-xl'
                : tree.weaponBranch.isCompleted
                ? '!bg-emerald-500/15 !border-emerald-500/40 text-emerald-300 hover:!bg-emerald-500/20 backdrop-blur-md'
                : 'liquid-glass-subtle text-slate-300 hover:text-white hover:border-white/25'
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
            onClick={() => handleBranchToggle('talent')}
            className={`w-full h-[55px] px-3.5 py-2 rounded-2xl text-left border transition-all flex items-center justify-between group/branch cursor-pointer liquid-glass-interactive ${
              activeBranch === 'talent'
                ? '!bg-sky-500/25 !border-sky-400/70 shadow-[0_0_20px_rgba(56,189,248,0.3)] text-sky-200 backdrop-blur-xl'
                : tree.talentBranch.isCompleted
                ? '!bg-emerald-500/15 !border-emerald-500/40 text-emerald-300 hover:!bg-emerald-500/20 backdrop-blur-md'
                : 'liquid-glass-subtle text-slate-300 hover:text-white hover:border-white/25'
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
            onClick={() => handleBranchToggle('artifact')}
            className={`w-full h-[55px] px-3.5 py-2 rounded-2xl text-left border transition-all flex items-center justify-between group/branch cursor-pointer liquid-glass-interactive ${
              activeBranch === 'artifact'
                ? '!bg-sky-500/25 !border-sky-400/70 shadow-[0_0_20px_rgba(56,189,248,0.3)] text-sky-200 backdrop-blur-xl'
                : tree.artifactBranch.isCompleted
                ? '!bg-emerald-500/15 !border-emerald-500/40 text-emerald-300 hover:!bg-emerald-500/20 backdrop-blur-md'
                : 'liquid-glass-subtle text-slate-300 hover:text-white hover:border-white/25'
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
        {/* 4. ANIMATED EXPANDED DRAWER CONTAINER (Smooth expansion)  */}
        {/* ========================================================= */}
        <div
          className={`flex items-start shrink-0 origin-left transition-all duration-300 ease-out ${
            activeBranch
              ? 'max-w-[560px] opacity-100 translate-x-0'
              : 'max-w-0 opacity-0 -translate-x-3 pointer-events-none overflow-hidden'
          }`}
          style={{
            transitionProperty: 'max-width, opacity, transform',
            transitionDuration: '320ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Branch Line Connector (Smoothly connects active branch to drawer) */}
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
                className="transition-all duration-300 ease-out"
              />
            </svg>
          </div>

          {/* Drawer Detail Panel (Fluid layout, stays mounted during branch switches) */}
          <div className="w-[360px] sm:w-[450px] lg:w-[480px] shrink-0 p-4 sm:p-5 rounded-3xl liquid-glass border border-white/15 shadow-2xl flex flex-col justify-between self-start transition-all duration-300 ease-out min-h-[268px]">
            {/* Inner Content with smooth cross-fade when switching activeBranch */}
            <div
              key={effectiveBranch}
              className="animate-card-fade-in transition-opacity duration-200"
            >
              {/* -------------------------------------------------- */}
              {/* DETAIL: BRANCH 1 - LEVEL                           */}
              {/* -------------------------------------------------- */}
              {effectiveBranch === 'level' && (
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
                <div className="flex items-center justify-between liquid-glass-subtle p-3 rounded-2xl border border-white/[0.08]">
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
                    <div className="p-2.5 rounded-xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.08] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={BASE_MATERIAL_ICONS.heroWit}
                          alt="Hero's Wit"
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="text-slate-300 text-xs truncate">Kinh Nghiệm Anh Hùng</span>
                      </div>
                      <span className="font-bold text-amber-300 shrink-0 font-sans">
                        {tree.levelBranch.heroWitNeeded} cuốn
                      </span>
                    </div>

                    {/* Mora */}
                    <div className="p-2.5 rounded-xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.08] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={BASE_MATERIAL_ICONS.mora}
                          alt="Mora"
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="text-slate-300 text-xs truncate">Mora</span>
                      </div>
                      <span className="font-bold text-yellow-300 shrink-0 font-sans">
                        {tree.levelBranch.moraNeeded.toLocaleString()}
                      </span>
                    </div>

                    {/* Boss Thế Giới */}
                    <div className="p-2.5 rounded-xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.08] flex items-center justify-between gap-2 col-span-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={getMaterialIconUrl(displayWorldBossMat, 'bossDrop')}
                          alt={displayWorldBossMat}
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = BASE_MATERIAL_ICONS.bossDrop;
                          }}
                        />
                        <span className="text-slate-300 text-xs truncate">
                          {displayWorldBossMat}
                        </span>
                      </div>
                      <span className="font-bold text-emerald-300 shrink-0 font-sans">
                        {tree.levelBranch.bossDropNeeded} cái
                      </span>
                    </div>

                    {/* Đặc Sản Khu Vực */}
                    <div className="p-2.5 rounded-xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.08] flex items-center justify-between gap-2 col-span-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={getMaterialIconUrl(displaySpecialty, 'specialty')}
                          alt={displaySpecialty}
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = BASE_MATERIAL_ICONS.specialty;
                          }}
                        />
                        <span className="text-slate-300 text-xs truncate">
                          {displaySpecialty}
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
            {/* DETAIL: BRANCH 2 - WEAPON (Level & Chọn Vũ Khí)    */}
            {/* -------------------------------------------------- */}
            {effectiveBranch === 'weapon' && (
              <div className="space-y-3">
                {/* Header */}
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

                {/* 1. Thẻ Vũ Khí Hiện Tại & Nút Chọn Vũ Khí (Drawer) */}
                <div className="p-3.5 rounded-2xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.1] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-xl overflow-hidden shrink-0 border relative flex items-center justify-center ${
                        weaponRarity === 5
                          ? 'border-amber-400/50 bg-gradient-to-b from-amber-500/20 to-transparent'
                          : weaponRarity === 4
                          ? 'border-purple-400/50 bg-gradient-to-b from-purple-500/20 to-transparent'
                          : 'border-sky-400/50 bg-gradient-to-b from-sky-500/20 to-transparent'
                      }`}
                    >
                      <img
                        src={tree.weaponBranch.weaponIcon || BASE_MATERIAL_ICONS.weaponAscension}
                        alt={tree.weaponBranch.weaponName}
                        className="w-full h-full object-contain p-0.5"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = BASE_MATERIAL_ICONS.weaponAscension;
                        }}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-slate-100 truncate">
                        {tree.weaponBranch.weaponName && tree.weaponBranch.weaponName !== 'Vũ Khí'
                          ? tree.weaponBranch.weaponName
                          : 'Chưa Chọn Vũ Khí'}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] font-black tracking-widest text-amber-400">
                          {'★'.repeat(weaponRarity)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans">
                          Lv.{tree.weaponBranch.currentLevel}/90
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsWeaponDrawerOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400/20 to-yellow-500/20 hover:from-amber-400 hover:to-yellow-500 text-amber-300 hover:text-slate-950 font-bold text-xs border border-amber-400/30 hover:border-amber-400 transition-all flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer active:scale-95"
                    title="Mở danh sách chọn vũ khí"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{tree.weaponBranch.weaponName && tree.weaponBranch.weaponName !== 'Vũ Khí' ? 'Đổi Vũ Khí' : 'Chọn Vũ Khí'}</span>
                  </button>
                </div>

                {/* 2. Tùy Chỉnh Level Vũ Khí */}
                <div className="flex items-center justify-between liquid-glass-subtle p-3 rounded-2xl border border-white/[0.08]">
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
                    {[20, 50, 70, 80, 90].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => updateTreeWeaponLevel(tree.id, lvl)}
                        className={`px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
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

                {/* 3. Nguyên Liệu Cần Để Nâng Max (Lv.90) kèm Hình Ảnh */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between px-0.5 pt-1">
                    <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      Nguyên liệu nâng cấp tối đa (Lv.{tree.weaponBranch.currentLevel} → 90):
                    </span>
                    {tree.weaponBranch.currentLevel >= 90 && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Đã tối đa
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* NL 1: Nguyên liệu Bí cảnh (Domain Material) */}
                    <div className="p-2.5 rounded-xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.08] flex items-center justify-between gap-2 col-span-1 sm:col-span-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={tree.weaponBranch.materialIcon || getMaterialIconUrl(tree.weaponBranch.materialName, 'weaponAscension')}
                          alt=""
                          className="w-8 h-8 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0 border border-white/10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = BASE_MATERIAL_ICONS.weaponAscension;
                          }}
                        />
                        <div className="min-w-0">
                          <div className="text-slate-200 text-xs font-semibold truncate">
                            {tree.weaponBranch.materialName || 'Nguyên liệu Bí Cảnh'}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5 font-sans">
                            <Calendar className="w-3 h-3 text-amber-400/80 shrink-0" />
                            <span>
                              {tree.weaponBranch.daysOfWeek && tree.weaponBranch.daysOfWeek.length > 0
                                ? tree.weaponBranch.daysOfWeek.map((d) => (d === 0 ? 'CN' : `T${d + 1}`)).join(', ')
                                : 'Thứ 4, 7, CN'}
                            </span>
                            {isWeaponOpenToday ? (
                              <span className="text-emerald-300 font-bold ml-1">● Mở hôm nay</span>
                            ) : (
                              <span className="text-slate-500 ml-1">Đóng</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-bold text-sky-300 font-sans text-xs">
                          {weaponCost.domainMats.total} cái
                        </div>
                        {weaponCost.domainMats.total > 0 && (
                          <div className="text-[10px] text-slate-400 font-sans tracking-tight">
                            {weaponCost.domainMats.green}🟢 {weaponCost.domainMats.blue}🔵 {weaponCost.domainMats.purple}🟣 {weaponCost.domainMats.gold}🟡
                          </div>
                        )}
                      </div>
                    </div>

                    {/* NL 2: Nguyên liệu Quái Tinh Anh */}
                    <div className="p-2.5 rounded-xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.08] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={tree.weaponBranch.eliteMatIcon || getMaterialIconUrl(tree.weaponBranch.eliteMatName, 'eliteMonster')}
                          alt=""
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0 border border-white/10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = BASE_MATERIAL_ICONS.eliteMonster;
                          }}
                        />
                        <div className="min-w-0">
                          <div className="text-slate-300 text-xs truncate">
                            {tree.weaponBranch.eliteMatName || 'NL Quái Tinh Anh'}
                          </div>
                          <div className="text-[10px] text-slate-500 font-sans">Tinh anh</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-purple-300 font-sans">
                          {weaponCost.eliteMats.total} cái
                        </div>
                        {weaponCost.eliteMats.total > 0 && (
                          <div className="text-[9px] text-slate-400 font-sans">
                            {weaponCost.eliteMats.green}🟢 {weaponCost.eliteMats.blue}🔵 {weaponCost.eliteMats.purple}🟣
                          </div>
                        )}
                      </div>
                    </div>

                    {/* NL 3: Nguyên liệu Quái Thường */}
                    <div className="p-2.5 rounded-xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.08] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={tree.weaponBranch.commonMatIcon || getMaterialIconUrl(tree.weaponBranch.commonMatName, 'commonMonster')}
                          alt=""
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0 border border-white/10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = BASE_MATERIAL_ICONS.commonMonster;
                          }}
                        />
                        <div className="min-w-0">
                          <div className="text-slate-300 text-xs truncate">
                            {tree.weaponBranch.commonMatName || 'NL Quái Thường'}
                          </div>
                          <div className="text-[10px] text-slate-500 font-sans">Quái thường</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-slate-200 font-sans">
                          {weaponCost.commonMats.total} cái
                        </div>
                        {weaponCost.commonMats.total > 0 && (
                          <div className="text-[9px] text-slate-400 font-sans">
                            {weaponCost.commonMats.gray}⚪ {weaponCost.commonMats.green}🟢 {weaponCost.commonMats.blue}🔵
                          </div>
                        )}
                      </div>
                    </div>

                    {/* NL 4: Ma Khoáng Tinh Đúc */}
                    <div className="p-2.5 rounded-xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.08] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={BASE_MATERIAL_ICONS.mysticOre}
                          alt="Ma Khoáng"
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0 border border-white/10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = BASE_MATERIAL_ICONS.weaponAscension;
                          }}
                        />
                        <div className="min-w-0">
                          <div className="text-slate-300 text-xs truncate">Ma Khoáng Tinh Đúc</div>
                          <div className="text-[10px] text-slate-500 font-sans">Cường hóa</div>
                        </div>
                      </div>
                      <span className="font-bold text-cyan-300 shrink-0 font-sans">
                        {weaponCost.mysticOre.toLocaleString()} viên
                      </span>
                    </div>

                    {/* NL 5: Mora Cần */}
                    <div className="p-2.5 rounded-xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.08] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={BASE_MATERIAL_ICONS.mora}
                          alt="Mora"
                          className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0 border border-white/10"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="min-w-0">
                          <div className="text-slate-300 text-xs truncate">Tổng Mora</div>
                          <div className="text-[10px] text-slate-500 font-sans">Đột phá + EXP</div>
                        </div>
                      </div>
                      <span className="font-bold text-yellow-300 shrink-0 font-sans">
                        {weaponCost.totalMora.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------- */}
            {/* DETAIL: BRANCH 3 - TALENTS (3 Separate Skills)    */}
            {/* -------------------------------------------------- */}
            {effectiveBranch === 'talent' && (
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
                  <div className="flex items-center justify-between p-2.5 rounded-xl liquid-glass-subtle border border-white/[0.08]">
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
                  <div className="flex items-center justify-between p-2.5 rounded-xl liquid-glass-subtle border border-white/[0.08]">
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
                  <div className="flex items-center justify-between p-2.5 rounded-xl liquid-glass-subtle border border-white/[0.08]">
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
                  <div className="p-2.5 rounded-xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.08] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={BASE_MATERIAL_ICONS.talentBook}
                        alt="Talent Book"
                        className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
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
                  <div className="p-2.5 rounded-xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.08] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={getMaterialIconUrl(displayWeeklyBossMat, 'bossDrop')}
                        alt={displayWeeklyBossMat}
                        className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = BASE_MATERIAL_ICONS.bossDrop;
                        }}
                      />
                      <span className="text-slate-300 text-xs truncate">
                        {displayWeeklyBossMat}
                      </span>
                    </div>
                    <span className="font-bold text-purple-300 shrink-0 font-sans">
                      {tree.talentBranch.weeklyBossMatsNeeded} cái
                    </span>
                  </div>

                  {/* Vương Miện Trí Thức */}
                  <div className="p-2.5 rounded-xl liquid-glass-subtle liquid-glass-interactive border border-white/[0.08] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={BASE_MATERIAL_ICONS.crown}
                        alt="Crown of Insight"
                        className="w-7 h-7 rounded-lg object-contain bg-slate-800/80 p-0.5 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
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
            {effectiveBranch === 'artifact' && (
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
                <div className="p-3 rounded-2xl liquid-glass-subtle border border-white/[0.08]">
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
                        className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 liquid-glass-subtle liquid-glass-interactive ${
                          piece.isOptimized
                            ? '!bg-emerald-500/[0.12] !border-emerald-500/40'
                            : 'border-white/[0.08]'
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
          </div>
        </div>
      </div>
    </div>

      {/* Slide-in Weapon Selection Drawer from Right */}
      <WeaponSelectionDrawer
        isOpen={isWeaponDrawerOpen}
        onClose={() => setIsWeaponDrawerOpen(false)}
        onSelectWeapon={(weapon) => {
          setTreeWeapon(tree.id, weapon);
        }}
        currentWeaponName={tree.weaponBranch.weaponName}
        characterWeaponType={characterWeaponType}
        characterName={tree.characterName}
      />
    </div>
  );
};
