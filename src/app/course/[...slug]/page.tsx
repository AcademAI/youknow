import CourseSideBar from "@/components/CourseSideBar";
import MainVideo from "@/components/MainVideo";
import VideoSummary from "@/components/VideoSummary";
import QuizCards from "@/components/QuizCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import type { Metadata } from "next";

type Props = {
  params: {
    slug: string[];
  };
};

const CoursePage = async ({ params: { slug } }: Props) => {
  const session = await getAuthSession();

  const [courseId, unitIndexParam, chapterIndexParam] = slug;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      units: {
        include: {
          chapters: {
            include: { questions: true },
          },
        },
      },
    },
  });
  if (!course) {
    return redirect("/gallery");
  }
  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];
  if (!unit) {
    return redirect("/gallery");
  }
  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    return redirect("/gallery");
  }
  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex items-start w-full px-4 py-10 mx-auto gap-x-8 sm:px-6 lg:px-8">
        <aside className="sticky hidden w-1/5 top-8 lg:block">
          <CourseSideBar course={course} currentChapterId={chapter.id} />
        </aside>
        <main className="flex-1 w-3/5">
          <div className="px-8">
            <div className="flex flex-col">
              <MainVideo
                chapter={chapter}
                chapterIndex={chapterIndex}
                unit={unit}
                unitIndex={unitIndex}
              />
              {/* Tabs for VideoSummary, QuizCards and CourseSideBar on mobile */}
              <div className="block xl:hidden mt-5">
                <Tabs defaultValue="videoSummary" className="w-full">
                  <TabsList>
                    <TabsTrigger value="videoSummary">Сводка</TabsTrigger>
                    <TabsTrigger value="quizCards">Тест</TabsTrigger>
                    <TabsTrigger value="courseSideBar">Структура</TabsTrigger>
                  </TabsList>
                  <TabsContent value="videoSummary">
                    <VideoSummary chapterSummary={chapter?.summary || ""} />
                  </TabsContent>
                  <TabsContent value="quizCards">
                    <QuizCards
                      chapter={chapter}
                      role={session?.user?.role || ""}
                    />
                  </TabsContent>
                  <TabsContent value="courseSideBar">
                    <CourseSideBar
                      course={course}
                      currentChapterId={chapter.id}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Shown on larger screens */}

              <div className="hidden lg:block">
                <VideoSummary chapterSummary={chapter?.summary || ""} />
              </div>
            </div>
            {/* Navigation links */}
            <div className="flex-[1] h-[1px] mt-4 text-gray-500 bg-gray-500" />
            <div className="flex pb-8">
              {prevChapter && (
                <Link
                  href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
                  className="flex mt-4 mr-auto w-fit"
                >
                  <div className="flex items-center">
                    <ChevronLeft className="w-6 h-6 mr-1" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm text-secondary-foreground/60">
                        Предыдущий
                      </span>
                      <span className="text-xl font-bold">
                        {prevChapter.name}
                      </span>
                    </div>
                  </div>
                </Link>
              )}
              {nextChapter && (
                <Link
                  href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
                  className="flex mt-4 ml-auto w-fit"
                >
                  <div className="flex items-center">
                    <div className="flex flex-col items-start">
                      <span className="text-sm text-secondary-foreground/60">
                        Следующий
                      </span>
                      <span className="text-xl font-bold">
                        {nextChapter.name}
                      </span>
                    </div>
                    <ChevronRight className="w-6 h-6 ml-1" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </main>
        {/* QuizCards for larger screens */}
        <aside className="sticky hidden w-1/5 top-8 shrink-0 xl:block">
          <QuizCards chapter={chapter} role={session?.user?.role || ""} />
        </aside>
      </div>
    </div>
  );
};
export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      units: {
        include: {
          chapters: {
            include: { questions: true },
          },
        },
      },
    },
  });

  if (!course) {
    return {
      title: "Курс не найден",
      description: "Запрошенный курс не был найден.",
    };
  }

  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];
  const chapter = unit.chapters[chapterIndex];

  const title = `${chapter.name} - ${course.name} | YouKnow`;
  const description = `${chapter.summary}`;

  return {
    title,
    description,
  };
}

export default CoursePage;
