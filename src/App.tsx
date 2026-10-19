import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ResinTracker } from './components/ResinTracker';
import { TimelineView } from './components/TimelineView';
import { CompletedList } from './components/CompletedList';
import { AddGoalModal } from './components/AddGoalModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'completed'>('timeline');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-amber-400/30 selection:text-amber-200 relative overflow-hidden">
      {/* Liquid Glass Background - Animated Floating Water Droplets / Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Blob 1: Top-Left Deep Indigo / Purple */}
        <div className="absolute -top-24 -left-24 w-[34rem] h-[34rem] rounded-full bg-gradient-to-br from-indigo-600/20 via-purple-600/15 to-transparent blur-[110px] animate-bubble-1" />
        
        {/* Blob 2: Right Cyan / Emerald Water Droplet */}
        <div className="absolute top-1/3 -right-20 w-[36rem] h-[36rem] rounded-full bg-gradient-to-bl from-cyan-500/15 via-teal-500/10 to-transparent blur-[130px] animate-bubble-2" />
        
        {/* Blob 3: Bottom Warm Amber / Rose Glow */}
        <div className="absolute -bottom-20 left-1/4 w-[38rem] h-[38rem] rounded-full bg-gradient-to-tr from-amber-500/10 via-rose-500/10 to-transparent blur-[140px] animate-bubble-3" />

        {/* Small floating specular water highlights */}
        <div className="absolute top-1/4 left-1/2 w-48 h-48 rounded-full bg-cyan-400/10 blur-[80px] animate-bubble-subtle" />
      </div>

      {/* Top Navigation */}
      <Navbar
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

      {/* Ultra-Minimal Footer */}
      <footer className="py-6 text-center text-xs text-slate-500/80 relative z-10">
        <p className="tracking-wide font-medium">Genshin Note</p>
      </footer>

      {/* Add Goal Modal */}
      <AddGoalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default App;
