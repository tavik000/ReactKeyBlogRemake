import { DictStructure } from '@/app/components/localization/dict-store';
import { lusitana, sniglet } from '@/app/ui/fonts';
import { PagePath } from '@/app/ui/page-path';

export default function PostSection({
  children,
  dict,
}: {
  children: React.ReactNode;
  dict: DictStructure;
}) {
  return (
    <div className="post-section">
      <div className="divide-line">
        <h1
          id="blog-title"
          className={`blog-title ${sniglet.className} absolute -top-20 ml-10 text-5xl font-extrabold`}
        >
          Key Blog
        </h1>
      </div>
      <span className="bg"></span>
      <PagePath dict={dict} />
      {children}
    </div>
  );
}
