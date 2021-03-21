interface GetLastItemOptions<T> {
  defaultValue?: T | undefined;
}

// Return the last item in the array, or null if the array is empty
export function getLastItem<T>(items: ReadonlyArray<T>, options: GetLastItemOptions<T> = {}): T | undefined {
  const { defaultValue } = options;
  if (items.length === 0) {
    return defaultValue !== undefined ? defaultValue : undefined;
  }
  return items.slice(-1)[0];
}
