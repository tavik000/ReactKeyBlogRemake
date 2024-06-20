export default function PostTag({children}: {children: React.ReactNode}) {
  return (
    <span className="static mb-5px ml-5px inline-block w-auto rounded-md bg-orange-500 px-1em text-center text-sm font-normal text-white">
      {children}
    </span>
  );
}
