import { keyTwitterId } from '@/app/lib/constants';
import { Metadata } from 'next';
import { fetchPostById } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'post',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const postResults = (await Promise.all([fetchPostById(id, 'en')]));
  const post = postResults[0];



  // TODO: not found

  return (
    <main>
      <div className="flex min-h-screen flex-col">
        <div className="relative mt-6 flex justify-center md:flex-row">
          <div className="flex w-10/12 max-w-1140px basis-2/3 rounded-xl bg-white px-12 pb-8 pt-8 shadow-0550">
            <div className="flex flex-col">
              @{keyTwitterId}()
              <p className="flex pb-4 text-xl tracking-widest">{post.title}</p>
              <div className="flex flex-col"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
