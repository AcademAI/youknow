"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

type Props = {};

const SearchBar = ({ search }: { search?: string }) => {
  const router = useRouter();
  const initialRender = React.useRef(true);

  const [text, setText] = React.useState(search);
  const [query] = useDebounce(text, 750);
  React.useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push(`/`);
    } else {
      router.push(`/?search=${query}`);
    }
  }, [query]);

  return (
    <section className="flex items-center space-x-2 sm:space-x-4">
      <Input
        value={text}
        onChange={(event) => setText(event.target.value)}
        type="text"
        className="text-center w-full sm:w-80"
        placeholder="Введите запрос"
      />
    </section>
  );
};
export default SearchBar;
