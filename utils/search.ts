/* Search utils */

import { type SearchResult as MiniSearchResult } from 'minisearch';

import { getSearchIndexes, type SearchDoc } from '@/utils/searchIndexCache';

export interface SearchHit extends SearchDoc {
  id: number;
  matchedHeadings: string[];
}

export type SearchResult =
  | { scoped: true; results: SearchHit[] }
  | { scoped: false; results: { docs: SearchHit[]; blog: SearchHit[] } };

const SEARCH_OPTIONS = {
  prefix: true,
  fuzzy: 0.2,
  boost: { title: 3, headings: 2, tags: 1.5, excerpt: 1 },
};

function parseQuery(raw: string) {
  const operatorRegex = /(include|exclude|section):"([^"]+)"/g;
  const include: string[] = [];
  const exclude: string[] = [];
  let section: 'docs' | 'blog' | null = null;

  const cleanQuery = raw
    .replace(operatorRegex, (_, op, value) => {
      if (op === 'include') include.push(value.trim());
      if (op === 'exclude') exclude.push(value.trim());
      if (op === 'section') section = value.trim() as 'docs' | 'blog';
      return ''; // strip the operator out of the free-text query
    })
    .trim();

  return { cleanQuery, include, exclude, section };
}

function findMatchedHeadings(headings: string[], terms: string[]): string[] {
  if (!terms.length) return [];
  const lowerTerms = terms.map((term) => term.toLowerCase());
  return headings.filter((heading) => {
    const lowerHeading = heading.toLowerCase();
    return lowerTerms.some((term) => lowerHeading.includes(term));
  });
}

function toHit(result: MiniSearchResult, terms: string[]): SearchHit {
  const hit = result as unknown as SearchHit;
  hit.matchedHeadings = findMatchedHeadings(hit.headings || [], terms);
  return hit;
}

function makeFilter(include: string[], exclude: string[]) {
  return (result: MiniSearchResult) => {
    const tags: string[] = (result as unknown as SearchHit).tags || [];
    if (include.length && !include.every((tag) => tags.includes(tag))) return false;
    if (exclude.length && exclude.some((tag) => tags.includes(tag))) return false;
    return true;
  };
}

export async function search(query: string): Promise<SearchResult> {
  const { cleanQuery, include, exclude, section } = parseQuery(query);
  const terms = cleanQuery.split(/\s+/).filter(Boolean);
  const { docs: docsIndex, blog: blogIndex } = await getSearchIndexes();
  const filter = makeFilter(include, exclude);

  if (section) {
    const index = section === 'docs' ? docsIndex : blogIndex;
    const raw = index ? index.search(cleanQuery, { ...SEARCH_OPTIONS, filter }).slice(0, 20) : [];
    return { scoped: true, results: raw.map((r) => toHit(r, terms)) };
  } else {
    const docsRaw = docsIndex
      ? docsIndex.search(cleanQuery, { ...SEARCH_OPTIONS, filter }).slice(0, 10)
      : [];
    const blogRaw = blogIndex
      ? blogIndex.search(cleanQuery, { ...SEARCH_OPTIONS, filter }).slice(0, 10)
      : [];

    return {
      scoped: false,
      results: {
        docs: docsRaw.map((r) => toHit(r, terms)),
        blog: blogRaw.map((r) => toHit(r, terms)),
      },
    };
  }
}
