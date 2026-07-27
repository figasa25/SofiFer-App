import {
  UserProfile,
  ThemeStyle,
  AffectionGIF,
  AffectionLog,
  CalendarEvent,
  NoteItem,
  ShoppingItem,
  ChatMessage,
  PhotoMedia,
  VideoMedia,
  VaultItem,
  PartnerLocation,
  FavoritePlace,
  CycleLog,
  TimelineMilestone,
  WishlistItem,
  CoupleGoal,
  RestaurantItem,
  MovieItem,
  SupabaseConfig,
} from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'sofifer_current_user',
  THEME: 'sofifer_theme',
  GIFS: 'sofifer_gifs',
  AFFECTION_LOGS: 'sofifer_affection_logs',
  EVENTS: 'sofifer_events',
  NOTES: 'sofifer_notes',
  SHOPPING: 'sofifer_shopping',
  CHAT: 'sofifer_chat',
  PHOTOS: 'sofifer_photos',
  VIDEOS: 'sofifer_videos',
  VAULT: 'sofifer_vault',
  VAULT_PIN: 'sofifer_vault_pin',
  LOCATIONS: 'sofifer_locations',
  PLACES: 'sofifer_places',
  CYCLE: 'sofifer_cycle',
  TIMELINE: 'sofifer_timeline',
  WISHLIST: 'sofifer_wishlist',
  GOALS: 'sofifer_goals',
  RESTAURANTS: 'sofifer_restaurants',
  MOVIES: 'sofifer_movies',
  SUPABASE: 'sofifer_supabase_config',
};

// Initial Seed Data for Sofi & Fer
export const DEFAULT_ANNIVERSARY = '2015-11-08T00:00:00';

export const DEFAULT_GIFS: AffectionGIF[] = [
  {
    id: 'gif-1',
    title: 'Quiero mimos',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkYXptMjFnNGdpdnhqOTVtbmpub28zcWs2cWNxdHBod3YxeGlsaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g01ZnwAUvctu0/giphy.gif',
    category: 'mimos',
    createdBy: 'Sofi',
  },
  {
    id: 'gif-2',
    title: 'Te extraño',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDVqbzN3Ym45bjNmdGlpd3dtMWRia29idmd3eDNqemI1djlzaTVrcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41K3o5TKSFi82756/giphy.gif',
    category: 'extrano',
    createdBy: 'Fer',
  },
  {
    id: 'gif-3',
    title: 'Estoy triste',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWdpeW5zNTd1eTh5bTVndThpNGtrNzUyc2Q3dHkzcjJnaDJ2dzUwcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L9543RG8PFuV2/giphy.gif',
    category: 'triste',
    createdBy: 'Sofi',
  },
  {
    id: 'gif-4',
    title: 'Estoy HOT 🔥',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNndrd3A0NDRzcm4wc3psdWtrbzRwNHdmbDRzMWo1ZWR6MHB0cWRucSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKoWXm3okO1mgHC/giphy.gif',
    category: 'hot',
    createdBy: 'Fer',
  },
];

export const DEFAULT_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'Aniversario Oficial SOFIFER 💕',
    date: '2026-11-08',
    time: '20:00',
    location: 'Nuestro lugar especial',
    category: 'Aniversario',
    notes: '¡Cumplimos un año más de amor incondicional desde 2015!',
    syncedWithGoogle: true,
    createdBy: 'Fer',
  },
  {
    id: 'ev-2',
    title: 'Noche de Cita & Sushi 🍣',
    date: '2026-07-31',
    time: '21:00',
    location: 'Restaurante Osaka',
    category: 'Cita',
    notes: 'Reservación a nombre de Fer.',
    createdBy: 'Sofi',
  },
];

export const DEFAULT_NOTES: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Cartita de Amor Sofi & Fer 💌',
    content: 'Desde el 08/11/2015 hemos construido el hogar más hermoso. Este espacio es nuestro santuario privado para organizarnos, soñar despiertos y recordarnos cuánto nos amamos.',
    tags: ['Amor', 'Hogar', 'Especial'],
    pinned: true,
    updatedAt: new Date().toISOString(),
    createdBy: 'Fer',
  },
  {
    id: 'note-2',
    title: 'Receta de Lasaña Favorita 🍝',
    content: '- 500g Carne picada magra\n- Salsa de tomate casera\n- Queso mozzarella & parmesano\n- Hornear a 180°C por 35 minutos',
    tags: ['Cocina', 'Recetas'],
    pinned: false,
    updatedAt: new Date().toISOString(),
    createdBy: 'Sofi',
  },
];

export const DEFAULT_SHOPPING: ShoppingItem[] = [
  { id: 'shop-1', text: 'Café molido en grano', category: 'Supermercado', completed: false, estimatedPrice: 8.5, addedBy: 'Sofi', createdAt: new Date().toISOString() },
  { id: 'shop-2', text: 'Vino Tinto Malbec', category: 'Supermercado', completed: true, estimatedPrice: 15.0, addedBy: 'Fer', createdAt: new Date().toISOString() },
  { id: 'shop-3', text: 'Flores frescas para el salón', category: 'Hogar', completed: false, estimatedPrice: 12.0, addedBy: 'Fer', createdAt: new Date().toISOString() },
  { id: 'shop-4', text: 'Chocolates negros 85%', category: 'Sorpresas', completed: false, estimatedPrice: 4.5, addedBy: 'Fer', createdAt: new Date().toISOString() },
];

export const DEFAULT_CHAT: ChatMessage[] = [
  { id: 'chat-1', sender: 'Fer', text: '¡Hola mi amor! Ya abrí nuestra PWA SOFIFER ❤️', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: 'chat-2', sender: 'Sofi', text: '¡Quedó hermosa! Me encanta que tengamos nuestro propio espacio privado 💕', timestamp: new Date(Date.now() - 1800000).toISOString() },
];

export const DEFAULT_TIMELINE: TimelineMilestone[] = [
  { id: 'tm-1', title: 'Nuestro Primer Beso', date: '2015-11-08', description: 'El día en que comenzó nuestra historia oficial de amor.', iconName: 'Heart' },
  { id: 'tm-2', title: 'Primer Viaje Juntos', date: '2016-07-15', description: 'Nuestra escapada inolvidable a la playa.', iconName: 'Compass' },
  { id: 'tm-3', title: 'Mudanza a Nuestro Hogar', date: '2020-03-01', description: 'Construyendo nuestro espacio SOFIFER.', iconName: 'Home' },
  { id: 'tm-4', title: 'Creación de SOFIFER App', date: '2026-07-27', description: 'Nuestra app privada PWA con IA y amor digital.', iconName: 'Sparkles' },
];

export const DEFAULT_PLACES: FavoritePlace[] = [
  { id: 'pl-1', name: 'Nuestra Casa SOFIFER', category: 'Lugar Especial', lat: 40.416775, lng: -3.70379, address: 'Centro de la ciudad', description: 'Donde vive el amor verdadero' },
  { id: 'pl-2', name: 'Parque del Primer Beso', category: 'Primer Beso', lat: 40.418, lng: -3.701, address: 'Mirador del Parque', description: '08/11/2015 - Un día inolvidable' },
];

export const DEFAULT_CYCLE: CycleLog = {
  startDate: '2026-07-15',
  cycleLengthDays: 28,
  periodLengthDays: 5,
  lastPeriodDate: '2026-07-15',
  symptoms: ['Sensibilidad', 'Antojo dulce', 'Cansancio leve'],
  notes: 'Consejos para Fer: prepararle té de manzanilla, mimos y chocolatina negra.',
};

export const DEFAULT_WISHLIST: WishlistItem[] = [
  { id: 'wl-1', title: 'Viaje a Japón en Primavera', category: 'Viaje', estimatedCost: 3500, completed: false, addedBy: 'Sofi' },
  { id: 'wl-2', title: 'Proyector 4K para Noches de Cine', category: 'Tecnología', estimatedCost: 450, completed: false, addedBy: 'Fer' },
];

export const DEFAULT_GOALS: CoupleGoal[] = [
  { id: 'g-1', title: 'Fondo para Viaje Aniversario 2026', targetAmount: 2000, currentAmount: 1350, targetDate: '2026-11-01', category: 'Viaje', completed: false },
  { id: 'g-2', title: 'Remodelación Balcón / Terraza', targetAmount: 800, currentAmount: 500, targetDate: '2026-09-15', category: 'Hogar', completed: false },
];

export const DEFAULT_RESTAURANTS: RestaurantItem[] = [
  { id: 'rest-1', name: 'Bistró de la Esquina', cuisine: 'Italiana & Pastas', location: 'Calle Mayor 12', rating: 5, favoriteDishes: 'Raviolis de trufa y Tiramisú', visited: true },
  { id: 'rest-2', name: 'Sakura Omakase', cuisine: 'Japonesa', location: 'Av. Principal 45', rating: 4, favoriteDishes: 'Nigiris de salmón flameado', visited: false },
];

export const DEFAULT_MOVIES: MovieItem[] = [
  { id: 'm-1', title: 'About Time (Cuestión de Tiempo)', genre: 'Romance / Drama', status: 'Vista', rating: 5, review: 'Nuestra peli favorita sobre apreciar cada día juntos.', recommendedBy: 'Sofi' },
  { id: 'm-2', title: 'La La Land', genre: 'Musical / Romance', status: 'Vista', rating: 5, review: 'Banda sonora increíble.', recommendedBy: 'Fer' },
  { id: 'm-3', title: 'Interstellar', genre: 'Ciencia Ficción', status: 'Por ver', recommendedBy: 'Fer' },
];

// Helper to load or init local state safely
export const DEFAULT_PARTNER_LOCATION: PartnerLocation = {
  user: 'Sofi',
  lat: 40.416775,
  lng: -3.70379,
  address: 'Mirador del Parque',
  batteryLevel: 88,
  isCharging: false,
  lastUpdated: new Date().toISOString(),
  statusMood: 'Feliz & Extrañándote 💕',
};

export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("Storage write failed", err);
  }
}

export const StorageService = {
  getCurrentUser: (): UserProfile => getStoredData(STORAGE_KEYS.CURRENT_USER, 'Sofi'),
  setCurrentUser: (user: UserProfile) => setStoredData(STORAGE_KEYS.CURRENT_USER, user),

  getTheme: (): ThemeStyle => getStoredData(STORAGE_KEYS.THEME, 'dark-luxury'),
  setTheme: (theme: ThemeStyle) => setStoredData(STORAGE_KEYS.THEME, theme),

  getGIFs: (): AffectionGIF[] => getStoredData(STORAGE_KEYS.GIFS, DEFAULT_GIFS),
  setGIFs: (gifs: AffectionGIF[]) => setStoredData(STORAGE_KEYS.GIFS, gifs),

  getAffectionLogs: (): AffectionLog[] => getStoredData(STORAGE_KEYS.AFFECTION_LOGS, []),
  addAffectionLog: (log: AffectionLog) => {
    const logs = StorageService.getAffectionLogs();
    setStoredData(STORAGE_KEYS.AFFECTION_LOGS, [log, ...logs]);
  },

  getEvents: (): CalendarEvent[] => getStoredData(STORAGE_KEYS.EVENTS, DEFAULT_EVENTS),
  setEvents: (events: CalendarEvent[]) => setStoredData(STORAGE_KEYS.EVENTS, events),
  saveEvents: (events: CalendarEvent[]) => setStoredData(STORAGE_KEYS.EVENTS, events),

  getNotes: (): NoteItem[] => getStoredData(STORAGE_KEYS.NOTES, DEFAULT_NOTES),
  setNotes: (notes: NoteItem[]) => setStoredData(STORAGE_KEYS.NOTES, notes),
  saveNotes: (notes: NoteItem[]) => setStoredData(STORAGE_KEYS.NOTES, notes),

  getShoppingList: (): ShoppingItem[] => getStoredData(STORAGE_KEYS.SHOPPING, DEFAULT_SHOPPING),
  getShoppingItems: (): ShoppingItem[] => getStoredData(STORAGE_KEYS.SHOPPING, DEFAULT_SHOPPING),
  setShoppingList: (items: ShoppingItem[]) => setStoredData(STORAGE_KEYS.SHOPPING, items),
  saveShoppingItems: (items: ShoppingItem[]) => setStoredData(STORAGE_KEYS.SHOPPING, items),

  getChat: (): ChatMessage[] => getStoredData(STORAGE_KEYS.CHAT, DEFAULT_CHAT),
  getChatMessages: (): ChatMessage[] => getStoredData(STORAGE_KEYS.CHAT, DEFAULT_CHAT),
  setChat: (messages: ChatMessage[]) => setStoredData(STORAGE_KEYS.CHAT, messages),
  saveChatMessages: (messages: ChatMessage[]) => setStoredData(STORAGE_KEYS.CHAT, messages),

  getPhotos: (): PhotoMedia[] => getStoredData(STORAGE_KEYS.PHOTOS, []),
  setPhotos: (photos: PhotoMedia[]) => setStoredData(STORAGE_KEYS.PHOTOS, photos),
  savePhotos: (photos: PhotoMedia[]) => setStoredData(STORAGE_KEYS.PHOTOS, photos),

  getVideos: (): VideoMedia[] => getStoredData(STORAGE_KEYS.VIDEOS, []),
  setVideos: (videos: VideoMedia[]) => setStoredData(STORAGE_KEYS.VIDEOS, videos),

  getVaultItems: (): VaultItem[] => getStoredData(STORAGE_KEYS.VAULT, []),
  setVaultItems: (items: VaultItem[]) => setStoredData(STORAGE_KEYS.VAULT, items),
  saveVaultItems: (items: VaultItem[]) => setStoredData(STORAGE_KEYS.VAULT, items),

  getVaultPIN: (): string => getStoredData(STORAGE_KEYS.VAULT_PIN, '1234'),
  setVaultPIN: (pin: string) => setStoredData(STORAGE_KEYS.VAULT_PIN, pin),
  saveVaultPIN: (pin: string) => setStoredData(STORAGE_KEYS.VAULT_PIN, pin),

  getPartnerLocation: (): PartnerLocation => getStoredData(STORAGE_KEYS.LOCATIONS, DEFAULT_PARTNER_LOCATION),
  setPartnerLocation: (loc: PartnerLocation) => setStoredData(STORAGE_KEYS.LOCATIONS, loc),

  getPlaces: (): FavoritePlace[] => getStoredData(STORAGE_KEYS.PLACES, DEFAULT_PLACES),
  getFavoritePlaces: (): FavoritePlace[] => getStoredData(STORAGE_KEYS.PLACES, DEFAULT_PLACES),
  setPlaces: (places: FavoritePlace[]) => setStoredData(STORAGE_KEYS.PLACES, places),
  saveFavoritePlaces: (places: FavoritePlace[]) => setStoredData(STORAGE_KEYS.PLACES, places),

  getCycle: (): CycleLog => getStoredData(STORAGE_KEYS.CYCLE, DEFAULT_CYCLE),
  getCycleLog: (): CycleLog => getStoredData(STORAGE_KEYS.CYCLE, DEFAULT_CYCLE),
  setCycle: (cycle: CycleLog) => setStoredData(STORAGE_KEYS.CYCLE, cycle),
  saveCycleLog: (cycle: CycleLog) => setStoredData(STORAGE_KEYS.CYCLE, cycle),

  getTimeline: (): TimelineMilestone[] => getStoredData(STORAGE_KEYS.TIMELINE, DEFAULT_TIMELINE),
  setTimeline: (timeline: TimelineMilestone[]) => setStoredData(STORAGE_KEYS.TIMELINE, timeline),
  saveTimeline: (timeline: TimelineMilestone[]) => setStoredData(STORAGE_KEYS.TIMELINE, timeline),

  getWishlist: (): WishlistItem[] => getStoredData(STORAGE_KEYS.WISHLIST, DEFAULT_WISHLIST),
  setWishlist: (wishlist: WishlistItem[]) => setStoredData(STORAGE_KEYS.WISHLIST, wishlist),
  saveWishlist: (wishlist: WishlistItem[]) => setStoredData(STORAGE_KEYS.WISHLIST, wishlist),

  getGoals: (): CoupleGoal[] => getStoredData(STORAGE_KEYS.GOALS, DEFAULT_GOALS),
  setGoals: (goals: CoupleGoal[]) => setStoredData(STORAGE_KEYS.GOALS, goals),
  saveGoals: (goals: CoupleGoal[]) => setStoredData(STORAGE_KEYS.GOALS, goals),

  getRestaurants: (): RestaurantItem[] => getStoredData(STORAGE_KEYS.RESTAURANTS, DEFAULT_RESTAURANTS),
  setRestaurants: (restaurants: RestaurantItem[]) => setStoredData(STORAGE_KEYS.RESTAURANTS, restaurants),
  saveRestaurants: (restaurants: RestaurantItem[]) => setStoredData(STORAGE_KEYS.RESTAURANTS, restaurants),

  getMovies: (): MovieItem[] => getStoredData(STORAGE_KEYS.MOVIES, DEFAULT_MOVIES),
  setMovies: (movies: MovieItem[]) => setStoredData(STORAGE_KEYS.MOVIES, movies),
  saveMovies: (movies: MovieItem[]) => setStoredData(STORAGE_KEYS.MOVIES, movies),

  getSupabaseConfig: (): SupabaseConfig => getStoredData(STORAGE_KEYS.SUPABASE, { url: '', anonKey: '', connected: false }),
  setSupabaseConfig: (config: SupabaseConfig) => setStoredData(STORAGE_KEYS.SUPABASE, config),

  // Full backup JSON export
  exportBackup: () => {
    const backupObj: Record<string, any> = {};
    Object.values(STORAGE_KEYS).forEach((key) => {
      backupObj[key] = localStorage.getItem(key);
    });
    const blob = new Blob([JSON.stringify(backupObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOFIFER_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  // Import JSON backup
  importBackup: (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      Object.keys(parsed).forEach((key) => {
        if (parsed[key] !== null) {
          localStorage.setItem(key, parsed[key]);
        }
      });
      return true;
    } catch {
      return false;
    }
  },
};
