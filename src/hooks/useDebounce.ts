import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce any value (e.g. search input).
 *
 * @param value The value to be debounced
 * @param delay Milliseconds to delay updating the debounced value (default: 250ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 250): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
