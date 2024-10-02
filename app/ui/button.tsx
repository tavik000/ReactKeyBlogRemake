import clsx from "clsx";
import Link from "next/link";
import { TagIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import LanguageDropdown, { LanguageItem } from "./language-dropdown";
import { useLocaleContext } from "../components/context/locale-provider";
import { GetLanguageName } from "../lib/constants";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center justify-center rounded-lg px-4 text-center text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function RoundButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "round-button relative z-auto m-5 w-full max-w-md items-center overflow-hidden rounded-3xl text-lg font-bold text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className,
      )}
    >
      <span className="button-span relative z-10 block rounded-3xl pb-2 shadow-02 before:absolute before:left-0 before:top-0 before:h-1/2 before:w-full before:bg-white before:bg-opacity-10 hover:bg-blue-400 hover:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
        {children}
      </span>
    </button>
  );
}

export function LanguageButton({ isHidden }: { isHidden: boolean }) {
  const { lang, locale } = useLocaleContext();

  const languageItems: LanguageItem = {
    title: GetLanguageName(locale),
    lang: lang,
    isCurrentLocale: true,
    children: [
      {
        title: "English",
        lang: "en",
        isCurrentLocale: locale === "en",
      },
      {
        title: "日本語",
        lang: "ja",
        isCurrentLocale: locale === "ja",
      },
      {
        title: "한국어",
        lang: "kr",
        isCurrentLocale: locale === "kr",
      },
      {
        title: "繁體中文",
        lang: "zh-HK",
        isCurrentLocale: locale === "hk",
      },
    ],
  };
  return (
    <>
      <div className="flex items-center gap-8 text-nowrap text-black xs:mr-3 md:mr-8">
        <LanguageDropdown item={languageItems} isHidden={isHidden} />
      </div>
    </>
  );
}

export function CreatePostButton() {
  const { lang } = useLocaleContext();

  return (
    <Link
      className="my-2 mr-4 flex h-10 w-10 items-center justify-center rounded-md"
      href={{
        pathname: `/${lang}/posts/create`,
      }}
    >
      <PencilSquareIcon className="h-6 w-6 text-gray-500 hover:text-orange-500" />
    </Link>
  );
}

export function TagButton({ href }: { href: string }) {
  return (
    <Link className="my-2 mr-6 flex h-10 w-10 items-center justify-center rounded-md" href={href}>
      <TagIcon className="h-6 w-6 text-gray-500 hover:text-orange-500" />
    </Link>
  );
}
