import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Bot, Send, Sparkles, Heart, RefreshCw, Lightbulb, User } from 'lucide-react';

interface AIAssistantViewProps {
  currentUser: UserProfile;
  coupleContext: Record<string, any>;
}

interface ChatTurn {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  currentUser,
  coupleContext,
}) => {
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatTurn[]>([
    {
      sender: 'ai',
      text: `¡Hola ${currentUser}! 💕 Soy la Inteligencia Artificial privada de SOFIFER. Estoy aquí para organizar su agenda, proponer citas románticas, revisar la lista de compras o recordar los mejores momentos de Sofi & Fer desde el 08/11/2015. ¿En qué los ayudo hoy?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim() || isLoading) return;

    const userTurn: ChatTurn = {
      sender: 'user',
      text: promptText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, userTurn]);
    setInputMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptText,
          history: chatHistory,
          coupleContext: { ...coupleContext, currentUser },
        }),
      });

      const data = await res.json();
      const aiTurn: ChatTurn = {
        sender: 'ai',
        text: data.text || 'Ocurrió un error procesando tu consulta.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatHistory((prev) => [...prev, aiTurn]);
    } catch (err) {
      console.error("AI error", err);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'No pude conectar con el servidor de IA en este momento. Revisa la conexión.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    '✨ Proponme una cita romántica inolvidable para hoy',
    '🛒 ¿Qué tenemos pendiente en la lista de compras?',
    '🌸 Sugiere cuidados especiales según la fase del ciclo de Sofi',
    '💖 Recuérdame cuántos días llevamos juntos desde el 08/11/2015',
  ];

  return (
    <div className="space-y-4 pb-12 animate-fade-in flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 p-4 rounded-3xl shadow-xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-500 p-[2px] shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white font-serif">SOFIFER IA Assistant</h2>
            <p className="text-[11px] text-slate-400">Potenciado por Gemini 3.6 Flash • Sofi & Fer</p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
          En Línea
        </span>
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 shrink-0">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSendPrompt(qp)}
            className="px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-medium whitespace-nowrap transition-all shadow-sm"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Chat Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-inner">
        {chatHistory.map((msg, idx) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={idx} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isUser ? 'bg-rose-500 text-white' : 'bg-purple-600 text-white'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] p-4 rounded-2xl text-xs space-y-2 shadow-md ${
                isUser
                  ? 'bg-rose-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-purple-500/20 text-slate-100 rounded-tl-none'
              }`}>
                <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                <div className="text-[9px] opacity-60 text-right">{msg.timestamp}</div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-purple-300 animate-pulse p-2">
            <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
            <span>SOFIFER IA consultando datos de Sofi & Fer...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPrompt(inputMsg);
        }}
        className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-2 rounded-2xl shrink-0 shadow-lg"
      >
        <input
          type="text"
          placeholder="Pregunta a la IA sobre su agenda, citas, compras o recuerdos..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
        />

        <button
          type="submit"
          disabled={isLoading || !inputMsg.trim()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 hover:opacity-90 transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
