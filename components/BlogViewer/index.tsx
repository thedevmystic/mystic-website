/* Blog Viewer */

'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

import Button from '@/components/Button';
import { validTags as TAGS } from '@/utils/validTags';

interface BlogEntry {
  title: string;
  date: string;
  tags: string[];
  timeToRead: string;
  excerpt: string;
  url: string;
}

const PAGE_SIZE_HINT = 20;
const GAP = 8;
const CHEVRON_WIDTH = 28;

export default function BlogViewer() {
  const [entries, setEntries] = useState<BlogEntry[]>([]);
  const [_page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('all');
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);

  const fetchtingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  const fetchPage = useCallback(async (pageNum: number) => {
    if (fetchtingRef.current) return;
    fetchtingRef.current = true;
    setLoading(true);

    try {
      const res = await fetch(`/blog-index-${pageNum}.json`);
      if (!res.ok) {
        setHasMore(false);
        return;
      }
      const data: BlogEntry[] = await res.json();
      setEntries((prev) => {
        const existingUrls = new Set(prev.map((e) => e.url));
        const newEntries = data.filter((e) => !existingUrls.has(e.url));
        return [...prev, ...newEntries];
      });
      if (data.length < PAGE_SIZE_HINT) {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
      fetchtingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hasMore || loading) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        if (observerEntries[0].isIntersecting && !fetchtingRef.current) {
          setPage((prev) => {
            const next = prev + 1;
            fetchPage(next);
            return next;
          });
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading, fetchPage]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const recalc = () => {
      const available = container.clientWidth;
      const tagEls = Array.from(measure.children) as HTMLElement[];

      let used = 0;
      let count = 0;
      const budget = available - GAP - CHEVRON_WIDTH;

      for (let i = 0; i < tagEls.length; i++) {
        const w = tagEls[i].offsetWidth;
        const next = used + (count > 0 ? GAP : 0) + w;
        if (next > budget) break;
        used = next;
        count++;
      }

      setVisibleCount(Math.max(count, 1));
    };

    recalc();
    const resizeObserver = new ResizeObserver(recalc);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const tagsOverflow = visibleCount < TAGS.length;
  const shownTags = tagsExpanded ? TAGS : TAGS.slice(0, visibleCount);

  const filteredEntries =
    activeTag === 'all' ? entries : entries.filter((entry) => entry.tags.includes(activeTag));

  return (
    <div className="max-w-6xl mx-auto">
      <div
        ref={measureRef}
        className="flex gap-2 absolute invisible pointer-events-none -z-10"
        aria-hidden="true"
      >
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs rounded-full px-3 py-1.5 border whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        ref={containerRef}
        className={`flex gap-2 mb-6 ${tagsExpanded ? 'flex-wrap' : 'flex-nowrap overflow-hidden'}`}
      >
        {shownTags.map((tag) => (
          <Button
            variant={`${activeTag === tag ? 'primary' : 'outline'}`}
            key={tag}
            onClick={() => setActiveTag(tag)}
            className="font-mono !text-xs !min-w-0 !min-h-0 !px-3 !py-1.5 shrink-0 whitespace-nowrap"
          >
            {tag}
          </Button>
        ))}

        {tagsOverflow && (
          <Button
            variant="circular"
            onClick={() => setTagsExpanded((prev) => !prev)}
            aria-label={tagsExpanded ? 'Collapse tags' : 'Show all tags'}
            className="flex items-center justify-center !min-w-0 !min-h-0 !w-7 !h-7 shrink-0"
          >
            {tagsExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
        )}
      </div>

      <div className="border border-outline-variant rounded-xl overflow-hidden bg-surface-container-low">
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 bg-surface-container border-b border-outline-variant">
          <span className="font-mono text-xs text-on-surface-variant">~/mystic-framework/blog</span>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-error" />
            <span className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
          </div>
        </div>

        <div>
          {filteredEntries.map((entry, index) => (
            <Link
              key={`${entry.url}-${index}-big-boi-5000`}
              href={entry.url}
              className="block px-5 py-4 border-b border-outline-variant last:border-b-0 hover:bg-primary/5 transition-colors cursor-none"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
                <span className="text-tertiary">$</span>
                <span>{entry.date}</span>
                {entry.tags.length > 0 && (
                  <>
                    <span className="text-on-surface-variant">&gt;</span>
                    <span>{entry.tags.join(', ')}</span>
                  </>
                )}
                {entry.timeToRead && (
                  <span className="ml-auto text-on-surface-variant">{entry.timeToRead}</span>
                )}
              </div>
              <p className="text-on-surface font-medium text-base mb-1">{entry.title}</p>
              {entry.excerpt && (
                <p className="text-on-surface-variant text-sm max-w-xl">{entry.excerpt}</p>
              )}
            </Link>
          ))}

          {loading && (
            <div className="flex items-center justify-center gap-1 py-6">
              <span className="w-1 h-1 rounded-full bg-on-surface-variant animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-1 rounded-full bg-on-surface-variant animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-1 rounded-full bg-on-surface-variant animate-bounce" />
            </div>
          )}

          {!hasMore && !loading && filteredEntries.length > 0 && (
            <div className="text-center py-4 font-mono text-xs text-on-surface-variant">
              -- end of log --
            </div>
          )}

          {!loading && filteredEntries.length === 0 && (
            <div className="text-center py-8 font-mono text-xs text-on-surface-variant">
              no entries match #{activeTag}
            </div>
          )}
        </div>
      </div>

      {hasMore && !loading && <div ref={sentinelRef} className="h-1" />}
    </div>
  );
}
