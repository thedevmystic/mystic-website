/* Recent searches and bookmarks for the search modal */

'use client';

import { SquareText, BookText, Star, X } from 'lucide-react';

import type { SavedSearch } from '@/utils/savedSearches';

interface RecentSearchProps {
  recent: SavedSearch[];
  bookmarks: SavedSearch[];
  selectedIndex: number;
  onSelect: (item: SavedSearch) => void;
  onToggleBookmark: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function RecentSearch({
  recent,
  bookmarks,
  selectedIndex,
  onSelect,
  onToggleBookmark,
  onRemove,
}: RecentSearchProps) {
  const handleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onToggleBookmark(id);
  };

  const handleRemoveClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onRemove(id);
  };

  if (recent.length === 0 && bookmarks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[160px] flex-1">
        <p className="text-on-surface-variant text-md">No Recent Results</p>
      </div>
    );
  }

  const renderGroup = (items: SavedSearch[], label: string, offset: number) => {
    if (!items.length) return null;
    return (
      <div>
        <p className="text-xs text-on-surface-variant px-4 pt-2 pb-1">{label}</p>
        {items.map((item, i) => {
          const ItemIcon = item.section === 'blog' ? SquareText : BookText;
          const active = selectedIndex === offset + i;
          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              data-active={active || undefined}
              className={`group flex items-center gap-3 px-4 py-2 mx-2 rounded-lg ${
                active ? 'bg-surface-container-high' : 'hover:bg-surface-container-high'
              }`}
            >
              <ItemIcon className="w-4 h-4 text-on-surface-variant shrink-0" aria-hidden="true" />
              <p className="flex-1 min-w-0 truncate text-sm text-on-surface">{item.title}</p>
              <button
                type="button"
                onClick={(e) => handleBookmark(e, item.id)}
                className={`transition-opacity focus:opacity-100 cursor-none ${
                  active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
                aria-label={item.bookmark ? 'Remove bookmark' : 'Bookmark this result'}
              >
                <Star
                  className={`w-4 h-4 ${
                    item.bookmark ? 'fill-primary text-primary' : 'text-on-surface-variant'
                  }`}
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={(e) => handleRemoveClick(e, item.id)}
                className={`transition-opacity focus:opacity-100 cursor-none ${
                  active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
                aria-label="Remove from recent"
              >
                <X className="w-4 h-4 text-on-surface-variant" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex-1 min-h-[160px] py-2">
      {renderGroup(bookmarks, 'bookmarked', 0)}
      {renderGroup(recent, 'recent', bookmarks.length)}
    </div>
  );
}
