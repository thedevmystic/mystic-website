/* 404 Error page */

'use client';

import { useRef } from 'react';

import Image from 'next/image';

import Button from '@/components/Button';
import Link from '@/components/Link';

export default function NotFound() {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const handleClick = () => {
    linkRef.current?.click();
    window.dispatchEvent(new CustomEvent('mouse-snap-end'));
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-4xl flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Text block */}
        <div className="order-2 md:order-1 flex-1 text-center md:text-left">
          <h1 className="text-4xl text-on-surface font-semibold mb-4">Oops!</h1>
          <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
            It looks like there is nothing but a sleeping cat here. <br />
            But don&apos;t fret! We&apos;ll get you back.
          </p>

          <Button variant="secondary" onClick={handleClick} className="rounded-md">
            <Link href="/" ref={linkRef} variant="no-underline" noHover>
              Go back to Home
            </Link>
          </Button>
        </div>

        {/* Cat image */}
        <div className="order-1 md:order-2 flex-1 flex justify-center">
          <Image
            src="/404.png"
            alt="A sleeping cat"
            width={1000}
            height={1000}
            className="w-lg md:w-full md:max-w-lg object-contain"
          />
        </div>
      </div>
    </main>
  );
}
