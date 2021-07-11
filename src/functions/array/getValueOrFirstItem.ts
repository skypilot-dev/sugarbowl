export function getValueOrFirstItem<T>(valueOrItems: T | T[], defaultValue: T): T;
export function getValueOrFirstItem<T>(valueOrItems: T | T[]): T | undefined;

export function getValueOrFirstItem<T>(valueOrItems: T | T[], defaultValue?: T): T | undefined {
  const value = Array.isArray(valueOrItems)
    ? (getFirstItem<T>(valueOrItems) as T | undefined)
    : valueOrItems as T;
  return (!value && typeof defaultValue !== 'undefined') ? defaultValue : value;
}

function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}
