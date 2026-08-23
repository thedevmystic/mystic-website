/* Focus trapping hook for React components */

'use client';

import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function useFocusTrap(
  active: boolean,
  disableAutoFocus: boolean = false,
  disableEnforceFocus: boolean = false,
  disableRestoreFocus: boolean = false,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!disableAutoFocus && focusableElements.length > 0) {
      focusableElements[0]?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      if (disableEnforceFocus) return;

      // Focus elements changes, so recalculate all visible focusable elements
      const els = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (els.length === 0) return;

      const firstElement = els[0];
      const lastElement = els[els.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (!disableRestoreFocus) {
        previouslyFocused.current?.focus();
      }
    };
  }, [active, disableAutoFocus, disableRestoreFocus, disableEnforceFocus]);

  return containerRef;
}
