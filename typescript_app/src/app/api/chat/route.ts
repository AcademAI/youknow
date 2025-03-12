import { createOpenAI } from "@ai-sdk/openai";
import { createDataStreamResponse, Message, generateText, streamText  } from "ai";
import { saveMessage, getMessages } from "@/lib/actions";
import { v4 as uuidv4 } from 'uuid';
import { HttpsProxyAgent } from "https-proxy-agent";
import { NextResponse } from "next/server";

const proxyUrl = process.env.OPENAI_API_PROXY_URL || "";
//const proxyAgent = new HttpsProxyAgent(proxyUrl);

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  headers: {
    "httpAgent": proxyUrl,
  }
});

export const dynamic = "force-dynamic";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, chapter, session } = await req.json();
    
    // Prepare system prompt
    const lastMessage = messages[messages.length - 1];
    const promptId = uuidv4();
    const prompt: Message = {
      id: promptId,
      role: "system",
      content: `"Вы - интеллектуальный помощник, который дает короткие ответы. Направь пользователя к правильному ответу или дай ему подсказку, но не отвечай полностью на вопрос."
START CONTEXT BLOCK
${chapter.summary}
END OF CONTEXT BLOCK`,
    };
    
    //console.log('Saving user message...');
    await saveMessage(
      session?.user?.id,
      "user",
      chapter?.id,
      lastMessage.content
    );
    
    console.log('Starting streamText...');
    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      messages: [prompt, ...messages.filter((msg: Message) => msg.role === "user"), lastMessage],
      onFinish: async (response: any) => {
        //console.log('Received full response:', response);
        return response;
      }
    });

    for await (const textPart of result.textStream) {
      //console.log(textPart);
      // Я не понимаю как это зачем и почему, но если убрать этот цикл то ничего не вернется) разработчики этого сдк желаю вам всего лучшего
    }
    
    //console.log('Saving assistant message...');
    await saveMessage(
      session?.user?.id,
      "assistant",
      chapter?.id,
      await result.text
    );
    
    //console.log('Returning response...');
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error details:', {
      error
    });
    return NextResponse.json(
      {
        success: false,
        error: error,
      },
      { status: 500 }
    );
  }
}