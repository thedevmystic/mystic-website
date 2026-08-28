/* Client component to prefetch search indexes */

'use client';

import { useEffect } from 'react';

import { prefetchSearchIndexes } from '@/utils/searchIndexCache';

export default function SearchIndexPrefetcher() {
  useEffect(() => {
    prefetchSearchIndexes();
  }, []);

  return null;
}
