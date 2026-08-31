/* About Page — Creator Section */

export default function CreatorSection() {
  return (
    <section className="relative z-0 bg-surface py-16 px-6 md:px-12 lg:px-24">
      <div
        className="max-w-6xl mx-auto flex flex-col items-start gap-y-4 rounded-md focus-visible:outline-2 focus-visible:outline-primary"
        tabIndex={0}
      >
        <div className="font-mono text-sm tracking-wide uppercase text-primary">The Developer</div>
        <h2 className="text-2xl md:text-3xl font-semibold text-on-surface">
          Who&apos;s Building This
        </h2>
        <p className="text-md text-on-surface-variant max-w-2xl leading-relaxed">
          I'm <span className="font-bold">Surya</span> — just a random guy in the madness of
          multiverse! I'm also known as <span className="italic">thedevmystic</span> and I maintain
          The Mystic Framework. There is nothing much interesting about me besides I love JoJo's and
          want to get into MIT.
        </p>
      </div>
    </section>
  );
}
