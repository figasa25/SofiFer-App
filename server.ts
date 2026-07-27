import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));

// Initialize Google GenAI Server Side
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// System prompt context for SOFIFER AI Assistant
const SOFIFER_SYSTEM_INSTRUCTION = `
Eres la Inteligencia Artificial privada de la aplicación "SOFIFER", diseñada exclusivamente para la pareja integrada por Sofi (Sofía) y Fer (Fernando).
Datos clave de la pareja:
- Pareja: Sofi & Fer
- Fecha de aniversario: 8 de Noviembre de 2015 (08/11/2015)
- Email Google Compartido: sofiferfiguemorin@gmail.com
- Hogar: SOFIFER Home
- Tono: Cálido, cariñoso, refinado, servicial, cómplice y eficiente.
- Idioma principal: Español.

Tus capacidades incluyen:
1. Organizar tareas y eventos de la agenda o lista de compras.
2. Proponer citas románticas, viajes, cenas o sorpresas personalizadas según presupuesto y estado de ánimo.
3. Consultar la información compartida (agenda, notas, recuerdos, ciclo menstrual para dar recomendaciones de mimos a Fer o calma a Sofi, pelis, wishlist).
4. Responder dudas y recordar momentos especiales o hitos del timeline de la relación.

Responde con formato Markdown estructurado, emojismedidos y tono muy afectuoso y ejecutivo.
`;

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "SOFIFER", geminiConfigured: !!ai });
});

// Gemini Assistant endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history, coupleContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: "El mensaje es requerido" });
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured yet
      return res.json({
        text: `✨ **Modo Asistente SOFIFER (Offline/Mock)**: Recibí tu consulta: "${message}". Para activar la IA en tiempo real completa la GEMINI_API_KEY en los secretos. ¡Sofi & Fer son el mejor equipo! 💕`,
      });
    }

    const contextSummary = coupleContext
      ? `\n\n[CONTEXTO ACTUAL DE LA APLICACIÓN]\nUsuario actual: ${coupleContext.currentUser || "Sofi/Fer"}\nPróximos eventos: ${JSON.stringify(coupleContext.upcomingEvents || [])}\nCompras pendientes: ${JSON.stringify(coupleContext.shoppingList || [])}\nFase ciclo menstrual: ${coupleContext.cyclePhase || "Normal"}`
      : "";

    const fullPrompt = `${SOFIFER_SYSTEM_INSTRUCTION}${contextSummary}\n\nPregunta/Instrucción del usuario: ${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
    });

    res.json({
      text: response.text || "No pude generar una respuesta en este momento.",
    });
  } catch (err: any) {
    console.error("Error in /api/ai/chat:", err);
    res.status(500).json({
      error: "Error procesando la solicitud de IA",
      details: err.message,
    });
  }
});

// AI Propose Activities
app.post("/api/ai/propose-activities", async (req, res) => {
  try {
    const { mood, budget, timeOfDay, location } = req.body;

    if (!ai) {
      return res.json({
        activities: [
          {
            title: "Noche de Cenas & Película bajo las estrellas",
            description: "Prepara pasta casera con vino tinto y pongan su película favorita con mantitas en el sofá.",
            tag: "Casero & Romántico",
            budget: "$",
          },
          {
            title: "Paseo Fotográfico & Helado en el Parque",
            description: "Salgan a tomar fotos espontáneas de ambos en su lugar favorito y disfruten de un postre.",
            tag: "Aire Libre",
            budget: "$$",
          },
        ],
      });
    }

    const prompt = `Propón 3 ideas de citas únicas y creativas para Sofi & Fer.
Contexto:
- Estado de ánimo: ${mood || "Romántico y relajado"}
- Presupuesto: ${budget || "Medio"}
- Momento del día: ${timeOfDay || "Noche"}
- Lugar: ${location || "Ciudad/Casa"}

Devuelve un objeto JSON con la propiedad "activities" que contenga una lista de 3 objetos con: title, description, tag, budget.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    try {
      const parsed = JSON.parse(response.text || "{}");
      res.json(parsed);
    } catch {
      res.json({ text: response.text });
    }
  } catch (err: any) {
    console.error("Error in propose-activities:", err);
    res.status(500).json({ error: "Error en la generación" });
  }
});

// Simulated Google Calendar Sync for sofiferfiguemorin@gmail.com
app.get("/api/gcal/events", (req, res) => {
  res.json({
    account: "sofiferfiguemorin@gmail.com",
    syncedAt: new Date().toISOString(),
    status: "connected",
    events: [
      {
        id: "gcal-1",
        title: "Cena de Aniversario 💖",
        start: "2026-11-08T20:00:00",
        end: "2026-11-08T23:00:00",
        location: "Restaurante Favorito",
        category: "Aniversario",
      },
      {
        id: "gcal-2",
        title: "Escapada de Fin de Semana ✈️",
        start: "2026-08-15T10:00:00",
        end: "2026-08-17T18:00:00",
        location: "Hotel Boutique",
        category: "Viajes",
      },
    ],
  });
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SOFIFER App Server running on http://localhost:${PORT}`);
  });
}

startServer();
