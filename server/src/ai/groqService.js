import Groq from "groq-sdk";

let groq;
if (process.env.GROQ_API_KEY) {
  groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
}

export const getAIExplanation = async (prompt) => {
  if (!groq) {
    return "AI explanation is unavailable (API key not configured).";
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an intelligent university admission counselor for Intellipath. Provide concise, helpful, and professional advice.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Groq AI Error:", error);
    return "Failed to generate AI explanation.";
  }
};

export const chatWithAI = async (messages) => {
  if (!groq) {
    return { role: "assistant", content: "AI assistant is currently offline." };
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are Intellipath AI, a university admission assistant. Help students with their career and admission questions.",
        },
        ...messages,
      ],
      model: "llama3-8b-8192",
    });

    return {
      role: "assistant",
      content: chatCompletion.choices[0].message.content,
    };
  } catch (error) {
    console.error("Groq AI Chat Error:", error);
    throw new Error("AI Chat failed");
  }
};
