"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => {
        signIn();
      }}
    >
      Войти
    </Button>
  );
};

export default SignInButton;
