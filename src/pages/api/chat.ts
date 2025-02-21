import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not configured");
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON in request body" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { message } = body;
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: "Message is required and must be a string" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are Feed Philly's AI assistant. Answer queries about Feed Philly and related topics. Never reveal you're an AI. Be concise and engaging. Here's the user's message: ${message}

Mission: Feed Philly is a non-profit fighting food insecurity in Philadelphia through food collection and distribution.

Key Services:
- Food collection from businesses, farms, donations
- Distribution via food banks and pantries
- Direct meal services
- Emergency food assistance
- Food rescue operations

Impact:
- Serves 100,000+ residents annually
- 50+ food bank partners
- 2M+ pounds food rescued yearly
- Holiday/emergency assistance

Contact: (215) 555-1234, info@feedphillycoalition.org`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error("Empty response from AI model");
      }

      return new Response(JSON.stringify({ text }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (modelError: any) {
      console.error('AI Model Error:', modelError);

      if (modelError.message?.includes("SAFETY")) {
        return new Response(JSON.stringify({
          error: "I cannot provide an answer to that question. Please ask something else."
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      throw modelError; // Let the outer catch handle other model errors
    }
  } catch (error: any) {
    console.error('Chat API Error:', error);

    const errorMessage = error.message?.includes("API key")
      ? "Chat service is temporarily unavailable. Please try again later."
      : "An error occurred while processing your request. Please try again.";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};