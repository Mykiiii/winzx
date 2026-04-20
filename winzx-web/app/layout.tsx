import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Winzx',
  description: 'Turn your expertise into income',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
