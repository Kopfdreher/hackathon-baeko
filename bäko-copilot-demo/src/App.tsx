import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import { Mic, Camera, MessageSquare, Sparkles, CheckCircle, TrendingUp, AlertTriangle, Lightbulb, Clock, ShieldCheck, ChevronRight, Check, RefreshCw, Wheat, Croissant, ChefHat } from 'lucide-react';

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number, suffix?: string, prefix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => prefix + Math.round(latest) + suffix);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
}

export default function App() {
  const [appState, setAppState] = useState<'idle' | 'inputting' | 'processing' | 'results' | 'confirmed'>('idle');
  const [inputType, setInputType] = useState<'voice' | 'photo' | 'text' | null>(null);

  const handleInputClick = (type: 'voice' | 'photo' | 'text') => {
    setInputType(type);
    setAppState('inputting');
    
    setTimeout(() => {
      setAppState('processing');
      
      setTimeout(() => {
        setAppState('results');
      }, 3500);
    }, 2500);
  };

  const reset = () => {
    setAppState('idle');
    setInputType(null);
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#3E2723] font-sans overflow-hidden relative selection:bg-amber-200">
      {/* Background decorative elements - Bakery / Flour / Warmth inspired */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-200/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-300/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-yellow-200/30 blur-[90px] pointer-events-none" />

      {/* Floating subtle bakery icons in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <Wheat className="absolute top-[10%] left-[80%] w-64 h-64 -rotate-12" />
        <Croissant className="absolute top-[70%] left-[10%] w-48 h-48 rotate-12" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={reset}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 border border-white/40">
              <Wheat className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#3E2723] font-serif">BÄKO <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 font-sans">Copilot</span></h1>
          </div>
          <div className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-amber-900/10 text-sm font-medium flex items-center gap-2 text-[#5D4037]">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            Ofenbereit
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {appState === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                className="w-full max-w-4xl flex flex-col items-center"
              >
                <div className="text-center mb-16">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-[#3E2723] font-serif"
                  >
                    Bestellen ohne <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Tippen</span>
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-[#5D4037]/80 max-w-2xl mx-auto leading-relaxed"
                  >
                    Verwandeln Sie chaotische Eingaben in Sekundenschnelle in strukturierte Bäckerei-Bestellungen. Wählen Sie Ihr Eingabeformat.
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  <InputCard 
                    icon={<Mic className="w-8 h-8" />} 
                    title="Spracheingabe" 
                    desc="Einfach natürlich sprechen"
                    color="from-amber-400 to-orange-500"
                    shadowColor="shadow-orange-500/20"
                    onClick={() => handleInputClick('voice')}
                    delay={0.3}
                  />
                  <InputCard 
                    icon={<Camera className="w-8 h-8" />} 
                    title="Foto hochladen" 
                    desc="Handgeschriebene Notizen"
                    color="from-orange-500 to-red-500"
                    shadowColor="shadow-red-500/20"
                    onClick={() => handleInputClick('photo')}
                    delay={0.4}
                  />
                  <InputCard 
                    icon={<MessageSquare className="w-8 h-8" />} 
                    title="Text einfügen" 
                    desc="WhatsApp oder E-Mail"
                    color="from-stone-400 to-stone-600"
                    shadowColor="shadow-stone-500/20"
                    onClick={() => handleInputClick('text')}
                    delay={0.5}
                  />
                </div>
              </motion.div>
            )}

            {appState === 'inputting' && (
              <motion.div
                key="inputting"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                className="w-full max-w-2xl bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-12 shadow-2xl shadow-amber-900/5 border border-white/60 flex flex-col items-center justify-center min-h-[400px]"
              >
                {inputType === 'voice' && <VoiceInputSimulation />}
                {inputType === 'photo' && <PhotoInputSimulation />}
                {inputType === 'text' && <TextInputSimulation />}
              </motion.div>
            )}

            {appState === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="relative w-48 h-48 flex items-center justify-center">
                  {/* Magical Oven Glow */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                      rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 blur-2xl opacity-60"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-28 h-28 bg-white/90 backdrop-blur-md rounded-full shadow-[0_0_50px_rgba(245,158,11,0.6)] flex items-center justify-center relative z-10 border border-white"
                  >
                    <ChefHat className="w-12 h-12 text-orange-500" />
                  </motion.div>

                  {/* Orbiting "flour" particles */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-full h-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                    >
                      <div className={`w-${i%2===0?3:2} h-${i%2===0?3:2} bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2`} />
                    </motion.div>
                  ))}
                </div>
                <motion.h3 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-12 text-2xl font-medium text-[#5D4037] font-serif italic"
                >
                  KI knetet Ihre Bestellung...
                </motion.h3>
                <div className="mt-6 flex gap-3">
                  <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}

            {appState === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                className="w-full max-w-6xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Structured Order */}
                  <div className="lg:col-span-2 space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl shadow-amber-900/5 border border-white/60"
                    >
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-semibold flex items-center gap-3 text-[#3E2723] font-serif">
                          <CheckCircle className="text-orange-500 w-7 h-7" />
                          Strukturierte Bestellung
                        </h3>
                        <span className="px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-bold flex items-center gap-1.5 border border-amber-200/50">
                          <Sparkles className="w-4 h-4" /> KI-Analysiert
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b-2 border-amber-100 text-amber-900/60 text-sm uppercase tracking-wider">
                              <th className="pb-4 font-bold">Produkt</th>
                              <th className="pb-4 font-bold">Menge</th>
                              <th className="pb-4 font-bold">Änderung</th>
                              <th className="pb-4 font-bold text-right">Sicherheit</th>
                            </tr>
                          </thead>
                          <tbody>
                            <OrderRow product="Roggenbrot" qty={3} change="morgen weniger" conf={96} delay={0.4} />
                            <OrderRow product="Croissant" qty={5} change="morgen weniger" conf={93} delay={0.5} />
                            <OrderRow product="Kaiserbrötchen" qty={120} change="Standard" conf={99} delay={0.6} />
                          </tbody>
                        </table>
                      </div>
                    </motion.div>

                    {/* Action Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                      className="flex justify-end"
                    >
                      <button 
                        onClick={() => setAppState('confirmed')}
                        className="group relative px-8 py-4 bg-[#3E2723] text-white rounded-2xl font-semibold text-lg overflow-hidden shadow-xl shadow-[#3E2723]/20 hover:shadow-2xl hover:shadow-[#3E2723]/40 transition-all hover:-translate-y-1 flex items-center gap-3 cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10">Bestellung ins ERP übertragen</span>
                        <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  </div>

                  {/* Right Column: Insights & Gamification */}
                  <div className="space-y-6">
                    {/* Insights Panel */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-gradient-to-br from-orange-50 to-amber-50/50 rounded-[2rem] p-8 shadow-lg shadow-amber-900/5 border border-orange-100/50"
                    >
                      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-[#3E2723] font-serif">
                        <Lightbulb className="text-orange-500" /> Smarte Erkenntnisse
                      </h3>
                      <div className="space-y-4">
                        <InsightCard 
                          icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
                          text="Ungewöhnlich: 30% weniger als gestern"
                          delay={1.0}
                        />
                        <InsightCard 
                          icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
                          text="Empfehlung: Retouren um 12% reduzieren"
                          delay={1.2}
                        />
                        <InsightCard 
                          icon={<CheckCircle className="w-5 h-5 text-emerald-600" />}
                          text="Prognostizierte Nachfrage: mittel"
                          delay={1.4}
                        />
                      </div>
                    </motion.div>

                    {/* Gamification Panel */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6 }}
                      className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-lg shadow-amber-900/5 border border-white/60 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl -mr-10 -mt-10" />
                      
                      <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900/40 mb-6 font-sans">Einfluss</h3>
                      
                      <div className="space-y-6 relative z-10">
                        <div>
                          <div className="text-4xl font-bold text-orange-500 flex items-baseline gap-1">
                            <AnimatedNumber value={85} prefix="+" />
                          </div>
                          <div className="text-sm font-bold text-[#5D4037] mt-1">Effizienzpunkte erhalten</div>
                        </div>
                        
                        <div className="h-px w-full bg-amber-900/10" />

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center gap-2 text-amber-900/50 mb-1">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs font-bold uppercase">Zeit gespart</span>
                            </div>
                            <div className="text-xl font-bold text-[#3E2723]">
                              <AnimatedNumber value={12} suffix=" Min" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-amber-900/50 mb-1">
                              <ShieldCheck className="w-4 h-4" />
                              <span className="text-xs font-bold uppercase">Fehlerrisiko</span>
                            </div>
                            <div className="text-xl font-bold text-emerald-600">
                              <AnimatedNumber value={-78} suffix="%" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {appState === 'confirmed' && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                  className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(245,158,11,0.5)] border-4 border-white"
                >
                  <Check className="w-16 h-16 text-white" strokeWidth={4} />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl font-bold mb-4 text-[#3E2723] font-serif"
                >
                  Bestellung bestätigt!
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-[#5D4037]/80 mb-12"
                >
                  Ihre Bäckerei-Bestellung wurde erfolgreich verarbeitet und an das ERP gesendet.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={reset}
                  className="px-6 py-3 bg-white border border-amber-200 rounded-xl font-bold text-[#3E2723] flex items-center gap-2 hover:bg-amber-50 transition-colors cursor-pointer shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" /> Neue Bestellung starten
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// --- Subcomponents ---

function InputCard({ icon, title, desc, color, shadowColor, onClick, delay }: any) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-xl ${shadowColor} hover:shadow-2xl transition-all text-left overflow-hidden cursor-pointer`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-6 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2 text-[#3E2723] font-serif">{title}</h3>
      <p className="text-[#5D4037]/70 font-medium">{desc}</p>
    </motion.button>
  );
}

function VoiceInputSimulation() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mb-10 animate-pulse shadow-[0_0_30px_rgba(251,191,36,0.4)]">
        <Mic className="w-10 h-10 text-amber-600" />
      </div>
      <div className="flex items-center justify-center gap-2 h-16 w-full max-w-md">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [10, Math.random() * 60 + 10, 10] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.04 }}
            className="w-2.5 bg-gradient-to-t from-orange-500 to-amber-400 rounded-full"
          />
        ))}
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 text-2xl font-medium text-[#5D4037] italic"
      >
        "3 Roggenbrote, 5 Croissants morgen weniger..."
      </motion.p>
    </div>
  );
}

function PhotoInputSimulation() {
  return (
    <div className="flex flex-col items-center w-full relative">
      <div className="relative w-full max-w-sm bg-[#FFFDF5] p-10 rounded-sm shadow-xl border border-amber-900/10 transform -rotate-2">
        {/* Scanning laser effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-sm">
          <motion.div 
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
            className="absolute w-full h-1 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)] z-10"
          />
          <motion.div 
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
            className="absolute w-full h-32 bg-gradient-to-b from-transparent to-orange-500/10 z-0 -mt-32"
          />
        </div>
        
        {/* Paper lines */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)', backgroundPositionY: '38px' }}></div>
        
        <p className="text-4xl text-[#1e3a8a] leading-[32px] relative z-10 pt-2" style={{ fontFamily: "'Caveat', cursive" }}>
          3x Roggenbrot<br/>
          5x Croissant (weniger!)<br/>
          Für morgen früh
        </p>
      </div>
    </div>
  );
}

function TextInputSimulation() {
  const text = "Hey, brauche 3 Roggenbrote und 5 Croissants für morgen, aber weniger als sonst.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md">
      <div className="bg-white p-8 rounded-3xl rounded-tr-sm shadow-lg border border-amber-100 relative">
        <div className="absolute -right-3 -top-3 w-8 h-8 bg-green-500 rounded-full border-4 border-[#FAF6F0] flex items-center justify-center">
          <MessageSquare className="w-3 h-3 text-white" />
        </div>
        <p className="text-xl text-[#3E2723] leading-relaxed font-medium">{displayedText}<span className="animate-pulse text-amber-500">|</span></p>
      </div>
    </div>
  );
}

function OrderRow({ product, qty, change, conf, delay }: any) {
  return (
    <motion.tr 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="border-b border-amber-900/5 hover:bg-amber-50/50 transition-colors"
    >
      <td className="py-5 font-bold text-[#3E2723] text-lg">{product}</td>
      <td className="py-5">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 font-bold text-amber-900 border border-amber-200">
          {qty}
        </span>
      </td>
      <td className="py-5">
        {change !== 'Standard' ? (
          <span className="px-3 py-1.5 bg-red-100 text-red-800 rounded-lg text-xs font-bold uppercase tracking-wide border border-red-200">
            {change}
          </span>
        ) : (
          <span className="text-amber-900/30 text-sm font-bold">-</span>
        )}
      </td>
      <td className="py-5 text-right">
        <div className="flex items-center justify-end gap-3">
          <div className="w-20 h-2 bg-amber-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${conf}%` }}
              transition={{ delay: delay + 0.5, duration: 1 }}
              className="h-full bg-gradient-to-r from-orange-400 to-amber-500"
            />
          </div>
          <span className="text-sm font-bold text-[#3E2723] w-8">{conf}%</span>
        </div>
      </td>
    </motion.tr>
  );
}

function InsightCard({ icon, text, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="bg-white/80 backdrop-blur-md p-4 rounded-2xl flex items-start gap-4 border border-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="mt-0.5 bg-white p-2.5 rounded-xl shadow-sm border border-amber-50">
        {icon}
      </div>
      <p className="text-[#5D4037] font-semibold text-sm leading-relaxed pt-1">{text}</p>
    </motion.div>
  );
}
