import { isPlainObject } from './isPlainObject';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dict = { [key: string]: any };

/**
 * Returns a new object in which every string value on `obj` is transformed by the `transform` function
 */
export function transformLeaves<T extends Dict>(obj: T, transform: (value: string) => string): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === 'string' ? transform(value)
        : isPlainObject(value) ? transformLeaves(value, transform)
          : value,
    ])
  ) as T;
}
