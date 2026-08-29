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

const benchmarkSeries = [
  {
    label: 'Headers (#include)',
    colorClass: 'text-error',
    points: [
      { tu: 0, time: 0 },
      { tu: 10, time: 1.5 },
      { tu: 25, time: 3.6 },
      { tu: 50, time: 7.1 },
      { tu: 75, time: 10.6 },
      { tu: 100, time: 14.2 },
    ],
  },
  {
    label: 'Modules (import)',
    colorClass: 'text-success',
    points: [
      { tu: 0, time: 0 },
      { tu: 10, time: 0.3 },
      { tu: 25, time: 0.6 },
      { tu: 50, time: 1.0 },
      { tu: 75, time: 1.4 },
      { tu: 100, time: 1.8 },
    ],
  },
];

const CHART_W = 600;
const CHART_H = 220;
const PAD = { top: 16, right: 16, bottom: 32, left: 40 };
const X_MAX = 100;
const Y_MAX = 15;

const xScale = (tu: number) => PAD.left + (tu / X_MAX) * (CHART_W - PAD.left - PAD.right);
const yScale = (time: number) =>
  CHART_H - PAD.bottom - (time / Y_MAX) * (CHART_H - PAD.top - PAD.bottom);

const toPath = (points: { tu: number; time: number }[]) =>
  points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.tu)} ${yScale(p.time)}`).join(' ');

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
              <span className="w-2 h-2 rounded-full bg-error mr-2"></span>
              <span className="w-2 h-2 rounded-full bg-warning mr-2"></span>
              <span className="w-2 h-2 rounded-full bg-success"></span>
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

        {/* Compile Time Benchmark Graph */}
        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 md:p-8 flex flex-col gap-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-mono text-sm tracking-wide uppercase text-primary">
                Compile Times
              </h3>
              <p className="text-sm text-on-surface-variant mt-1">
                Comparing the build times of a project with 100 translation units.
              </p>
            </div>
            <span className="self-start sm:self-auto font-mono text-xs text-success bg-success/10 border border-success/20 px-3 py-1 rounded-full">
              ~87% Faster
            </span>
          </div>

          <div className="flex flex-col gap-y-3 pt-2">
            {/* Legend */}
            <div className="flex items-center gap-x-6 text-xs font-mono text-on-surface">
              {benchmarkSeries.map((s) => (
                <div key={s.label} className="flex items-center gap-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${s.colorClass} bg-current`} />
                  <span>{s.label}</span>
                  <span className="font-bold">{s.points[s.points.length - 1].time}s</span>
                </div>
              ))}
            </div>

            {/* Line chart */}
            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H + 4}`}
              className="w-full h-auto"
              role="img"
              aria-label="Build time in seconds vs. number of translation units, comparing header includes and modules"
            >
              {/* Horizontal gridlines + Y labels */}
              {[0, 5, 10, 15].map((t) => (
                <g key={t}>
                  <line
                    x1={PAD.left}
                    x2={CHART_W - PAD.right}
                    y1={yScale(t)}
                    y2={yScale(t)}
                    className="text-outline-variant"
                    stroke="currentColor"
                    strokeWidth={1}
                    strokeOpacity={0.4}
                  />
                  <text
                    x={PAD.left - 8}
                    y={yScale(t)}
                    textAnchor="end"
                    dominantBaseline="middle"
                    className="fill-on-surface-variant text-[12px] md:text-[8px] font-mono"
                  >
                    {t}s
                  </text>
                </g>
              ))}

              {/* X labels */}
              {[10, 25, 50, 75, 100].map((tu) => (
                <text
                  key={tu}
                  x={xScale(tu)}
                  y={CHART_H - PAD.bottom + 16}
                  textAnchor="middle"
                  className="fill-on-surface-variant text-[12px] md:text-[8px] font-mono"
                >
                  {tu}
                </text>
              ))}
              <text
                x={CHART_W / 2}
                y={CHART_H + 4}
                textAnchor="middle"
                className="fill-on-surface-variant text-[12px] md:text-[8px] font-mono"
              >
                Translation Units
              </text>

              {/* Series lines + points */}
              {benchmarkSeries.map((s) => (
                <g key={s.label} className={s.colorClass}>
                  <path
                    d={toPath(s.points)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {s.points.map((p) => (
                    <circle
                      key={p.tu}
                      cx={xScale(p.tu)}
                      cy={yScale(p.time)}
                      r={2.5}
                      fill="currentColor"
                    />
                  ))}
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
