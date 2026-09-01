/* MDX components for blog posts */

import type { MDXComponents } from 'mdx/types';

const HEADING_STYLES = {
  h1: 'text-3xl font-bold font-sans tracking-tight mb-8 text-center',
  h2: 'text-xl font-bold font-sans tracking-tight mt-16 mb-16 text-center',
  h3: 'text-lg font-bold font-sans tracking-normal mt-16 mb-16 text-center',
  h4: 'text-md font-semibold font-sans mt-8 mb-8 text-center',
  h5: 'text-md font-semibold font-sans tracking-wide mt-8 mb-8 text-center',
  h6: 'text-md font-semibold font-sans tracking-wide mt-8 mb-8 text-center',
} as const;

function makeHeading(tag: keyof typeof HEADING_STYLES) {
  const Tag = tag;
  return function Heading({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
      <Tag className={`group scroll-mt-24 text-on-background ${HEADING_STYLES[tag]}`} {...props}>
        {children}
      </Tag>
    );
  };
}

export const blogMDXComponents = {
  h1: makeHeading('h1'),
  h2: makeHeading('h2'),
  h3: makeHeading('h3'),
  h4: makeHeading('h4'),
  h5: makeHeading('h5'),
  h6: makeHeading('h6'),
} satisfies MDXComponents;
