import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        status: false,
        message: "Prompt is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      status: true,
      answer: response.text,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server started 🚀");
});
