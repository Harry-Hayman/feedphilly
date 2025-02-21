import { GoogleGenerativeAI } from '@google/generative-ai';
import type { APIRoute } from 'astro';

const CONTEXT = ``;

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!import.meta.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let message;
    try {
      const body = await request.json();
      message = body.message;
      if (!message || typeof message !== 'string') {
        throw new Error('Invalid message format');
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    try {
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "What does Feed Philly do?" }],
          },
          {
            role: "model",
            parts: [{ text: "Feed Philly collects and distributes food to people in need throughout Philadelphia. Would you like to know about our distribution centers or how you can get involved?" }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 150,
        },
      });

      const result = await chat.sendMessage([{ text: `${CONTEXT}\n\nUser: ${message}\nAssistant: Remember to answer the specific question asked and stay focused on our local work unless asked about broader issues.\n\nResponse:` }]);
      const response = await result.response;
      const text = response.text();

      return new Response(
        JSON.stringify({ response: text }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    } catch (error) {
      console.error('Gemini API error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to generate response' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};