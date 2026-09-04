/* Modal component */

'use client';

import type { ReactNode, CSSProperties } from 'react';
import { useEffect, useId } from 'react';

import { lockScroll, unlockScroll } from 'scroll-utils';

import Portal from '@/components/Portal';
import useFocusTrap from '@/hooks/useFocusTrap';

type ModalPosition = 'top' | 'left' | 'right' | 'bottom' | 'center';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  position?: ModalPosition;
  offset?: number | string;
  disableAutoFocus?: boolean;
  disableEnforceFocus?: boolean;
  disableRestoreFocus?: boolean;
}

function getPositionStyles(position: ModalPosition): string {
  switch (position) {
    case 'top':
      return 'left-1/2 -translate-x-1/2';
    case 'left':
      return 'top-1/2 -translate-y-1/2';
    case 'right':
      return 'top-1/2 -translate-y-1/2';
    case 'bottom':
      return 'left-1/2 -translate-x-1/2';
    case 'center':
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    default:
      return '';
  }
}

function getDynamicStyles(position: ModalPosition, offset: number | string): CSSProperties {
  const styles: CSSProperties = {};

  let parsedOffset: string;
  if (typeof offset === 'number') {
    parsedOffset = `${offset}px`;
  } else if (typeof offset === 'string') {
    parsedOffset = offset;
  } else {
    parsedOffset = '0px';
  }

  switch (position) {
    case 'top':
      styles.top = parsedOffset;
      break;
    case 'left':
      styles.left = parsedOffset;
      break;
    case 'right':
      styles.right = parsedOffset;
      break;
    case 'bottom':
      styles.bottom = parsedOffset;
      break;
    case 'center':
    default:
      // No additional styles needed for center position
      break;
  }

  return styles;
}

export default function Modal({
  open,
  onClose,
  children,
  className = '',
  position = 'center',
  offset = 0,
  disableAutoFocus = false,
  disableEnforceFocus = false,
  disableRestoreFocus = false,
}: ModalProps) {
  const containterRef = useFocusTrap(
    open,
    disableAutoFocus,
    disableEnforceFocus,
    disableRestoreFocus,
  );
  const id = useId();

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      unlockScroll();
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const positionStyles = getPositionStyles(position);
  const dynamicStyles = getDynamicStyles(position, offset);

  return (
    <Portal>
      <div
        className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-surface-tint/5 z-[5000] backdrop-blur-[2px]"
        onClick={onClose}
      >
        <div
          className={`
            fixed bg-surface text-on-surface border border-outline-variant
            text-md text-sans leading-normal
            rounded-xl z-[5005] 
            ${positionStyles}
            ${className}
          `}
          style={dynamicStyles}
          ref={containterRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={id}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}
