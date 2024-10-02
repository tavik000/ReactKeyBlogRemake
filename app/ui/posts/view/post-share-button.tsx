"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpOnSquareIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useLocaleContext } from "@/app/components/context/locale-provider";
import { useState } from "react";

export function PostShareButton() {
  const { dict } = useLocaleContext();
  const [showPopup, setShowPopup] = useState(false);

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(window.location.toString());

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <span>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className="px-0.5 py-2">
            <ArrowUpOnSquareIcon className="h-6 w-6" color="#6b6b6b" title="Share" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="p-4 shadow-lg">
          <DropdownMenuItem asChild key="copy-link" className="h-10 hover:bg-gray-200">
            <button
              className="flex flex-row items-center hover:cursor-pointer"
              onClick={copyToClipboard}
            >
              <LinkIcon className="h-6 w-6" color="#6b6b6b" title="Copy link" />
              <p className="ml-4 font-medium text-gray-500">{dict.post.copyLink}</p>
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild key="share-twitter" className="h-10 hover:bg-gray-200">
            <div className="flex flex-row items-center hover:cursor-pointer">
              <span className="flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-twitter-x flex h-full w-full items-center justify-center pt-1 text-gray-500"
                  viewBox="0 0 22 22"
                >
                  <path
                    className="flex items-center justify-center align-middle"
                    d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
                  />
                </svg>
              </span>
              <p className="ml-4 font-medium text-gray-500">{dict.post.shareToTwitter}</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showPopup && (
        <div className="fixed left-1/2 top-16 -translate-x-1/2 transform justify-center rounded bg-gray-800 px-4 py-2 text-white">
          Link copied
        </div>
      )}
    </span>
  );
}
