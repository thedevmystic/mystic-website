/* Link Component */

'use client';

import { ReactNode } from 'react';

import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';

import './Link.css';

interface LinkProps extends NextLinkProps {
  children: ReactNode;
  variant?: 'underline' | 'no-underline';
  disabled?: boolean;
  className?: string;
}

export default function Link({
  children,
  href,
  variant = 'underline',
  disabled = false,
  className: userClassName = '',
  ...props
}: LinkProps) {
  const className = `link ${variant === 'underline' ? 'underline' : 'no-underline'} ${disabled ? 'disabled' : ''} ${userClassName}`;

  const dispatchEvent = (eventName: string) => {
    window.dispatchEvent(new CustomEvent(eventName));
  };

  return (
    <NextLink
      href={href}
      className={className}
      onMouseEnter={() => dispatchEvent('mouse-hover-start')}
      onMouseLeave={() => dispatchEvent('mouse-hover-end')}
      {...props}
    >
      {children}
    </NextLink>
  );
}
