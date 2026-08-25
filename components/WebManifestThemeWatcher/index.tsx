/* Web manifest theme watcher component */

'use client';

import { useEffect } from 'react';
import { useTheme } from '@/styles/ThemeProvider';

export default function WebManifestThemeWtacher() {
  const { resolvedToken: theme } = useTheme();

  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', theme === 'dark' ? 'rgb(14 20 21)' : 'rgb(245 250 251)');
  }, [theme]);

  return null;
}
