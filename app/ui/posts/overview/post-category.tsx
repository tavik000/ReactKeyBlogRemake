import { DictStructure } from '@/app/components/localization/dict-store';
import { GetLangFromLocale } from '@/app/lib/constants';
import { fetchPostTags } from '@/app/lib/data';
import Link from 'next/link';

export default async function PostCategory({
  locale,
  dict,
}: {
  locale: string;
  dict: DictStructure;
}) {
  const postTags: string[] = await fetchPostTags();
  const third = Math.ceil(postTags.length / 3);
  const firstPart = postTags.slice(0, third - 1);
  const secondPart = postTags.slice(third - 1, third * 2 - 1);
  const thirdPart = postTags.slice(third * 2 - 1);

  return (
    <div className="category mt-6 flex md:flex-row">
      <div className="flex w-10/12 max-w-1140px basis-2/3 rounded-xl bg-white px-12 pb-8 pt-8 shadow-0550">
        <div className="flex flex-col">
          <p className="flex pb-4 text-xl tracking-widest">{dict.category}</p>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <ul className="w-80">
                <PostTag locale={locale} tag="All" />
                {firstPart.map((tag) => (
                  <PostTag key={tag} locale={locale} tag={tag} />
                ))}
              </ul>
              <ul className="w-80">
                {secondPart.map((tag) => (
                  <PostTag key={tag} locale={locale} tag={tag} />
                ))}
              </ul>
              <ul className="w-80">
                {thirdPart.map((tag) => (
                  <PostTag key={tag} locale={locale} tag={tag} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PostTag = ({ locale, tag }: { locale: string; tag: string }) => {
  const lang = GetLangFromLocale(locale);
  const url = `/${lang}/`;

  return (
    <li>
      <Link href={url} className="text-sm hover:text-orange-500">
        {tag}
      </Link>
    </li>
  );
};
