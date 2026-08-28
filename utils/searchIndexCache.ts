/* Prefetches search index JSONs, builds MiniSearch indexes, and caches it. */

import MiniSearch from 'minisearch';

export interface SearchDoc {
  title: string;
  section: 'docs' | 'blog';
  tags: string[];
  headings: string[];
  excerpt: string;
  url: string;
}

const MINISEARCH_OPTIONS = {
  fields: ['title', 'tags', 'headings', 'excerpt'],
  storeFields: ['title', 'section', 'tags', 'headings', 'excerpt', 'url'],
};

export type IndexStatus = 'idle' | 'loading' | 'ready' | 'error';

interface IndexCache {
  docs: MiniSearch<SearchDoc> | null;
  blog: MiniSearch<SearchDoc> | null;
  ready: Promise<void> | null;
  status: IndexStatus;
}

const cache: IndexCache = { docs: null, blog: null, ready: null, status: 'idle' };

type Listener = (status: IndexStatus) => void;
const listeners = new Set<Listener>();

function setIndexStatus(status: IndexStatus) {
  cache.status = status;
  listeners.forEach((listener) => listener(status));
}

export function getIndexStatus(): IndexStatus {
  return cache.status;
}

export function subscribeToIndexStatus(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

async function buildIndex(url: string): Promise<MiniSearch<SearchDoc>> {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to fetch search index from ${url}: ${response.statusText}`);
  const data: SearchDoc[] = await response.json();

  const index = new MiniSearch<SearchDoc>(MINISEARCH_OPTIONS);
  index.addAll(data.map((doc, id) => ({ id, ...doc })));
  return index;
}

/** Prefetches and caches the search index for docs and blog. */
export async function prefetchSearchIndexes(): Promise<void> {
  if (cache.ready) return cache.ready;

  setIndexStatus('loading');

  cache.ready = (async () => {
    try {
      const [docsIndex, blogIndex] = await Promise.all([
        buildIndex('/docs.json'),
        buildIndex('/blog.json'),
      ]);
      cache.docs = docsIndex;
      cache.blog = blogIndex;
      setIndexStatus('ready');
    } catch (error) {
      console.error('Error prefetching search indexes:', error);
      setIndexStatus('error');
    }
  })();

  return cache.ready;
}

/** Returns the cached search indexes. */
export async function getSearchIndexes(): Promise<{
  docs: MiniSearch<SearchDoc>;
  blog: MiniSearch<SearchDoc>;
}> {
  await prefetchSearchIndexes();
  return { docs: cache.docs!, blog: cache.blog! };
}
