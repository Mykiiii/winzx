import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Winzx',
  description: 'Turn your expertise into income',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
