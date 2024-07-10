import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CopyToClipboard from "./buttons/CopyToClipboard";

import { Bot } from "lucide-react";

type Props = {
  isLoading: boolean;
  messages: Message[];
  session: any;
};

const MessageList = ({ messages, isLoading, session }: Props) => {
  return (
    <div className="">
      {" "}
      {isLoading ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : messages.length === 0 ? (
        <p>Пока нет сообщений</p>
      ) : (
        messages.map((m) => (
          <div key={m.id} className="sm:mx-6 whitespace-pre-wrap">
            {m.role === "user" && (
              <div className="mb-6 flex gap-3 justify-end">
                <div className="">
                  <p className="font-semibold">{session?.user?.name}</p>
                  <div className=" text-sm text-zinc-500">{m.content}</div>
                </div>
                <Avatar>
                  <AvatarImage src={session?.user?.image} />
                  <AvatarFallback className="text-sm">U</AvatarFallback>
                </Avatar>
              </div>
            )}

            {m.role === "assistant" && (
              <div className="mb-6 flex gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-emerald-500 text-white">
                    <Bot />
                  </AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <div className="flex ">
                    <p className="font-semibold">Bot</p>
                    <CopyToClipboard message={m} className="-mt-1 ml-8" />
                  </div>
                  <div className=" text-sm text-zinc-500">{m.content}</div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
