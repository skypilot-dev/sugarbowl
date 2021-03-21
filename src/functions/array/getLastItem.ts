interface GetLastItemOptions<Default> {
  defaultValue?: Default;
}

export function getLastItem<Item>(items: ReadonlyArray<Item>, options?: { defaultValue: undefined }): Item | undefined;
export function getLastItem<Item, Default extends Item | undefined>(
  items: ReadonlyArray<Item>, options: GetLastItemOptions<Default>
): Item | Default;

// Return the last item in the array, or null if the array is empty
export function getLastItem<Item, Default extends Item>(
  items: ReadonlyArray<Item>, options: GetLastItemOptions<Item> = {}
): Item | Default | undefined {
  const { defaultValue } = options;
  if (items.length === 0) {
    return defaultValue !== undefined ? defaultValue : undefined;
  }
  return items.slice(-1)[0];
}
