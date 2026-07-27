import React, { useState } from 'react';
import { PhotoMedia, UserProfile } from '../types';
import { Image as ImageIcon, Plus, Heart, Star, MapPin, Calendar, X, Film } from 'lucide-react';

interface MediaVaultViewProps {
  currentUser: UserProfile;
  photos: PhotoMedia[];
  onAddPhoto: (photo: PhotoMedia) => void;
  onToggleFavorite: (id: string) => void;
}

export const MediaVaultView: React.FC<MediaVaultViewProps> = ({
  currentUser,
  photos,
  onAddPhoto,
  onToggleFavorite,
}) => {
  const [selectedAlbum, setSelectedAlbum] = useState<string>('Todos');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMedia | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New photo form
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [album, setAlbum] = useState<PhotoMedia['album']>('Momentos Especiales');
  const [location, setLocation] = useState('');

  const samplePhotos: PhotoMedia[] = [
    {
      id: 'p-1',
      title: 'Paseo al Atardecer 🌅',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      album: 'Citas',
      date: '2026-06-12',
      location: 'Mirador del Parque',
      favorite: true,
      uploadedBy: 'Fer',
    },
    {
      id: 'p-2',
      title: 'Noche de Vino & Lasaña 🍷',
      url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      album: 'Nuestra Casa',
      date: '2026-05-20',
      location: 'Hogar SOFIFER',
      favorite: false,
      uploadedBy: 'Sofi',
    },
    {
      id: 'p-3',
      title: 'Escapada a la Playa 🏖️',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      album: 'Viajes',
      date: '2025-08-14',
      location: 'Costa del Sol',
      favorite: true,
      uploadedBy: 'Fer',
    },
  ];

  const allPhotos = photos.length > 0 ? photos : samplePhotos;

  const filteredPhotos = selectedAlbum === 'Todos'
    ? allPhotos
    : allPhotos.filter((p) => p.album === selectedAlbum);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    const newP: PhotoMedia = {
      id: `p-${Date.now()}`,
      title,
      url,
      album,
      date: new Date().toISOString().slice(0, 10),
      location: location.trim() || undefined,
      favorite: false,
      uploadedBy: currentUser,
    };

    onAddPhoto(newP);
    setShowUploadModal(false);
    setTitle('');
    setUrl('');
    setLocation('');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">Álbum Privado Sofi & Fer</h2>
          </div>
          <p className="text-xs text-slate-400">Nuestros recuerdos fotográficos y vídeos más preciados 💕</p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-md shadow-pink-500/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Subir Foto</span>
        </button>
      </div>

      {/* Album Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {['Todos', 'Viajes', 'Citas', 'Nuestra Casa', 'Momentos Especiales'].map((alb) => (
          <button
            key={alb}
            onClick={() => setSelectedAlbum(alb)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedAlbum === alb
                ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {alb}
          </button>
        ))}
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer shadow-lg hover:border-pink-500/50 transition-all"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
              <h3 className="text-xs font-bold text-white truncate">{photo.title}</h3>
              <p className="text-[10px] text-slate-300 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-pink-400" /> {photo.date}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(photo.id);
              }}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/70 backdrop-blur-md text-amber-400"
            >
              <Star className={`w-3.5 h-3.5 ${photo.favorite ? 'fill-amber-400' : 'text-slate-400'}`} />
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-950/80 text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-2/3 h-64 md:h-auto bg-black flex items-center justify-center">
              <img src={selectedPhoto.url} alt={selectedPhoto.title} className="max-h-[80vh] w-full object-contain" />
            </div>

            <div className="w-full md:w-1/3 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {selectedPhoto.album}
                </span>
                <h3 className="text-lg font-bold text-white font-serif">{selectedPhoto.title}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-pink-400" /> {selectedPhoto.date}
                </p>
                {selectedPhoto.location && (
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> {selectedPhoto.location}
                  </p>
                )}
              </div>

              <div className="text-xs text-slate-500 pt-4 border-t border-slate-800">
                Subido por {selectedPhoto.uploadedBy} 💕
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-serif">Subir Foto al Álbum</h3>

            <form onSubmit={handleUpload} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Título de la foto:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Atardecer en el parque..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">URL de la Imagen / Archivo:</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Álbum:</label>
                <select
                  value={album}
                  onChange={(e: any) => setAlbum(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                >
                  <option value="Viajes">Viajes</option>
                  <option value="Citas">Citas</option>
                  <option value="Nuestra Casa">Nuestra Casa</option>
                  <option value="Momentos Especiales">Momentos Especiales</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Ubicación (Opcional):</label>
                <input
                  type="text"
                  placeholder="Ej: Barcelona, Madrid, Nuestra Casa..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs"
                >
                  Guardar Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
