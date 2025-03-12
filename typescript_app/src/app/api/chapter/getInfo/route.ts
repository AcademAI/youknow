// /api/chapter/getInto

import { prisma } from "@/lib/db";
import { createYoutubeSummary, getQuestionsFromTranscript } from "@/lib/gpt";
import { getTranscript, searchYoutube } from "@/lib/youtube";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthSession } from "@/lib/auth";

const bodyParser = z.object({
  chapterId: z.string(),
});
interface YoutubeSearchResult {
  videoId?: string;
  videoLength?: string;
}
export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "unauthorised" }, { status: 401 });
    }
    const body = await req.json();
    const { chapterId } = bodyParser.parse(body);
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });
    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "Глава не найдена",
        },
        { status: 404 }
      );
    }

    const result = (await searchYoutube(
      chapter.youtubeSearchQuery
    )) as YoutubeSearchResult;

    let { videoId = "", videoLength = "" } = result;
    let videoLengthInt = parseInt(videoLength, 10);
    if (isNaN(videoLengthInt)) {
      videoLengthInt = 0;
    }

    let transcript = await getTranscript(videoId);
    let maxLength = 500;
    transcript = transcript.split(" ").slice(0, maxLength).join(" ");

    const summaryOutput = await createYoutubeSummary(transcript);
    const summary = JSON.parse(summaryOutput);

    type Question = {
      question: string;
      answer: string;
      option1: string;
      option2: string;
      option3: string;
    };

    let output: string = await getQuestionsFromTranscript(
      transcript,
      chapter.name
    );

    const response = JSON.parse(output);
    const questions: Question[] = response.questions;

    await prisma.question.createMany({
      data: questions.map((question) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          chapterId: chapterId,
        };
      }),
      skipDuplicates: true,
    });

    await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        videoId: videoId,
        summary: summary.summary,
        duration: videoLengthInt,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid body",
        },
        { status: 400 }
      );
    } else {
      console.log(error)
      return NextResponse.json(
        {
          success: false,
          error: error,
        },
        { status: 500 }
      );
    }
  }
}
