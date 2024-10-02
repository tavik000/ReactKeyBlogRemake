import { GetLocaleFromLang, keyEmail, keyTwitterId } from "@/app/lib/constants";
import { fetchPostById } from "@/app/lib/data";
import { sniglet } from "@/app/ui/fonts";
import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface Props {
  params: {
    lang: string;
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Image({ params }: Props) {
    const interSemiBold = fetch(new URL("./Inter_24pt-SemiBold.ttf", import.meta.url)).then((res) =>
      res.arrayBuffer(),
    );

  const postId = params.id;
  const locale = GetLocaleFromLang(params.lang);

  const post = await fetchPostById(postId, locale);
  let postTitle;
  if (!post) {
    postTitle = "Post not found";
  } else {
    postTitle = post.title;
  }

  return new ImageResponse(
    (
        <div
        className="flex flex-col items-center justify-center w-full h-full bg-white border-t-8 border-b-8 border-orange-500 relative"
        style={{ fontSize: 64 }}
      >
        <div className="mx-14 flex-1 flex items-center">{postTitle}</div>
        <p className="mx-14 absolute bottom-2">@{keyTwitterId}</p>
        <p className={`${sniglet.className} absolute bottom-0 right-0 mb-10 mr-10 text-3xl font-extrabold text-orange-500`}>
          Key Blog
        </p>
      </div>
    ),
    {
      ...size,
        fonts: [
          {
            name: "Inter",
            data: await interSemiBold,

            weight: 400,
          },
        ],
    },
  );
}
