import { GetLocaleFromLang } from '@/app/lib/constants';
import { Metadata } from 'next';
import PostViewWrapper from '@/app/ui/posts/view/post-view-wrapper';
import { Suspense } from 'react';
import PostViewWrapperSkeleton from '@/app/ui/posts/view/post-view-wrapper-skeleton';


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

  // TODO: post not found

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
