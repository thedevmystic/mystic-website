/* About Page — Project Section */

'use client';

import { CldImage } from 'next-cloudinary';

interface ProjectHighlight {
  title: string;
  description: string;
  imagePublicId: string;
  imageAlt: string;
}

const projectHighlights: ProjectHighlight[] = [
  {
    title: 'Started as a Learning Project',
    description:
      'There are always new things to learn in life. Mystic Framework started as a learning project, an excuse to learn inner workings of C++. It since has grown into a passion project where I want to test if I can deliver production-grade code solely.',
    imagePublicId: 'about-project-section-1_ceh0uv',
    imageAlt: 'About - Section 1',
  },
  {
    title: 'Cutting-Edge Modern Design',
    description:
      "I always loved the idea of 'bleeding-edge technology'. So, my projects started to use the most modern features available in a language, but still I never sacrificed stability. All of Mystic Framework is stable as it gets once it's been implemented.",
    imagePublicId: 'about-project-section-2_jjljdn',
    imageAlt: 'About - Section 2',
  },
  {
    title: 'Long Live Open Source',
    description:
      'Open source is the foundation of entire software. Everyone uses it without any cost, so I decided to give it back something. Mystic Framework is entirely open sourced — free to use, free to change, and free to learn from!.',
    imagePublicId: 'about-project-section-3_vij1xp',
    imageAlt: 'About - Section 3',
  },
  {
    title: 'Getting Better Every Day',
    description:
      'Software is never perfect. If someone says otherwise, they are lying. Mystic Framework gets better every day, bug fixes, performance enhancements, and many others.',
    imagePublicId: 'about-project-section-4_mafnso',
    imageAlt: 'About - Section 4',
  },
];

export default function ProjectSection() {
  return (
    <section className="relative z-0 bg-surface py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col items-start gap-y-2">
          <div className="font-mono text-sm tracking-wide uppercase text-primary">The Project</div>
          <h2
            className="text-2xl md:text-3xl font-semibold text-on-surface focus:outline-2 focus:outline-primary"
            tabIndex={0}
          >
            Why Mystic Framework Exists
          </h2>
          <p className="text-md text-on-surface-variant max-w-2xl leading-relaxed">
            Most performance-focused frameworks sacrifice readability, most elegant APIs sacrifice
            performance &mdash; but MFW&apos;s whole existence is a refusal to accept that tradeoff.
            It believes C++ is capable of delivering speed with clarity, and everything about it
            works to accomplish that goal. Nothing is forced on you that you don&apos;t need,
            everything is opt-in and modular, as it should be.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {projectHighlights.map((item, index) => {
            const imageFirst = index % 2 === 0;

            return (
              <div key={item.title} className="flex flex-col lg:flex-row items-center gap-8">
                <div
                  className={`w-full lg:w-1/2 order-1 ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="overflow-hidden rounded-xl border border-outline-variant w-full">
                    <div className="relative w-full aspect-video">
                      <CldImage
                        src={item.imagePublicId}
                        alt={item.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`w-full lg:w-1/2 order-2 flex flex-col items-start justify-start gap-y-3 ${
                    imageFirst ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <h3 className="font-sans font-semibold text-xl text-on-surface">{item.title}</h3>
                  <p className="text-md text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
