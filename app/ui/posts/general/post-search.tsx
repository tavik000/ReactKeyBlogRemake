"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import React, { useEffect, useRef, useState } from "react";
import { useLocaleContext } from "@/app/components/context/locale-provider";

export default function PostSearch({ placeholder }: { placeholder: string }) {
  const { lang } = useLocaleContext();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (term) {
      params.set("query", term);
      params.delete("tag");
    } else {
      params.delete("query");
    }
    replace(`/${lang}/?${params.toString()}`);
  }, 300);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e.currentTarget.value);
    }
  };

  return (
    <div>
      <div className="relative z-auto my-2 ml-6 flex h-10 max-h-16 max-w-sm flex-1 flex-shrink-0 rounded-full py-0.5 xs:hidden md:block">
        <label htmlFor="post-search" className="sr-only">
          Search
        </label>
        <input
          id="post-search"
          className="peer block w-full rounded-md border border-gray-200 bg-gray-100 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      {/* Mobile */}
      <div className="relative z-auto my-2 ml-6 flex h-10 max-h-16 max-w-sm flex-1 flex-shrink-0 rounded-full py-0.5 xs:block md:hidden">
        <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </button>
      </div>
      {isSearchOpen && (
        <div className="fixed left-0 w-full">
          <label htmlFor="post-search" className="sr-only">
            Search
          </label>
          <input
            id="post-search-mobile"
            ref={mobileInputRef}
            className="peer block w-full rounded-md border border-gray-200 bg-gray-100 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder={placeholder}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            defaultValue={searchParams.get("query")?.toString()}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      )}
    </div>
  );
}
