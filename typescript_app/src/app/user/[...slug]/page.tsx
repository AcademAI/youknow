import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";
import React from "react";
import ProfileUserCard from "@/components/profile/ProfileUserCard";
import { ProfileFollowers } from "@/components/profile/ProfileFollowers";
import { ProfileFollows } from "@/components/profile/ProfileFollows";
import { ProfileCourses } from "@/components/profile/ProfileCourses";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ProfileAdmin } from "@/components/profile/ProfileAdmin";
import type { Metadata } from "next";
import { UserWithRelations } from "@/types/types";
import { CourseWithUnits } from "@/types/types";
type Props = {
  params: {
    slug: string[];
  };
};

const UserPage = async ({ params }: Props) => {
  const session = await getAuthSession();
  const { slug } = await params; // Destructure slug from params
  const [authorId] = slug;

  const author = await prisma.user.findUnique({
    where: { id: authorId },
    include: {
      courses: { include: { units: { include: { chapters: true } } } },
      followers: {
        include: {
          follower: { include: { courses: true } },
        },
      },
      follows: {
        include: {
          followed: { include: { courses: true } },
        },
      },
      stats: true,
    },
  });
  const users: UserWithRelations[] = await prisma.user.findMany({
    include: {
      courses: true,
      accounts: true,
      followers: { include: { follower: { include: { courses: true } } } },
      follows: { include: { followed: { include: { courses: true } } } },
      signIns: {
        orderBy: {
          signInTime: "desc",
        },
        take: 1,
      },
    },
  });

  if (!author) {
    return redirect("/feed");
  }

  const stats = await prisma.stats.findMany({
    where: {
      userId: author.id,
    },
    select: {
      chapterId: true,
    },
  });

  const chapters = await prisma.chapter.findMany({
    where: {
      id: {
        in: stats.map((stat) => stat.chapterId),
      },
    },
  });

  const courses = await prisma.unit.findMany({
    where: {
      id: {
        in: chapters.map((chapter) => chapter.unitId),
      },
    },
    select: {
      course: { include: { units: { include: { chapters: true } } } },
    },
  });
  const coursesWithUnits: CourseWithUnits[] = [];
  const addedIds = new Set();

  courses.forEach((course) => {
    if (!addedIds.has(course.course.id)) {
      coursesWithUnits.push({
        id: course.course.id,
        name: course.course.name,
        image: course.course.image,
        views: course.course.views,
        hidden: course.course.hidden,
        createdAt: course.course.createdAt,
        updatedAt: course.course.updatedAt,
        totalDuration: course.course.totalDuration,
        authorId: course.course.authorId,
        units: course.course.units.map((unit) => ({
          ...unit,
          chapters: unit.chapters.map((chapter) => ({
            ...chapter,
          })),
        })),
      });
      addedIds.add(course.course.id);
    }
  });

  return (
    <div className="py-8 mx-auto max-w-7xl overflow-hidden">
      <ProfileUserCard author={author} session={session} />
      <Tabs defaultValue="courses" className="sm:text-start text-center my-8">
        <ScrollArea className="sm:w-fit w-full whitespace-nowrap rounded-md border">
          <TabsList>
            <TabsTrigger value="courses">Курсы</TabsTrigger>
            {session?.user?.id === author.id &&
            (session?.user?.role === "admin" ||
              session?.user?.role === "sa") ? (
              <TabsTrigger value="admin">Админка</TabsTrigger>
            ) : null}
            <TabsTrigger value="stats">Статистика</TabsTrigger>
            <TabsTrigger value="followers">Подписчики</TabsTrigger>
            <TabsTrigger value="follows">Подписки</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="courses">
          <ProfileCourses author={author} session={session} />
        </TabsContent>
        <TabsContent value="admin">
          <ProfileAdmin users={users} />
        </TabsContent>
        <TabsContent value="stats">
          <ProfileStats
            author={author}
            courses={coursesWithUnits}
            chapters={chapters}
          />
        </TabsContent>
        <TabsContent value="followers">
          <ProfileFollowers author={author} />
        </TabsContent>
        <TabsContent value="follows">
          <ProfileFollows author={author} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params; // Destructure slug from params
  const [authorId] = slug;
  const author = await prisma.user.findUnique({
    where: { id: authorId },
  });

  if (!author) {
    return {
      title: "Пользователь не найден",
      description: "Пользователь не был найден.",
    };
  }
  const authorName = author.name;
  const authorBio = author.bio;

  const title = `Пользователь ${authorName} | YouKnow`;
  const description = `${authorBio}`;

  return {
    title,
    description,
  };
}

export default UserPage;
