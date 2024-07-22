import PostOverview from '@/app/ui/posts/overview/post-overview';

export default function Page({
  searchParams,
  params
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
  params: { lang: string };
}) {
  const locale = params.lang;
  return (
    <main className="flex min-h-screen flex-col">
      <PostOverview searchParams={searchParams} locale={locale}/>
    </main>
  );
}
