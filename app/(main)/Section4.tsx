/* Section 4: Available Modules */

export interface ModuleItem {
  title: string;
  description: string;
  colSpan?: string;
  styleVariant?: string;
}

interface Section4Props {
  sectionTag?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  modules?: ModuleItem[];
}

const defaultModules: ModuleItem[] = [
  {
    title: 'mystic::common',
    description: 'Essential primitive types and utilities used across all modules.',
    colSpan: 'md:col-span-1',
    styleVariant: 'border-primary/40 bg-primary/5',
  },
  {
    title: 'mystic::status',
    description:
      'Lightweight error handling and status reporting system for robust application development.',
    colSpan: 'md:col-span-1',
  },
  {
    title: 'mystic::traits',
    description:
      'Compile-time type inspection tools, type transformations, and metaprogramming utilities.',
    colSpan: 'md:col-span-1',
  },
  {
    title: 'mystic::hal',
    description:
      'Hardware Abstraction Layer (HAL) providing a unified interface for cross-platform hardware access and control.',
    colSpan: 'md:col-span-2',
  },
  {
    title: 'mystic::views',
    description:
      'Zero-copy, high-performance data views for efficient memory access and manipulation.',
    colSpan: 'md:col-span-1',
    styleVariant: 'border-primary/40 bg-primary/5',
  },
  {
    title: 'mystic::containers',
    description:
      'Optimized data structures and containers for high-performance computing and memory management.',
    colSpan: 'md:col-span-3',
  },
  {
    title: 'mystic::math',
    description:
      'SIMD-optimized mathematical structures and algorithms for high-performance numerical computations.',
    colSpan: 'md:col-span-1',
    styleVariant: 'border-primary/40 bg-primary/5',
  },
  {
    title: 'mystic::console',
    description:
      'Lightweight console logging and debugging utilities for efficient runtime diagnostics.',
    colSpan: 'md:col-span-2',
  },
];

export default function Section4({
  sectionTag = 'Ecosystem',
  sectionTitle = 'Available Modules',
  sectionDescription = 'Pick only the modules your application needs to maintain dynamic scalability and light binary size.',
  modules = defaultModules,
}: Section4Props) {
  return (
    <section className="relative z-0 bg-surface py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col items-start gap-y-2">
          <div className="font-mono text-sm tracking-wide uppercase text-primary">{sectionTag}</div>
          <h2 className="text-2xl md:text-3xl font-semibold text-on-surface">{sectionTitle}</h2>
          {sectionDescription && (
            <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              {sectionDescription}
            </p>
          )}
        </div>

        <div className="w-full rounded-xl border border-warning/20 bg-warning/10 px-4 py-3 text-sm text-warning font-mono">
          These modules reflect the planned API surface — none are implemented yet.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.title}
              className={`rounded-xl border p-6 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] hover:scale-[1.01] ${
                module.colSpan ?? 'md:col-span-1'
              } ${module.styleVariant ?? 'border-outline-variant bg-surface-container-low'}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono font-semibold text-lg text-on-surface">
                    {module.title}
                  </h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
