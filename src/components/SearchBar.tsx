"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = ({ search }: { search?: string }) => {
  const router = useRouter();
  const initialRender = React.useRef(true);

  const [text, setText] = React.useState(search);

  const handleSearch = () => {
    if (!text) {
      router.push(`/feed`);
    } else {
      router.push(`/feed?search=${text}`);
    }
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
  };

  return (
    <section className="flex">
      <Input
        value={text}
        onChange={(event) => setText(event.target.value)}
        type="text"
        className="text-center w-full sm:w-80"
        placeholder="Введите запрос"
      />
      <Button
        type="button"
        className="flex ml-4"
        variant="outline"
        size="icon"
        onClick={handleSearch}
      >
        <Search className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </section>
  );
};
export default SearchBar;
