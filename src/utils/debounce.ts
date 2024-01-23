type DebounceCallback = (...args: any[]) => void;

export function debounce<T extends DebounceCallback>(func: T, wait: number): T {
  let timeoutId: number | null = null;
  let lastArgs: any[] = [];

  const debounced = (...args: any[]) => {
    lastArgs = args;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      func.apply(null, lastArgs);
      timeoutId = null;
    }, wait);
  };

  debounced.clear = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  // @ts-ignore
  return { ...debounced, clear: debounced.clear } as T;
}
