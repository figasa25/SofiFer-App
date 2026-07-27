import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Settings, Shield, Bell, Smartphone, Key, Lock, RefreshCw, CheckCircle, Mail, Download } from 'lucide-react';

interface SettingsViewProps {
  currentUser: UserProfile;
  vaultPIN: string;
  onChangePIN: (newPIN: string) => void;
  onClearData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentUser,
  vaultPIN,
  onChangePIN,
  onClearData,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [pinInput, setPinInput] = useState(vaultPIN);
  const [isPinSaved, setIsPinSaved] = useState(false);

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.length >= 4) {
      onChangePIN(pinInput);
      setIsPinSaved(true);
      setTimeout(() => setIsPinSaved(false), 2000);
    }
  };

  const handleToggleNotifications = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') {
          setNotificationsEnabled(true);
          new Notification('SOFIFER PWA', {
            body: '¡Notificaciones activadas para Sofi & Fer! 💕',
          });
        }
      });
    } else {
      setNotificationsEnabled(!notificationsEnabled);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="p-2.5 rounded-2xl bg-slate-800 text-slate-300">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-serif text-white">Configuración SOFIFER PWA</h2>
          <p className="text-xs text-slate-400">Ajustes de sincronización Google, seguridad y PWA</p>
        </div>
      </div>

      {/* Account Info */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Mail className="w-4 h-4 text-rose-400" />
          <span>Cuenta Google Compartida</span>
        </h3>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-mono font-bold text-rose-300">sofiferfiguemorin@gmail.com</p>
            <p className="text-[10px] text-slate-400">Agenda, notas y copias de seguridad vinculadas.</p>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
            Conectado ✓
          </span>
        </div>
      </div>

      {/* Security PIN Change */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-400" />
          <span>PIN de la Caja Fuerte Cifrada</span>
        </h3>

        <form onSubmit={handleSavePin} className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">PIN Actual / Nuevo PIN (min 4 dígitos):</label>
            <input
              type="password"
              maxLength={6}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full max-w-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
            >
              Guardar Nuevo PIN
            </button>
            {isPinSaved && <span className="text-xs text-emerald-400 font-bold">¡PIN Guardado! ✓</span>}
          </div>
        </form>
      </div>

      {/* Push Notifications & PWA */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-purple-400" />
          <span>Notificaciones & Instalación PWA</span>
        </h3>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div>
            <h4 className="text-xs font-bold text-white">Notificaciones Web Push</h4>
            <p className="text-[10px] text-slate-400">Recibe cariños, avisos de compras y recordatorios.</p>
          </div>

          <button
            onClick={handleToggleNotifications}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              notificationsEnabled ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {notificationsEnabled ? 'Activadas ✓' : 'Activar'}
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-white">Estado de PWA Instalable</h4>
            <p className="text-[10px] text-slate-400">Compatible con iOS, Android y Escritorio con modo offline.</p>
          </div>

          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> Lista para instalar
          </span>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-6 rounded-3xl bg-rose-950/20 border border-rose-500/30 space-y-3">
        <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Zona de Mantenimiento</h3>
        <p className="text-xs text-slate-400">Si deseas reiniciar la base de datos local y restaurar el estado inicial de ejemplo:</p>

        <button
          onClick={onClearData}
          className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all"
        >
          Restablecer Datos Locales
        </button>
      </div>
    </div>
  );
};
