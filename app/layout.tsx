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
  title: 'The Mystic Framework - Under Development',
  description: 'Under development.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-on-background transition-colors duration-300 antialiased">
        <ThemeProvider>
          <Cursor />
          <NextTopLoader color="var(--color-primary)" height={2} showSpinner={false} />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
