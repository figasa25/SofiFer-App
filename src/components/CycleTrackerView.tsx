import React, { useState } from 'react';
import { CycleLog, UserProfile } from '../types';
import { Flower2, Heart, Sparkles, Calendar, Coffee, ShieldAlert, CheckCircle } from 'lucide-react';

interface CycleTrackerViewProps {
  currentUser: UserProfile;
  cycleData: CycleLog;
  onUpdateCycle: (newCycle: CycleLog) => void;
}

export const CycleTrackerView: React.FC<CycleTrackerViewProps> = ({
  currentUser,
  cycleData,
  onUpdateCycle,
}) => {
  const [lastDate, setLastDate] = useState(cycleData.lastPeriodDate);
  const [cycleLength, setCycleLength] = useState(cycleData.cycleLengthDays);
  const [symptomInput, setSymptomInput] = useState('');

  // Calculate phase
  const lastPeriod = new Date(lastDate).getTime();
  const today = new Date().getTime();
  const dayInCycle = Math.max(1, Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24)) % cycleLength);

  let phase = 'Fase Folicular';
  let phaseColor = 'text-pink-400 bg-pink-500/20 border-pink-500/30';
  let adviceForFer = 'Energía alta y vitalidad. Buen momento para una cita activa, caminata al aire libre o salida especial.';

  if (dayInCycle <= 5) {
    phase = 'Fase Menstrual';
    phaseColor = 'text-rose-400 bg-rose-500/20 border-rose-500/30';
    adviceForFer = 'Sofi necesita máximo mimo y calma. Prepara un té calentito de manzanilla, bolsa de agua tibia, masajito en la espalda y sus chocolates oscuros favoritos.';
  } else if (dayInCycle >= 12 && dayInCycle <= 16) {
    phase = 'Fase Ovulatoria (Ventana Fértil)';
    phaseColor = 'text-purple-400 bg-purple-500/20 border-purple-500/30';
    adviceForFer = 'Pico de creatividad y magnetismo. Sorpréndela con flores, una cena con velas y momentos románticos inolvidables.';
  } else if (dayInCycle > 16) {
    phase = 'Fase Lútea';
    phaseColor = 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    adviceForFer = 'Momento de confort y hogar. Prepárenle una cena reconfortante en casa, mantitas en el sofá y paciencia dulce.';
  }

  const nextPeriodDate = new Date(lastPeriod + cycleLength * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const handleSave = () => {
    const updated: CycleLog = {
      ...cycleData,
      lastPeriodDate: lastDate,
      cycleLengthDays: cycleLength,
    };
    onUpdateCycle(updated);
    alert('Ciclo actualizado correctamente 💕');
  };

  const handleAddSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomInput.trim()) return;

    const updated: CycleLog = {
      ...cycleData,
      symptoms: [...cycleData.symptoms, symptomInput.trim()],
    };
    onUpdateCycle(updated);
    setSymptomInput('');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl border border-pink-500/30 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400">
              <Flower2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">Seguimiento de Ciclo & Cuidados</h2>
          </div>
          <p className="text-xs text-slate-400">
            Predicción del ciclo menstrual de Sofi y consejos personalizados de mimo para Fer 🌸
          </p>
        </div>

        <div className={`px-4 py-2 rounded-2xl border text-xs font-bold ${phaseColor}`}>
          Día {dayInCycle} del ciclo • {phase}
        </div>
      </div>

      {/* Advice for Fer Card */}
      <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-purple-950/60 border border-rose-500/30 p-6 rounded-3xl space-y-3 shadow-xl">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          <h3 className="text-sm font-bold text-white font-serif">Guía de Mimos para Fer Hoy:</h3>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          "{adviceForFer}"
        </p>
      </div>

      {/* Cycle Stats & Predictor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cycle Config Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-pink-400" />
            <span>Configuración del Ciclo de Sofi</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Último periodo (Fecha de inicio):</label>
              <input
                type="date"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Duración media del ciclo (Días):</label>
              <input
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <p className="text-slate-400">Próximo periodo estimado:</p>
              <p className="text-sm font-bold text-pink-400 font-mono">{nextPeriodDate}</p>
            </div>

            <button
              onClick={handleSave}
              className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-md"
            >
              Guardar Cambios
            </button>
          </div>
        </div>

        {/* Symptoms & Mood Logger */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Síntomas & Sensaciones Registradas</span>
          </h3>

          <form onSubmit={handleAddSymptom} className="flex gap-2">
            <input
              type="text"
              placeholder="Ej: Antojo de chocolate, cansancio, cólico..."
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
            >
              Añadir
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-2">
            {cycleData.symptoms.map((sym, idx) => (
              <span key={idx} className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-pink-300">
                🌸 {sym}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
