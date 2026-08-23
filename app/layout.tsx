/* Layout for the application. */

import type { Metadata } from 'next';

import NextTopLoader from 'nextjs-toploader';

import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { fonts } from '@/styles/fonts';
import { ThemeProvider } from '@/styles/ThemeProvider';
import '@/styles/main.css';

export const metadata: Metadata = {
  title: 'The Mystic Framework',
  description:
    'Performant. Elegant. Simply Mystic. A modern C++ framework built for speed and clarity.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-surface text-on-surface transition-colors duration-300 antialiased">
        <ThemeProvider>
          <Cursor />
          <NextTopLoader color="var(--color-primary)" height={2} showSpinner={false} />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
