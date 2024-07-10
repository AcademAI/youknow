import { getAuthSession } from "@/lib/auth";
import React from "react";
import LoadMoreFeedCourses from "@/components/LoadMoreFeedCourses";
import { getCoursesFeed } from "@/lib/actions";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const FeedPage = async ({ searchParams }: Props) => {
  const session = await getAuthSession();
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const courses = await getCoursesFeed({ query: search });
  return (
    <section className="py-8 mx-auto max-w-7xl">
      <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-x-16">
        <h1 className="self-center text-3xl font-bold text-center">
          Лента курсов
        </h1>
      </div>
      <LoadMoreFeedCourses
        key={Math.random()}
        session={session || ""}
        query={search}
        initialCourses={courses.courses}
      />
    </section>
  );
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const dynamicTitle = `Лента курсов: ${
    searchParams.search || "Все курсы"
  } | YouKnow`;

  return {
    title: dynamicTitle,
  };
}

export default FeedPage;
