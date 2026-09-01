/* Search results */

'use client';

import { SquareText, BookText, Hash, CornerDownLeft } from 'lucide-react';

import type { SearchHit, SearchResult as SearchOutcome } from '@/utils/search';

interface SearchResultsProps {
  outcome: SearchOutcome;
  selectedIndex: number;
  onSelect: (hit: SearchHit, headingSlug?: string) => void;
}

function slugify(text: string): string {
  return (
    '#' +
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  );
}

function ResultRow({
  hit,
  active,
  onSelect,
}: {
  hit: SearchHit;
  active: boolean;
  onSelect: (hit: SearchHit, headingSlug?: string) => void;
}) {
  const Icon = hit.section === 'blog' ? SquareText : BookText;
  return (
    <div
      onClick={() => onSelect(hit)}
      data-active={active || undefined}
      className={`px-4 py-2 mx-2 rounded-lg ${
        active ? 'bg-surface-container-high' : 'hover:bg-surface-container-high'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-on-surface-variant shrink-0" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-on-surface truncate">{hit.title}</p>
          <p className="text-xs text-on-surface-variant truncate">{hit.url}</p>
        </div>
        {active && (
          <CornerDownLeft className="w-4 h-4 text-on-surface-variant shrink-0" aria-hidden="true" />
        )}
      </div>
      {hit.matchedHeadings.length > 0 && (
        <div className="mt-1 pl-7 border-t border-dashed border-outline-variant pt-1 flex flex-col gap-1">
          {hit.matchedHeadings.map((heading) => (
            <div
              key={heading}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(hit, slugify(heading));
              }}
              className="flex items-center gap-2 hover:text-on-surface"
            >
              <span className="text-xs text-on-surface-variant font-mono">└</span>
              <Hash className="w-3.5 h-3.5 text-on-surface-variant shrink-0" aria-hidden="true" />
              <span className="text-xs text-on-surface-variant truncate">{heading}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full min-h-[160px] flex-1">
      <p className="text-on-surface-variant text-md">No results found</p>
    </div>
  );
}

export default function SearchResults({ outcome, selectedIndex, onSelect }: SearchResultsProps) {
  if (outcome.scoped) {
    if (outcome.results.length === 0) return <EmptyState />;
    return (
      <div className="flex-1 min-h-[160px] py-2">
        {outcome.results.map((hit, i) => (
          <ResultRow key={hit.url} hit={hit} active={selectedIndex === i} onSelect={onSelect} />
        ))}
      </div>
    );
  }

  const { docs, blog } = outcome.results;
  if (docs.length === 0 && blog.length === 0) return <EmptyState />;

  return (
    <div className="flex-1 min-h-[160px] py-2">
      {docs.length > 0 && (
        <div>
          <p className="text-xs text-on-surface-variant px-4 pt-2 pb-1">docs</p>
          {docs.map((hit, i) => (
            <ResultRow key={hit.url} hit={hit} active={selectedIndex === i} onSelect={onSelect} />
          ))}
        </div>
      )}
      {blog.length > 0 && (
        <div>
          <p className="text-xs text-on-surface-variant px-4 pt-2 pb-1">blog</p>
          {blog.map((hit, i) => (
            <ResultRow
              key={hit.url}
              hit={hit}
              active={selectedIndex === docs.length + i}
              onSelect={onSelect}
            />
          ))}
          <span className="block h-2" />
        </div>
      )}
    </div>
  );
}
