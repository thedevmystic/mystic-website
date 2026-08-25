/* Web Manifest */

import type { MetadataRoute } from 'next';

type ExtendedManifest = MetadataRoute.Manifest & {
  user_preferences?: {
    color_scheme?: {
      dark?: {
        background_color?: string;
        theme_color?: string;
      };
      light?: {
        background_color?: string;
        theme_color?: string;
      };
    };
  };
};

export default function manifest(): ExtendedManifest {
  return {
    name: 'Mystic Framework',
    short_name: 'MFW',
    description:
      'Performant. Elegant. Simply Mystic. A modern C++ framework built for speed and clarity.',
    start_url: '/',
    display: 'standalone',
    background_color: 'rgb(14 20 21)',
    theme_color: 'rgb(14 20 21)',
    user_preferences: {
      color_scheme: {
        dark: {
          background_color: 'rgb(14 20 21)',
          theme_color: 'rgb(14 20 21)',
        },
        light: {
          background_color: 'rgb(245 250 251)',
          theme_color: 'rgb(245 250 251)',
        },
      },
    },
    icons: [
      {
        src: '/favicons/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicons/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicons/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
  };
}
