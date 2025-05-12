require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/generate-animation', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Generate only valid p5.js code (no comments or explanation) for this animation request:\n\n"${prompt}"`,
      temperature: 0.7,
      candidateCount: 1,
      maxOutputTokens: 512
    });

    const code = response.text?.trim();
    if (!code) {
      throw new Error('Empty response from Gemini');
    }

    console.log('🎨 Generated p5.js code:\n', code);
    res.json({ code });

  } catch (err) {
    console.error('Error generating animation:', err);
    res.status(500).json({ error: 'Failed to generate animation code.' });
  }
});

app.listen(3001, () => {
  console.log('backend running on http://localhost:3001');
});
