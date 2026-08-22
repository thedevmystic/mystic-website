/* Custom Cursor component */

'use client';

import { useEffect, useRef } from 'react';

import './Cursor.css';

interface CursorSnapEventDetail {
  centerX: number; // The X coordinate of the cursor snap point
  centerY: number; // The Y coordinate of the cursor snap point
  width: number; // The width of the cursor snap area
  height: number; // The height of the cursor snap area
  borderRadius: string; // The border radius of the cursor snap area
}

const DEFAULT_SIZE = 25;

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const sizePos = useRef({ width: DEFAULT_SIZE, height: DEFAULT_SIZE });
  const targetSize = useRef({ width: DEFAULT_SIZE, height: DEFAULT_SIZE });
  const hiddenReasons = useRef<Set<string>>(new Set());

  useEffect(() => {
    /* Visibility: cursor is hidden if any reason is active (off-window, blurred, touch) */
    const updateHidden = () => {
      if (!dotRef.current) return;
      if (hiddenReasons.current.size > 0) {
        dotRef.current.classList.add('hidden');
      } else {
        dotRef.current.classList.remove('hidden');
      }
    };
    const addHiddenReason = (reason: string) => {
      hiddenReasons.current.add(reason);
      updateHidden();
    };
    const removeHiddenReason = (reason: string) => {
      hiddenReasons.current.delete(reason);
      updateHidden();
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Hide cursor on initial load until the first mouse move event
      if (dotRef.current?.classList.contains('initial')) {
        dotRef.current.classList.remove('initial');
      }

      mouse.current = { x: event.clientX, y: event.clientY };

      if (!dotRef.current?.classList.contains('snapped')) {
        targetPos.current = { x: event.clientX, y: event.clientY };
      }
    };

    let animationFrameId: number;
    const renderLoop = () => {
      const snapped = dotRef.current?.classList.contains('snapped');

      if (snapped) {
        const ease = 0.25;
        dotPos.current.x += (targetPos.current.x - dotPos.current.x) * ease;
        dotPos.current.y += (targetPos.current.y - dotPos.current.y) * ease;

        sizePos.current.width += (targetSize.current.width - sizePos.current.width) * ease;
        sizePos.current.height += (targetSize.current.height - sizePos.current.height) * ease;

        if (dotRef.current) {
          dotRef.current.style.width = `${sizePos.current.width}px`;
          dotRef.current.style.height = `${sizePos.current.height}px`;
        }
      } else {
        dotPos.current = { x: targetPos.current.x, y: targetPos.current.y };
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    /* State 1: Hovering */
    const handleMouseHoverStart = () => {
      if (dotRef.current && !dotRef.current.classList.contains('snapped')) {
        dotRef.current.classList.add('hovered');
      }
    };
    const handleMouseHoverEnd = () => {
      if (dotRef.current) {
        dotRef.current.classList.remove('hovered');
      }
    };

    /* State 2: Snapping */
    const handleMouseSnapStart = (e: CustomEvent<CursorSnapEventDetail>) => {
      const { centerX, centerY, width, height, borderRadius } = e.detail;
      if (dotRef.current) {
        dotRef.current.classList.add('snapped');
        targetPos.current = { x: centerX, y: centerY };

        const currentRect = dotRef.current.getBoundingClientRect();
        sizePos.current = { width: currentRect.width, height: currentRect.height };
        targetSize.current = { width, height };

        dotRef.current.style.borderRadius = borderRadius;
      }
    };
    const handleMouseSnapEnd = () => {
      if (dotRef.current) {
        dotRef.current.classList.remove('snapped');
        targetPos.current = { x: mouse.current.x, y: mouse.current.y };

        targetSize.current = { width: DEFAULT_SIZE, height: DEFAULT_SIZE };

        dotRef.current.style.width = '';
        dotRef.current.style.height = '';
        dotRef.current.style.borderRadius = '';
      }
    };

    /* State 3: Clicking */
    const handleMouseClickStart = () => {
      if (dotRef.current && !dotRef.current.classList.contains('snapped')) {
        dotRef.current.classList.add('clicked');
      }
    };
    const handleMouseClickEnd = () => {
      if (dotRef.current) {
        dotRef.current.classList.remove('clicked');
      }
    };

    /* State 4: Disabled */
    const handleMouseDisabledStart = () => {
      if (dotRef.current && !dotRef.current.classList.contains('snapped')) {
        dotRef.current.classList.add('disabled');
      }
    };
    const handleMouseDisabledEnd = () => {
      if (dotRef.current) {
        dotRef.current.classList.remove('disabled');
      }
    };

    /* Visibility: window leave/enter */
    const handleWindowLeave = () => addHiddenReason('window-leave');
    const handleWindowEnter = () => removeHiddenReason('window-leave');

    /* Visibility: window blur/focus (e.g. alt-tab, no mouse events fire) */
    const handleWindowBlur = () => addHiddenReason('blur');
    const handleWindowFocus = () => removeHiddenReason('blur');

    /* Visibility: touch/coarse-pointer devices */
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    const handlePointerChange = (e: MediaQueryList | MediaQueryListEvent) => {
      if (e.matches) {
        addHiddenReason('touch');
      } else {
        removeHiddenReason('touch');
      }
    };
    handlePointerChange(pointerQuery);

    /* Handle native clicking */
    const handleMouseDown = () => {
      window.dispatchEvent(new CustomEvent('mouse-click-start'));
    };
    const handleMouseUp = () => {
      window.dispatchEvent(new CustomEvent('mouse-click-end'));
    };

    /* Event Listeners */
    window.addEventListener('mousemove', handleMouseMove as EventListener);

    window.addEventListener('mouse-hover-start', handleMouseHoverStart as EventListener);
    window.addEventListener('mouse-hover-end', handleMouseHoverEnd as EventListener);

    window.addEventListener('mouse-snap-start', handleMouseSnapStart as EventListener);
    window.addEventListener('mouse-snap-end', handleMouseSnapEnd as EventListener);

    window.addEventListener('mouse-click-start', handleMouseClickStart as EventListener);
    window.addEventListener('mouse-click-end', handleMouseClickEnd as EventListener);

    window.addEventListener('mouse-disabled-start', handleMouseDisabledStart as EventListener);
    window.addEventListener('mouse-disabled-end', handleMouseDisabledEnd as EventListener);

    window.addEventListener('mousedown', handleMouseDown as EventListener);
    window.addEventListener('mouseup', handleMouseUp as EventListener);

    document.documentElement.addEventListener('mouseleave', handleWindowLeave as EventListener);
    document.documentElement.addEventListener('mouseenter', handleWindowEnter as EventListener);

    window.addEventListener('blur', handleWindowBlur as EventListener);
    window.addEventListener('focus', handleWindowFocus as EventListener);

    pointerQuery.addEventListener('change', handlePointerChange as EventListener);

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove as EventListener);

      window.removeEventListener('mouse-hover-start', handleMouseHoverStart as EventListener);
      window.removeEventListener('mouse-hover-end', handleMouseHoverEnd as EventListener);

      window.removeEventListener('mouse-snap-start', handleMouseSnapStart as EventListener);
      window.removeEventListener('mouse-snap-end', handleMouseSnapEnd as EventListener);

      window.removeEventListener('mouse-click-start', handleMouseClickStart as EventListener);
      window.removeEventListener('mouse-click-end', handleMouseClickEnd as EventListener);

      window.removeEventListener('mouse-disabled-start', handleMouseDisabledStart as EventListener);
      window.removeEventListener('mouse-disabled-end', handleMouseDisabledEnd as EventListener);

      window.removeEventListener('mousedown', handleMouseDown as EventListener);
      window.removeEventListener('mouseup', handleMouseUp as EventListener);

      document.documentElement.removeEventListener(
        'mouseleave',
        handleWindowLeave as EventListener,
      );
      document.documentElement.removeEventListener(
        'mouseenter',
        handleWindowEnter as EventListener,
      );

      window.removeEventListener('blur', handleWindowBlur as EventListener);
      window.removeEventListener('focus', handleWindowFocus as EventListener);

      pointerQuery.removeEventListener('change', handlePointerChange as EventListener);

      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot initial" />;
}
