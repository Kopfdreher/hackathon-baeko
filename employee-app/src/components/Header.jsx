import { Flame, Star, ToggleLeft, ToggleRight, User } from 'lucide-react';

export function Header({ streak, points, standby, onToggleStandby }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm shadow-amber-900/5 transition-all">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Avatar & Name */}
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20 border-2 border-white">
             <User className="w-6 h-6" />
           </div>
           <div className="flex flex-col">
              <span className="text-sm font-bold text-[#3E2723]">Max Mustermann</span>
              <span className="text-[10px] text-[#5D4037]/50 font-medium uppercase tracking-wider">Filiale Köln-Nippes</span>
           </div>
        </div>

        {/* Right: Level Badge */}
        <div className="bg-amber-100/50 border border-amber-200/50 px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
           <span className="text-xs font-black text-[#3E2723] uppercase tracking-wide">Level 5</span>
        </div>
      </div>
    </header>
  );
}
