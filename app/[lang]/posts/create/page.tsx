import { GetLocaleFromLang, keyEmail } from '@/app/lib/constants';
import { fetchPostTags } from '@/app/lib/data';
import PostEditForm from '@/app/ui/posts/edit/post-edit-form';
import { Post } from '@/app/lib/definitions';
import PostContentContainer from '@/app/ui/posts/view/post-content-container';
import { auth } from '@/auth';

export default async function Page({ params }: { params: { lang: string } }) {
  const locale = GetLocaleFromLang(params.lang);
  const emptyPost_en = createEmptyPost();
  const emptyPost_ja = createEmptyPost();
  const emptyPost_kr = createEmptyPost();
  const emptyPost_hk = createEmptyPost();
  const posts = [emptyPost_en, emptyPost_ja, emptyPost_kr, emptyPost_hk];

  const allPostTags: string[] = await fetchPostTags();
  const session = await auth();
  if (!session) {
    return (
      <PostContentContainer>
        <div>Access Denied</div>
      </PostContentContainer>
    );
  }
  if (session) {
    if (session.user?.email !== keyEmail) {
      return (
        <PostContentContainer>
          <div>Access Denied</div>
        </PostContentContainer>
      );
    }
  }
  return (
    <main>
      <div className="flex min-h-screen flex-col">
        <div className="relative mt-6 flex justify-center md:flex-row">
          <div className="flex w-full max-w-[1700px] basis-full rounded-xl bg-white px-12 pb-8 pt-8 shadow-0550">
            <div className="flex w-full flex-col">
              <h1 className="mb-6 mt-2 flex text-28px font-semibold leading-normal">
                Edit
              </h1>
              <PostEditForm
                locale={locale}
                posts={posts}
                allPostTags={allPostTags}
                isNewPost={true}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function createEmptyPost(): Post {
  return {
    id: '',
    title: '',
    thumbnail_img: '',
    tags: [],
    content: '',
    author: '',
    comment_id_list: [],
    create_date: new Date(),
    modify_date: new Date(),
    likes: 0,
  };
}
