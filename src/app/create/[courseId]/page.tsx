import ConfirmChapters from "@/components/ConfirmChapters";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Info } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { revalidatePath } from "next/cache";

type Props = {
  params: {
    courseId: string;
  };
};

const CreateChapters = async ({ params: { courseId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  const pathToRevalidate = `/user/${session?.user?.id}`;
  revalidatePath(pathToRevalidate);
  if (!course) {
    return redirect("/create");
  }
  return (
    <div className="flex flex-col items-start max-w-xl mx-auto py-8">
      <h5 className="self-center  text-center text-sm uppercase text-secondary-foreground/60">
        Название курса
      </h5>
      <h1 className="self-center text-center text-3xl font-bold">
        {course.name}
      </h1>

      <div className="flex p-4 mt-5 border-none bg-secondary">
        <Info className="w-12 h-12 mr-3 text-blue-400" />
        <div>
          ИИ сгенерировал главы под каждый раздел, которые вы указали. Нажмите
          создать чтобы наполнить курс.
        </div>
      </div>
      <ConfirmChapters course={course} />
    </div>
  );
};

export default CreateChapters;
