/* Blog Main Page */

import type { Metadata } from 'next';
import BlogViewer from '@/components/BlogViewer';

export const metadata: Metadata = {
  title: 'Blog | Mystic Framework',
  description:
    'The official blog of the Mystic Framework, where I share insights, updates, and stories about my work and the motivation behind it.',
};

export default function BlogPage() {
  return (
    <div id="main-content" className="overflow-hidden pt-16">
      <section className="relative z-0 bg-surface px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-16">
          <div
            className="flex flex-col items-start gap-y-2 rounded-md focus-visible:outline-2 focus-visible:outline-primary"
            tabIndex={0}
          >
            <div className="font-mono text-sm tracking-wide uppercase text-primary">Blog</div>
            <h2 className="text-2xl md:text-3xl font-semibold text-on-surface">
              Behind the Scenes
            </h2>
            <p className="text-md text-on-surface-variant max-w-2xl leading-relaxed">
              Welcome to the blog! Here, I share insights, updates, and stories about the Mystic
              Framework, Stay tuned for posts that provide a deeper look into my work and the
              motivation behind it.
            </p>
          </div>
          <BlogViewer />
        </div>
      </section>
    </div>
  );
}
