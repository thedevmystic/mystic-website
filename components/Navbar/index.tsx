/* Navbar Component */

'use client';

import { useState, useRef } from 'react';

import { Search, Sun, Moon, Monitor, Menu, X } from 'lucide-react';

import { Github } from '@/components/BrandIcon';
import Button from '@/components/Button';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import SearchModal from '@/components/SearchModal';
import Constants from '@/lib/constants';
import { useTheme } from '@/styles/ThemeProvider';

interface NavItem {
  label: string;
  href: string;
  isMobile?: boolean;
  githubIconOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: '/docs' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function NavLink({ label, href, isMobile, githubIconOnly }: NavItem) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const handleClick = () => {
    linkRef.current?.click();
  };

  if (isMobile) {
    return (
      <Link href={href} variant="no-underline">
        {label}
      </Link>
    );
  }

  if (githubIconOnly) {
    return (
      <Button variant="circular" onClick={handleClick}>
        <Link href={href} ref={linkRef} variant="no-underline" target="_blank" removeSpan noHover>
          <Github size={20} />
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="ui" onClick={handleClick}>
      <Link href={href} ref={linkRef} variant="no-underline" noHover>
        {label}
      </Link>
    </Button>
  );
}

export default function Navbar() {
  const { token: theme, setToken: setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleThemeToggle = () => {
    if (theme === 'light') {
      setTheme('system');
    } else if (theme === 'system') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <>
      <nav
        className="
          sticky top-0 z-50 h-[50px]
          grid grid-cols-[1fr_1fr] md:grid-cols-[2fr_3fr_1fr]
          items-center gap-x-4 px-4 md:px-6
          bg-surface text-on-surface border-b border-outline-variant
        "
      >
        {/* Logo */}
        <Link href="/" variant="no-underline" className="justify-self-start" noHover>
          <div className="flex items-center gap-1">
            <Logo size={32} />
            <span className="font-sans italic text-lg font-medium">mystic framework</span>
          </div>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center justify-center gap-x-1 col-start-2 text-sans text-md">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} {...item} />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-x-2 col-start-2 md:col-start-3">
          <Button variant="circular" aria-label="Open search" onClick={() => setIsSearchOpen(true)}>
            <Search size={20} />
          </Button>

          <span className="hidden md:inline-flex">
            <NavLink label="GitHub" href={Constants.Links.Org} githubIconOnly />
          </span>

          <Button variant="circular" aria-label="Change theme" onClick={handleThemeToggle}>
            {theme === 'light' ? (
              <Sun size={20} aria-label="Light theme" />
            ) : theme === 'dark' ? (
              <Moon size={20} aria-label="Dark theme" />
            ) : (
              <Monitor size={20} aria-label="System theme" />
            )}
          </Button>

          {/* Hamburger — mobile only */}
          <span className="md:hidden">
            <Button
              variant="circular"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </span>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`
          fixed top-0 left-0 right-0 pt-[50px] z-45
          md:hidden transition-all duration-500 ease-in-out
          bg-surface text-on-surface border-outline-variant
          ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0 invisible'}
          overflow-hidden
        `}
      >
        <div className="flex flex-col items-end gap-y-1 px-4 py-3 text-sans border-b border-outline-variant">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} {...item} isMobile />
          ))}
        </div>
      </div>

      <SearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
