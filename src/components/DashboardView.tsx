import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  CalendarEvent,
  ShoppingItem,
  AffectionLog,
  PartnerLocation,
  TimelineMilestone,
  CycleLog,
  NoteItem,
} from '../types';
import { DEFAULT_ANNIVERSARY } from '../lib/storage';
import {
  Heart,
  Sparkles,
  Calendar,
  ShoppingCart,
  Battery,
  MapPin,
  Bot,
  ChevronRight,
  Smile,
  Flower2,
} from 'lucide-react';

interface DashboardViewProps {
  currentUser: UserProfile;
  events: CalendarEvent[];
  notes?: NoteItem[];
  shoppingItems: ShoppingItem[];
  cycleLog?: CycleLog;
  affectionLogs?: AffectionLog[];
  partnerLocation: PartnerLocation;
  timeline?: TimelineMilestone[];
  onOpenAffectionModal: () => void;
  onNavigate?: (tab: any) => void;
  onNavigateTab?: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  events = [],
  notes = [],
  shoppingItems = [],
  cycleLog,
  affectionLogs = [],
  partnerLocation,
  timeline = [],
  onOpenAffectionModal,
  onNavigate,
  onNavigateTab,
}) => {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    years: 0,
  });

  const handleNav = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    if (onNavigateTab) onNavigateTab(tab);
  };

  // Calculate live anniversary time
  useEffect(() => {
    const anniversaryDate = new Date(DEFAULT_ANNIVERSARY).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = now - anniversaryDate;

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const years = (diff / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);

      setTimeTogether({ days, hours, minutes, seconds, years: parseFloat(years) });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const partnerName = currentUser === 'Sofi' ? 'Fer' : 'Sofi';
  const pendingShopping = shoppingItems.filter((i) => !i.completed);
  const nextEvent = events[0] || {
    title: 'Cena Aniversario',
    date: 'Viernes, 21:00',
    location: 'Restaurante El Olivo',
    category: 'Cita',
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* AI Quick Chat Overlay Banner */}
      <div className="glass p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold accent-text bg-white/5 px-2 py-1 rounded-md border border-white/10">[AI]</span>
          <p className="text-sm opacity-90 leading-snug">
            “Hola {currentUser}, {partnerName} está a poca distancia de casa. ¿Te gustaría sugerir una cita para esta noche?”
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={() => handleNav('ai_assistant')}
            className="text-[10px] uppercase font-mono tracking-wider border border-white/20 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors accent-text"
          >
            Preguntar a IA
          </button>
          <button
            onClick={onOpenAffectionModal}
            className="text-[10px] uppercase font-mono tracking-wider accent-bg text-black font-bold px-3 py-1.5 rounded-full hover:brightness-110 transition-all"
          >
            Enviar Cariño
          </button>
        </div>
      </div>

      {/* Hero Anniversary Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium accent-text">
              <Heart className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
              <span>Sofi & Fer • {timeTogether.days} Días Juntos</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Llevamos <span className="accent-text">{timeTogether.years} Años</span> Creciendo Juntos
            </h2>
            <p className="text-xs sm:text-sm text-white/60 italic font-serif">
              «Amante de tu sonrisa, cómplice de tus sueños desde el 08 de Noviembre de 2015.»
            </p>
          </div>

          {/* Precision Live Counter Grid */}
          <div className="w-full lg:w-auto grid grid-cols-4 gap-2 text-center glass p-3 sm:p-4 rounded-2xl border-white/10">
            <div className="px-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold accent-text block">{timeTogether.days}</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Días</span>
            </div>
            <div className="px-2 border-l border-white/10">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">{timeTogether.hours}</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Horas</span>
            </div>
            <div className="px-2 border-l border-white/10">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">{timeTogether.minutes}</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Min</span>
            </div>
            <div className="px-2 border-l border-white/10">
              <span className="font-serif text-2xl sm:text-3xl font-bold accent-text block">{timeTogether.seconds}</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Seg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tasks, Shopping & Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Lista Compra */}
          <div className="glass p-6 rounded-3xl border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-semibold uppercase tracking-widest opacity-60">Lista Compra</h3>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                En Vivo
              </span>
            </div>
            <div className="space-y-2.5">
              {pendingShopping.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5 text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded border border-white/30" />
                    <span className="font-medium text-white/90">{item.text}</span>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono">{item.category}</span>
                </div>
              ))}
              {pendingShopping.length === 0 && (
                <p className="text-xs text-white/40 text-center py-4 italic">No hay productos pendientes 🛒</p>
              )}
            </div>
            <button
              onClick={() => handleNav('shopping')}
              className="w-full py-2.5 border border-dashed border-white/20 rounded-xl text-xs text-white/60 hover:text-white hover:border-white/40 transition-all font-medium"
            >
              + Gestionar Lista
            </button>
          </div>

          {/* Status Card */}
          <div className="glass p-6 rounded-3xl border-white/10 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest opacity-60">Estado de la Pareja</h3>
            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white/80">{partnerName}</span>
                </div>
                <span className="text-[11px] text-emerald-400 flex items-center">
                  <span className="status-dot mr-2 bg-emerald-400 text-emerald-400" /> En camino
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white/80">{currentUser}</span>
                </div>
                <span className="text-[11px] text-blue-400 flex items-center">
                  <span className="status-dot mr-2 bg-blue-400 text-blue-400" /> En casa
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-white/60">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Battery className="w-3.5 h-3.5 text-emerald-400" /> Batería {partnerName}:</span>
                <span className="font-mono text-white">{partnerLocation.batteryLevel}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Smile className="w-3.5 h-3.5 accent-text" /> Ánimo:</span>
                <span className="text-white truncate max-w-[140px]">{partnerLocation.statusMood}</span>
              </div>
            </div>

            <button
              onClick={() => handleNav('location')}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs accent-text font-medium flex items-center justify-center gap-1 transition-all border border-white/10"
            >
              <span>Ver Ubicación en Mapa</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Next Event, AI Memory & Cycle */}
        <div className="lg:col-span-8 space-y-6">
          {/* Próximo Evento Banner */}
          <div className="glass p-6 sm:p-8 rounded-3xl border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[180px]">
            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-widest opacity-60">Próximo Evento</h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full glass text-white/70 border border-white/10 font-mono">
                  Google Calendar Sincronizado
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-serif text-white font-bold">{nextEvent.title}</p>
              <p className="accent-text text-sm italic font-serif">
                {nextEvent.date} {nextEvent.location ? `— ${nextEvent.location}` : ''}
              </p>
            </div>
            <div className="relative z-10 mt-4 flex justify-end">
              <button
                onClick={() => handleNav('agenda')}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 flex items-center gap-1.5 transition-all"
              >
                <Calendar className="w-3.5 h-3.5 accent-text" />
                <span>Ver Agenda Completa</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Recordatorio de IA */}
            <div className="glass p-6 rounded-3xl border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="w-4 h-4 accent-text" />
                  <h3 className="text-xs font-semibold uppercase tracking-widest opacity-60">Sugerencia IA</h3>
                </div>
                <p className="text-sm leading-relaxed italic opacity-90 font-serif">
                  "Hace unos años estábamos explorando rincones especiales. ¿Qué tal planear una escapada de fin de semana?"
                </p>
              </div>
              <button
                onClick={() => handleNav('restaurants')}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/80 hover:text-white border border-white/10 flex items-center justify-center gap-1 transition-all"
              >
                <span>Descubrir Restaurantes & Cine</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Ciclo & Salud */}
            <div className="glass p-6 rounded-3xl border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Flower2 className="w-4 h-4 text-pink-400" />
                  <h3 className="text-xs font-semibold uppercase tracking-widest opacity-60">Ciclo & Salud</h3>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-serif text-white">{cycleLog?.phaseName || 'Fase Folicular'}</p>
                    <p className="text-[10px] opacity-40 mt-1 uppercase tracking-widest font-mono">
                      Día {cycleLog?.currentDay || 12} del ciclo
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-pink-500/40 bg-pink-500/10 flex items-center justify-center text-pink-300 font-bold text-xs">
                    {cycleLog?.cycleLength || 28}d
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleNav('cycle')}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-pink-300 border border-white/10 flex items-center justify-center gap-1 transition-all"
              >
                <span>Registro de Síntomas</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cariño Quick Action Bar */}
      <div className="fixed bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3.5 glass rounded-full shadow-2xl border-white/20 backdrop-blur-xl">
        <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 hidden md:block">Enviar Cariño</p>
        <button
          onClick={onOpenAffectionModal}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass hover:scale-110 transition-transform flex items-center justify-center text-lg"
          title="Mimos 🧸"
        >
          🧸
        </button>
        <button
          onClick={onOpenAffectionModal}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass hover:scale-110 transition-transform flex items-center justify-center text-lg"
          title="Te extraño 💌"
        >
          💌
        </button>
        <button
          onClick={onOpenAffectionModal}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass hover:scale-110 transition-transform flex items-center justify-center text-lg"
          title="Amor 🔥"
        >
          🔥
        </button>
        <button
          onClick={onOpenAffectionModal}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass hover:scale-110 transition-transform flex items-center justify-center text-lg"
          title="Abrazo 🫂"
        >
          🫂
        </button>
        <div className="w-px h-6 bg-white/20 mx-1" />
        <button
          onClick={onOpenAffectionModal}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full accent-bg text-black font-bold flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          title="Enviar Mensaje Personalizado"
        >
          <Sparkles className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Encryption Badge */}
      <div className="flex justify-center items-center space-x-2 text-[10px] opacity-30 font-mono pt-4">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>CONEXIÓN CIFRADA AES-256 SOFIFER</span>
      </div>
    </div>
  );
};

