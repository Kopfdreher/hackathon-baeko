import { Home, Calendar, User, ChefHat } from 'lucide-react';

interface NavigationProps {
  activeTab: 'dashboard' | 'calendar' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'calendar' | 'profile') => void;
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-bakery-200 px-6 py-4 flex justify-around items-center md:relative md:flex-col md:w-64 md:h-screen md:border-r md:border-t-0 md:justify-start md:gap-8 md:pt-12 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:shadow-none z-50">
      
      <div className="hidden md:flex items-center gap-3 px-4 mb-8">
        <div className="bg-bakery-500 p-2 rounded-xl">
            <ChefHat className="w-8 h-8 text-white" />
        </div>
        <span className="text-xl font-bold text-bakery-800">Dough & Done</span>
      </div>

      <button 
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:px-4 md:py-3 rounded-xl w-full transition-all ${activeTab === 'dashboard' ? 'text-bakery-600 bg-bakery-50 md:bg-bakery-100' : 'text-bakery-400 hover:text-bakery-600 hover:bg-bakery-50'}`}
      >
        <Home className={`w-6 h-6 ${activeTab === 'dashboard' ? 'fill-current' : ''}`} />
        <span className="text-xs md:text-sm font-medium">Dashboard</span>
      </button>

      <button 
        onClick={() => setActiveTab('calendar')}
        className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:px-4 md:py-3 rounded-xl w-full transition-all ${activeTab === 'calendar' ? 'text-bakery-600 bg-bakery-50 md:bg-bakery-100' : 'text-bakery-400 hover:text-bakery-600 hover:bg-bakery-50'}`}
      >
        <Calendar className={`w-6 h-6 ${activeTab === 'calendar' ? 'fill-current' : ''}`} />
        <span className="text-xs md:text-sm font-medium">Calendar</span>
      </button>

      <button 
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:px-4 md:py-3 rounded-xl w-full transition-all ${activeTab === 'profile' ? 'text-bakery-600 bg-bakery-50 md:bg-bakery-100' : 'text-bakery-400 hover:text-bakery-600 hover:bg-bakery-50'}`}
      >
        <User className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-current' : ''}`} />
        <span className="text-xs md:text-sm font-medium">Profile</span>
      </button>
    </nav>
  );
}
