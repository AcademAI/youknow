"use client";
import { Chapter, Course, Unit, User } from "@prisma/client";
import { Eye } from "lucide-react";
import DeleteCourseButton from "@/components/DeleteCourseButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserAvatar from "./UserAvatar";
import { incrementViewCount } from "@/lib/actions";
import { Button } from "./ui/button";

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
  user: User;
  role: string | undefined;
};

const FeedCourseCard = async ({ course, user, role }: Props) => {
  return (
    <>
      <div className="border rounded-lg border-secondary relative">
        <Link
          href={`/course/${course.id}/0/0`}
          className="relative block "
          onClick={() => incrementViewCount(course.id)}
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

          <div className="absolute px-2 py-1 text-white rounded-md bg-black/60 w-fit top-2 left-2 right-2 flex items-center ">
            <Eye className="mr-2" />
            <span className="text-sm text-white/60">{course.views}</span>
          </div>
        </Link>
        <div className="absolute top-2 right-2">
          {role === "admin" && <DeleteCourseButton course={course} />}
        </div>

        <div className="p-4">
          <div className="flex items-center">
            <UserAvatar user={user} />
            <h4 className="text-sm text-secondary-foreground/60 ml-2">
              {user?.name}
            </h4>
          </div>

          <div className="space-y-1 mt-2">
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
      </div>
    </>
  );
};

export default FeedCourseCard;
