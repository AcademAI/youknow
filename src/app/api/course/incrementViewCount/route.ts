// /api/course/incrementViewCount

import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { z } from "zod";
import { prisma } from "@/lib/db";

export async function POST(req: Request, res: Response) {
  try {
    const bodyParser = z.object({
      courseId: z.string(),
    });

    const body = await req.json();
    const { courseId } = bodyParser.parse(body);

    await prisma.course.update({
      where: { id: courseId },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ message: "View count incremented" });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("invalid body", { status: 400 });
    }
    console.error(error);
  }
}
