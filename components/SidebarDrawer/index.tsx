/* Sidebar Drawer component. */

'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import { ChevronDown, PanelLeftOpen, X } from 'lucide-react';
import { OverlayScrollbars } from 'overlayscrollbars';

import Button from '@/components/Button';
import Portal from '../Portal';
import Link from '@/components/Link';
import Modal from '@/components/Modal';

export interface SidebarDrawerItem {
  catagory: string;
  href: string;
  items: {
    label: string;
    href: string;
  }[];
}

export interface SidebarDrawerProps {
  items: SidebarDrawerItem[];
  currentId?: string;
}

function generateId(catagory: string, label: string) {
  return `${catagory}--${label}`.toLowerCase().replace(/\s+/g, '-');
}

export default function SidebarDrawer({ items, currentId }: SidebarDrawerProps) {
  const [expaned, setExpanded] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    (items ?? []).forEach((item) => {
      initialState[item.catagory] = true;
    });
    return initialState;
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const desktopNavRef = useRef<HTMLElement | null>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);

  const pathname = usePathname();

  const handleToggle = (catagory: string) => {
    setExpanded((prev) => ({
      ...prev,
      [catagory]: !prev[catagory],
    }));
  };

  // Close mobile panel on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Desktop scrollbars
  useEffect(() => {
    if (!desktopNavRef.current) return;

    const osInstance = OverlayScrollbars(desktopNavRef.current, {
      scrollbars: {
        theme: 'os-theme-custom',
        autoHide: 'scroll',
        autoHideDelay: 1000,
        clickScroll: true,
      },
    });

    return () => {
      osInstance.destroy();
    };
  }, [items]);

  // Mobile scrollbars
  useEffect(() => {
    if (!mobileOpen || !mobileNavRef.current) return;

    const osInstance = OverlayScrollbars(mobileNavRef.current, {
      scrollbars: {
        theme: 'os-theme-custom',
        autoHide: 'scroll',
        autoHideDelay: 1000,
        clickScroll: true,
      },
    });

    return () => {
      osInstance.destroy();
    };
  }, [mobileOpen, items]);

  if (!items || items.length === 0) return null;

  const renderCategories = () =>
    items.map((item) => (
      <div key={item.catagory} className="mb-4">
        <div className="relative flex justify-between mb-2">
          <h2 className="text-xs font-mono text-on-surface-variant uppercase m-0">
            <Link href={item.href} variant="no-underline" noHover underlineOnHover>
              {item.catagory}
            </Link>
          </h2>

          <div className="absolute right-0 top-0 -translate-y-2">
            <Button variant="circular" onClick={() => handleToggle(item.catagory)}>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${expaned[item.catagory] ? 'rotate-0' : 'rotate-180'}`}
              />
            </Button>
          </div>
        </div>
        {item.items && item.items.length > 0 && (
          <div
            className={`overflow-hidden transition-all duration-150 ease-in-out ${
              expaned[item.catagory] ? 'max-h-[500px]' : 'max-h-0'
            }`}
          >
            {item.items.map((subItem) => {
              const isActive = currentId === generateId(item.catagory, subItem.label);
              return (
                <div
                  key={subItem.label}
                  className={`
                    block transition colors border-l hover:border-l-2 pl-4 py-1 ${
                      isActive
                        ? 'text-primary border-primary font-medium border-l-2'
                        : 'text-on-surface-variant border-outline-variant hover:text-on-surface hover:border-outline'
                    }
                  `}
                >
                  <Link href={subItem.href} variant="no-underline" noHover underlineOnHover>
                    {subItem.label}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    ));

  return (
    <>
      {/* Desktop drawer */}
      <aside className="hidden min-[1240px]:block w-[236px] shrink-0 sticky top-20 self-start">
        <nav
          ref={desktopNavRef}
          data-lenis-prevent
          className="text-sm max-h-[calc(100vh-6rem)] drawer-scroll"
        >
          {renderCategories()}
        </nav>
      </aside>

      {/* Mobile FAB */}
      <Portal>
        <div className="min-[1240px]:hidden fixed bottom-4 left-4 z-40">
          <Button
            variant="primary"
            className="!rounded-full !p-2 !w-12 !h-12 !min-h-0 !min-w-0"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <PanelLeftOpen size={20} />
          </Button>
        </div>
      </Portal>

      {/* Mobile panel */}
      <Modal
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        position="left"
        className="!top-0 !bottom-0 !translate-y-0 h-full w-[60vw] !rounded-none !rounded-r-xl flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant shrink-0">
          <span className="text-xs font-mono text-on-surface-variant uppercase">Navigation</span>
          <Button
            variant="circular"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('mouse-snap-end'));
              setMobileOpen(false);
            }}
            aria-label="Close navigation"
          >
            <X size={18} />
          </Button>
        </div>
        <nav
          ref={mobileNavRef}
          data-lenis-prevent
          className="text-sm flex-1 min-h-0 px-4 py-4 drawer-scroll"
        >
          {renderCategories()}
        </nav>
      </Modal>
    </>
  );
}
