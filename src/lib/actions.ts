"use server";

import { revalidatePath } from "next/cache";
import { UserWithRelations, CourseWithUnits } from "@/types/types";
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
    revalidatePath("/feed");
  } catch (error) {
    console.error(error);
  }
}

export async function getCourses({
  query,
  page = 1,
  limit = 8,
  authorId,
  applyLimit = true, // New parameter to control the application of the limit
}: {
  query?: string;
  page?: number;
  limit?: number;
  authorId?: string;
  applyLimit?: boolean; // Include the new parameter in the function signature
}) {
  try {
    const offset = (page - 1) * limit;
    let where;

    if (authorId) {
      where = { authorId: authorId };
    } else {
      where = query ? { OR: [{ name: { contains: query } }] } : {};
    }

    const courses = await prisma.course.findMany({
      where,
      ...(applyLimit ? { take: limit } : {}),
      skip: offset,
      include: {
        units: {
          include: { chapters: true },
        },
        author: true,
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

export async function getAllCoursesLength() {
  try {
    const totalCount = await prisma.course.count();
    return { totalCount };
  } catch (error) {
    return { error };
  }
}

export async function getAllUsersLength() {
  try {
    const totalCount = await prisma.user.count();
    return { totalCount };
  } catch (error) {
    return { error };
  }
}

export async function getCoursesFeed({
  query,
  page = 1,
  limit = 8,
  authorId,
  applyLimit = true, // New parameter to control the application of the limit
}: {
  query?: string;
  page?: number;
  limit?: number;
  authorId?: string;
  applyLimit?: boolean; // Include the new parameter in the function signature
}) {
  try {
    const offset = (page - 1) * limit;
    let where = {};

    where = { ...where, hidden: false };

    if (authorId) {
      where = { ...where, authorId: authorId };
    } else if (query) {
      where = { ...where, OR: [{ name: { contains: query } }] };
    }

    const courses = await prisma.course.findMany({
      where,
      ...(applyLimit ? { take: limit } : {}),
      skip: offset,
      include: {
        units: {
          include: { chapters: true },
        },
        author: true,
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

export async function follow(userId: string, authorId: string) {
  try {
    await prisma.follow.create({
      data: {
        followerId: userId,
        followedId: authorId,
      },
    });

    const pathToRevalidate = authorId ? `/user/${authorId}` : "/";
    revalidatePath(pathToRevalidate);
  } catch (error) {
    console.error(error);
  }
}

export async function unFollow(userId: string, authorId: string) {
  try {
    await prisma.follow.delete({
      where: {
        followerId_followedId: {
          followerId: userId,
          followedId: authorId,
        },
      },
    });
    const pathToRevalidate = authorId ? `/user/${authorId}` : "/";
    revalidatePath(pathToRevalidate);
  } catch (error) {
    console.error(error);
  }
}

export async function hideCourse(courseId: string, authorId: string) {
  try {
    await prisma.course.update({
      where: { id: courseId },
      data: { hidden: true },
    });
    const pathToRevalidate = authorId ? `/user/${authorId}` : "/";
    revalidatePath(pathToRevalidate);
  } catch (error) {
    console.error(error);
  }
}

export async function openCourse(courseId: string, authorId: string) {
  try {
    await prisma.course.update({
      where: { id: courseId },
      data: { hidden: false },
    });
    const pathToRevalidate = authorId ? `/user/${authorId}` : "/";
    revalidatePath(pathToRevalidate);
  } catch (error) {
    console.error(error);
  }
}

export async function onPromote(userP: UserWithRelations) {
  try {
    const userId = userP.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.role === "admin") {
      console.warn(`User ${userId} is already an admin`);
      return Promise.reject(new Error(`User ${userId} is already an admin`));
    }
    if (user?.role === "sa") {
      console.warn(`User ${userId} is a sa`);
      return Promise.reject(new Error(`User ${userId} is a sa`));
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: "admin" },
    });
    const pathToRevalidate = userP.id ? `/user/${userP.id}` : "/";
    revalidatePath(pathToRevalidate);
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function onDemote(userP: UserWithRelations) {
  try {
    const userId = userP.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.role === "user") {
      console.warn(`User ${userId} is already a user`);
      return Promise.reject(new Error(`User ${userId} is already a user`));
    }
    if (user?.role === "sa") {
      console.warn(`User ${userId} is a sa`);
      return Promise.reject(new Error(`User ${userId} is a sa`));
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: "user" },
    });
    const pathToRevalidate = userP.id ? `/user/${userP.id}` : "/";
    revalidatePath(pathToRevalidate);
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function onDelete(userP: UserWithRelations) {
  try {
    const userId = userP.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.role === "admin") {
      console.warn(`User ${userId} is an admin`);
      return Promise.reject(new Error(`User ${userId} is already an admin`));
    }
    if (user?.role === "sa") {
      console.warn(`User ${userId} is a sa`);
      return Promise.reject(new Error(`User ${userId} is a sa`));
    }

    if (user) {
      await prisma.follow.deleteMany({
        where: {
          OR: [{ followerId: userId }, { followedId: userId }],
        },
      });

      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } else {
      throw new Error("User not found");
    }
    const pathToRevalidate = userP.id ? `/user/${userP.id}` : "/";
    revalidatePath(pathToRevalidate);
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function deleteAccount(userId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function questionsAnswered(userId: string, chapterId: string) {
  try {
    await prisma.stats.create({
      data: {
        userId: userId,
        chapterId: chapterId,
        questionsAnswered: true,
      },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error(`Chapter ${chapterId} already answered`));
  }
}

export async function courseTotalDuration(course: CourseWithUnits) {
  try {
    //need to map all the chapters and get their duration, then sum up and write to course totalDuration
    const chaptersDuration = course?.units.reduce((sum, unit) => {
      return (
        sum +
        unit.chapters.reduce((chapterSum, chapter) => {
          return chapterSum + (chapter.duration || 0); // Assuming duration is a number or can be converted to a number
        }, 0)
      );
    }, 0);

    await prisma.course.update({
      where: {
        id: course.id,
      },
      data: {
        totalDuration: chaptersDuration,
      },
    });

    const pathToRevalidate = course.id ? `/course/${course.id}/0/0` : "/";
    revalidatePath(pathToRevalidate);
  } catch (error) {
    console.error(error);
  }
}

export async function saveMessage(
  userId: string,
  role: string,
  chapterId: string,
  content: string
) {
  return await prisma.message.create({
    data: {
      userId,
      role,
      chapterId,
      content,
    },
  });
}

export async function getMessages(userId: string, chapterId: string) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        userId,
        chapterId,
      },
      orderBy: {
        id: "asc",
      },
    });
    if (!messages) {
      throw new Error("Messages not found");
    }

    return messages;
  } catch (error) {
    console.error(error);
  }
}
