/* Docs Page */

import { notFound } from 'next/navigation';
import { ComponentType } from 'react';
import fs from 'fs/promises';
import path from 'path';
import Breadcrumb from '@/components/Breadcrumb';
import TableOfContents from '@/components/TableOfContent';
import { extractToc } from '@/utils/toc';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

interface MDXModule {
  default: ComponentType;
  frontmatter?: {
    breadcrumbs?: string[];
  };
}

export default async function DocPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const slugPath = slug.join('/');

  const filePath = path.join(process.cwd(), 'content', 'docs', slugPath, 'page.mdx');

  let source: string = '';
  try {
    source = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    notFound();
  }

  let DocModule: MDXModule;
  try {
    DocModule = (await import(`../../../content/docs/${slugPath}/page.mdx`)) as MDXModule;
  } catch (error) {
    notFound();
  }

  const toc = extractToc(source);
  const Content = DocModule.default;
  const breadcrumbs = DocModule.frontmatter?.breadcrumbs;

  // Hide other columns until 236px + 768px + 236px = 1240px
  return (
    <div className="grid grid-cols-1 min-[1240px]:grid-cols-[236px_768px_236px] justify-center gap-8">
      {/* Left Sidebar Spacer */}
      <aside className="hidden min-[1240px]:block w-[236px] shrink-0 sticky top-24 self-start"></aside>

      {/* Main Column (Breadcrumbs + Content) */}
      <div className="w-full max-w-[768px] md:border-l md:border-r border-outline-variant justify-self-center">
        <Breadcrumb titles={breadcrumbs} />
        <article className="px-4 py-8 md:px-6 md:py-12">
          <Content />
        </article>
      </div>

      {/* Table of Contents */}
      <aside className="hidden min-[1240px]:block w-[236px] shrink-0 sticky top-20 self-start">
        <h2 className="text-xs font-mono text-on-surface-variant mb-2 uppercase">In this page</h2>
        <TableOfContents toc={toc} />
      </aside>
    </div>
  );
}
