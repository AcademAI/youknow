import GalleryCourseCard from "@/components/GalleryCourseCard";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import React from "react";

type Props = {};

const GalleryPage = async (props: Props) => {
  const session = await getAuthSession();
  const courses = await prisma.course.findMany({
    where: { userId: session?.user.id },
    include: {
      units: {
        include: { chapters: true },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
        Мои курсы
      </h1>

      <div className="grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-0 mt-8">
        {courses.map((course) => {
          return <GalleryCourseCard course={course} key={course.id} />;
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
