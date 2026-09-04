/* Home Page */

import HeroSection from './HeroSection';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />
      <hr className="border-t border-on-surface-variant/10 mb-8" />
      {/* Section 1: Design Principles */}
      <Section1 />
      <hr className="border-t border-on-surface-variant/10 mt-8 mb-8" />
      {/* Section 2: Why Modules? */}
      <Section2 />
      <hr className="border-t border-on-surface-variant/10 mt-8 mb-8" />
      {/* Section 3: Quickstart */}
      <Section3 />
      <hr className="border-t border-on-surface-variant/10 mt-8 mb-8" />
      {/* Section 4: Available Modules */}
      <Section4 />
      <hr className="border-t border-on-surface-variant/10 mt-8 mb-8" />
      {/* Section 5: Get Started */}
      <Section5 />
      <hr className="border-none mb-8" />
    </div>
  );
}
