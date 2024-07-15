import { fetchPostById } from '@/app/lib/data';
import PostContentContainer from '@/app/ui/posts/view/post-content-container';
import PostEditForm from '@/app/ui/posts/edit/post-edit-form';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const postResults = await Promise.all([fetchPostById(id, 'en')]);
  const post = postResults[0];

  // TODO: not found
  return (
    <main>
      <PostContentContainer>
        <h1 className="mt-2 mb-6 flex text-28px font-semibold leading-normal">
          Edit
        </h1>
        <PostEditForm post={post} />
      </PostContentContainer>
    </main>
  );
}
