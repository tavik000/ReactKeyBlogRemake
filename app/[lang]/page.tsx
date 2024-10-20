import PostOverview from "@/app/ui/posts/overview/post-overview";
import { GetLocaleFromLang } from "@/app/lib/constants";
import { Suspense } from "react";
import PostOverviewSkeleton from "@/app/ui/posts/overview/post-overview-skeleton";
import { Analytics } from "@vercel/analytics/react";

export default function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
  params: { lang: string };
}) {
  const lang = params.lang;
  const locale = GetLocaleFromLang(lang);

  return (
    <main className="light flex min-h-screen flex-col text-foreground">
      <Suspense fallback={<PostOverviewSkeleton />}>
        <PostOverview searchParams={searchParams} locale={locale} />
      </Suspense>
      <Analytics />
    </main>
  );
}
