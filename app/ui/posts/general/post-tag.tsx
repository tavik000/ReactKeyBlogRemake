'use client';
import { useLocaleContext } from '@/app/components/context/locale-provider';
import { useRouter, useSearchParams } from 'next/navigation';

export const PostTagItem = ({
  tag,
  isLabel,
  isClickable = true,
  className,
}: {
  tag: string;
  isLabel: boolean;
  isClickable?: boolean;
  className?: string;
}) => {

  const { lang } = useLocaleContext();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (tag === 'All') {
      params.delete('tag');
      params.delete('page');
      params.delete('query');
      replace(`/${lang}/`);
      return;
    }

    if (tag) {
      params.delete('query');
      params.delete('page');
      params.set('tag', tag);
    } else {
      console.error('Tag is empty');
    }
    replace(`/${lang}/?${params.toString()}`);
  };

  return (
    <>
      {isLabel ? (
        <>
          {isClickable ? (
            <button
              onClick={() => {
                handleTag(tag);
              }}
              className={`hover:scale-105 ${className}`}
            >
              <span className="static mb-5px ml-5px inline-block w-auto rounded-sm bg-orange-500 px-1em text-center text-13px/[1.5] font-normal text-white">
                {tag}
              </span>
            </button>
          ) : (
            <span className={`${className} static mb-5px ml-5px inline-block w-auto rounded-sm bg-orange-500 px-1em text-center text-13px/[1.5] font-normal text-white`}>
              {tag}
            </span>
          )}
        </>
      ) : (
        <li className={`${className}`}>
          <button
            onClick={() => {
              handleTag(tag);
            }}
            className="text-sm hover:text-orange-500"
          >
            {tag}
          </button>
        </li>
      )}
    </>
  );
};
