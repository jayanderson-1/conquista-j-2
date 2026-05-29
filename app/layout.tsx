import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conquista Já',
  description: 'Conquista Já',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
