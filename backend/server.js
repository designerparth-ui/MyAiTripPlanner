import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "https://myaitripplanner.in" }));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/disha", async (req, res) => {
  try {
    const { prompt, context = [] } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "prompt is required" });

    const conversation = [
      { role: "system", content: "You are Disha AI, a travel planning assistant." },
      ...context.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.text || "")
      })),
      { role: "user", content: prompt }
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: conversation,
      temperature: 0.7
    });

    const reply = response.choices?.[0]?.message?.content?.trim() || "";
    if (!reply) return res.status(502).json({ error: "empty AI reply" });

    res.json({ reply });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Disha API failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Disha API running on ${port}`));
