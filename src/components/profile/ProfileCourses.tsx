import { Course, User } from "@prisma/client";
import { Separator } from "../ui/separator";
import { getCourses } from "@/lib/actions";
import {
  CourseDataTable,
  CourseDataTablePrivate,
} from "../dataTable/DataTables";
import { courseColumns, courseColumnsPrivate } from "../dataTable/Columns";
type Props = {
  author: User & {
    courses: Course[];
  };
  session: any;
};

export const ProfileCourses = async ({ author, session }: Props) => {
  const courses = await getCourses({ authorId: author.id, applyLimit: false });

  return (
    <section>
      {author.courses.length > 0 ? (
        <div className="mt-4">{`Курсы автора: ${
          author.courses.length
        } Скрытых: ${
          author.courses.filter((course) => course.hidden).length
        }`}</div>
      ) : (
        <div className="mt-4">{`Курсы автора: ${
          author.courses.length
        } Скрытых: ${
          author.courses.filter((course) => course.hidden).length
        }`}</div>
      )}
      <Separator className="my-4" />
      {session?.user?.id === author.id ||
      session?.user?.role === "admin" ||
      session?.user?.role === "sa" ? (
        <CourseDataTablePrivate
          columns={courseColumnsPrivate}
          data={courses.courses}
        />
      ) : (
        <CourseDataTable columns={courseColumns} data={courses.courses} />
      )}
    </section>
  );
};
