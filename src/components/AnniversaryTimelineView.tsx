import React, { useState } from 'react';
import { TimelineMilestone, UserProfile } from '../types';
import { Clock, Heart, Plus, Sparkles, Compass, Home, Calendar } from 'lucide-react';

interface AnniversaryTimelineViewProps {
  currentUser: UserProfile;
  timeline: TimelineMilestone[];
  onAddMilestone: (item: TimelineMilestone) => void;
}

export const AnniversaryTimelineView: React.FC<AnniversaryTimelineViewProps> = ({
  currentUser,
  timeline,
  onAddMilestone,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    const newM: TimelineMilestone = {
      id: `tm-${Date.now()}`,
      title,
      date,
      description: description.trim() || 'Hito inolvidable de Sofi & Fer',
      iconName: 'Heart',
    };

    onAddMilestone(newM);
    setShowAddModal(false);
    setTitle('');
    setDate('');
    setDescription('');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl border border-rose-500/30 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">Línea del Tiempo & Aniversario</h2>
          </div>
          <p className="text-xs text-slate-400">Nuestros momentos históricos más felices desde el 08/11/2015 💕</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-md shadow-rose-500/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Hito</span>
        </button>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-rose-500/30 ml-4 sm:ml-8 space-y-8 py-4">
        {timeline.map((item) => {
          const yearsAgo = ((new Date().getTime() - new Date(item.date).getTime()) / (1000 * 3600 * 24 * 365.25)).toFixed(1);
          return (
            <div key={item.id} className="relative pl-6 group">
              {/* Node Icon */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-950 border-2 border-rose-500 flex items-center justify-center text-rose-400 shadow-md group-hover:scale-110 transition-transform">
                <Heart className="w-4 h-4 fill-rose-500/30" />
              </div>

              {/* Card */}
              <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 space-y-2 shadow-lg hover:border-rose-500/40 transition-all">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                    Hace {yearsAgo} años
                  </span>
                </div>

                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" /> {item.date}
                </p>

                <p className="text-xs text-slate-200 leading-relaxed pt-1">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-serif">Añadir Hito del Amor</h3>

            <form onSubmit={handleCreateMilestone} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Título del hito:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Compromiso, Primer viaje juntos..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Fecha:</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Descripción de la memoria:</label>
                <textarea
                  rows={3}
                  placeholder="Describe por qué fue un día tan especial..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                >
                  Guardar Hito
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
