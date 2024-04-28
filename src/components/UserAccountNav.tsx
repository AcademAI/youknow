"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { Separator } from "./ui/separator";

type Props = {
  user: User;
};

const UserAccountNav = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user.name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-secondary-foreground">
                {user.email}
              </p>
            )}
            <Separator />
            {
              <Link
                href={`/user/${user.id}`}
                className="w-[200px] truncate text-sm text-secondary-foreground mt-4"
              >
                Мой профиль
              </Link>
            }
            {
              <Link
                href="/faq"
                className="w-[200px] truncate text-sm text-secondary-foreground"
              >
                Частые вопросы
              </Link>
            }
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            signOut({ callbackUrl: "/" });
          }}
          className="text-red-600 cursor-pointer"
        >
          Выйти
          <LogOut className="w-4 h-4 ml-2" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
