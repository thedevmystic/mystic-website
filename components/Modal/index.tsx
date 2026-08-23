/* Modal component */

'use client';

import type { ReactNode } from 'react';
import { useEffect, useId } from 'react';

import { Cross } from 'lucide-react';
import { lockScroll, unlockScroll } from 'scroll-utils';

import Button from '@/components/Button';
import Portal from '@/components/Portal';
import useFocusTrap from '@/hooks/useFocusTrap';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  disableAutoFocus?: boolean;
  disableEnforceFocus?: boolean;
  disableRestoreFocus?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
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

  return (
    <Portal>
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[1000]" onClick={onClose}>
        <div
          className="bg-surface text-on-surface border-outline-variant text-md text-sans leading-normal rounded-lg"
          ref={containterRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={id}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col justify-between items-center border-b border-outline-variant">
            <h2 id={id}>{title}</h2>
            <Button variant="circular">
              <Cross size={16} />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
}
