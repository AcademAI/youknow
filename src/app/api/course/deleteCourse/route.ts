// /api/course/deleteCourse

import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("unauthorised", { status: 401 });
    }

    const bodyParser = z.object({
      courseId: z.string(),
    });

    const body = await req.json();
    const { courseId } = bodyParser.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
      include: {
        courses: true,
      },
    });

    if (user?.role === "admin") {
      const course = await prisma.course.findUnique({
        where: {
          id: courseId,
        },
      });
      if (course) {
        const userId = course.userId;
        const courseOwner = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            courses: true,
          }
        });
        if (courseOwner) {
          const courseIndex = courseOwner.courses.findIndex((course) => course.id === courseId);
          if (courseIndex !== -1) {
            const deletedCourse = await prisma.course.delete({
              where: {
                id: courseId,
              },
            });
            courseOwner.courses.splice(courseIndex, 1);
            await prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                courses: {
                  set: courseOwner.courses,
                },
              },
            });
            return NextResponse.json({ course_id: deletedCourse.id });
          }
        }
      }
    }

    else if (user && user?.role !== "admin") {
      const courseIndex = user.courses.findIndex((course) => course.id === courseId);
      if (courseIndex !== -1) {
        const deletedCourse = await prisma.course.delete({
          where: {
            id: courseId,
          },
        });
        user.courses.splice(courseIndex, 1);
        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            courses: {
              set: user.courses,
            },
          },
        });
        return NextResponse.json({ course_id: deletedCourse.id });
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("invalid body", { status: 400 });
    }
    console.error(error);
  }
}

