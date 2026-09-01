/* Section 2: Why Modules? */

const minusLines = `
- #include <iostream>
- #include <vector>

- #include <mystic/core_fwd.hpp>
- #include <mystic/graphics/texture.hpp>
- #include <mystic/graphics/renderer.hpp>
- #include <mystic/triats/add_const.hpp>
- #include <mystic/triats/add_rvalue_reference.hpp>
`.trim();

const commentLines = `

// ... more 20 lines of header includes

`;

const plusLines = `
+ import mystic.core;
+ import mystic.graphics;
+ import mystic.traits;
`.trim();

export default function Section2() {
  return (
    <section className="relative z-0 bg-surface py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Header & Code Preview */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="flex flex-col items-start justify-start gap-y-4">
            <div className="font-mono text-sm tracking-wide uppercase text-primary">Modules</div>
            <h2 className="text-lg font-sans md:text-left">
              <span className="font-semibold">Why Modules? </span>
              <span className="text-on-surface-variant">
                Abandon the old way of including headers and embrace the future of C++ with modules.
              </span>
            </h2>
          </div>

          <div className="bg-surface-container-low text-on-surface text-sm font-mono overflow-hidden rounded-xl border border-outline-variant w-full">
            <div className="flex flex-row items-center justify-start text-on-surface-variant px-4 py-1 border-b border-outline-variant">
              <span className="text-xs font-mono mr-auto">main.cpp</span>
              <span className="w-2 h-2 rounded-full bg-error mr-2" />
              <span className="w-2 h-2 rounded-full bg-warning mr-2" />
              <span className="w-2 h-2 rounded-full bg-success" />
            </div>
            <div className="px-4 py-2">
              <pre className="text-sm font-mono overflow-auto">
                <code>
                  <span className="text-error">{minusLines}</span>
                  <span className="text-on-surface-variant">{commentLines}</span>
                  <span className="text-success">{plusLines}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
