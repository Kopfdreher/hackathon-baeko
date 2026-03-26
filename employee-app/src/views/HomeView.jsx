import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Bell, ChevronRight, ToggleLeft, ToggleRight, Loader2, Sparkles, CheckCircle, Trophy, Zap, Car, UserX, MapPin, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AlertDetail } from '../components/AlertDetail';

import { Header } from '../components/Header';

const MOCK_ALERT = {
  id: 1,
  title: 'Filiale Ehrenfeld braucht dich!',
  time: '05:00 - 13:00',
  location: 'Venloer Str.',
  points: 40,
  critical: true,
};

function SuccessView({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#3E2723] flex flex-col items-center justify-center p-6 text-center text-white"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.5)] border-4 border-white"
      >
        <CheckCircle className="w-16 h-16 text-white" strokeWidth={3} />
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-black mb-4 font-serif"
      >
        Super!
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-white/80 font-medium mb-12 max-w-xs"
      >
        Wir freuen uns auf dich.<br/>Dein Einsatz wurde bestätigt!
      </motion.p>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-12">
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.6 }}
           className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
        >
           <Trophy className="w-8 h-8 text-amber-400 mb-2 mx-auto" />
           <div className="text-2xl font-black">+40</div>
           <div className="text-[10px] uppercase tracking-widest opacity-60">Punkte</div>
        </motion.div>
        
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.7 }}
           className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
        >
           <Zap className="w-8 h-8 text-orange-400 mb-2 mx-auto" />
           <div className="text-2xl font-black">+1</div>
           <div className="text-[10px] uppercase tracking-widest opacity-60">Streak</div>
        </motion.div>
      </div>
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onClose}
        className="w-full max-w-xs py-4 bg-white text-[#3E2723] font-bold rounded-2xl text-lg shadow-xl hover:bg-amber-50 active:scale-95 transition-all"
      >
        Zurück zum Home
      </motion.button>
    </motion.div>
  );
}

function MissingColleagueModal({ onClose }) {
    const [selectedBranch, setSelectedBranch] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isLocating, setIsLocating] = useState(true);

    const branches = [
        'Filiale Neumarkt',
        'Filiale Ehrenfeld',
        'Filiale Köln-Nippes',
        'Filiale Südstadt'
    ];

    useEffect(() => {
        // Simulate GPS Location finding
        const timer = setTimeout(() => {
            setIsLocating(false);
            setSelectedBranch('Filiale Ehrenfeld');
        }, 1500);
        
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = () => {
        if (!selectedBranch) return;
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
                        <div className="relative w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-red-200">
                            <UserX className="w-8 h-8 text-red-500" />
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-md border border-slate-100">
                                {isLocating ? (
                                    <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                                ) : (
                                    <MapPin className="w-4 h-4 text-green-500 fill-green-500" />
                                )}
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-[#3E2723] font-serif leading-none mb-1">Kollege fehlt?</h2>
                        
                        {isLocating ? (
                           <div className="text-orange-600 text-[10px] font-bold uppercase tracking-widest animate-pulse flex items-center justify-center gap-1 mt-1">
                               Standort wird ermittelt...
                           </div>
                        ) : (
                           <div className="text-green-600 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 mt-1">
                               Standort erkannt
                           </div>
                        )}
                    </div>

                    <div className="space-y-3 mb-8">
                        {branches.map((branch) => (
                            <button
                                key={branch}
                                onClick={() => setSelectedBranch(branch)}
                                className={`w-full p-4 rounded-xl text-left font-bold text-sm transition-all border-2 relative overflow-hidden group ${
                                    selectedBranch === branch 
                                    ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-lg scale-[1.02]' 
                                    : 'bg-white text-[#5D4037] border-transparent hover:border-[#3E2723]/10 hover:bg-white/50'
                                }`}
                            >
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${selectedBranch === branch ? 'bg-orange-500' : 'bg-slate-200'}`}></div>
                                        <span>{branch}</span>
                                    </div>
                                    {selectedBranch === branch && <CheckCircle className="w-5 h-5 text-orange-400" />}
                                </div>
                                {selectedBranch === branch && !isLocating && branch === 'Filiale Ehrenfeld' && (
                                     <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        disabled={!selectedBranch}
                        onClick={handleSubmit}
                        className={`w-full py-4 font-bold rounded-2xl text-lg shadow-xl transition-all ${
                            selectedBranch 
                            ? 'bg-red-600 text-white hover:bg-red-700 active:scale-95 shadow-red-900/20' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                    >
                        Meldung absenden
                    </button>
                </>
             ) : (
                <div className="text-center py-8">
                     <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                      >
                        <CheckCircle className="w-10 h-10 text-white" strokeWidth={3} />
                      </motion.div>
                      <h3 className="text-2xl font-black text-[#3E2723] font-serif mb-2">Danke!</h3>
                      <p className="text-[#5D4037]/70 font-medium">Wir kümmern uns darum.</p>
                </div>
             )}
        </motion.div>
      </motion.div>
    );
}

export function HomeView({ userPoints, setUserPoints }) {
  const [standby, setStandby] = useState(true);
  const [activeAlert, setActiveAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMissingModal, setShowMissingModal] = useState(false);
  const [transportSelected, setTransportSelected] = useState(false);

  const handleAlertClick = () => {
    setActiveAlert(MOCK_ALERT);
  };

  const handleAccept = (withTransport) => {
    setLoading(true);
    setTransportSelected(withTransport);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setActiveAlert(null);
      setShowSuccess(true);
      setUserPoints(prev => prev + 40); // Award points!
    }, 2000);
  };
  
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div className="flex flex-col h-full min-h-screen pb-24">
      <Header streak={12} points={980} standby={standby} onToggleStandby={() => setStandby(!standby)} />
      
      <section className="px-6 pt-8 pb-4 space-y-8 flex-1">
        
        {/* HERO ALERT */}
        <div onClick={handleAlertClick} className="cursor-pointer group relative">
           <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
           
           <div className="relative bg-white/90 backdrop-blur-xl border border-red-100 rounded-[2.2rem] p-6 shadow-2xl shadow-red-900/10 overflow-hidden">
             
             {/* Background Pattern */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
             
             <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-2">
                   <div className="bg-red-50 text-red-600 p-2 rounded-full animate-pulse">
                      <Bell className="w-6 h-6 fill-current" />
                   </div>
                   <span className="text-red-600 font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">Dringend</span>
                </div>
                <div className="text-right">
                   <span className="block text-3xl font-black text-[#3E2723] font-serif leading-none">+40</span>
                   <span className="text-[10px] text-[#5D4037]/50 font-bold uppercase tracking-wider">Punkte</span>
                </div>
             </div>
             
             <h2 className="text-3xl font-black text-[#3E2723] font-serif leading-tight mb-2">
                Filiale Ehrenfeld<br/>braucht dich!
             </h2>
             <p className="text-[#5D4037]/70 font-medium text-lg mb-6">
                Backshop • Frühschicht
             </p>
             
             <div className="w-full py-4 bg-[#3E2723] text-white font-bold rounded-2xl text-center shadow-lg shadow-[#3E2723]/20 flex items-center justify-center space-x-2 group-hover:scale-[1.02] transition-transform">
                <span>Ich übernehme! 💪</span>
             </div>
           </div>
        </div>

        {/* Next Shift */}
        <div>
          <h2 className="text-sm font-bold text-[#5D4037]/40 uppercase tracking-widest mb-4 ml-2">Nächste Schicht</h2>
          <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 shadow-lg shadow-amber-900/5 border border-white/60 flex items-center space-x-5 hover:bg-white/80 transition-colors cursor-pointer group">
             <div className="bg-amber-100/50 p-4 rounded-2xl text-amber-700 group-hover:rotate-3 transition-transform duration-300">
               <Calendar className="w-7 h-7" />
             </div>
             <div className="flex-1">
               <div className="font-bold text-[#3E2723] text-xl font-serif">Morgen, 06:00</div>
               <div className="text-sm text-[#5D4037]/60 font-medium mt-0.5">Filiale Neumarkt • Kasse</div>
             </div>
             <ChevronRight className="w-6 h-6 text-amber-900/20 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* Footer Status & Standby */}
      <section className="px-6 mt-auto">
        <button 
          onClick={() => setShowMissingModal(true)}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all p-5 rounded-[2rem] flex items-center justify-center space-x-3 group shadow-xl shadow-red-900/20"
        >
           <UserX className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
           <span className="text-white font-bold text-base uppercase tracking-widest">Kollege vermisst?</span>
        </button>
      </section>

      {/* Alert Modal */}
      {activeAlert && (
        <AlertDetail 
          alert={activeAlert} 
          onClose={() => setActiveAlert(null)}
          onAccept={handleAccept}
        />
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[60] bg-[#FAF6F0]/90 backdrop-blur-md flex items-center justify-center">
          <div className="flex flex-col items-center">
             <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
             <div className="text-[#3E2723] font-bold font-serif text-xl">
               {transportSelected ? 'Uber wird bestellt...' : 'Schicht wird gebucht...'}
             </div>
          </div>
        </div>
      )}
      
      {/* Success View */}
      <AnimatePresence>
        {showSuccess && <SuccessView onClose={handleCloseSuccess} />}
        {showMissingModal && <MissingColleagueModal onClose={() => setShowMissingModal(false)} />}
      </AnimatePresence>

    </div>
  );
}


