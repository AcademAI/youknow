"use client";
import { User, Stats, Chapter } from "@prisma/client";
import { Separator } from "../ui/separator";
import { CourseWithUnits } from "@/types/types";
import { Gauge } from "../gauge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";

type Props = {
  author: User & {
    stats: Stats[];
  };
  courses: CourseWithUnits[];
  chapters: Chapter[];
};
//https://dev.to/mfts/build-an-expandable-data-table-with-2-shadcnui-components-4nge
export const ProfileStats = ({ author, courses, chapters }: Props) => {
  const passedChapters = chapters.map((chapter) => chapter.id);

  return (
    <section>
      {author.stats.length > 0 ? (
        <div className="mt-4"> Пройдено {author.stats.length} глав</div>
      ) : (
        <div className="mt-4"> Пройдено {author.stats.length} глав</div>
      )}

      <Separator className="my-4" />

      <div className="w-full ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Курс</TableHead>
              <TableHead className="font-medium">Ссылка</TableHead>
              <TableHead className="font-medium">Длительность</TableHead>
              <TableHead className="font-medium">Пройдено</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses ? (
              courses.map((course) => {
                const totalChapters = course.units.reduce(
                  (acc, unit) => acc + unit.chapters.length,
                  0
                );
                const passedChaptersInCourse = course.units.reduce(
                  (acc, unit) => {
                    const passedInUnit = unit.chapters.filter((chapter) =>
                      passedChapters.includes(chapter.id)
                    ).length;
                    return acc + passedInUnit;
                  },
                  0
                );

                const passedPercentage =
                  totalChapters > 0
                    ? Math.round((passedChaptersInCourse / totalChapters) * 100)
                    : 0;

                return (
                  <Collapsible key={course.id} asChild>
                    <>
                      
                      <CollapsibleTrigger asChild>
                        <TableRow className="cursor-pointer bg-secondary">
                          <TableCell className="capitalize">
                            {course.name}
                          </TableCell>
                          <TableCell>
                          <Link href={`/course/${course.id}/0/0`}>
                            {`/course/${course.id}/0/0`}
                          </Link>
                          </TableCell>
                          <TableCell>
                            <div>
                              {(() => {
                                const totalSeconds = course?.totalDuration || 0;
                                const hours = Math.floor(totalSeconds / 3600);
                                const minutes = Math.floor(
                                  (totalSeconds % 3600) / 60
                                );
                                return `${hours}ч ${minutes}м`;
                              })()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Gauge
                              value={passedPercentage}
                              showValue={true}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      </CollapsibleTrigger>
                      <CollapsibleContent asChild>
                        <>
                          {course.units.map((unit, unitIndex) =>
                            unit.chapters.map((chapter, chapterIndex) => (
                              <TableRow key={chapter.id}>
                                <TableCell>
                                  <div className="font-bold underline">
                                    Глава:{" "}
                                  </div>
                                  {chapter.name}
                                </TableCell>
                                <TableCell>
                                <Link
                                  href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                                >
                                  {`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                                </Link>
                                </TableCell>
                                <TableCell>
                                  {(() => {
                                    const totalSeconds = chapter?.duration || 0;
                                    const hours = Math.floor(
                                      totalSeconds / 3600
                                    );
                                    const minutes = Math.floor(
                                      (totalSeconds % 3600) / 60
                                    );
                                    return `${hours}ч ${minutes}м`;
                                  })()}
                                </TableCell>
                                <TableCell>
                                  {passedChapters.includes(chapter.id) ? (
                                    <Gauge
                                      value={100}
                                      showValue={true}
                                      size="small"
                                    />
                                  ) : (
                                    <Gauge
                                      value={0}
                                      showValue={true}
                                      size="small"
                                    />
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                );
              })
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
