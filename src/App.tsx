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
    <div className="min-h-screen bg-[#0b0e17] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation */}
      <Navbar
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenHoyoModal={() => setIsHoyoModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
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
      <footer className="border-t border-slate-900 bg-[#090c14] py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Genshin Note • Lưu trữ cục bộ an toàn trên thiết bị của bạn • Hỗ trợ Vercel Serverless
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Dữ liệu Genshin Impact 5.x</span>
            <span>•</span>
            <span>Reset lúc 04:00 AM (Asia/UTC+8)</span>
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
