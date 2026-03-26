import { Calendar as CalendarIcon, Clock, CheckCircle2, Briefcase, Plus, MapPin, ArrowRightLeft, User, Filter, ArrowUpRight, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const MOCK_OFFERS = [
  { id: 1, user: 'Sarah K.', role: 'Verkauf', date: 'Morgen, 22.10.', time: '14:00 - 20:00', location: 'Filiale Neumarkt', points: 25, avatar: 'SK' },
  { id: 2, user: 'Tim B.', role: 'Backshop', date: 'Übermorgen, 23.10.', time: '06:00 - 14:00', location: 'Filiale Ehrenfeld', points: 30, avatar: 'TB', urgent: true },
  { id: 3, user: 'Jonas W.', role: 'Kasse', date: 'Fr, 25.10.', time: '12:00 - 18:00', location: 'Filiale Südstadt', points: 20, avatar: 'JW' },
];

function OfferShiftModal({ onClose }) {
    const [selectedShift, setSelectedShift] = useState(null);
    const [bonusPoints, setBonusPoints] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const myShifts = [
        { id: 101, date: 'Do, 24.10.', time: '06:00 - 14:00', location: 'Filiale Ehrenfeld', role: 'Backshop' },
        { id: 102, date: 'Fr, 25.10.', time: '06:00 - 12:00', location: 'Filiale Neumarkt', role: 'Kasse' }
    ];

    const handleSubmit = () => {
        if (!selectedShift) return;
        setSubmitted(true);
        setTimeout(onClose, 2000);
    };

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
                className="bg-[#FAF6F0] w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl relative border border-white/20"
            >
                 {!submitted ? (
                    <>
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-10"
                        >
                            <X className="w-5 h-5 text-[#3E2723]" />
                        </button>

                        <div className="text-center mb-6 mt-2">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-orange-200">
                                <ArrowRightLeft className="w-8 h-8 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-black text-[#3E2723] font-serif leading-none mb-2">Schicht abgeben</h2>
                            <p className="text-[#5D4037]/70 font-medium text-sm">
                                Wähle eine Schicht zum Tausch
                            </p>
                        </div>

                        <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-1">
                            {myShifts.map((shift) => (
                                <button
                                    key={shift.id}
                                    onClick={() => setSelectedShift(shift.id)}
                                    className={`w-full p-4 rounded-xl text-left transition-all border-2 relative overflow-hidden group ${
                                        selectedShift === shift.id 
                                        ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-lg scale-[1.02]' 
                                        : 'bg-white text-[#5D4037] border-transparent hover:border-[#3E2723]/10 hover:bg-white/50'
                                    }`}
                                >
                                    <div className="flex justify-between items-center relative z-10">
                                        <div>
                                            <div className="font-bold text-sm">{shift.date}</div>
                                            <div className={`text-xs ${selectedShift === shift.id ? 'text-white/60' : 'text-[#5D4037]/60'}`}>{shift.time}</div>
                                            <div className={`text-[10px] uppercase font-bold tracking-wider mt-1 ${selectedShift === shift.id ? 'text-orange-400' : 'text-orange-600'}`}>{shift.location}</div>
                                        </div>
                                        {selectedShift === shift.id && <CheckCircle2 className="w-5 h-5 text-orange-400" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                        
                        {/* Gamification: Add Points */}
                        <div className="bg-white/50 rounded-xl p-4 mb-6 border border-white/60">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#5D4037]/60">Bonus bieten</span>
                                <div className="flex items-center text-orange-600 font-bold text-sm">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    {bonusPoints} Pkt
                                </div>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="50" 
                                step="5" 
                                value={bonusPoints}
                                onChange={(e) => setBonusPoints(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                            />
                            <div className="text-[10px] text-center text-[#5D4037]/40 mt-1 font-medium">Erhöht die Chance auf Übernahme!</div>
                        </div>

                        <button
                            disabled={!selectedShift}
                            onClick={handleSubmit}
                            className={`w-full py-4 font-bold rounded-2xl text-lg shadow-xl transition-all ${
                                selectedShift 
                                ? 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95 shadow-orange-500/30' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                            Angebot erstellen
                        </button>
                    </>
                 ) : (
                    <div className="text-center py-8">
                         <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                          >
                            <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={3} />
                          </motion.div>
                          <h3 className="text-2xl font-black text-[#3E2723] font-serif mb-2">Online!</h3>
                          <p className="text-[#5D4037]/70 font-medium">Deine Schicht wird angeboten.</p>
                    </div>
                 )}
            </motion.div>
        </motion.div>
    );
}

export function ExchangeView({ setUserPoints }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'relevant'
  const [offers, setOffers] = useState(MOCK_OFFERS);
  const [showSuccess, setShowSuccess] = useState(null); // id of accepted offer
  const [showOfferModal, setShowOfferModal] = useState(false);

  const handleAccept = (id) => {
    const offer = offers.find(o => o.id === id);
    setShowSuccess(id);
    setTimeout(() => {
      setOffers(prev => prev.filter(o => o.id !== id));
      setShowSuccess(null);
      if (setUserPoints && offer) setUserPoints(prev => prev + offer.points);
    }, 2000);
  };

  return (
    <div className="pb-32"> {/* Optimized padding for mobile FAB */}
      <AnimatePresence>
         {showOfferModal && <OfferShiftModal onClose={() => setShowOfferModal(false)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-[#3E2723] text-white p-6 pb-8 rounded-b-[2.5rem] shadow-xl mb-6 relative overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[80px] opacity-30 -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500 rounded-full blur-[60px] opacity-20 -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
             <div>
                <h1 className="text-3xl font-black mb-1 font-serif">Tauschbörse</h1>
                <p className="text-amber-200/80 font-medium text-sm">Finde Schichten oder biete deine an</p>
             </div>
             <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center shadow-lg">
                <ArrowRightLeft className="w-6 h-6 text-amber-400" />
             </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex p-1 bg-black/20 backdrop-blur-md rounded-xl">
             <button 
               onClick={() => setFilter('all')}
               className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${filter === 'all' ? 'bg-white text-[#3E2723] shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
             >
               Alle Angebote
             </button>
             <button 
               onClick={() => setFilter('relevant')}
               className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${filter === 'relevant' ? 'bg-white text-[#3E2723] shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
             >
               Für dich
             </button>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-4 relative z-20">
         {/* Floating Title for List */}
         <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-bold text-[#5D4037]/50 uppercase tracking-widest flex items-center">
              <Filter className="w-3 h-3 mr-1.5" />
              {filter === 'all' ? 'Verfügbare Schichten' : 'Passend für Kasse'}
            </h2>
            <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{offers.length}</span>
         </div>

         <AnimatePresence mode='popLayout'>
            {offers.map((offer) => (
               <motion.div
                 key={offer.id}
                 layout
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                 className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-lg shadow-slate-200/50 relative overflow-hidden group"
               >
                  {offer.urgent && (
                     <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-2xl">
                        DRINGEND
                     </div>
                  )}

                  {showSuccess === offer.id ? (
                     <div className="absolute inset-0 bg-green-500 flex flex-col items-center justify-center text-white z-20">
                        <CheckCircle2 className="w-12 h-12 mb-2 animate-bounce" />
                        <span className="font-bold text-lg">Übernommen!</span>
                     </div>
                  ) : null}

                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold border-2 border-white shadow-sm">
                           {offer.avatar}
                        </div>
                        <div>
                           <div className="font-bold text-[#3E2723] text-sm">{offer.user}</div>
                           <div className="text-[10px] text-[#5D4037]/50 font-bold uppercase tracking-wider">{offer.role}</div>
                        </div>
                     </div>
                     <div className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-xl text-xs font-bold border border-amber-100 flex items-center shadow-sm">
                        <ArrowUpRight className="w-3 h-3 mr-1 text-amber-500" />
                        +{offer.points} Pkt
                     </div>
                  </div>

                  <div className="space-y-3 mb-5">
                     <div className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <CalendarIcon className="w-5 h-5 text-orange-500 mr-3" />
                        <div>
                           <div className="font-bold text-[#3E2723] text-sm">{offer.date}</div>
                           <div className="text-xs text-[#5D4037]/60 font-medium">{offer.time}</div>
                        </div>
                     </div>
                     <div className="flex items-center px-3 text-xs font-bold text-[#5D4037]/70">
                        <MapPin className="w-4 h-4 text-slate-400 mr-2" />
                        {offer.location}
                     </div>
                  </div>

                  <button 
                     onClick={() => handleAccept(offer.id)}
                     className="w-full py-3 bg-[#3E2723] hover:bg-[#2D1B18] active:scale-95 transition-all text-white font-bold rounded-xl text-sm shadow-xl shadow-[#3E2723]/20 flex items-center justify-center"
                  >
                     Schicht übernehmen
                  </button>
               </motion.div>
            ))}
         </AnimatePresence>

         {offers.length === 0 && (
            <div className="text-center py-12 text-[#5D4037]/40">
               <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20" />
               <p className="font-medium">Keine offenen Angebote mehr.</p>
            </div>
         )}
      </div>

      {/* FAB to Offer Shift */}
      <div className="fixed bottom-24 right-6 z-30">
        <button 
          onClick={() => setShowOfferModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-2xl shadow-2xl shadow-orange-500/40 flex items-center gap-2 active:scale-95 transition-all border border-white/10"
        >
          <ArrowRightLeft className="w-6 h-6" />
          <span className="font-bold text-sm pr-1">Anbieten</span>
        </button>
      </div>

    </div>
  );
}
