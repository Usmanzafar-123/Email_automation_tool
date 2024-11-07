import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeEmailContent(emailText: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: "system", content: "You are an email categorization assistant." },
      { role: "user", content: `Categorize the following email content: "${emailText}" into one of the following labels: Interested, Not Interested, More Information.` }
    ],
    max_tokens: 10,
  });

  // Ensure response.choices is not empty before accessing message content
  const content = response.choices?.[0]?.message?.content;
  return content ? content.trim() : "No response";
}
