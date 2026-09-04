const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Home / status
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "JARVIS Gemini backend is online, Boss!"
  });
});

// AI Chat
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",

      input: message,

      system_instruction:
        "You are JARVIS, a helpful personal AI assistant. " +
        "Understand Hindi, English and Hinglish. " +
        "Always call the user Boss. " +
        "Answer clearly, naturally and concisely. " +
        "Do not mention that you are Gemini unless asked."
    });

    res.json({
      reply: interaction.output_text
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      error: "JARVIS AI could not process the request."
    });
  }
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`JARVIS server running on port ${PORT}`);
});
