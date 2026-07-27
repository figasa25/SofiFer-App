import React from 'react';
import { UserProfile, ThemeStyle } from '../types';
import { Heart, Sparkles, Download, Palette } from 'lucide-react';

interface HeaderNavbarProps {
  currentUser: UserProfile;
  onSelectUser?: (user: UserProfile) => void;
  onUserChange?: (user: UserProfile) => void;
  theme?: ThemeStyle;
  onThemeChange?: (theme: ThemeStyle) => void;
  canInstallPWA?: boolean;
  onInstallPWA?: () => void;
  unreadAffectionCount?: number;
  onOpenAffectionModal?: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  currentUser,
  onSelectUser,
  onUserChange,
  theme = 'dark-luxury',
  onThemeChange,
  canInstallPWA = false,
  onInstallPWA,
  unreadAffectionCount = 0,
  onOpenAffectionModal,
}) => {
  const handleUserChange = (user: UserProfile) => {
    if (onSelectUser) onSelectUser(user);
    if (onUserChange) onUserChange(user);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#080808]/80 border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Identity */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C5A059] to-[#8E6E3E] p-[1.5px] shadow-lg shadow-[#C5A059]/10">
              <div className="w-full h-full bg-[#080808] rounded-[14px] flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#C5A059] fill-[#C5A059]/20" />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 status-dot bg-emerald-400 text-emerald-400" title="Sincronizado" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight accent-text">
                SOFIFER
              </h1>
              <span className="text-[10px] uppercase font-mono tracking-[0.15em] px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10">
                Ecosistema Privado
              </span>
            </div>
            <p className="text-xs font-serif italic text-white/50 hidden sm:block">
              Sofi & Fer • Desde el 08/11/2015 💕
            </p>
          </div>
        </div>

        {/* User Switcher & Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick Affection Notification Badge */}
          {onOpenAffectionModal && (
            <button
              onClick={onOpenAffectionModal}
              className="relative px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#C5A059] border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              title="Enviar cariño a tu pareja"
            >
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span className="hidden md:inline">Enviar Cariño</span>
              {unreadAffectionCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C5A059] text-black font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                  {unreadAffectionCount}
                </span>
              )}
            </button>
          )}

          {/* User Selector Pill */}
          <div className="glass p-1 rounded-2xl flex items-center gap-1 border-white/10">
            <button
              onClick={() => handleUserChange('Sofi')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                currentUser === 'Sofi'
                  ? 'accent-bg text-black shadow-md font-bold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <span>Sofi</span>
              <span className="text-[10px]">💖</span>
            </button>
            <button
              onClick={() => handleUserChange('Fer')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                currentUser === 'Fer'
                  ? 'accent-bg text-black shadow-md font-bold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <span>Fer</span>
              <span className="text-[10px]">💙</span>
            </button>
          </div>

          {/* Theme Quick Toggle */}
          {onThemeChange && (
            <button
              onClick={() => {
                const themes: ThemeStyle[] = ['dark-luxury', 'rose-gold', 'emerald-night', 'light-cream'];
                const currentIdx = theme ? (themes as string[]).indexOf(theme) : 0;
                const nextIdx = currentIdx >= 0 ? (currentIdx + 1) % themes.length : 0;
                onThemeChange(themes[nextIdx]);
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all"
              title="Cambiar Apariencia"
            >
              <Palette className="w-4 h-4 text-[#C5A059]" />
            </button>
          )}

          {/* PWA Install Button */}
          {canInstallPWA && onInstallPWA && (
            <button
              onClick={onInstallPWA}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Instalar SOFIFER como App PWA"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Instalar PWA</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

