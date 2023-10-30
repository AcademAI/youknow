import { getAuthSession } from "@/lib/auth";
import React from "react";
import { redirect } from "next/navigation";
import { InfoIcon } from "lucide-react";
import CreateCourseForm from "@/components/CreateCourseForm";
//import { checkSubscription } from "@/lib/subscription";

type Props = {};

const CreatePage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }
  
  // пока так
  const isPro = false;
  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
        Приступим?
      </h1>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
        <div>
        Введи название курса, который ты хочешь создать. Затем укажи разделы курса, в которые хочешь углубиться. Наш ИИ создаст курс под тебя.
        </div>
      </div>

      <CreateCourseForm isPro={isPro} />
    </div>
  );
};

export default CreatePage;
