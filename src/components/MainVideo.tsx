import { MainVideo } from "@/types/types";
import React from "react";

const MainVideo = ({ unit, unitIndex, chapter, chapterIndex }: MainVideo) => {
  return (
    <div className="flex-[2] mt-5">
      <h4 className="text-sm uppercase text-secondary-foreground/60">
        Раздел {unitIndex + 1} &bull; Глава {chapterIndex + 1}
      </h4>
      <h1 className="text-4xl font-bold">{chapter.name}</h1>
      <iframe
        title="chapter video"
        className="w-full mt-4 aspect-video max-h-[24rem]"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
    </div>
  );
};

export default MainVideo;
