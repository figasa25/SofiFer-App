import React, { useState } from 'react';
import { UserProfile, AffectionGIF } from '../types';
import { playLoveChime } from '../lib/audio';
import { DEFAULT_GIFS } from '../lib/storage';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X, Plus, Image as ImageIcon, Send, Volume2 } from 'lucide-react';

interface SendAffectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  gifPresets?: AffectionGIF[];
  onAddCustomGIF?: (newGif: AffectionGIF) => void;
  onSendAffection: (gifTitle: string, gifUrl: string, message?: string) => void;
}

export const SendAffectionModal: React.FC<SendAffectionModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  gifPresets = DEFAULT_GIFS,
  onAddCustomGIF,
  onSendAffection,
}) => {
  const activePresets = gifPresets && gifPresets.length > 0 ? gifPresets : DEFAULT_GIFS;
  const [selectedGif, setSelectedGif] = useState<AffectionGIF | null>(activePresets[0] || null);
  const [customMessage, setCustomMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // New GIF form state
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<'mimos' | 'extrano' | 'triste' | 'hot' | 'custom'>('custom');

  if (!isOpen) return null;

  const targetPartner = currentUser === 'Sofi' ? 'Fer' : 'Sofi';

  const handleSend = () => {
    if (!selectedGif) return;

    // Trigger audio chime
    playLoveChime(selectedGif.category as any);

    // Trigger romantic confetti effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24'],
    });

    onSendAffection(selectedGif.title, selectedGif.gifUrl, customMessage.trim() || undefined);
    setCustomMessage('');
    onClose();
  };

  const handleCreateGif = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    const created: AffectionGIF = {
      id: `gif-${Date.now()}`,
      title: newTitle,
      gifUrl: newUrl,
      category: newCategory,
      createdBy: currentUser,
    };

    if (onAddCustomGIF) onAddCustomGIF(created);
    setSelectedGif(created);
    setShowAddForm(false);
    setNewTitle('');
    setNewUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-rose-500/30 rounded-3xl p-6 shadow-2xl shadow-rose-950/50 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Glow Background Accent */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-serif">Enviar Cariño Instantáneo</h2>
              <p className="text-xs text-slate-400">Notificarás inmediatamente a tu pareja {targetPartner} 💕</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="py-4 overflow-y-auto space-y-4 flex-1">
          {/* GIF Presets Picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Elige la emoción / GIF:
              </label>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                {showAddForm ? 'Ver Lista' : 'Añadir GIF Propio'}
              </button>
            </div>

            {!showAddForm ? (
              <div className="grid grid-cols-2 gap-3">
                {activePresets.map((gif) => {
                  const isSelected = selectedGif?.id === gif.id;
                  return (
                    <button
                      key={gif.id}
                      onClick={() => {
                        setSelectedGif(gif);
                        playLoveChime(gif.category as any);
                      }}
                      className={`relative p-3 rounded-2xl border text-left flex flex-col gap-2 transition-all group overflow-hidden ${
                        isSelected
                          ? 'bg-rose-500/20 border-rose-500 ring-2 ring-rose-500/40 shadow-lg'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="h-28 w-full rounded-xl overflow-hidden bg-slate-950 relative">
                        <img
                          src={gif.gifUrl}
                          alt={gif.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 p-1 rounded-full bg-slate-950/80 backdrop-blur-md">
                          <Volume2 className="w-3 h-3 text-rose-300" />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">
                        {gif.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Custom GIF Creator Form */
              <form onSubmit={handleCreateGif} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-200">Añadir Nuevo GIF / Meme de Cariño</h3>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Título de la emoción:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Quiero besito 💋, Abrazo apretado..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">URL del GIF (Giphy / Tenor / Imagen):</label>
                  <input
                    type="url"
                    required
                    placeholder="https://media.giphy.com/..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Categoría / Sonido:</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none"
                  >
                    <option value="mimos">Mimos (Dulce)</option>
                    <option value="extrano">Te Extraño (Melancólico dulce)</option>
                    <option value="triste">Estoy Triste (Consuelo)</option>
                    <option value="hot">Estoy HOT 🔥 (Atrevido)</option>
                    <option value="custom">Personalizado</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-md"
                  >
                    Guardar GIF
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Optional Personal Note */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Mensaje adicional opcional:
            </label>
            <input
              type="text"
              placeholder={`Escribe un mensajito dulce para ${targetPartner}...`}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Reproducirá sonido y vibración</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSend}
              disabled={!selectedGif}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-xs shadow-lg shadow-rose-500/30 hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Cariño Ahora</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
