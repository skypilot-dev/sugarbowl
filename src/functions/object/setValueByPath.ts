interface SetValueByPathOptions {
  noOverwrite?: boolean;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Target = { [key: string]: any }

export function setValueByPath<T>(
  path: string | string[], value: T, target: Target, options: SetValueByPathOptions = {}
): Target {
  const { noOverwrite = false } = options;

  const segments = typeof path === 'string'
    ? path.split('.')
    : path;

  let currentLevel = target;
  while (segments.length > 1) {
    const currentSegment = segments.shift() as string;
    if (currentLevel[currentSegment] === undefined && segments.length > 0) {
      currentLevel[currentSegment] = {};
    }
    currentLevel = currentLevel[currentSegment];
  }

  if (currentLevel[segments[0]] !== 'undefined' && noOverwrite) {
    throw new Error(`Illegal attempt to set the value at '${path}': a value is already defined`);
  }
  currentLevel[segments[0]] = value;
  return target;
}
