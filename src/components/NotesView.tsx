import React, { useState } from 'react';
import { NoteItem, UserProfile } from '../types';
import { FileText, Pin, Plus, Search, Tag, Mic, Trash2, Volume2 } from 'lucide-react';

interface NotesViewProps {
  currentUser: UserProfile;
  notes: NoteItem[];
  onAddNote: (note: NoteItem) => void;
  onTogglePin: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  currentUser,
  notes,
  onAddNote,
  onTogglePin,
  onDeleteNote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  // New Note State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);

  // Extract all tags
  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  const filteredNotes = notes.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'Todos' || n.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleSimulateVoiceRecord = () => {
    setIsRecordingVoice(true);
    setTimeout(() => {
      setIsRecordingVoice(false);
      // Mock audio data URL
      setAudioUrl('https://actions.google.com/sounds/v1/ambiences/outdoor_park.ogg');
    }, 2000);
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const parsedTags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title,
      content,
      tags: parsedTags.length > 0 ? parsedTags : ['Notas'],
      pinned: false,
      audioUrl,
      updatedAt: new Date().toISOString(),
      createdBy: currentUser,
    };

    onAddNote(newNote);
    setShowAddModal(false);
    setTitle('');
    setContent('');
    setTagsInput('');
    setAudioUrl(undefined);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">Notas Compartidas</h2>
          </div>
          <p className="text-xs text-slate-400">Listas, mensajes dulces, recetas y notas de voz para Sofi & Fer.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Nota</span>
        </button>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar en notas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full py-1">
          <button
            onClick={() => setSelectedTag('Todos')}
            className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedTag === 'Todos'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border transition-all flex flex-col justify-between space-y-3 relative group shadow-lg ${
              note.pinned ? 'border-purple-500/50 shadow-purple-950/30 ring-1 ring-purple-500/20' : 'border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  {note.title}
                </h3>
                <button
                  onClick={() => onTogglePin(note.id)}
                  className={`p-1.5 rounded-lg transition-all ${
                    note.pinned ? 'text-amber-400 bg-amber-400/10' : 'text-slate-600 hover:text-slate-300'
                  }`}
                  title={note.pinned ? 'Desfijar' : 'Fijar nota arriba'}
                >
                  <Pin className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                {note.content}
              </p>

              {note.audioUrl && (
                <div className="p-2 rounded-xl bg-slate-950 border border-purple-500/30 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" />
                  <audio controls src={note.audioUrl} className="w-full h-6 text-xs" />
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex flex-wrap gap-1">
                {note.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span>Por {note.createdBy}</span>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="text-slate-600 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-serif">Crear Nota Compartida</h3>

            <form onSubmit={handleCreateNote} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Título:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Lista de equipaje para el viaje..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Contenido:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escribe tus ideas, recuerdos o notas..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Etiquetas (separadas por coma):</label>
                <input
                  type="text"
                  placeholder="Amor, Recetas, Casa..."
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              {/* Voice Note Simulation */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-300">Nota de voz adjunta:</span>
                <button
                  type="button"
                  onClick={handleSimulateVoiceRecord}
                  disabled={isRecordingVoice}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Mic className={`w-3.5 h-3.5 ${isRecordingVoice ? 'animate-bounce text-rose-500' : ''}`} />
                  <span>{isRecordingVoice ? 'Grabando (2s)...' : audioUrl ? 'Voz Grabada ✓' : 'Grabar Voz'}</span>
                </button>
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
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  Guardar Nota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
