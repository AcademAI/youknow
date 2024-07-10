import { CourseUserSession } from "@/types/types";
import { Eye, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserAvatar from "./UserAvatar";
import { incrementViewCount } from "@/lib/actions";
import { MotionDiv } from "./MotionDiv";
import { Separator } from "./ui/separator";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const FeedCourseCard = ({ course, user, session }: CourseUserSession) => {
  const handleClick = async () => {
    if (session) {
      await incrementViewCount(course.id);
    }
  };

  return (
    <>
      <MotionDiv
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5, ease: "easeInOut", duration: 0.3 }}
        viewport={{ amount: 0 }}
        className="border rounded-lg border-secondary relative font-bold shadow-2xl shadow-gray-900/10"
      >
        <Link
          href={`/course/${course.id}/0/0`}
          className="relative block"
          onClick={session ? handleClick : undefined}
        >
          <Image
            src={course.image || ""}
            className="object-contain rounded-t-lg"
            width={500}
            height={500}
            alt="picture of the course"
          />
          <span className="capitalize truncate absolute px-2 py-1 text-white text-xl rounded-md bg-black/60 w-70 bottom-2 left-2 right-2">
            {course.name}
          </span>

          <div className="absolute px-2 py-1 text-white rounded-md bg-black/60 w-fit top-2 left-2 right-2 flex items-center ">
            <Timer className="mr-2" />
            <span className="text-sm text-white/60">
              {(() => {
                const totalSeconds = course?.totalDuration || 0;
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                return `${hours}ч ${minutes}м`;
              })()}
            </span>
          </div>
          <div className="absolute px-2 py-1 text-white rounded-md bg-black/60 w-fit top-12 left-2 right-2 flex items-center ">
            <Eye className="mr-2" />
            <span className="text-sm text-white/60">{course.views || 0}</span>
          </div>
        </Link>

        <div className="p-4">
          <div className="flex items-center">
            <Link className="flex items-center" href={`/user/${user.id}`}>
              <UserAvatar user={user} />
              <h4 className="text-sm text-secondary-foreground/60 ml-2">
                {user?.name ? user.name : <p>No Name</p>}
              </h4>
            </Link>
          </div>

          <div className="space-y-1 mt-2">
            {course.units.slice(0, 3).map((unit: any, unitIndex: any) => {
              return (
                <Link
                  href={`/course/${course.id}/${unitIndex}/0`}
                  key={unit.id}
                  className="block w-full capitalize"
                  onClick={session ? handleClick : undefined}
                >
                  {" "}
                  {unit.name}
                  <Separator />
                </Link>
              );
            })}
          </div>
        </div>
      </MotionDiv>
    </>
  );
};

export default FeedCourseCard;
