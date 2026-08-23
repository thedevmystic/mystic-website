/* Portal component */

import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import useIsMounted from '@/hooks/useIsMounted';

export default function Portal({ children }: { children: ReactNode }) {
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return createPortal(children, document.body);
}
