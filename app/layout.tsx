/* Layout for the application. */

import type { Metadata } from 'next';
import Cursor from '@/components/Cursor';
import { fonts } from '@/styles/fonts';
import '@/styles/main.css';

export const metadata: Metadata = {
  title: 'The Mystic Framework - Under Development',
  description: 'Under development.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fonts}>
      {/* TODO(thedevmystic): Remove the "dark" class when the dark mode toggle is implemented */}
      <body className="min-h-screen bg-background text-on-background transition-colors duration-300 dark antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
