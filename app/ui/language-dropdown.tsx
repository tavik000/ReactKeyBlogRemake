"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobeAltIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export interface LanguageItem {
  title: string;
  lang?: string;
  isCurrentLocale?: boolean;
  children?: LanguageItem[];
}

interface Props {
  item: LanguageItem;
  isHidden?: boolean;
}

export default function LanguageDropdown(props: Props) {
  const { item, isHidden } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const languageItems = item?.children ? item.children : [];
  const pathname = usePathname();
  const pathWithoutLocale = pathname.split("/").slice(2).join("/");

  const toggle = () => {
    setIsOpen((old) => !old);
  };

  const transClass = isOpen && !isHidden ? "flex" : "hidden";

  return (
    <>
      <div className="relative">
        <button
          className="group flex items-center hover:text-orange-500"
          onClick={toggle}
        >
          <GlobeAltIcon className="h-6 w-6 text-gray-500 group-hover:text-orange-500" />
          <div className="ml-2 xs:hidden md:block">{item.title}</div>
          <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500 group-hover:text-orange-500 xs:hidden md:block" />
        </button>
        <div
          className={`absolute -inset-x-5 inset-y-10 z-30 flex min-h-[210px] flex-col rounded-md bg-white py-4 shadow-lg ${transClass} xs:w-32 xs:-translate-x-6 md:w-40 md:translate-x-0 dark:bg-zinc-800`}
        >
          {languageItems.map((item) =>
            item.isCurrentLocale ? (
              <div
                key={`${item.title}-${item.lang}`}
                className="justify-left flex items-center rounded-sm px-6 py-1 text-gray-900 dark:text-white"
              >
                {item.title}
                <GlobeAltIcon className="w-6, ml-6 h-6 text-gray-500" />
              </div>
            ) : (
              <Link
                key={`${item.title}-${item.lang}`}
                className="justify-left flex items-center rounded-sm px-6 py-1 hover:bg-zinc-300 hover:text-zinc-500 dark:hover:bg-zinc-700"
                href={{
                  pathname: `/${item.lang}/${pathWithoutLocale}`,
                }}
                onClick={toggle}
              >
                <p className="text-gray-900 dark:text-white">{item.title}</p>
              </Link>
            ),
          )}
        </div>
      </div>
      {isOpen ? (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-20 cursor-pointer"
          onClick={toggle}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
}
