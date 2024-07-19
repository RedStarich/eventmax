import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || " ";
if (!apiKey) {
  throw new Error('API_KEY is not defined in the environment variables');
}
const genAI = new GoogleGenerativeAI(apiKey);

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
      systemInstruction: "You are a Social Media specialist who has to promote an event as a post. Write the post description in 1000 characters in Russian. The user may provide the event title, description, date and time, and location. Use simplified Markdown syntax for formatting specifically for Telegram chats.",
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

    const result = await chatSession.sendMessage(inputText);
    console.log("API Response:", result); // Debugging line
    return result.response.text();
  } catch (error) {
    console.error("Error generating post:", error); // Debugging line
    throw new Error("Ошибка при генерации поста.");
  }
}

export async function generateDocument(inputText: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a formal document specialist who generates formal statements and applications. Write the document in a formal style, using the provided information. Ensure the text is in Russian and formatted appropriately for official correspondence.",
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

    const result = await chatSession.sendMessage(inputText);
    console.log("API Response:", result); // Debugging line
    return result.response.text();
  } catch (error) {
    console.error("Error generating document:", error); // Debugging line
    throw new Error("Ошибка при генерации документа.");
  }
}

export async function generateSocialMediaPost(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a Social Media specialist who creates engaging and relevant social media posts. Write a post in 1000 characters in Russian. Use simplified Markdown syntax for formatting specifically for Telegram chats.",
    });
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);
    console.log("API Response:", result); // Debugging line
    return result.response.text();
  } catch (error) {
    console.error("Error generating social media post:", error); // Debugging line
    throw new Error("Ошибка при генерации поста для социальных сетей.");
  }
}

export async function generateContent(inputText: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a Social Media specialist who has to create an entertaining and/or educational and overall useful post. Write the post in 1000 characters in Russian. Use simplified Markdown syntax for formatting specifically for Telegram chats.",
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

    const result = await chatSession.sendMessage(inputText);
    console.log("API Response:", result); // Debugging line
    return result.response.text();
  } catch (error) {
    console.error("Error generating post:", error); // Debugging line
    throw new Error("Ошибка при генерации поста.");
  }
}

export async function generateTask(inputText: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are an Educator and Student mentor who provides comprehensive and clear homework for junior students. Write the post in 1000 characters in Russian. Write the text from Gemini Gemtext format to Telegram format. Maintain the original formatting where possible, converting headings, links, lists, and quotes appropriately.",
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

    const result = await chatSession.sendMessage(inputText);
    console.log("API Response:", result); // Debugging line
    return result.response.text();
  } catch (error) {
    console.error("Error generating task:", error); // Debugging line
    throw new Error("Ошибка при генерации задания.");
  }
}

export async function validateContent(inputText: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a Social Media specialist who has to verify if the content is appropriate for a social media post in Russian. Return 'true' if the content is appropriate and contains no harmful or explicit language, otherwise return 'false'.",
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

    const result = await chatSession.sendMessage("Is this content appropriate? Please respond with 'true' or 'false'.");
    console.log("API Response:", result); // Debugging line

    const responseText = result.response.text().toLowerCase();
    return responseText.includes("true");
  } catch (error) {
    console.error("Error validating content:", error); // Debugging line
    throw new Error("Ошибка при проверке содержимого.");
  }
}

export async function validateFinalContent(inputText: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a Social Media specialist who has to verify if the content is free of errors like missing context, incorrect hashtags, or placeholders in square brackets. Return 'true' if the content is error-free, otherwise return 'false'.",
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

    const result = await chatSession.sendMessage("Is this content error-free? Please respond with 'true' or 'false'.");
    console.log("API Response:", result); // Debugging line

    const responseText = result.response.text().toLowerCase();
    return responseText.includes("true");
  } catch (error) {
    console.error("Error validating final content:", error); // Debugging line
    throw new Error("Ошибка при проверке окончательного содержимого.");
  }
}
