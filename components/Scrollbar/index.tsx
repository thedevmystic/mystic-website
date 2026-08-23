/* Scrollbar provider */

'use client';

import { useEffect } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/styles/overlayscrollbars.css';

import './Scrollbar.css';

export default function Scrollbar({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const osInstance = OverlayScrollbars(document.body, {
      scrollbars: {
        theme: 'os-theme-custom',
        autoHide: 'scroll',
        autoHideDelay: 1000,
        clickScroll: true,
      },
    });

    return () => {
      osInstance.destroy();
    };
  }, []);

  return <>{children}</>;
}
