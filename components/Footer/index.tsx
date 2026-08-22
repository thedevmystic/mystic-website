/* Footer Component */

'use client';

import Image from 'next/image';
import { ArrowUp, Mail } from 'lucide-react';

import { createScrollHandler } from 'scroll-utils';

import Constants from '@/lib/constants';

import Link from '@/components/Link';
import Button from '@/components/Button';
import BrandIcon from '@/components/BrandIcon';

interface LinkGroupProps {
  href: string;
  text: string;
}

interface SocialLinkProps {
  href: string;
  label: string;
  variant: 'github' | 'twitter' | 'bluesky' | 'linkedin';
}

const SITEMAP_LINKS_GROUP: LinkGroupProps[] = [
  { href: '/home', text: 'Home' },
  { href: '/docs', text: 'Docs' },
  { href: '/roadmap', text: 'Roadmap' },
  { href: Constants.Links.Org, text: 'GitHub' },
  { href: '/about', text: 'About' },
];

const RESOURCES_LINKS_GROUP: LinkGroupProps[] = [
  { href: '/docs/getting-started', text: 'Getting Started' },
  { href: '/docs/faqs', text: 'FAQs' },
  { href: '/docs/changelog', text: 'Changelog' },
  { href: '/docs/styleguide', text: 'Style Guide' },
  { href: '/contact', text: 'Contact' },
];

const LEGAL_LINKS_GROUP: LinkGroupProps[] = [
  { href: Constants.Links.SourceCode, text: 'View Source' },
  { href: Constants.Links.Org, text: 'Visit Organization' },
  { href: '/privacy', text: 'Privacy Policy' },
  { href: '/license', text: 'License' },
  { href: '/third-party', text: 'Third Party' },
];

const SOCIAL_LINKS: SocialLinkProps[] = [
  { href: Constants.Links.Org, label: 'GitHub', variant: 'github' },
  { href: Constants.SocialLinks.Twitter, label: 'Twitter', variant: 'twitter' },
  { href: Constants.SocialLinks.Bluesky, label: 'Bluesky', variant: 'bluesky' },
  { href: Constants.SocialLinks.LinkedIn, label: 'LinkedIn', variant: 'linkedin' },
];

function LinkGroup({ title, links }: { title: string; links: LinkGroupProps[] }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-on-surface-variant mb-2.5">{title}</p>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.text}
            href={link.href}
            variant="no-underline"
            removeSpan
            className="text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const handleScrollToTop = createScrollHandler({ position: 'top' });
  const handleScroll = () => {
    handleScrollToTop();
    window.dispatchEvent(new CustomEvent('mouse-snap-end'));
  };

  return (
    <footer className="bg-surface-container border-t border-outline-variant">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-6">
        <div className="flex flex-wrap items-start justify-between gap-8 mb-10">
          <div className="max-w-xs min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Image src="/logo.svg" alt="" width={24} height={24} aria-hidden="true" />
              <span className="text-md font-serif text-on-surface">Mystic Framework</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-normal">
              Performant. Elegant. Simply Mystic. A modern C++ framework built for speed and
              clarity.
            </p>
            <div className="flex items-center gap-2 mt-4">
              {SOCIAL_LINKS.map((social) => (
                <Button
                  key={social.label}
                  variant="circular"
                  className="p-2"
                  aria-label={social.label}
                >
                  <Link href={social.href} target="_blank" variant="no-underline" removeSpan>
                    <BrandIcon
                      variant={social.variant}
                      className="size-4 text-on-surface-variant"
                    />
                  </Link>
                </Button>
              ))}
              <Button variant="circular" className="p-2" aria-label="Email">
                <Link href={`mailto:${Constants.Email}`} variant="no-underline" removeSpan>
                  <Mail className="size-4 text-on-surface-variant" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 flex-1 min-w-[320px] max-w-[480px]">
            <LinkGroup title="Sitemap" links={SITEMAP_LINKS_GROUP} />
            <LinkGroup title="Resources" links={RESOURCES_LINKS_GROUP} />
            <LinkGroup title="Legal" links={LEGAL_LINKS_GROUP} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap border-t border-outline-variant pt-3.5">
          <p className="text-xs text-on-surface-variant">
            &copy; {new Date().getFullYear()} Suryansh Singh (thedevmystic). All rights reserved.
          </p>
          <Button
            variant="outline"
            className="rounded-md p-2 text-sm gap-1.5"
            onClick={handleScroll}
          >
            <ArrowUp className="size-3.5" aria-hidden="true" />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
}
