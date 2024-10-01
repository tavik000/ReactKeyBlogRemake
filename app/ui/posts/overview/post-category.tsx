import { DictStructure } from "@/app/components/localization/dict-store";
import { getDictionary } from "@/app/components/localization/dictionaries";
import { fetchPostTags } from "@/app/lib/data";
import { PostTagItem } from "@/app/ui/posts/general/post-tag";

export default async function PostCategory({ locale }: { locale: string }) {

    const dict = (await getDictionary(locale)) as DictStructure;

    const postTags: string[] = await fetchPostTags();
    const third = Math.ceil(postTags.length / 3);
    const firstPart = postTags.slice(0, third - 1);
    const secondPart = postTags.slice(third - 1, third * 2 - 1);
    const thirdPart = postTags.slice(third * 2 - 1);

    return (
        <div className="category mt-6 flex md:flex-row">
            <div className="flex w-10/12 max-w-1140px basis-2/3 rounded-xl bg-white px-12 pb-8 pt-8 shadow-0550">
                <div className="flex flex-col">
                    <p className="flex pb-4 text-xl tracking-widest">
                        {dict.category}
                    </p>
                    <div className="flex flex-col">
                        <div className="flex xs:flex-col md:flex-row">
                            <ul className="w-80">
                                <PostTagItem tag="All" isLabel={false} />
                                {firstPart.map((tag) => (
                                    <PostTagItem
                                        key={tag}
                                        tag={tag}
                                        isLabel={false}
                                    />
                                ))}
                            </ul>
                            <ul className="w-80">
                                {secondPart.map((tag) => (
                                    <PostTagItem
                                        key={tag}
                                        tag={tag}
                                        isLabel={false}
                                    />
                                ))}
                            </ul>
                            <ul className="w-80">
                                {thirdPart.map((tag) => (
                                    <PostTagItem
                                        key={tag}
                                        tag={tag}
                                        isLabel={false}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
