/* Debounce helper */

type Procedure = (...args: any[]) => void;

export default function debounce<F extends Procedure>(
  func: F,
  waitMs: number,
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, waitMs);
  };
}
