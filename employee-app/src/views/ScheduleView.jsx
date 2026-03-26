import { Calendar as CalendarIcon, Clock, CheckCircle2, Briefcase, Plus, MapPin, AlertCircle, ChevronRight, CalendarPlus, X, Mic, StopCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const WEEK_DAYS = [
  { day: 'Mo', date: '21.10.', type: 'shift', time: '06:00 - 14:00', location: 'Filiale Neumarkt', role: 'Kasse', past: true },
  { day: 'Di', date: '22.10.', type: 'shift', time: '06:00 - 14:00', location: 'Filiale Neumarkt', role: 'Kasse', today: true },
  { day: 'Mi', date: '23.10.', type: 'standby', time: '08:00 - 20:00', active: true },
  { day: 'Do', date: '24.10.', type: 'shift', time: '06:00 - 14:00', location: 'Filiale Ehrenfeld', role: 'Backshop' },
  { day: 'Fr', date: '25.10.', type: 'free_actionable' }, // Changed to actionable
  { day: 'Sa', date: '26.10.', type: 'free' },
  { day: 'So', date: '27.10.', type: 'free' },
];

function VoiceMemoModal({ onClose }) {
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
                className="bg-[#FAF6F0] w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative border border-white/20 text-center"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full blur-[60px] opacity-20 -mr-10 -mt-10 pointer-events-none"></div>

                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5 text-[#3E2723]" />
                </button>

                <h2 className="text-2xl font-black text-[#3E2723] font-serif mb-8">Sprachnotiz</h2>
                
                {/* Visualizer Mock */}
                <div className="flex justify-center items-center h-16 gap-1.5 mb-8">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2.5 bg-[#3E2723] rounded-full"
                            animate={{ 
                                height: [15, Math.max(20, Math.random() * 60), 15],
                                opacity: [0.4, 0.9, 0.4]
                            }}
                            transition={{ 
                                duration: 0.8 + Math.random() * 0.4, // Randomize duration slightly
                                repeat: Infinity, 
                                repeatType: "mirror",
                                ease: "easeInOut",
                                delay: i * 0.05
                            }}
                        />
                    ))}
                </div>

                <div className="text-4xl font-mono font-bold text-[#3E2723] mb-8 tabular-nums">
                    {formatTime(duration)}
                </div>

                <div className="flex justify-center">
                    <button 
                        onClick={onClose}
                        className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 hover:scale-110 active:scale-95 transition-all group"
                    >
                        <div className="w-8 h-8 bg-white rounded-lg group-hover:rounded-md transition-all"></div>
                    </button>
                </div>
                <div className="mt-4 text-xs font-bold uppercase tracking-widest text-[#5D4037]/50">Aufnahme stoppen</div>
            </motion.div>
        </motion.div>
    );
}

function AvailabilityModal({ onClose }) {
  const [selectedDate, setSelectedDate] = useState('Fr, 25.10.');
  const [selectedTime, setSelectedTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = [
    { id: 'early', label: 'Frühschicht', time: '06:00 - 14:00' },
    { id: 'late', label: 'Spätschicht', time: '14:00 - 22:00' },
    { id: 'all', label: 'Ganztägig', time: 'Flexibel' }
  ];

  const handleSubmit = () => {
    if (!selectedTime) return;
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

            <div className="text-center mb-8 mt-2">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-amber-200">
                <CalendarPlus className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-2xl font-black text-[#3E2723] font-serif leading-none mb-2">Verfügbar?</h2>
              <p className="text-[#5D4037]/70 font-medium text-sm">
                Wann kannst du einspringen?
              </p>
            </div>

            {/* Date Selection (Mock) */}
            <div className="mb-6">
               <div className="text-[10px] font-bold uppercase tracking-widest text-[#5D4037]/40 mb-2">Datum</div>
               <div className="bg-white p-4 rounded-xl border border-slate-100 font-bold text-[#3E2723] flex justify-between items-center shadow-sm">
                  <span>{selectedDate}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
               </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-3 mb-8">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#5D4037]/40">Zeitraum</div>
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedTime(slot.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 relative overflow-hidden group ${
                    selectedTime === slot.id 
                    ? 'bg-[#3E2723] text-white border-[#3E2723] shadow-lg scale-[1.02]' 
                    : 'bg-white text-[#5D4037] border-transparent hover:border-[#3E2723]/10 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                       <div className="font-bold text-sm">{slot.label}</div>
                       <div className={`text-xs font-medium mt-0.5 ${selectedTime === slot.id ? 'text-white/60' : 'text-[#5D4037]/50'}`}>{slot.time}</div>
                    </div>
                    {selectedTime === slot.id && <CheckCircle2 className="w-5 h-5 text-orange-400" />}
                  </div>
                </button>
              ))}
            </div>

            <button
              disabled={!selectedTime}
              onClick={handleSubmit}
              className={`w-full py-4 font-bold rounded-2xl text-lg shadow-xl transition-all ${
                selectedTime 
                ? 'bg-amber-500 text-white hover:bg-amber-600 active:scale-95 shadow-amber-900/20' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Speichern
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
            <h3 className="text-2xl font-black text-[#3E2723] font-serif mb-2">Eingetragen!</h3>
            <p className="text-[#5D4037]/70 font-medium">Deine Verfügbarkeit wurde gespeichert.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function ScheduleView() {
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  return (
    <div className="pb-32"> {/* Increased padding for floating button */}
      <AnimatePresence>
        {showAvailabilityModal && <AvailabilityModal onClose={() => setShowAvailabilityModal(false)} />}
        {showVoiceModal && <VoiceMemoModal onClose={() => setShowVoiceModal(false)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-[#3E2723] text-white p-6 pb-12 rounded-b-[2.5rem] shadow-xl mb-6 relative overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[80px] opacity-30 -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500 rounded-full blur-[60px] opacity-20 -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black mb-2 font-serif">Dein Plan</h1>
            <div className="flex items-center text-amber-200 text-sm font-medium">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Oktober 2026
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-center">
             <div className="text-xs font-bold uppercase tracking-widest text-amber-400">KW</div>
             <div className="text-2xl font-black font-serif">43</div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4 relative z-20">
        
        {WEEK_DAYS.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-stretch gap-3 ${day.past ? 'opacity-60 grayscale' : ''}`}
          >
            {/* Date Badge (Left) */}
            <div className={`flex flex-col items-center justify-center w-14 rounded-2xl flex-shrink-0 border ${
               day.today 
               ? 'bg-orange-500 text-white border-orange-600 shadow-lg shadow-orange-500/30' 
               : 'bg-white border-white/60 text-[#3E2723]'
            }`}>
               <div className={`text-[10px] font-black uppercase tracking-wider ${day.today ? 'opacity-80' : 'opacity-40'}`}>{day.day}</div>
               <div className="text-xl font-black font-serif leading-none mt-0.5">{day.date.split('.')[0]}</div>
            </div>

            {/* Card Content (Right) */}
            <div className={`flex-1 rounded-[1.5rem] p-4 border shadow-sm relative overflow-hidden transition-all group ${
              day.today ? 'ring-2 ring-orange-500/20 shadow-orange-500/10' : ''
            } ${
              day.type === 'shift' 
                ? 'bg-white border-white/60' 
                : day.type === 'standby' 
                  ? 'bg-amber-50/80 border-amber-100' 
                  : day.type === 'free_actionable'
                    ? 'bg-white border-2 border-dashed border-amber-300 hover:bg-amber-50 cursor-pointer'
                    : 'bg-slate-50/50 border-slate-100'
            }`}>
              {day.type === 'shift' && (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center text-[#3E2723] font-black text-lg font-serif">
                       <Clock className="w-4 h-4 mr-2 text-orange-600" />
                       {day.time}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm font-bold text-[#5D4037]">
                      <MapPin className="w-3.5 h-3.5 mr-2 text-amber-500" />
                      {day.location}
                    </div>
                    <div className="pl-[1.4rem] text-xs font-medium text-[#5D4037]/60">
                      {day.role}
                    </div>
                  </div>
                </>
              )}

              {day.type === 'standby' && (
                <>
                  <div className="absolute right-0 top-0 p-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-100 px-2 py-1 rounded-md">Auf Abruf</span>
                  </div>
                  <div className="text-[#3E2723] font-black text-lg font-serif mb-1">{day.time}</div>
                  <div className="flex items-center text-xs text-amber-700/70 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                    Potenzieller Einsatz
                  </div>
                </>
              )}

              {day.type === 'free_actionable' && (
                <div 
                  onClick={() => setShowAvailabilityModal(true)}
                  className="flex items-center justify-between h-full cursor-pointer"
                >
                   <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[#3E2723] font-bold text-sm">Verfügbar?</div>
                        <div className="text-[#5D4037]/50 text-xs">Sag Bescheid</div>
                      </div>
                   </div>
                   <ChevronRight className="w-5 h-5 text-amber-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                </div>
              )}

              {day.type === 'free' && (
                <div className="flex items-center justify-center h-full opacity-40">
                  <span className="text-[#5D4037] font-medium text-sm">Frei</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Add Next Week Placeholder */}
        <div className="pt-4 pb-8">
           <button className="w-full border-2 border-dashed border-slate-200 rounded-[1.5rem] p-4 flex items-center justify-center text-slate-400 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all group">
              <CalendarPlus className="w-5 h-5 mr-2 group-hover:text-slate-500" />
              Nächste Woche planen
           </button>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-6 left-6 z-30 flex justify-between items-end pointer-events-none">
        
        {/* Voice Button (Left) */}
        <button 
          onClick={() => setShowVoiceModal(true)}
          className="bg-white hover:bg-slate-50 text-[#3E2723] p-4 rounded-2xl shadow-xl shadow-black/5 flex items-center justify-center active:scale-95 transition-all border border-white/40 pointer-events-auto"
        >
          <Mic className="w-6 h-6 text-red-500" />
        </button>

        {/* Availability Button (Right) */}
        <button 
          onClick={() => setShowAvailabilityModal(true)}
          className="bg-[#3E2723] hover:bg-[#2D1B18] text-white p-4 rounded-2xl shadow-2xl shadow-[#3E2723]/40 flex items-center gap-2 active:scale-95 transition-all border border-white/10 pointer-events-auto"
        >
          <Plus className="w-6 h-6" />
          <span className="font-bold text-sm pr-1">Verfügbar</span>
        </button>
      </div>

    </div>
  );
}
