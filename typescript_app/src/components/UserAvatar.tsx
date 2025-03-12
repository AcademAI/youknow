import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { User } from "next-auth";
import Image from "next/image";

type Props = {
  user: User;
};

const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar>
      {user.image ? (
        <div className="relative w-ful h-full aspect-square cursor-pointer">
          <Image
            fill
            src={user.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="user profile"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded-full ">
          <p className="text-gray-500 text-xs">No Image</p>
        </div>
      )}
    </Avatar>
  );
};

export default UserAvatar;
