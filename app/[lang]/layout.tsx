import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import Sky from "@/app/ui/sky";
import PostSection from "@/app/ui/posts/general/post-section";
import { getDictionary } from "@/app/components/localization/dictionaries";
import { DictStructure } from "@/app/components/localization/dict-store";
import { GetLocaleFromLang, keyTwitterId } from "@/app/lib/constants";
import { auth } from "@/auth";
import { NextUIProviderWrapper } from "@/app/components/NextUI/next-ui-providers-wrapper";
import { LoginOpenFromPostProvider } from "@/app/components/context/login-open-from-post-provider";
import { LocaleProvider } from "@/app/components/context/locale-provider";
import { SessionProvider } from "@/app/components/context/session-provider";
import LoginSuccessfulBanner from "@/app/ui/login-successful-banner";
import {
  fetchAllNotificationByTargetUserName,
  fetchUser,
  isValidUser,
} from "../lib/data";
import { NotificationProvider } from "@/app/components/context/notification-provider";
import { Notification } from "@/app/lib/definitions";
import { createUser } from "../lib/actions";
import { User } from "../lib/definitions";

export const experimental_ppr = true;

export const metadata: Metadata = {
  metadataBase: new URL("https://react-key-blog-remake.vercel.app/"),
  applicationName: "Key Blog",
  title: {
    template: "%s - Key Blog",
    default: "Key Blog",
  },
  description: "Key Personal Blog for Game Development and Programming",
  openGraph: {
    title: "Key Blog",
    description: "Key Personal Blog for Game Development and Programming",
    images: "/opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    site: keyTwitterId,
    title: "Key Blog",
    description: "Key Personal Blog for Game Development and Programming",
    images: "/opengraph-image.png",
  },
  creator: "Key",
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
  let currentUser: User | null = null;
  if (session?.user) {
    if (session.user.name && session.user.email) {
      const isValid = await isValidUser(session.user.name, session.user.email);
      console.log("isValid", isValid);
      if (!isValid) {
        // TODO theme
        const image = session.user.image || "";
        currentUser = await createUser(
          session.user.name,
          "light",
          session.user.email,
          image,
        );
      } else {
        currentUser = await fetchUser(session.user.name, session.user.email);
      }
    }
    notifications = session?.user?.name
      ? ((await fetchAllNotificationByTargetUserName(
          session.user.name,
        )) as unknown as Notification[])
      : [];
  }

  return (
    <html lang={lang}>
      <body className={`${inter.className} w-full antialiased`}>
        <div id="body-wrapper" className="relative overflow-hidden">
          <NextUIProviderWrapper>
            <LoginOpenFromPostProvider>
              <LocaleProvider inLocale={locale} inLang={lang} inDict={dict}>
                <SessionProvider inSession={session || null} inLocalUser={currentUser}>
                  <NotificationProvider inNotifications={notifications || []}>
                    <LoginSuccessfulBanner />
                    <Sky />
                    <PostSection>{children}</PostSection>
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
