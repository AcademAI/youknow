"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        signIn("", { callbackUrl: "/create" });
        ym(96561764, "reachGoal", "signIn");
        return true;
      }}
    >
      Войти
    </Button>
  );
};

export default SignInButton;
