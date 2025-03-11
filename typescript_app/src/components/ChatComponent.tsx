"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Chapter } from "@prisma/client";
import { Message } from "ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import axios from "axios";
import MessageList from "./MessageList";
import { SendHorizontalIcon } from "lucide-react";

import { useToast } from "./ui/use-toast";
import { useQuery } from "@tanstack/react-query";

interface ChatProps {
  chapter: Chapter;
  session: any;
}

export default function Chat({ chapter, session }: ChatProps) {
  let userId = session?.user?.id;
  let chapterId = chapter.id;

  const { toast } = useToast();
  const ref = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["chapter", chapter.id],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        userId,
        chapterId,
      });
      return response.data;
    },
  });

  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    api: "/api/chat",
    body: { chapter, session },
    initialMessages: data || [],

    onResponse: (response) => {
      if (!response.ok) {
        const status = response.status;
        switch (status) {
          default:
            console.log(error);
            toast({
              title: "Ошибка",
              description: "Что-то пошло не так",
              variant: "destructive",

            });
            break;
        }
      }
    },
  });

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(e);
  }

  return (
    <section className="mb-4 text-zinc-700">
      <div className="container w-full">
        <div className="mx-auto flex w-full justify-center px-1">
          <h1 className="font-serif text-2xl font-medium">ИИ чат-бот</h1>
        </div>

        <div className="mx-auto mt-3 w-full ">
          <ScrollArea
            className="mb-2 h-[400px] rounded-md border p-4"
            ref={ref}
          >
            <MessageList
              messages={messages}
              isLoading={isLoading}
              session={session}
            />
          </ScrollArea>

          <form onSubmit={onSubmit} className="relative">
            <Input
              name="message"
              value={input}
              onChange={handleInputChange}
              placeholder={"Введите ваш вопрос"}
              className="pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500"
            />
            <Button
              size="icon"
              type="submit"
              variant="secondary"
              disabled={isLoading}
              className="absolute right-1 top-1 h-8 w-10"
            >
              <SendHorizontalIcon className="h-5 w-5 text-emerald-500" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
