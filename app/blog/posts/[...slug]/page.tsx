/* Blog Page */

import { ComponentType } from 'react';

import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import Pagination from '@/components/Pagination';

import { blogMDXComponents } from './blogMdxComponents';

import type { MDXComponents } from 'mdx/types';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

interface MDXModule {
  default: ComponentType<{ components?: MDXComponents }>;
  frontmatter?: {
    title?: string;
    excerpt?: string;
    prev?: string;
    next?: string;
  };
}

export async function getBlogModule(slug?: string[]): Promise<MDXModule> {
  const slugPath = (slug || []).join('/');
  try {
    return (await import(`../../../../content/blog/${slugPath}/page.mdx`)) as MDXModule;
  } catch {
    return notFound();
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const blogModule = await getBlogModule(resolvedParams.slug);
  const frontmatter = blogModule.frontmatter;

  return {
    title: `${frontmatter?.title} | Blog | Mystic Framework` || 'Blog Post | Mystic Framework',
    description: frontmatter?.excerpt || 'Read this blog post on Mystic Framework.',
  };
}

export default async function BlogPage({ params }: PageProps) {
  const resolvedParams = await params;
  const BlogModule = await getBlogModule(resolvedParams.slug);
  const Content = BlogModule.default;
  const prev = BlogModule.frontmatter?.prev;
  const next = BlogModule.frontmatter?.next;

  return (
    <div id="main-content" className="overflow-hidden pt-8 min-h-screen">
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
