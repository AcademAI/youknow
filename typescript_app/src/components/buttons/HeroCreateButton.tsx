"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HeroCreateButton = () => {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => {
        router.push("/create");
      }}
    >
      Создать курс
      <BadgePlus className="animate-ping h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};

export default HeroCreateButton;
