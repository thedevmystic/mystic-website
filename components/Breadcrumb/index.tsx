/* Breadcrumb component */

'use client';

import { ChevronRight } from 'lucide-react';

import Link from '@/components/Link';

interface BreadcrumbItem {
  title: string;
  url?: string;
}

/* Auto generates breadcrumbs */
function generateBreadcrumbs(titles: string[]): BreadcrumbItem[] {
  return titles.map((title, index) => {
    const pathSegments = titles.slice(0, index + 1).map((t) =>
      String(t || '')
        .toLowerCase()
        .replace(/\s+/g, '-'),
    );
    const urlString = String(`/${pathSegments.join('/')}`);
    return {
      title: String(title || ''),
      url: urlString,
    };
  });
}

export default function Breadcrumb({ titles }: { titles: string[] | undefined }) {
  // If there are no titles, don't render the breadcrumb
  if (!titles || titles.length === 0) return null;

  const items = generateBreadcrumbs(titles);

  return (
    <nav
      className="bg-surface h-[30px] sticky top-[50px] z-40 border-b border-l border-r border-outline-variant"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-row items-center px-4 py-1 overflow-x-auto">
        {items.map((item, index) => (
          <li
            key={index}
            className={`
              ${index === items.length - 1 ? 'text-primary font-semibold' : 'text-on-surface-variant'}
              font-sans text-sm
            `}
          >
            <div className="flex items-center">
              <Link variant="no-underline" href={`${item.url || '#'}`} underlineOnHover>
                {item.title}
              </Link>
              <span className="mx-2">{index < items.length - 1 && <ChevronRight size={16} />}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
