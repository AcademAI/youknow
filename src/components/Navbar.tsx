import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <nav className="sticky w-full inset-x-0 top-0 z-[10] h-fit backdrop-blur-md py-2">
      <div className="flex items-center justify-center h-full gap-2 px-8 mx-auto sm:justify-between max-w-7xl">
        <div className="justify-start flex-wrap gap-x-4 gap-y-1">
          <Link href="/" className="items-center gap-2 sm:flex">
            <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl bg-white dark:bg-background font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
              YouKnow
            </p>
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <div className="flex items-center">
            {session?.user && (
              <Button
                type="button"
                className="mr-3"
                variant="outline"
                size="icon"
              >
                <Link href="/create">
                  <BadgePlus className="h-[1.2rem] w-[1.2rem]" />
                </Link>
              </Button>
            )}
            <ThemeToggle className="mr-3" />
            <div className="flex items-center">
              {session?.user ? (
                <UserAccountNav user={session.user} />
              ) : (
                <SignInButton />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
