"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";

const YandexSignInButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <Button
      className="w-full"
      onClick={() => signIn("yandex", { callbackUrl: callbackUrl })}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-icon="yandex"
        className="mr-8 w-5"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="#DF251F"
          d="M6.99,7.552c0,3.595,1.433,5.541,3.581,6.614L6,24h3.033l4.162-9.197h2.181V24H18V0h-3.919C10.229,0,6.985,2.518,6.99,7.552z M15.375,12.652h-1.4c-2.286,0-4.162-1.242-4.162-5.1c0-3.994,2.048-5.372,4.162-5.372h1.4V12.652z"
        ></path>
      </svg>
      Продолжить через Yandex
    </Button>
  );
};

export default YandexSignInButton;
