/* Next.js configuration file for the project. */

import type { NextConfig } from 'next';

import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  trailingSlash: true,
  reactStrictMode: true,
  reactCompiler: true,
  turbopack: {},
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      'remark-gfm',
      ['remark-github-blockquote-alert', { tagName: 'blockquote' }],
      'remark-frontmatter',
      ['remark-mdx-frontmatter', { name: 'frontmatter' }],
      'remark-math',
    ],
    rehypePlugins: [
      'rehype-katex',
      'rehype-slug',
      [
        'rehype-autolink-headings',
        { behavior: 'append', properties: { className: 'heading-anchor' } },
      ],
      ['rehype-external-links', { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
});

export default withMDX(nextConfig);
