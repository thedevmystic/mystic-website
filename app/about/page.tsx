/* About Page */

import type { Metadata } from 'next';

import CreatorSection from './CreatorSection';
import ProjectSection from './ProjectSection';

export const metadata: Metadata = {
  title: 'About | Mystic Framework',
  description: 'Learn more about Mystic Framework and its creator.',
};

export default function AboutPage() {
  return (
    <div id="main-content" className="overflow-hidden pt-16">
      {/* Project Section */}
      <ProjectSection />
      <hr className="border-t border-on-surface-variant/10 mt-8 mb-8" />
      {/* Creator Section */}
      <CreatorSection />
      <hr className="border-none mb-8" />
    </div>
  );
}
