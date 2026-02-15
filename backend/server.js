import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://myaitripplanner.in",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
  }),
);

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "phi3:latest";
const SYSTEM_PROMPT = "You are Disha AI, a travel planning assistant.";

app.post("/api/disha", async (req, res) => {
  try {
    const { prompt, context = [] } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "prompt is required" });

    const conversation = [
      { role: "system", content: SYSTEM_PROMPT },
      ...context.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.text || ""),
      })),
      { role: "user", content: String(prompt) },
    ];

    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: conversation,
        stream: false,
        options: {
          temperature: 0.7,
        },
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res
        .status(502)
        .json({ error: payload?.error || "Ollama request failed" });
    }

    const reply = payload?.message?.content?.trim() || "";
    if (!reply) return res.status(502).json({ error: "empty AI reply" });

    res.json({ reply });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Disha API failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(
    `Disha API running on ${port} using model "${OLLAMA_MODEL}" at ${OLLAMA_BASE_URL}`,
  ),
);
