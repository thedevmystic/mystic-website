/* Section 3: Quickstart */

type Token = { text: string; className?: string };
type Line = Token[];

const KEYWORD = 'text-primary';
const VAR = 'text-on-surface';
const MUTED = 'text-on-surface-variant';
const STRING = 'text-success';

const cmakeLines: Line[] = [
  [
    { text: 'include', className: KEYWORD },
    { text: '(', className: MUTED },
    { text: 'FetchContent', className: VAR },
    { text: ')', className: MUTED },
  ],
  [],
  [
    { text: 'FetchContent_Declare', className: KEYWORD },
    { text: '(', className: MUTED },
  ],
  [{ text: '  mystic', className: VAR }],
  [
    { text: '  GIT_REPOSITORY ', className: MUTED },
    { text: 'https://github.com/thedevmystic/mystic', className: STRING },
  ],
  [
    { text: '  GIT_TAG        ', className: MUTED },
    { text: 'main', className: STRING },
  ],
  [{ text: ')', className: MUTED }],
  [
    { text: 'FetchContent_MakeAvailable', className: KEYWORD },
    { text: '(', className: MUTED },
    { text: 'mystic', className: VAR },
    { text: ')', className: MUTED },
  ],
  [],
  [
    { text: 'target_link_libraries', className: KEYWORD },
    { text: '(', className: MUTED },
    { text: 'app', className: VAR },
    { text: ' ', className: MUTED },
    { text: 'PRIVATE', className: MUTED },
    { text: ' ', className: MUTED },
    { text: 'mystic::core', className: VAR },
    { text: ')', className: MUTED },
  ],
];

export default function Section3() {
  return (
    <section className="relative z-0 bg-surface py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="bg-surface-container-low text-on-surface text-sm font-mono overflow-hidden rounded-xl border border-outline-variant w-full order-2 lg:order-1">
            <div className="flex flex-row items-center justify-start text-on-surface-variant px-4 py-1 border-b border-outline-variant">
              <span className="text-xs font-mono mr-auto">CMakeLists.txt</span>
              <span className="w-2 h-2 rounded-full bg-error mr-2" />
              <span className="w-2 h-2 rounded-full bg-warning mr-2" />
              <span className="w-2 h-2 rounded-full bg-success" />
            </div>
            <div className="px-4 py-2">
              <pre className="text-sm font-mono overflow-auto">
                <code>
                  {cmakeLines.map((line, i) => (
                    <span key={i}>
                      {line.length === 0 ? (
                        '\n'
                      ) : (
                        <>
                          {line.map((token, j) => (
                            <span key={j} className={token.className}>
                              {token.text}
                            </span>
                          ))}
                          {'\n'}
                        </>
                      )}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-y-4 order-1 lg:order-2">
            <div className="font-mono text-sm tracking-wide uppercase text-primary">Quickstart</div>
            <h2 className="text-lg font-sans md:text-left">
              <span className="font-semibold">Drop it in. </span>
              <span className="text-on-surface-variant">
                Pull Mystic straight into your build with CMake&apos;s FetchContent — no package
                manager, no manual setup.
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
