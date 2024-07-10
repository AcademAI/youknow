"use client";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const SearchButton = () => {
  const router = useRouter();
  return (
    <Button
      type="button"
      className="sm:hidden flex mr-3"
      variant="outline"
      size="icon"
    >
      <Search />
    </Button>
  );
};

export default SearchButton;
