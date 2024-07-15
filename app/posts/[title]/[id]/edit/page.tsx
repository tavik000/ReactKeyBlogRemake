import { fetchPostById } from '@/app/lib/data';
import PostContentContainer from '@/app/ui/posts/view/post-content-container';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const postResults = await Promise.all([fetchPostById(id, 'en')]);
  const post = postResults[0];

  // TODO: not found
  return (
    <main>
      <PostContentContainer>
        <p> Edit </p>
      </PostContentContainer>
    </main>
  );
}
