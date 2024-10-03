export default function PostContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="relative mt-0 flex justify-center md:flex-row">
        <div className="flex max-w-1140px rounded-xl bg-white pb-8 pt-8 shadow-0550 xs:w-full xs:px-4 md:w-11/12 md:px-12 xl:w-10/12 xl:basis-2/3 dark:bg-zinc-900">
          <div className="flex w-full flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}
