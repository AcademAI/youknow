"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { List } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HeroFeedButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/feed")}
      type="button"
      variant="outline"
    >
      Лента курсов
      <List className="ml-2 h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};

export default HeroFeedButton;
