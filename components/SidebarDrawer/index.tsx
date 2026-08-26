/* Sidebar Drawer component. */

'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { OverlayScrollbars } from 'overlayscrollbars';

import Button from '@/components/Button';
import Link from '@/components/Link';

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
      initialState[item.catagory] = true; // Set all categories to expanded by default
    });
    return initialState;
  });
  const navRef = useRef<HTMLElement | null>(null);

  const handleToggle = (catagory: string) => {
    setExpanded((prev) => ({
      ...prev,
      [catagory]: !prev[catagory],
    }));
  };

  useEffect(() => {
    if (!navRef.current) return;

    const osInstance = OverlayScrollbars(navRef.current, {
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

  if (!items || items.length === 0) return null;

  return (
    <nav ref={navRef} className="text-sm max-h-[calc(100vh-6rem)]">
      {items.map((item) => {
        return (
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
        );
      })}
    </nav>
  );
}
