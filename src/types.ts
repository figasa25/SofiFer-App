// Global Types for SOFIFER Couple PWA

export type UserProfile = 'Sofi' | 'Fer';

export type NavTab =
  | 'dashboard'
  | 'agenda'
  | 'notes'
  | 'shopping'
  | 'chat'
  | 'photos'
  | 'vault'
  | 'location'
  | 'cycle'
  | 'timeline'
  | 'wishlist'
  | 'restaurants'
  | 'ai_assistant'
  | 'settings';

export type ThemeStyle = 'dark-luxury' | 'rose-gold' | 'emerald-night' | 'light-cream';

export interface AffectionGIF {
  id: string;
  title: string; // e.g., "Quiero mimos", "Te extraño", "Estoy triste", "Estoy HOT"
  gifUrl: string;
  category: 'mimos' | 'extrano' | 'triste' | 'hot' | 'custom';
  createdBy: UserProfile;
  customSound?: string;
}

export interface AffectionLog {
  id: string;
  fromUser: UserProfile;
  gifTitle: string;
  gifUrl: string;
  message?: string;
  timestamp: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  location?: string;
  category: 'Aniversario' | 'Cita' | 'Viaje' | 'Médico' | 'Hogar' | 'Otro';
  notes?: string;
  syncedWithGoogle?: boolean;
  createdBy: UserProfile;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  pinned: boolean;
  audioUrl?: string; // Voice note
  updatedAt: string;
  createdBy: UserProfile;
}

export interface ShoppingItem {
  id: string;
  text: string;
  category: 'Supermercado' | 'Hogar' | 'Farmacia' | 'Sorpresas';
  completed: boolean;
  estimatedPrice?: number;
  addedBy: UserProfile;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: UserProfile;
  text?: string;
  audioUrl?: string;
  imageUrl?: string;
  affectionGif?: string;
  reaction?: string;
  timestamp: string;
}

export interface PhotoMedia {
  id: string;
  title: string;
  url: string;
  album: 'Viajes' | 'Citas' | 'Nuestra Casa' | 'Momentos Especiales';
  date: string;
  location?: string;
  favorite: boolean;
  uploadedBy: UserProfile;
}

export interface VideoMedia {
  id: string;
  title: string;
  url: string;
  duration?: string;
  date: string;
  uploadedBy: UserProfile;
}

export interface VaultItem {
  id: string;
  title: string;
  category: 'Documento' | 'Contraseña' | 'Carta Secreta' | 'Plan Sorpresa';
  encryptedContent: string; // AES Encrypted string
  updatedAt: string;
}

export interface PartnerLocation {
  user: UserProfile;
  lat: number;
  lng: number;
  address: string;
  batteryLevel: number;
  isCharging: boolean;
  lastUpdated: string;
  statusMood: string;
}

export interface FavoritePlace {
  id: string;
  name: string;
  category: 'Restaurante' | 'Primer Beso' | 'Viaje' | 'Lugar Especial';
  lat: number;
  lng: number;
  address: string;
  description: string;
  photoUrl?: string;
}

export interface CycleLog {
  startDate: string; // YYYY-MM-DD
  cycleLengthDays: number; // default 28
  periodLengthDays: number; // default 5
  lastPeriodDate: string;
  symptoms: string[];
  notes?: string;
}

export interface TimelineMilestone {
  id: string;
  title: string;
  date: string;
  description: string;
  iconName: string;
  imageUrl?: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  category: 'Viaje' | 'Tecnología' | 'Hogar' | 'Experiencia' | 'Ropa';
  estimatedCost?: number;
  url?: string;
  completed: boolean;
  addedBy: UserProfile;
}

export interface CoupleGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: 'Ahorro' | 'Viaje' | 'Proyecto' | 'Hogar';
  completed: boolean;
}

export interface RestaurantItem {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number; // 1-5
  favoriteDishes: string;
  visited: boolean;
  notes?: string;
}

export interface MovieItem {
  id: string;
  title: string;
  genre: string;
  status: 'Por ver' | 'Vista';
  rating?: number; // 1-5
  review?: string;
  recommendedBy: UserProfile;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  connected: boolean;
}
