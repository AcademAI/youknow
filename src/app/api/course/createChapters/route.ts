// /api/course/createChapters

import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import {
  checkResult,
  createUnitsNChapters,
  createImageSearchTerm,
} from "@/lib/gpt";
import { getKandinskyImage } from "@/lib/kandinsky";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request, res: Response) {
  const policies = [
    "Порнография",
    "SQL и другие инъекции",
    "Насилие и жестокость",
    "Дискриминация и ненависть",
    "Незаконная деятельность",
    "Оскорбления и клевета",
    "Манипуляция и дезинформация",
    "Пропаганда ЛГБТ",
    "Экстремизм и терроризм",
    "Изготовление взрывчатки",
    "Украина и Россия",
    "Оправдание нацизма",
    "Наркотики",
  ];
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "unauthorised" }, { status: 401 });
    }

    const body = await req.json();
    const { title, units } = createChaptersSchema.parse(body);
    console.log(body);

    type outputUnits = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    }[];
    /*
    //Проверка политик безопасности, пока выключена
    const checkResultOutput = await checkResult(title, units, policies);
    const checkResultResult = JSON.parse(checkResultOutput);

    if (checkResultResult["decision"] === false) {
      return new NextResponse("checkResult fail", { status: 401 });
    }
    */
    let output: string = await createUnitsNChapters(title, units);

    const output_units: outputUnits = JSON.parse(output);

    const imageOutput = await createImageSearchTerm(title);
    const imageSearchTerm = JSON.parse(imageOutput);

    let course_image = await getKandinskyImage(
      imageSearchTerm.image_search_term
    );

    if (!course_image) {
      course_image = await getUnsplashImage(imageSearchTerm.image_search_term);
    }

    const course = await prisma.course.create({
      data: {
        name: title,
        image: course_image,
        authorId: session.user.id,
        views: 0,
        totalDuration: 0,
      },
    });

    for (const unit of output_units) {
      console.log(unit);
      const title = unit.title;
      const prismaUnit = await prisma.unit.create({
        data: {
          name: title,
          courseId: course.id,
        },
      });
      //console.log(unit.chapters);
      await prisma.chapter.createMany({
        data: unit.chapters.map((chapter) => {
          return {
            name: chapter.chapter_title,
            youtubeSearchQuery: chapter.youtube_search_query,
            unitId: prismaUnit.id,
            duration: 0,
          };
        }),
      });
    }
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json({ course_id: course.id });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("invalid body", { status: 400 });
    }
    console.error(error);
  }
}
