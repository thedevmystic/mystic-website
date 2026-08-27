/* Skip to main content link component */

'use client';

import Link from '@/components/Link';

export default function SkipToMainContent() {
  const handleSkipToMainContent = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
      history.pushState(null, '', '#main-content');
    }
  };

  return (
    <Link
      href="#main-content"
      variant="no-underline"
      className="absolute top-[-40px] left-[10px] p-0 bg-surface text-on-surface font-mono z-[200] focus:top-[10px]"
      onClick={handleSkipToMainContent}
    >
      Skip to main content
    </Link>
  );
}
