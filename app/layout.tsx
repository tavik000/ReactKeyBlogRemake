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
