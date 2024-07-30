import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Sky from '@/app/ui/sky';
import PostSection from '@/app/ui/posts/general/post-section';
import { getDictionary } from '@/app/components/localization/dictionaries';
import { DictStructure } from '@/app/components/localization/dict-store';
import { GetLocaleFromLang } from '@/app/lib/constants';
import { NextUIProvider } from '@nextui-org/react';
import { auth } from '@/auth';

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang;
  const locale = GetLocaleFromLang(lang);
  const dict = (await getDictionary(locale)) as DictStructure;
  const session = await auth();

  return (
    <html lang={lang}>
      <body className={`${inter.className} antialiased`}>
        <NextUIProvider>
          <Sky locale={locale} dict={dict} session={session || undefined} />
          <PostSection locale={locale} dict={dict}>
            {children}
          </PostSection>
        </NextUIProvider>
      </body>
    </html>
  );
}
