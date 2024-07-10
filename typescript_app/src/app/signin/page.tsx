"use client";

import GoogleSignInButton from "@/components/buttons/GoogleSignInButton";
import YandexSignInButton from "@/components/buttons/YandexSignInButton";
import EmailSignInButton from "@/components/buttons/EmailSignInButton";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto py-8 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-3xl">
        Войдите в свой аккаунт
      </h1>

      <div className="sm:rounded-5xl sm:mt-10 mt-4 flex-auto px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:p-24">
        <div className="space-y-2"></div>
        <EmailSignInButton />
        <div className="mx-auto my-10 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          или
        </div>
        <YandexSignInButton />
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default SignInPage;
