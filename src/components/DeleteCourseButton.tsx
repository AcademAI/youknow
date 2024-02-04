"use client";
import React from "react";
import { useTransition } from "react";
import { deleteCourse } from "@/lib/actions";
import { Button } from "./ui/button";
import { Course } from "@prisma/client";
import { Trash } from "lucide-react";

type Props = {
  course: Course;
  url?: string;
};

const DeleteCourseButton = ({ course, url }: Props) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => startTransition(() => deleteCourse(course.id, url))}
      variant="ghost"
    >
      <Trash className="w-4 h-4 ml-2 text-red-500" />
    </Button>
  );
};

export default DeleteCourseButton;
