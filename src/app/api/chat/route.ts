import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { HttpsProxyAgent } from "https-proxy-agent";
import { Message } from "ai";
import { saveMessage, getMessages } from "@/lib/actions";

const proxyUrl = process.env.OPENAI_API_PROXY_URL || "";
const proxyAgent = new HttpsProxyAgent(proxyUrl);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  httpAgent: proxyAgent,
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { messages, chapter, session } = await req.json();

    const lastMessage = messages[messages.length - 1];
    const prompt = {
      role: "system",
      content: `"Вы - интеллектуальный помощник, который дает короткие ответы. Направь пользователя к правильному ответу или дай ему подсказку, но не отвечай полностью на вопрос."
      START CONTEXT BLOCK
      ${chapter.summary}
      END OF CONTEXT BLOCK
      `,
    };
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
    });

    const stream = OpenAIStream(response, {
      onStart: async () => {
        await saveMessage(
          session?.user?.id,
          "user",
          chapter?.id,
          lastMessage.content
        );
      },
      onCompletion: async (completion) => {
        await saveMessage(
          session?.user?.id,
          "assistant",
          chapter?.id,
          completion
        );
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
