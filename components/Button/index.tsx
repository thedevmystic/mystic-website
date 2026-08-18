/* Button Component */

'use client';

import { useRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'ui' | 'circular';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  className,
  variant = 'secondary',
  disabled = false,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const combinedClassName = `button ${variant} ${disabled ? 'disabled' : ''} ${className}`.trim();

  const handleMouseEnter = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(buttonRef.current);

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const width = rect.width + 2;
    const height = rect.height + 2;
    const borderRadius = computedStyle.borderRadius;

    if (variant.includes('disabled')) {
      window.dispatchEvent(new CustomEvent('mouse-disabled-start'));
    }

    const event = new CustomEvent('mouse-snap-start', {
      detail: {
        centerX,
        centerY,
        width,
        height,
        borderRadius,
      },
    });

    window.dispatchEvent(event);
  };

  const handleMouseLeave = () => {
    if (variant.includes('disabled')) {
      window.dispatchEvent(new CustomEvent('mouse-disabled-end'));
    }

    window.dispatchEvent(new CustomEvent('mouse-snap-end'));
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
}
