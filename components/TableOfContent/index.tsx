/* Table of Content component */

'use client';

import { useEffect, useState, useRef } from 'react';

import { OverlayScrollbars } from 'overlayscrollbars';

import Link from '@/components/Link';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface NestedTocItem extends TocItem {
  children?: NestedTocItem[];
}

interface TableOfContentProps {
  toc: NestedTocItem[];
}

export default function TableOfContent({ toc }: TableOfContentProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 },
    );

    // Collect all IDs
    const allIds: string[] = [];
    toc.forEach((h2) => {
      allIds.push(h2.id);
      h2.children?.forEach((h3) => allIds.push(h3.id));
    });

    allIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [toc]);

  useEffect(() => {
    if (!navRef.current) return;

    const osInstance = OverlayScrollbars(
      navRef.current,
      {
        scrollbars: {
          theme: 'os-theme-custom',
          autoHide: 'scroll',
          autoHideDelay: 1000,
          clickScroll: true,
        },
      },
      {
        updated: (instance) => {
          setIsOverflow(instance.state().hasOverflow.y);
        },
      },
    );

    setIsOverflow(osInstance.state().hasOverflow.y);

    return () => {
      osInstance.destroy();
    };
  }, [toc]);

  return (
    <>
      <h2 className="text-xs font-mono text-on-surface-variant mb-2 uppercase">In this page</h2>
      <nav ref={navRef} data-lenis-prevent className="text-sm max-h-[calc(100vh-6rem)] toc-scroll">
        {toc.map((h2, index) => {
          const isH2Active = activeId === h2.id;
          const isLast = index === toc.length - 1;

          return (
            <div key={h2.id}>
              <div
                className={`
                  block transition colors border-l hover:border-l-2 pl-4 py-1 ${
                    isH2Active
                      ? 'text-primary border-primary font-medium border-l-2'
                      : 'text-on-surface-variant border-outline-variant hover:text-on-surface hover:border-outline'
                  }
                `}
              >
                <Link href={`#${h2.id}`} variant="no-underline" noHover underlineOnHover>
                  {h2.text}
                </Link>
              </div>
              {h2.children && h2.children.length > 0 && (
                <div>
                  {h2.children.map((h3) => {
                    const isH3Active = activeId === h3.id;
                    return (
                      <div
                        key={h3.id}
                        className={`
                          block transition colors border-l hover:border-l-2 pl-8 py-1 ${
                            isH3Active
                              ? 'text-primary border-primary font-medium border-l-2'
                              : 'text-on-surface-variant border-outline-variant hover:text-on-surface hover:border-outline'
                          }
                        `}
                      >
                        <Link href={`#${h3.id}`} variant="no-underline" noHover underlineOnHover>
                          {h3.text}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
              {isLast && isOverflow && (
                <span className="block border-l border-outline-variant p-2" />
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
