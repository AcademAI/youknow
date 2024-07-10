import { Chapter, Unit } from "@prisma/client";
import React from "react";

type Props = {
  chapterSummary: string;
};

const VideoSummary = ({ chapterSummary }: Props) => {
  return (
    <div className="flex-[2] mt-5">
      <div className="mt-4">
        <h3 className="text-3xl font-semibold">Сводка</h3>
        <p className="mt-2 text-secondary-foreground/80">{chapterSummary}</p>
      </div>
    </div>
  );
};

export default VideoSummary;
