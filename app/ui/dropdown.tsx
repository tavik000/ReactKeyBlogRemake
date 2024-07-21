import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from './button';
import { GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export interface MenuItem {
  title: string;
  route?: string;
  children?: MenuItem[];
}

interface Props {
  item: MenuItem;
}

export default function Dropdown(props: Props) {
  const { item } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuItems = item?.children ? item.children : [];

  const toggle = () => {
    setIsOpen((old) => !old);
  };

  const transClass = isOpen ? 'flex' : 'hidden';

  return (
    <>
      <div className="relative">
        <button className="flex items-center hover:text-orange-500 group" onClick={toggle}>
          <GlobeAltIcon className="h-6 w-6 text-gray-500 group-hover:text-orange-500"/>
          <div className="ml-2">{item.title}</div>
          <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500 group-hover:text-orange-500"/>
        </button>
        <div
          className={`absolute shadow-lg -inset-x-5 inset-y-10 z-30 flex min-h-[210px] w-40 flex-col rounded-md bg-white py-4 ${transClass}`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.route}
              className="justify-left flex items-center rounded-sm px-6 py-1 hover:bg-zinc-300 hover:text-zinc-500"
              href={item?.route || ''}
              onClick={toggle}
            >
              {item.title}
            </Link>
          ))}
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

function Header() {
  return (
    <header className="flex items-center gap-10 bg-zinc-800 px-2 py-4"></header>
  );
}
