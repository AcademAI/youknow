"use client";
import React from "react";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Course } from "@prisma/client";
import { Trash } from "lucide-react";

type Props = {
  course: Course;
};

const DeleteCourseButton = ({ course }: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const deleteCourse = (
    onSuccess: (data: any) => void,
    onError: (error: Error) => void
  ) => {
    setLoading(true);
    axios
      .post("/api/course/deleteCourse", { courseId: course.id })
      .then((response) => {
        onSuccess(response.data);
      })
      .catch((error) => {
        console.log("error", error);
        onError(new Error("Не удалось удалить курс"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = () => {
    deleteCourse(
      (data) => {
        toast({
          title: "Успешно",
          description: "Курс успешно удален",
        });
      },
      (error) => {
        console.error(error);
        toast({
          title: "Ошибка",
          description: "Что-то пошло не так",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <Button variant="ghost" onClick={handleDelete} disabled={loading}>
      <Trash className="w-4 h-4 ml-2 text-red-500" />
    </Button>
  );
};

export default DeleteCourseButton;
