import { fetchPostById } from '@/app/lib/data';
import PostContainer from '@/app/ui/posts/post-container';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const postResults = await Promise.all([fetchPostById(id, 'en')]);
  const post = postResults[0];

  // TODO: not found
  return (
    <main>
      <PostContainer>
        <p> Edit </p>
      </PostContainer>
    </main>
  );
}
