/* Link Component */

'use client';

import { ReactNode, ForwardedRef, forwardRef } from 'react';

import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';

import './Link.css';

interface LinkProps extends NextLinkProps {
  children: ReactNode;
  variant?: 'underline' | 'no-underline';
  target?: '_blank' | '_self' | '_parent' | '_top';
  disabled?: boolean;
  removeSpan?: boolean;
  noHover?: boolean;
  underlineOnHover?: boolean;
  className?: string;
}

const Link = forwardRef(function Link(
  {
    children,
    href,
    variant = 'underline',
    target = '_self',
    disabled = false,
    removeSpan = false,
    noHover = false,
    underlineOnHover = false,
    className: userClassName = '',
    ...props
  }: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  const isExternal =
    target === '_blank' ||
    (href && !(href as string).startsWith('/') && !(href as string).startsWith('#'));

  const className = `
    link
    ${variant === 'underline' ? 'underline' : 'no-underline'}
    ${disabled ? 'disabled' : ''}
    ${noHover ? 'no-hover' : ''}
    ${underlineOnHover ? 'underline-on-hover' : ''}
    ${userClassName}
  `.trim();

  const dispatchEvent = (eventName: string) => {
    window.dispatchEvent(new CustomEvent(eventName));
  };

  if (disabled) {
    return (
      <span
        ref={ref as ForwardedRef<HTMLSpanElement>}
        className={className}
        onMouseEnter={() => dispatchEvent('mouse-hover-start')}
        onMouseLeave={() => dispatchEvent('mouse-hover-end')}
        {...props}
      >
        [[Hyperlink Disabled]]
      </span>
    );
  }

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={href as string}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={className}
        onMouseEnter={() => dispatchEvent('mouse-hover-start')}
        onMouseLeave={() => dispatchEvent('mouse-hover-end')}
        {...props}
      >
        {children}
        {!removeSpan && (
          <span className="inline-block ml-1 text-xs" aria-hidden="true">
            ↗
          </span>
        )}
      </a>
    );
  }

  return (
    <NextLink
      ref={ref}
      href={href}
      target={target}
      className={className}
      onMouseEnter={() => dispatchEvent('mouse-hover-start')}
      onMouseLeave={() => dispatchEvent('mouse-hover-end')}
      {...props}
    >
      {children}
    </NextLink>
  );
});

export default Link;
