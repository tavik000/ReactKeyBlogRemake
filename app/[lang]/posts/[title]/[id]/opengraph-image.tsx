import { GetLocaleFromLang, keyEmail, keyTwitterId } from "@/app/lib/constants";
import { fetchPostById } from "@/app/lib/data";
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
      <section
        className="relative flex h-full w-full flex-col items-center justify-between border-b-8 border-t-8 border-orange-500 bg-white p-12"
        style={{ fontSize: 64 }}
      >
        <p className="text-2xl font-bold leading-10 tracking-tight text-orange-500">Key Blog</p>
        <div className="flex flex-1 items-center text-6xl font-extrabold tracking-tight">
          {postTitle}
        </div>
        <footer className="text-xl font-medium text-gray-300">@{keyTwitterId}</footer>
      </section>
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
