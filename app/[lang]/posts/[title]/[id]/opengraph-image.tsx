import { GetLocaleFromLang, keyEmail, keyTwitterId } from "@/app/lib/constants";
import { fetchPostById } from "@/app/lib/data";
import { Bear } from "@/app/ui/bear";
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
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: "16px solid #ffbd15",
          borderTop: "16px solid #ffbd15",
          backgroundColor: "white",
          padding: "24px 48px 48px 48px",
          fontSize: "64px",
        }}
      >
        <p
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            lineHeight: "2.5rem",
            letterSpacing: "-0.025em", // tracking-tight
            color: "#ffbd15",
            textAlign: "left", // Align text to the left
            marginBottom: "12px",
          }}
        >
          Key Blog
        </p>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            fontSize: "4rem", 
            fontWeight: 600,
            letterSpacing: "-0.025em", // tracking-tight
            marginBottom: "24px",
          }}
        >
          {postTitle}
        </div>
        <footer
          style={{
            fontSize: "2rem",
            fontWeight: 500, // font-medium
            color: "#6b7280", // text-gray-500
            textAlign: "left",
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
