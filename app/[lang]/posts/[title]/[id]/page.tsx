import { GetLocaleFromLang, keyTwitterId } from "@/app/lib/constants";
import type { Metadata, ResolvingMetadata } from "next";
import PostViewWrapper from "@/app/ui/posts/view/post-view-wrapper";
import { Suspense } from "react";
import PostViewWrapperSkeleton from "@/app/ui/posts/view/post-view-wrapper-skeleton";
import { fetchPostById } from "@/app/lib/data";

interface Props {
  params: {
    lang: string;
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const postId = params.id;
  const locale = GetLocaleFromLang(params.lang);

  const post = await fetchPostById(postId, locale);

  if (!post) {
    return {
      title: "Post not found",
      description: "The requested post could not be found.",
    };
  }

  const { title, content, tags } = post;
  const limitedContent = content.split(" ").slice(0, 80).join(" ");
  const keywords = tags.join(", ");

  return {
    title: title,
    description: limitedContent,
    keywords: keywords,
    twitter: {
      card: "summary_large_image",
      site: keyTwitterId,
      title: `${title} - Key Blog`,
      description: limitedContent,
    },
    openGraph: {
      title: `${title} - Key Blog`,
      description: limitedContent,
    },
  };
}

export default function Page({
  params,
}: {
  params: {
    lang: string;
    id: string;
  };
}) {
  const id = params.id;
  const locale = GetLocaleFromLang(params.lang);

  return (
    <main>
      <>
        <Suspense fallback={<PostViewWrapperSkeleton />}>
          <PostViewWrapper postId={id} locale={locale} />
        </Suspense>
      </>
    </main>
  );
}
