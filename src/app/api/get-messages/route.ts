import { getMessages } from "@/lib/actions";

import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { userId, chapterId } = await req.json();
  const messages = await getMessages(userId, chapterId);

  return NextResponse.json(messages);
};
