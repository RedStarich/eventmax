import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || " ";
if (!apiKey) {
  throw new Error('API_KEY is not defined in the environment variables');
}
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
    
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a Social Media specialist who have to promote an event as a post. Write post description in 1000 characters in Russian.",
    });
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

export async function generateContent(inputText: string) {
  
  try {
    
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a Social Media specialist who have to create an entertaining and/or educational and overall useful post. Write post in 1000 characters in Russian.",
    });
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