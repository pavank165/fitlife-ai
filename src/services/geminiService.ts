import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function getCoachResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are FitLife AI Coach, a supportive and expert fitness companion. Your tone is motivating, professional, and slightly futuristic. You provide personalized workout advice, nutrition tips, and hydration reminders. Keep responses concise and use emojis occasionally. If asked about workouts, suggest specific types like HIIT, Strength, or Yoga.",
    },
    history: history.map(h => ({
      role: h.role,
      parts: h.parts.map(p => ({ text: p.text }))
    }))
  });

  const response = await chat.sendMessage({ message });
  return response.text || "I'm sorry, I couldn't process that.";
}

export async function scanFood(imageData: string) {
  const prompt = "Identify the food in this image. Provide the name, estimated calories, protein (g), carbs (g), fat (g), and a health score out of 100. Format as JSON: { \"name\": \"...\", \"calories\": 0, \"protein\": 0, \"carbs\": 0, \"fat\": 0, \"healthScore\": 0 }";
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { text: prompt },
        {
          inlineData: {
            data: imageData.split(',')[1],
            mimeType: "image/jpeg"
          }
        }
      ]
    }
  });
  
  try {
    const text = response.text || "";
    const jsonMatch = text.match(/\{.*\}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error("Failed to parse food scan result", e);
  }
  
  return null;
}
