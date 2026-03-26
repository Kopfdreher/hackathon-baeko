import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, MapPin, X, CheckCircle2, Car, ArrowDown, History, Zap } from 'lucide-react';
import { useState } from 'react';

export function AlertDetail({ alert, onClose, onAccept }) {
  const [transport, setTransport] = useState(false);
  const [step, setStep] = useState('info'); // 'info' | 'compare'

  if (!alert) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E2723]/90 backdrop-blur-sm"
      >
        <motion.div
          key={step}
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -10 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-[#FAF6F0] w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/20"
        >
          {/* Header Image/Map Placeholder - Only visible in 'info' step */}
          {step === 'info' && (
            <div className="h-40 bg-orange-50 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-multiply"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] to-transparent"></div>
              
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse shadow-lg shadow-red-500/30 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 fill-current" /> KRITISCH
              </div>
            </div>
          )}

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors backdrop-blur-md shadow-sm z-20"
          >
            <X className="w-5 h-5 text-[#3E2723]" />
          </button>

          {/* CONTENT: STEP 1 - INFO */}
          {step === 'info' && (
            <div className="p-8 space-y-6 -mt-10 relative z-10">
              <div>
                <h2 className="text-3xl font-black text-[#3E2723] leading-none mb-3 font-serif drop-shadow-sm">
                  Filiale Ehrenfeld<br />braucht dich!
                </h2>
                <div className="flex items-center text-[#5D4037]/80 space-x-5 text-sm font-bold uppercase tracking-wide">
                  <div className="flex items-center"><Clock className="w-4 h-4 mr-1.5 text-orange-600" /> 05:00 - 13:00</div>
                  <div className="flex items-center"><MapPin className="w-4 h-4 mr-1.5 text-orange-600" /> Venloer Str.</div>
                </div>
              </div>

              <div className="p-5 bg-white/60 backdrop-blur-md rounded-3xl border border-white/60 flex items-center justify-between shadow-lg shadow-amber-900/5">
                <div>
                  <div className="text-[10px] text-orange-600 font-bold uppercase tracking-widest mb-1">Deine Belohnung</div>
                  <div className="text-3xl font-black text-[#3E2723] font-serif">+40 <span className="text-lg text-[#5D4037]/50 font-sans font-bold">Pkt</span></div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30 rotate-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button 
                  onClick={() => setStep('compare')}
                  className="w-full py-4 bg-[#3E2723] hover:bg-[#2D1B18] active:scale-95 transition-all text-white font-bold rounded-2xl text-lg shadow-xl shadow-[#3E2723]/20 flex items-center justify-center space-x-2 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2">Ich übernehme! 💪</span>
                </button>
                
                <button 
                  onClick={onClose}
                  className="w-full py-3 text-[#5D4037]/60 font-bold text-sm hover:text-[#3E2723] transition-colors"
                >
                  Leider nein, kann nicht
                </button>
              </div>
            </div>
          )}

          {/* CONTENT: STEP 2 - COMPARE */}
          {step === 'compare' && (
            <div className="p-8 pt-20 relative z-10 h-full flex flex-col justify-between">
               
               <div className="text-center mb-6">
                 <h2 className="text-2xl font-black text-[#3E2723] font-serif mb-1">Zeit-Check</h2>
                 <p className="text-sm text-[#5D4037]/60 font-medium">Was sich für dich ändert</p>
               </div>

               {/* Comparison Visual */}
               <div className="space-y-4 relative">
                  {/* Before Card */}
                  <div className="bg-white/40 border border-white/60 p-4 rounded-3xl flex items-center justify-between relative opacity-60 grayscale">
                     <div className="flex items-center gap-3">
                        <div className="bg-slate-200 p-2.5 rounded-xl text-slate-500">
                           <History className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Geplant</div>
                           <div className="text-lg font-bold text-slate-700 font-serif">Frei</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-sm font-medium text-slate-400 decoration-slate-400 line-through">Ganztägig</div>
                     </div>
                  </div>

                  {/* Arrow Connector */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-[45%] z-10 bg-white border border-white p-1.5 rounded-full shadow-md text-orange-500">
                     <ArrowDown className="w-5 h-5" />
                  </div>

                  {/* After Card */}
                  <div className="bg-white border-2 border-orange-500/20 p-5 rounded-3xl flex items-center justify-between shadow-xl shadow-orange-500/10 relative overflow-hidden">
                     <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500"></div>
                     <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600">
                           <Zap className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                           <div className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">Neu: Einsatz</div>
                           <div className="text-xl font-black text-[#3E2723] font-serif">Frühschicht</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-sm font-bold text-[#3E2723]">05:00</div>
                        <div className="text-sm font-bold text-[#3E2723]/60">13:00</div>
                     </div>
                  </div>
               </div>

               {/* Transport Option */}
               <div 
                 onClick={() => setTransport(!transport)}
                 className={`mt-6 p-4 rounded-2xl border transition-all cursor-pointer flex items-center space-x-4 ${transport ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-lg' : 'bg-white border-white/60 hover:border-[#3E2723]/10'}`}
               >
                  <div className={`p-2 rounded-xl ${transport ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                    <Car className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm">Taxi / Uber bestellen</div>
                    <div className={`text-[10px] font-medium uppercase tracking-wide ${transport ? 'text-white/60' : 'text-slate-400'}`}>Kostenfrei</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${transport ? 'border-white bg-white' : 'border-slate-200'}`}>
                    {transport && <div className="w-2.5 h-2.5 bg-[#3E2723] rounded-full" />}
                  </div>
               </div>

               <div className="mt-6 space-y-3">
                 <button 
                   onClick={() => onAccept(transport)}
                   className="w-full py-4 bg-orange-600 hover:bg-orange-700 active:scale-95 transition-all text-white font-bold rounded-2xl text-lg shadow-xl shadow-orange-600/30"
                 >
                   Verbindlich zusagen
                 </button>
                 <button 
                   onClick={() => setStep('info')}
                   className="w-full py-2 text-[#5D4037]/40 font-bold text-xs uppercase tracking-widest hover:text-[#3E2723] transition-colors"
                 >
                   Zurück
                 </button>
               </div>
            </div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
