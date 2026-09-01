/* Navbar Component */

'use client';

import { useState, useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

import { Search, Sun, Moon, Monitor, Menu, X } from 'lucide-react';

import { Github } from '@/components/BrandIcon';
import Button from '@/components/Button';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import SearchModal from '@/components/SearchModal';
import { useTheme } from '@/styles/ThemeProvider';
import Constants from '@/utils/Constants';

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

// Scroll distance (px) after which the home-page header stops being transparent.
const SCROLL_THRESHOLD = 40;

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
      <Button variant="circular" onClick={handleClick} className="!text-on-surface-variant">
        <Link
          href={href}
          ref={linkRef}
          variant="no-underline"
          tabIndex={-1}
          target="_blank"
          removeSpan
          noHover
        >
          <Github size={18} />
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="inherit-color" onClick={handleClick}>
      <Link href={href} ref={linkRef} variant="no-underline" noHover tabIndex={-1}>
        {label}
      </Link>
    </Button>
  );
}

export default function Navbar() {
  const { token: theme, setToken: setTheme } = useTheme();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled;

  const handleThemeToggle = () => {
    if (theme === 'light') {
      setTheme('system');
    } else if (theme === 'system') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isHome) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 h-[50px]
          flex items-center justify-between gap-x-4 px-4 md:px-8
          text-on-surface-variant transition-colors duration-300 ease-in-out
          ${
            isTransparent
              ? 'bg-transparent border-b border-transparent'
              : 'bg-surface border-b border-outline-variant'
          }
        `}
      >
        {/* Logo */}
        <Link href="/" variant="no-underline" noHover>
          <div className="flex items-center gap-2">
            <Logo size={32} />
            <span className="font-sans italic text-lg font-medium text-on-surface">
              mystic framework
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-x-1 text-sans text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} {...item} />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-x-2">
          <Button
            variant="circular"
            aria-label="Open search"
            className="!text-on-surface-variant"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={18} />
          </Button>

          <span className="hidden md:inline-flex">
            <NavLink label="GitHub" href={Constants.Links.Org} githubIconOnly />
          </span>

          <Button
            variant="circular"
            aria-label="Change theme"
            className="!text-on-surface-variant"
            onClick={handleThemeToggle}
          >
            {theme === 'light' ? (
              <Sun size={18} aria-label="Light theme" />
            ) : theme === 'dark' ? (
              <Moon size={18} aria-label="Dark theme" />
            ) : (
              <Monitor size={18} aria-label="System theme" />
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
          bg-surface text-on-surface-variant border-outline-variant
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
