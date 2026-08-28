/* Home Page */

'use client';

import { useRouter } from 'next/navigation';

import { ChevronsDown } from 'lucide-react';

import Button from '@/components/Button';

import HomepageAnimation from '@/components/HomepageAnimation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <HomepageAnimation />
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden text-center py-6 z-10">
        <div className="font-mono text-sm tracking-wide uppercase text-primary opacity-0 animate-[riseIn_0.8s_ease_forwards] [animation-delay:0.15s] mb-4">
          Zero-Overhead C++ Framework
        </div>
        <h1 className="flex flex-row items-center gap-x-2 font-serif font-semibold text-4xl leading-tight tracking-tight">
          <span className="inline-block opacity-0 animate-[riseIn_0.9s_cubic-bezier(0.2,0.7,0.3,1)_forwards] blur-[6px] [animation-delay:0.35s]">
            Performant.
          </span>
          <span className="inline-block opacity-0 animate-[riseIn_0.9s_cubic-bezier(0.2,0.7,0.3,1)_forwards] blur-[6px] [animation-delay:0.6s]">
            Elegant.
          </span>
          <span className="inline-block italic text-on-surface-variant opacity-0 animate-[riseIn_0.9s_cubic-bezier(0.2,0.7,0.3,1)_forwards] blur-[6px] [animation-delay:0.85s]">
            Simply Mystic.
          </span>
        </h1>
        <div className="mt-6 text-md text-on-surface-variant opacity-0 animate-[riseIn_0.9s_cubic-bezier(0.2,0.7,0.3,1)_forwards] blur-[6px] [animation-delay:1.1s] w-full max-w-xl mx-auto">
          When performance meets elegance, the results are always mystical. <br /> A modern C++
          framework built for speed and clarity.
        </div>
        <div className="mt-8 flex flex-row justify-center gap-x-4 opacity-0 animate-[riseIn_0.8s_ease_forwards] [animation-delay:1.3s]">
          <Button
            variant="primary"
            className="!rounded-lg"
            onClick={() => router.push('/docs/getting-started')}
          >
            Get Started
          </Button>
          <Button variant="secondary" className="!rounded-lg" onClick={() => router.push('/docs')}>
            Documentation
          </Button>
        </div>
        <div className="absolute inset-x-0 bottom-[34px] z-10">
          <div className="w-max mx-auto opacity-0 animate-[riseIn_0.8s_ease_forwards] [animation-delay:1.6s]">
            <div className="flex flex-col items-center justiy-center gap-y-2 text-xs text-on-surface-variant font-mono tracking-wide uppercase animate-[bob_2.4s_ease-in-out_infinite]">
              Scroll
              <ChevronsDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
