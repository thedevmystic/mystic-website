/* Contact Page */

import type { Metadata } from 'next';

import SocialLinksTray from './SocialLinksTray';

export const metadata: Metadata = {
  title: 'Contact | Mystic Framework',
  description:
    "Questions, feedback, or just want to follow progress on Mystic Framework — here's where to find me.",
};

export default function ContactPage() {
  return (
    <div className="overflow-hidden pt-16">
      <section className="relative z-0 bg-surface py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col items-start gap-y-2">
            <div className="font-mono text-sm tracking-wide uppercase text-primary">Contact</div>
            <h2 className="text-2xl md:text-3xl font-semibold text-on-surface">Find Me Online</h2>
            <p className="text-md text-on-surface-variant max-w-2xl leading-relaxed">
              Questions, feedback, or just want to follow progress on Mystic Framework — here&apos;s
              where to find me.
            </p>
          </div>
          <SocialLinksTray />
        </div>
      </section>
    </div>
  );
}
