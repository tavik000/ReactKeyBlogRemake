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
  //   const interSemiBold = fetch(new URL("./Inter-SemiBold.ttf", import.meta.url)).then((res) =>
  //     res.arrayBuffer(),
  //   );

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
        style={{
          fontSize: 64,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "10px solid orange",
          borderBottom: "10px solid orange",
          position: "relative",
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>{postTitle}</div>
        <p style={{ position: "absolute", bottom: 10 }}>@{keyTwitterId}</p>
        <p
          className={`blog-title ${sniglet.className} absolute bottom-0 right-0 mb-10 mr-10 text-3xl font-extrabold`}
        >
          Key Blog
        </p>
      </div>
    ),
    {
      ...size,
      //   fonts: [
      //     {
      //       name: "Inter",
      //       data: await interSemiBold,

      //       weight: 400,
      //     },
      //   ],
    },
  );
}
