"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { BadgePlus } from "lucide-react";
import Link from "next/link";

const HeroSignIn = () => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => {
        signIn("", { callbackUrl: "/create" });
      }}
    >
      Создать курс
      <Link className="ml-2" href="/create">
        <BadgePlus className="animate-ping h-[1.2rem] w-[1.2rem]" />
      </Link>
    </Button>
  );
};

export default HeroSignIn;
