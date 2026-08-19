/* MDX configuration file. */

import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';

import Link from '@/components/Link';
import CodeBlock from '@/components/CodeBlock';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Pulls the plain-text content out of a children tree (used for code blocks). */
function getTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (
    node &&
    typeof node === 'object' &&
    'props' in node &&
    (node as { props?: { children?: ReactNode } }).props?.children
  ) {
    return getTextContent((node as { props: { children: ReactNode } }).props.children);
  }
  return '';
}

// ---------------------------------------------------------------------------
// Alerts
// ---------------------------------------------------------------------------

const ALERT_STYLES: Record<string, string> = {
  note: 'bg-primary-container text-on-primary-container border-primary [&_svg]:fill-primary',
  tip: 'bg-secondary-container text-on-secondary-container border-secondary [&_svg]:fill-secondary',
  important:
    'bg-tertiary-container text-on-tertiary-container border-tertiary [&_svg]:fill-tertiary',
  warning: 'bg-warning-container text-on-warning-container border-warning [&_svg]:fill-warning',
  caution: 'bg-error-container text-on-error-container border-error [&_svg]:fill-error',
};

const ALERT_TITLE_CSS =
  '[&_.markdown-alert-title]:flex [&_.markdown-alert-title]:items-center [&_.markdown-alert-title]:gap-2 [&_.markdown-alert-title]:font-semibold [&_.markdown-alert-title]:text-sm [&_.markdown-alert-title]:mb-1 [&_svg]:w-4 [&_svg]:h-4';

function Blockquote({ className = '', children, ...props }: HTMLAttributes<HTMLElement>) {
  const alertType = Object.keys(ALERT_STYLES).find((type) =>
    className.includes(`markdown-alert-${type}`),
  );

  if (!alertType) {
    return (
      <blockquote className="border-l-4 border-outline pl-4 my-6 italic text-on-surface-variant">
        {children}
      </blockquote>
    );
  }

  return (
    <blockquote
      className={`not-italic rounded-xl border px-4 py-3 my-6 text-sm leading-relaxed [&>p]:my-0 ${ALERT_STYLES[alertType]} ${ALERT_TITLE_CSS}`}
      {...props}
    >
      {children}
    </blockquote>
  );
}

// ---------------------------------------------------------------------------
// Heading factory
// ---------------------------------------------------------------------------

const HEADING_STYLES = {
  h1: 'text-4xl font-bold font-serif tracking-tight mt-10 mb-4',
  h2: 'text-3xl font-bold font-serif tracking-tight mt-10 mb-4',
  h3: 'text-2xl font-semibold font-serif tracking-tight mt-8 mb-3',
  h4: 'text-xl font-semibold font-serif mt-8 mb-3',
  h5: 'text-lg font-semibold font-serif tracking-wide mt-6 mb-2',
  h6: 'text-md font-semibold font-serif tracking-wide text-on-surface-variant mt-6 mb-2',
} as const;

const HEADING_ANCHOR_CSS =
  '[&_.heading-anchor]:ml-2 [&_.heading-anchor]:no-underline [&_.heading-anchor]:opacity-0 [&_.heading-anchor]:text-outline hover:[&_.heading-anchor]:opacity-100 [&_.heading-anchor]:transition-opacity [&_.heading-anchor]:after:content-["#"]';

function makeHeading(tag: keyof typeof HEADING_STYLES) {
  const Tag = tag;
  return function Heading({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
      <Tag
        className={`group scroll-mt-24 text-on-background ${HEADING_STYLES[tag]} ${HEADING_ANCHOR_CSS}`}
        {...props}
      >
        {children}
      </Tag>
    );
  };
}

// ---------------------------------------------------------------------------
// Component map
// ---------------------------------------------------------------------------

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: makeHeading('h1'),
    h2: makeHeading('h2'),
    h3: makeHeading('h3'),
    h4: makeHeading('h4'),
    h5: makeHeading('h5'),
    h6: makeHeading('h6'),

    p: ({ children }) => <p className="text-md leading-relaxed text-on-surface my-4">{children}</p>,

    strong: ({ children }) => <strong className="font-semibold text-on-surface">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,

    a: ({ href, children, target, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <Link
        href={href ?? '#'}
        target={target as '_blank' | '_self' | '_parent' | '_top' | undefined}
        {...props}
      >
        {children}
      </Link>
    ),

    blockquote: Blockquote,

    pre: ({ children }) => {
      const codeElement = children as React.ReactElement<{
        className?: string;
        children?: ReactNode;
      }>;
      const className = codeElement?.props?.className ?? '';
      const language = className.replace('language-', '') || 'text';
      const code = getTextContent(codeElement?.props?.children).replace(/\n$/, '');

      return <CodeBlock code={code} language={language} />;
    },

    code: ({ children }) => (
      <code className="bg-surface-container-low text-on-surface font-mono text-sm px-1.5 py-0.5 rounded-md">
        {children}
      </code>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-xl border border-outline-variant">
        <table className="w-full text-sm text-left border-collapse">{children}</table>
      </div>
    ),
    caption: ({ children }) => (
      <caption className="caption-bottom text-xs text-on-surface-variant py-2 px-4">
        {children}
      </caption>
    ),
    thead: ({ children }) => (
      <thead className="bg-surface-container text-on-surface font-semibold">{children}</thead>
    ),
    tbody: ({ children }) => <tbody className="divide-y divide-outline-variant">{children}</tbody>,
    tr: ({ children }) => <tr className="even:bg-surface-container-low">{children}</tr>,
    th: ({ children }) => <th className="px-4 py-2 align-bottom">{children}</th>,
    td: ({ children }) => <td className="px-4 py-2 text-on-surface-variant">{children}</td>,

    ...components,
  };
}
