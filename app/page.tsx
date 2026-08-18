import Button from '@/components/Button';
import CodeBlock from '@/components/CodeBlock';
import Link from '@/components/Link';

const TYPE_SCALE = [
  { label: 'xs', className: 'text-xs' },
  { label: 'sm', className: 'text-sm' },
  { label: 'md', className: 'text-md' },
  { label: 'lg', className: 'text-lg' },
  { label: 'xl', className: 'text-xl' },
  { label: '2xl', className: 'text-2xl' },
  { label: '3xl', className: 'text-3xl' },
  { label: '4xl', className: 'text-4xl' },
] as const;
const TYPE_FAMILIES = [
  { label: 'Serif — Fraunces', className: 'font-serif' },
  { label: 'Sans — IBM Plex Sans', className: 'font-sans' },
  { label: 'Mono — JetBrains Mono', className: 'font-mono' },
] as const;

const CODE = `
#include <iostream>

int main() {
  std::cout << "Hello, World!" << std::endl;
  return 0;
}
`.trim();

type Swatch = {
  name: string;
  bg: string;
  on: string;
};

type SwatchGroup = {
  title: string;
  swatches: Swatch[];
};

const SWATCH_GROUPS: SwatchGroup[] = [
  {
    title: 'Primary',
    swatches: [
      { name: 'primary', bg: 'bg-primary', on: 'text-on-primary' },
      { name: 'primary-container', bg: 'bg-primary-container', on: 'text-on-primary-container' },
    ],
  },
  {
    title: 'Secondary',
    swatches: [
      { name: 'secondary', bg: 'bg-secondary', on: 'text-on-secondary' },
      {
        name: 'secondary-container',
        bg: 'bg-secondary-container',
        on: 'text-on-secondary-container',
      },
    ],
  },
  {
    title: 'Tertiary',
    swatches: [
      { name: 'tertiary', bg: 'bg-tertiary', on: 'text-on-tertiary' },
      { name: 'tertiary-container', bg: 'bg-tertiary-container', on: 'text-on-tertiary-container' },
    ],
  },
  {
    title: 'Error',
    swatches: [
      { name: 'error', bg: 'bg-error', on: 'text-on-error' },
      { name: 'error-container', bg: 'bg-error-container', on: 'text-on-error-container' },
    ],
  },
  {
    title: 'Neutral surface',
    swatches: [
      { name: 'surface', bg: 'bg-surface', on: 'text-on-surface' },
      { name: 'surface-variant', bg: 'bg-surface-variant', on: 'text-on-surface-variant' },
      { name: 'inverse-surface', bg: 'bg-inverse-surface', on: 'text-inverse-on-surface' },
      { name: 'inverse-primary', bg: 'bg-inverse-primary', on: 'text-on-primary-container' },
    ],
  },
  {
    title: 'Fixed (theme-stable)',
    swatches: [
      { name: 'primary-fixed', bg: 'bg-primary-fixed', on: 'text-on-primary-fixed' },
      { name: 'secondary-fixed', bg: 'bg-secondary-fixed', on: 'text-on-secondary-fixed' },
      { name: 'tertiary-fixed', bg: 'bg-tertiary-fixed', on: 'text-on-tertiary-fixed' },
    ],
  },
];

const SURFACE_CONTAINERS = [
  { label: 'dim', bg: 'bg-surface-dim' },
  { label: 'lowest', bg: 'bg-surface-container-lowest' },
  { label: 'low', bg: 'bg-surface-container-low' },
  { label: 'container', bg: 'bg-surface-container' },
  { label: 'high', bg: 'bg-surface-container-high' },
  { label: 'highest', bg: 'bg-surface-container-highest' },
  { label: 'bright', bg: 'bg-surface-bright' },
];

export default function TokenDemoPage() {
  return (
    <div>
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <header className="mb-16 flex items-center justify-between border-b border-outline-variant pb-8">
          <span className="text-3xl text-primary font-cursive">mystic framework</span>
        </header>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold tracking-wide text-on-surface">
            Typography scale
          </h2>
          <div className="space-y-8">
            {TYPE_FAMILIES.map((family) => (
              <div key={family.label}>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                  {family.label}
                </p>
                <div className="space-y-2">
                  {TYPE_SCALE.map((size) => (
                    <div
                      key={size.label}
                      className={`${family.className} ${size.className} leading-normal text-on-background`}
                    >
                      Design system tokens{' '}
                      <span className="font-mono text-xs text-on-surface-variant">
                        {size.className}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Color roles */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold tracking-wide text-on-surface">Color roles</h2>
          <div className="space-y-8">
            {SWATCH_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
                  {group.title}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {group.swatches.map((swatch) => (
                    <div
                      key={swatch.name}
                      className={`${swatch.bg} ${swatch.on} flex h-24 flex-col justify-end rounded-lg p-3 text-xs font-medium`}
                    >
                      {swatch.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Surface elevation */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold tracking-wide text-on-surface">
            Surface elevation
          </h2>
          <div className="flex overflow-hidden rounded-lg border border-outline-variant">
            {SURFACE_CONTAINERS.map((step) => (
              <div
                key={step.label}
                className={`${step.bg} flex h-20 flex-1 items-end justify-center pb-2 text-[10px] font-mono text-on-surface-variant`}
              >
                {step.label}
              </div>
            ))}
          </div>
        </section>

        {/* Paragraph */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold tracking-wide text-on-surface">Lorem Ipsum</h2>
          <p className="text-on-surface text-md leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse
            lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum
            ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit
            amet erat. Duis semper.{' '}
            <Link href="https://github.com/mystic-framework">Duis arcu massa</Link>, scelerisque
            vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero
            pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent
            blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.
            Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam
            sodales hendrerit.
          </p>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold tracking-wide text-on-surface">Buttons</h2>
          <div className="flex gap-8">
            <Button variant="primary">Button</Button>
            <Button variant="primary" disabled>
              Button
            </Button>
            <Button variant="secondary">Button</Button>
            <Button variant="secondary" disabled>
              Button
            </Button>
            <Button variant="ghost">Button</Button>
            <Button variant="ghost" disabled>
              Button
            </Button>
            <Button variant="ui">Button</Button>
            <Button variant="ui" disabled>
              Button
            </Button>
            <Button variant="circular">X</Button>
            <Button variant="circular" disabled>
              X
            </Button>
          </div>
        </section>

        {/* Code block */}
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold tracking-wide text-on-surface">Code block</h2>
          <CodeBlock code={CODE} language="cpp" />
        </section>
      </div>
    </div>
  );
}
