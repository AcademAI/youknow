import { getAuthSession } from "@/lib/auth";
import React from "react";
import SearchBar from "@/components/SearchBar";
import LoadMore from "@/components/LoadMore";
import { getCourses } from "@/lib/actions";

const FeedPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getAuthSession();
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const courses = await getCourses({ query: search });
  return (
    <section className="py-8 mx-auto max-w-7xl">
      <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-x-16">
        <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
          Лента курсов
        </h1>
        <div className="flex space-x-6 pt-4">
          <div className="flex">
            <SearchBar search={search} />
          </div>
        </div>
      </div>
      <LoadMore
        key={Math.random()}
        session={session?.user?.role || ""}
        query={search}
        initialCourses={courses.courses}
      />
    </section>
  );
};

export default FeedPage;