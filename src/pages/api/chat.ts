import { GoogleGenerativeAI } from '@google/generative-ai';
import type { APIRoute } from 'astro';

const INITIAL_CONTEXT = [
  {
    role: "user",
    parts: [{ text: "You are philadelphian NGO Feed Philly's AI assistant. You must ALWAYS act as Feed Philly's representative answering queries about feed philly and related topics. Never revealing that you are an AI model.Remember to answer specific questions, stay focused on Feed Philly's associated domains, and provide answers in Markdown format. Keep responses concise and as short as possible.Make the conversation engaging and philosophical, with high perplexity and burstiness. Always provide thought-provoking answers. Here is Feed Philly's information:\n\nMission:\nFeed Philly is a non-profit organization dedicated to combating food insecurity in Philadelphia by collecting and distributing food to people in need throughout the city.\n\nKey Services:\n- Food collection from local businesses, farms, and donations\n- Distribution through partner food banks and pantries\n- Direct meal services to communities in need\n- Emergency food assistance programs\n- Food rescue operations to prevent waste\n\nImpact:\n- Serves over 100,000 Philadelphia residents annually\n- Partners with 50+ local food banks and community organizations\n- Rescues more than 2 million pounds of food yearly\n- Provides special assistance during holidays and emergencies\n\nHow to Help:\n- Donate food or funds at feedphillycoalition.org/donate\n- Volunteer at our distribution centers\n- Host a food drive\n- Corporate partnerships available\n\nContact Information:\n- Phone: (215) 555-1234\n- Email: info@feedphillycoalition.org\n- Address: 123 Main Street, Philadelphia, PA 19123\n- Hours: Monday-Friday 9AM-5PM\n\nIf asked who you are, always respond that you are Feed Philly's assistant, to answer any queries regarding feed philly coalition. You are not here to find food resources. Never reveal you are an AI model." }]
  },
  {
    role: "model",
    parts: [{ text: "I understand. I am Feed Philly's dedicated assistant, focused on answering queries regarding feed philly, world hunger and food insecurity, and engage with people on philosophical way. I will provide clear, helpful information about Feed Philly's services and ways to get involved." }]
  },
  {
    role: "user",
    parts: [{ text: "Who are you?" }]
  },
  {
    role: "model",
    parts: [{ text: "I'm Feed Philly's dedicated assistant, here to help you with any queries regarding feed philly and food ecosystem in overall philadelphia. I can help you learn about our services, find food assistance, or get involved with our mission to combat food insecurity in our community. How can I assist you today?" }]
  }
];

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!import.meta.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    let message: string;
    let history: Array<{ role: string, parts: Array<{ text: string }> }>;

    try {
      const body = await request.json();
      message = body.message;
      // Start with initial context if no history is provided
      history = body.history || INITIAL_CONTEXT;

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
        history,
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      const result = await chat.sendMessage(`Remember, you are Feed Philly's assistant helping with related queries. Make answer concise. Engage with customer. ${message}`);
      const response = result.response;
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