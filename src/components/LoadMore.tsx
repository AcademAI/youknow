"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getCourses } from "@/lib/actions";
import FeedCourseCard from "./FeedCourseCard";
import { Chapter, Course, Unit } from "@prisma/client";

type CourseWithUnits = Course & {
  units: (Unit & {
    chapters: Chapter[];
  })[];
};

const LoadMore = ({
  session,
  query,
  initialCourses,
}: {
  session?: string;
  query?: string;
  initialCourses?: CourseWithUnits[];
}) => {
  const [courses, setCourses] = useState(initialCourses);
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    async function fetchData() {
      if (inView) {
        const next = page + 1;
        await getCourses({ page: next, query }).then((res) => {
          if (res.courses.length === 0) {
            setNoMoreData(true);
          } else {
            setPage(next);
            setCourses((prev: CourseWithUnits[] | undefined) => [
              ...(prev?.length ? prev : []),
              ...res.courses,
            ]);
          }
        });
      }
    }
    fetchData();
  }, [inView]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-0 mt-8">
        {courses?.map((course: any) => {
          return (
            <FeedCourseCard
              course={course}
              user={course.user}
              role={session}
              key={course.id}
            />
          );
        })}
      </div>
      {!noMoreData && (
        <section className="flex justify-center items-center w-full pt-4">
          <div ref={ref}>
            <Loader2 className="animate-spin w-10 h-10" />
          </div>
        </section>
      )}
    </>
  );
};

export default LoadMore;
