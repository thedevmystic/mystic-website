/* Pagination component */

'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import Link from '@/components/Link';

interface PaginationProps {
  prev?: string;
  next?: string;
}

export default function Pagination({ prev, next }: PaginationProps) {
  return (
    <div className="flex justify-between pb-8 px-4">
      {prev ? (
        <Link
          href={prev}
          variant="no-underline"
          className="inline-flex items-center gap-2 text-sm font-mono"
          underlineOnHover
        >
          <ChevronLeft className="w-4 h-4 shrink-0 self-center" />
          <span className="leading-none">Previous</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next}
          variant="no-underline"
          className="inline-flex items-center gap-2 text-sm font-mono"
          underlineOnHover
        >
          <span className="leading-none">Next</span>
          <ChevronRight className="w-4 h-4 shrink-0 self-center" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
