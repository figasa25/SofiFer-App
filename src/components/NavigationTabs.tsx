import React from 'react';
import { NavTab } from '../types';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  ShoppingCart,
  MessageCircle,
  Image as ImageIcon,
  ShieldCheck,
  MapPin,
  Flower2,
  Clock,
  Gift,
  UtensilsCrossed,
  Bot,
  Settings,
} from 'lucide-react';

interface NavigationTabsProps {
  activeTab: NavTab;
  onTabChange?: (tab: NavTab) => void;
  onSelectTab?: (tab: NavTab) => void;
  chatUnreadCount?: number;
  shoppingPendingCount?: number;
}

export const NAV_ITEMS: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
  { id: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'notes', label: 'Notas', icon: FileText },
  { id: 'shopping', label: 'Compras', icon: ShoppingCart },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'photos', label: 'Álbum', icon: ImageIcon },
  { id: 'vault', label: 'Caja Fuerte', icon: ShieldCheck },
  { id: 'location', label: 'Mapa', icon: MapPin },
  { id: 'cycle', label: 'Ciclo', icon: Flower2 },
  { id: 'timeline', label: 'Aniversario', icon: Clock },
  { id: 'wishlist', label: 'Deseos', icon: Gift },
  { id: 'restaurants', label: 'Citas & Cine', icon: UtensilsCrossed },
  { id: 'ai_assistant', label: 'Asistente IA', icon: Bot },
  { id: 'settings', label: 'Ajustes', icon: Settings },
];

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  onSelectTab,
  chatUnreadCount = 0,
  shoppingPendingCount = 0,
}) => {
  const handleSelect = (tab: NavTab) => {
    if (onTabChange) onTabChange(tab);
    if (onSelectTab) onSelectTab(tab);
  };

  return (
    <>
      {/* Desktop Navigation Header Bar */}
      <nav className="hidden lg:block w-full bg-[#080808]/80 backdrop-blur-md border-b border-white/10 px-6 py-2 sticky top-[69px] z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-start gap-1.5 overflow-x-auto no-scrollbar py-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 accent-text border border-[#C5A059]/40 shadow-md font-semibold'
                    : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-white/40'}`} />
                <span>{item.label}</span>

                {item.id === 'chat' && chatUnreadCount > 0 && (
                  <span className="w-4 h-4 bg-[#C5A059] text-black font-bold text-[9px] rounded-full flex items-center justify-center">
                    {chatUnreadCount}
                  </span>
                )}
                {item.id === 'shopping' && shoppingPendingCount > 0 && (
                  <span className="w-4 h-4 bg-emerald-500 text-black font-bold text-[9px] rounded-full flex items-center justify-center">
                    {shoppingPendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-2xl border-t border-white/10 px-2 py-2 shadow-2xl">
        <div className="flex items-center justify-around">
          {[
            NAV_ITEMS[0], // Inicio
            NAV_ITEMS[1], // Agenda
            NAV_ITEMS[3], // Compras
            NAV_ITEMS[4], // Chat
            NAV_ITEMS[12], // IA
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
                  isActive ? 'accent-text scale-105 font-bold' : 'text-white/40 hover:text-white'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.id === 'chat' && chatUnreadCount > 0 && (
                    <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#C5A059] text-black text-[8px] font-bold rounded-full flex items-center justify-center">
                      {chatUnreadCount}
                    </span>
                  )}
                  {item.id === 'shopping' && shoppingPendingCount > 0 && (
                    <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-emerald-500 text-black text-[8px] font-bold rounded-full flex items-center justify-center">
                      {shoppingPendingCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Horizontal Sub-Navigation Scroll */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-2 border-t border-white/10 mt-1 px-1">
          {NAV_ITEMS.slice(5).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white/10 accent-text border border-[#C5A059]/40 font-semibold'
                    : 'text-white/40 bg-white/5 hover:bg-white/10 border border-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

