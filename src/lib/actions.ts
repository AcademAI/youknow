"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function deleteCourse(courseId: string, url?: string) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (course) {
      const deletedCourse = await prisma.course.delete({
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

let viewCount = 0;
export async function incrementViewCount(courseId: string) {
  try {
    viewCount++;
    if (viewCount >= 5) {
      await prisma.course.update({
        where: { id: courseId },
        data: { views: { increment: 5 } },
      });
      revalidatePath("/");
      viewCount = 0; // reset the viewCount
    }
  } catch (error) {
    console.error(error);
  }
}
