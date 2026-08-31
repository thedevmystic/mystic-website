/* About Page */

import ProjectSection from './ProjectSection';
import CreatorSection from './CreatorSection';

export default function AboutPage() {
  return (
    <div className="overflow-hidden pt-16">
      {/* Project Section */}
      <ProjectSection />
      <hr className="border-t border-on-surface-variant/10 mt-8 mb-8" />
      {/* Creator Section */}
      <CreatorSection />
      <hr className="border-none mb-8" />
    </div>
  );
}
