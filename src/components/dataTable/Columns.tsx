"use client";

import { Course, User, Account, Logs, Chapter } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "../ui/switch";
import {
  hideCourse,
  openCourse,
  deleteCourse,
  onPromote,
  onDemote,
  onDelete,
} from "@/lib/actions";
import React from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { UserWithRelations, Follows } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "../ui/use-toast";

export const courseColumns: ColumnDef<Course>[] = [
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Превью</div>;
    },
    accessorKey: "image",
    cell: ({ row }) => {
      // Check if the image property exists and is not null
      if (row.getValue("image")) {
        return (
          <Link
            className="hidden sm:table-cell"
            href={`/course/${row.getValue("id")}/0/0`}
          >
            <Image
              src={row.getValue("image")}
              alt="image"
              width={100}
              height={100}
            />
          </Link>
        );
      } else {
        // Render a fallback UI if the image property is null or undefined
        return (
          <div className="hidden sm:table-cell">
            <p>No Image</p>
          </div>
        );
      }
    },
  },
  {
    header: "Название",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <Link
          href={`/course/${row.getValue("id")}/0/0`}
          className="hover:underline capitalize"
        >
          {row.getValue("name")}
        </Link>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="hidden sm:flex"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Просмотры <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "views",
    cell: ({ row }) => {
      return (
        <div className="hidden sm:table-cell">{row.getValue("views")}</div>
      );
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Создан</div>;
    },
    accessorKey: "createdAt",

    cell: ({ row }) => {
      return (
        <div className="hidden sm:table-cell">
          {new Date(row.getValue("createdAt"))
            .toISOString()
            .replace("T", " ")
            .slice(0, 10)}
        </div>
      );
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Продолжительность</div>;
    },
    accessorKey: "totalDuration",
    cell: ({ row }) => {
      return (
        <div className="hidden sm:table-cell">
          {(() => {
            const totalSeconds = (row.getValue("totalDuration") as number) || 0;
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            return `${hours}ч ${minutes}м`;
          })()}
        </div>
      );
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">ID курса</div>;
    },
    accessorKey: "id",
    cell: ({ row }) => {
      return <div className="hidden sm:table-cell">{row.getValue("id")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;
      // make it a url to course
      const url = `https://youknow.academai.ru/course/${course.id}/0/0`;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(url)}
            >
              Поделиться
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const courseColumnsPrivate: ColumnDef<Course>[] = [
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Превью</div>;
    },
    accessorKey: "image",
    cell: ({ row }) => {
      // Check if the image property exists and is not null
      if (row.getValue("image")) {
        return (
          <Link
            className="hidden sm:table-cell"
            href={`/course/${row.getValue("id")}/0/0`}
          >
            <Image
              src={row.getValue("image")}
              alt="image"
              width={100}
              height={100}
            />
          </Link>
        );
      } else {
        // Render a fallback UI if the image property is null or undefined
        return (
          <div className="hidden sm:table-cell">
            <p>Нет превью</p>
          </div>
        );
      }
    },
  },
  {
    header: "Название",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <Link
          href={`/course/${row.getValue("id")}/0/0`}
          className="hover:underline capitalize"
        >
          {row.getValue("name")}
        </Link>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="hidden sm:flex"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Просмотры <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "views",
    cell: ({ row }) => {
      return (
        <div className="hidden sm:table-cell">{row.getValue("views")}</div>
      );
    },
  },
  {
    header: "Скрыт",
    accessorKey: "hidden",
    cell: ({ row }) => {
      const authorId = row.getValue("authorId") as string;
      console.log("authorId", authorId);
      return (
        <Switch
          checked={row.getValue("hidden")}
          onCheckedChange={() =>
            row.getValue("hidden")
              ? openCourse(row.getValue("id"), authorId)
              : hideCourse(row.getValue("id"), authorId)
          }
        />
      );
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Создан</div>;
    },
    accessorKey: "createdAt",

    cell: ({ row }) => {
      return (
        <div className="hidden sm:table-cell">
          {new Date(row.getValue("createdAt"))
            .toISOString()
            .replace("T", " ")
            .slice(0, 10)}
        </div>
      );
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Продолжительность</div>;
    },
    accessorKey: "totalDuration",
    cell: ({ row }) => {
      return (
        <div className="hidden sm:table-cell">
          {(() => {
            const totalSeconds = (row.getValue("totalDuration") as number) || 0;
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            return `${hours}ч ${minutes}м`;
          })()}
        </div>
      );
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">ID курса</div>;
    },
    accessorKey: "id",
    cell: ({ row }) => {
      return <div className="hidden sm:table-cell">{row.getValue("id")}</div>;
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">ID автора</div>;
    },
    accessorKey: "authorId",
    cell: ({ row }) => {
      return (
        <div className="hidden sm:table-cell">{row.getValue("authorId")}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;
      // make it a url to course
      const url = `https://youknow.academai.ru/course/${course.id}/0/0`;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(url)}
            >
              Поделиться
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteCourse(course.id);
              }}
            >
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const adminColumns: ColumnDef<UserWithRelations>[] = [
  {
    header: ({}) => {
      return <div className="">Фото</div>;
    },
    accessorKey: "image",
    cell: ({ row }) => {
      const id = row.getValue("id");
      // Check if the image property exists and is not null
      if (row.getValue("image")) {
        return (
          <Avatar className="w-12 h-12 rounded-full">
            <Link className="" href={`/user/${row.getValue("id")}`}>
              <Image
                src={row.getValue("image")}
                alt="image"
                fill
                className="rounded-full"
                referrerPolicy="no-referrer"
              />
            </Link>
          </Avatar>
        );
      } else {
        return (
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Link
              href={`/user/${row.getValue("id")}`}
              className="text-gray-500 text-xs"
            >
              No img{" "}
            </Link>
          </div>
        );
      }
    },
  },
  {
    header: "Имя",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <Link href={`/user/${row.getValue("id")}`} className="hover:underline">
          {row.getValue("name")}
        </Link>
      );
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Email</div>;
    },
    accessorKey: "email",
    cell: ({ row }) => {
      return (
        <div className="hidden sm:table-cell">{row.getValue("email")}</div>
      );
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Провайдер</div>;
    },
    accessorKey: "accounts",
    cell: ({ row }) => {
      const accounts = row.getValue("accounts") as Account[];
      const provider = accounts[0]?.provider ?? "Email";
      return <div className="capitalize hidden sm:table-cell">{provider}</div>;
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Курсы</div>;
    },
    accessorKey: "courses",
    cell: ({ row }) => {
      const courses = row.getValue("courses") as Course[];
      const length = courses.length ?? "Email";
      return <div className="capitalize hidden sm:table-cell">{length}</div>;
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Подписчики</div>;
    },
    accessorKey: "followers",
    cell: ({ row }) => {
      const followers = row.getValue("followers") as User[];
      const length = followers.length ?? "0";
      return <div className="capitalize hidden sm:table-cell">{length}</div>;
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Роль</div>;
    },
    accessorKey: "role",
    cell: ({ row }) => {
      return (
        <div className="capitalize hidden sm:table-cell">
          {row.getValue("role")}
        </div>
      );
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Последний вход</div>;
    },
    accessorKey: "signIns",
    cell: ({ row }) => {
      const logs = row.getValue("signIns") as Logs[];
      if (logs[0]?.signInTime) {
        const signInTime = new Date(logs[0].signInTime)
          .toISOString()
          .split("T")[0];
        return (
          <div className="capitalize hidden sm:table-cell">{signInTime}</div>
        );
      } else {
        return <div className="capitalize hidden sm:table-cell">N/A</div>;
      }
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">IP-адрес</div>;
    },
    accessorKey: "IPAddress",
    cell: ({ row }) => {
      const logs = row.getValue("signIns") as Logs[];
      if (logs[0]?.ipAddress) {
        const ipAddress = logs[0].ipAddress;

        return (
          <div className="capitalize hidden sm:table-cell">{ipAddress}</div>
        );
      } else {
        return <div className="capitalize hidden sm:table-cell">N/A</div>;
      }
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">Дата регистрации</div>;
    },
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      const signInTime = new Date(createdAt).toISOString().split("T")[0];

      return (
        <div className="capitalize hidden sm:table-cell">{signInTime}</div>
      );
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">ID пользователя</div>;
    },
    accessorKey: "id",
    cell: ({ row }) => {
      return <div className="hidden sm:table-cell">{row.getValue("id")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { toast } = useToast();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await onPromote(row.original);
                  toast({
                    title: "Успешно",
                    description: "Пользователь повышен",
                  });
                } catch (error) {
                  toast({
                    title: "Ошибка",
                    description: "Действие невозможно",
                    variant: "destructive",
                  });
                }
              }}
            >
              Повысить
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await onDemote(row.original);
                  toast({
                    title: "Успешно",
                    description: "Пользователь понижен",
                  });
                } catch (error) {
                  toast({
                    title: "Ошибка",
                    description: "Действие невозможно",
                    variant: "destructive",
                  });
                }
              }}
            >
              Понизить
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await onDelete(row.original);
                  toast({
                    title: "Успешно",
                    description: "Пользователь удален",
                  });
                } catch (error) {
                  toast({
                    title: "Ошибка",
                    description: "Действие невозможно",
                    variant: "destructive",
                  });
                }
              }}
            >
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const followersColumns: ColumnDef<{
  id: string;
  image: string | null;
  name: string | null;
  coursesCount: number;
}>[] = [
  {
    header: ({}) => {
      return <div className="">Фото</div>;
    },
    accessorKey: "image",
    cell: ({ row }) => {
      const id = row.getValue("id");
      // Check if the image property exists and is not null
      if (row.getValue("image")) {
        return (
          <Avatar className="w-12 h-12 rounded-full">
            <Link className="" href={`/user/${row.getValue("id")}`}>
              <Image
                src={row.getValue("image")}
                alt="image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-full"
                referrerPolicy="no-referrer"
              />
            </Link>
          </Avatar>
        );
      } else {
        return (
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Link
              href={`/user/${row.getValue("id")}`}
              className="text-gray-500 text-xs"
            >
              No img{" "}
            </Link>
          </div>
        );
      }
    },
  },
  {
    header: "Имя",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <Link href={`/user/${row.getValue("id")}`} className="hover:underline">
          {row.getValue("name")}
        </Link>
      );
    },
  },
  {
    header: ({}) => {
      return <div className="">Курсов</div>;
    },
    accessorKey: "coursesCount",
    cell: ({ row }) => {
      return <div className="">{row.getValue("coursesCount")}</div>;
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">ID пользователя</div>;
    },
    accessorKey: "id",
    cell: ({ row }) => {
      return <div className="hidden sm:table-cell">{row.getValue("id")}</div>;
    },
  },
];

export const followsColumns: ColumnDef<{
  id: string;
  image: string | null;
  name: string | null;
  coursesCount: number;
}>[] = [
  {
    header: ({}) => {
      return <div className="">Фото</div>;
    },
    accessorKey: "image",
    cell: ({ row }) => {
      const id = row.getValue("id");
      // Check if the image property exists and is not null
      if (row.getValue("image")) {
        return (
          <Avatar className="w-12 h-12 rounded-full">
            <Link className="" href={`/user/${row.getValue("id")}`}>
              <Image
                src={row.getValue("image")}
                alt="image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-full"
                referrerPolicy="no-referrer"
              />
            </Link>
          </Avatar>
        );
      } else {
        return (
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Link
              href={`/user/${row.getValue("id")}`}
              className="text-gray-500 text-xs"
            >
              No img{" "}
            </Link>
          </div>
        );
      }
    },
  },
  {
    header: "Имя",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <Link href={`/user/${row.getValue("id")}`} className="hover:underline">
          {row.getValue("name")}
        </Link>
      );
    },
  },
  {
    header: ({}) => {
      return <div className="">Курсов</div>;
    },
    accessorKey: "coursesCount",
    cell: ({ row }) => {
      return <div className="">{row.getValue("coursesCount")}</div>;
    },
  },
  {
    header: ({}) => {
      return <div className="hidden sm:table-cell">ID пользователя</div>;
    },
    accessorKey: "id",
    cell: ({ row }) => {
      return <div className="hidden sm:table-cell">{row.getValue("id")}</div>;
    },
  },
];
