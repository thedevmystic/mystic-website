/* Search index status hook */

import { useSyncExternalStore } from 'react';

import { subscribeToIndexStatus, getIndexStatus, type IndexStatus } from '@/utils/searchIndexCache';

const defaultStatus = (): IndexStatus => {
  return 'idle' as IndexStatus;
};

export function useSearchIndexStatus(): IndexStatus {
  return useSyncExternalStore(subscribeToIndexStatus, getIndexStatus, defaultStatus);
}
