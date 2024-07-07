import { lusitana, sniglet } from '@/app/ui/fonts';
import PostSearch from './post-search';
import { RoundButton } from './button';

export default function PostSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="post-section">
      <div className="divide-line">
        <h1
          className={`blog-title ${sniglet.className} absolute -top-20 ml-10 text-5xl font-extrabold`}
        >
          Key Blog
        </h1>
      </div>
      <span className="bg"></span>
      <div className="options flex flex-row">
        <div className="flex w-1/2 flex-row">
          <PostSearch placeholder="Search posts..." />
        </div>
        <div className="flex w-1/2 flex-row justify-end">
          <RoundButton>Home</RoundButton>
          <RoundButton>Login</RoundButton>
          <RoundButton>EN</RoundButton>
        </div>
      </div>
      {children}
    </div>
  );
}
