import Sky from './ui/sky';
import PostSection from './ui/post-section';

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
      <Sky />
      <PostSection searchParams={searchParams}/>
    </main>
  );
}
