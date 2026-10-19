import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ResinTracker } from './components/ResinTracker';
import { TimelineView } from './components/TimelineView';
import { CompletedList } from './components/CompletedList';
import { AddGoalModal } from './components/AddGoalModal';
import { HoyoSyncModal } from './components/HoyoSyncModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'completed'>('timeline');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isHoyoModalOpen, setIsHoyoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-amber-400/30 selection:text-amber-200 relative overflow-hidden">
      {/* Liquid Glass Background Orbs */}
      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />
      <div className="fixed top-1/4 right-0 w-[30rem] h-[30rem] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 left-1/3 w-[32rem] h-[32rem] rounded-full bg-amber-500/[0.08] blur-[160px] pointer-events-none" />

      {/* Top Navigation */}
      <Navbar
        onOpenHoyoModal={() => setIsHoyoModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 lg:px-8 py-6 relative z-10">
        {/* Real-time Resin & Dailies Bar */}
        <ResinTracker />

        {/* Content depending on selected tab */}
        {activeTab === 'timeline' ? (
          <TimelineView onOpenAddModal={() => setIsAddModalOpen(true)} />
        ) : (
          <CompletedList />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#07090e]/80 backdrop-blur-xl py-6 px-4 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Genshin Note • Lưu trữ cục bộ an toàn trên thiết bị của bạn
          </p>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>Genshin Impact 5.x</span>
            <span>•</span>
            <span>Reset lúc 04:00 AM (UTC+8)</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddGoalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <HoyoSyncModal
        isOpen={isHoyoModalOpen}
        onClose={() => setIsHoyoModalOpen(false)}
      />
    </div>
  );
};

export default App;
