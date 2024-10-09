"use client";

import { useLocaleContext } from "@/app/components/context/locale-provider";
import PostContentContainer from "@/app/ui/posts/view/post-content-container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { dict } = useLocaleContext();
  return (
    <div>
      <PostContentContainer>
        <div className="flex flex-col">
          <p
            id="post-title"
            className="mt-2 flex justify-center text-lg font-semibold leading-normal"
          >
            {dict.post.postNotFound}
          </p>
        </div>
      </PostContentContainer>
    </div>
  );
}
