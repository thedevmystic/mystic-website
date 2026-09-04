/* Debounce helper */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Procedure = (...args: any[]) => void;

export default function debounce<F extends Procedure>(
  func: F,
  waitMs: number,
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, waitMs);
  };
}
