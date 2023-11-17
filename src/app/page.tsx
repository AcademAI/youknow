import FeedCourseCard from "@/components/FeedCourseCard";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import React from "react";

type Props = {};

const FeedPage = async (props: Props) => {
  const session = await getAuthSession();
  const courses = await prisma.course.findMany({
    include: {
      units: {
        include: { chapters: true },
      },
      user: true,
    },
    orderBy: {
      id: "desc",
    }
  });
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
        Лента курсов
      </h1>
      <div className="grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-0 mt-8">
        {courses.map((course) => {
          return <FeedCourseCard course={course} user={course.user} role={session?.user.role} key={course.id} />;
        })}
      </div>
    </div>
  );
};

export default FeedPage;
