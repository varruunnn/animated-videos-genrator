const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.generate = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Generate only valid p5.js code (no comments) for: "${prompt}"`,
      temperature: 0.7,
      candidateCount: 1,
      maxOutputTokens: 512,
    });

    const code = response.text?.trim();
    if (!code) throw new Error('Empty response from Gemini');
    res.json({ code });
  } catch (err) {
    console.error('Error generating animation:', err);
    res.status(500).json({ error: 'Failed to generate animation code.' });
  }
};
