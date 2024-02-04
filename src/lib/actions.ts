"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function deleteCourse(courseId: string, url?: string) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (course) {
      await prisma.course.delete({
        where: {
          id: courseId,
        },
      });
      const pathToRevalidate = url ? `/${url}` : "/";
      revalidatePath(pathToRevalidate);
    } else {
      throw new Error("Course not found");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function incrementViewCount(courseId: string) {
  try {
    await prisma.course.update({
      where: { id: courseId },
      data: { views: { increment: 1 } },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}

export async function getCourses({
  query,
  page = 1,
  limit = 8,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const offset = (page - 1) * limit;

    const where = query ? { OR: [{ name: { contains: query } }] } : {};

    const courses = await prisma.course.findMany({
      where,
      take: limit,
      skip: offset,
      include: {
        units: {
          include: { chapters: true },
        },
        user: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    //const totalCount = await prisma.course.count({ where });

    return { courses: JSON.parse(JSON.stringify(courses)) };
  } catch (error) {
    return { error };
  }
}
