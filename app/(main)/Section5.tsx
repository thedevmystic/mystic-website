/* Section 5: Get Started */

'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/Button';

export default function Section5() {
  const router = useRouter();

  return (
    <section className="relative z-0 bg-surface py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-y-6">
        <div className="flex flex-col items-center gap-y-2">
          <div className="font-mono text-sm tracking-wide uppercase text-primary">Get Involved</div>
          <h2 className="text-2xl md:text-3xl font-semibold text-on-surface">Start Building!</h2>
          <p className="text-sm text-on-surface-variant max-w-xl leading-relaxed">
            Explore the docs, follow module progress on the blog, or jump straight into your first
            project.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Button
            variant="primary"
            className="!rounded-lg"
            onClick={() => router.push('/docs/getting-started')}
          >
            Get Started
          </Button>
          <Button variant="secondary" className="!rounded-lg" onClick={() => router.push('/docs')}>
            Read Docs
          </Button>
          <Button variant="secondary" className="!rounded-lg" onClick={() => router.push('/blog')}>
            Behind the Scenes
          </Button>
        </div>
      </div>
    </section>
  );
}
