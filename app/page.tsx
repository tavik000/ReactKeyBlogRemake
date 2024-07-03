import Sky from './ui/sky';
import PostSection from './ui/post-section';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <Sky />
      <PostSection />
    </main>
  );
}
