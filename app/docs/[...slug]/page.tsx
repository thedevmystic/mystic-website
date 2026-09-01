/* Docs Page */

import fs from 'fs/promises';
import path from 'path';

import { ComponentType } from 'react';

import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import Breadcrumb from '@/components/Breadcrumb';
import Pagination from '@/components/Pagination';
import SidebarDrawer from '@/components/SidebarDrawer';
import TableOfContents from '@/components/TableOfContent';
import { getDrawerContent } from '@/utils/drawer';
import { extractToc } from '@/utils/toc';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

interface MDXModule {
  default: ComponentType;
  frontmatter?: {
    title?: string;
    excerpt?: string;
    breadcrumbs?: string[];
    drawerId?: string;
    prev?: string;
    next?: string;
  };
}

export async function getDocModule(slug?: string[]): Promise<MDXModule> {
  const slugPath = (slug || []).join('/');
  try {
    return (await import(`../../../content/docs/${slugPath}/page.mdx`)) as MDXModule;
  } catch {
    return notFound();
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const docModule = await getDocModule(resolvedParams.slug);
  const frontmatter = docModule.frontmatter;

  return {
    title: `${frontmatter?.title} | Docs | Mystic Framework` || 'Docs | Mystic Framework',
    description: frontmatter?.excerpt || 'Read this documentation on Mystic Framework.',
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
  } catch {
    notFound();
  }

  const DocModule = await getDocModule(slug);
  const Content = DocModule.default;
  const toc = extractToc(source);
  const breadcrumbs = DocModule.frontmatter?.breadcrumbs;
  const drawerContent = await getDrawerContent(slug);
  const drawerId = DocModule.frontmatter?.drawerId;
  const prev = DocModule.frontmatter?.prev;
  const next = DocModule.frontmatter?.next;

  // Hide other columns until 236px + 768px + 236px = 1240px
  return (
    <div className="grid grid-cols-1 min-[1240px]:grid-cols-[236px_768px_236px] justify-center gap-8">
      {/* Left Sidebar Spacer */}
      <aside className="hidden min-[1240px]:block w-[236px] shrink-0 sticky top-20 self-start">
        <SidebarDrawer items={drawerContent} currentId={drawerId} />
      </aside>

      {/* Main Column (Breadcrumbs + Content) */}
      <div className="w-full max-w-[768px] md:border-l md:border-r border-outline-variant justify-self-center pt-[50px]">
        <Breadcrumb titles={breadcrumbs} />
        <article
          id="main-content"
          className="px-4 py-8 md:px-6 md:py-12 outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
        >
          <Content />
        </article>
        <Pagination prev={prev} next={next} />
      </div>

      {/* Table of Contents */}
      <aside className="hidden min-[1240px]:block w-[236px] shrink-0 sticky top-20 self-start">
        <TableOfContents toc={toc} />
      </aside>
    </div>
  );
}
