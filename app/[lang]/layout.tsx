import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Sky from '@/app/ui/sky';
import PostSection from '@/app/ui/posts/general/post-section';
import { getDictionary } from '@/app/components/localization/dictionaries';
import { DictStructure } from '@/app/components/localization/dict-store';
import { GetLocaleFromLang } from '@/app/lib/constants';
import { auth } from '@/auth';
import { NextUIProviderWrapper } from '@/app/components/NextUI/next-ui-providers-wrapper';
import { LoginOpenFromPostProvider } from '@/app/components/context/login-open-from-post-provider';
import { LocaleProvider } from '@/app/components/context/locale-provider';
import { SessionProvider } from '@/app/components/context/session-provider';
import LoginSuccessfulBanner from '@/app/ui/login-successful-banner';
import { fetchAllNotificationByTargetUserName } from '../lib/data';
import { NotificationProvider } from '@/app/components/context/notification-provider';
import { Notification } from '@/app/lib/definitions';

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
  let notifications: Notification[] = [];
  if (session?.user) {
    notifications = session?.user?.name ? (await fetchAllNotificationByTargetUserName(session.user.name) as unknown as Notification[]) : [];
  }



  return (
    <html lang={lang}>
      <body className={`${inter.className} antialiased w-full`}>
        <div id="body-wrapper" className="overflow-hidden relative">
          <NextUIProviderWrapper>
            <LoginOpenFromPostProvider>
              <LocaleProvider inLocale={locale} inLang={lang} inDict={dict}>
                <SessionProvider inSession={session || null}>
                  <NotificationProvider inNotifications={notifications || []}>
                    <LoginSuccessfulBanner />
                    <Sky />
                    <PostSection>
                      {children}
                    </PostSection>
                  </NotificationProvider>
                </SessionProvider>
              </LocaleProvider>
            </LoginOpenFromPostProvider>
          </NextUIProviderWrapper>
        </div>
      </body>
    </html>
  );
}
