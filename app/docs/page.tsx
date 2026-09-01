/* Docs Main Page */

import { notFound } from 'next/navigation';
import { ComponentType } from 'react';
import type { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import Pagination from '@/components/Pagination';
import Breadcrumb from '@/components/Breadcrumb';
import TableOfContents from '@/components/TableOfContent';
import SidebarDrawer from '@/components/SidebarDrawer';
import { extractToc } from '@/utils/toc';
import { getDrawerContent } from '@/utils/drawer';

interface MDXModule {
  default: ComponentType;
  frontmatter?: {
    breadcrumbs?: string[];
    drawerId?: string;
    prev?: string;
    next?: string;
  };
}

export const metadata: Metadata = {
  title: 'Docs | Mystic Framework',
  description: 'Documentation for Mystic Framework',
};

export default async function DocPage() {
  const filePath = path.join(process.cwd(), 'content', 'docs', 'page.mdx');
  let source: string = '';
  try {
    source = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    notFound();
  }

  let DocModule: MDXModule;
  try {
    DocModule = (await import(`../../content/docs/page.mdx`)) as MDXModule;
  } catch (error) {
    notFound();
  }

  const Content = DocModule.default;
  const toc = extractToc(source);
  const breadcrumbs = DocModule.frontmatter?.breadcrumbs;
  const drawerContent = await getDrawerContent([]);
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
