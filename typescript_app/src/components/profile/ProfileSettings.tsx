"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Course, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import ProfileSettingsForm from "../ProfileSettingsForm";
import React, { useState } from "react";
type Props = {
  author: User & {
    followers: {
      follower: User & { courses: Course[] };
    }[];
  };
};
export const ProfileSettings = ({ author }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="ml-4" variant="outline">
          Настройки
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать профиль</DialogTitle>
          <DialogDescription>
            Измените профиль в соответствии с вашими потребностями.
          </DialogDescription>
        </DialogHeader>
        <ProfileSettingsForm author={author} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
