import React, { useState } from 'react';
import { ShoppingItem, UserProfile } from '../types';
import { ShoppingCart, Plus, CheckCircle, Circle, Trash2, DollarSign } from 'lucide-react';

interface ShoppingListViewProps {
  currentUser: UserProfile;
  items: ShoppingItem[];
  onAddItem: (item: ShoppingItem) => void;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onClearCompleted: () => void;
}

export const ShoppingListView: React.FC<ShoppingListViewProps> = ({
  currentUser,
  items,
  onAddItem,
  onToggleItem,
  onDeleteItem,
  onClearCompleted,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [itemText, setItemText] = useState('');
  const [category, setCategory] = useState<ShoppingItem['category']>('Supermercado');
  const [price, setPrice] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemText.trim()) return;

    const newItem: ShoppingItem = {
      id: `shop-${Date.now()}`,
      text: itemText.trim(),
      category,
      completed: false,
      estimatedPrice: price ? parseFloat(price) : undefined,
      addedBy: currentUser,
      createdAt: new Date().toISOString(),
    };

    onAddItem(newItem);
    setItemText('');
    setPrice('');
  };

  const filteredItems = selectedCategory === 'Todos'
    ? items
    : items.filter((i) => i.category === selectedCategory);

  const totalPrice = items
    .filter((i) => !i.completed && i.estimatedPrice)
    .reduce((acc, curr) => acc + (curr.estimatedPrice || 0), 0);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">Lista de Compras en Tiempo Real</h2>
          </div>
          <p className="text-xs text-slate-400">Sincronizada instantáneamente entre Sofi y Fer 🛒</p>
        </div>

        <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-right w-full sm:w-auto">
          <span className="text-[10px] text-slate-400 uppercase block font-semibold">Total Estimado Pendiente:</span>
          <span className="text-base font-bold text-emerald-400 font-mono">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Add Item Quick Form */}
      <form onSubmit={handleAddItem} className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center gap-3 shadow-lg">
        <input
          type="text"
          required
          placeholder="Añadir producto (ej: Leche de almendras, Frutas...)"
          value={itemText}
          onChange={(e) => setItemText(e.target.value)}
          className="w-full md:flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
        />

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={category}
            onChange={(e: any) => setCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
          >
            <option value="Supermercado">Supermercado</option>
            <option value="Hogar">Hogar</option>
            <option value="Farmacia">Farmacia</option>
            <option value="Sorpresas">Sorpresas</option>
          </select>

          <input
            type="number"
            step="0.5"
            placeholder="Precio $"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-24 px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
          />

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 whitespace-nowrap"
          >
            Añadir
          </button>
        </div>
      </form>

      {/* Category Pills & Clear Button */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {['Todos', 'Supermercado', 'Hogar', 'Farmacia', 'Sorpresas'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={onClearCompleted}
          className="text-xs text-slate-400 hover:text-rose-400 whitespace-nowrap underline px-2"
        >
          Limpiar comprados
        </button>
      </div>

      {/* Item List */}
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 shadow-md ${
              item.completed
                ? 'bg-slate-950/40 border-slate-900 opacity-60 line-through'
                : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleItem(item.id)}
                className={`p-1 rounded-full transition-colors ${
                  item.completed ? 'text-emerald-400' : 'text-slate-600 hover:text-purple-400'
                }`}
              >
                {item.completed ? <CheckCircle className="w-5 h-5 fill-emerald-500/20" /> : <Circle className="w-5 h-5" />}
              </button>

              <div>
                <span className={`text-xs font-semibold ${item.completed ? 'text-slate-500' : 'text-white'}`}>
                  {item.text}
                </span>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span className="bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">{item.category}</span>
                  <span>Añadido por {item.addedBy}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {item.estimatedPrice && (
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  ${item.estimatedPrice.toFixed(2)}
                </span>
              )}
              <button
                onClick={() => onDeleteItem(item.id)}
                className="p-1 text-slate-600 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
            <ShoppingCart className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-xs">No hay productos en esta lista.</p>
          </div>
        )}
      </div>
    </div>
  );
};
