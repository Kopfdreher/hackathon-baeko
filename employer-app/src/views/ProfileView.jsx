import { User, Bell, Clock, Settings, LogOut, ChevronRight, Award, Zap, Coffee, QrCode } from 'lucide-react';

const SKILLS = [
   { name: 'Führung', level: 'Pro', icon: <User className="w-4 h-4" /> },
   { name: 'Planung', level: 'Master', icon: <Zap className="w-4 h-4" /> },
   { name: 'Hygiene', level: 'Advanced', icon: <Coffee className="w-4 h-4" /> },
];

export default function ProfileView() {
  const userPoints = 1250; // Mock points for manager

  return (
    <div className="pb-24 bg-[#FAF6F0] min-h-screen">
      <div className="bg-[#3E2723] text-white p-8 pb-32 rounded-b-[3rem] shadow-xl mb-6 relative overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[80px] opacity-30 -mr-20 -mt-20 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500 rounded-full blur-[60px] opacity-20 -ml-10 -mb-10 pointer-events-none"></div>
         <div className="relative z-10 flex justify-between items-start">
             <h1 className="text-3xl font-black mb-8 font-serif">Profil</h1>
             <Settings className="w-6 h-6 text-white/50" />
         </div>
      </div>

      <div className="px-6 space-y-4 -mt-36 relative z-20">
        
        {/* Digital ID Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-6 text-white relative overflow-hidden shadow-2xl border border-white/20 mb-6 aspect-[1.58/1]">
           {/* Card Background Effects */}
           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/30 rounded-full blur-3xl"></div>
           
           <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                 <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center text-2xl font-black shadow-lg border-2 border-white/20 text-[#3E2723]">
                       AF
                    </div>
                    <div>
                       <h2 className="text-xl font-bold font-serif leading-none mb-1">Anna Filiale</h2>
                       <div className="text-white/60 text-xs font-medium uppercase tracking-wider">Personal-ID: 1001</div>
                    </div>
                 </div>
                 <div className="bg-white p-1 rounded-lg">
                    <QrCode className="w-8 h-8 text-[#3E2723]" />
                 </div>
              </div>

              <div className="flex justify-between items-end">
                 <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Position</div>
                    <div className="font-bold text-lg">Gebietsleitung</div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Status</div>
                    <div className="font-black text-xl italic text-amber-300">MASTER</div>
                    <div className="text-[10px] font-mono text-white/60 mt-1">{userPoints} PKT</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Skills & Stats */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 shadow-lg shadow-amber-900/5 border border-white/60">
           <h2 className="text-xs font-bold text-[#5D4037]/60 uppercase tracking-widest mb-4 flex items-center">
             <Award className="w-4 h-4 mr-2 text-amber-500" /> Skills
           </h2>
           <div className="flex space-x-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
              {SKILLS.map((skill, i) => (
                 <div key={i} className="flex items-center space-x-2 bg-white border border-amber-100 px-3 py-2 rounded-xl shadow-sm flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                       {skill.icon}
                    </div>
                    <div>
                       <div className="text-xs font-bold text-[#3E2723]">{skill.name}</div>
                       <div className="text-[10px] text-orange-600 font-bold uppercase tracking-wide">{skill.level}</div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-lg shadow-amber-900/5 border border-white/60 divide-y divide-amber-50">
          <div className="p-5 flex items-center justify-between cursor-pointer group hover:bg-white/50 transition-colors">
            <div className="flex items-center text-[#3E2723] font-bold">
              <Bell className="w-5 h-5 mr-4 text-orange-500" /> Benachrichtigungen
            </div>
            <div className="flex items-center">
              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded mr-3 uppercase tracking-wide">ON</span>
              <ChevronRight className="w-4 h-4 text-[#5D4037]/30" />
            </div>
          </div>
          <div className="p-5 flex items-center justify-between cursor-pointer group hover:bg-white/50 transition-colors">
            <div className="flex items-center text-[#3E2723] font-bold">
              <Clock className="w-5 h-5 mr-4 text-orange-500" /> Verfügbarkeit
            </div>
            <ChevronRight className="w-4 h-4 text-[#5D4037]/30" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-lg shadow-amber-900/5 border border-white/60 divide-y divide-amber-50">
          <div className="p-5 flex items-center justify-between cursor-pointer group hover:bg-red-50/50 transition-colors">
            <div className="flex items-center text-red-600 font-bold">
              <LogOut className="w-5 h-5 mr-4 opacity-50" /> Abmelden
            </div>
          </div>
        </div>

        <div className="text-center text-[10px] font-bold uppercase tracking-widest text-[#5D4037]/30 mt-8 pb-8">
          Version 1.0.3 (Build 45)
        </div>
      </div>
    </div>
  );
}
