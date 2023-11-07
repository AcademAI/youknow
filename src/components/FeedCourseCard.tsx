import { Chapter, Course, Unit } from "@prisma/client";
import DeleteCourseButton from "@/components/DeleteCourseButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
  role: string | undefined;
};

const FeedCourseCard = async ({ course, role }: Props) => {
  return (
    <>
      <div className="border rounded-lg border-secondary relative">
          <Link
            href={`/course/${course.id}/0/0`}
            className="relative block "
          >
            <Image
              src={course.image || ""}
              className="object-contain rounded-t-lg"
              width={500}
              height={500}
              alt="picture of the course"
            />
            <span className="absolute px-2 py-1 text-white rounded-md bg-black/60 w-fit bottom-2 left-2 right-2">
              {course.name}
            </span>
          </Link>

        <div className="p-4">
          <h4 className="text-sm text-secondary-foreground/60">Разделы</h4>
          <div className="space-y-1">
            {course.units.map((unit: any, unitIndex: any) => {
              return (
                <Link
                  href={`/course/${course.id}/${unitIndex}/0`}
                  key={unit.id}
                  className="block underline w-fit"
                >
                  {unit.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          {role === "admin" && <DeleteCourseButton course={course} />}
        </div>
      </div>
    </>
  );
};

export default FeedCourseCard;
