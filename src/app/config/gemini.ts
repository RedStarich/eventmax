import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCgcvged9yG0Aume5UXqgbMuKUwsiqFR_8 ";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a Social Media specialist who have to promote an event as a post. Write post description in 1000 characters in Russian.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function generatePost(inputText: string) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: inputText }],
        },
      ],
    });

    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log("API Response:", result); // Строка для отладки
    return result.response.text();
  } catch (error) {
    console.error("Error generating post:", error); // Строка для отладки
    throw new Error("Ошибка при генерации поста.");
  }
}