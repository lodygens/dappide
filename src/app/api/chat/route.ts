import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, temperature, max_tokens, top_p, frequency_penalty, presence_penalty } = await req.json();
  console.log('messages = ', messages);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: 'system',
        content: "You are a professional programmer AI assistant to help developper to write decentralized application using iExec SDKs. Your primary function is to generate code based on the user's request. you must provide a json with two fields: 'code' and 'explanation'. 'code' is the code that the developper must write. 'explanation' is an explanation of the code that the developper must write."
      },
      ...messages,
    ],
    temperature: temperature ?? 0.75,
    max_tokens: max_tokens ?? 500,
    top_p: top_p ?? 0.9,
    frequency_penalty: frequency_penalty ?? 0.5,
    presence_penalty: presence_penalty ?? 0.6,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}