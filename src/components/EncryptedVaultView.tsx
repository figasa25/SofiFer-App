import React, { useState } from 'react';
import { VaultItem } from '../types';
import { encryptText, decryptText } from '../lib/crypto';
import { ShieldCheck, Lock, Unlock, KeyRound, Plus, Eye, EyeOff, FileText, Key, Heart, Trash2 } from 'lucide-react';

interface EncryptedVaultViewProps {
  vaultItems: VaultItem[];
  vaultPIN: string;
  onAddVaultItem: (item: VaultItem) => void;
  onDeleteVaultItem: (id: string) => void;
  onChangePIN: (newPIN: string) => void;
}

export const EncryptedVaultView: React.FC<EncryptedVaultViewProps> = ({
  vaultItems,
  vaultPIN,
  onAddVaultItem,
  onDeleteVaultItem,
  onChangePIN,
}) => {
  const [enteredPIN, setEnteredPIN] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [decryptedMap, setDecryptedMap] = useState<Record<string, string>>({});
  const [showAddModal, setShowAddModal] = useState(false);

  // Form for new item
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<VaultItem['category']>('Carta Secreta');
  const [rawText, setRawText] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPIN === vaultPIN) {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('PIN incorrecto. Inténtalo de nuevo.');
      setEnteredPIN('');
    }
  };

  const handleDecryptItem = async (id: string, cipherText: string) => {
    if (decryptedMap[id]) {
      // Toggle off
      const copy = { ...decryptedMap };
      delete copy[id];
      setDecryptedMap(copy);
      return;
    }

    try {
      const clearText = await decryptText(cipherText, vaultPIN);
      setDecryptedMap((prev) => ({ ...prev, [id]: clearText }));
    } catch {
      alert('Error descifrando la nota.');
    }
  };

  const handleCreateEncryptedItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !rawText) return;

    try {
      const encrypted = await encryptText(rawText, vaultPIN);
      const newItem: VaultItem = {
        id: `vault-${Date.now()}`,
        title,
        category,
        encryptedContent: encrypted,
        updatedAt: new Date().toISOString(),
      };

      onAddVaultItem(newItem);
      setShowAddModal(false);
      setTitle('');
      setRawText('');
    } catch {
      alert('Error cifrando el mensaje');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 space-y-6 text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 via-rose-500 to-amber-500 p-[2px] shadow-2xl">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Lock className="w-10 h-10 text-rose-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-serif text-white">Caja Fuerte Cifrada</h2>
          <p className="text-xs text-slate-400">
            Zona ultrasecreta protegida con cifrado AES-256. Introduce el PIN de pareja para acceder a cartas, contraseñas y sorpresas.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="relative">
            <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="password"
              maxLength={6}
              required
              placeholder="Introduce PIN (por defecto 1234)..."
              value={enteredPIN}
              onChange={(e) => setEnteredPIN(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-center tracking-widest text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          {errorMsg && <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-xs shadow-lg shadow-rose-500/30"
          >
            Desbloquear Caja Fuerte
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Vault Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl border border-rose-500/30 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">Caja Fuerte Cifrada AES-256</h2>
          </div>
          <p className="text-xs text-slate-400">Tus notas más confidenciales están cifradas en tu navegador 🔒</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsUnlocked(false)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>Bloquear</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir Secreto</span>
          </button>
        </div>
      </div>

      {/* Vault Items List */}
      <div className="space-y-3">
        {vaultItems.map((item) => {
          const isDecrypted = !!decryptedMap[item.id];
          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecryptItem(item.id, item.encryptedContent)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold flex items-center gap-1"
                  >
                    {isDecrypted ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-rose-400" />}
                    <span>{isDecrypted ? 'Ocultar' : 'Descifrar'}</span>
                  </button>

                  <button
                    onClick={() => onDeleteVaultItem(item.id)}
                    className="p-1.5 text-slate-600 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isDecrypted ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs font-mono text-emerald-300 whitespace-pre-line leading-relaxed">
                  {decryptedMap[item.id]}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-600 truncate">
                  [CIFRADO] {item.encryptedContent.slice(0, 40)}...
                </div>
              )}
            </div>
          );
        })}

        {vaultItems.length === 0 && (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
            <Lock className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-xs">No hay secretos en la caja fuerte.</p>
          </div>
        )}
      </div>

      {/* Add Vault Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-serif">Guardar Secreto Cifrado</h3>

            <form onSubmit={handleCreateEncryptedItem} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Título del secreto:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Contraseña Netflix, Carta de Amor 2026..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Categoría:</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                >
                  <option value="Carta Secreta">Carta Secreta</option>
                  <option value="Contraseña">Contraseña / Claves</option>
                  <option value="Plan Sorpresa">Plan Sorpresa</option>
                  <option value="Documento">Documento Confidencial</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Contenido a Cifrar:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escribe el texto privado..."
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                >
                  Cifrar & Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
