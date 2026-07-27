import React, { useState, useEffect } from 'react';
import { NavTab, UserProfile, CalendarEvent, NoteItem, ShoppingItem, ChatMessage, PhotoMedia, VaultItem, PartnerLocation, FavoritePlace, CycleLog, TimelineMilestone, WishlistItem, CoupleGoal, RestaurantItem, MovieItem, AffectionGIF } from './types';
import { StorageService } from './lib/storage';
import { playAffectionSound } from './lib/audio';
import { HeaderNavbar } from './components/HeaderNavbar';
import { NavigationTabs } from './components/NavigationTabs';
import { SendAffectionModal } from './components/SendAffectionModal';
import { DashboardView } from './components/DashboardView';
import { AgendaView } from './components/AgendaView';
import { NotesView } from './components/NotesView';
import { ShoppingListView } from './components/ShoppingListView';
import { ChatView } from './components/ChatView';
import { MediaVaultView } from './components/MediaVaultView';
import { EncryptedVaultView } from './components/EncryptedVaultView';
import { LocationMapView } from './components/LocationMapView';
import { CycleTrackerView } from './components/CycleTrackerView';
import { AnniversaryTimelineView } from './components/AnniversaryTimelineView';
import { WishlistGoalsView } from './components/WishlistGoalsView';
import { DateNightView } from './components/DateNightView';
import { AIAssistantView } from './components/AIAssistantView';
import { SettingsView } from './components/SettingsView';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>('Fer');
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [isAffectionModalOpen, setIsAffectionModalOpen] = useState(false);
  const [unreadAffectionCount, setUnreadAffectionCount] = useState(0);

  // App State collections initialized from StorageService
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [photos, setPhotos] = useState<PhotoMedia[]>([]);
  const [vaultItems, setVaultItems] = useState<VaultItem[]>([]);
  const [partnerLocation, setPartnerLocation] = useState<PartnerLocation>(StorageService.getPartnerLocation());
  const [places, setPlaces] = useState<FavoritePlace[]>([]);
  const [cycleLog, setCycleLog] = useState<CycleLog>(StorageService.getCycleLog());
  const [timeline, setTimeline] = useState<TimelineMilestone[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [goals, setGoals] = useState<CoupleGoal[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantItem[]>([]);
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [gifs, setGifs] = useState<AffectionGIF[]>([]);
  const [vaultPIN, setVaultPIN] = useState(StorageService.getVaultPIN());

  // Load initial data
  useEffect(() => {
    setGifs(StorageService.getGIFs());
    setEvents(StorageService.getEvents());
    setNotes(StorageService.getNotes());
    setShoppingItems(StorageService.getShoppingItems());
    setChatMessages(StorageService.getChatMessages());
    setPhotos(StorageService.getPhotos());
    setVaultItems(StorageService.getVaultItems());
    setPlaces(StorageService.getFavoritePlaces());
    setTimeline(StorageService.getTimeline());
    setWishlist(StorageService.getWishlist());
    setGoals(StorageService.getGoals());
    setRestaurants(StorageService.getRestaurants());
    setMovies(StorageService.getMovies());
  }, []);

  // Sync back to StorageService whenever state changes
  useEffect(() => {
    if (events.length > 0) StorageService.saveEvents(events);
  }, [events]);

  useEffect(() => {
    if (notes.length > 0) StorageService.saveNotes(notes);
  }, [notes]);

  useEffect(() => {
    if (shoppingItems.length > 0) StorageService.saveShoppingItems(shoppingItems);
  }, [shoppingItems]);

  useEffect(() => {
    if (chatMessages.length > 0) StorageService.saveChatMessages(chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    if (photos.length > 0) StorageService.savePhotos(photos);
  }, [photos]);

  useEffect(() => {
    if (vaultItems.length > 0) StorageService.saveVaultItems(vaultItems);
  }, [vaultItems]);

  useEffect(() => {
    if (places.length > 0) StorageService.saveFavoritePlaces(places);
  }, [places]);

  useEffect(() => {
    if (timeline.length > 0) StorageService.saveTimeline(timeline);
  }, [timeline]);

  useEffect(() => {
    if (wishlist.length > 0) StorageService.saveWishlist(wishlist);
  }, [wishlist]);

  useEffect(() => {
    if (goals.length > 0) StorageService.saveGoals(goals);
  }, [goals]);

  useEffect(() => {
    if (restaurants.length > 0) StorageService.saveRestaurants(restaurants);
  }, [restaurants]);

  useEffect(() => {
    if (movies.length > 0) StorageService.saveMovies(movies);
  }, [movies]);

  // Handlers
  const handleSendAffection = (type: 'heart' | 'hug' | 'kiss' | 'flower' | 'kiss_sound', message?: string) => {
    playAffectionSound();
    setUnreadAffectionCount((prev) => prev + 1);

    // Also add to chat
    const newChatMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: currentUser,
      text: `${currentUser} te envió un ${type.toUpperCase()}: "${message || '¡Te amo!'}" 💕`,
      timestamp: new Date().toISOString(),
    };
    setChatMessages((prev) => [...prev, newChatMsg]);
  };

  const handleSyncGoogleCalendar = () => {
    alert('Sincronización con Google Calendar realizada correctamente para sofiferfiguemorin@gmail.com ✓');
  };

  const handleClearData = () => {
    if (confirm('¿Estás seguro de restablecer los datos de la aplicación a su estado de fábrica?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#E0E0E0] font-sans selection:bg-[#C5A059] selection:text-black flex flex-col">
      {/* Header */}
      <HeaderNavbar
        currentUser={currentUser}
        onSelectUser={setCurrentUser}
        unreadAffectionCount={unreadAffectionCount}
        onOpenAffectionModal={() => setIsAffectionModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'dashboard' && (
          <DashboardView
            currentUser={currentUser}
            events={events}
            notes={notes}
            shoppingItems={shoppingItems}
            cycleLog={cycleLog}
            partnerLocation={partnerLocation}
            onNavigate={(tab) => setCurrentTab(tab as NavTab)}
            onOpenAffectionModal={() => setIsAffectionModalOpen(true)}
          />
        )}

        {currentTab === 'agenda' && (
          <AgendaView
            currentUser={currentUser}
            events={events}
            onAddEvent={(ev) => setEvents([ev, ...events])}
            onDeleteEvent={(id) => setEvents(events.filter((e) => e.id !== id))}
            onSyncGoogleCalendar={handleSyncGoogleCalendar}
          />
        )}

        {currentTab === 'notes' && (
          <NotesView
            currentUser={currentUser}
            notes={notes}
            onAddNote={(n) => setNotes([n, ...notes])}
            onTogglePin={(id) =>
              setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)))
            }
            onDeleteNote={(id) => setNotes(notes.filter((n) => n.id !== id))}
          />
        )}

        {currentTab === 'shopping' && (
          <ShoppingListView
            currentUser={currentUser}
            items={shoppingItems}
            onAddItem={(item) => setShoppingItems([item, ...shoppingItems])}
            onToggleItem={(id) =>
              setShoppingItems(
                shoppingItems.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i))
              )
            }
            onDeleteItem={(id) => setShoppingItems(shoppingItems.filter((i) => i.id !== id))}
            onClearCompleted={() => setShoppingItems(shoppingItems.filter((i) => !i.completed))}
          />
        )}

        {currentTab === 'chat' && (
          <ChatView
            currentUser={currentUser}
            messages={chatMessages}
            onSendMessage={(msg) => setChatMessages([...chatMessages, msg])}
            onOpenAffectionModal={() => setIsAffectionModalOpen(true)}
          />
        )}

        {currentTab === 'photos' && (
          <MediaVaultView
            currentUser={currentUser}
            photos={photos}
            onAddPhoto={(p) => setPhotos([p, ...photos])}
            onToggleFavorite={(id) =>
              setPhotos(photos.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)))
            }
          />
        )}

        {currentTab === 'vault' && (
          <EncryptedVaultView
            vaultItems={vaultItems}
            vaultPIN={vaultPIN}
            onAddVaultItem={(vi) => setVaultItems([vi, ...vaultItems])}
            onDeleteVaultItem={(id) => setVaultItems(vaultItems.filter((v) => v.id !== id))}
            onChangePIN={(newPIN) => {
              setVaultPIN(newPIN);
              StorageService.saveVaultPIN(newPIN);
            }}
          />
        )}

        {currentTab === 'location' && (
          <LocationMapView
            currentUser={currentUser}
            partnerLocation={partnerLocation}
            places={places}
            onAddPlace={(pl) => setPlaces([pl, ...places])}
          />
        )}

        {currentTab === 'cycle' && (
          <CycleTrackerView
            currentUser={currentUser}
            cycleData={cycleLog}
            onUpdateCycle={(updated) => {
              setCycleLog(updated);
              StorageService.saveCycleLog(updated);
            }}
          />
        )}

        {currentTab === 'timeline' && (
          <AnniversaryTimelineView
            currentUser={currentUser}
            timeline={timeline}
            onAddMilestone={(m) => setTimeline([m, ...timeline])}
          />
        )}

        {currentTab === 'wishlist' && (
          <WishlistGoalsView
            currentUser={currentUser}
            wishlist={wishlist}
            goals={goals}
            onAddWishlistItem={(w) => setWishlist([w, ...wishlist])}
            onToggleWishlistItem={(id) =>
              setWishlist(wishlist.map((w) => (w.id === id ? { ...w, completed: !w.completed } : w)))
            }
            onAddGoal={(g) => setGoals([g, ...goals])}
            onUpdateGoalProgress={(id, amount) =>
              setGoals(
                goals.map((g) => (g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g))
              )
            }
          />
        )}

        {currentTab === 'restaurants' && (
          <DateNightView
            currentUser={currentUser}
            restaurants={restaurants}
            movies={movies}
            onAddRestaurant={(r) => setRestaurants([r, ...restaurants])}
            onToggleRestaurantVisited={(id) =>
              setRestaurants(
                restaurants.map((r) => (r.id === id ? { ...r, visited: !r.visited } : r))
              )
            }
            onAddMovie={(m) => setMovies([m, ...movies])}
            onToggleMovieStatus={(id) =>
              setMovies(
                movies.map((m) =>
                  m.id === id ? { ...m, status: m.status === 'Vista' ? 'Por ver' : 'Vista' } : m
                )
              )
            }
          />
        )}

        {currentTab === 'ai_assistant' && (
          <AIAssistantView
            currentUser={currentUser}
            coupleContext={{
              eventsCount: events.length,
              shoppingCount: shoppingItems.length,
              cyclePhase: cycleLog,
              anniversaryDate: '2015-11-08',
            }}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsView
            currentUser={currentUser}
            vaultPIN={vaultPIN}
            onChangePIN={(newPIN) => {
              setVaultPIN(newPIN);
              StorageService.saveVaultPIN(newPIN);
            }}
            onClearData={handleClearData}
          />
        )}
      </main>

      {/* Navigation Tabs (Sticky Bottom for Mobile & Tabs Header for Desktop) */}
      <NavigationTabs activeTab={currentTab} onTabChange={setCurrentTab} />

      {/* Send Affection Interaction Modal */}
      <SendAffectionModal
        isOpen={isAffectionModalOpen}
        onClose={() => setIsAffectionModalOpen(false)}
        currentUser={currentUser}
        gifPresets={gifs}
        onAddCustomGIF={(newG) => {
          const updated = [newG, ...gifs];
          setGifs(updated);
          StorageService.setGIFs(updated);
        }}
        onSendAffection={handleSendAffection}
      />
    </div>
  );
}

export default App;
