"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Gauge } from "./gauge";
import { Course, User, Stats, Chapter, Unit } from "@prisma/client";
interface ChapterVisibleProps {
  chapters: Chapter[];
}
export default function ChapterVisible({ chapters }: ChapterVisibleProps) {
  return (
    <>
      {chapters
        ? chapters.map((chapter) => (
            <TableRow key={chapter.id}>
              <TableCell>{chapter.name}</TableCell>
              <TableCell>{chapter.duration}</TableCell>
              <TableCell>
                <Gauge value={20} showValue={true} size="small" />
              </TableCell>
            </TableRow>
          ))
        : null}
    </>
  );
}
