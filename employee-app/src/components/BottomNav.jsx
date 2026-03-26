import { Home, Trophy, User, Calendar, ArrowRightLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

export function BottomNav() {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Plan', path: '/schedule' },
    { icon: ArrowRightLeft, label: 'Tausch', path: '/exchange' },
    { icon: Trophy, label: 'Rewards', path: '/rewards' },
    { icon: User, label: 'Profil', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-amber-100 safe-area-bottom z-50 shadow-2xl shadow-amber-900/20">
      <div className="flex justify-around items-center h-20 pb-4 pt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-300 relative",
                isActive ? "text-[#FF6F00]" : "text-[#5D4037]/40 hover:text-[#5D4037]/70"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute top-0 w-8 h-1 rounded-b-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_4px_12px_rgba(251,191,36,0.6)]" />
                )}
                <item.icon className={cn("w-5 h-5 transition-transform", isActive && "scale-110")} strokeWidth={isActive ? 3 : 2} />
                <span className="text-[9px] font-bold uppercase tracking-wide">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
