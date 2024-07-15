export default function PostContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative mt-6 flex justify-center md:flex-row">
        <div className="flex w-10/12 max-w-1140px basis-2/3 rounded-xl bg-white px-12 pb-8 pt-8 shadow-0550">
          <div className="flex w-full flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}
