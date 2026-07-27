import React, { useState } from 'react';
import { CalendarEvent, UserProfile } from '../types';
import { Calendar as CalendarIcon, Plus, MapPin, Clock, Tag, RefreshCw, CheckCircle, Trash2 } from 'lucide-react';

interface AgendaViewProps {
  currentUser: UserProfile;
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
  onSyncGoogleCalendar: () => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  currentUser,
  events,
  onAddEvent,
  onDeleteEvent,
  onSyncGoogleCalendar,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('Todos');
  const [isSyncing, setIsSyncing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Event Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('20:00');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<CalendarEvent['category']>('Cita');
  const [notes, setNotes] = useState('');

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      onSyncGoogleCalendar();
      setIsSyncing(false);
    }, 800);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    const newEv: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title,
      date,
      time,
      location: location.trim() || undefined,
      category,
      notes: notes.trim() || undefined,
      syncedWithGoogle: true,
      createdBy: currentUser,
    };

    onAddEvent(newEv);
    setShowAddModal(false);
    setTitle('');
    setLocation('');
    setNotes('');
  };

  const filteredEvents = filterCategory === 'Todos'
    ? events
    : events.filter((e) => e.category === filterCategory);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Agenda Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">Agenda Compartida</h2>
          </div>
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            Sincronizado con la cuenta Google compartida: <span className="text-rose-300 font-mono">sofiferfiguemorin@gmail.com</span>
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-slate-700"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sincronizar Google</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 flex items-center justify-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Evento</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {['Todos', 'Aniversario', 'Cita', 'Viaje', 'Médico', 'Hogar', 'Otro'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event List */}
      <div className="space-y-3">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg group"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">{ev.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {ev.category}
                </span>
                {ev.syncedWithGoogle && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Google Synced
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> {ev.date} {ev.time && `@ ${ev.time}`}</span>
                {ev.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-400" /> {ev.location}</span>}
                <span className="text-slate-500">• Creado por {ev.createdBy}</span>
              </div>

              {ev.notes && <p className="text-xs text-slate-300 italic pt-1">{ev.notes}</p>}
            </div>

            <button
              onClick={() => onDeleteEvent(ev.id)}
              className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-all opacity-80 sm:opacity-0 group-hover:opacity-100"
              title="Eliminar Evento"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
            <CalendarIcon className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-xs">No hay eventos en esta categoría.</p>
          </div>
        )}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-serif">Añadir Evento a la Agenda</h3>

            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Título del evento:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Cena romántica, Viaje a la playa..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
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
                  <label className="text-xs text-slate-400 block mb-1">Hora:</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Categoría:</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                >
                  <option value="Aniversario">Aniversario</option>
                  <option value="Cita">Cita Romántica</option>
                  <option value="Viaje">Viaje / Escapada</option>
                  <option value="Médico">Médico / Salud</option>
                  <option value="Hogar">Hogar & Tareas</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Lugar (Opcional):</label>
                <input
                  type="text"
                  placeholder="Ej: Restaurante Osaka..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Notas adicionales:</label>
                <textarea
                  rows={2}
                  placeholder="Detalles, reservaciones..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
                >
                  Guardar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
