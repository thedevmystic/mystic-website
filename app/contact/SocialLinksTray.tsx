/* Social Links tray for contact page. */

'use client';

import type { ComponentType, SVGProps } from 'react';

import { Mail } from 'lucide-react';

import {
  Github,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
  Bluesky,
  Substack,
  Orcid,
} from '@/components/BrandIcon';
import Constants from '@/utils/Constants';

interface SocialLinkProps {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  colSpan?: string;
  styleVariant?: string;
}

const SOCIAL_LINKS: SocialLinkProps[] = [
  {
    href: Constants.Links.Org,
    label: 'GitHub - Mystic Framework',
    icon: Github,
    colSpan: 'md:col-span-3',
    styleVariant: 'border-primary/40 bg-primary/5',
  },
  {
    href: Constants.SocialLinks.LinkedIn,
    label: 'LinkedIn',
    icon: LinkedIn,
    colSpan: 'md:col-span-2',
  },
  {
    href: Constants.SocialLinks.GitHub,
    label: 'GitHub - thedevmystic',
    icon: Github,
    colSpan: 'md:col-span-1',
    styleVariant: 'border-primary/40 bg-primary/5',
  },
  {
    href: Constants.SocialLinks.Twitter,
    label: 'X / Twitter',
    icon: Twitter,
    colSpan: 'md:col-span-1',
    styleVariant: 'border-primary/40 bg-primary/5',
  },
  {
    href: Constants.SocialLinks.Instagram,
    label: 'Instagram',
    icon: Instagram,
    colSpan: 'md:col-span-1',
  },
  {
    href: Constants.SocialLinks.Youtube,
    label: 'YouTube',
    icon: YouTube,
    colSpan: 'md:col-span-1',
  },
  {
    href: Constants.SocialLinks.Bluesky,
    label: 'Bluesky',
    icon: Bluesky,
    colSpan: 'md:col-span-1',
  },
  {
    href: Constants.SocialLinks.Substack,
    label: 'Substack',
    icon: Substack,
    colSpan: 'md:col-span-2',
    styleVariant: 'border-primary/40 bg-primary/5',
  },
  {
    href: Constants.SocialLinks.Orcid,
    label: 'ORCID',
    icon: Orcid,
    colSpan: 'md:col-span-2',
    styleVariant: 'border-primary/40 bg-primary/5',
  },
  {
    href: `mailto:${Constants.Email}`,
    label: 'Email',
    icon: Mail,
    colSpan: 'md:col-span-1',
  },
];

export default function SocialLinksTray() {
  const dispatchEvent = (eventName: string) => {
    const event = new CustomEvent(eventName);
    window.dispatchEvent(event);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {SOCIAL_LINKS.map((link) => {
        const Icon = link.icon;

        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            onMouseEnter={() => dispatchEvent('mouse-hover-start')}
            onMouseLeave={() => dispatchEvent('mouse-hover-end')}
            rel="noopener noreferrer"
            className={`rounded-lg border cursor-none px-3 py-2 flex flex-row items-center gap-x-2 transition-all duration-300 hover:translate-y-[-2px] hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-primary ${
              link.colSpan ?? 'md:col-span-1'
            } ${link.styleVariant ?? 'border-outline-variant bg-surface-container-low'}`}
          >
            <Icon className="w-4 h-4 text-on-surface shrink-0" />
            <h3 className="font-sans font-medium text-sm text-on-surface">{link.label}</h3>
          </a>
        );
      })}
    </div>
  );
}
