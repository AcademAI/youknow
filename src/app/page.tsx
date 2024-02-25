import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import React from "react";
import HeroSignInButton from "@/components/HeroSignInButton";
import HeroFeedButton from "@/components/HeroFeedButton";
import HeroCreateButton from "@/components/HeroCreateButton";
import Image from "next/image";
type Props = {};

const GalleryPage = async (props: Props) => {
  const session = await getAuthSession();

  const courses = await prisma.course.findMany({
    take: 1,
    include: {
      units: {
        include: { chapters: true },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
  return (
    <div className="py-8 mx-auto max-w-7xl ml-auto mr-auto pl-4 pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center gap-12">
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left">
            <h1>
              Бесплатная генерация
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-blue-500">
                образовательных
              </span>
              курсов на любую тематику с GPT
            </h1>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <HeroFeedButton />
            {session?.user ? <HeroCreateButton /> : <HeroSignInButton />}
          </div>
        </div>

        <div className="w-full aspect-square p-6">
          <div className="relative w-full h-full ">
            <div className="absolute left-0 top-0 w-[55%] aspect-square rounded-full border-2 border-primary">
              <div className="absolute w-full h-full flex flex-col justify-center items-center gap-3">
                <div className="text-2xl sm:text-4xl font-bold text-blue-500">
                  GPT
                </div>
              </div>
              <div className="absolute w-full h-full z-10 animate-spin-slow">
                <div className="absolute bg-background dark:bg-white w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-primary -right-8 sm:-right-10 top-1/2 -translate-y-1/2">
                  <div className="absolute w-full h-full flex justify-center items-center">
                    <Image
                      src="/openai.svg"
                      alt="openai"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-[10%] w-[55%] aspect-square rounded-full border-2 border-primary">
              <div className="absolute w-full h-full flex flex-col justify-center items-center gap-3">
                <div className="text-2xl sm:text-4xl font-bold text-red-500">
                  YouTube
                </div>
              </div>
              <div className="absolute w-full h-full z-10 animate-reverse-spin ">
                <div className="absolute bg-background dark:bg-white w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-success -top-8 sm:-top-10 left-1/2 -translate-x-1/2 animate-spin-slow">
                  <div className="absolute w-full h-full flex justify-center items-center">
                    <Image
                      src="/youtube.svg"
                      alt="youtube"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-[15%] bottom-0 w-[55%] aspect-square rounded-full border-2 border-primary">
              <div className="absolute w-full h-full flex flex-col justify-center items-center gap-3">
                <div className="text-2xl sm:text-4xl font-bold text-primary">
                  Web
                </div>
              </div>
              <div className="absolute w-full h-full z-10 animate-reverse-spin">
                <div className="absolute bg-background dark:bg-white w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-warning -top-8 sm:-top-10 left-1/2 -translate-x-1/2 animate-spin-slow">
                  <div className="absolute w-full h-full flex justify-center items-center">
                    <Image
                      src="/www.svg"
                      alt="www"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
