/* Robots file */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/search', '/*?*', '/docs/drafts/', '/blog/drafts/'],
      },
    ],
    sitemap: `https://mystic-framework.github.io/sitemap.xml`,
  };
}
