'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from './button';
import { GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export interface LanguageItem {
  title: string;
  locale?: string;
  isCurrentLocale?: boolean;
  children?: LanguageItem[];
}

interface Props {
  item: LanguageItem;
}

export default function Dropdown(props: Props) {
  const { item } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const languageItems = item?.children ? item.children : [];
  const pathname = usePathname();
  const pathWithoutLocale = pathname.split('/').slice(2).join('/');

  const toggle = () => {
    setIsOpen((old) => !old);
  };

  const transClass = isOpen ? 'flex' : 'hidden';

  return (
    <>
      <div className="relative">
        <button
          className="group flex items-center hover:text-orange-500"
          onClick={toggle}
        >
          <GlobeAltIcon className="h-6 w-6 text-gray-500 group-hover:text-orange-500" />
          <div className="ml-2">{item.title}</div>
          <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500 group-hover:text-orange-500" />
        </button>
        <div
          className={`absolute -inset-x-5 inset-y-10 z-30 flex min-h-[210px] w-40 flex-col rounded-md bg-white py-4 shadow-lg ${transClass}`}
        >
          {languageItems.map((item) =>
            item.isCurrentLocale ? (
              <div
                key={`${item.title}-${item.locale}`}
                className="justify-left flex items-center rounded-sm px-6 py-1"
              >
                {item.title}
                <GlobeAltIcon className="w-6, ml-6 h-6 text-gray-500" />
              </div>
            ) : (
              <Link
                key={`${item.title}-${item.locale}`}
                className="justify-left flex items-center rounded-sm px-6 py-1 hover:bg-zinc-300 hover:text-zinc-500"
                href={{
                  pathname: `/${item.locale}/${pathWithoutLocale}`,
                }}
                onClick={toggle}
              >
                {item.title}
              </Link>
            ),
          )}
        </div>
      </div>
      {isOpen ? (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-20 "
          onClick={toggle}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
}
