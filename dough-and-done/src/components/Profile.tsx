import { motion } from 'framer-motion';
import { User, Trophy, Star, Users, Briefcase } from 'lucide-react';
import { useGame } from '../hooks/useGamification';
import { cn } from '../lib/utils';
import { LEVEL_THRESHOLDS } from '../lib/types';

function StatsCard({ 
    icon: Icon, 
    label, 
    value, 
    className 
}: { 
    icon: any; 
    label: string; 
    value: string | number; 
    className?: string 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("bg-white p-6 rounded-2xl shadow-sm border border-bakery-100 flex items-center gap-4", className)}
    >
      <div className="bg-bakery-50 p-3 rounded-xl text-bakery-600">
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-sm font-medium text-bakery-500">{label}</p>
        <p className="text-2xl font-bold text-bakery-900">{value}</p>
      </div>
    </motion.div>
  );
}

export function Profile() {
  const { user, levelProgress } = useGame();
  
  const nextLevelXp = LEVEL_THRESHOLDS[user.level] || (user.xp + 500);
  const xpNeeded = nextLevelXp - user.xp;

  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col gap-8 max-w-4xl mx-auto w-full">
      {/* Header Profile Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8 text-center md:text-left">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-bakery-200 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center relative group">
          <User size={48} className="text-bakery-400 group-hover:scale-110 transition-transform" />
          <div className="absolute bottom-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
            Lvl {user.level}
          </div>
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-bakery-900 mb-2">Master Baker</h1>
          <p className="text-bakery-500 mb-4">"A pinch of patience, a dash of kindness."</p>
          
          <div className="relative w-full max-w-md h-4 bg-bakery-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-orange-400 to-amber-500"
            />
          </div>
          <div className="flex justify-between text-xs font-medium text-bakery-500 mt-2 max-w-md">
            <span>{user.xp} XP</span>
            <span>{xpNeeded} XP to Level {user.level + 1}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard 
            icon={Users} 
            label="Customers Served" 
            value={user.totalCustomersServed} 
        />
        <StatsCard 
            icon={Star} 
            label="Current Streak" 
            value={`${user.streak} Days`} 
            className="border-orange-200 bg-orange-50/30"
        />
        <StatsCard 
            icon={Trophy} 
            label="Achievements Unlocked" 
            value="3/12" 
        />
        <StatsCard 
            icon={Briefcase} 
            label="Tasks Completed" 
            value={user.xp / 10} // Rough estimate
        />
      </div>

      {/* Recent Achievements */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-bakery-800 mb-4">Recent Badges</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3].map((badge) => (
            <div key={badge} className="aspect-square bg-white rounded-xl border border-bakery-100 flex flex-col items-center justify-center p-4 gap-2 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Trophy size={20} />
              </div>
              <span className="text-xs font-medium text-center text-bakery-600">
                Early Riser
              </span>
            </div>
          ))}
            <div className="aspect-square bg-bakery-50 rounded-xl border border-dashed border-bakery-200 flex flex-col items-center justify-center p-4 gap-2 opacity-50">
              <div className="w-12 h-12 bg-bakery-100 rounded-full flex items-center justify-center text-bakery-300">
                <Trophy size={20} />
              </div>
              <span className="text-xs font-medium text-center text-bakery-400">
                Next Badge
              </span>
            </div>
        </div>
      </section>
    </div>
  );
}
