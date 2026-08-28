/* Client component to prefetch search indexes */

'use client';

import { useEffect } from 'react';

import { prefetchSearchIndexes } from '@/utils/searchIndexCache';

export default function SearchIndexPrefetcher() {
  useEffect(() => {
    const schedule =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 2);

    const handle = schedule(() => {
      prefetchSearchIndexes();
    });

    return () => {
      if (typeof window.cancelIdleCallback === 'function' && typeof handle === 'number') {
        window.cancelIdleCallback(handle);
      } else {
        clearTimeout(handle as unknown as number);
      }
    };
  }, []);

  return null;
}
