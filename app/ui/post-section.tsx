import { lusitana, sniglet } from '@/app/ui/fonts';
import { PagePath } from '@/app/ui/page-path';

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
      <PagePath />
      {children}
    </div>
  );
}
