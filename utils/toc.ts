/* ToC Helper */

import type { TocItem, NestedTocItem } from '@/components/TableOfContent';

export function extractToc(source: string): NestedTocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const flatHeadings: TocItem[] = [];

  let match;
  while ((match = headingRegex.exec(source)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`]/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');

    flatHeadings.push({ id, text, level });
  }

  const nestedHeadings: NestedTocItem[] = [];
  let currentParent: NestedTocItem | null = null;

  for (const heading of flatHeadings) {
    if (heading.level === 2) {
      currentParent = { ...heading, children: [] };
      nestedHeadings.push(currentParent);
    } else if (heading.level === 3) {
      if (currentParent) {
        currentParent.children?.push(heading);
      } else {
        // Ignore h3 without a preceding h2
      }
    }
  }

  return nestedHeadings;
}
