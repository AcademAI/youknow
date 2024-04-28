import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthSession } from "@/lib/auth";

const bodyParser = z.object({
  id: z.string(),
  name: z.string().min(3, "Укажите имя").max(50).optional(),
  bio: z.string().max(250).optional(),
  avatar: z.string().optional(),
});

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "unauthorised" }, { status: 401 });
    }

    const body = await req.json();
    if (Object.keys(body).length === 1 && body.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Нет данных для обновления",
        },
        { status: 400 }
      );
    }
    const { id, name, bio, avatar } = bodyParser.parse(body);

    if (name) {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name,
        },
      });
    }

    if (bio) {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          bio,
        },
      });
    }

    if (avatar) {
      const formData = new FormData();

      formData.append("image", avatar);
      formData.append("type", "base64");
      const response = await fetch("https://api.imgur.com/3/upload", {
        method: "POST",
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        },
        body: formData,
        redirect: "follow",
      });
      const data = await response.json();

      if (data?.data?.link) {
        await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            image: data.data.link,
          },
        });
      }
    }

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
