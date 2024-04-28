"use client";
// ProfileSettingsForm.tsx
import React from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

import { profileSettingsSchema } from "@/validators/settings";
import { Course, User } from "@prisma/client";
import { deleteAccount } from "@/lib/actions";
import { signOut } from "next-auth/react";

type ProfileSettingsInput = z.infer<typeof profileSettingsSchema> & {
  [key: string]: string | File;
};

type Props = {
  author: User & {
    followers: {
      follower: User & { courses: Course[] };
    }[];
  };
  onClose: () => void;
};
const ProfileSettingsForm = ({ author, onClose }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const form = useForm<ProfileSettingsInput>({
    resolver: zodResolver(profileSettingsSchema),
  });

  async function updateProfile(data: ProfileSettingsInput) {
    try {
      let avatarBase64 = "";
      let file = data.avatar;
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        avatarBase64 = buffer.toString("base64");
      }

      const formData = new FormData();
      formData.append("id", author.id);
      if (data.name) formData.append("name", data.name);
      if (data.bio) formData.append("bio", data.bio);
      if (avatarBase64) formData.append("avatar", avatarBase64);

      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast({
        title: "Успех",
        description: "Профиль успешно обновлен",
      });
      await sleep(1000);
      onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: "Ошибка",
        description: "Что-то пошло не так",
        variant: "destructive",
      });
    }
  }

  const handleAccountDelete = async (authorId: string) => {
    if (!authorId) {
      toast({
        title: "Ошибка",
        description: "Вы не авторизованы",
        variant: "destructive",
      });
      return;
    }
    try {
      await deleteAccount(authorId);
      toast({
        title: "Успех",
        description: "Аккаунт успешно удален",
      });
      await sleep(2000);
      signOut();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при удалении",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(updateProfile)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input
                  className="h-auto"
                  placeholder={author?.name || "Имя отсутствует"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Био</FormLabel>
              <FormControl>
                <Input
                  className="h-auto"
                  placeholder={author?.bio || "Био отсутствует"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аватар</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Аватар"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      form.setValue("avatar", e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="outline"
          color="gray"
          className="mt-3 w-full"
        >
          Сохранить
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              color="gray"
              className="mt-3 w-full"
            >
              Удалить аккаунт
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
              <AlertDialogDescription>
                Это действие нельзя отменить. Это удалит ваш аккаунт и данные с
                сервера.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleAccountDelete(author?.id)}
              >
                Продолжить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
};

export default ProfileSettingsForm;
