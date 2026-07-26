import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.reactkeyblog.com"),
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
