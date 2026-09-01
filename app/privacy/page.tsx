/* Privacy Policy */

import type { Metadata } from 'next';

import Link from '@/components/Link';

interface PrrivacySection {
  title: string;
  description: string;
  thirdPartyPolicy?: { name: string; url: string };
}

const privacySections: PrrivacySection[] = [
  {
    title: 'Data Collection & Analytics',
    description:
      'It does not use any third-party analytics tools (such as Google Analytics), tracking scripts, or cookies. It also does not collect, store, or solicit personal information from visitors on this site.',
  },
  {
    title: 'Website Hosting & Server Logs',
    description:
      "The website is hosted on GitHub Pages, which may collect server logs for security and performance purposes. These logs may include your IP address, browser type, and access times. However, this information is not linked to any personal data and is used solely for maintaining the website's functionality.",
    thirdPartyPolicy: {
      name: 'GitHub Privacy Policy',
      url: 'https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement',
    },
  },
  {
    title: 'Media Delivery',
    description:
      "Images and other media assets on the website are delivered through Cloudinary. Cloudinary may collect certain data for performance optimization and security purposes. It may include information such as your IP address, browser type, and access times. However, this data is not linked to any personal data is solely used for maintaining website's functionality.",
    thirdPartyPolicy: { name: 'Cloudinary Privacy Policy', url: 'https://cloudinary.com/privacy' },
  },
  {
    title: 'External Links',
    description:
      'The website may contain links to external websites. Please note that this privacy policy does not apply to those external sites. We encourage you to review the privacy policies of any third-party websites you visit.',
  },
  {
    title: 'Changes to This Privacy Policy',
    description:
      'We reserve the right to update or modify this privacy policy at any time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically for any updates. For any questions or concerns regarding this privacy policy, please contact us through the provided contact information on the website.',
  },
];

export const metadata: Metadata = {
  title: 'Privacy Policy | Mystic Framework',
  description:
    'Privacy Policy for Mystic Framework website, outlining data collection, usage, and protection practices.',
};

const LAST_UPDATED_DATE = '31st August 2026 (UTC)';

export default function PrivacyPolicy() {
  return (
    <div id="main-content" className="overflow-hidden pt-16">
      <section className="relative z-0 bg-surface px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-16">
          <div
            className="flex flex-col items-start gap-y-2 rounded-md focus-visible:outline-2 focus-visible:outline-primary"
            tabIndex={0}
          >
            <div className="font-mono text-sm tracking-wide uppercase text-primary">
              Privacy Policy
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-on-surface">
              Your Privacy Matters
            </h2>
            <p className="text-md text-on-surface-variant max-w-2xl leading-relaxed">
              This website is a static site hosted on GitHub Pages. It values your privacy and is
              committed to protecting your personal information. This privacy policy outlines how it
              collect, use, and safeguard your data when you interact with the website. By using the
              website, you consent to the practices described in this policy.
            </p>
            <p className="text-md text-on-surface font-medium max-w-2xl leading-relaxed">
              Last Updated: {LAST_UPDATED_DATE}
            </p>
          </div>
          <div className="flex flex-col gap-16">
            {privacySections.map((section, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-primary"
                tabIndex={0}
              >
                <h3 className="font-sans font-semibold text-xl text-on-surface">{section.title}</h3>
                <p className="text-md text-on-surface-variant leading-relaxed">
                  {section.description}
                </p>
                {section.thirdPartyPolicy && (
                  <p className="text-md text-on-surface-variant leading-relaxed">
                    For more information, please refer to the{' '}
                    <Link variant="underline" href={section.thirdPartyPolicy.url} target="_blank">
                      {section.thirdPartyPolicy.name}
                    </Link>
                    .
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
