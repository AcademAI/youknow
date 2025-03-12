import { Loader2 } from "lucide-react";
import React from "react";
import Image from "next/image";

type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md mx-auto flex flex-col items-center gap-4">
        <Loader2 className="animate-spin w-10 h-10 text-white" />
        
        <div className="relative w-full aspect-video">
          <Image
            src="/please_wait.gif"
            alt="waiting_gif"
            fill
            sizes="(max-width: 768px) 100vw, 
                   (max-width: 1200px) 50vw, 
                   33vw"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Spinner;