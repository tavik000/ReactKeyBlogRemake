import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Sky from './ui/sky';
import PostSection from './ui/post-section';

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = 'en';
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Sky locale={locale}/>
        <PostSection>{children}</PostSection>
      </body>
    </html>
  );
}
