import React, { useState } from 'react';
import { MovieItem, RestaurantItem, UserProfile } from '../types';
import { Utensils, Film, Plus, Star, MapPin, CheckCircle, Circle } from 'lucide-react';

interface DateNightViewProps {
  currentUser: UserProfile;
  restaurants: RestaurantItem[];
  movies: MovieItem[];
  onAddRestaurant: (item: RestaurantItem) => void;
  onToggleRestaurantVisited: (id: string) => void;
  onAddMovie: (item: MovieItem) => void;
  onToggleMovieStatus: (id: string) => void;
}

export const DateNightView: React.FC<DateNightViewProps> = ({
  currentUser,
  restaurants,
  movies,
  onAddRestaurant,
  onToggleRestaurantVisited,
  onAddMovie,
  onToggleMovieStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'restaurants' | 'movies'>('restaurants');
  const [showAddRestModal, setShowAddRestModal] = useState(false);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);

  // Rest state
  const [rName, setRName] = useState('');
  const [rCuisine, setRCuisine] = useState('');
  const [rLocation, setRLocation] = useState('');
  const [rDishes, setRDishes] = useState('');

  // Movie state
  const [mTitle, setMTitle] = useState('');
  const [mGenre, setMGenre] = useState('');

  const handleCreateRest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rName) return;

    const newR: RestaurantItem = {
      id: `rest-${Date.now()}`,
      name: rName,
      cuisine: rCuisine.trim() || 'Internacional',
      location: rLocation.trim() || 'Centro',
      rating: 5,
      favoriteDishes: rDishes.trim() || 'Plato del chef',
      visited: false,
    };

    onAddRestaurant(newR);
    setShowAddRestModal(false);
    setRName('');
    setRCuisine('');
    setRDishes('');
  };

  const handleCreateMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mTitle) return;

    const newM: MovieItem = {
      id: `m-${Date.now()}`,
      title: mTitle,
      genre: mGenre.trim() || 'Drama / Romance',
      status: 'Por ver',
      recommendedBy: currentUser,
    };

    onAddMovie(newM);
    setShowAddMovieModal(false);
    setMTitle('');
    setMGenre('');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Utensils className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">Citas, Restaurantes & Pelis</h2>
          </div>
          <p className="text-xs text-slate-400">Guía de salidas gastronómicas y maratones de cine en pareja 🎬</p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center gap-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('restaurants')}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'restaurants' ? 'bg-purple-500 text-white shadow-md font-bold' : 'text-slate-400'
            }`}
          >
            Restaurantes ({restaurants.length})
          </button>
          <button
            onClick={() => setActiveTab('movies')}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'movies' ? 'bg-pink-500 text-white shadow-md font-bold' : 'text-slate-400'
            }`}
          >
            Películas & Cine ({movies.length})
          </button>
        </div>
      </div>

      {/* Restaurants View */}
      {activeTab === 'restaurants' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">Nuestra Guía Gastronómica</h3>
            <button
              onClick={() => setShowAddRestModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Restaurante</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurants.map((r) => (
              <div
                key={r.id}
                className={`p-5 rounded-2xl border transition-all space-y-2 shadow-lg ${
                  r.visited ? 'bg-slate-900/80 border-slate-800' : 'bg-purple-950/20 border-purple-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{r.name}</h4>
                  <button
                    onClick={() => onToggleRestaurantVisited(r.id)}
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                      r.visited ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {r.visited ? 'Visitado ✓' : 'Por Visitar'}
                  </button>
                </div>

                <p className="text-xs text-slate-300">Cocina: {r.cuisine} • 📍 {r.location}</p>
                <p className="text-xs text-slate-400 italic">Platos recomendados: "{r.favoriteDishes}"</p>

                <div className="flex items-center gap-1 text-amber-400 pt-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Movies View */}
      {activeTab === 'movies' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">Lista de Películas & Series</h3>
            <button
              onClick={() => setShowAddMovieModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Película</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {movies.map((m) => (
              <div
                key={m.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 shadow-md ${
                  m.status === 'Vista' ? 'bg-slate-950/40 border-slate-900 opacity-70' : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleMovieStatus(m.id)}
                    className={`p-1 rounded-full ${m.status === 'Vista' ? 'text-pink-400' : 'text-slate-600'}`}
                  >
                    {m.status === 'Vista' ? <CheckCircle className="w-5 h-5 fill-pink-500/20" /> : <Circle className="w-5 h-5" />}
                  </button>

                  <div>
                    <h4 className="text-xs font-bold text-white">{m.title}</h4>
                    <span className="text-[10px] text-slate-400">{m.genre} • Rec. por {m.recommendedBy}</span>
                  </div>
                </div>

                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                  m.status === 'Vista' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-pink-500/20 text-pink-300 border-pink-500/30'
                }`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Rest Modal */}
      {showAddRestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-serif">Añadir Restaurante</h3>

            <form onSubmit={handleCreateRest} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nombre del lugar:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Trattoria Bella..."
                  value={rName}
                  onChange={(e) => setRName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Tipo de cocina:</label>
                <input
                  type="text"
                  placeholder="Ej: Italiana, Japonesa, Mexicana..."
                  value={rCuisine}
                  onChange={(e) => setRCuisine(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Platos a probar / favoritos:</label>
                <input
                  type="text"
                  placeholder="Ej: Pasta de Trufa, Tiramisú..."
                  value={rDishes}
                  onChange={(e) => setRDishes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddRestModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Movie Modal */}
      {showAddMovieModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-serif">Añadir Película / Serie</h3>

            <form onSubmit={handleCreateMovie} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Título:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: La La Land, About Time..."
                  value={mTitle}
                  onChange={(e) => setMTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Género:</label>
                <input
                  type="text"
                  placeholder="Ej: Romance, Comedia, Ciencia Ficción..."
                  value={mGenre}
                  onChange={(e) => setMGenre(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMovieModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-600 text-white font-bold text-xs"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
