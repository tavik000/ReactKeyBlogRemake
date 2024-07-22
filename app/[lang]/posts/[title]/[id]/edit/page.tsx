import { fetchPostById } from '@/app/lib/data';
import PostContentContainer from '@/app/ui/posts/view/post-content-container';
import PostEditForm from '@/app/ui/posts/edit/post-edit-form';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const posts = await Promise.all(
    [
      fetchPostById(id, 'en'),
      fetchPostById(id, 'ja'),
      fetchPostById(id, 'kr'),
      fetchPostById(id, 'hk'),
    ]
  );

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
              <PostEditForm posts={posts} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
