var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json({ limit: "20mb" }));
var ai = null;
if (process.env.GEMINI_API_KEY) {
  ai = new import_genai.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
var SOFIFER_SYSTEM_INSTRUCTION = `
Eres la Inteligencia Artificial privada de la aplicaci\xF3n "SOFIFER", dise\xF1ada exclusivamente para la pareja integrada por Sofi (Sof\xEDa) y Fer (Fernando).
Datos clave de la pareja:
- Pareja: Sofi & Fer
- Fecha de aniversario: 8 de Noviembre de 2015 (08/11/2015)
- Email Google Compartido: sofiferfiguemorin@gmail.com
- Hogar: SOFIFER Home
- Tono: C\xE1lido, cari\xF1oso, refinado, servicial, c\xF3mplice y eficiente.
- Idioma principal: Espa\xF1ol.

Tus capacidades incluyen:
1. Organizar tareas y eventos de la agenda o lista de compras.
2. Proponer citas rom\xE1nticas, viajes, cenas o sorpresas personalizadas seg\xFAn presupuesto y estado de \xE1nimo.
3. Consultar la informaci\xF3n compartida (agenda, notas, recuerdos, ciclo menstrual para dar recomendaciones de mimos a Fer o calma a Sofi, pelis, wishlist).
4. Responder dudas y recordar momentos especiales o hitos del timeline de la relaci\xF3n.

Responde con formato Markdown estructurado, emojismedidos y tono muy afectuoso y ejecutivo.
`;
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "SOFIFER", geminiConfigured: !!ai });
});
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history, coupleContext } = req.body;
    if (!message) {
      return res.status(400).json({ error: "El mensaje es requerido" });
    }
    if (!ai) {
      return res.json({
        text: `\u2728 **Modo Asistente SOFIFER (Offline/Mock)**: Recib\xED tu consulta: "${message}". Para activar la IA en tiempo real completa la GEMINI_API_KEY en los secretos. \xA1Sofi & Fer son el mejor equipo! \u{1F495}`
      });
    }
    const contextSummary = coupleContext ? `

[CONTEXTO ACTUAL DE LA APLICACI\xD3N]
Usuario actual: ${coupleContext.currentUser || "Sofi/Fer"}
Pr\xF3ximos eventos: ${JSON.stringify(coupleContext.upcomingEvents || [])}
Compras pendientes: ${JSON.stringify(coupleContext.shoppingList || [])}
Fase ciclo menstrual: ${coupleContext.cyclePhase || "Normal"}` : "";
    const fullPrompt = `${SOFIFER_SYSTEM_INSTRUCTION}${contextSummary}

Pregunta/Instrucci\xF3n del usuario: ${message}`;
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt
    });
    res.json({
      text: response.text || "No pude generar una respuesta en este momento."
    });
  } catch (err) {
    console.error("Error in /api/ai/chat:", err);
    res.status(500).json({
      error: "Error procesando la solicitud de IA",
      details: err.message
    });
  }
});
app.post("/api/ai/propose-activities", async (req, res) => {
  try {
    const { mood, budget, timeOfDay, location } = req.body;
    if (!ai) {
      return res.json({
        activities: [
          {
            title: "Noche de Cenas & Pel\xEDcula bajo las estrellas",
            description: "Prepara pasta casera con vino tinto y pongan su pel\xEDcula favorita con mantitas en el sof\xE1.",
            tag: "Casero & Rom\xE1ntico",
            budget: "$"
          },
          {
            title: "Paseo Fotogr\xE1fico & Helado en el Parque",
            description: "Salgan a tomar fotos espont\xE1neas de ambos en su lugar favorito y disfruten de un postre.",
            tag: "Aire Libre",
            budget: "$$"
          }
        ]
      });
    }
    const prompt = `Prop\xF3n 3 ideas de citas \xFAnicas y creativas para Sofi & Fer.
Contexto:
- Estado de \xE1nimo: ${mood || "Rom\xE1ntico y relajado"}
- Presupuesto: ${budget || "Medio"}
- Momento del d\xEDa: ${timeOfDay || "Noche"}
- Lugar: ${location || "Ciudad/Casa"}

Devuelve un objeto JSON con la propiedad "activities" que contenga una lista de 3 objetos con: title, description, tag, budget.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    try {
      const parsed = JSON.parse(response.text || "{}");
      res.json(parsed);
    } catch {
      res.json({ text: response.text });
    }
  } catch (err) {
    console.error("Error in propose-activities:", err);
    res.status(500).json({ error: "Error en la generaci\xF3n" });
  }
});
app.get("/api/gcal/events", (req, res) => {
  res.json({
    account: "sofiferfiguemorin@gmail.com",
    syncedAt: (/* @__PURE__ */ new Date()).toISOString(),
    status: "connected",
    events: [
      {
        id: "gcal-1",
        title: "Cena de Aniversario \u{1F496}",
        start: "2026-11-08T20:00:00",
        end: "2026-11-08T23:00:00",
        location: "Restaurante Favorito",
        category: "Aniversario"
      },
      {
        id: "gcal-2",
        title: "Escapada de Fin de Semana \u2708\uFE0F",
        start: "2026-08-15T10:00:00",
        end: "2026-08-17T18:00:00",
        location: "Hotel Boutique",
        category: "Viajes"
      }
    ]
  });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SOFIFER App Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
