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
        style={{
          position: "relative",
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start", // Align items to the left
          justifyContent: "space-between",
          borderBottom: "16px solid #f97316", // border-orange-500
          borderTop: "16px solid #f97316", // border-orange-500
          backgroundColor: "white",
          padding: "48px",
          fontSize: "64px",
        }}
      >
        <p
          style={{
            fontSize: "8rem",
            fontWeight: "bold",
            lineHeight: "2.5rem", // leading-10
            letterSpacing: "-0.025em", // tracking-tight
            color: "#f97316", // text-orange-500
            textAlign: "left", // Align text to the left
          }}
        >
          Key Blog
        </p>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            fontSize: "6rem", // text-6xl
            fontWeight: 600,
            letterSpacing: "-0.025em", // tracking-tight
          }}
        >
          {postTitle}
        </div>
        <footer
          style={{
            fontSize: "4rem",
            fontWeight: 500, // font-medium
            color: "#d1d5db", // text-gray-300
            textAlign: "left", // Align text to the left
          }}
        >
          @{keyTwitterId}
        </footer>
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
