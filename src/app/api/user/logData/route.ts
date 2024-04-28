import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthSession } from "@/lib/auth";

const bodyParser = z.object({
  tokenId: z.string(),
  ipAddress: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "unauthorised" }, { status: 401 });
    }

    const body = await req.json();
    const { tokenId, ipAddress } = bodyParser.parse(body);

    // Find the most recent log entry for the given userId
    const lastLog = await prisma.logs.findFirst({
      where: { userId: tokenId },
      orderBy: { signInTime: "desc" },
    });

    // Check if the last log entry is within the last 6 hours
    if (
      lastLog &&
      new Date().getTime() - new Date(lastLog.signInTime).getTime() <
        6 * 60 * 60 * 1000
    ) {
      // If the last log entry is within the last 6 hours, do not create a new log entry
      return NextResponse.json({
        success: false,
        error: "Sign-in attempt too frequent",
      });
    }

    // If the last log entry is older than 6 hours, create a new log entry
    await prisma.logs.create({
      data: {
        userId: tokenId,
        ipAddress: ipAddress,
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
