/* Section 1: Design Principles */

const designPrinciples = [
  {
    title: 'Zero Overhead',
    description:
      'Employs zero-cost abstractions so you only pay for what you use, keeping binary size minimal and runtime performance native.',
  },
  {
    title: 'Performance First',
    description:
      'Engineered from the ground up for maximum throughput and minimal latency, prioritizing raw speed at every layer.',
  },
  {
    title: 'Elegance',
    description:
      'Expressive, clean C++ APIs designed to minimize boilerplate and make writing complex logic intuitive.',
  },
  {
    title: 'Modularity',
    description:
      'Decoupled components allow you to include only the modules your project requires, keeping dependencies light.',
  },
];

export default function Section1() {
  return (
    <section className="relative z-0 bg-surface py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col items-start gap-y-2">
          <div className="font-mono text-sm tracking-wide uppercase text-primary">Architecture</div>
          <h2 className="text-2xl md:text-3xl font-semibold text-on-surface">
            Modern Design Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {designPrinciples.map((principle) => (
            <div
              key={principle.title}
              className="border border-outline-variant rounded-xl p-6 flex flex-col justify-between hover:translate-y-[-4px] hover:scale-[1.02] hover:border-primary transition-transform duration-300"
            >
              <div>
                <h3 className="font-sans font-semibold text-lg text-on-surface mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
