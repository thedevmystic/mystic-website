/* Docs Page */

import { notFound } from 'next/navigation';
import { ComponentType } from 'react';
import fs from 'fs';
import path from 'path';
import Breadcrumb from '@/components/Breadcrumb';

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

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  let DocModule: MDXModule;
  try {
    DocModule = (await import(`../../../content/docs/${slugPath}/page.mdx`)) as MDXModule;
  } catch (error) {
    notFound();
  }

  const Content = DocModule.default;
  const breadcrumbs = DocModule.frontmatter?.breadcrumbs;

  return (
    <>
      <div className="mx-auto max-w-3xl border-l border-r border-outline-variant">
        <Breadcrumb titles={breadcrumbs} />
      </div>
      <div className="mx-auto max-w-3xl px-6 py-8 border-l border-r border-outline-variant">
        <article>
          <Content />
        </article>
      </div>
    </>
  );
}
