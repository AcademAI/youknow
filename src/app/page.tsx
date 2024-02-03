import FeedCourseCard from "@/components/FeedCourseCard";
import { getAuthSession } from "@/lib/auth";
import React from "react";
import { getCourses } from "@/lib/getCourses";
import SearchBar from "@/components/SearchBar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

type Props = {};

const FeedPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getAuthSession();
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 12;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const { courses, totalCount } = await getCourses({
    page,
    limit,
    query: search,
  });
  const totalPages = Math.ceil(totalCount! / limit);

  return (
    <section className="py-8 mx-auto max-w-7xl">
      <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-x-16">
        <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
          Лента курсов
        </h1>
        <div className="flex space-x-6">
          <Link
            href={{
              pathname: "/",
              query: {
                ...(search ? { search } : {}),
                page: page > 1 ? page - 1 : 1,
              },
            }}
            className={clsx(
              "rounded border flex items-center bg-gray-100 px-3 py-1 text-sm text-gray-800",
              page <= 1 && "pointer-events-none opacity-50"
            )}
          >
            <ArrowLeft />
          </Link>
          <div className="self-center">
            <SearchBar search={search} />
          </div>
          <Link
            href={{
              pathname: "/",
              query: {
                ...(search ? { search } : {}),
                page: page + 1,
              },
            }}
            className={clsx(
              "rounded border flex items-center bg-gray-100 px-3 py-1 text-sm text-gray-800",
              page >= totalPages && "pointer-events-none opacity-50"
            )}
          >
            <ArrowRight />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-0 mt-8">
        {courses?.map((course: any) => {
          return (
            <FeedCourseCard
              course={course}
              user={course.user}
              role={session?.user.role}
              key={course.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FeedPage;
