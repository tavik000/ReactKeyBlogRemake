export default async function Page({
  params,
}: {
  params: { id: string | undefined };
}) {
  return (
    <main>
      <div className="flex min-h-screen flex-col">
        <div className="relative mt-6 flex justify-center md:flex-row">
          <div className="flex w-10/12 max-w-1140px basis-2/3 rounded-xl bg-white px-12 pb-8 pt-8 shadow-0550">
            <div className="flex flex-col">
              <p className="flex pb-4 text-xl tracking-widest">Post</p>
              <div className="flex flex-col"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
