/* Checks if the component has mounted. */

import { useSyncExternalStore } from 'react';

export default function useIsMounted() {
  return useSyncExternalStore(
    () => () => {}, // subscribe function (no-op)
    () => true, // Client
    () => false, // Server
  );
}
