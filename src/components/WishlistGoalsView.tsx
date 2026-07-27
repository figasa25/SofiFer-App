import React, { useState } from 'react';
import { CoupleGoal, UserProfile, WishlistItem } from '../types';
import { Gift, Target, Plus, CheckCircle, Circle, DollarSign, Sparkles } from 'lucide-react';

interface WishlistGoalsViewProps {
  currentUser: UserProfile;
  wishlist: WishlistItem[];
  goals: CoupleGoal[];
  onAddWishlistItem: (item: WishlistItem) => void;
  onToggleWishlistItem: (id: string) => void;
  onAddGoal: (goal: CoupleGoal) => void;
  onUpdateGoalProgress: (id: string, amountToAdd: number) => void;
}

export const WishlistGoalsView: React.FC<WishlistGoalsViewProps> = ({
  currentUser,
  wishlist,
  goals,
  onAddWishlistItem,
  onToggleWishlistItem,
  onAddGoal,
  onUpdateGoalProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'goals'>('wishlist');
  const [showAddWishlistModal, setShowAddWishlistModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);

  // Wishlist Form State
  const [wTitle, setWTitle] = useState('');
  const [wCategory, setWCategory] = useState<WishlistItem['category']>('Viaje');
  const [wCost, setWCost] = useState('');

  // Goal Form State
  const [gTitle, setGTitle] = useState('');
  const [gTarget, setGTarget] = useState('1000');
  const [gDate, setGDate] = useState('2026-12-31');

  const handleCreateWishlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wTitle) return;

    const newW: WishlistItem = {
      id: `wl-${Date.now()}`,
      title: wTitle,
      category: wCategory,
      estimatedCost: wCost ? parseFloat(wCost) : undefined,
      completed: false,
      addedBy: currentUser,
    };

    onAddWishlistItem(newW);
    setShowAddWishlistModal(false);
    setWTitle('');
    setWCost('');
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gTitle) return;

    const newG: CoupleGoal = {
      id: `g-${Date.now()}`,
      title: gTitle,
      targetAmount: parseFloat(gTarget) || 1000,
      currentAmount: 0,
      targetDate: gDate,
      category: 'Viaje',
      completed: false,
    };

    onAddGoal(newG);
    setShowAddGoalModal(false);
    setGTitle('');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Gift className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">Wishlist & Objetivos de Pareja</h2>
          </div>
          <p className="text-xs text-slate-400">Nuestros sueños compartidos, lista de deseos y metas financieras 🎁</p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center gap-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'wishlist' ? 'bg-amber-500 text-slate-950 shadow-md font-bold' : 'text-slate-400'
            }`}
          >
            Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'goals' ? 'bg-emerald-500 text-slate-950 shadow-md font-bold' : 'text-slate-400'
            }`}
          >
            Metas Ahorro ({goals.length})
          </button>
        </div>
      </div>

      {/* Wishlist View */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">Lista de Deseos & Caprichos</h3>
            <button
              onClick={() => setShowAddWishlistModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Deseo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 shadow-md ${
                  item.completed ? 'bg-slate-950/40 border-slate-900 line-through opacity-60' : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleWishlistItem(item.id)}
                    className={`p-1 rounded-full ${item.completed ? 'text-amber-400' : 'text-slate-600'}`}
                  >
                    {item.completed ? <CheckCircle className="w-5 h-5 fill-amber-500/20" /> : <Circle className="w-5 h-5" />}
                  </button>

                  <div>
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <span className="text-[10px] text-slate-400">Categoría: {item.category} • Por {item.addedBy}</span>
                  </div>
                </div>

                {item.estimatedCost && (
                  <span className="text-xs font-mono font-bold text-amber-400">${item.estimatedCost}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goals View */}
      {activeTab === 'goals' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">Metas & Objetivos Financieros Conjuntos</h3>
            <button
              onClick={() => setShowAddGoalModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Meta</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((g) => {
              const progressPct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
              return (
                <div key={g.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{g.title}</h4>
                    <span className="text-xs font-mono font-bold text-emerald-400">{progressPct}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Ahorrado: ${g.currentAmount}</span>
                    <span>Meta: ${g.targetAmount}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => onUpdateGoalProgress(g.id, 50)}
                      className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-emerald-300 font-semibold"
                    >
                      +$50
                    </button>
                    <button
                      onClick={() => onUpdateGoalProgress(g.id, 100)}
                      className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-emerald-300 font-semibold"
                    >
                      +$100
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Wishlist Modal */}
      {showAddWishlistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-serif">Añadir Deseo</h3>

            <form onSubmit={handleCreateWishlist} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nombre del deseo:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Viaje a Japón, Cafetera Expreso..."
                  value={wTitle}
                  onChange={(e) => setWTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Categoría:</label>
                <select
                  value={wCategory}
                  onChange={(e: any) => setWCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                >
                  <option value="Viaje">Viaje</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Hogar">Hogar</option>
                  <option value="Experiencia">Experiencia</option>
                  <option value="Ropa">Ropa / Accesorio</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Precio Estimado $:</label>
                <input
                  type="number"
                  placeholder="Ej: 500"
                  value={wCost}
                  onChange={(e) => setWCost(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddWishlistModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Guardar Deseo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-serif">Añadir Meta Financiera</h3>

            <form onSubmit={handleCreateGoal} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Título de la meta:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Fondo Viaje Aniversario 2026..."
                  value={gTitle}
                  onChange={(e) => setGTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Monto Objetivo $:</label>
                <input
                  type="number"
                  required
                  value={gTarget}
                  onChange={(e) => setGTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddGoalModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  Guardar Meta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
