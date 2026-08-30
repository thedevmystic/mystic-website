/* Search Modal */

'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUp, ArrowDown, CornerDownLeft, Search } from 'lucide-react';
import { OverlayScrollbars } from 'overlayscrollbars';

import Modal from '@/components/Modal';
import { useSearchIndexStatus } from '@/hooks/useSearchIndexStatus';
import debounce from '@/utils/debounce';
import { search, type SearchResult as SearchOutcome, type SearchHit } from '@/utils/search';
import {
  recordSearch,
  getSavedSearches,
  toggleBookmark,
  removeSearch,
  type SavedSearch,
} from '@/utils/savedSearches';

import RecentSearch from './RecentSearch';
import SearchResults from './SearchResults';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

function flattenOutcome(outcome: SearchOutcome | null): SearchHit[] {
  if (!outcome) return [];
  return outcome.scoped ? outcome.results : [...outcome.results.docs, ...outcome.results.blog];
}

function isSavedSearch(item: SearchHit | SavedSearch): item is SavedSearch {
  return 'bookmark' in item;
}

function IndexingIndicator() {
  return (
    <span className="inline-flex items-center text-xs text-on-surface-variant shrink-0">
      Indexing
      <span className="inline-flex ml-0.5">
        <span className="animate-bounce [animation-delay:0ms]">.</span>
        <span className="animate-bounce [animation-delay:150ms]">.</span>
        <span className="animate-bounce [animation-delay:300ms]">.</span>
      </span>
    </span>
  );
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter();
  const indexStatus = useSearchIndexStatus();

  const [searchQuery, setSearchQuery] = useState('');
  const [outcome, setOutcome] = useState<SearchOutcome | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [savedList, setSavedList] = useState(() => getSavedSearches());
  const containerRef = useRef<HTMLDivElement | null>(null);

  const refreshSaved = useCallback(() => {
    setSavedList(getSavedSearches());
    setSelectedIndex(0);
  }, []);

  const runSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setOutcome(null);
      setSelectedIndex(0);
      return;
    }

    const result = await search(query);
    setOutcome(result);
    setSelectedIndex(0);
  }, []);

  const debouncedSearch = useMemo(() => debounce(runSearch, 300), [runSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setSelectedIndex(0);
    debouncedSearch(query);
  };

  const isIdle = !searchQuery.trim();
  const combinedSaved = [...savedList.bookmarks, ...savedList.recent];
  const flatHits = flattenOutcome(outcome);
  const activeList: (SearchHit | SavedSearch)[] = isIdle ? combinedSaved : flatHits;
  const resultCount = activeList.length;

  const navigateTo = (url: string) => {
    onClose();
    router.push(url);
  };

  const handleSelect = (hit: SearchHit, headingSlug?: string) => {
    recordSearch({
      id: hit.url + (headingSlug || ''),
      title: hit.title,
      section: hit.section,
      url: hit.url + (headingSlug || ''),
    });
    navigateTo(hit.url + (headingSlug || ''));
  };

  const handleSelectSaved = (savedSearch: SavedSearch) => {
    navigateTo(savedSearch.url);
  };

  const handleToggleBookmark = (id: string) => {
    toggleBookmark(id);
    refreshSaved();
  };

  const handleRemoveSaved = (id: string) => {
    removeSearch(id);
    refreshSaved();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (resultCount === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((i) => (i + 1) % resultCount);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((i) => (i - 1 + resultCount) % resultCount);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = activeList[selectedIndex];
      if (!item) return;
      if (isSavedSearch(item)) {
        handleSelectSaved(item);
      } else {
        handleSelect(item);
      }
    }
  };

  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setOutcome(null);
      setSelectedIndex(0);
    } else {
      refreshSaved();
    }
  }, [open, refreshSaved]);

  useEffect(() => {
    if (!containerRef.current) return;

    const osInstance = OverlayScrollbars(containerRef.current, {
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
  }, [searchQuery]);

  useEffect(() => {
    if (!containerRef.current) return;
    const activeEl = containerRef.current.querySelector<HTMLElement>('[data-active="true"]');
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex, isIdle, outcome]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      position="top"
      offset="15vh"
      className="w-full h-auto max-w-[90vw] md:max-w-2xl max-h-[70vh] flex flex-col"
    >
      {/* Search Bar */}
      <div className="border-b border-outline-variant h-[55px] shrink-0">
        <div className="flex items-center gap-2 px-4 h-full">
          <Search className="w-5 h-5 text-on-surface-variant" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            disabled={indexStatus === 'loading'}
            className="w-full h-full bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant cursor-none"
            autoFocus
          />
          {indexStatus === 'loading' && <IndexingIndicator />}
          <kbd className="text-xs text-on-surface-variant p-1 border border-outline-variant rounded-md">
            esc
          </kbd>
        </div>
      </div>

      {/* Search Results */}
      <div ref={containerRef} data-lenis-prevent className="flex-1 min-h-0">
        <div className="h-full flex flex-col">
          {indexStatus === 'error' ? (
            <div className="flex items-center justify-center h-full min-h-[160px] flex-1">
              <p className="text-on-surface-variant text-md">Search is unavailable right now</p>
            </div>
          ) : isIdle ? (
            <RecentSearch
              recent={savedList.recent}
              bookmarks={savedList.bookmarks}
              selectedIndex={selectedIndex}
              onSelect={handleSelectSaved}
              onToggleBookmark={handleToggleBookmark}
              onRemove={handleRemoveSaved}
            />
          ) : outcome === null ? (
            <div className="flex items-center justify-center h-full min-h-[160px] flex-1">
              <p className="text-on-surface-variant text-md">Searching...</p>
            </div>
          ) : (
            <SearchResults
              outcome={outcome}
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>

      {/* Usage and tooltip */}
      <div className="border-t border-outline-variant h-[50px] shrink-0 font-mono text-xs text-on-surface-variant">
        <div className="flex items-center justify-between px-4 h-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CornerDownLeft className="w-4 h-4" aria-hidden="true" />
              <span>select</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
              <span>navigate</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
