/* Scrollbar component */

'use client';

import { useEffect } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';
import Lenis from 'lenis';

import 'overlayscrollbars/styles/overlayscrollbars.css';
import 'lenis/dist/lenis.css';
import './Scrollbar.css';

export default function Scrollbar({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 5),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const osInstance = OverlayScrollbars(document.body, {
      scrollbars: {
        theme: 'os-theme-custom',
        autoHide: 'scroll',
        autoHideDelay: 1000,
        clickScroll: true,
      },
      overflow: {
        x: 'hidden',
        y: 'scroll',
      },
    });

    lenis.on('scroll', () => {
      osInstance.update();
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      osInstance.destroy();
    };
  }, []);

  return <>{children}</>;
}
