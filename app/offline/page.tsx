/* Privacy Policy */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "It seems you're offline | Mystic Framework",
  description:
    'Offline page for Mystic Framework. Please check your internet connection and try again. If the problem persists, you can reach out to us for assistance.',
};

export default function Offline() {
  return (
    <div id="main-content" className="overflow-hidden pt-16 min-h-screen">
      <section className="relative z-0 bg-surface px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-16">
          <div
            className="flex flex-col items-start gap-y-2 rounded-md focus-visible:outline-2 focus-visible:outline-primary"
            tabIndex={0}
          >
            <div className="font-mono text-sm tracking-wide uppercase text-primary">Offline</div>
            <h2 className="text-2xl md:text-3xl font-semibold text-on-surface">
              It seems you&apos;re offline
            </h2>
            <p className="text-md text-on-surface-variant max-w-2xl leading-relaxed">
              Please check your internet connection and try again. If the problem persists, you can
              reach out to us for assistance. We apologize for any inconvenience caused and
              appreciate your understanding.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
