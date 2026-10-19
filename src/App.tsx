import React from 'react';
import { Sidebar } from './components/Sidebar';
import { CharacterRosterView } from './components/CharacterRosterView';
import { TaskTreeTimeline } from './components/TaskTreeTimeline';
import { CompletedList } from './components/CompletedList';
import { useStore } from './store/useStore';
import { APP_VERSION } from './version';

export const App: React.FC = () => {
  const { activeNav } = useStore();

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col md:flex-row selection:bg-amber-400/30 selection:text-amber-200 relative overflow-hidden">
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

      {/* Left Sidebar Navigation (Navbar bên trái) */}
      <Sidebar />

      {/* Right Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col justify-between relative z-10 overflow-y-auto max-h-screen">
        <main className="p-4 lg:p-8">
          {activeNav === 'characters' && <CharacterRosterView />}
          {activeNav === 'timeline' && <TaskTreeTimeline />}
          {activeNav === 'completed' && <CompletedList />}
        </main>

        {/* Ultra-Minimal Footer */}
        <footer className="py-4 text-center text-xs text-slate-500/60 border-t border-white/[0.04]">
          <p className="tracking-wide font-medium flex items-center justify-center gap-2">
            <span>Genshin Note</span>
            <span>•</span>
            <span className="font-mono text-[11px] text-slate-600">v{APP_VERSION}</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
