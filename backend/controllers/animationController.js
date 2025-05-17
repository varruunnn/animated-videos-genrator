const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/User');

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generate = async (req, res) => {
  const { prompt } = req.body;
  const userId = req.user;

  if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log('No user found');
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.tokens < 10) {
      console.log('Not enough tokens:', user.tokens);
      return res.status(403).json({ error: 'Insufficient tokens.' });
    }

    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 512,
    };

    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig,
    });

    const result = await model.generateContent(
      `Generate only valid p5.js code (no comments) for: "${prompt}"`
    );

    const code = result.response.text().trim();

    if (!code) {
      console.log('Empty code from Gemini');
      throw new Error('Empty response from Gemini');
    }

    user.tokens -= 10;
    await user.save();

    res.json({ code, tokens: user.tokens });
  } catch (err) {
    console.error('Error generating animation:', err);
    res.status(500).json({ error: 'Failed to generate animation code.' });
  }
};