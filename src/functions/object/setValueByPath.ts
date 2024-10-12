interface SetValueByPathOptions {
  noOverwrite?: boolean;
}

interface Target {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Sets a value in a target object at a specified path.
 *
 * @param path - The path where the value should be set. Can be a string (dot notation) or an array of strings.
 * @param value - The value to set at the specified path.
 * @param target - The target object where the value will be set.
 * @param options - Optional settings:
 *    - noOverwrite: If true, an error is thrown if a value already exists at the specified path.
 * @returns The updated target object with the new value set at the specified path.
 *
 * The function navigates through the target object using the path, creating nested objects if needed.
 * If `noOverwrite` is set to true, the function will throw an error if the path already has a value.
 */
export function setValueByPath<T>(
  path: string | string[],
  value: T,
  target: Target,
  options: SetValueByPathOptions = {},
): Target {
  const { noOverwrite = false } = options;

  const segments = typeof path === 'string' ? path.split('.') : path;

  let currentLevel = target;
  while (segments.length > 1) {
    const currentSegment = segments.shift() as string;
    if (currentLevel[currentSegment] === undefined && segments.length > 0) {
      currentLevel[currentSegment] = {};
    }
    currentLevel = currentLevel[currentSegment];
  }

  const finalSegment = segments[0];
  if (typeof finalSegment === 'undefined') {
    throw new TypeError(`Invalid path: '${path}' contains an undefined segment`);
  }

  if (currentLevel[finalSegment] !== undefined && noOverwrite) {
    throw new Error(`Illegal attempt to set the value at '${path}': a value is already defined`);
  }

  currentLevel[finalSegment] = value;
  return target;
}
