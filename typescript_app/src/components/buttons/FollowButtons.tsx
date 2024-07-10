"use client";
import React from "react";
import { useTransition } from "react";
import { follow, unFollow } from "@/lib/actions";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  userId: string;
  authorId: string;
};

export const FollowButton = ({ userId, authorId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFollow = async () => {
    if (!userId) {
      toast({
        title: "Ошибка",
        description: "Вы не авторизованы",
        variant: "destructive",
      });
      return;
    }
    if (userId === authorId) {
      toast({
        title: "Ошибка",
        description: "Нельзя подписаться на себя",
        variant: "destructive",
      });
    } else {
      try {
        await startTransition(() => follow(userId, authorId));
        toast({
          title: "Успех",
          description: "Вы подписались на автора",
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Произошла ошибка при подписке",
          variant: "destructive",
        });
      }
    }
  };

  return <Button onClick={handleFollow}>Подписаться</Button>;
};

export const UnFollowButton = ({ userId, authorId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleUnFollow = async () => {
    if (!userId) {
      toast({
        title: "Ошибка",
        description: "Вы не авторизованы",
        variant: "destructive",
      });
      return;
    }
    try {
      await startTransition(() => unFollow(userId, authorId));
      toast({
        title: "Успех",
        description: "Вы отписались от автора",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при отписке",
        variant: "destructive",
      });
    }
  };

  return <Button onClick={handleUnFollow}>Отписаться</Button>;
};
