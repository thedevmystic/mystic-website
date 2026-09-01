/* Blog Page */

import { notFound } from 'next/navigation';
import { ComponentType } from 'react';

import type { MDXComponents } from 'mdx/types';

import Pagination from '@/components/Pagination';

import { blogMDXComponents } from './blog-mdx-components';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

interface MDXModule {
  default: ComponentType<{
    components?: MDXComponents;
  }>;
  frontmatter?: {
    prev?: string;
    next?: string;
  };
}

export default async function BlogPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const slugPath = slug.join('/');

  let BlogModule: MDXModule;
  try {
    BlogModule = (await import(`../../../../content/blog/${slugPath}/page.mdx`)) as MDXModule;
  } catch (error) {
    notFound();
  }

  const Content = BlogModule.default;
  const prev = BlogModule.frontmatter?.prev;
  const next = BlogModule.frontmatter?.next;

  return (
    <div id="main-content" className="overflow-hidden pt-16">
      <section className="bg-surface px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-16">
          <article
            id="main-content"
            className="focus:ring-2 focus:ring-primary focus:ring-offset-0"
          >
            <Content components={blogMDXComponents} />
          </article>
          <Pagination prev={prev} next={next} />
        </div>
      </section>
    </div>
  );
}
