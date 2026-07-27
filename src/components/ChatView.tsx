import React, { useState } from 'react';
import { ChatMessage, UserProfile } from '../types';
import { MessageCircle, Send, Mic, Image as ImageIcon, Heart, Sparkles, Volume2 } from 'lucide-react';

interface ChatViewProps {
  currentUser: UserProfile;
  messages: ChatMessage[];
  onSendMessage: (message: ChatMessage) => void;
  onOpenAffectionModal: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  currentUser,
  messages,
  onSendMessage,
  onOpenAffectionModal,
}) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: currentUser,
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
    };

    onSendMessage(newMsg);
    setInputText('');
  };

  const handleSimulateVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const newMsg: ChatMessage = {
        id: `chat-${Date.now()}`,
        sender: currentUser,
        audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_park.ogg',
        timestamp: new Date().toISOString(),
      };
      onSendMessage(newMsg);
    }, 1500);
  };

  const partnerName = currentUser === 'Sofi' ? 'Fer' : 'Sofi';

  return (
    <div className="space-y-4 pb-12 animate-fade-in flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-4 rounded-3xl shadow-xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-md">
              {partnerName[0]}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Chat Privado SOFIFER</h2>
            <p className="text-[11px] text-slate-400">En línea con {partnerName} 💕</p>
          </div>
        </div>

        <button
          onClick={onOpenAffectionModal}
          className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Enviar Cariño</span>
        </button>
      </div>

      {/* Message Feed Container */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-inner">
        {messages.map((msg) => {
          const isMe = msg.sender === currentUser;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
            >
              <span className="text-[10px] text-slate-500 px-1">{msg.sender}</span>
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs space-y-2 shadow-md ${
                  isMe
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-bl-none'
                }`}
              >
                {msg.text && <p className="leading-relaxed">{msg.text}</p>}

                {msg.audioUrl && (
                  <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-950/40">
                    <Volume2 className="w-4 h-4 text-rose-300 animate-pulse" />
                    <audio controls src={msg.audioUrl} className="w-48 h-6 text-xs" />
                  </div>
                )}

                {msg.affectionGif && (
                  <div className="rounded-xl overflow-hidden max-w-xs">
                    <img src={msg.affectionGif} alt="GIF de Cariño" className="w-full h-auto object-cover" />
                  </div>
                )}

                <div className="text-[9px] opacity-70 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Action Bar */}
      <form onSubmit={handleSendText} className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-2 rounded-2xl shrink-0 shadow-lg">
        <button
          type="button"
          onClick={handleSimulateVoice}
          disabled={isRecording}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          title="Grabar mensaje de voz"
        >
          <Mic className={`w-4 h-4 ${isRecording ? 'text-rose-500 animate-bounce' : ''}`} />
        </button>

        <input
          type="text"
          placeholder={`Escribe a ${partnerName}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
        />

        <button
          type="submit"
          className="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold shadow-md shadow-rose-500/20 hover:opacity-90 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
