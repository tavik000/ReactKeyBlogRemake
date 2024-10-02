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
import { useEffect, useRef, useState } from "react";
import { TwitterShareButton, TwitterIcon } from "next-share";
import { keyTwitterId } from "@/app/lib/constants";

export function PostShareButton({ postTitle }: { postTitle: string }) {
  const { dict } = useLocaleContext();
  const [showPopup, setShowPopup] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.toString());
    }
  }, []);

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(currentUrl);

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
              <LinkIcon className="ml-2 h-6 w-6" color="#6b6b6b" title="Copy link" />
              <p className="ml-4 font-medium text-gray-500">{dict.post.copyLink}</p>
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild key="share-twitter" className="h-10 hover:bg-gray-200">
            <div className="h-full w-full">
              <TwitterShareButton url={currentUrl + " via @" + keyTwitterId} title={postTitle}>
                <div className="flex flex-row items-center hover:cursor-pointer">
                  <TwitterIcon
                    bgStyle={{ fill: "none" }}
                    iconFillColor="#6b6b6b"
                    size={40}
                    className="flex justify-center align-middle"
                  />
                  <p className="ml-4 flex font-medium text-gray-500">{dict.post.shareToTwitter}</p>
                </div>
              </TwitterShareButton>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showPopup && (
        <div className="fixed left-1/2 top-16 z-50 -translate-x-1/2 transform justify-center rounded bg-gray-800 px-4 py-2 text-white">
          {dict.post.linkCopied}
        </div>
      )}
    </span>
  );
}
