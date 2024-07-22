import PostOverview from '@/app/ui/posts/overview/post-overview';

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
  let locale = params.lang;
  if (locale === 'zh-HK') {
    locale = 'hk';
  }
  return (
    <main className="flex min-h-screen flex-col">
      <PostOverview searchParams={searchParams} locale={locale} />
    </main>
  );
}
