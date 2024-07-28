import { fetchPostById, fetchPostTags } from '@/app/lib/data';
import PostEditForm from '@/app/ui/posts/edit/post-edit-form';
import { GetLocaleFromLang } from '@/app/lib/constants';

export default async function Page({ params }: { params: { lang:string, id: string } }) {
  const locale = GetLocaleFromLang(params.lang);
  const id = params.id;
  const posts = await Promise.all(
    [
      fetchPostById(id, 'en'),
      fetchPostById(id, 'ja'),
      fetchPostById(id, 'kr'),
      fetchPostById(id, 'hk'),
    ]
  );

  const allPostTags: string[] = await fetchPostTags();
  
  // TODO: not found
  return (
    <main>
      <div className="flex min-h-screen flex-col">
        <div className="relative mt-6 flex justify-center md:flex-row">
          <div className="flex w-full max-w-[1700px] basis-full rounded-xl bg-white px-12 pb-8 pt-8 shadow-0550">
            <div className="flex w-full flex-col">
              <h1 className="mb-6 mt-2 flex text-28px font-semibold leading-normal">
                Edit
              </h1>
              <PostEditForm locale={locale} posts={posts} allPostTags={allPostTags} isNewPost={false}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
