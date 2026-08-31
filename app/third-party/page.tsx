/* Third Party Notices Page */

import Link from '@/components/Link';

const dependencies = [
  { name: '@mdx-js/loader', license: 'MIT' },
  { name: '@mdx-js/react', license: 'MIT' },
  { name: '@next/mdx', license: 'MIT' },
  { name: '@tailwindcss/postcss', license: 'MIT' },
  { name: '@types/mdx', license: 'MIT' },
  { name: '@types/node', license: 'MIT' },
  { name: '@types/react', license: 'MIT' },
  { name: '@types/react-dom', license: 'MIT' },
  { name: 'babel-plugin-react-compiler', license: 'MIT' },
  { name: 'eslint', license: 'MIT' },
  { name: 'eslint-config-next', license: 'MIT' },
  { name: 'eslint-plugin-import-x', license: 'ISC' },
  { name: 'eslint-plugin-react', license: 'MIT' },
  { name: 'eslint-plugin-react-hooks', license: 'MIT' },
  { name: 'GitHub Pages', license: 'Proprietary' },
  { name: 'gray-matter', license: 'MIT' },
  { name: 'katex', license: 'MIT' },
  { name: 'lenis', license: 'MIT' },
  { name: 'lucide-react', license: 'ISC' },
  { name: 'minisearch', license: 'MIT' },
  { name: 'next', license: 'MIT' },
  { name: 'next-cloudinary', license: 'MIT' },
  { name: 'next-tokens', license: 'MIT' },
  { name: 'nextjs-toploader', license: 'MIT' },
  { name: 'overlayscrollbars', license: 'MIT' },
  { name: 'overlayscrollbars-react', license: 'MIT' },
  { name: 'postcss', license: 'MIT' },
  { name: 'prettier', license: 'MIT' },
  { name: 'react', license: 'MIT' },
  { name: 'react-dom', license: 'MIT' },
  { name: 'rehype-autolink-headings', license: 'MIT' },
  { name: 'rehype-external-links', license: 'MIT' },
  { name: 'rehype-katex', license: 'MIT' },
  { name: 'rehype-slug', license: 'MIT' },
  { name: 'remark-frontmatter', license: 'MIT' },
  { name: 'remark-gfm', license: 'MIT' },
  { name: 'remark-github-blockquote-alert', license: 'MIT' },
  { name: 'remark-math', license: 'MIT' },
  { name: 'remark-mdx-frontmatter', license: 'MIT' },
  { name: 'rimraf', license: 'ISC' },
  { name: 'scroll-utils', license: 'MIT' },
  { name: 'shiki', license: 'MIT' },
  { name: 'tailwindcss', license: 'MIT' },
  { name: 'typescript', license: 'Apache-2.0' },
  { name: 'typescript-eslint', license: 'MIT' },
];

export default function ThirdParty() {
  return (
    <div id="main-content" className="overflow-hidden pt-16">
      <section className="relative z-0 bg-surface px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-12">
          <div
            className="flex flex-col items-start gap-y-2 rounded-md focus-visible:outline-2 focus-visible:outline-primary"
            tabIndex={0}
          >
            <div className="font-mono text-sm tracking-wide uppercase text-primary">Legal</div>
            <h2 className="text-2xl md:text-3xl font-semibold text-on-surface">
              Third-Party Notices
            </h2>
            <p className="text-md text-on-surface-variant max-w-2xl leading-relaxed">
              This project incorporates third-party software components and hosting services. Below
              is the list of third-party dependencies and services used, sorted alphabetically.
            </p>
            <p className="text-md text-on-surface-variant max-w-2xl leading-relaxed">
              To see the license under which this website is published, please visit{' '}
              <Link variant="underline" href="/license">
                License Page
              </Link>
              .
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-outline/20">
            <table className="w-full text-left text-sm text-on-surface">
              <thead className="bg-surface-variant/40 font-mono text-xs uppercase text-on-surface-variant border-b border-outline/20">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Package / Service
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    License
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/10">
                {dependencies.map((dep, index) => {
                  const isOdd = index % 2 === 1;
                  return (
                    <tr
                      key={dep.name}
                      className={`
                        ${isOdd ? 'bg-surface-variant/10' : 'bg-surface'}
                        hover:bg-surface-variant/20 transition-colors
                      `}
                    >
                      <td className="px-6 py-4 font-medium font-mono text-primary">{dep.name}</td>
                      <td className="px-6 py-4 font-mono text-on-surface-variant">{dep.license}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
