/* Saved Searches utility functions */

export interface SavedSearch {
  id: string;
  title: string;
  section: 'docs' | 'blog';
  url: string;
  bookmark: boolean;
}

const STORAGE_KEY = 'mystic:saved-searches';
const MAX_SAVED_SEARCHES = 5;

function readAll(): SavedSearch[] {
  if (typeof window === 'undefined') return [];
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

function writeAll(searches: SavedSearch[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
  } catch {
    // Ignore write errors
  }
}

export function getSavedSearches(): { recent: SavedSearch[]; bookmarks: SavedSearch[] } {
  const searches = readAll();
  return {
    recent: searches.filter((s) => !s.bookmark),
    bookmarks: searches.filter((s) => s.bookmark),
  };
}

export function recordSearch(search: Omit<SavedSearch, 'bookmark'>): void {
  const searches = readAll();
  const existingIndex = searches.findIndex((s) => s.id === search.id);

  if (existingIndex !== -1) {
    // Move existing search to the front
    const existing = searches[existingIndex];
    searches.splice(existingIndex, 1);
    searches.unshift(existing);
    writeAll(searches);
    return;
  }

  // Add new search to the front
  const recent = searches.filter((s) => !s.bookmark);
  const bookmarks = searches.filter((s) => s.bookmark);
  const updatedRecent = [{ ...search, bookmark: false }, ...recent].slice(0, MAX_SAVED_SEARCHES);
  writeAll([...updatedRecent, ...bookmarks]);
}

export function toggleBookmark(searchId: string): void {
  const searches = readAll();
  const index = searches.findIndex((s) => s.id === searchId);
  if (index === -1) return;
  searches[index] = { ...searches[index], bookmark: !searches[index].bookmark };
  writeAll(searches);
}

export function removeSearch(searchId: string) {
  writeAll(readAll().filter((s) => s.id !== searchId));
}
