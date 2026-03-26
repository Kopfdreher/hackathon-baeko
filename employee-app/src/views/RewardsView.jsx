import { Trophy, Users, Star, Lock, ShoppingBag, Gift, Ticket, Coffee, CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SHOP_ITEMS = [
  { id: 1, title: 'Gratis Kaffee', cost: 150, icon: <Coffee className="w-6 h-6" />, color: 'bg-amber-100 text-amber-700' },
  { id: 2, title: 'Frühstück', cost: 450, icon: <Ticket className="w-6 h-6" />, color: 'bg-orange-100 text-orange-700' },
  { id: 3, title: 'Wunsch-Schicht', cost: 800, icon: <Star className="w-6 h-6" />, color: 'bg-red-100 text-red-700' },
  { id: 4, title: 'Kino Gutschein', cost: 1200, icon: <Gift className="w-6 h-6" />, color: 'bg-purple-100 text-purple-700' },
];

const LEADERBOARD = [
  { rank: 1, name: 'Lena M.', points: 1250, avatar: 'LM' },
  { rank: 2, name: 'Tim B.', points: 1180, avatar: 'TB' },
  { rank: 3, name: 'Sarah K.', points: 1100, avatar: 'SK' },
  { rank: 4, name: 'Du', points: 980, avatar: 'D', me: true },
  { rank: 5, name: 'Jonas W.', points: 850, avatar: 'JW' },
];

function PurchaseModal({ item, onClose, onConfirm }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#3E2723]/90 backdrop-blur-md flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#FAF6F0] w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl relative border border-white/20 text-center"
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5 text-[#3E2723]" />
                </button>

                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${item.color} shadow-lg scale-110`}>
                    {item.icon}
                </div>

                <h2 className="text-2xl font-black text-[#3E2723] font-serif mb-2">Einlösen?</h2>
                <p className="text-[#5D4037]/70 font-medium mb-6">
                    Möchtest du <strong className="text-[#3E2723]">{item.title}</strong> für <span className="font-bold text-orange-600">{item.cost} Punkte</span> kaufen?
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 font-bold text-[#5D4037] bg-slate-200 rounded-2xl hover:bg-slate-300 transition-colors"
                    >
                        Abbrechen
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-4 font-bold text-white bg-orange-500 rounded-2xl hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-transform active:scale-95"
                    >
                        Kaufen
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function RewardsView({ userPoints, setUserPoints }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleItemClick = (item) => {
      if (userPoints >= item.cost) {
          setSelectedItem(item);
      }
  };

  const handleConfirmPurchase = () => {
      if (!selectedItem) return;
      setUserPoints(prev => prev - selectedItem.cost);
      setSelectedItem(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="pb-24">
      <AnimatePresence>
          {selectedItem && (
              <PurchaseModal 
                  item={selectedItem} 
                  onClose={() => setSelectedItem(null)} 
                  onConfirm={handleConfirmPurchase} 
              />
          )}
          {showSuccess && (
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[90] bg-green-500 text-white px-6 py-3 rounded-full shadow-xl font-bold flex items-center gap-2 whitespace-nowrap"
               >
                  <CheckCircle2 className="w-5 h-5" />
                  Kauf erfolgreich!
               </motion.div>
          )}
      </AnimatePresence>

      <div className="bg-[#3E2723] text-white p-6 pb-20 rounded-b-[2.5rem] shadow-xl relative overflow-hidden border-b border-white/10">
         <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[80px] opacity-40 -mr-20 -mt-20 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500 rounded-full blur-[60px] opacity-30 -ml-10 -mb-10 pointer-events-none"></div>
         
         <div className="relative z-10 flex items-center justify-between mb-6 mt-2">
            <div>
              <h1 className="text-3xl font-black mb-1 font-serif tracking-tight">Level 5</h1>
              <p className="text-amber-400 font-bold uppercase tracking-widest text-xs">Master Baker</p>
            </div>
            <div className="w-14 h-14 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center text-amber-400">
               <Trophy className="w-7 h-7" />
            </div>
         </div>
         
         <div className="relative z-10">
            <div className="flex justify-between items-end text-sm font-bold opacity-80 mb-2">
               <span className="text-white text-base transition-all duration-500 key={userPoints}">{userPoints} Pkt</span>
               <span className="text-xs font-normal opacity-50 mb-1">1200 Ziel</span>
            </div>
            <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
               <div 
                 className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.6)] transition-all duration-1000 ease-out"
                 style={{ width: `${(userPoints / 1200) * 100}%` }}
               ></div>
            </div>
         </div>
      </div>

      <div className="px-6 -mt-12 relative z-20 space-y-6">
        
        {/* Shop Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-5 shadow-lg shadow-amber-900/5 border border-white/60">
           <h2 className="text-xs font-bold text-[#5D4037]/60 uppercase tracking-widest mb-4 flex items-center justify-between">
             <div className="flex items-center"><ShoppingBag className="w-4 h-4 mr-2 text-amber-500" /> Shop</div>
             <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{userPoints} Pkt verfügbar</span>
           </h2>
           <div className="grid grid-cols-2 gap-3">
              {SHOP_ITEMS.map((item) => (
                 <button 
                    key={item.id} 
                    onClick={() => handleItemClick(item)}
                    disabled={userPoints < item.cost}
                    className={`bg-white border border-amber-100 rounded-2xl p-3 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-all relative overflow-hidden group text-left w-full ${userPoints >= item.cost ? 'active:scale-95 cursor-pointer' : 'opacity-80 cursor-not-allowed grayscale-[0.5]'}`}
                 >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${item.color} ${userPoints >= item.cost ? 'group-hover:scale-110' : ''} transition-transform`}>
                       {item.icon}
                    </div>
                    <div className="text-center w-full">
                       <div className="text-xs font-bold text-[#3E2723] leading-tight mb-1 truncate w-full">{item.title}</div>
                       <div className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full inline-block">{item.cost} Pkt</div>
                    </div>
                    {userPoints >= item.cost ? (
                       <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                       <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Lock className="w-6 h-6 text-gray-400" />
                       </div>
                    )}
                 </button>
              ))}
           </div>
        </div>

        {/* Badges - Horizontal Scroll Optimized */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-5 shadow-lg shadow-amber-900/5 border border-white/60">
           <h2 className="text-xs font-bold text-[#5D4037]/60 uppercase tracking-widest mb-4 flex items-center">
             <Star className="w-4 h-4 mr-2 text-amber-500" /> Badges
           </h2>
           <div className="flex space-x-3 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide snap-x snap-mandatory">
              <div className="snap-center flex-shrink-0 w-24 flex flex-col items-center space-y-2 p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm rotate-3">🔥</div>
                 <span className="text-[10px] font-bold text-center leading-tight text-[#3E2723] uppercase tracking-wide">Streak<br/>Master</span>
              </div>
              <div className="snap-center flex-shrink-0 w-24 flex flex-col items-center space-y-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 grayscale opacity-60">
                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#5D4037]/40 shadow-inner -rotate-2">
                    <Lock className="w-5 h-5" />
                 </div>
                 <span className="text-[10px] font-bold text-center leading-tight text-[#5D4037] uppercase tracking-wide">Retter<br/>in Not</span>
              </div>
              <div className="snap-center flex-shrink-0 w-24 flex flex-col items-center space-y-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 grayscale opacity-60">
                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#5D4037]/40 shadow-inner rotate-1">
                    <Lock className="w-5 h-5" />
                 </div>
                 <span className="text-[10px] font-bold text-center leading-tight text-[#5D4037] uppercase tracking-wide">Früh-<br/>aufsteher</span>
              </div>
           </div>
        </div>

        {/* Leaderboard - Clean List */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-lg shadow-amber-900/5 border border-white/60 overflow-hidden">
           <div className="p-5 border-b border-amber-100/50 bg-amber-50/30 flex justify-between items-center sticky top-0 backdrop-blur-sm">
              <h2 className="text-xs font-bold text-[#5D4037] uppercase tracking-widest flex items-center">
                 <Users className="w-4 h-4 mr-2 text-amber-600" /> Top 5 Region
              </h2>
              <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full uppercase tracking-wide border border-orange-200">Köln-West</span>
           </div>
           <div className="divide-y divide-amber-50/50">
              {LEADERBOARD.map((user, i) => (
                 <div key={i} className={`flex items-center p-4 ${user.me ? 'bg-amber-50/80 relative overflow-hidden' : ''}`}>
                    {user.me && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>}
                    
                    <div className={`w-8 text-center font-black text-lg ${i < 3 ? 'text-orange-500 drop-shadow-sm' : 'text-[#5D4037]/30'}`}>{user.rank}</div>
                    
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-50 mx-3 flex items-center justify-center text-xs font-bold text-[#5D4037] border border-white shadow-sm ring-2 ring-white">
                       {user.avatar}
                    </div>
                    
                    <div className="flex-1 min-w-0 mr-2">
                       <div className="font-bold text-[#3E2723] truncate text-sm">{user.name}</div>
                       {user.me && <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Das bist du!</div>}
                    </div>
                    
                    <div className="font-mono text-sm font-bold text-[#5D4037]/70 bg-white/50 px-2 py-1 rounded-lg border border-white/50">{user.points}</div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
