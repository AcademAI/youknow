// /api/course/searchCourse

import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { z } from "zod";
import { prisma } from "@/lib/db";

export const getCourses = async ({
  query,
  page = 1,
  limit = 12,
}: {
  query?: string;
  page: number;
  limit: number;
}) => {
  try {
    const skip = (page - 1) * limit;

    let whereClause = {};
    if (query) {
      whereClause = {
        OR: [{ name: { contains: query } }],
      };
    }

    const result = await prisma.course.findMany({
      where: whereClause,
      take: limit,
      skip: skip,
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

    const totalCount = await prisma.course.count({
      where: whereClause,
    });

    return { courses: result, totalCount: totalCount };
  } catch (error) {
    return { error };
  }
};
