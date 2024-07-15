import PostOverview from './ui/posts/post-overview';

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <PostOverview searchParams={searchParams} />
    </main>
  );
}
