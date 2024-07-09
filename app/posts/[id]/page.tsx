export default async function Page({
  params,
}: {
  params: { id: string | undefined };
}) {
  return (
    <main>
      <div className="flex min-h-screen flex-col">
        <h1>Page</h1>
      </div>
    </main>
  );
}
